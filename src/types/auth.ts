export type AuthUser = {
  userId: number;
  email: string;
  displayName: string;
  isVerified: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export type AuthResponse = AuthUser & {
  sessionToken?: string;
};
