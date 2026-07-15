import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export const contactItems = [
  {
    icon: FaPhoneAlt,
    label: "Phone",
    labelKey: "contact.phone",
    value: "+41 78 325 18 88",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    labelKey: "contact.email",
    value: "info@reactifpub.ch",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Address",
    labelKey: "contact.address",
    value: "Ch. de Morglas 7, 1214 Vernier Genève",
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
