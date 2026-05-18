export type Booking = {
  id: number;
  status: string;
  created_at: string;
  schedule_datetime?: string | null;
  total_amount: number | string;
  service_data?: string | Record<string, unknown> | null;
  field_responses?: string | BookingFieldResponse[] | null;
  service?: {
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
