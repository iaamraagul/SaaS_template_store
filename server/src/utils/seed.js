import { connectDb } from "../config/db.js";
import Template from "../models/Template.js";

const templates = [
  {
    name: "Nimbus Landing",
    description:
      "A sleek landing page for analytics SaaS products with smooth animations and depth effects.",
    thumbnail_url: "/templates/nimbus-landing.jpg",
    category: "LANDING",
    price: 49,
    technology: "REACT",
    added: "ADDED 2 DAYS AGO",
  },
  {
    name: "Atlas Dashboard",
    description:
      "Full-featured analytics dashboard with dark mode and rich data widgets.",
    thumbnail_url: "/templates/atlas-dashboard.jpg",
    category: "DASHBOARD",
    price: 79,
    technology: "NEXT.JS",
    added: "ADDED 1 WEEK AGO",
  },
  {
    name: "Vault Mobile",
    description:
      "A polished fintech mobile app kit with onboarding and payment flows.",
    thumbnail_url: "/templates/vault-mobile.jpg",
    category: "SAAS",
    price: 59,
    technology: "FLUTTER",
    added: "ADDED 3 DAYS AGO",
  },
  {
    name: "Flow Board",
    description:
      "Kanban-style project management template with drag-and-drop tasks and depth.",
    thumbnail_url: "/templates/flow-board.jpg",
    category: "SAAS",
    price: 69,
    technology: "VUE",
    added: "ADDED 5 DAYS AGO",
  },
  {
    name: "Cartify Store",
    description:
      "Complete e-commerce storefront with cart, checkout and product detail pages.",
    thumbnail_url: "/templates/cartify-store.jpg",
    category: "LANDING",
    price: 89,
    technology: "SHOPIFY",
    added: "ADDED 1 WEEK AGO",
  },
  {
    name: "Pipeline CRM",
    description:
      "Enterprise-grade CRM interface with contacts, deals and reporting views.",
    thumbnail_url: "/templates/pipeline-crm.jpg",
    category: "DASHBOARD",
    price: 99,
    technology: "ANGULAR",
    added: "ADDED 2 WEEKS AGO",
  },
  {
    name: "Beacon Analytics",
    description:
      "A calm reporting workspace for teams that need fast answers from their data.",
    thumbnail_url: "/templates/atlas-dashboard.jpg",
    category: "DASHBOARD",
    price: 74,
    technology: "REACT",
    added: "ADDED TODAY",
  },
  {
    name: "Orbit Billing",
    description:
      "A clear subscription and invoice experience for growing SaaS teams.",
    thumbnail_url: "/templates/vault-mobile.jpg",
    category: "SAAS",
    price: 64,
    technology: "REACT",
    added: "ADDED TODAY",
  },
  {
    name: "Lantern Launch",
    description:
      "A conversion-focused product launch page with a bright, editorial rhythm.",
    thumbnail_url: "/templates/nimbus-landing.jpg",
    category: "LANDING",
    price: 54,
    technology: "NEXT.JS",
    added: "ADDED TODAY",
  },
  {
    name: "Relay CRM",
    description:
      "A focused customer workspace for managing contacts, deals, and follow-ups.",
    thumbnail_url: "/templates/pipeline-crm.jpg",
    category: "DASHBOARD",
    price: 84,
    technology: "VUE",
    added: "ADDED TODAY",
  },
];

const legacyTemplateNames = [
  "Pulseboard",
  "Northstar Commerce",
  "Canvas Folio",
  "Launchline",
  "Signal Analytics",
  "Atlas Admin",
  "Bloom Finance",
  "Studio Grid",
];

await connectDb();

await Template.deleteMany({ name: { $in: legacyTemplateNames } });

await Template.bulkWrite(
  templates.map((template) => ({
    updateOne: {
      filter: { name: template.name },
      update: { $set: template },
      upsert: true,
    },
  })),
);

console.log(`Seeded ${templates.length} templates.`);
process.exit(0);
