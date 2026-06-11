const INVALID_ID_VALUES = new Set(["", "null", "undefined", "nan"]);

const isValidId = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) return false;

  const normalized = String(value).trim().toLowerCase();

  return !INVALID_ID_VALUES.has(normalized);
};

const cleanSearchParams = (queryString: string) => {
  const params = new URLSearchParams(queryString);

  Array.from(params.entries()).forEach(([key, value]) => {
    if (!isValidId(value)) {
      params.delete(key);
    }
  });

  return params;
};

export const buildDesignerPortfolioHref = ({
  designerId,
  queryString,
}: {
  designerId: string | number;
  queryString: string;
}) => {
  const params = cleanSearchParams(queryString);
  const suffix = params.toString();

  return `/designer/${encodeURIComponent(String(designerId))}${
    suffix ? `?${suffix}` : ""
  }`;
};

export const buildDesignerSelectHref = ({
  designerId,
  queryString,
}: {
  designerId: string | number;
  queryString: string;
}) => {
  const params = cleanSearchParams(queryString);
  const categoryId = params.get("categoryId");

  if (!isValidId(categoryId)) {
    return null;
  }

  params.set("categoryId", String(categoryId));
  params.set("designerId", String(designerId));
  params.set("from", params.get("from") || "designer-selection");

  return `/paint-protection/${encodeURIComponent(String(categoryId))}?${params.toString()}`;
};

export const getDesignerSelectionFallbackHref = (queryString: string) => {
  const params = cleanSearchParams(queryString);
  const categoryId = params.get("categoryId");
  const categorySlug = params.get("categorySlug");
  const subcategoryId = params.get("subcategoryId");

  if (isValidId(categoryId) || isValidId(categorySlug)) {
    const subcategoryParams = new URLSearchParams();

    if (isValidId(categoryId)) {
      subcategoryParams.set("id", String(categoryId));
    }

    if (isValidId(categorySlug)) {
      subcategoryParams.set("slug", String(categorySlug));
    }

    if (isValidId(subcategoryId)) {
      subcategoryParams.set("subcategoryId", String(subcategoryId));
    }

    return `/subcategories?${subcategoryParams.toString()}`;
  }

  return "/subcategories";
};
