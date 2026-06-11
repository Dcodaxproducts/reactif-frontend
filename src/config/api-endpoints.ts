export const API_ENDPOINTS = {
  authLogin: "auth/login",
  authSignup: "auth/signup",
  authValidate: "auth/validate",
  authVerifyOtp: "auth/verify-otp",
  authResendOtp: "auth/resend-otp",
  authForgotPassword: "auth/forgot-password",
  authResetPassword: "auth/reset-password",
  authChangePassword: "auth/change-password",
  userDetail: "user-detail",
  updateProfile: "update-profile",
  deleteUserAccount: "delete-user-account",
  designerList: "designer-list",
  category: "categories",
  service: "services",
  booking: "booking",
  bookingList: "booking-list",
  bookingDetail: "booking-detail",
  paymentGatewayList: "payment-gateway-list",
  savePayment: "save-payment",
  paymentHistory: "payment-history",
  saveWallet: "save-wallet",
  walletList: "wallet-list",
  messageInbox: "message/inbox",
  messageGet: "message/get",
  messageSend: "message/send",
  notificationList: "notification-list",
  supportFaqs: "support/faqs",
  customerSupportList: "customersupport-list",
  customerSupportSave: "customersupport-save",
  chatMessageSave: "chatmessage-save",
} as const;

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;
export type ApiEndpointPath = (typeof API_ENDPOINTS)[ApiEndpointKey];

export const joinApiPath = (path: string): string => path.replace(/^\/+/, "");
