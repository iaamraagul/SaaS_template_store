import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function SaaSHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <header className="saas-header">
      <Link to="/" className="saas-brand">
        SaaS<span>Templates</span>
      </Link>

      <nav className="saas-nav" aria-label="Primary navigation">
        <NavLink to="/templates">Browse</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
      </nav>

      <div className="saas-header-actions">
        {user ? (
          <>
            <span className="profile-avatar" aria-hidden="true">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <span className="profile-name">{user.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="header-login">
              Login
            </Link>
            <Link to="/signup" className="header-cta">
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
