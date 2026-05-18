export type Designer = {
  id: number;
  name: string;
  email: string;
  rating: number;
  address: string | null;
  profile_image: string | null;
  contact_number: string | null;
  is_available: number;
  is_online: number;
  is_verified_user?: number;
  status?: string;
};
