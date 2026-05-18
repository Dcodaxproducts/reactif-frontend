"use client";

import { ContactInfoPanel } from "./contact/ContactInfoPanel";
import { ContactMessageForm } from "./contact/ContactMessageForm";

export default function ContactForm() {
  return (
    <div className="w-full mx-auto rounded-xl border border-stone-500 flex flex-col md:flex-row overflow-hidden">
      <ContactInfoPanel />
      <ContactMessageForm />
    </div>
  );
}
