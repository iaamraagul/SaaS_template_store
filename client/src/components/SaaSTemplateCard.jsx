import { Heart } from "lucide-react";

export default function SaaSTemplateCard({
  template,
  favorite,
  onToggle,
  compact = false,
  disabled = false,
}) {
  const favoriteLabel = favorite ? "Remove" : "Add";

  return (
    <article
      className={`saas-template-card ${compact ? "favorite-template-card" : ""}`}
    >
      <div className="template-image-shell">
        <img src={template.image} alt={`${template.name} preview`} />
        <button
          className={`heart-button ${favorite ? "is-favorite" : ""}`}
          disabled={disabled}
          aria-label={`${favoriteLabel} ${template.name} ${favorite ? "from" : "to"} favorites`}
          onClick={() => onToggle(template.id)}
        >
          <Heart size={18} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="template-card-content">
        <div className="template-title-row">
          <h2>{template.name}</h2>
          <strong>${template.price}</strong>
        </div>
        <p>{template.description}</p>
        <div className="template-meta">
          <span>{template.category}</span>
          <span>{template.technology}</span>
          {compact && <time>{template.added}</time>}
        </div>
      </div>
    </article>
  );
}
