"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { X, PencilRuler, Brush } from "lucide-react";
import { toast } from "sonner";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import {
  buildDesignPathHref,
  type DesignPathType,
} from "@/lib/design-path-routes";

type DesignPathModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categoryId?: string | number | null;
  categorySlug?: string | null;
  serviceId?: string | number | null;
  subcategoryId?: string | number | null;
  subcategoryName: string;
  subcategorySlug: string;
};

export default function DesignPathModal({
  isOpen,
  onClose,
  categoryId: categoryIdProp,
  categorySlug: categorySlugProp,
  serviceId,
  subcategoryId,
  subcategoryName,
  subcategorySlug,
}: DesignPathModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useAppTranslation();

  if (!isOpen) return null;

  const categoryId = categoryIdProp ?? searchParams.get("id");
  const categorySlug = categorySlugProp ?? searchParams.get("slug") ?? "";

  const handleSelect = (pathType: DesignPathType) => {
    const href = buildDesignPathHref({
      pathType,
      categoryId,
      subcategoryId,
      subcategoryName,
      subcategorySlug,
      categorySlug,
      serviceId,
    });

    if (!href) {
      toast.error(t("designPath.missingCategoryError"));
      router.push("/subcategories");
      onClose();
      return;
    }

    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#333333CC] animate-fadeBackdrop"
        onClick={onClose}
      />

      <div className="flex min-h-screen items-start md:items-center justify-center px-4 py-10">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="design-path-modal-title"
          className="relative w-full max-w-4xl bg-[#0B0F19] rounded-3xl border border-gray-800 p-6 md:p-12 animate-scaleIn"
        >
          <Button
            type="button"
            aria-label={t("designPath.close")}
            onClick={onClose}
            className="absolute top-5 right-5 bg-gray-800 rounded-full p-2 text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </Button>

          <div className="text-center mb-8">
            <h2
            id="design-path-modal-title"
            className="text-white text-2xl md:text-3xl font-bold"
          >
              {t("designPath.title")}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 p-8 bg-black/50 rounded-3xl border border-gray-800 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gray-900 rounded-3xl border border-gray-800 flex items-center justify-center">
                  <PencilRuler size={28} className="text-pink-400" />
                </div>
              </div>

              <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                {t("designPath.haveDesignTitle")}
              </h3>

              <p className="text-gray-400 mb-8">
                {t("designPath.haveDesignDescription")}
              </p>

              <Button
                type="button"
                onClick={() => handleSelect("have-design")}
                className="w-full h-11 bg-pink-400 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                {t("common.select")}
              </Button>
            </div>

            <div className="flex-1 p-8 bg-black/50 rounded-3xl border border-gray-800 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gray-900 rounded-3xl border border-gray-800 flex items-center justify-center">
                  <Brush size={28} className="text-sky-300" />
                </div>
              </div>

              <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                {t("designPath.needDesignerTitle")}
              </h3>

              <p className="text-gray-400 mb-8">
                {t("designPath.needDesignerDescription")}
              </p>

              <Button
                type="button"
                onClick={() => handleSelect("need-designer")}
                className="w-full h-11 bg-sky-300 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                {t("common.select")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out forwards;
        }

        .animate-fadeBackdrop {
          animation: fadeBackdrop 0.2s ease-out forwards;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeBackdrop {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
