import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import AuthDecor from "../components/AuthDecor";
import SaaSFooter from "../components/SaaSFooter";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [consent, setConsent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!consent) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        email: form.email,
        password: form.password,
      });
      navigate(searchParams.get("returnTo") || "/templates");
    } catch (signUpError) {
      setError(signUpError.message);
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
        <Link to="/login" className="header-login">
          Login
        </Link>
      </header>

      <main className="auth-main signup-main">
        <AuthDecor />
        <section className="auth-panel signup-panel">
          <h1>Join the marketplace</h1>
          <p>
            Start building your next big idea with premium 3D-ready templates.
          </p>

          <form onSubmit={submit} noValidate>
            <div className="name-fields">
              <label>
                FIRST NAME
                <input
                  value={form.firstName}
                  onChange={updateField("firstName")}
                  placeholder="John"
                />
              </label>
              <label>
                LAST NAME
                <input
                  value={form.lastName}
                  onChange={updateField("lastName")}
                  placeholder="Doe"
                />
              </label>
            </div>

            <label>
              EMAIL ADDRESS
              <input
                value={form.email}
                onChange={updateField("email")}
                placeholder="john@example.com"
                type="email"
              />
            </label>

            <label>
              PASSWORD
              <div className="password-input">
                <input
                  value={form.password}
                  onChange={updateField("password")}
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

            <label className="checkbox-line consent-line">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
              />
              <span>
                I agree to the{" "}
                <a href="#terms" onClick={(event) => event.preventDefault()}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#privacy" onClick={(event) => event.preventDefault()}>
                  Privacy Policy
                </a>
                .
              </span>
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
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account?<Link to="/login">Log in</Link>
          </div>
        </section>
      </main>
      <SaaSFooter auth />
    </div>
  );
}
