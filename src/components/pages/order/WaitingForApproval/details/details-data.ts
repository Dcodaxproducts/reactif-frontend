import type { DetailPair, InstallationNoteData, SpecItemData } from "./types";

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
