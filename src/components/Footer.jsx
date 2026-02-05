import { Github } from "lucide-react";
import kombaiLogo from "../assets/kombai.png";

const Footer = () => {
  return (
    <footer className="footer" style={{
      background: "var(--color-bg-elevated)",
      borderTop: "1px solid var(--color-border)",
      padding: "var(--spacing-8) 0",
      marginTop: "var(--spacing-10)",
    }}>
      <div className="footer-content" style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 var(--spacing-8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "var(--spacing-4)",
      }}>
        {/* Made using */}
        <div className="footer-made-with" style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
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
            padding: "5px 10px",
            background: "var(--color-bg-base)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border)",
          }}>
            <img 
              src="/react.svg" 
              alt="React" 
              style={{ 
                width: "16px", 
                height: "16px",
                display: "block",
              }} 
            />
            <span style={{ color: "var(--color-text-primary)", fontWeight: "500" }}>React</span>
          </div>
          <span>and</span>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 10px",
            background: "var(--color-bg-base)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border)",
          }}>
            <img 
              src={kombaiLogo} 
              alt="Kombai" 
              style={{ 
                width: "16px", 
                height: "16px",
                display: "block",
              }} 
            />
            <span style={{ color: "var(--color-text-primary)", fontWeight: "500" }}>Kombai</span>
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
            gap: "var(--spacing-2)",
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          <Github style={{ width: "16px", height: "16px" }} />
          <span>View on GitHub</span>
        </a>

        {/* Copyright */}
        <p style={{
          fontSize: "12px",
          color: "var(--color-text-tertiary)",
          margin: "var(--spacing-2) 0 0 0",
          fontWeight: "500",
        }}>
          © 2026 Devmate
        </p>
      </div>
    </footer>
  );
};

export default Footer;
