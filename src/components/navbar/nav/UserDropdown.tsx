import { useRouter } from "next/navigation";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { getInitials } from "./utils";
import type { UserDropdownProps } from "./types";

export function UserDropdown({
  user,
  isOpen,
  dropdownRef,
  onToggle,
  onLogout,
}: UserDropdownProps) {
  const router = useRouter();

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className="w-10 h-10 rounded-full bg-neutral-800 text-[#E2E2E2] flex items-center justify-center font-semibold"
      >
        {getInitials(user.displayName)}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg py-2 text-sm text-gray-700 z-50">
          <div className="px-4 py-2 border-b text-xs text-gray-500">
            {user.email}
          </div>

          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
          >
            <FiUser size={16} />
            Profile
          </button>

          <button
            onClick={() => router.push("/settings")}
            className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100"
          >
            <FiSettings size={16} />
            Settings
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-2 hover:bg-red-50 text-red-600"
          >
            <FiLogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
