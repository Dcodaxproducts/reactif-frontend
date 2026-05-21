"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  AUTH_ERROR_CLASS,
  AUTH_FORM_CLASS,
  AUTH_FORM_GRID_CLASS,
  AUTH_SUCCESS_CLASS,
  AuthFormShell,
  AuthInlineLink,
  AuthSubmitButton,
  AuthTextField,
} from "@/components/forms/AuthFormShell";
import { useRegister } from "@/hooks/useAuth";
import {
  registrationSchema,
  type RegistrationFormValues,
} from "@/validations/auth";

export default function RegistrationForm() {
  const registerMutation = useRegister();
  const loading = registerMutation.isPending;
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    register,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({
    fullName,
    email,
    phone,
    password,
  }: RegistrationFormValues) => {
    if (!navigator.onLine) {
      toast.error("No internet connection.");
      return;
    }

    try {
      await registerMutation.mutateAsync({ fullName, email, phone, password });
    } catch {
      // handled by mutation toast
    }
  };

  return (
    <AuthFormShell
      title="Create New Account"
      description="Join ReactIf Printing and Design Today"
    >
      <form noValidate className={AUTH_FORM_CLASS} onSubmit={handleSubmit(onSubmit)}>
        <AuthTextField
          label="Full Name"
          placeholder="Enter Full Name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <div className={AUTH_FORM_GRID_CLASS}>
          <AuthTextField
            label="Username (Optional)"
            placeholder="Enter Username"
            error={errors.username?.message}
            {...register("username")}
          />
          <AuthTextField
            label="Phone Number"
            placeholder="Enter Phone Number"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>

        <AuthTextField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Enter Your Email"
          error={errors.email?.message}
          {...register("email")}
        />
        <AuthTextField
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter Password"
          error={errors.password?.message}
          {...register("password")}
        />
        <AuthTextField
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter Confirm Password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {registerMutation.isError && (
          <p className={AUTH_ERROR_CLASS}>Something went wrong.</p>
        )}
        {isSubmitSuccessful && !registerMutation.isError && (
          <p className={AUTH_SUCCESS_CLASS}>
            Account created successfully! Please verify your email with the OTP
            sent.
          </p>
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
