import { X, AlertTriangle } from "lucide-react";

const DeleteProjectModal = ({ onConfirm, onCancel }) => {
  return (
    <div style={overlayStyle} onClick={onCancel}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onCancel} className="btn-secondary" style={closeButtonStyle}>
          <X style={{ width: "20px", height: "20px" }} />
        </button>
        
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "rgba(220, 38, 38, 0.1)",
          border: "1px solid rgba(220, 38, 38, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <AlertTriangle style={{ width: "28px", height: "28px", color: "var(--color-danger)" }} />
        </div>
        
        <h3 style={{ 
          fontSize: "20px", 
          fontWeight: "600", 
          textAlign: "center", 
          letterSpacing: "-0.01em", 
          color: "var(--color-text-primary)",
          marginBottom: "8px",
        }}>
          Delete project?
        </h3>

        <p style={{ 
          fontSize: "14px", 
          color: "var(--color-text-secondary)", 
          marginTop: "0", 
          textAlign: "center", 
          lineHeight: "1.6",
        }}>
          This action cannot be undone. Your project will be permanently removed.
        </p>

        <div style={buttonRowStyle}>
          <button onClick={onCancel} className="btn-secondary" style={cancelButton}>
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger" style={deleteButton}>
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
  background: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "var(--color-bg-surface)",
  padding: "32px",
  borderRadius: "var(--radius-lg)",
  width: "380px",
  boxShadow: "var(--shadow-lg)",
  border: "1px solid var(--color-border)",
  position: "relative",
};

const closeButtonStyle = {
  position: "absolute",
  top: "16px",
  right: "16px",
  padding: "4px",
  width: "32px",
  height: "32px",
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
  padding: "10px 20px",
};

const deleteButton = {
  flex: 1,
  padding: "10px 20px",
};

export default DeleteProjectModal;
