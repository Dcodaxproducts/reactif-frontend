"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { ArrowRight, Shield } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth"; 
import { toast } from "sonner";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
interface FieldOption {
  key: string;
  display: string;
}

interface Field {
  id: number;
  label: string;
  input_type: string;
  field_name: string;
  is_required: boolean;
  placeholder?: string;
  options?: FieldOption[];
  default_value?: string | null;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  fields: Field[];
}

interface PaintProtectionCardProps {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
  activeCategory: string | null;
  services?: Service[];
  isLoading?: boolean; // ✅ NEW
}

export default function PaintProtectionCard({
  activeItem,
  setActiveItem,
  activeCategory,
  services = [],
  isLoading = false,
}: PaintProtectionCardProps) {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState<Record<string, any>>({});
const { user, loading: authLoading } = useAuth();
const [bookingLoading, setBookingLoading] = useState(false);
  const currentService = services.find(
    (s) => s.id.toString() === activeItem
  );
  const summaryBg = "bg-[#F262B5]/10 outline-[#F262B5]/10";
const searchParams = useSearchParams();
const designerId = searchParams.get("designerId");
  const activeBg = "bg-[#F262B5]";

const router = useRouter();
  const generateSchema = () => {
  if (!currentService?.fields) return null;

  const schemaFields: Record<string, any> = {};

  currentService.fields.forEach((field) => {
    let validator;

    switch (field.input_type) {
      case "email":
        validator = z.string().email(`${field.label} must be a valid email`);
        break;

      case "number":
        validator = z.coerce
          .number()
          .min(0, `${field.label} must be a valid number`);
        break;

      case "tel":
        validator = z
          .string()
          .min(6, `${field.label} must be a valid phone number`);
        break;

      case "file":
        validator = z.any();
        break;

      case "checkbox":
        validator = z.array(z.string());
        break;

      default:
        validator = z.string();
    }

    if (field.is_required) {
      validator = validator.refine(
        (val: any) =>
          val !== undefined &&
          val !== null &&
          val !== "" &&
          !(Array.isArray(val) && val.length === 0),
        `${field.label} is required`
      );
    } else {
      validator = validator.optional();
    }

    schemaFields[field.field_name] = validator;
  });

  return z.object(schemaFields);
};

  // Auto select first service
  useEffect(() => {
    if (!isLoading && services.length > 0) {
      setActiveItem(services[0].id.toString());
    }
  }, [activeCategory, services, isLoading]);

  // Initialize form fields
  useEffect(() => {
    if (currentService?.fields) {
      const initialValues: Record<string, any> = {};
      currentService.fields.forEach((f) => {
        initialValues[f.field_name] = f.default_value || "";
      });
      setFormValues(initialValues);
    }
  }, [currentService]);

  const handleChange = (fieldName: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
    setFormErrors((prev) => {
    const updated = { ...prev };
    delete updated[fieldName];
    return updated;
  });
  };
  
const handleCreateBooking = async () => {
  if (!currentService) {
    toast.error("Please select a service");
    return;
  }
 if (!user) {
  toast.error("Please login first");

  // ✅ Save current page URL
  if (typeof window !== "undefined") {
    localStorage.setItem("redirectAfterLogin", window.location.href);
  }

  router.push("/login");
  return;
}

  // 🔐 Zod Validation
const schema = generateSchema();

if (schema) {
  const result = schema.safeParse(formValues);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      errors[field] = err.message;
    });

    setFormErrors(errors);

    toast.error("Please fill all required fields");
    return;
  }

  setFormErrors({});
}


  const token = localStorage.getItem("sessionToken");
  if (!token) return;

  setBookingLoading(true);

  try {
    const isSchedule = true;

    const formData = new FormData();

    // Basic fields
    formData.append("service_id", String(currentService.id));
    formData.append("address", "Rawalpindi, Pakistan");
    formData.append("latitude", "33.5651");
    formData.append("longitude", "73.0169");
    formData.append("datetime", new Date().toISOString());
    formData.append("status", "new_booking");
    formData.append("is_schedule", isSchedule ? "1" : "0");
    formData.append("distance", "5.5");
    formData.append("base_fare", String(currentService.price || 10));
    formData.append("subtotal", String(currentService.price || 50));
    formData.append("extra_charges_amount", "5");
    formData.append(
      "total_amount",
      String((currentService.price || 50) + 5)
    );
    formData.append("payment_type", "cash");
    formData.append("booking_type", "without_bidding");
if (designerId) {
  formData.append("designer_id", designerId);
}
    if (isSchedule) {
      formData.append("schedule_datetime", new Date().toISOString());
    }

    // Service Data
    formData.append(
      "service_data",
      JSON.stringify({
        service_name: currentService.name,
        category: activeCategory,
      })
    );

    // Field Responses
    const formattedFieldResponses = currentService.fields?.map((field) => {
      const value = formValues[field.field_name];

      // If file → append separately
      if (field.input_type === "file" && value instanceof File) {
        formData.append(`file_${field.id}`, value);
      }

      return {
        field_id: field.id,
        field_name: field.field_name,
        field_type: field.input_type,
        lable: field.label,
        value:
          field.input_type === "file"
            ? value instanceof File
              ? `file_${field.id}` // reference key
              : null
            : Array.isArray(value)
            ? value.join(", ")
            : value ?? "",
      };
    }) || [];

    formData.append(
      "field_responses",
      JSON.stringify(formattedFieldResponses)
    );

    console.log("🚀 Sending FormData...");

    const res = await fetch(`${API_BASE_URL}/booking`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ DO NOT SET Content-Type manually
      },
      body: formData,
    });

    const text = await res.text();
    console.log("📦 Raw Backend Response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      toast.error("Server error");
      return;
    }

    if (!res.ok) {
      toast.error(data.message || "Booking failed");
      return;
    }

    toast.success("Booking created successfully 🎉");
    router.push('/order/management');
  } catch (error) {
    console.error("🔥 Booking Error:", error);
    toast.error("Something went wrong");
  } finally {
    setBookingLoading(false);
  }
};

  return (
    <div className="w-full md:w-auto p-6 md:p-8 rounded-3xl outline outline-1 outline-slate-700 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-neutral-50" />
        <div className="text-neutral-50 text-lg font-bold font-hk">
          {activeCategory || "Service Details"}
        </div>
      </div>

      {/* 🔥 Loading Skeleton */}
      {isLoading && (
        <div className="flex flex-col gap-4 animate-pulse">
          <div className="h-4 w-2/3 bg-slate-700 rounded" />
          <div className="h-4 w-1/2 bg-slate-700 rounded" />
          <div className="h-12 w-full bg-slate-800 rounded-xl" />
          <div className="h-12 w-full bg-slate-800 rounded-xl" />
          <div className="h-12 w-full bg-slate-800 rounded-xl" />
        </div>
      )}

      {/* Description */}
      {!isLoading && (
        <div className="text-neutral-400 text-sm md:text-base font-medium font-hk leading-relaxed">
          {currentService?.description ||
            "Please select a service to configure your request."}
        </div>
      )}

      {/* No Services */}
      {!isLoading && services.length === 0 && (
        <div className="w-full p-6 rounded-xl bg-neutral-900/40 border border-slate-800 text-center text-neutral-400 text-sm">
          No services available under this category.
        </div>
      )}

      {/* Service Without Fields */}
      {!isLoading &&
        currentService &&
        (!currentService.fields || currentService.fields.length === 0) && (
          <div className="w-full p-6 rounded-xl bg-neutral-900/40 border border-slate-800 text-center text-neutral-400 text-sm">
            This service does not require additional configuration.
          </div>
        )}

      {/* Dynamic Fields */}
      {!isLoading &&
        currentService?.fields &&
        currentService.fields.length > 0 && (
          <div className="w-full flex flex-col gap-5 mt-2">
            {currentService.fields.map((field) => {
              const value = formValues[field.field_name] || "";

              const commonInputClasses =
                "w-full px-4 py-3 rounded-xl outline outline-1 outline-slate-700 text-sm text-neutral-50 bg-black/20 focus:outline-[#F262B5] focus:ring-1 focus:ring-[#F262B5] transition";

              return (
                <div key={field.id} className="flex flex-col gap-2">
                  <label className="text-sm text-neutral-300 font-medium">
                    {field.label}
                    {field.is_required && (
                      <span className="text-[#F262B5] ml-1">*</span>
                    )}
                  </label>

                  {(() => {
                    switch (field.input_type) {
                      case "text":
                      case "email":
                      case "tel":
                      case "number":
                      case "date":
                        return (
                          <input
                            type={field.input_type}
                            placeholder={field.placeholder}
                            required={field.is_required}
                            value={value}
                            onChange={(e) =>
                              handleChange(field.field_name, e.target.value)
                            }
                            className={commonInputClasses}
                          />
                          
                        );
                        case "color":
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        required={field.is_required}
        value={value || "#000000"}
        onChange={(e) =>
          handleChange(field.field_name, e.target.value)
        }
        className="w-14 h-10 p-1 rounded-lg bg-transparent border border-slate-700 cursor-pointer"
      />
      <span className="text-sm text-neutral-400">
        {value || "#000000"}
      </span>
    </div>
  );
                      case "textarea":
                        return (
                          <textarea
                            placeholder={field.placeholder}
                            required={field.is_required}
                            value={value}
                            rows={4}
                            onChange={(e) =>
                              handleChange(field.field_name, e.target.value)
                            }
                            className={`${commonInputClasses} resize-none`}
                          />
                        );

                      case "file":
                        return (
                          <input
                            type="file"
                            required={field.is_required}
                            onChange={(e) =>
                              handleChange(
                                field.field_name,
                                e.target.files?.[0] || null
                              )
                            }
                            className={`${commonInputClasses} file:mr-3 file:px-3 file:py-1 file:rounded-md file:border-0 file:bg-[#F262B5]/20 file:text-[#F262B5]`}
                          />
                        );

                      case "select":
                        return (
                          <Select
                            onValueChange={(val) =>
                              handleChange(field.field_name, val)
                            }
                            value={value}
                          >
                            <SelectTrigger className="w-full h-12 rounded-xl text-sm text-neutral-50 bg-black/20 border border-slate-700 focus:border-[#F262B5] focus:ring-1 focus:ring-[#F262B5]">
                              <SelectValue
                                placeholder={field.placeholder || "Select"}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((opt) => (
                                <SelectItem key={opt.key} value={opt.key}>
                                  {opt.display}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );

                      case "radio":
                        return (
                          <div className="flex flex-col gap-3 mt-1">
                            {field.options?.map((opt) => (
                              <label
                                key={opt.key}
                                className="flex items-center gap-3 cursor-pointer text-sm text-neutral-50"
                              >
                                <input
                                  type="radio"
                                  name={field.field_name}
                                  value={opt.key}
                                  checked={value === opt.key}
                                  onChange={() =>
                                    handleChange(field.field_name, opt.key)
                                  }
                                />
                                {opt.display}
                              </label>
                            ))}
                          </div>
                        );

                      case "checkbox":
                        return (
                          <div className="flex flex-col gap-3 mt-1">
                            {field.options?.map((opt) => {
                              const checkedValues: string[] = value || [];
                              return (
                                <label
                                  key={opt.key}
                                  className="flex items-center gap-3 cursor-pointer text-sm text-neutral-50"
                                >
                                  <input
                                    type="checkbox"
                                    value={opt.key}
                                    checked={checkedValues.includes(opt.key)}
                                    onChange={(e) => {
                                      let updated = [...checkedValues];
                                      if (e.target.checked) {
                                        updated.push(opt.key);
                                      } else {
                                        updated = updated.filter(
                                          (v) => v !== opt.key
                                        );
                                      }
                                      handleChange(field.field_name, updated);
                                    }}
                                  />
                                  {opt.display}
                                </label>
                              );
                            })}
                          </div>
                        );

                      default:
                        return (
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            value={value}
                            onChange={(e) =>
                              handleChange(field.field_name, e.target.value)
                            }
                            className={commonInputClasses}
                          />
                        );
                    }
                  })()}
                {formErrors[field.field_name] && (
  <p className="text-xs text-red-400">
    {formErrors[field.field_name]}
  </p>
)}
                </div>
               
              );
            })}
          </div>
          
        )}
             <div className={`w-full  p-4 rounded-lg outline outline-1 flex flex-col gap-2.5 ${summaryBg}`}>
        <div className="text-xs font-bold font-hk text-[#F262B5]">
          Configuration Summary
        </div>

        <div className="text-neutral-50 text-xs font-bold font-hk">
          {activeCategory} — {currentService?.name || "No selection"}
        </div>

        <button
  onClick={handleCreateBooking}
  disabled={bookingLoading || authLoading}
  className={`w-full px-4 py-3 rounded-lg flex justify-center items-center gap-2.5 cursor-pointer hover:opacity-90 transition ${activeBg}`}
>
         <div className="text-neutral-50 text-xs font-bold font-hk">
  {bookingLoading ? "Creating Booking..." : "Get Quote"}
</div>
          <ArrowRight className="w-4 h-4 text-neutral-50" />
        </button>
      </div>
    </div>
  );
}