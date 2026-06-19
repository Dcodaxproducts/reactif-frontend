export type Booking = {
  id: number;
  user_id?: number;
  service_id?: number | string | null;
  status: string;
  created_at: string;
  updated_at?: string;
  address?: string | null;
  latitude?: string | number | null;
  longitude?: string | number | null;
  booking_datetime?: string | null;
  datetime?: string | null;
  schedule_datetime?: string | null;
  distance?: string | number | null;
  subtotal?: string | number | null;
  extra_charges_amount?: string | number | null;
  total_amount: number | string;
  payment_type?: string | null;
  payment?: BookingPayment | null;
  booking_type?: string | null;
  cancellation_reason?: string | null;
  service_data?: string | Record<string, unknown> | null;
  field_responses?: string | BookingFieldResponse[] | null;
  booking_history?: BookingHistoryItem[];
  user?: BookingUser | null;
  service?: {
    id?: number;
    name?: string;
    description?: string | null;
    category_id?: number | string | null;
    sub_category_id?: number | string | null;
    price?: number | string | null;
    service_image?: string | null;
  };
};

export type BookingUser = {
  id?: number;
  name?: string | null;
  email?: string | null;
  contact_number?: string | null;
  address?: string | null;
};

export type BookingPayment = {
  id?: number;
  booking_id?: number | string;
  total_amount?: number | string | null;
  payment_type?: string | null;
  payment_status?: string | null;
  txn_id?: string | null;
  datetime?: string | null;
};

export type BookingHistoryItem = {
  id?: number;
  booking_id?: number | string;
  history_type?: string | null;
  history_message?: string | null;
  datetime?: string | null;
  created_at?: string | null;
};

export type BookingFieldResponse = {
  field_id?: number;
  field_name: string;
  field_type?: string;
  lable?: string;
  label?: string;
  value?: string | number | null;
};

export type BookingDraftFileReference = {
  fieldName: string;
  fieldId?: number;
  key: string;
  name: string;
  type: string;
  size: number;
};

export type BookingDraft = {
  selected_service: {
    id: number;
    name: string;
    price?: number | null;
    description?: string | null;
    image?: string | null;
    field_count?: number;
  };
  selected_category: string | null;
  selected_subcategory: {
    id?: number | null;
    name?: string | null;
  } | null;
  selected_design_path: string | null;
  selected_designer_id?: string | null;
  dynamic_field_responses: BookingFieldResponse[];
  uploaded_file_references: BookingDraftFileReference[];
  address: string;
  latitude: string;
  longitude: string;
  booking_datetime: string;
  schedule_datetime: string;
  distance: string;
  subtotal: string;
  extra_charges_amount: string;
  total_amount: string;
  payment_type: string;
  booking_type: string;
};

export type CancelBookingPayload = {
  booking_id: number | string;
  cancellation_reason: string;
  service_id: number | string;
  address: string;
  latitude: string | number;
  longitude: string | number;
  datetime: string;
  status: "canceled";
};
