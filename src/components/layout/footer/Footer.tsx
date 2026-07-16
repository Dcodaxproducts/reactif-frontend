"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { reactifSocialLinks } from "@/data/contact";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCurrentUser } from "@/hooks/useAuth";
import { useCategories } from "@/hooks/useCategories";
import {
  buildCategoryRouteFromCategory,
  buildCategoryRouteFromNavigationSlug,
  findCategoryByNavigationSlug,
  footerCategoryNavigationItems,
} from "@/lib/category-routes";
import { getStartedRoute } from "@/lib/get-started-routes";

export function Footer() {
  const router = useRouter();
  const { t } = useAppTranslation();
  const { data: user, isLoading: authLoading } = useCurrentUser();
  const { categories } = useCategories({ per_page: 100 });
  const serviceCategoryLinks = footerCategoryNavigationItems.map(
    ({ slug, labelKey }) => {
      const category = findCategoryByNavigationSlug(categories, slug);

      return {
        label: t(labelKey),
        href: category
          ? buildCategoryRouteFromCategory(category)
          : buildCategoryRouteFromNavigationSlug(slug),
      };
    },
  );

  return (
    <footer className="relative overflow-hidden bg-[#010101] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#1d4ed8]/15 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-[#f21b6d]/15 blur-[120px]" />

      <Container width="7xl" gutter="compact" className="relative py-12 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold leading-tight">
              Reactif Printing & Design <br /> {t("footer.platform")}
            </h2>

            <p className="max-w-md text-white/60">
              {t("footer.description")}
            </p>

            {authLoading ? (
              <Button
                type="button"
                variant="whiteGlow"
                disabled
                className="h-11 rounded-[100px] px-5 py-2.5 text-[14px] font-hk outline-1 outline-offset-[-1px] outline-white"
              >
                {t("footer.getStarted")}
              </Button>
            ) : (
              <Button
                asChild
                variant="whiteGlow"
                className="h-11 rounded-[100px] px-5 py-2.5 text-[14px] font-hk outline-1 outline-offset-[-1px] outline-white"
              >
                <Link href={getStartedRoute(Boolean(user))}>
                  {user ? t("nav.myBookings") : t("footer.getStarted")}
                </Link>
              </Button>
            )}
          </div>

          <div className="grid gap-8 text-sm sm:grid-cols-3">
            <FooterColumn
              title={t("footer.services")}
              links={serviceCategoryLinks}
            />

            <FooterColumn
              title={t("footer.company")}
              links={[
                { label: t("footer.aboutUs"), href: "/about" },
                { label: t("footer.blogs"), href: "/blogs" },
                { label: t("footer.portfolio"), href: "/portfolio" },
                { label: t("footer.gallery"), href: "/gallery" },
                { label: t("footer.contactUs"), href: "/contact" },
              ]}
            />

            <FooterColumn
              title={t("footer.support")}
              links={[
                { label: t("footer.helpCenter"), href: "/help-center" },
                { label: t("footer.faq"), href: "/faq" },
                { label: t("footer.contactSupport"), href: "/support" },
                { label: t("footer.termsOfService"), href: "/terms" },
                { label: t("footer.privacyPolicy"), href: "/privacy-policy" },
              ]}
            />
          </div>
        </div>

        <div className="my-8 border-t border-white/10" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-5">
            <span className="text-sm text-white/60">{t("footer.followUs")}</span>

            <SocialIcon
              href={reactifSocialLinks.tiktok}
              ariaLabel={t("footer.socialTikTok")}
            >
              <FaTiktok size={16} />
            </SocialIcon>
            <SocialIcon
              href={reactifSocialLinks.facebook}
              ariaLabel={t("footer.socialFacebook")}
            >
              <FaFacebookF size={16} />
            </SocialIcon>
            <SocialIcon
              href={reactifSocialLinks.instagram}
              ariaLabel={t("footer.socialInstagram")}
            >
              <FaInstagram size={16} />
            </SocialIcon>
          </div>

          <div className="flex gap-4">
            {!authLoading && !user && (
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
              >
                {t("auth.signIn")}
              </Button>
            )}

            <Button
              onClick={() => router.push("/#contact")}
              variant="outline"
              className="rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
            >
              {t("footer.contactUs")}
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold">{title}</h4>

      <ul className="space-y-2 text-white/60">
        {links.map(({ label, href }) => (
          <li key={`${label}-${href}`}>
            <Link href={href} className="transition hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 transition hover:bg-white/10"
    >
      {children}
    </a>
  );
}
