import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export const contactItems = [
  {
    icon: FaPhoneAlt,
    label: "Phone",
    labelKey: "contact.phone",
    value: "+33 1 23 45 67 89",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    labelKey: "contact.email",
    value: "reactif@gmail.com",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Address",
    labelKey: "contact.address",
    value: "123 Avenue des Champs, Paris, France",
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
