import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { LanguageSelector } from "./LanguageSelector";
import { UserDropdown } from "./UserDropdown";
import type { NavbarActionsProps } from "@/types/component-props";

export function NavbarActions({
  user,
  dropdownOpen,
  dropdownRef,
  onToggleDropdown,
  onCloseDropdown,
  onSignOut,
}: NavbarActionsProps) {
  const router = useRouter();
  const { t } = useAppTranslation();

  return (
    <div className="flex items-center gap-3 md:gap-4 relative">
      <div className="hidden md:block">
        <LanguageSelector />
      </div>

      {user && (
        <Button
          variant="navOutline"
          onClick={() => router.push("/order/management")}
          className="w-9 h-9 md:w-10 md:h-10"
        >
          <ShoppingCart size={19} />
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
      ) : (
        <Button
          asChild
          variant="navDark"
          className="hidden md:inline-flex px-5 py-2 text-[15px]"
        >
          <Link href="/login">{t("nav.getStarted")}</Link>
        </Button>
      )}
    </div>
  );
}
