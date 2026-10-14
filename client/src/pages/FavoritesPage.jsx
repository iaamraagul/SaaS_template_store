import { useEffect, useState } from "react";

import SaaSFooter from "../components/SaaSFooter";
import SaaSTemplateCard from "../components/SaaSTemplateCard";
import { useAuth } from "../context/AuthContext";
import { templateCatalog } from "../data/templates";
import { presentTemplate } from "../data/presentTemplate";
import { templateApi } from "../services/api";

export default function FavoritesPage() {
  const { favoriteIds, toggleFavorite } = useAuth();
  const [templates, setTemplates] = useState(templateCatalog);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    templateApi
      .list()
      .then((items) => {
        if (active && items.length) setTemplates(items.map(presentTemplate));
      })
      .catch(() => {
        if (active) setError("We could not refresh the marketplace catalog.");
      });

    return () => {
      active = false;
    };
  }, []);

  const favorites = templates.filter((template) =>
    favoriteIds.includes(template.id),
  );

  const handleRemove = async (templateId) => {
    try {
      await toggleFavorite(templateId);
      setError("");
    } catch (favoriteError) {
      setError(favoriteError.message);
    }
  };

  return (
    <>
      <main className="favorites-page">
        <section className="favorites-heading">
          <h1>My Favorites</h1>
          <p>
            You have saved <strong>{favorites.length}</strong> templates to your
            collection.
          </p>
        </section>

        <section className="favorites-content">
          {error && <p className="api-notice">{error}</p>}
          {favorites.length > 0 ? (
            <div className="favorites-grid">
              {favorites.map((template) => (
                <SaaSTemplateCard
                  key={template.id}
                  template={template}
                  favorite
                  compact
                  onToggle={handleRemove}
                />
              ))}
            </div>
          ) : (
            <div className="marketplace-empty">
              <h2>Your collection is empty</h2>
              <p>Browse the marketplace to save templates you love.</p>
            </div>
          )}
        </section>
      </main>
      <SaaSFooter />
    </>
  );
}
