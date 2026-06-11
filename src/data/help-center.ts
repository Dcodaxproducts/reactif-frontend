import { Lock, Pencil, Settings, Shield, Truck, User } from "lucide-react";
import type { FAQItemData, HelpCardData } from "@/types/component-props";

export const popularHelpLinks = [
  {
    label: "Shipping rates",
    labelKey: "helpCenter.popular.shippingRates",
    query: "shipping",
  },
  {
    label: "Vinyl care",
    labelKey: "helpCenter.popular.vinylCare",
    query: "vinyl",
  },
  {
    label: "Bulk discounts",
    labelKey: "helpCenter.popular.bulkDiscounts",
    query: "bulk",
  },
];

export const helpCards: HelpCardData[] = [
  {
    title: "Orders",
    titleKey: "helpCenter.cards.orderingPayments.title",
    description:
      "Learn about payment methods, processing times, and how to place custom orders for fleet branding.",
    descriptionKey: "helpCenter.cards.orderingPayments.description",
    icon: Lock,
    color: "bg-cyan-500/20 text-cyan-400",
  },
  {
    title: "Shipping & Logistics",
    titleKey: "helpCenter.cards.shippingLogistics.title",
    description:
      "Tracking info, international shipping options, and safe packaging for sensitive signage materials.",
    descriptionKey: "helpCenter.cards.shippingLogistics.description",
    icon: Truck,
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Design Services",
    titleKey: "helpCenter.cards.designServices.title",
    description:
      "File format requirements, design consultation processes, and template downloads for wraps.",
    descriptionKey: "helpCenter.cards.designServices.description",
    icon: Pencil,
    color: "bg-teal-500/20 text-teal-400",
  },
  {
    title: "Technical Support",
    titleKey: "helpCenter.cards.technicalSupport.title",
    description:
      "Installation guides for illuminated signage, vinyl maintenance, and lighting troubleshooting.",
    descriptionKey: "helpCenter.cards.technicalSupport.description",
    icon: Settings,
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Account Management",
    titleKey: "helpCenter.cards.accountManagement.title",
    description:
      "Update your business details, view order history, and manage sub-users for corporate accounts.",
    descriptionKey: "helpCenter.cards.accountManagement.description",
    icon: User,
    color: "bg-cyan-500/20 text-cyan-400",
  },
  {
    title: "Privacy & Terms",
    titleKey: "helpCenter.cards.privacyTerms.title",
    description:
      "Information on data security, terms of service for installation, and our quality guarantee policies.",
    descriptionKey: "helpCenter.cards.privacyTerms.description",
    icon: Shield,
    color: "bg-purple-500/20 text-purple-400",
  },
];

export const featuredFAQs: FAQItemData[] = [
  {
    value: "turnaround-time",
    question: "What is the typical turnaround time for a full vehicle wrap?",
    questionKey: "helpCenter.faq.turnaroundTime.question",
    answer:
      "Turnaround time typically ranges from 3–7 business days depending on design complexity, printing, and installation scheduling.",
    answerKey: "helpCenter.faq.turnaroundTime.answer",
  },
  {
    value: "onsite-installation",
    question: "Do you provide on-site installation services?",
    questionKey: "helpCenter.faq.onsiteInstallation.question",
    answer:
      "Yes, we offer on-site installation services depending on your location and project size.",
    answerKey: "helpCenter.faq.onsiteInstallation.answer",
  },
  {
    value: "vinyl-uv-life",
    question: "How long do the vinyl materials last under UV exposure?",
    questionKey: "helpCenter.faq.vinylUvLife.question",
    answer:
      "High-quality vinyl materials typically last 5–7 years with proper care, even under strong UV exposure.",
    answerKey: "helpCenter.faq.vinylUvLife.answer",
  },
];
