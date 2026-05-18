import { Lock, Pencil, Settings, Shield, Truck, User } from "lucide-react";
import type { HelpCardData } from "./types";

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
