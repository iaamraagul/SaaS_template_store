export function presentTemplate(template) {
  const id = template.id || template._id;

  return {
    ...template,
    id,
    image: template.image || template.thumbnail_url,
    price: template.price || 49,
    technology: template.technology || template.category,
    added: template.added || "AVAILABLE NOW",
  };
}
