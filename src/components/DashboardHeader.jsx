import { useNavigate, useLocation } from "react-router-dom";
import { Code2, Home, LayoutDashboard } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isDashboard = pathname === "/dashboard";

  return (
    <header
      style={{
        background: "var(--color-header-bg)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        borderBottom: "1px solid var(--color-header-border)",
        boxShadow: "0 1px 0 rgba(37, 99, 235, 0.04)",
        padding: "var(--space-sm) 0",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="dashboard-header"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 var(--space-xl)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand — click goes home */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
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

        {/* Nav buttons */}
        <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          {!isDashboard && (
            <button
              onClick={() => navigate("/dashboard")}
              className="btn-secondary"
              style={{ padding: "7px 14px" }}
            >
              <LayoutDashboard style={{ width: "15px", height: "15px" }} />
              <span className="back-to-home-text">Dashboard</span>
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="btn-secondary"
            style={{ padding: "7px 14px" }}
          >
            <Home style={{ width: "15px", height: "15px" }} />
            <span className="back-to-home-text">Home</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
