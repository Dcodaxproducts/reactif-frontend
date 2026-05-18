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
  onLogout,
}: NavbarActionsProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3 md:gap-4 relative">
      {user && (
        <Button
          onClick={() => router.push("/order/management")}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-white/10 transition"
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
          onLogout={onLogout}
        />
      ) : (
        <Link
          href="/login"
          className="hidden md:block bg-neutral-800 text-[#E2E2E2] px-5 py-2 rounded-full transition text-[15px]"
        >
          Get Started
        </Link>
      )}
    </div>
  );
}
