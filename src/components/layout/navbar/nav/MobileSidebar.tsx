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
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute left-0 top-0 w-[280px] h-full bg-white shadow-xl">
        <div className="flex justify-end p-4">
          <Button
            type="button"
            aria-label="Close mobile menu"
            variant="ghost"
            className="h-auto w-auto p-0 text-black hover:bg-transparent"
            onClick={onClose}
          >
            <X size={26} />
          </Button>
        </div>

        <div className="flex flex-col gap-5 px-6 text-[15px]">
          <div className="flex items-center justify-between gap-3 text-black">
            <span className="font-medium">{t("nav.language")}</span>
            <LanguageSelector tone="light" />
          </div>

          {navItems.map(({ label, translationKey, href }) => (
            <Link key={label} href={href} onClick={onClose}>
              {translationKey ? t(translationKey) : label}
            </Link>
          ))}

          {user ? (
            <>
              <Button
                asChild
                variant="navDark"
                className="mt-4 py-2"
              >
                <Link href={getStartedRoute(true)} onClick={onClose}>
                  {t("nav.myBookings")}
                </Link>
              </Button>

              <Button
                asChild
                variant="navOutline"
                className="border-black/20 py-2 text-black hover:bg-black/5"
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
              className="mt-4 py-2"
            >
              {t("nav.getStarted")}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onLogin}
              variant="navDark"
              className="mt-4 py-2"
            >
              {t("nav.getStarted")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
