type TranslationDictionary = {
  readonly [key: string]: TranslationValue;
};

type TranslationValue =
  | string
  | number
  | boolean
  | null
  | readonly TranslationValue[]
  | TranslationDictionary;

const isDictionary = (value: TranslationValue): value is TranslationDictionary =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const flattenTranslationKeys = (
  dictionary: TranslationDictionary,
): string[] => {
  const keys: string[] = [];

  const visit = (value: TranslationDictionary, prefix: string) => {
    Object.entries(value).forEach(([key, nestedValue]) => {
      const nextKey = prefix ? `${prefix}.${key}` : key;

      if (isDictionary(nestedValue)) {
        visit(nestedValue, nextKey);
        return;
      }

      keys.push(nextKey);
    });
  };

  visit(dictionary, "");

  return [...keys].sort();
};

export const getMissingTranslationKeys = (
  sourceDictionary: TranslationDictionary,
  targetDictionary: TranslationDictionary,
) => {
  const targetKeys = new Set(flattenTranslationKeys(targetDictionary));

  return flattenTranslationKeys(sourceDictionary).filter(
    (key) => !targetKeys.has(key),
  );
};

export const getExtraTranslationKeys = (
  sourceDictionary: TranslationDictionary,
  targetDictionary: TranslationDictionary,
) => {
  const sourceKeys = new Set(flattenTranslationKeys(sourceDictionary));

  return flattenTranslationKeys(targetDictionary).filter(
    (key) => !sourceKeys.has(key),
  );
};

export const assertLocaleCoverage = (
  baseDictionary: TranslationDictionary,
  targetDictionary: TranslationDictionary,
) => {
  const missingKeys = getMissingTranslationKeys(
    baseDictionary,
    targetDictionary,
  );
  const extraKeys = getExtraTranslationKeys(baseDictionary, targetDictionary);

  return {
    covered: missingKeys.length === 0,
    missingKeys,
    extraKeys,
  };
};
