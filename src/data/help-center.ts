import { Lock, Pencil, Settings, Shield, Truck, User } from "lucide-react";
import type { FAQItemData, HelpCardData } from "@/types/component-props";

export const popularHelpLinks = [
  "Shipping rates",
  "Vinyl care",
  "Bulk discounts",
];

export const helpCards: HelpCardData[] = [
  {
    title: "Ordering & Payments",
    description:
      "Learn about payment methods, processing times, and how to place custom orders for fleet branding.",
    icon: Lock,
    color: "bg-cyan-500/20 text-cyan-400",
  },
  {
    title: "Shipping & Logistics",
    description:
      "Tracking info, international shipping options, and safe packaging for sensitive signage materials.",
    icon: Truck,
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Design Services",
    description:
      "File format requirements, design consultation processes, and template downloads for wraps.",
    icon: Pencil,
    color: "bg-teal-500/20 text-teal-400",
  },
  {
    title: "Technical Support",
    description:
      "Installation guides for illuminated signage, vinyl maintenance, and lighting troubleshooting.",
    icon: Settings,
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Account Management",
    description:
      "Update your business details, view order history, and manage sub-users for corporate accounts.",
    icon: User,
    color: "bg-cyan-500/20 text-cyan-400",
  },
  {
    title: "Privacy & Terms",
    description:
      "Information on data security, terms of service for installation, and our quality guarantee policies.",
    icon: Shield,
    color: "bg-purple-500/20 text-purple-400",
  },
];

export const featuredFAQs: FAQItemData[] = [
  {
    value: "turnaround-time",
    question: "What is the typical turnaround time for a full vehicle wrap?",
    answer:
      "Turnaround time typically ranges from 3–7 business days depending on design complexity, printing, and installation scheduling.",
  },
  {
    value: "onsite-installation",
    question: "Do you provide on-site installation services?",
    answer:
      "Yes, we offer on-site installation services depending on your location and project size.",
  },
  {
    value: "vinyl-uv-life",
    question: "How long do the vinyl materials last under UV exposure?",
    answer:
      "High-quality vinyl materials typically last 5–7 years with proper care, even under strong UV exposure.",
  },
];
