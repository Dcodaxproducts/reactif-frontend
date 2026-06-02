import {
  FaAward,
  FaRocket,
  FaShieldAlt,
  FaTools,
  FaUsers,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import type { WhyCardData } from "@/types/component-props";

export const keyServices = [
  { labelKey: "home.keyServices.fullPartialWraps" },
  { labelKey: "home.keyServices.paintProtection" },
  { labelKey: "home.keyServices.fleetBranding" },
  { labelKey: "home.keyServices.windowGraphics" },
];

export const whyChooseUsData: WhyCardData[] = [
  {
    title: "Expertise",
    titleKey: "home.why.cards.recognizedExpertise.title",
    description:
      "Over 15 years of experience in automotive visual communication",
    descriptionKey: "home.why.cards.recognizedExpertise.description",
    icon: FiPhone,
  },
  {
    title: "Materials",
    titleKey: "home.why.cards.premiumMaterials.title",
    description:
      "Over 15 years of experience in automotive visual communication",
    descriptionKey: "home.why.cards.premiumMaterials.description",
    icon: FaShieldAlt,
  },
  {
    title: "Quality",
    titleKey: "home.why.cards.awardWinning.title",
    description:
      "Over 15 years of experience in automotive visual communication",
    descriptionKey: "home.why.cards.awardWinning.description",
    icon: FaAward,
  },
  {
    title: "Process",
    titleKey: "home.why.cards.clientFocused.title",
    description:
      "Over 15 years of experience in automotive visual communication",
    descriptionKey: "home.why.cards.clientFocused.description",
    icon: FaUsers,
  },
  {
    title: "Installation",
    titleKey: "home.why.cards.precisionInstall.title",
    description:
      "Over 15 years of experience in automotive visual communication",
    descriptionKey: "home.why.cards.precisionInstall.description",
    icon: FaTools,
  },
  {
    title: "Delivery",
    titleKey: "home.why.cards.fastDelivery.title",
    description:
      "Over 15 years of experience in automotive visual communication",
    descriptionKey: "home.why.cards.fastDelivery.description",
    icon: FaRocket,
  },
];
