import { describe, expect, it } from "vitest";

import { normalizePaymentGateway } from "./payments";

describe("payment helpers", () => {
  it("normalizes gateway fields", () => {
    expect(
      normalizePaymentGateway({
        id: 1,
        title: "Stripe",
        name: "stripe",
        type: "card",
        status: "active",
        gateway_image: "stripe.png",
        publishable_key: "pk_test_123",
      }),
    ).toMatchObject({
      id: "1",
      title: "Stripe",
      name: "stripe",
      type: "card",
      status: "active",
      gateway_image: "stripe.png",
      publishableKey: "pk_test_123",
      publishable_key: "pk_test_123",
    });
  });
});
