"use client";

import type { ReactNode } from "react";

import Image from "next/image";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const socialLinks = {
  x: "https://x.com/reactif",
  facebook: "https://www.facebook.com/reactif",
  instagram: "https://www.instagram.com/reactif",
  linkedin: "https://www.linkedin.com/company/reactif",
  youtube: "https://www.youtube.com/@reactif",
} as const;

export default function Footer() {
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
    <footer className="relative text-white overflow-hidden">
      <Image
        src="/assets/footer/background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover -z-10"
      />

      <Container width="7xl" gutter="compact" className="py-12">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold leading-tight">
              Reactif Printing & Design <br /> {t("footer.platform")}
            </h2>

            <p className="text-white/60 max-w-md">
              {t("footer.description")}
            </p>

            {authLoading ? (
              <Button
                type="button"
                variant="whiteGlow"
                disabled
                className="h-11 px-5 py-2.5 rounded-[100px] outline-1 outline-offset-[-1px] outline-white text-[14px] font-hk"
              >
                {t("footer.getStarted")}
              </Button>
            ) : (
              <Button asChild variant="whiteGlow" className="h-11 px-5 py-2.5 rounded-[100px] outline-1 outline-offset-[-1px] outline-white text-[14px] font-hk">
                <Link href={getStartedRoute(Boolean(user))}>
                  {user ? t("nav.myBookings") : t("footer.getStarted")}
                </Link>
              </Button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-10 text-sm">
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="text-sm text-white/60">{t("footer.followUs")}</span>

            <SocialIcon href={socialLinks.x} ariaLabel={t("footer.socialX")}>
              <Twitter size={16} />
            </SocialIcon>
            <SocialIcon
              href={socialLinks.facebook}
              ariaLabel={t("footer.socialFacebook")}
            >
              <Facebook size={16} />
            </SocialIcon>
            <SocialIcon
              href={socialLinks.instagram}
              ariaLabel={t("footer.socialInstagram")}
            >
              <Instagram size={16} />
            </SocialIcon>
            <SocialIcon
              href={socialLinks.linkedin}
              ariaLabel={t("footer.socialLinkedIn")}
            >
              <Linkedin size={16} />
            </SocialIcon>
            <SocialIcon
              href={socialLinks.youtube}
              ariaLabel={t("footer.socialYouTube")}
            >
              <Youtube size={16} />
            </SocialIcon>
          </div>
          <div className="flex gap-4">
            {!authLoading && !user && (
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="rounded-full border-white/30 text-white bg-transparent hover:bg-white/10 px-6"
              >
                {t("auth.signIn")}
              </Button>
            )}

            <Button
              onClick={() => router.push("/#contact")}
              variant="outline"
              className="rounded-full border-white/30 text-white bg-transparent hover:bg-white/10 px-6"
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
          <li key={label}>
            <Link href={href} className="hover:text-white transition">
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
      className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition cursor-pointer"
    >
      {children}
    </a>
  );
}
