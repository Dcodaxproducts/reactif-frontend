export type Subcategory = {
  id: number;
  name: string;
  description: string;
  category_image: string;
  status: number;
};

export type Category = {
  id: number;
  name: string;
  description?: string;
  status: number;
  subcategories?: Subcategory[];
};

export type ServiceFieldOption = {
  key: string;
  display: string;
};

export type ServiceField = {
  id: number;
  label: string;
  input_type: string;
  field_name: string;
  is_required: boolean;
  placeholder?: string;
  options?: ServiceFieldOption[];
  default_value?: string | null;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  category_id: number;
  sub_category_id: number;
  service_image: string;
  price: number;
  fields: ServiceField[];
};
