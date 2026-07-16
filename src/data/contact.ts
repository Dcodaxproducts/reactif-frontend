import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export const reactifContact = {
  phone: "+41 78 325 18 88",
  whatsappPhone: "41783251888",
  email: "info@reactifpub.ch",
  address: "Ch. de Morglas 7, 1214 Vernier Genève",
} as const;

export const reactifSocialLinks = {
  tiktok: "https://www.tiktok.com/@reactifpub",
  facebook: "https://www.facebook.com/reactifpub",
  instagram: "https://www.instagram.com/reactifpub",
} as const;

export const contactItems = [
  {
    icon: FaPhoneAlt,
    label: "Phone",
    labelKey: "contact.phone",
    value: reactifContact.phone,
  },
  {
    icon: FaEnvelope,
    label: "Email",
    labelKey: "contact.email",
    value: reactifContact.email,
  },
  {
    icon: FaMapMarkerAlt,
    label: "Address",
    labelKey: "contact.address",
    value: reactifContact.address,
  },
];

export const contactFields = [
  {
    name: "email",
    label: "Email",
    labelKey: "contact.email",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    labelKey: "contact.phone",
    type: "tel",
  },
];
