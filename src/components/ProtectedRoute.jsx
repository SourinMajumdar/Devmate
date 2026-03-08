import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

/**
 * Wraps routes that require authentication.
 * Shows a loading state while the session is being resolved,
 * then redirects to /login if no user is found.
 * Includes a 15s timeout safety net in case loading gets stuck.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        console.warn("[Devmate] ProtectedRoute: Loading timed out after 15s");
        setTimedOut(true);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [loading]);

  // Safety net: if loading takes too long, treat as no user
  if ((loading && !timedOut) || (!user && timedOut && loading)) {
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
