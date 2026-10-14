import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import AuthDecor from "../components/AuthDecor";
import SaaSFooter from "../components/SaaSFooter";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      navigate(searchParams.get("returnTo") || "/templates");
    } catch (signInError) {
      setError(signInError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="saas-brand">
          SaaS<span>Templates</span>
        </Link>
        <Link to="/signup" className="header-cta">
          Get Started
        </Link>
      </header>

      <main className="auth-main">
        <AuthDecor />
        <section className="auth-panel">
          <h1>Welcome back</h1>
          <p>Sign in to access your saved premium templates.</p>

          <form onSubmit={submit} noValidate>
            <label>
              EMAIL ADDRESS
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="john@example.com"
                type="email"
              />
            </label>

            <label className="password-label">
              <span>PASSWORD</span>
              <a href="#forgot" onClick={(event) => event.preventDefault()}>
                FORGOT?
              </a>
              <div className="password-input">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </label>

            <label className="checkbox-line">
              <input
                type="checkbox"
                checked={staySignedIn}
                onChange={(event) => setStaySignedIn(event.target.checked)}
              />
              <span>Stay signed in for 30 days</span>
            </label>

            {error && (
              <div className="auth-error" role="alert">
                {error}
              </div>
            )}
            <button
              className="auth-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-switch">
            New to the marketplace?<Link to="/signup">Create account</Link>
          </div>
        </section>
      </main>
      <SaaSFooter auth />
    </div>
  );
}
