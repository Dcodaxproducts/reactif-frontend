import api from "@/lib/axios";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";

/**
 * ==============================
 * TYPES
 * ==============================
 */

export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export type ResendOtpPayload = {
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

export type AuthMessageResponse = {
  message?: string;
  success?: boolean;
};

/**
 * ==============================
 * ROUTES
 * ==============================
 */

export const AUTH_ROUTES = {
  login: "/auth/login",
  signup: "/auth/signup",
  validate: "/auth/validate",
  verifyOtp: "/auth/verify-otp",
  resendOtp: "/auth/resend-otp",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
};

/**
 * ==============================
 * AUTH APIS
 * ==============================
 */

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

export const validateSession = async (): Promise<AuthMessageResponse> => {
  const { data } = await api.get<AuthMessageResponse>(AUTH_ROUTES.validate);
  return data;
};

export const verifyOtp = async (
  payload: VerifyOtpPayload,
): Promise<AuthMessageResponse> => {
  const { data } = await api.post<AuthMessageResponse>(
    AUTH_ROUTES.verifyOtp,
    payload,
  );
  return data;
};

export const resendOtp = async (
  payload: ResendOtpPayload,
): Promise<AuthMessageResponse> => {
  const { data } = await api.post<AuthMessageResponse>(
    AUTH_ROUTES.resendOtp,
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
