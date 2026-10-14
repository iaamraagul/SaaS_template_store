export default function SaaSFooter({ auth = false }) {
  if (auth) {
    return (
      <footer className="auth-footer">
        © 2026 SAAS TEMPLATES. ALL RIGHTS RESERVED.
      </footer>
    );
  }

  return (
    <footer className="saas-footer">
      <div className="footer-columns">
        <div>
          <div className="saas-brand footer-brand">
            SaaS<span>Templates</span>
          </div>
          <p>Premium templates for modern web products.</p>
        </div>
        <div>
          <h3>Product</h3>
          <a href="#browse">Browse</a>
          <a href="#categories">Categories</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div>
          <h3>Company</h3>
          <a href="#about">About</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <h3>Legal</h3>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 SaaS Templates. All rights reserved.
      </div>
    </footer>
  );
}
