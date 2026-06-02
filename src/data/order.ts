import type {
  DetailPair,
  EditableInputFieldProps,
  InstallationNoteData,
  OrderInfoItemData,
  OrderItemData,
  PaymentInputFieldProps,
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
    titleKey: "order.stoneChipResistance",
    description: "Absorbs impacts from gravel and road debris.",
    descriptionKey: "order.stoneChipResistanceDescription",
  },
  {
    title: "UV Protection",
    titleKey: "order.uvProtection",
    description: "Prevents discoloration and fading from sun exposure.",
    descriptionKey: "order.uvProtectionDescription",
  },
  {
    title: "Scratch Resistance",
    titleKey: "order.scratchResistance",
    description: "Protects your vehicle from light scratches and scuffs.",
    descriptionKey: "order.scratchResistanceDescription",
  },
];

export const configurationOptionGroups = [
  {
    title: "FILM FINISH",
    titleKey: "order.filmFinish",
    options: ["Gloss (Standard)", "Matte / Steel"],
    optionKeys: ["order.glossStandard", "order.matteSteel"],
  },
  {
    title: "CERAMIC COATING",
    titleKey: "order.ceramicCoating",
    options: ["None", "Gtechhalo (2 layers)"],
    optionKeys: ["order.none", "order.gtechhaloLayers"],
  },
];

export const personalInfoFields: EditableInputFieldProps[] = [
  { label: "Full Name", labelKey: "order.fullName", defaultValue: "" },
  { label: "Email Address", labelKey: "order.emailAddress", defaultValue: "" },
  { label: "Phone Number", labelKey: "order.phoneNumber", defaultValue: "" },
];

export const addressFields: EditableInputFieldProps[] = [
  {
    label: "Street Address",
    labelKey: "order.streetAddress",
    name: "street",
    defaultValue: "",
    fullWidth: true,
  },
  { label: "City", labelKey: "order.city", name: "city", defaultValue: "" },
  { label: "State", labelKey: "order.state", name: "state", defaultValue: "" },
  { label: "Zip Code", labelKey: "order.zipCode", name: "zip", defaultValue: "" },
  { label: "Latitude", labelKey: "order.latitude", name: "latitude", defaultValue: "" },
  { label: "Longitude", labelKey: "order.longitude", name: "longitude", defaultValue: "" },
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

export const paymentFields: PaymentInputFieldProps[] = [
  {
    label: "Name on Card",
    labelKey: "payment.nameOnCard",
    placeholder: "John Smith",
    placeholderKey: "payment.johnSmith",
  },
  {
    label: "Card Number",
    labelKey: "payment.cardNumber",
    placeholder: "0000 0000 0000 0000",
    placeholderKey: "payment.cardPlaceholder",
  },
];

export const paymentSecondaryFields: PaymentInputFieldProps[] = [
  {
    label: "Expiry Date",
    labelKey: "payment.expiryDate",
    placeholder: "MM / YY",
    placeholderKey: "payment.expiryPlaceholder",
  },
  {
    label: "CVC",
    labelKey: "payment.cvc",
    placeholder: "123",
    placeholderKey: "payment.cvcPlaceholder",
  },
  {
    label: "ZIP or Postal Code",
    labelKey: "payment.zipPostalCode",
    placeholder: "12345",
    placeholderKey: "payment.zipPlaceholder",
  },
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
