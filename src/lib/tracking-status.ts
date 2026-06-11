export const TRACKING_STAGES = [
  "pending",
  "in_production",
  "quality_check",
  "shipped",
  "delivered",
] as const;

export type TrackingStage = (typeof TRACKING_STAGES)[number];

const STATUS_STAGE_MAP: Record<string, TrackingStage> = {
  new_booking: "pending",
  pending: "pending",
  accepted: "pending",
  arriving: "in_production",
  arrived: "in_production",
  in_progress: "in_production",
  processing: "in_production",
  production: "in_production",
  in_production: "in_production",
  quality: "quality_check",
  quality_check: "quality_check",
  ready_to_pickup: "quality_check",
  ready_for_pickup: "quality_check",
  picked_up: "shipped",
  pickedup: "shipped",
  shipped: "shipped",
  in_transit: "shipped",
  delivered: "delivered",
  completed: "delivered",
};

const STAGE_TRANSLATION_KEYS: Record<TrackingStage, string> = {
  pending: "order.trackingStages.pending",
  in_production: "order.trackingStages.inProduction",
  quality_check: "order.trackingStages.qualityCheck",
  shipped: "order.trackingStages.shipped",
  delivered: "order.trackingStages.delivered",
};

export const normalizeTrackingStatus = (status: string | null | undefined) =>
  (status ?? "pending")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

export const getTrackingStageFromStatus = (
  status: string | null | undefined,
): TrackingStage =>
  STATUS_STAGE_MAP[normalizeTrackingStatus(status)] ?? "pending";

export const getTrackingStageIndex = (stage: TrackingStage) =>
  TRACKING_STAGES.indexOf(stage);

export const getTrackingStageTranslationKey = (stage: TrackingStage) =>
  STAGE_TRANSLATION_KEYS[stage];
