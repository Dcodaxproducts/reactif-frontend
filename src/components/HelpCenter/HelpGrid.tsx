"use client";

import { Lock, Truck, Pencil, Settings, User, Shield } from "lucide-react";

const helpCards = [
  {
    title: "Ordering & Payments",
    desc: "Learn about payment methods, processing times, and how to place custom orders for fleet branding.",
    icon: Lock,
    color: "bg-cyan-500/20 text-cyan-400",
  },
  {
    title: "Shipping & Logistics",
    desc: "Tracking info, international shipping options, and safe packaging for sensitive signage materials.",
    icon: Truck,
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Design Services",
    desc: "File format requirements, design consultation processes, and template downloads for wraps.",
    icon: Pencil,
    color: "bg-teal-500/20 text-teal-400",
  },
  {
    title: "Technical Support",
    desc: "Installation guides for illuminated signage, vinyl maintenance, and lighting troubleshooting.",
    icon: Settings,
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Account Management",
    desc: "Update your business details, view order history, and manage sub-users for corporate accounts.",
    icon: User,
    color: "bg-cyan-500/20 text-cyan-400",
  },
  {
    title: "Privacy & Terms",
    desc: "Information on data security, terms of service for installation, and our quality guarantee policies.",
    icon: Shield,
    color: "bg-purple-500/20 text-purple-400",
  },
];

export default function HelpGrid() {
  return (
    <div className="min-h-screen w-full  flex items-center justify-center px-6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {helpCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="group rounded-xl border border-white/10 bg-[#0c1220]/80 backdrop-blur-md p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-lg mb-5 ${card.color}`}
              >
                <Icon size={20} />
              </div>

              {/* Title */}
              <h3 className="text-white text-lg font-semibold mb-2">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {card.desc}
              </p>

              {/* Divider */}
              <div className="mt-5 h-px w-full bg-white/10" />
            </div>
          );
        })}
      </div>
    </div>
  );
}