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

  it("normalizes test gateway credentials from nested API values", () => {
    expect(
      normalizePaymentGateway({
        id: 1,
        title: "Stripe",
        type: "stripe",
        status: 1,
        is_test: 1,
        test_value: {
          url: null,
          secret_key: "sk_test_123",
          publishable_key: "pk_test_123",
        },
        live_value: {
          url: null,
          secret_key: null,
          publishable_key: null,
        },
      }),
    ).toMatchObject({
      id: "1",
      title: "Stripe",
      type: "stripe",
      status: "1",
      isTest: true,
      is_test: "1",
      publishableKey: "pk_test_123",
      publishable_key: "pk_test_123",
      url: null,
    });
  });
});
