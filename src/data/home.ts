import {
  FaAward,
  FaRocket,
  FaShieldAlt,
  FaTools,
  FaUsers,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import type { WhyCardData } from "@/types/component-props";
import type { SupportFaq } from "@/types/support";

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
    description: "Over 15 years of experience in automotive visual communication",
    descriptionKey: "home.why.cards.recognizedExpertise.description",
    icon: FiPhone,
  },
  {
    title: "Materials",
    titleKey: "home.why.cards.premiumMaterials.title",
    description: "Professional materials selected for demanding visual communication projects",
    descriptionKey: "home.why.cards.premiumMaterials.description",
    icon: FaShieldAlt,
  },
  {
    title: "Quality",
    titleKey: "home.why.cards.awardWinning.title",
    description: "Precise production standards for polished visual results",
    descriptionKey: "home.why.cards.awardWinning.description",
    icon: FaAward,
  },
  {
    title: "Process",
    titleKey: "home.why.cards.clientFocused.title",
    description: "Clear support from concept to final installation",
    descriptionKey: "home.why.cards.clientFocused.description",
    icon: FaUsers,
  },
  {
    title: "Installation",
    titleKey: "home.why.cards.precisionInstall.title",
    description: "Expert installation for clean edges and durable application",
    descriptionKey: "home.why.cards.precisionInstall.description",
    icon: FaTools,
  },
  {
    title: "Delivery",
    titleKey: "home.why.cards.fastDelivery.title",
    description: "Efficient processes to move projects forward",
    descriptionKey: "home.why.cards.fastDelivery.description",
    icon: FaRocket,
  },
];

export const featuredCategoryCards = [
  {
    titleKey: "home.featuredCategories.cards.automobiles.title",
    slug: "automotive",
    aliases: ["automobile", "automobiles", "automotive", "vehicle", "vehicles", "covering/deco/pub"],
    image: "/assets/PaintProtection/branding/carTwo.png",
    imageAltKey: "home.featuredCategories.cards.automobiles.alt",
  },
  {
    titleKey: "home.featuredCategories.cards.papeterie.title",
    slug: "papeterie",
    aliases: ["papeterie", "pappeterie", "stationery", "printing", "print", "impression"],
    image: "/assets/PaintProtection/print/printFour.png",
    imageAltKey: "home.featuredCategories.cards.papeterie.alt",
  },
  {
    titleKey: "home.featuredCategories.cards.habillageVitrine.title",
    slug: "habillage-vitrine",
    aliases: ["habillage vitrine", "vitrine", "window", "window graphics", "vitrophanie"],
    image: "/assets/PaintProtection/window_tinting/carTwo.png",
    imageAltKey: "home.featuredCategories.cards.habillageVitrine.alt",
  },
  {
    titleKey: "home.featuredCategories.cards.enseigne.title",
    slug: "enseigne",
    aliases: ["enseigne", "enseignes", "sign", "signs", "signage", "signalétique", "signaletique"],
    image: "/assets/PaintProtection/signage.png",
    imageAltKey: "home.featuredCategories.cards.enseigne.alt",
  },
] as const;

export const whyChooseUsRows = [
  {
    id: "reactivity",
    gifUrl:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2FveGNpOHZ4bjh2eGhlOWNoM2Z6bHBvYTNmbGp4cHkzbTd3YXR5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o8doZFy4iPd8VBL8I/giphy.gif",
    titleKey: "home.why.rows.reactivity.title",
    descriptionKey: "home.why.rows.reactivity.description",
  },
  {
    id: "eyeCatching",
    gifUrl:
      "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3NuZWF3c2R5Zjk1ajJtZzR2NDhiNHE1dTJleDc5YmExMWJ5aXpqYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lxxOGaDRk4f7R5TkBd/giphy.gif",
    titleKey: "home.why.rows.eyeCatching.title",
    descriptionKey: "home.why.rows.eyeCatching.description",
  },
  {
    id: "covering",
    gifUrl:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN290M2c1aWNyNGhoZHRhNGtyaXVmb2cybjI0OWRnemFpMjRoaHVjZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDPlcQFeRKf9S/giphy.gif",
    titleKey: "home.why.rows.covering.title",
    descriptionKey: "home.why.rows.covering.description",
  },
  {
    id: "quality",
    gifUrl:
      "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcngyYWNleGNjam9oeTdsNTdsZzJoczY5b3F4bTFjaGwwczhxeDhqYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r1fDuPIcs18d2/giphy.gif",
    titleKey: "home.why.rows.quality.title",
    descriptionKey: "home.why.rows.quality.description",
  },
  {
    id: "humanSupport",
    gifUrl:
      "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTRlb2xuZHkyNWhtM3FsM3JpZWxnY2FueXA0ajYxMnNiYXZkN2RmZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Sw6ROTndwCGGByV0Db/giphy.gif",
    titleKey: "home.why.rows.humanSupport.title",
    descriptionKey: "home.why.rows.humanSupport.description",
  },
] as const;

export const galleryItems = [
  {
    src: "/assets/PaintProtection/branding/carOne.png",
    titleKey: "gallery.items.vehicleWrap.title",
    descriptionKey: "gallery.items.vehicleWrap.description",
  },
  {
    src: "/assets/PaintProtection/office.png",
    titleKey: "gallery.items.stationery.title",
    descriptionKey: "gallery.items.stationery.description",
  },
  {
    src: "/assets/PaintProtection/signage.png",
    titleKey: "gallery.items.signage.title",
    descriptionKey: "gallery.items.signage.description",
  },
  {
    src: "/assets/PaintProtection/stickers.png",
    titleKey: "gallery.items.window.title",
    descriptionKey: "gallery.items.window.description",
  },
  {
    src: "/assets/subcategories/wrap.png",
    titleKey: "gallery.items.fleet.title",
    descriptionKey: "gallery.items.fleet.description",
  },
  {
    src: "/assets/PaintProtection/print/printFive.png",
    titleKey: "gallery.items.print.title",
    descriptionKey: "gallery.items.print.description",
  },
] as const;

export const fallbackSupportFaqs: SupportFaq[] = [
  {
    id: "fallback-devis",
    value: "fallback-devis",
    question: "Comment demander un devis ?",
    answer:
      "Vous pouvez envoyer votre demande via le formulaire de contact ou WhatsApp avec une description du projet, les dimensions, les quantités et, si possible, des photos du support.",
  },
  {
    id: "fallback-delai",
    value: "fallback-delai",
    question: "Quels sont les délais de production ?",
    answer:
      "Les délais dépendent du service, de la complexité du design et des quantités. L’équipe confirme un planning clair après validation du devis et des fichiers.",
  },
  {
    id: "fallback-covering",
    value: "fallback-covering",
    question: "Faites-vous le covering de véhicules ?",
    answer:
      "Oui. RéactifPub accompagne les projets de marquage, covering partiel ou complet et habillage de flotte selon le véhicule et l’objectif de visibilité.",
  },
  {
    id: "fallback-fichiers",
    value: "fallback-fichiers",
    question: "Quels fichiers dois-je fournir ?",
    answer:
      "Les fichiers vectoriels sont recommandés pour les logos et textes. Les images doivent être fournies en haute résolution afin d’éviter un rendu pixelisé à l’impression.",
  },
  {
    id: "fallback-installation",
    value: "fallback-installation",
    question: "Proposez-vous la pose ou l’installation ?",
    answer:
      "Oui, la pose peut être organisée selon le type de support, l’adresse du projet et la disponibilité de l’équipe technique.",
  },
];
