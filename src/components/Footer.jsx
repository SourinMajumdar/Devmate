import { Link } from "react-router-dom";
import { Code2, Github } from "lucide-react";
import kombaiLogo from "../assets/kombai.png";

const navLinks = [
  { label: "Home",         to: "/" },
  { label: "Dashboard",    to: "/dashboard" },
  { label: "About",        to: "/about" },
  { label: "All Projects", to: "/projects" },
];

const colHeadingStyle = {
  fontSize: "11px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--color-text-muted)",
  marginBottom: "16px",
};

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        marginTop: "auto",
      }}
    >
      {/* ── Main columns ── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "52px var(--space-xl) 40px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "48px",
          alignItems: "start",
        }}
        className="footer-grid"
      >
        {/* Col 1 — Brand */}
        <div>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Code2
              style={{ width: "20px", height: "20px", color: "var(--color-accent)", strokeWidth: 2.5 }}
            />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "20px",
                fontWeight: "800",
                color: "var(--color-accent)",
                letterSpacing: "0.5px",
              }}
            >
              Devmate
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              lineHeight: "1.65",
              maxWidth: "280px",
              marginBottom: "24px",
            }}
          >
            Your developer journey, all in one place. Track projects, monitor activity, and showcase your work.
          </p>


        </div>

        {/* Col 2 — Navigation */}
        <div>
          <p style={colHeadingStyle}>Navigation</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  style={{
                    fontSize: "14px",
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    fontWeight: "500",
                    transition: "color var(--transition)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Built with + GitHub */}
        <div>
          <p style={colHeadingStyle}>Built with</p>

          {/* Badges */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            {[
              { href: "https://react.dev", src: "/react.svg", label: "React" },
              { href: "https://kombai.com", src: kombaiLogo,   label: "Kombai" },
            ].map(({ href, src, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "6px 12px",
                  background: "var(--color-bg)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border)",
                  textDecoration: "none",
                  width: "fit-content",
                  transition: "border-color var(--transition)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-border-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
              >
                <img src={src} alt={label} style={{ width: "14px", height: "14px" }} />
                <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)" }}>
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/SourinMajumdar/DevMate"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              fontWeight: "500",
              transition: "color var(--transition)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
          >
            <Github style={{ width: "15px", height: "15px" }} />
            View on GitHub
          </a>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "16px var(--space-xl)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="footer-bottom"
        >
          <span style={{ fontSize: "12px", color: "var(--color-text-muted)", fontWeight: "500" }}>
            © 2026 Devmate. All rights reserved.
          </span>
          <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
            Made for developers, by developers.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
