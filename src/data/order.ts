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
  { label: "Full Name", defaultValue: "" },
  { label: "Email Address", defaultValue: "" },
  { label: "Phone Number", defaultValue: "" },
];

export const addressFields = [
  {
    label: "Street Address",
    name: "street",
    defaultValue: "",
    fullWidth: true,
  },
  { label: "City", name: "city", defaultValue: "" },
  { label: "State", name: "state", defaultValue: "" },
  { label: "Zip Code", name: "zip", defaultValue: "" },
  { label: "Latitude", name: "latitude", defaultValue: "" },
  { label: "Longitude", name: "longitude", defaultValue: "" },
];

export const paymentSummaryRows: OrderPriceRowData[] = [
  { label: "Sub Total", value: "Pending booking" },
  { label: "Tax", value: "Pending booking" },
  { label: "Service Margin", value: "Pending booking" },
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
  { title: "Order Number", value: "Pending booking" },
  { title: "Order Date", value: "Recorded after booking" },
  { title: "Payment Method", value: "Confirmed payment" },
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
  { icon: "store", title: "Shipment Created", date: "Pending booking" },
  { icon: "truck", title: "Package Picked Up", date: "Pending pickup" },
  { icon: "truck", title: "In Transit", date: "Pending transit" },
  {
    icon: "check",
    title: "Delivered",
    date: "Pending delivery",
    last: true,
  },
];

export const shipmentDetails: TrackingDetailData[] = [
  { title: "Tracking Number", value: "Pending booking" },
  { title: "Carrier", value: "Assigned after booking" },
  { title: "Service Type", value: "Ground" },
  { title: "Weight", value: "5 lbs" },
  { title: "Dimensions", value: "12x10x8 inches" },
];
