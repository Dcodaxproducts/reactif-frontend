import type { Metadata } from "next";
import { AutomotivePage } from "@/components/pages/Automotive/AutomotivePage";

export const metadata: Metadata = {
  title: "Automotive Services | Reactif",
  description:
    "Explore Reactif automotive visual communication services, vehicle wraps, paint protection, tinting, and branding solutions.",
};

export default function Page() {
  return <AutomotivePage />;
}
