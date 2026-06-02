export type Booking = {
  id: number;
  status: string;
  created_at: string;
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
  booking_type?: string | null;
  cancellation_reason?: string | null;
  service_data?: string | Record<string, unknown> | null;
  field_responses?: string | BookingFieldResponse[] | null;
  service?: {
    id?: number;
    name?: string;
  };
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
};
