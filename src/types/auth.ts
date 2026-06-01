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

export type AuthResponse = Partial<AuthUser> & {
  id?: number;
  name?: string;
  full_name?: string;
  username?: string;
  token?: string;
  access_token?: string;
  accessToken?: string;
  sessionToken?: string;
  user?: AuthUser;
  data?: {
    token?: string;
    access_token?: string;
    accessToken?: string;
    sessionToken?: string;
    user?: AuthUser;
  };
};
