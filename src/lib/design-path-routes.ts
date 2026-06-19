export type DesignPathType = "have-design" | "need-designer";

type DesignPathRouteContext = {
  pathType: DesignPathType;
  categoryId: string | number | null | undefined;
  subcategoryId?: string | number | null;
  subcategoryName?: string | null;
  subcategorySlug?: string | null;
  categorySlug?: string | null;
  serviceId?: string | number | null;
  from?: string;
};

const INVALID_ROUTE_VALUES = new Set(["", "null", "undefined", "nan"]);

const hasRouteValue = (value: string | number | null | undefined) => {
  if (value === null || value === undefined) return false;

  return !INVALID_ROUTE_VALUES.has(String(value).trim().toLowerCase());
};

const appendIfValid = (
  params: URLSearchParams,
  key: string,
  value: string | number | null | undefined,
) => {
  if (hasRouteValue(value)) {
    params.set(key, String(value));
  }
};

export const buildDesignPathHref = ({
  pathType,
  categoryId,
  subcategoryId,
  subcategoryName,
  subcategorySlug,
  categorySlug,
  serviceId,
  from = "design-path-modal",
}: DesignPathRouteContext) => {
  if (!hasRouteValue(categoryId)) {
    return null;
  }

  const params = new URLSearchParams();

  params.set("path", pathType);
  params.set("categoryId", String(categoryId));
  params.set("from", from);
  appendIfValid(params, "subcategoryId", subcategoryId);
  appendIfValid(params, "subcategoryName", subcategoryName);
  appendIfValid(params, "subcategorySlug", subcategorySlug);
  appendIfValid(params, "categorySlug", categorySlug);
  appendIfValid(params, "serviceId", serviceId);

  const query = params.toString();

  if (pathType === "have-design") {
    return `/paint-protection/${encodeURIComponent(String(categoryId))}?${query}`;
  }

  return `/all-vendor-services?${query}`;
};
