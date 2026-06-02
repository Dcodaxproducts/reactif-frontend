"use client";

import type { ReactNode } from "react";

import Image from "next/image";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCurrentUser } from "@/hooks/useAuth";

export default function Footer() {
  const router = useRouter();
  const { t } = useAppTranslation();
  const { data: user } = useCurrentUser();

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

            <Button asChild variant="whiteGlow" className="h-11 px-5 py-2.5 rounded-[100px] outline-1 outline-offset-[-1px] outline-white text-[14px] font-hk">
              <Link href="/login">{t("footer.getStarted")}</Link>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-10 text-sm">
            <FooterColumn
              title={t("footer.services")}
              links={[
                { label: t("footer.automotive"), href: "/services/automotive" },
                {
                  label: t("footer.visualAdvertising"),
                  href: "/services/visual-advertising",
                },
                { label: t("footer.signaletique"), href: "/services/signaletique" },
                { label: t("footer.apparel"), href: "/services/apparel" },
                { label: t("footer.accessories"), href: "/services/accessories" },
              ]}
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
                { label: "FAQ", href: "/faq" },
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

            <SocialIcon>
              <Twitter size={16} />
            </SocialIcon>
            <SocialIcon>
              <Facebook size={16} />
            </SocialIcon>
            <SocialIcon>
              <Instagram size={16} />
            </SocialIcon>
            <SocialIcon>
              <Youtube size={16} />
            </SocialIcon>
          </div>
          <div className="flex gap-4">
            {!user && (
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

function SocialIcon({ children }: { children: ReactNode }) {
  return (
    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition cursor-pointer">
      {children}
    </div>
  );
}
