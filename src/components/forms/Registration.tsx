"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useRegister } from "@/hooks/useAuth";
import {
  getSchemaValidationMessage,
  registrationSchema,
} from "@/validations/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { toast } from "sonner";

export default function RegistrationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerMutation = useRegister();
  const loading = registerMutation.isPending;
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <section className="w-full min-h-screen flex items-center justify-center px-4 py-10">
      <div
        className="
        w-full
        max-w-xl
        rounded-3xl
        border border-indigo-600
        backdrop-blur-sm
        bg-black/10
        p-6 sm:p-8 md:p-14 md:py-17
        flex flex-col gap-8
        "
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1
            className="
          bg-gradient-to-r from-[#F262B5] to-[#9F73F1]
          bg-clip-text text-transparent
          text-2xl sm:text-3xl md:text-4xl
          font-bold font-hk uppercase
          "
          >
            Create New Account
          </h1>

          <p className="text-neutral-50/60 text-sm sm:text-base font-semibold font-hk">
            Join ReactIf Printing and Design Today
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">Full Name</Label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
            />
          </div>

          {/* Username + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-neutral-50 font-semibold">
                Username (Optional)
              </Label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-neutral-50 font-semibold">
                Phone Number
              </Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label className="text-neutral-50 font-semibold">
              Confirm Password
            </Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              className="bg-transparent border-neutral-50/30 text-white focus:border-blue-600"
            />
          </div>

          {/* Captcha (kept as-is) */}
          {/* <div className="flex items-center justify-between border border-neutral-50/30 rounded-md p-3">
            <div className="flex items-center gap-3">
              <Checkbox />
              <span className="text-neutral-50/60 text-sm">
                I am not a robot
              </span>
            </div>
            <div className="w-10 h-10 bg-neutral-400 rounded-sm" />
          </div> */}

          {/* Error / Success Messages */}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {success && (
            <p className="text-green-500 text-sm font-medium">{success}</p>
          )}

          {/* Register Button */}
          <Button
            type="submit"
            disabled={loading}
            className="
           
            w-full
            bg-gradient-to-l
            from-blue-600
            via-cyan-600
            to-blue-700
            text-white
            text-base sm:text-lg
            font-semibold
            hover:opacity-90
            py-3
            "
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm sm:text-base font-semibold text-neutral-50/60">
            Already Have an Account?{" "}
            <Link href="/login" className="text-blue-600">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
