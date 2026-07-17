import Image from "next/image";
import Link from "next/link";
import { authenticatedNavItems, publicNavItems } from "@/config/navigation";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import type { DesktopNavLinksProps } from "@/types/component-props";

export function DesktopNavLinks({ user }: DesktopNavLinksProps) {
  const { t } = useAppTranslation();

  return (
    <div className="relative z-20 hidden shrink-0 items-center gap-8 text-sm text-white md:flex">
      {publicNavItems.map(
        ({ label, translationKey, highlight, href, badgeTranslationKey }) => (
          <div
            key={label}
            className={
              highlight
                ? "relative inline-flex w-max shrink-0 items-center"
                : "relative z-20 flex shrink-0 items-center gap-2"
            }
          >
            {highlight && (
              <div className="pointer-events-none absolute -bottom-5 left-1/2 -z-10 h-16 w-32 -translate-x-1/2">
                <Image
                  src="/assets/elipse.png"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
            )}

            <Link
              href={href}
              className={
                highlight
                  ? "relative z-10 whitespace-nowrap rounded-full bg-transparent px-4 py-1.5 text-gray-200"
                  : "whitespace-nowrap text-gray-200 transition hover:text-blue-400"
              }
            >
              {translationKey ? t(translationKey) : label}
            </Link>

            {badgeTranslationKey && (
              <span className="text-[12px] bg-[#E2E2E2] px-3 py-[3px] rounded-full text-black font-[400]">
                {t(badgeTranslationKey)}
              </span>
            )}
          </div>
        ),
      )}

      {user &&
        authenticatedNavItems.map(({ label, translationKey, href }) => (
          <Link
            key={label}
            href={href}
            className="hover:text-blue-400 transition text-gray-300"
          >
            {translationKey ? t(translationKey) : label}
          </Link>
        ))}
    </div>
  );
}
