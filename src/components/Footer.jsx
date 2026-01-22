import { Github } from "lucide-react";
import kombaiLogo from "../assets/kombai.png";

const Footer = () => {
  return (
    <footer className="footer" style={{
      background: "var(--color-bg-surface)",
      borderTop: "1px solid var(--color-border)",
      padding: "32px 0",
      marginTop: "48px",
    }}>
      <div className="footer-content" style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}>
        {/* Made using */}
        <div className="footer-made-with" style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          color: "var(--color-text-secondary)",
          fontWeight: "500",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <span>Made using</span>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            background: "rgba(59, 130, 246, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}

          
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(59, 130, 246, 0.15)";
            e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
            e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.2)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          >
            <img 
              src="/react.svg" 
              alt="React" 
              style={{ 
                width: "18px", 
                height: "18px",
                display: "block",
              }} 
            />
            <span style={{ color: "var(--color-primary-light)", fontWeight: "600" }}>React</span>
          </div>
          <span>and</span>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            background: "rgba(139, 92, 246, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.15)";
            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.4)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.2)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          >
            <img 
              src={kombaiLogo} 
              alt="Kombai" 
              style={{ 
                width: "18px", 
                height: "18px",
                display: "block",
              }} 
            />
            <span style={{ color: "#a78bfa", fontWeight: "600" }}>Kombai</span>
          </div>
        </div>

        {/* GitHub link */}
        <a
          href="https://github.com/SourinMajumdar/DevMate"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "var(--color-text-muted)",
            textDecoration: "none",
            fontWeight: "500",
            padding: "8px 16px",
            borderRadius: "8px",
            transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            border: "1px solid transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-primary-light)";
            e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
            e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.2)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text-muted)";
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <Github style={{ width: "18px", height: "18px" }} />
          <span>Find this on GitHub</span>
        </a>

        {/* Copyright */}
        <p style={{
          fontSize: "12px",
          color: "var(--color-text-subtle)",
          margin: "8px 0 0 0",
          fontWeight: "500",
        }}>
          © 2026 Devmate. Built with ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
