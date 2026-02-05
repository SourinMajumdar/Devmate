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
          <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0, color: "var(--color-text-primary)" }}>
            Edit Profile
          </h2>
          <button onClick={onClose} className="btn-secondary" style={closeButtonStyle}>
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
            <button type="button" onClick={onClose} className="btn-secondary" style={cancelButtonStyle}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={saveButtonStyle}>
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
  background: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "20px",
};

const modalStyle = {
  background: "var(--color-bg-surface)",
  borderRadius: "var(--radius-lg)",
  maxWidth: "600px",
  width: "100%",
  maxHeight: "90vh",
  overflow: "auto",
  boxShadow: "var(--shadow-lg)",
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
  borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
};

const closeButtonStyle = {
  padding: "4px",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const formStyle = { padding: "24px" };

const sectionTitleStyle = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "16px",
  color: "var(--color-text-primary)",
  letterSpacing: "-0.01em",
};

const labelStyle = {
  display: "block",
  marginBottom: "16px",
  fontSize: "14px",
  fontWeight: "500",
  color: "var(--color-text-secondary)",
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px 12px",
  marginTop: "6px",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  fontSize: "14px",
  fontFamily: "inherit",
  boxSizing: "border-box",
  transition: "all var(--transition)",
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
  padding: "10px 20px",
};

const saveButtonStyle = {
  padding: "10px 20px",
};

export default EditModal;
