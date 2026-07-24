"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useAppTranslation } from "@/hooks/useAppTranslation";

type ArticleShareProps = {
  title: string;
  url: string;
};

export function ArticleShare({ title, url }: ArticleShareProps) {
  const { t } = useAppTranslation();
  const [copied, setCopied] = useState(false);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await copyUrl();
  };

  return (
    <aside
      aria-label={t("staticPages.blogs.share.label")}
      className="flex flex-wrap items-center gap-2"
    >
      <button
        type="button"
        onClick={share}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
      >
        <Share2 className="h-4 w-4" aria-hidden="true" />
        {t("staticPages.blogs.share.action")}
      </button>
      <ShareLink
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        label={t("staticPages.blogs.share.whatsapp")}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
      </ShareLink>
      <ShareLink
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        label={t("staticPages.blogs.share.facebook")}
      >
        <Facebook className="h-4 w-4" aria-hidden="true" />
      </ShareLink>
      <ShareLink
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        label={t("staticPages.blogs.share.linkedin")}
      >
        <Linkedin className="h-4 w-4" aria-hidden="true" />
      </ShareLink>
      <ShareLink
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        label={t("staticPages.blogs.share.email")}
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
      </ShareLink>
      <button
        type="button"
        onClick={copyUrl}
        aria-label={t("staticPages.blogs.share.copy")}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? t("staticPages.blogs.share.copied") : ""}
      </span>
    </aside>
  );
}

function ShareLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
    >
      {children}
    </a>
  );
}
