import { NextResponse } from "next/server";

const STRIPE_PAYMENT_INTENTS_URL = "https://api.stripe.com/v1/payment_intents";
const DEFAULT_CURRENCY = "chf";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const readString = (value: unknown) =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

const readBoolean = (value: unknown) =>
  value === true || value === 1 || value === "1" || value === "true";

const readActiveStatus = (value: unknown) => {
  const normalizedValue = readString(value).toLowerCase();

  return (
    readBoolean(value) ||
    normalizedValue === "active" ||
    normalizedValue === "enabled"
  );
};

const getApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "https://reactif.dcodax.net/api";

const getGatewayConfig = (gateway: Record<string, unknown>) => {
  const testValue = isRecord(gateway.test_value) ? gateway.test_value : null;
  const liveValue = isRecord(gateway.live_value) ? gateway.live_value : null;

  if (readBoolean(gateway.is_test)) {
    return testValue ?? liveValue ?? {};
  }

  return liveValue ?? testValue ?? {};
};

const findStripeGatewayConfig = (value: unknown) => {
  if (!isRecord(value) || !Array.isArray(value.data)) {
    return null;
  }

  const stripeGateway = value.data.find(
    (gateway): gateway is Record<string, unknown> =>
      isRecord(gateway) &&
      readString(gateway.type).toLowerCase() === "stripe" &&
      readActiveStatus(gateway.status),
  );

  if (!stripeGateway) {
    return null;
  }

  const gatewayConfig = getGatewayConfig(stripeGateway);
  const secretKey = readString(gatewayConfig.secret_key);
  const publishableKey = readString(gatewayConfig.publishable_key);

  if (!secretKey || !publishableKey) {
    return null;
  }

  return {
    publishableKey,
    secretKey,
  };
};

const getAmountInMinorUnits = (amount: unknown) => {
  const parsedAmount = Number(amount);

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return null;
  }

  return Math.round(parsedAmount * 100);
};

export async function POST(request: Request) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { amount?: unknown; currency?: unknown };
    const amount = getAmountInMinorUnits(body.amount);

    if (!amount) {
      return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
    }

    const gatewayResponse = await fetch(`${getApiBaseUrl()}/payment-gateway-list`, {
      headers: {
        Authorization: authorization,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!gatewayResponse.ok) {
      return NextResponse.json(
        { message: "Payment gateway is not available" },
        { status: gatewayResponse.status },
      );
    }

    const gatewayConfig = findStripeGatewayConfig(await gatewayResponse.json());

    if (!gatewayConfig) {
      return NextResponse.json(
        { message: "Stripe payment gateway is not configured" },
        { status: 422 },
      );
    }

    const paymentIntentBody = new URLSearchParams({
      amount: String(amount),
      currency: readString(body.currency).toLowerCase() || DEFAULT_CURRENCY,
      "automatic_payment_methods[enabled]": "true",
    });

    const paymentIntentResponse = await fetch(STRIPE_PAYMENT_INTENTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${gatewayConfig.secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: paymentIntentBody,
      cache: "no-store",
    });
    const paymentIntent = await paymentIntentResponse.json();

    if (!paymentIntentResponse.ok) {
      const stripeError = isRecord(paymentIntent)
        ? paymentIntent.error
        : null;

      return NextResponse.json(
        {
          message: isRecord(stripeError)
            ? readString(stripeError.message) ||
              "Stripe payment could not be started"
            : "Stripe payment could not be started",
        },
        { status: paymentIntentResponse.status },
      );
    }

    if (!isRecord(paymentIntent)) {
      return NextResponse.json(
        { message: "Stripe returned an invalid response" },
        { status: 502 },
      );
    }

    return NextResponse.json({
      clientSecret: readString(paymentIntent.client_secret),
      paymentIntentId: readString(paymentIntent.id),
      publishableKey: gatewayConfig.publishableKey,
    });
  } catch {
    return NextResponse.json(
      { message: "Stripe payment could not be started" },
      { status: 500 },
    );
  }
}
