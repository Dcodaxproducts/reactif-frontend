import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCart } from "@/hooks/useCart";
import { LanguageSelector } from "./LanguageSelector";
import { getStartedRoute } from "@/lib/get-started-routes";
import type { MobileSidebarProps } from "@/types/component-props";

export function MobileSidebar({
  isOpen,
  user,
  authLoading,
  navItems,
  onClose,
  onSignOut,
  onLogin,
}: MobileSidebarProps) {
  const { t } = useAppTranslation();
  const { count } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] md:hidden">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <aside
        aria-label={t("nav.mobileMenu")}
        className="absolute left-0 top-0 flex h-full w-[min(86vw,360px)] flex-col border-r border-white/10 bg-[#050505] text-white shadow-2xl"
      >
        <div className="flex justify-end p-4">
          <Button
            type="button"
            aria-label={t("nav.closeMobileMenu")}
            variant="ghost"
            className="h-10 w-10 rounded-full border border-white/15 p-0 text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X size={26} />
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-6 pb-8 text-[15px]">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-6">
            <span className="font-medium">{t("nav.language")}</span>
            <LanguageSelector />
          </div>

          {navItems.map(({ label, translationKey, href }) => (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className="rounded-xl px-4 py-3 font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              {translationKey ? t(translationKey) : label}
            </Link>
          ))}

          {user ? (
            <>
              <Button
                asChild
                variant="navDark"
                className="mt-auto bg-gradient-to-r from-[#9f73f1] to-[#f21b6d] py-2 text-white"
              >
                <Link href={getStartedRoute(true)} onClick={onClose}>
                  {t("nav.myBookings")}
                </Link>
              </Button>

              <Button
                asChild
                variant="navOutline"
                className="border-white/20 py-2 text-white hover:bg-white/10"
              >
                <Link href="/cart" onClick={onClose}>
                  <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                  {t("nav.cart")}
                  {count > 0 ? ` (${count})` : ""}
                </Link>
              </Button>

              <Button
                type="button"
                onClick={onSignOut}
                variant="destructive"
                className="rounded-full py-2"
              >
                {t("nav.logout")}
              </Button>
            </>
          ) : authLoading ? (
            <Button
              type="button"
              disabled
              variant="navDark"
              className="mt-auto bg-white/10 py-2 text-white"
            >
              {t("nav.getStarted")}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onLogin}
              variant="navDark"
              className="mt-auto bg-gradient-to-r from-[#9f73f1] to-[#f21b6d] py-2 text-white"
            >
              {t("nav.getStarted")}
            </Button>
          )}
        </div>
      </aside>
    </div>
  );
}
