import { describe, expect, it } from "vitest";

import { isSupportFaqBackendError, normalizeSupportFaqs } from "./support-faqs";

describe("normalizeSupportFaqs", () => {
  it("supports data, array, and faqs response shapes", () => {
    expect(normalizeSupportFaqs({ data: [{ question: "Q", answer: "A" }] }))
      .toHaveLength(1);
    expect(normalizeSupportFaqs([{ title: "Q", description: "A" }]))
      .toHaveLength(1);
    expect(normalizeSupportFaqs({ faqs: [{ question: "Q", answer: "A" }] }))
      .toHaveLength(1);
  });

  it("maps possible FAQ fields", () => {
    expect(
      normalizeSupportFaqs({
        data: [{ id: "1", value: "first", title: "Title", description: "Body" }],
      }),
    ).toEqual([
      {
        id: "1",
        value: "first",
        question: "Title",
        answer: "Body",
      },
    ]);
  });
});


describe("isSupportFaqBackendError", () => {
  it("detects Unable to load FAQs backend responses", () => {
    expect(isSupportFaqBackendError({ message: "Unable to load FAQs" })).toBe(
      true,
    );
    expect(isSupportFaqBackendError("Backend error: Unable to load FAQs")).toBe(
      true,
    );
    expect(isSupportFaqBackendError({ message: "Other backend issue" })).toBe(
      false,
    );
  });
});
