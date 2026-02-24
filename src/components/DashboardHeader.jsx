import { Code2, Home, LayoutDashboard } from "lucide-react";

const DashboardHeader = ({ onBackToHome, onBackToDashboard }) => {
  return (
    <header
      style={{
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        padding: "var(--space-md) 0",
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
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Code2
            style={{
              width: "24px",
              height: "24px",
              color: "#667eea",
              strokeWidth: 2.5,
            }}
          />
          <span
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontSize: "28px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "1px",
            }}
          >
            Devmate
          </span>
        </div>

        {/* Nav buttons */}
        <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="btn-secondary"
              style={{ padding: "8px 14px" }}
            >
              <LayoutDashboard style={{ width: "15px", height: "15px" }} />
              <span className="back-to-home-text">Dashboard</span>
            </button>
          )}

          <button
            onClick={onBackToHome}
            className="btn-secondary"
            style={{ padding: "8px 14px" }}
          >
            <Home style={{ width: "15px", height: "15px" }} />
            <span className="back-to-home-text">Home</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
