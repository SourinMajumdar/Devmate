import { Code2, Home, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const DashboardHeader = ({ onBackToHome, onBackToDashboard }) => {
  return (
    <header style={{
      background: "var(--color-bg-surface)",
      borderBottom: "1px solid var(--color-border)",
      padding: "var(--spacing-4) 0",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <div className="dashboard-header" style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 var(--spacing-8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo/Brand */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}>
          <Code2 style={{ width: "24px", height: "24px", color: "#667eea", strokeWidth: 2.5 }} />
          <h1 style={{
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: "28px",
            fontWeight: "800",
            margin: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "1px",
          }}>
            Devmate
          </h1>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: "var(--spacing-3)", alignItems: "center" }}>
          {onBackToDashboard && (
            <motion.button
              onClick={onBackToDashboard}
              whileHover={{ 
                borderColor: "#667eea",
                boxShadow: "0 2px 8px rgba(102, 126, 234, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--spacing-2)",
                padding: "10px 18px",
                background: "white",
                color: "var(--color-text-secondary)",
                border: "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                fontWeight: "500",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              <LayoutDashboard style={{ width: "16px", height: "16px" }} />
              <span className="back-to-home-text">Back to Dashboard</span>
            </motion.button>
          )}
          
          <motion.button
            onClick={onBackToHome}
            whileHover={{ 
              borderColor: "#667eea",
              boxShadow: "0 2px 8px rgba(102, 126, 234, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
              padding: "10px 18px",
              background: "white",
              color: "var(--color-text-secondary)",
              border: "1.5px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              fontWeight: "500",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <Home style={{ width: "16px", height: "16px" }} />
            <span className="back-to-home-text">Home</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
