import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SaaSFooter from "../components/SaaSFooter";
import SaaSTemplateCard from "../components/SaaSTemplateCard";
import { useAuth } from "../context/AuthContext";
import {
  categories as fallbackCategories,
  templateCatalog,
} from "../data/templates";
import { presentTemplate } from "../data/presentTemplate";
import { templateApi } from "../services/api";

export default function MarketplacePage() {
  const { favoriteIds, isAuthenticated, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(templateCatalog);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(fallbackCategories[0]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    templateApi
      .list()
      .then((items) => {
        if (active && items.length) setTemplates(items.map(presentTemplate));
      })
      .catch(() => {
        if (active)
          setError("Showing the local catalog while the API reconnects.");
      });

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [
      "All Categories",
      ...new Set(templates.map((template) => template.category)),
    ],
    [templates],
  );

  const filteredTemplates = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return templates.filter((template) => {
      const searchableText =
        `${template.name} ${template.description}`.toLowerCase();
      const matchesSearch = searchableText.includes(searchTerm);
      const matchesCategory =
        category === "All Categories" || template.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, search, templates]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
  };

  const handleFavorite = async (templateId) => {
    if (!isAuthenticated) {
      navigate("/login?returnTo=%2Ftemplates");
      return;
    }

    try {
      await toggleFavorite(templateId);
      setError("");
    } catch (favoriteError) {
      setError(favoriteError.message);
    }
  };

  return (
    <>
      <main className="marketplace-page" id="browse">
        <section className="marketplace-hero">
          <div className="hero-device device-one" />
          <div className="hero-device device-two" />
          <div className="hero-device device-three" />
          <div className="hero-copy">
            <h1>
              Premium SaaS <em>Templates</em>
            </h1>
            <p>
              Discover a curated collection of modern, dimensionally-rich
              interfaces
              <br className="desktop-only" /> designed for the next generation
              of SaaS founders.
            </p>
          </div>
        </section>

        <section className="marketplace-content">
          <div className="search-filter-bar">
            <div className="marketplace-search">
              <Search size={19} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search templates..."
                aria-label="Search templates"
              />
            </div>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <button className="clear-button" onClick={clearFilters}>
              Clear
            </button>
          </div>

          {error && <p className="api-notice">{error}</p>}

          {filteredTemplates.length > 0 ? (
            <div className="saas-template-grid">
              {filteredTemplates.map((template) => (
                <SaaSTemplateCard
                  key={template.id}
                  template={template}
                  favorite={favoriteIds.includes(template.id)}
                  onToggle={handleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="marketplace-empty">
              <h2>No templates found</h2>
              <p>Try a different search or category.</p>
              <button onClick={clearFilters}>Clear filters</button>
            </div>
          )}
        </section>
      </main>
      <SaaSFooter />
    </>
  );
}
