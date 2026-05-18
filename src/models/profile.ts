export type UserProfile = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string | null;
  bio?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
};

export type BackendUserProfile = {
  id: number;
  name: string;
  email: string;
  contact_number?: string;
  profile_image?: string | null;
  address?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
};

export type ProfileFormPayload = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  address: string;
  avatarFile?: File | null;
};
