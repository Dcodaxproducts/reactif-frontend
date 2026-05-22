import api from "@/lib/axios";
import type { AuthResponse, AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";
import type { ApiItemResponse } from "@/types/api";
import type { BackendUserProfile } from "@/types/profile";

export type VerifyAuthPayload = {
  email: string;
  otp: string;
};

export type ResendAuthCodePayload = {
  email: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  newPassword: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type AuthMessageResponse = {
  message?: string;
  success?: boolean;
};

export const AUTH_ROUTES = {
  login: "/auth/login",
  signup: "/auth/signup",
  currentUser: "/user-detail",
  verifyAuth: "/auth/verify-otp",
  resendAuthCode: "/auth/resend-otp",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  changePassword: "/auth/change-password",
};

const mapCurrentUser = (user: BackendUserProfile): AuthUser => {
  const { id, email, name } = user;

  return {
    userId: id,
    email,
    displayName: name ?? email,
    isVerified: true,
  };
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isBackendUserProfile = (value: unknown): value is BackendUserProfile =>
  isRecord(value) &&
  typeof value.id === "number" &&
  typeof value.email === "string" &&
  typeof value.name === "string" &&
  typeof value.created_at === "string" &&
  typeof value.updated_at === "string";

const resolveCurrentUserResponse = (
  response: ApiItemResponse<BackendUserProfile> | BackendUserProfile,
): BackendUserProfile => {
  if (isBackendUserProfile(response)) {
    return response;
  }

  if (isRecord(response) && isBackendUserProfile(response.data)) {
    return response.data;
  }

  throw new Error("Invalid current user response");
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const { data: response } = await api.get<
    ApiItemResponse<BackendUserProfile> | BackendUserProfile
  >(AUTH_ROUTES.currentUser, {
    headers: {
      Accept: "application/json",
    },
  });

  return mapCurrentUser(resolveCurrentUserResponse(response));
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(AUTH_ROUTES.login, payload);
  return data;
};

export const registerUser = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(AUTH_ROUTES.signup, payload);
  return data;
};

export const verifyAuth = async (
  payload: VerifyAuthPayload,
): Promise<AuthMessageResponse> => {
  const { data } = await api.post<AuthMessageResponse>(
    AUTH_ROUTES.verifyAuth,
    payload,
  );
  return data;
};

export const resendAuthCode = async (
  payload: ResendAuthCodePayload,
): Promise<AuthMessageResponse> => {
  const { data } = await api.post<AuthMessageResponse>(
    AUTH_ROUTES.resendAuthCode,
    payload,
  );
  return data;
};

export const forgotPassword = async (
  payload: ForgotPasswordPayload,
): Promise<AuthMessageResponse> => {
  const { data } = await api.post<AuthMessageResponse>(
    AUTH_ROUTES.forgotPassword,
    payload,
  );
  return data;
};

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<AuthMessageResponse> => {
  const { data } = await api.post<AuthMessageResponse>(
    AUTH_ROUTES.resetPassword,
    payload,
  );
  return data;
};

export const changePassword = async (
  payload: ChangePasswordPayload,
): Promise<AuthMessageResponse> => {
  const { data } = await api.post<AuthMessageResponse>(
    AUTH_ROUTES.changePassword,
    payload,
  );
  return data;
};

export type VerifyOtpPayload = VerifyAuthPayload;
export type ResendOtpPayload = ResendAuthCodePayload;
export const verifyOtp = verifyAuth;
export const resendOtp = resendAuthCode;
