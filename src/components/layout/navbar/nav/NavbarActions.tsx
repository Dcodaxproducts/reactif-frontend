import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCart } from "@/hooks/useCart";
import { LanguageSelector } from "./LanguageSelector";
import { UserDropdown } from "./UserDropdown";
import { getStartedRoute } from "@/lib/get-started-routes";
import type { NavbarActionsProps } from "@/types/component-props";

export function NavbarActions({
  user,
  authLoading,
  dropdownOpen,
  dropdownRef,
  onToggleDropdown,
  onCloseDropdown,
  onSignOut,
}: NavbarActionsProps) {
  const router = useRouter();
  const { t } = useAppTranslation();
  const { count } = useCart();

  return (
    <div className="flex items-center gap-3 md:gap-4 relative">
      <div className="hidden md:block">
        <LanguageSelector />
      </div>

      {user && (
        <Button
          variant="navOutline"
          onClick={() => router.push("/cart")}
          aria-label={t("nav.cart")}
          className="relative h-9 w-9 md:h-10 md:w-10"
        >
          <ShoppingCart size={19} />
          {count > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border border-black bg-cyan-200 px-1 text-[11px] font-bold text-slate-950">
              {count > 9 ? "9+" : count}
            </span>
          ) : null}
        </Button>
      )}

      {user ? (
        <UserDropdown
          user={user}
          isOpen={dropdownOpen}
          dropdownRef={dropdownRef}
          onToggle={onToggleDropdown}
          onClose={onCloseDropdown}
          onSignOut={onSignOut}
        />
      ) : authLoading ? (
        <Button
          type="button"
          variant="navDark"
          disabled
          className="hidden md:inline-flex px-5 py-2 text-[15px]"
        >
          {t("nav.getStarted")}
        </Button>
      ) : (
        <Button
          asChild
          variant="navDark"
          className="hidden md:inline-flex px-5 py-2 text-[15px]"
        >
          <Link href={getStartedRoute(false)}>{t("nav.getStarted")}</Link>
        </Button>
      )}
    </div>
  );
}
