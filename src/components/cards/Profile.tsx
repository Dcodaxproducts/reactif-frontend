"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Share2, User, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useDeleteAccount, useProfile } from "@/hooks/useProfile";
import { PROFILE_AVATAR_FALLBACK, getImageSource } from "@/lib/image-source";
import { toast } from "sonner";

const getDisplayValue = (value: string | null | undefined, fallback: string) =>
  value?.trim() ? value : fallback;

const Profile = () => {
  const router = useRouter();
  const { t } = useAppTranslation();
  const { user, loading, error } = useProfile();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteAccountMutation = useDeleteAccount();
  const deleting = deleteAccountMutation.isPending;

  useEffect(() => {
    if (error) {
      toast.error(error);
      if (error.toLowerCase().includes("session expired")) {
        router.push("/login");
      }
    }
  }, [error, router]);

  const handleDeleteAccount = async () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAccountMutation.mutateAsync();
    } finally {
      setShowDeleteDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        {t("profile.loading")}
      </div>
    );
  }

  if (!user) return null;

  const { name, email, phone, address, avatar, bio, is_verified } = user;
  const avatarSource = getImageSource(avatar, PROFILE_AVATAR_FALLBACK);
  const profileInfoItems = [
    { label: t("profile.fullName"), value: name },
    { label: t("profile.emailAddress"), value: email },
    {
      label: t("profile.phoneNumber"),
      value: getDisplayValue(phone, t("profile.notProvided")),
    },
    {
      label: t("profile.address"),
      value: getDisplayValue(address, t("profile.notProvided")),
    },
  ];
  const bioText = bio?.trim() ? bio : t("profile.noBioProvided");

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-12 py-12 flex justify-center relative">
      {showDeleteDialog && (
        <div className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center p-4">
          <Card
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-dialog-title"
            className="bg-neutral-900 border border-red-700 rounded-2xl max-w-md w-full p-0 flex flex-col gap-4"
          >
            <CardContent className="p-6 flex flex-col gap-4">
              <h3
                id="delete-account-dialog-title"
                className="text-lg font-bold text-red-500"
              >
                {t("profile.confirmDeleteTitle")}
              </h3>
              <p className="text-gray-400 text-sm">
                {t("profile.confirmDeleteDescription")}
              </p>

              <div className="mt-4 flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition"
                  disabled={deleting}
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 flex items-center gap-2 transition disabled:opacity-50"
                >
                  {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {deleting ? t("profile.deleting") : t("profile.deleteAccount")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <Card className="w-full max-w-4xl backdrop-blur-md border border-indigo-600/40 rounded-2xl shadow-xl p-0 text-white bg-transparent">
        <CardContent className="p-8 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-start gap-5 w-full">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 p-[3px]">
                  <Image
                    src={avatarSource}
                    alt={t("profile.profileImageAlt")}
                    fill
                    sizes="112px"
                    className="object-cover rounded-full border-4 border-slate-900"
                  />
                </div>

                <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-slate-900 bg-indigo-600">
                  {is_verified ? (
                    <Check size={14} className="text-white" />
                  ) : (
                    <X size={14} className="text-white" />
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h2 className="text-xl sm:text-2xl font-semibold">
                  {name}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {t("profile.role")}
                </p>
                <span className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40">
                  {is_verified
                    ? t("profile.activeMember")
                    : t("profile.inactiveMember")}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-3">
              <Link
                href="/profile/edit"
                className="w-[125px] flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-l from-blue-600 via-cyan-600 to-blue-700 hover:opacity-90 transition"
              >
                <Pencil size={16} />
                {t("profile.editProfile")}
              </Link>

              <Button
                type="button"
                aria-label={t("profile.shareProfile")}
                className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition h-auto"
              >
                <Share2 size={18} />
              </Button>
            </div>
          </div>

          <div className="my-8 border-t border-white/10" />
          <div>
            <div className="flex items-center gap-2 mb-6">
              <User size={18} className="text-blue-400" />
              <h3 className="text-lg font-semibold">
                {t("profile.personalInformation")}
              </h3>
            </div>

            <div className="space-y-6 text-sm">
              {profileInfoItems.map((item) => (
                <div key={item.label}>
                  <p className="text-gray-400 uppercase text-xs tracking-wide mb-1">
                    {item.label}
                  </p>
                  <p className="text-white break-words">{item.value}</p>
                  <div className="mt-3 border-t border-white/10" />
                </div>
              ))}
              <div>
                <p className="text-gray-400 uppercase text-xs tracking-wide mb-3">
                  {t("profile.bio")}
                </p>
                <Textarea
                  readOnly
                  className="w-full bg-slate-800/60 border border-pink-500/40 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50 resize-none transition"
                  rows={4}
                  value={bioText}
                />
              </div>
            </div>
          </div>
          <div className="mt-12">
            <p className="text-red-500 text-xs uppercase tracking-widest font-semibold mb-4">
              {t("profile.dangerZone")}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div>
                <h4 className="font-semibold text-gray-900">
                  {t("profile.deleteAccount")}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {t("profile.deleteAccountDescription")}
                </p>
              </div>

              <Button
                type="button"
                onClick={handleDeleteAccount}
                variant="ghost"
                className="text-red-600 font-semibold hover:text-red-700 transition bg-transparent hover:bg-transparent h-auto p-0"
              >
                {t("profile.deleteAccount")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
