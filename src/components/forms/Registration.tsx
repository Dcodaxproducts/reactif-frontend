"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  AuthFormShell,
  AuthInlineLink,
  AuthSubmitButton,
  AuthTextField,
} from "@/components/forms/AuthFormShell";
import { useRegister } from "@/hooks/useAuth";
import {
  getSchemaValidationMessage,
  registrationSchema,
} from "@/validations/auth";

const REGISTER_FIELD_CLASS = "bg-transparent border-neutral-50/30 text-white focus:border-blue-600";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const registerMutation = useRegister();
  const loading = registerMutation.isPending;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  const validateForm = () =>
    getSchemaValidationMessage(registrationSchema, formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!navigator.onLine) {
      setError("No internet connection.");
      toast.error("No internet connection.");
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      await registerMutation.mutateAsync({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      setSuccess(
        "Account created successfully! Please verify your email with the OTP sent.",
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    }
  };

  return (
    <AuthFormShell
      title="Create New Account"
      description="Join ReactIf Printing and Design Today"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthTextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter Full Name"
          className={REGISTER_FIELD_CLASS}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AuthTextField
            label="Username (Optional)"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className={REGISTER_FIELD_CLASS}
          />
          <AuthTextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone Number"
            className={REGISTER_FIELD_CLASS}
          />
        </div>

        <AuthTextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
          className={REGISTER_FIELD_CLASS}
        />
        <AuthTextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className={REGISTER_FIELD_CLASS}
        />
        <AuthTextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Enter Confirm Password"
          className={REGISTER_FIELD_CLASS}
        />

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm font-medium">{success}</p>
        )}

        <AuthSubmitButton type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Register"}
        </AuthSubmitButton>

        <AuthInlineLink href="/login" label="Sign in">
          Already Have an Account?
        </AuthInlineLink>
      </form>
    </AuthFormShell>
  );
}
