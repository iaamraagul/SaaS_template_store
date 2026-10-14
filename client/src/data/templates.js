const templateCatalog = [
  {
    id: "nimbus-landing",
    name: "Nimbus Landing",
    price: 49,
    description:
      "A sleek landing page for analytics SaaS products with smooth animations and depth effects.",
    category: "LANDING",
    technology: "REACT",
    image: "/templates/nimbus-landing.jpg",
    added: "ADDED 2 DAYS AGO",
  },
  {
    id: "atlas-dashboard",
    name: "Atlas Dashboard",
    price: 79,
    description:
      "Full-featured analytics dashboard with dark mode and rich data widgets.",
    category: "DASHBOARD",
    technology: "NEXT.JS",
    image: "/templates/atlas-dashboard.jpg",
    added: "ADDED 1 WEEK AGO",
  },
  {
    id: "vault-mobile",
    name: "Vault Mobile",
    price: 59,
    description:
      "A polished fintech mobile app kit with onboarding and payment flows.",
    category: "SAAS",
    technology: "FLUTTER",
    image: "/templates/vault-mobile.jpg",
    added: "ADDED 3 DAYS AGO",
  },
  {
    id: "flow-board",
    name: "Flow Board",
    price: 69,
    description:
      "Kanban-style project management template with drag-and-drop tasks and depth.",
    category: "SAAS",
    technology: "VUE",
    image: "/templates/flow-board.jpg",
    added: "ADDED 5 DAYS AGO",
  },
  {
    id: "cartify-store",
    name: "Cartify Store",
    price: 89,
    description:
      "Complete e-commerce storefront with cart, checkout and product detail pages.",
    category: "LANDING",
    technology: "SHOPIFY",
    image: "/templates/cartify-store.jpg",
    added: "ADDED 1 WEEK AGO",
  },
  {
    id: "pipeline-crm",
    name: "Pipeline CRM",
    price: 99,
    description:
      "Enterprise-grade CRM interface with contacts, deals and reporting views.",
    category: "DASHBOARD",
    technology: "ANGULAR",
    image: "/templates/pipeline-crm.jpg",
    added: "ADDED 2 WEEKS AGO",
  },
];

const categories = [
  "All Categories",
  ...new Set(templateCatalog.map((template) => template.category)),
];

const defaultFavoriteIds = ["nimbus-landing", "atlas-dashboard"];

export { categories, defaultFavoriteIds, templateCatalog };
