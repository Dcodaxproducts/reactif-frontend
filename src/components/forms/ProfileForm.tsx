"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import {
  PROFILE_EDIT_AVATAR_FALLBACK,
  getImageSource,
} from "@/lib/image-source";
import { cn } from "@/lib/utils";
import {
  createProfileSchema,
  type ProfileFormValues,
} from "@/validations/profile";

const FIELD_ERROR_CLASS = "text-sm font-medium text-red-500";
const PROFILE_FIELD_WRAPPER_CLASS = "flex flex-col gap-2";
const PROFILE_LABEL_CLASS = "text-white text-xl";
const PROFILE_LABEL_WEIGHT_CLASS = "font-semibold";
const PROFILE_INPUT_CLASS = "bg-transparent text-gray-200 border";
const PROFILE_INPUT_SURFACE_CLASS = "border-neutral-50/30 rounded-md p-3";
const PROFILE_TEXTAREA_CLASS = `${PROFILE_INPUT_CLASS} ${PROFILE_INPUT_SURFACE_CLASS} h-40 resize-none`;
const PROFILE_SUBMIT_CLASS =
  "w-full py-3 font-semibold text-xl text-white bg-gradient-to-l from-blue-600 via-cyan-600 to-blue-700 hover:opacity-90 transition";

const profileFields: Array<{
  name: "name" | "phone" | "email" | "address";
  labelKey: string;
  type?: "email";
}> = [
  { name: "name", labelKey: "profile.fullName" },
  { name: "phone", labelKey: "profile.phone" },
  { name: "email", labelKey: "profile.email", type: "email" },
  { name: "address", labelKey: "profile.address" },
];

const ProfileForm = () => {
  const router = useRouter();
  const { t } = useAppTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const localAvatarPreviewUrlRef = useRef<string | null>(null);
  const translatedProfileSchema = useMemo(() => createProfileSchema(t), [t]);

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
    resolver: zodResolver(translatedProfileSchema),
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
      name: name ?? "",
      email: email ?? "",
      phone: phone ?? "",
      bio: bio ?? "",
      address: address ?? "",
      avatarFile: null,
    });

    if (localAvatarPreviewUrlRef.current) {
      URL.revokeObjectURL(localAvatarPreviewUrlRef.current);
      localAvatarPreviewUrlRef.current = null;
    }

    setPreview(getImageSource(avatar, PROFILE_EDIT_AVATAR_FALLBACK));
  }, [reset, user]);

  useEffect(() => {
    return () => {
      if (localAvatarPreviewUrlRef.current) {
        URL.revokeObjectURL(localAvatarPreviewUrlRef.current);
      }
    };
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (!file) return;

    if (localAvatarPreviewUrlRef.current) {
      URL.revokeObjectURL(localAvatarPreviewUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);
    localAvatarPreviewUrlRef.current = previewUrl;

    setValue("avatarFile", file, { shouldDirty: true });
    setPreview(previewUrl);
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) {
      toast.error(t("profile.sessionExpired"));
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
        <div className="flex flex-col items-center gap-2 mb-10">
          <h1 className="bg-gradient-to-r from-[#F262B5] to-[#9F73F1] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold uppercase">
            {t("profile.editTitle")}
          </h1>
          <p className="text-gray-400 text-sm md:text-base text-center">
            {t("profile.editDescription")}
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-2 mb-10 relative">
            <button
              type="button"
              onClick={handleAvatarClick}
              className="relative w-24 h-24 rounded-full outline-2 outline-gray-700 cursor-pointer"
            >
              <Image
                src={preview}
                alt={t("profile.avatarAlt")}
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
              {t("profile.allowedImageTypes")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-8">
            {profileFields.map((field) => {
              const { labelKey, name, type } = field;
              const error = errors[name]?.message;
              const label = t(labelKey);

              return (
                <div key={name} className={PROFILE_FIELD_WRAPPER_CLASS}>
                  <label
                    htmlFor={`profile-${name}`}
                    className={cn(PROFILE_LABEL_CLASS, PROFILE_LABEL_WEIGHT_CLASS)}
                  >
                    {label}
                  </label>
                  <Input
                    id={`profile-${name}`}
                    type={type}
                    aria-invalid={Boolean(error)}
                    className={cn(PROFILE_INPUT_CLASS, PROFILE_INPUT_SURFACE_CLASS)}
                    {...register(name)}
                  />
                  {error && <p className={FIELD_ERROR_CLASS}>{error}</p>}
                </div>
              );
            })}
          </div>

          <div className={`${PROFILE_FIELD_WRAPPER_CLASS} mb-8`}>
            <label
              htmlFor="profile-bio"
              className={cn(PROFILE_LABEL_CLASS, PROFILE_LABEL_WEIGHT_CLASS)}
            >
              {t("profile.bioOptional")}
            </label>
            <Textarea
              id="profile-bio"
              aria-invalid={Boolean(errors.bio)}
              className={cn(PROFILE_TEXTAREA_CLASS)}
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
              className={PROFILE_SUBMIT_CLASS}
            >
              {loading ? t("profile.saving") : t("common.save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
