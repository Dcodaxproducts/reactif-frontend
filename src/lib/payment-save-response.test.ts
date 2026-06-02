import { describe, expect, it } from "vitest";

import { getPaymentSaveError } from "./payment-save-response";

describe("payment save response", () => {
  it("detects backend payment errors returned in a 200 response", () => {
    expect(
      getPaymentSaveError({
        errorInfo: [
          "HY000",
          1364,
          "Field 'user_id' doesn't have a default value",
        ],
      }),
    ).toContain("user_id");
  });

  it("ignores successful payment responses", () => {
    expect(getPaymentSaveError({ data: { id: 88 } })).toBeNull();
  });
});
