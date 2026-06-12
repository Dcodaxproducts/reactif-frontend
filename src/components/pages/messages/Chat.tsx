"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiImage,
  FiPaperclip,
  FiSend,
  FiUser,
} from "react-icons/fi";
import { StatusCard } from "@/components/common/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useMessages, useSendMessage } from "@/hooks/useMessages";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/messages";
import { createSendMessageSchema } from "@/validations/messages";

const outgoingSenderTypes = new Set(["user", "customer", "client"]);

const formatMessageTime = (value: string) => {
  if (value.trim() === "") return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const getAttachmentUrl = (message: ChatMessage) =>
  message.image_url || message.file_url || "";

const isImageAttachment = (message: ChatMessage) => {
  const attachmentUrl = getAttachmentUrl(message).toLowerCase();

  return (
    message.isImage ||
    attachmentUrl.endsWith(".jpg") ||
    attachmentUrl.endsWith(".jpeg") ||
    attachmentUrl.endsWith(".png") ||
    attachmentUrl.endsWith(".webp") ||
    attachmentUrl.endsWith(".gif")
  );
};

const isOutgoingMessage = (message: ChatMessage) =>
  outgoingSenderTypes.has(message.sender_type.toLowerCase());

function ChatContent() {
  const { t } = useAppTranslation();
  const sendMessageSchema = useMemo(() => createSendMessageSchema(t), [t]);
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId =
    typeof params?.bookingId === "string" ? params.bookingId : "";
  const { messages, loading, error } = useMessages({ booking_id: bookingId });
  const receiverId =
    searchParams.get("receiverId") ||
    messages.find((item) => item.receiver_id)?.receiver_id ||
    "";
  const sendMessageMutation = useSendMessage();
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const selectedImageNames = useMemo(
    () => images.map((image) => image.name).join(", "),
    [images],
  );

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = sendMessageSchema.safeParse({
      booking_id: bookingId,
      receiver_id: receiverId,
      message,
    });

    if (!result.success) return;

    await sendMessageMutation.mutateAsync({
      booking_id: bookingId,
      receiver_id: receiverId,
      message,
      images,
    });
    setMessage("");
    setImages([]);
  };

  return (
    <main className="w-full px-4 py-8 sm:py-10">
      <section className="mx-auto flex min-h-[680px] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-neutral-50/15 bg-neutral-900 shadow-2xl shadow-black/20">
        <header className="flex flex-col gap-4 border-b border-neutral-50/10 bg-neutral-950/80 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="neutralOutline"
              className="h-11 w-11 rounded-2xl p-0"
              aria-label={t("messages.backToMessages")}
            >
              <Link href="/messages">
                <FiArrowLeft size={18} />
              </Link>
            </Button>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-50/10 bg-neutral-800 text-neutral-50">
              <FiUser size={20} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-300">
                {t("messages.bookingConversation")}
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-neutral-50 font-hk">
                {t("messages.bookingNumber", { bookingId })}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-50/60">
            <span className="rounded-full border border-neutral-50/10 bg-neutral-800 px-3 py-1">
              {t("messages.messageCount", { count: messages.length })}
            </span>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-emerald-100">
              {t("messages.activeThread")}
            </span>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.16),transparent_28%),linear-gradient(180deg,#171717,#0a0a0a)]">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {loading && (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-20 w-3/4 animate-pulse rounded-3xl bg-neutral-800/80",
                      index % 2 === 0 ? "self-start" : "self-end",
                    )}
                  />
                ))}
              </div>
            )}

            {error && (
              <StatusCard
                tone="error"
                label={t("common.backendError")}
                title={error}
                className="p-5 sm:p-6"
              />
            )}

            {!loading && !error && messages.length === 0 && (
              <div className="flex min-h-[360px] items-center">
                <StatusCard
                  tone="empty"
                  label={t("common.noDataFound")}
                  title={t("messages.emptyChatTitle")}
                  description={t("messages.emptyChatDescription")}
                  className="w-full p-6"
                />
              </div>
            )}

            {!loading && !error && messages.length > 0 && (
              <div className="flex flex-col gap-4">
                {messages.map((item) => (
                  <MessageBubble key={item.id} message={item} />
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="border-t border-neutral-50/10 bg-neutral-950/90 p-4 sm:p-5"
          >
            {selectedImageNames && (
              <div className="mb-3 flex items-center gap-2 rounded-2xl border border-neutral-50/10 bg-neutral-800 px-4 py-3 text-sm text-neutral-50/70">
                <FiPaperclip className="shrink-0 text-pink-200" size={16} />
                <span className="truncate">{selectedImageNames}</span>
              </div>
            )}

            <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
              <label className="flex-1">
                <span className="sr-only">{t("messages.messageLabel")}</span>
                <Textarea
                  value={message}
                  onChange={({ target }) => setMessage(target.value)}
                  placeholder={t("messages.placeholder")}
                  className="min-h-24 rounded-2xl border-neutral-50/10 bg-neutral-800 text-neutral-50 placeholder:text-neutral-50/40 focus-visible:ring-pink-300/30"
                />
              </label>

              <div className="flex items-center gap-3">
                <label className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border border-neutral-50/10 bg-neutral-800 text-neutral-50 transition hover:bg-neutral-700">
                  <span className="sr-only">{t("messages.attachImages")}</span>
                  <FiImage size={18} />
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={({ target }) =>
                      setImages(Array.from(target.files ?? []))
                    }
                    className="hidden"
                  />
                </label>

                <Button
                  type="submit"
                  disabled={sendMessageMutation.isPending || !receiverId}
                  className="h-12 rounded-2xl bg-pink-400 px-5 text-neutral-950 hover:bg-pink-300"
                >
                  <FiSend size={17} />
                  {sendMessageMutation.isPending ? t("messages.sending") : t("messages.send")}
                </Button>
              </div>
            </div>

            {!receiverId && (
              <p className="mt-3 text-xs text-amber-200">
                {t("messages.missingReceiver")}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const { t } = useAppTranslation();
  const isOutgoing = isOutgoingMessage(message);
  const attachmentUrl = getAttachmentUrl(message);
  const messageTime = formatMessageTime(message.created_at);

  return (
    <article
      className={cn(
        "flex w-full gap-3",
        isOutgoing ? "justify-end" : "justify-start",
      )}
    >
      {!isOutgoing && (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-50/10 bg-neutral-800 text-neutral-50/70">
          <FiUser size={15} />
        </div>
      )}

      <div
        className={cn(
          "max-w-[min(82%,680px)] rounded-3xl px-4 py-3 shadow-lg",
          isOutgoing
            ? "rounded-br-lg bg-pink-400 text-neutral-950 shadow-pink-950/20"
            : "rounded-bl-lg border border-neutral-50/10 bg-neutral-800 text-neutral-50 shadow-black/20",
        )}
      >
        {message.message && (
          <p className="whitespace-pre-wrap text-sm leading-6">
            {message.message}
          </p>
        )}

        {attachmentUrl && (
          <div className={cn(message.message && "mt-3")}>
            {isImageAttachment(message) ? (
              <a
                href={attachmentUrl}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-2xl border border-black/10"
              >
                <Image
                  src={attachmentUrl}
                  alt={t("messages.attachmentAlt")}
                  width={280}
                  height={190}
                  className="max-h-64 w-full object-cover"
                  unoptimized
                />
              </a>
            ) : (
              <a
                href={attachmentUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold",
                  isOutgoing
                    ? "bg-neutral-950/10 text-neutral-950"
                    : "bg-neutral-950/60 text-pink-200",
                )}
              >
                <FiPaperclip size={15} />
                {t("messages.viewAttachment")}
              </a>
            )}
          </div>
        )}

        <div
          className={cn(
            "mt-2 flex items-center justify-end gap-1 text-[11px]",
            isOutgoing ? "text-neutral-950/60" : "text-neutral-50/45",
          )}
        >
          {messageTime && <span>{messageTime}</span>}
          {isOutgoing && <FiCheckCircle size={12} />}
        </div>
      </div>
    </article>
  );
}

export function Chat() {
  return (
    <Suspense fallback={null}>
      <ChatContent />
    </Suspense>
  );
}
