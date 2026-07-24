import type {
  Service,
  ServiceField,
  ServiceFieldOption,
} from "@/types/categories";
import type { ApiListResponse } from "@/types/api";

type ServiceFilterParams = {
  category_id?: string | number | null;
  sub_category_id?: string | number | null;
  service_id?: string | number | null;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getString = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  return typeof value === "string" ? value : null;
};

const getNumber = (record: Record<string, unknown>, key: string) => {
  const value = record[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const getBoolean = (record: Record<string, unknown>, key: string) => {
  const value = record[key];

  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }

  return null;
};

const getArray = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  return Array.isArray(value) ? value : [];
};

const parseJsonArray = (value: unknown): unknown[] => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== "string" || value.trim() === "") {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getImageUrl = (value: unknown): string | null => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  if (!isRecord(value)) {
    return null;
  }

  return (
    getString(value, "url") ??
    getString(value, "image") ??
    getString(value, "src") ??
    getString(value, "path")
  );
};

const getImageGallery = (service: Record<string, unknown>) => {
  const rawGallery =
    service.image_gallery ??
    service.service_images ??
    service.gallery ??
    service.images;

  return parseJsonArray(rawGallery)
    .map(getImageUrl)
    .filter((image): image is string => image !== null);
};

const normalizeOption = (option: unknown, index: number): ServiceFieldOption | null => {
  if (typeof option === "string") {
    return {
      key: option,
      display: option,
    };
  }

  if (!isRecord(option)) {
    return null;
  }

  const display =
    getString(option, "display") ??
    getString(option, "label") ??
    getString(option, "name") ??
    getString(option, "value");
  const key =
    getString(option, "key") ??
    getString(option, "value") ??
    getString(option, "id") ??
    display ??
    String(index + 1);

  if (!display) {
    return null;
  }

  return {
    key,
    display,
  };
};

const normalizeField = (field: unknown, index: number): ServiceField | null => {
  if (!isRecord(field)) {
    return null;
  }

  const label =
    getString(field, "label") ??
    getString(field, "lable") ??
    getString(field, "name") ??
    `Field ${index + 1}`;
  const fieldName =
    getString(field, "field_name") ??
    getString(field, "name") ??
    `field_${getNumber(field, "id") ?? index + 1}`;
  const inputType =
    getString(field, "input_type") ??
    getString(field, "type") ??
    "text";

  return {
    id: getNumber(field, "id") ?? index + 1,
    label,
    input_type: inputType,
    field_name: fieldName,
    is_required:
      getBoolean(field, "is_required") ??
      getBoolean(field, "required") ??
      false,
    placeholder: getString(field, "placeholder") ?? undefined,
    options: parseJsonArray(field.options)
      .map(normalizeOption)
      .filter((option): option is ServiceFieldOption => option !== null),
    default_value: getString(field, "default_value"),
  };
};

const getServiceItems = (response: unknown): unknown[] => {
  if (Array.isArray(response)) {
    return response;
  }

  if (!isRecord(response)) {
    return [];
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (Array.isArray(response.services)) {
    return response.services;
  }

  return [];
};

const idsMatch = (
  actual: number,
  expected: string | number | null | undefined,
) =>
  expected === undefined ||
  expected === null ||
  expected === "" ||
  String(actual) === String(expected);

export const filterServicesByParams = (
  services: Service[],
  params: ServiceFilterParams = {},
) =>
  services.filter(
    (service) =>
      idsMatch(service.category_id, params.category_id) &&
      idsMatch(service.sub_category_id, params.sub_category_id) &&
      idsMatch(service.id, params.service_id),
  );

export const normalizeService = (service: unknown): Service | null => {
  if (!isRecord(service)) {
    return null;
  }

  const id = getNumber(service, "id");
  const name = getString(service, "name");

  if (id === null || !name) {
    return null;
  }

  return {
    id,
    name,
    description: getString(service, "description") ?? "",
    category_id: getNumber(service, "category_id") ?? 0,
    sub_category_id: getNumber(service, "sub_category_id") ?? 0,
    service_image: getString(service, "service_image") ?? "",
    image_gallery: getImageGallery(service),
    price: getNumber(service, "price") ?? 0,
    status: getNumber(service, "status") ?? undefined,
    delivery_time:
      getString(service, "delivery_time") ??
      getString(service, "deliveryTime") ??
      getString(service, "turnaround_time") ??
      getString(service, "turnaroundTime") ??
      null,
    lead_time:
      getString(service, "lead_time") ??
      getString(service, "leadTime") ??
      getString(service, "production_time") ??
      getString(service, "productionTime") ??
      null,
    fields: getArray(service, "fields")
      .map(normalizeField)
      .filter((field): field is ServiceField => field !== null),
  };
};

export const normalizeServiceDetailResponse = (
  response: unknown,
): Service | null => {
  const service =
    isRecord(response) && "data" in response ? response.data : response;

  return normalizeService(service);
};

export const normalizeServicesResponse = (
  response: unknown,
): ApiListResponse<Service> => {
  const data = getServiceItems(response)
    .map(normalizeService)
    .filter((service): service is Service => service !== null);

  return {
    data,
    pagination: isRecord(response) && isRecord(response.pagination)
      ? {
          currentPage: getNumber(response.pagination, "currentPage") ?? 1,
          totalPages: getNumber(response.pagination, "totalPages") ?? 1,
        }
      : undefined,
  };
};
