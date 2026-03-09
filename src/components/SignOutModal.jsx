import React from 'react';

const SignOutModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onCancel}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={titleStyle}>Sign Out</h2>
        <p style={messageStyle}>Are you sure you want to sign out?</p>
        
        <div style={buttonRowStyle}>
          <button
            onClick={onCancel}
            className="btn-secondary"
            style={cancelButtonStyle}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-primary"
            style={confirmButtonStyle}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Styles ── */
const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
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

const titleStyle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "var(--color-text-primary)",
  marginBottom: "8px",
  margin: "0 0 8px 0",
};

const messageStyle = {
  fontSize: "14px",
  color: "var(--color-text-secondary)",
  marginTop: "0",
  marginBottom: "24px",
  lineHeight: "1.6",
};

const buttonRowStyle = {
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  marginTop: "24px",
};

const cancelButtonStyle = {
  padding: "8px 16px",
};

const confirmButtonStyle = {
  padding: "8px 16px",
};

export default SignOutModal;
