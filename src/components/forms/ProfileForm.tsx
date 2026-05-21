"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import {
  PROFILE_EDIT_AVATAR_FALLBACK,
  getImageSource,
} from "@/lib/image-source";
import { cn } from "@/lib/utils";
import { profileSchema, type ProfileFormValues } from "@/validations/profile";

const FIELD_ERROR_CLASS = "text-sm font-medium text-red-500";

const ProfileForm = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const loading = updateProfileMutation.isPending;
  const [preview, setPreview] = useState<string>(PROFILE_EDIT_AVATAR_FALLBACK);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      address: "",
      avatarFile: null,
    },
  });

  useEffect(() => {
    if (!user) return;

    const { address, avatar, bio, email, name, phone } = user;

    reset({
      name: name || "",
      email: email || "",
      phone: phone || "",
      bio: bio || "",
      address: address || "",
      avatarFile: null,
    });
    setPreview(getImageSource(avatar, PROFILE_EDIT_AVATAR_FALLBACK));
  }, [reset, user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (!file) return;

    setValue("avatarFile", file, { shouldDirty: true });
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) {
      toast.error("Session expired. Please login again.");
      router.push("/login");
      return;
    }

    try {
      await updateProfileMutation.mutateAsync(values);
    } catch {
      // handled by mutation toast
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-12">
      <div className="relative rounded-2xl outline-1 outline-offset-[-1px] outline-indigo-600 backdrop-blur-md overflow-hidden px-15 py-18">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <h1 className="bg-gradient-to-r from-[#F262B5] to-[#9F73F1] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold uppercase">
            Edit User Profile
          </h1>
          <p className="text-gray-400 text-sm md:text-base text-center">
            Update your personal details and settings
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2 mb-10 relative">
            <button
              type="button"
              onClick={handleAvatarClick}
              className="relative w-24 h-24 rounded-full outline-2 outline-gray-700 cursor-pointer"
            >
              <Image
                src={preview}
                alt="Avatar"
                fill
                sizes="96px"
                className="object-cover rounded-full border-2 border-indigo-600"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            </button>

            <Input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <span className="text-gray-500 text-xs">
              Allowed *.jpeg, *.jpg, *.png
            </span>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-8">
            <div className="flex flex-col gap-2">
              <label className="text-white text-xl font-semibold">
                Full Name
              </label>
              <Input
                aria-invalid={Boolean(errors.name)}
                className="bg-transparent text-gray-200 border border-neutral-50/30 rounded-md p-3"
                {...register("name")}
              />
              {errors.name?.message && (
                <p className={FIELD_ERROR_CLASS}>{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-xl font-semibold">Phone</label>
              <Input
                aria-invalid={Boolean(errors.phone)}
                className="bg-transparent text-gray-200 border border-neutral-50/30 rounded-md p-3"
                {...register("phone")}
              />
              {errors.phone?.message && (
                <p className={FIELD_ERROR_CLASS}>{errors.phone.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white text-xl font-semibold">Email</label>
              <Input
                type="email"
                aria-invalid={Boolean(errors.email)}
                className="bg-transparent text-gray-200 border border-neutral-50/30 rounded-md p-3"
                {...register("email")}
              />
              {errors.email?.message && (
                <p className={FIELD_ERROR_CLASS}>{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white text-xl font-semibold">Address</label>
              <Input
                aria-invalid={Boolean(errors.address)}
                className="bg-transparent text-gray-200 border border-neutral-50/30 rounded-md p-3"
                {...register("address")}
              />
              {errors.address?.message && (
                <p className={FIELD_ERROR_CLASS}>{errors.address.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label className="text-white text-xl font-semibold">
              Bio (Optional)
            </label>
            <Textarea
              aria-invalid={Boolean(errors.bio)}
              className={cn(
                "h-40 bg-transparent text-gray-200 border border-neutral-50/30 rounded-md p-3 resize-none",
              )}
              {...register("bio")}
            />
            {errors.bio?.message && (
              <p className={FIELD_ERROR_CLASS}>{errors.bio.message}</p>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white text-xl font-semibold bg-gradient-to-l from-blue-600 via-cyan-600 to-blue-700 hover:opacity-90 transition"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
