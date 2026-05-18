import Image from "next/image";
import Link from "next/link";
import { authenticatedNavItems, publicNavItems } from "@/config/navigation";
import type { DesktopNavLinksProps } from "@/types/component-props";

export function DesktopNavLinks({ user }: DesktopNavLinksProps) {
  return (
    <div className="hidden md:flex items-center gap-8 text-sm text-white">
      {publicNavItems.map((item) => (
        <div
          key={item.label}
          className={
            item.highlight
              ? "relative inline-block w-max"
              : "flex items-center gap-2"
          }
        >
          {item.highlight && (
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-32 h-16 pointer-events-none">
              <Image
                src="/assets/elipse.png"
                alt="elipse background"
                fill
                className="object-contain"
              />
            </div>
          )}

          <Link
            href={item.href}
            className={
              item.highlight
                ? "relative px-4 py-1.5 rounded-full bg-transparent text-gray-300 z-10"
                : "hover:text-blue-400 transition text-gray-300"
            }
          >
            {item.label}
          </Link>

          {item.badge && (
            <span className="text-[12px] bg-[#E2E2E2] px-3 py-[3px] rounded-full text-black font-[400]">
              {item.badge}
            </span>
          )}
        </div>
      ))}

      {user &&
        authenticatedNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="hover:text-blue-400 transition text-gray-300"
          >
            {item.label}
          </Link>
        ))}
    </div>
  );
}
