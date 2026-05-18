"use client";

import { PrimaryButton } from "../hero/hero-ui";

interface LegalCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

function LegalCTA({
  title = "Have questions about our terms?",
  description = "Our legal team is here to help you understand your rights.",
  buttonText = "Contact Legal",
}: LegalCTAProps) {
  return (
    <div className="mt-15 p-6 md:p-8 rounded-2xl border border-pink-400/20 bg-pink-400/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

      {/* TEXT */}
      <div className="space-y-1">
        <h4 className="text-white text-lg md:text-xl font-bold">
          {title}
        </h4>

        <p className="text-slate-400 text-sm md:text-base">
          {description}
        </p>
      </div>

      {/* BUTTON */}
      <PrimaryButton href="/contact" className="px-6 py-3 text-sm md:text-base">
        {buttonText}
      </PrimaryButton>
    </div>
  );
}

export default LegalCTA;