import { useState, useEffect } from "react";
import { X } from "lucide-react";

const EditModal = ({ profile, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
    bio: "",
    tech: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  useEffect(() => {
    if (!profile) return;

    setFormData({
      name: profile.name || "",
      username: profile.username || "",
      role: profile.role || "",
      bio: profile.bio || "",
      tech: profile.tech?.join(", ") || "",
      github: profile.links?.github || "",
      linkedin: profile.links?.linkedin || "",
      portfolio: profile.links?.portfolio || "",
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...profile,
      name: formData.name,
      username: formData.username,
      role: formData.role,
      bio: formData.bio,
      tech: formData.tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      links: {
        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
      },
    });
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0 }}>
            Edit Profile
          </h2>
          <button onClick={onClose} style={closeButtonStyle}
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
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={formStyle}>
          <h3 style={sectionTitleStyle}>Profile</h3>

          <label style={labelStyle}>
            Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </label>

          <label style={labelStyle}>
            Username
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </label>

          <label style={labelStyle}>
            Role
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </label>

          <label style={labelStyle}>
            Bio
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: "80px" }}
              required
            />
          </label>

          <label style={labelStyle}>
            Tech Stack (comma-separated)
            <input
              name="tech"
              value={formData.tech}
              onChange={handleChange}
              placeholder="React, Vite, Tailwind"
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            GitHub Link
            <input
              name="github"
              value={formData.github}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            LinkedIn Link
            <input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Portfolio Link
            <input
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>

          <div style={buttonContainerStyle}>
            <button type="button" onClick={onClose} style={cancelButtonStyle}
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
            <button type="submit" style={saveButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "var(--shadow-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "20px",
};

const modalStyle = {
  background: "var(--color-bg-surface)",
  borderRadius: "20px",
  maxWidth: "600px",
  width: "100%",
  maxHeight: "90vh",
  overflow: "auto",
  boxShadow: "var(--shadow-xl)",
  border: "1px solid var(--color-border)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "24px",
  borderBottom: "1px solid var(--color-border)",
  position: "sticky",
  top: 0,
  background: "var(--color-bg-surface)",
  zIndex: 1,
  borderRadius: "20px 20px 0 0",
};

const closeButtonStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid var(--color-border)",
  borderRadius: "8px",
  fontSize: "24px",
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

const formStyle = { padding: "24px" };

const sectionTitleStyle = {
  fontSize: "16px",
  fontWeight: "700",
  marginBottom: "16px",
  color: "var(--color-text-primary)",
  letterSpacing: "-0.01em",
};

const labelStyle = {
  display: "block",
  marginBottom: "16px",
  fontSize: "14px",
  fontWeight: "600",
  color: "var(--color-text-secondary)",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px 14px",
  marginTop: "8px",
  border: "1px solid var(--color-border)",
  borderRadius: "10px",
  fontSize: "14px",
  fontFamily: "inherit",
  boxSizing: "border-box",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  background: "var(--color-bg-elevated)",
  color: "var(--color-text-primary)",
};

const buttonContainerStyle = {
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  marginTop: "24px",
  paddingTop: "24px",
  borderTop: "1px solid var(--color-border)",
};

const cancelButtonStyle = {
  padding: "12px 24px",
  border: "1px solid var(--color-border)",
  borderRadius: "10px",
  background: "var(--color-bg-surface)",
  color: "var(--color-text-secondary)",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
};

const saveButtonStyle = {
  padding: "12px 24px",
  border: "none",
  borderRadius: "10px",
  background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "var(--shadow-md)",
  transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
};

export default EditModal;