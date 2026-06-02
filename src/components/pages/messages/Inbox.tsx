"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useMessageInbox } from "@/hooks/useMessages";

export function Inbox() {
  const { inbox, loading, error } = useMessageInbox();

  return (
    <section className="w-full flex justify-center px-4 py-10">
      <Card className="w-full max-w-5xl bg-neutral-800 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-6">
          <h1 className="text-neutral-50 text-3xl font-semibold font-hk">
            Messages
          </h1>
          {loading && <p className="text-neutral-50/60">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && inbox.length === 0 && (
            <p className="text-neutral-50/60">No messages found.</p>
          )}
          {inbox.map((item) => (
            <Link
              key={`${item.booking_id}-${item.last_message_id}`}
              href={{
                pathname: `/messages/${item.booking_id}`,
                query: item.receiver_id ? { receiverId: item.receiver_id } : {},
              }}
              className="flex flex-col gap-2 border-t border-neutral-50/10 pt-4"
            >
              <div className="flex justify-between gap-4 text-neutral-50">
                <span>{item.receiver_name || item.sender_name}</span>
                <span>{item.unread_message_count}</span>
              </div>
              <p className="text-neutral-50/60">{item.last_message}</p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
