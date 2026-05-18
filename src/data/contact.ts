import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export const contactItems = [
  {
    icon: FaPhoneAlt,
    label: "Phone",
    value: "+33 1 23 45 67 89",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "reactif@gmail.com",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Address",
    value: "123 Avenue des Champs, Paris, France",
  },
];

export const contactFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
  },
];
