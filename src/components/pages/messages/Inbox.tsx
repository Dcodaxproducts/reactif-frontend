"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiChevronRight,
  FiInbox,
  FiMessageSquare,
  FiSearch,
} from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useMessageInbox } from "@/hooks/useMessages";
import { cn } from "@/lib/utils";
import type { MessageInboxItem } from "@/types/messages";

const getConversationName = (item: MessageInboxItem) =>
  item.receiver_name || item.sender_name || "Conversation";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "M";

const getLastMessage = (message: string) =>
  message.trim() === "" ? "No message preview available" : message;

export function Inbox() {
  const { inbox, loading, error } = useMessageInbox();
  const [searchQuery, setSearchQuery] = useState("");
  const unreadTotal = inbox.reduce(
    (total, item) => total + item.unread_message_count,
    0,
  );
  const filteredInbox = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query === "") return inbox;

    return inbox.filter((item) => {
      const values = [
        getConversationName(item),
        item.last_message,
        String(item.booking_id),
      ];

      return values.some((value) => value.toLowerCase().includes(query));
    });
  }, [inbox, searchQuery]);

  return (
    <main className="w-full px-4 py-8 sm:py-10">
      <section className="mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-neutral-50/15 bg-neutral-900/95 shadow-2xl shadow-black/20 lg:min-h-[660px] lg:flex-row">
        <aside className="flex w-full flex-col border-b border-neutral-50/10 bg-neutral-950/70 lg:w-[380px] lg:border-b-0 lg:border-r">
          <div className="flex flex-col gap-5 border-b border-neutral-50/10 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-300">
                  Inbox
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-neutral-50 font-hk">
                  Messages
                </h1>
                <p className="mt-2 text-sm text-neutral-50/60">
                  Booking conversations and service updates.
                </p>
              </div>

              <div className="rounded-2xl border border-pink-300/30 bg-pink-400/10 p-3 text-pink-200">
                <FiMessageSquare size={22} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-neutral-50/10 bg-neutral-800/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-50/50">
                  Threads
                </p>
                <p className="mt-1 text-2xl font-semibold text-neutral-50">
                  {inbox.length}
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-50/10 bg-neutral-800/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-50/50">
                  Unread
                </p>
                <p className="mt-1 text-2xl font-semibold text-neutral-50">
                  {unreadTotal}
                </p>
              </div>
            </div>

            <label className="relative block">
              <span className="sr-only">Search messages</span>
              <FiSearch
                aria-hidden
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-50/40"
                size={18}
              />
              <Input
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                placeholder="Search booking or contact"
                className="h-12 rounded-2xl border-neutral-50/10 bg-neutral-800 pl-11 text-neutral-50 placeholder:text-neutral-50/40"
              />
            </label>
          </div>

          <div className="flex min-h-[360px] flex-1 flex-col overflow-y-auto">
            {loading && (
              <div className="flex flex-col gap-3 p-5 sm:p-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-20 animate-pulse rounded-2xl bg-neutral-800/80"
                  />
                ))}
              </div>
            )}

            {error && (
              <div className="m-5 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {!loading && !error && filteredInbox.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="rounded-full border border-neutral-50/10 bg-neutral-800 p-4 text-neutral-50/60">
                  <FiInbox size={26} />
                </div>
                <p className="text-base font-semibold text-neutral-50">
                  No conversations found
                </p>
                <p className="max-w-xs text-sm text-neutral-50/55">
                  Booking conversations will appear here once messages are
                  available.
                </p>
              </div>
            )}

            {!loading &&
              !error &&
              filteredInbox.map((item) => (
                <InboxConversation
                  key={`${item.booking_id}-${item.last_message_id}`}
                  item={item}
                />
              ))}
          </div>
        </aside>

        <div className="hidden flex-1 flex-col items-center justify-center bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_34%),linear-gradient(135deg,#171717,#0a0a0a)] p-10 text-center lg:flex">
          <div className="rounded-full border border-neutral-50/10 bg-neutral-800/80 p-5 text-pink-200">
            <FiMessageSquare size={34} />
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-neutral-50 font-hk">
            Select a conversation
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-50/60">
            Open a booking thread from the inbox to review messages, send
            updates, and share images with the other party.
          </p>
        </div>
      </section>
    </main>
  );
}

function InboxConversation({ item }: { item: MessageInboxItem }) {
  const conversationName = getConversationName(item);
  const hasUnread = item.unread_message_count > 0;

  return (
    <Link
      href={{
        pathname: `/messages/${item.booking_id}`,
        query: item.receiver_id ? { receiverId: item.receiver_id } : {},
      }}
      className={cn(
        "group flex gap-4 border-b border-neutral-50/10 p-5 transition hover:bg-neutral-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300",
        hasUnread && "bg-pink-400/5",
      )}
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-neutral-50/10 bg-neutral-800">
        {item.receiver_image ? (
          <Image
            src={item.receiver_image}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-neutral-50">
            {getInitials(conversationName)}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-50">
              {conversationName}
            </p>
            <p className="mt-1 text-xs font-medium text-neutral-50/45">
              Booking #{item.booking_id}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {hasUnread && (
              <Badge className="border-pink-300/30 bg-pink-400/15 text-pink-100">
                {item.unread_message_count}
              </Badge>
            )}
            <FiChevronRight
              className="text-neutral-50/35 transition group-hover:translate-x-0.5 group-hover:text-neutral-50"
              size={18}
            />
          </div>
        </div>

        <p
          className={cn(
            "mt-3 line-clamp-2 text-sm leading-5",
            hasUnread ? "text-neutral-50/80" : "text-neutral-50/50",
          )}
        >
          {getLastMessage(item.last_message)}
        </p>
      </div>
    </Link>
  );
}
