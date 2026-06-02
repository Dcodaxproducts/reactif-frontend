import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserDropdown } from "./UserDropdown";
import type { NavbarActionsProps } from "@/types/component-props";

export function NavbarActions({
  user,
  dropdownOpen,
  dropdownRef,
  onToggleDropdown,
  onCloseDropdown,
  onLogout,
}: NavbarActionsProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 md:gap-4 relative">
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
          onLogout={onLogout}
        />
      ) : (
        <Button asChild variant="navDark" className="hidden md:inline-flex px-5 py-2 text-[15px]">
          <Link href="/login">Get Started</Link>
        </Button>
      )}
    </div>
  );
}
