export const PROFILE_AVATAR_FALLBACK = "https://i.pravatar.cc/150?img=32";
export const PROFILE_EDIT_AVATAR_FALLBACK = "https://placehold.co/96x96";
export const PAINT_PROTECTION_FALLBACK_IMAGE =
  "/assets/PaintProtection/paintProtection/carOne.png";

export const getImageSource = (source: string | null | undefined, fallback: string) => {
  const imageSource = source?.trim();

  return imageSource || fallback;
};
