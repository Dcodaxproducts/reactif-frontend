import type {
  DetailPair,
  InstallationNoteData,
  OrderInfoItemData,
  OrderItemData,
  OrderPaymentMethodData,
  OrderPriceRowData,
  ShipmentStatusData,
  SpecItemData,
  TrackingDetailData,
  TrackingTimelineItemData,
} from "@/types/component-props";

export const orderBackgroundStyle = {
  backgroundImage: "url('/assets/AllVendorServices/background.png')",
};

export const projectSummary = {
  title: "Fleet Vehicle Wraps (5 Units)",
  description: "Full body vinyl wraps for Ford Transit Connects.",
  dueDate: "Nov 12, 2025",
};

export const technicalSpecs: SpecItemData[] = [
  {
    label: "Material",
    value: "3M IJ180Cv3 Controltac",
    iconColorClass: "text-blue-500",
  },
  {
    label: "Lamination Finish",
    value: "8518 Gloss Overlaminate",
    iconColorClass: "text-purple-500",
  },
  {
    label: "Dimensions/Coverage",
    value: "Full Wrap (Roof + Bumpers)",
    iconColorClass: "text-orange-500",
  },
];

export const vehicleDetails: DetailPair[] = [
  {
    left: { label: "Make/Model", value: "Ford Transit Connect" },
    right: { label: "Year", value: "2024" },
  },
  {
    left: { label: "Color", value: "Oxford White" },
    right: { label: "Condition", value: "New (Clean)" },
  },
];

export const installationNote: InstallationNoteData = {
  title: "Installation Note",
  description:
    "Client requested removal of rear badges prior to install. Badges to be saved.",
};

export const sampleDesignImages = Array.from(
  { length: 7 },
  () => "/assets/design.png",
);

export const protectionFeatures = [
  {
    title: "Stone Chip Resistance",
    description: "Absorbs impacts from gravel and road debris.",
  },
  {
    title: "UV Protection",
    description: "Prevents discoloration and fading from sun exposure.",
  },
  {
    title: "Scratch Resistance",
    description: "Protects your vehicle from light scratches and scuffs.",
  },
];

export const configurationOptionGroups = [
  { title: "FILM FINISH", options: ["Gloss (Standard)", "Matte / Steel"] },
  { title: "CERAMIC COATING", options: ["None", "Gtechhalo (2 layers)"] },
];

export const personalInfoFields = [
  { label: "Full Name", defaultValue: "John Doe" },
  { label: "Email Address", defaultValue: "john.doe@acme.com" },
  { label: "Phone Number", defaultValue: "+1 (555) 123-4567" },
];

export const addressFields = [
  {
    label: "Street Address",
    defaultValue: "123 Business St, Suite 100",
    fullWidth: true,
  },
  { label: "City", defaultValue: "San Francisco" },
  { label: "State", defaultValue: "CA" },
  { label: "Zip Code", defaultValue: "94567" },
];

export const paymentSummaryRows: OrderPriceRowData[] = [
  { label: "Sub Total", value: "$1100.00" },
  { label: "Tax (10%)", value: "$110.00" },
  { label: "Service Margin", value: "$40.00" },
];

export const paymentMethods: OrderPaymentMethodData[] = [
  { label: "Credit / Debit Card", active: true },
  { label: "Google Pay" },
  { label: "Apple Pay" },
];

export const paymentFields = [
  { label: "Name on Card", placeholder: "John Smith" },
  { label: "Card Number", placeholder: "0000 0000 0000 0000" },
];

export const paymentSecondaryFields = [
  { label: "Expiry Date", placeholder: "MM / YY" },
  { label: "CVC", placeholder: "123" },
  { label: "ZIP or Postal Code", placeholder: "12345" },
];

export const orderConfirmationInfo: OrderInfoItemData[] = [
  { title: "Order Number", value: "123-4567890" },
  { title: "Order Date", value: "October 26, 2023" },
  { title: "Payment Method", value: "Visa ending in 1234" },
];

export const orderConfirmationItems: OrderItemData[] = [
  { name: "Premium Ergonomic Chair", qty: "1", price: "$499.00" },
  { name: "Adjustable Standing Desk", qty: "1", price: "$499.00" },
  { name: "Wireless Mechanical Keyboard", qty: "1", price: "$499.00" },
];

export const orderConfirmationTotals: OrderPriceRowData[] = [
  { label: "Subtotal", value: "$969.50" },
  { label: "Shipping", value: "$25.00" },
  { label: "Taxes", value: "$78.76" },
];

export const shipmentStatuses: ShipmentStatusData[] = [
  { title: "Current Status", value: "In Transit" },
  { title: "Estimated Delivery", value: "July 26, 2024" },
  { title: "Origin", value: "Los Angeles, CA" },
];

export const shipmentTimeline: TrackingTimelineItemData[] = [
  { icon: "store", title: "Shipment Created", date: "July 20, 2024, 10:00 AM" },
  { icon: "truck", title: "Package Picked Up", date: "July 21, 2024, 2:00 PM" },
  { icon: "truck", title: "In Transit", date: "July 22, 2024, 8:00 AM" },
  {
    icon: "check",
    title: "Delivered",
    date: "July 26, 2024, 12:00 PM",
    last: true,
  },
];

export const shipmentDetails: TrackingDetailData[] = [
  { title: "Tracking Number", value: "1Z999AA10123456789" },
  { title: "Carrier", value: "Speedy Delivery" },
  { title: "Service Type", value: "Ground" },
  { title: "Weight", value: "5 lbs" },
  { title: "Dimensions", value: "12x10x8 inches" },
];
