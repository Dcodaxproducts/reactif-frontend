import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

type PaymentIntentRequest = {
  amount?: unknown;
  currency?: unknown;
  metadata?: unknown;
};

const isRecord = (value: unknown): value is Record<string, string> =>
  typeof value === "object" &&
  value !== null &&
  Object.values(value).every((item) => typeof item === "string");

export async function POST(request: Request) {
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured for wallet top-up." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as PaymentIntentRequest;
  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: "Please enter a valid payment amount." },
      { status: 400 },
    );
  }

  const stripe = new Stripe(stripeSecretKey);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: typeof body.currency === "string" ? body.currency : "usd",
    automatic_payment_methods: { enabled: true },
    metadata: isRecord(body.metadata) ? body.metadata : undefined,
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
}
