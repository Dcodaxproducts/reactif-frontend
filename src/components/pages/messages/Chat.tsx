"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMessages, useSendMessage } from "@/hooks/useMessages";
import { sendMessageSchema } from "@/validations/messages";

function ChatContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const bookingId = typeof params?.bookingId === "string" ? params.bookingId : "";
  const { messages, loading, error } = useMessages({ booking_id: bookingId });
  const receiverId =
    searchParams.get("receiverId") ||
    messages.find((item) => item.receiver_id)?.receiver_id ||
    "";
  const sendMessageMutation = useSendMessage();
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleSend = async () => {
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
    <section className="w-full flex justify-center px-4 py-10">
      <Card className="w-full max-w-5xl bg-neutral-800 rounded-3xl border border-neutral-50/30">
        <CardContent className="p-6 md:p-10 flex flex-col gap-6">
          <h1 className="text-neutral-50 text-3xl font-semibold font-hk">
            Booking Chat
          </h1>
          {loading && <p className="text-neutral-50/60">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && messages.length === 0 && (
            <p className="text-neutral-50/60">No messages yet.</p>
          )}
          <div className="flex flex-col gap-4">
            {messages.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-neutral-50/10 p-4 text-neutral-50/70"
              >
                <p>{item.message}</p>
                {item.file_url && (
                  <a href={item.file_url} className="text-pink-400">
                    View attachment
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Input
              value={message}
              onChange={({ target }) => setMessage(target.value)}
              placeholder="Type a message"
              className="bg-neutral-900 border-neutral-50/10 text-neutral-50"
            />
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={({ target }) =>
                setImages(Array.from(target.files ?? []))
              }
              className="bg-neutral-900 border-neutral-50/10 text-neutral-50"
            />
            <Button
              disabled={sendMessageMutation.isPending}
              onClick={handleSend}
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export function Chat() {
  return (
    <Suspense fallback={null}>
      <ChatContent />
    </Suspense>
  );
}
