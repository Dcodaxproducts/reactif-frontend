import api from "@/lib/axios";
import type { ApiListResponse } from "@/types/api";
import type { Designer } from "@/types/designers";

/**
 * ==============================
 * TYPES
 * ==============================
 */

export type GetDesignersParams = {
  page?: number;
};

/**
 * ==============================
 * ROUTES
 * ==============================
 */

export const DESIGNER_ROUTES = {
  list: "/designer-list",
};

/**
 * ==============================
 * HELPERS
 * ==============================
 */

const cleanParams = <T extends Record<string, unknown>>(params?: T) => {
  if (!params) return undefined;

  const cleaned = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );

  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
};

/**
 * ==============================
 * DESIGNER APIS
 * ==============================
 */

export const getDesigners = async (
  params: GetDesignersParams = {},
): Promise<ApiListResponse<Designer>> => {
  const { data } = await api.get<ApiListResponse<Designer>>(
    DESIGNER_ROUTES.list,
    {
      params: cleanParams(params),
    },
  );

  return data;
};
