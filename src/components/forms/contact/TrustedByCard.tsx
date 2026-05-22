import Image from "next/image";

import { CONTACT_LABEL_CLASS } from "./contact-form-classes";

const trustedAvatarItems = [
  "ReactIf client 1",
  "ReactIf client 2",
  "ReactIf client 3",
  "ReactIf client 4",
  "ReactIf client 5",
  "ReactIf client 6",
];

export function TrustedByCard() {
  return (
    <div className="relative mt-6 md:mt-10 rounded-xl border border-white/50 p-4 md:p-6 overflow-hidden">
      <div
        className="absolute inset-0 blur-[20px]"
        style={{
          background:
            "conic-gradient(from 146deg at 50% 98%, rgba(242,98,181,0) 125deg, rgba(95,197,255,0.2) 193deg, rgba(128,84,255,0.2) 236deg, rgba(119,157,255,0.2) 260deg, rgba(159,115,241,0) 311deg)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-4 md:gap-6">
        <span className={CONTACT_LABEL_CLASS}>Trusted By</span>

        <div className="flex items-center flex-wrap">
          {trustedAvatarItems.map((item) => (
            <div
              key={item}
              className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-700 bg-zinc-800 -ml-2 first:ml-0"
            >
              <Image
                src="/assets/hero/user.png"
                alt={item}
                fill
                sizes="40px"
                className="object-cover rounded-full"
              />
            </div>
          ))}

          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center -ml-2 bg-black">
            <span className="text-white text-[10px] md:text-xs font-semibold">
              500+
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
