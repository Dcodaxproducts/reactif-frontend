import { NextResponse } from "next/server";
import { normalizePaymentGatewayList } from "@/lib/payments";

const getApiBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "https://reactif.dcodax.net/api";

const readMessage = (value: unknown) => {
  if (typeof value === "object" && value !== null && "message" in value) {
    const message = value.message;

    if (typeof message === "string") {
      return message;
    }
  }

  return "Payment gateways are not available";
};

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get("authorization");

    if (!authorization) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const gatewayResponse = await fetch(`${getApiBaseUrl()}/payment-gateway-list`, {
      headers: {
        Authorization: authorization,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const gatewayData = await gatewayResponse.json();

    if (!gatewayResponse.ok) {
      return NextResponse.json(
        { message: readMessage(gatewayData) },
        { status: gatewayResponse.status },
      );
    }

    return NextResponse.json({
      data: normalizePaymentGatewayList(gatewayData),
    });
  } catch {
    return NextResponse.json(
      { message: "Payment gateways are not available" },
      { status: 500 },
    );
  }
}
