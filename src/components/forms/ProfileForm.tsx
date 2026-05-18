"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUpdateProfile } from "@/hooks/useProfile";
const ProfileForm = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateProfileMutation = useUpdateProfile();
  const loading = updateProfileMutation.isPending;
  const [preview, setPreview] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    address: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        address: user.address || "",
      });

      setPreview(user.avatar || "https://placehold.co/96x96");
    }
  }, []);

  // ✅ Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle avatar click
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ Handle file select + preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Submit handler
  const handleSubmit = async () => {
    const token = localStorage.getItem("sessionToken");

    if (!token) {
      toast.error("Session expired. Please login again.");
      router.push("/login");
      return;
    }

    try {
      await updateProfileMutation.mutateAsync({ ...formData, avatarFile });
    } catch {
      // handled by mutation toast
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-12">
      <div className="relative rounded-2xl outline outline-1 outline-offset-[-1px] outline-indigo-600 backdrop-blur-md overflow-hidden px-15 py-18">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <h1 className="bg-gradient-to-r from-[#F262B5] to-[#9F73F1] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold uppercase">
            Edit User Profile
          </h1>
          <p className="text-gray-400 text-sm md:text-base text-center">
            Update your personal details and settings
          </p>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-2 mb-10 relative">
          <div
            onClick={handleAvatarClick}
            className="relative w-24 h-24 rounded-full outline outline-2 outline-gray-700 cursor-pointer"
          >
            <img
              src={preview}
              alt="Avatar"
              className="w-full h-full object-cover rounded-full border-2 border-indigo-600"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
              <Check size={14} className="text-white" />
            </div>
          </div>

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
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent text-gray-200 border border-neutral-50/30 rounded-md p-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-xl font-semibold">Phone</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-transparent text-gray-200 border border-neutral-50/30 rounded-md p-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-xl font-semibold">Email</label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent text-gray-200 border border-neutral-50/30 rounded-md p-3"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white text-xl font-semibold">Address</label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-transparent text-gray-200 border border-neutral-50/30 rounded-md p-3"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-8">
          <label className="text-white text-xl font-semibold">
            Bio (Optional)
          </label>
          <Textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className={cn(
              "h-40 bg-transparent text-gray-200 border border-neutral-50/30 rounded-md p-3 resize-none",
            )}
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 text-white text-xl font-semibold bg-gradient-to-l from-blue-600 via-cyan-600 to-blue-700 hover:opacity-90 transition"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
