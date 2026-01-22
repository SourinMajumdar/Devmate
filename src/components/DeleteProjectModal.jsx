import { X, AlertTriangle } from "lucide-react";

const DeleteProjectModal = ({ onConfirm, onCancel }) => {
  return (
    <div style={overlayStyle} onClick={onCancel}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onCancel} style={closeButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <X style={{ width: "20px", height: "20px" }} />
        </button>
        
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "rgba(239, 68, 68, 0.15)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
        }}>
          <AlertTriangle style={{ width: "28px", height: "28px", color: "#ef4444" }} />
        </div>
        
        <h3 style={{ fontSize: "20px", fontWeight: "700", textAlign: "center", letterSpacing: "-0.01em", color: "var(--color-text-primary)" }}>
          Delete project?
        </h3>

        <p style={{ fontSize: "14px", color: "var(--color-text-muted)", marginTop: "10px", textAlign: "center", lineHeight: "1.6" }}>
          This action cannot be undone. Your project will be permanently removed.
        </p>

        <div style={buttonRowStyle}>
          <button onClick={onCancel} style={cancelButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-bg-hover)";
              e.currentTarget.style.borderColor = "var(--color-border-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-bg-surface)";
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
          >
            Cancel
          </button>
          <button onClick={onConfirm} style={deleteButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "var(--shadow-lg), 0 0 30px rgba(239, 68, 68, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

/* styles */
const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "var(--color-bg-surface)",
  padding: "32px",
  borderRadius: "20px",
  width: "380px",
  boxShadow: "var(--shadow-xl)",
  border: "1px solid var(--color-border)",
  position: "relative",
};

const closeButtonStyle = {
  position: "absolute",
  top: "16px",
  right: "16px",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid var(--color-border)",
  borderRadius: "8px",
  cursor: "pointer",
  color: "var(--color-text-muted)",
  lineHeight: 1,
  padding: "4px",
  width: "32px",
  height: "32px",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const buttonRowStyle = {
  display: "flex",
  gap: "12px",
  marginTop: "24px",
  justifyContent: "center",
};

const cancelButton = {
  flex: 1,
  padding: "12px 20px",
  borderRadius: "10px",
  border: "1px solid var(--color-border)",
  background: "var(--color-bg-surface)",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  color: "var(--color-text-secondary)",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
};

const deleteButton = {
  flex: 1,
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  boxShadow: "var(--shadow-md)",
  transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
};

export default DeleteProjectModal;