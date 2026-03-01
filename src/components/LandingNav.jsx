import { Code2, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const LandingNav = () => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--color-header-bg)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        borderBottom: "1px solid var(--color-header-border)",
        padding: "var(--space-sm) 0",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 var(--space-xl)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Code2
            style={{ width: "22px", height: "22px", color: "var(--color-accent)", strokeWidth: 2.5 }}
          />
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "22px",
              fontWeight: "800",
              color: "var(--color-accent)",
              letterSpacing: "0.5px",
            }}
          >
            Devmate
          </span>
        </button>

        <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          <button
            onClick={() => navigate("/dashboard")}
            className="btn-secondary"
            style={{ padding: "7px 14px" }}
          >
            <LayoutDashboard style={{ width: "15px", height: "15px" }} />
            <span className="back-to-home-text">Dashboard</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default LandingNav;
