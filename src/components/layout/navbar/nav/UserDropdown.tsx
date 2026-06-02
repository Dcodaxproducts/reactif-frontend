import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  FiBell,
  FiClock,
  FiCreditCard,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { getInitials } from "./utils";
import type { UserDropdownProps } from "@/types/component-props";

const menuItemClassName = cn(
  "flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100",
);

export function UserDropdown({
  user,
  isOpen,
  dropdownRef,
  onToggle,
  onClose,
  onLogout,
}: UserDropdownProps) {
  const router = useRouter();

  const handleNavigate = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleLogout = () => {
    onClose();
    onLogout();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        type="button"
        aria-label="Toggle user menu"
        aria-expanded={isOpen}
        variant="navDark"
        onClick={onToggle}
        className="w-10 h-10 font-semibold"
      >
        {getInitials(user.displayName)}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg py-2 text-sm text-gray-700 z-50">
          <div className="px-4 py-2 border-b text-xs text-gray-500">
            {user.email}
          </div>

          <button
            type="button"
            onClick={() => handleNavigate("/profile")}
            className={menuItemClassName}
          >
            <FiUser size={16} />
            Profile
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("/notifications")}
            className={menuItemClassName}
          >
            <FiBell size={16} />
            Notifications
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("/messages")}
            className={menuItemClassName}
          >
            <FiMessageSquare size={16} />
            Messages
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("/order/wallet")}
            className={menuItemClassName}
          >
            <FiCreditCard size={16} />
            Wallet
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("/order/payment-history")}
            className={menuItemClassName}
          >
            <FiClock size={16} />
            Payment History
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("/settings")}
            className={menuItemClassName}
          >
            <FiSettings size={16} />
            Settings
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className={cn(menuItemClassName, "text-red-600 hover:bg-red-50")}
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
