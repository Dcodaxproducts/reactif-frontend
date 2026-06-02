import { describe, expect, it } from "vitest";

import en from "../locales/en.json";
import fr from "../locales/fr.json";
import {
  assertLocaleCoverage,
  flattenTranslationKeys,
  getExtraTranslationKeys,
  getMissingTranslationKeys,
} from "./i18n-coverage";

type JsonDictionary = {
  readonly [key: string]: JsonValue;
};

type JsonValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonValue[]
  | JsonDictionary;

const isDictionary = (value: JsonValue): value is JsonDictionary =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const collectEmptyStringKeys = (dictionary: JsonDictionary) => {
  const keys: string[] = [];

  const visit = (value: JsonDictionary, prefix: string) => {
    Object.entries(value).forEach(([key, nestedValue]) => {
      const nextKey = prefix ? `${prefix}.${key}` : key;

      if (nestedValue === "") {
        keys.push(nextKey);
        return;
      }

      if (isDictionary(nestedValue)) {
        visit(nestedValue, nextKey);
      }
    });
  };

  visit(dictionary, "");

  return keys;
};

describe("i18n coverage", () => {
  it("flattens nested keys", () => {
    expect(
      flattenTranslationKeys({
        common: { save: "Save", cancel: "Cancel" },
        nav: { language: { english: "English" } },
      }),
    ).toEqual(["common.cancel", "common.save", "nav.language.english"]);
  });

  it("detects missing keys", () => {
    expect(
      getMissingTranslationKeys(
        { common: { save: "Save", cancel: "Cancel" } },
        { common: { save: "Enregistrer" } },
      ),
    ).toEqual(["common.cancel"]);
  });

  it("detects extra keys", () => {
    expect(
      getExtraTranslationKeys(
        { common: { save: "Save" } },
        { common: { save: "Enregistrer", cancel: "Annuler" } },
      ),
    ).toEqual(["common.cancel"]);
  });

  it("confirms French covers every English key", () => {
    const coverage = assertLocaleCoverage(en, fr);

    expect(coverage.missingKeys).toEqual([]);
    expect(coverage.covered).toBe(true);
  });

  it("confirms English and French do not contain empty strings", () => {
    expect(collectEmptyStringKeys(en)).toEqual([]);
    expect(collectEmptyStringKeys(fr)).toEqual([]);
  });
});
