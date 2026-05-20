"use client";

import Image from "next/image";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  userId: number;
  email: string;
  displayName: string;
  isVerified: boolean;
}

export default function Footer() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("current_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <footer className="relative text-white overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <Image
        src="/assets/footer/background.png"
        alt="footer bg"
        fill
        priority
        className="object-cover -z-10"
      />

      <Container width="7xl" gutter="compact" className="py-12">
        {/* ================= TOP GRID ================= */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT */}
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold leading-tight">
              Reactif Printing & Design <br /> Platform
            </h2>

            <p className="text-white/60 max-w-md">
              Transforming visions into reality through premium printing and
              design solutions.
            </p>

            <Button asChild variant="whiteGlow" className="h-11 px-5 py-2.5 rounded-[100px] outline-1 outline-offset-[-1px] outline-white text-[14px] font-hk">
              <Link href="/login">GET STARTED</Link>
            </Button>
          </div>

          {/* RIGHT LINKS */}
          <div className="grid grid-cols-3 gap-10 text-sm">
            <FooterColumn
              title="Services"
              links={[
                { label: "Automotive", href: "/services/automotive" },
                {
                  label: "Visual Advertising",
                  href: "/services/visual-advertising",
                },
                { label: "Signalétique", href: "/services/signaletique" },
                { label: "Apparel", href: "/services/apparel" },
                { label: "Accessories", href: "/services/accessories" },
              ]}
            />

            <FooterColumn
              title="Company"
              links={[
                { label: "About Us", href: "/about" },
                { label: "Blogs", href: "/blogs" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Contact Us", href: "/contact" },
              ]}
            />

            <FooterColumn
              title="Support"
              links={[
                { label: "Help Center", href: "/help-center" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact Support", href: "/support" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy-policy" },
              ]}
            />
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="my-8 border-t border-white/10" />

        {/* ================= BOTTOM ROW ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social */}
          <div className="flex items-center gap-5">
            <span className="text-sm text-white/60">Follow us</span>

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

          {/* Buttons */}
          <div className="flex gap-4">
            {!user && (
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="rounded-full border-white/30 text-white bg-transparent hover:bg-white/10 px-6"
              >
                Sign In
              </Button>
            )}

            <Button
              onClick={() => router.push("/#contact")}
              variant="outline"
              className="rounded-full border-white/30 text-white bg-transparent hover:bg-white/10 px-6"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ================= COMPONENTS ================= */

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
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-white transition">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ children }: any) {
  return (
    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition cursor-pointer">
      {children}
    </div>
  );
}
