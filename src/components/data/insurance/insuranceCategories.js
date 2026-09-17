// src/components/data/insurance/insuranceCategories.js

export const insuranceCategories = [
  {
    id: "home-insurance",
    title: "Home Insurance",
    emoji: "🏠",
    icon: "home",
    accent: "#00695C",
    description: "Protect your home and belongings from unforeseen events.",
    image: "/src/assets/insurance/home.jpg",
    features: [
      "Structure + contents cover",
      "Fire & natural calamity",
      "Theft & burglary protection",
    ],
  },
  {
    id: "property-insurance",
    title: "Property Insurance",
    emoji: "🏢",
    icon: "building",
    accent: "#6A1B9A",
    description: "Safeguard your property investments from risks.",
    image: "/src/assets/insurance/property.jpg",
    features: [
      "Fire & special perils",
      "Flood & storm cover",
      "Theft & vandalism",
    ],
  },
  {
    id: "building-insurance",
    title: "Building Insurance",
    emoji: "🏗️",
    icon: "building2",
    accent: "#E65100",
    description: "Coverage for structures at every stage of construction.",
    image: "/src/assets/insurance/building.jpg",
    features: [
      "Structure coverage",
      "Fire & calamity",
      "Structural damage",
    ],
  },
];

// Category grid shown at the bottom of the page
export const insuranceCategoryGrid = [
  {
    title: "Home Insurance",
    icon: "home",
    description: "Protect your home and belongings from unforeseen events.",
  },
  {
    title: "Property Insurance",
    icon: "building",
    description: "Safeguard your property investments from risks.",
  },
  {
    title: "Building Insurance",
    icon: "building2",
    description: "Coverage for structures at every stage of construction.",
  },
];