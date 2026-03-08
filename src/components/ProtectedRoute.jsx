import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
        }}
      >
        <div style={spinnerWrapStyle}>
          <div style={spinnerStyle} />
          <span style={spinnerLabelStyle}>Loading…</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const spinnerWrapStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
};

const spinnerStyle = {
  width: "36px",
  height: "36px",
  border: "3px solid var(--color-border)",
  borderTopColor: "var(--color-accent)",
  borderRadius: "50%",
  animation: "spin 0.7s linear infinite",
};

const spinnerLabelStyle = {
  fontSize: "var(--font-size-sm)",
  color: "var(--color-text-muted)",
  fontWeight: "var(--font-weight-medium)",
};

export default ProtectedRoute;