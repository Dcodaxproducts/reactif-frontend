"use client";

import { useEffect } from "react";

const CONTACT_HASH = "#contact";

function scrollContactSectionToCenter() {
  const contactSection = document.getElementById("contact");

  if (!contactSection) {
    return;
  }

  requestAnimationFrame(() => {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

export function ContactAnchorScroller() {
  useEffect(() => {
    const handleContactHash = () => {
      if (window.location.hash === CONTACT_HASH) {
        scrollContactSectionToCenter();
      }
    };

    handleContactHash();
    window.addEventListener("hashchange", handleContactHash);

    return () => window.removeEventListener("hashchange", handleContactHash);
  }, []);

  return null;
}
