import { Link } from "react-router-dom";
import { Code2, Github } from "lucide-react";
import kombaiLogo from "../assets/kombai.png";

const navLinks = [
  { label: "Home",      to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "About",     to: "/about" },
];

const colHeadingStyle = {
  fontSize: "11px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--color-text-muted)",
  marginBottom: "14px",
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
          padding: "28px 200px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "32px",
        }}
        className="footer-grid"
      >
        {/* Col 1 — Brand */}
        <div>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "10px" }}>
            <Code2
              style={{ width: "26px", height: "26px", color: "var(--color-accent)", strokeWidth: 2.5 }}
            />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "26px",
                fontWeight: "800",
                color: "var(--color-accent)",
                letterSpacing: "0.5px",
              }}
            >
              Devmate
            </span>
          </div>

          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              lineHeight: "1.65",
              margin: "0 0 8px 0",
            }}
          >
            Your developer journey, all in one place.
          </p>
          <p style={{ fontSize: "12px", color: "var(--color-text-muted)", margin: 0 }}>
            © 2026 Devmate. All rights reserved.
          </p>


        </div>

        {/* Col 2 — Navigation */}
        <div>
          <p style={colHeadingStyle}>Navigation</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
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
          {/* React & Kombai inline */}
          <p style={{ fontSize: "14px", margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: "6px" }}>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-text-primary)", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px", transition: "color var(--transition)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
            >
              <img src="/react.svg" alt="React" style={{ width: "14px", height: "14px" }} />
              React
            </a>
            <span style={{ color: "var(--color-text-muted)" }}>&amp;</span>
            <a
              href="https://kombai.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-text-primary)", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px", transition: "color var(--transition)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
            >
              <img src={kombaiLogo} alt="Kombai" style={{ width: "14px", height: "14px" }} />
              Kombai
            </a>
          </p>

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


    </footer>
  );
};

export default Footer;
