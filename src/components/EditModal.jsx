import { useState, useEffect, useRef } from "react";
import { X, Camera, Trash2 } from "lucide-react";

const MAX_SIZE_MB = 2;

const EditModal = ({ profile, onClose, onSave, isSetup = false }) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    role: "",
    location: "",
    bio: "",
    tech: "",
    github: "",
    linkedin: "",
    medium: "",
    portfolio: "",
    avatar: "",
  });

  const [avatarError, setAvatarError] = useState("");
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setFormData({
      name: profile.name || "",
      username: profile.username || "",
      role: profile.role || "",
      location: profile.location || "",
      bio: profile.bio || "",
      tech: profile.tech?.join(", ") || "",
      github: profile.links?.github || "",
      linkedin: profile.links?.linkedin || "",
      medium: profile.links?.medium || "",
      portfolio: profile.links?.portfolio || "",
      avatar: profile.avatar || "",
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarError("");

    if (!file.type.startsWith("image/")) {
      setAvatarError("Please select an image file (JPG, PNG, GIF, WebP).");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setAvatarError(`Image must be under ${MAX_SIZE_MB}MB.`);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData((prev) => ({ ...prev, avatar: ev.target.result }));
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleRemoveAvatar = (e) => {
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, avatar: "" }));
    setAvatarError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await onSave({
        ...profile,
        name: formData.name,
        username: formData.username,
        role: formData.role,
        location: formData.location,
        bio: formData.bio,
        avatar: formData.avatar,
        tech: formData.tech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        links: {
          github: formData.github,
          linkedin: formData.linkedin,
          medium: formData.medium,
          portfolio: formData.portfolio,
        },
      });
    } catch (err) {
      console.error("[Devmate] EditModal save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const initials = formData.name ? formData.name[0].toUpperCase() : "?";

  return (
    <div style={overlayStyle} onClick={isSetup ? undefined : onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={headerStyle}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "600", margin: 0, color: "var(--color-text-primary)" }}>
              {isSetup ? "Welcome to DevMate 👋" : "Edit Profile"}
            </h2>
            {isSetup && (
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", margin: "4px 0 0 0" }}>
                Let's set up your profile to get started
              </p>
            )}
          </div>
          {!isSetup && (
            <button onClick={onClose} className="btn-secondary" style={closeButtonStyle}>
              <X style={{ width: "20px", height: "20px" }} />
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={formStyle}>

          {/* â”€â”€ Avatar upload â”€â”€ */}
          <div style={avatarSectionStyle}>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              aria-label="Upload profile photo"
            />

            {/* Clickable avatar */}
            <div
              onClick={handleAvatarClick}
              onMouseEnter={() => setIsAvatarHovered(true)}
              onMouseLeave={() => setIsAvatarHovered(false)}
              style={avatarWrapStyle}
              title="Click to upload photo"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleAvatarClick()}
              aria-label="Upload profile photo"
            >
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Avatar preview"
                  style={avatarImgStyle}
                />
              ) : (
                <span style={avatarInitialStyle}>{initials}</span>
              )}

              {/* Hover overlay */}
              <div style={{
                ...avatarOverlayStyle,
                opacity: isAvatarHovered ? 1 : 0,
              }}>
                <Camera style={{ width: "18px", height: "18px", color: "#fff" }} />
                <span style={{ fontSize: "11px", color: "#fff", fontWeight: "500", marginTop: "2px" }}>
                  {formData.avatar ? "Change" : "Upload"}
                </span>
              </div>
            </div>

            {/* Label + remove */}
            <div style={avatarMetaStyle}>
              <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)" }}>
                Profile Photo
              </span>
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                JPG, PNG, GIF or WebP Â· max {MAX_SIZE_MB}MB
              </span>
              {formData.avatar && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  style={removeAvatarBtnStyle}
                >
                  <Trash2 style={{ width: "12px", height: "12px" }} />
                  Remove photo
                </button>
              )}
            </div>
          </div>

          {/* Error */}
          {avatarError && (
            <p style={errorStyle} role="alert">{avatarError}</p>
          )}

          <div style={dividerStyle} />

          <h3 style={sectionTitleStyle}>Profile</h3>

          <label style={labelStyle}>
            Name
            <input name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />
          </label>

          <label style={labelStyle}>
            Username
            <input name="username" value={formData.username} onChange={handleChange} style={inputStyle} required />
          </label>

          <label style={labelStyle}>
            Role
            <input name="role" value={formData.role} onChange={handleChange} style={inputStyle} required />
          </label>

          <label style={labelStyle}>
            Location
            <input name="location" value={formData.location} onChange={handleChange} placeholder="San Francisco, CA" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Bio
            <textarea name="bio" value={formData.bio} onChange={handleChange} style={{ ...inputStyle, minHeight: "80px" }} required />
          </label>

          <label style={labelStyle}>
            Tech Stack (comma-separated)
            <input name="tech" value={formData.tech} onChange={handleChange} placeholder="React, Vite, Tailwind" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            GitHub Link
            <input name="github" value={formData.github} onChange={handleChange} style={inputStyle} />
          </label>

          <label style={labelStyle}>
            LinkedIn Link
            <input name="linkedin" value={formData.linkedin} onChange={handleChange} style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Medium Link
            <input name="medium" value={formData.medium} onChange={handleChange} placeholder="https://medium.com/@username" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Portfolio Link
            <input name="portfolio" value={formData.portfolio} onChange={handleChange} style={inputStyle} />
          </label>

          <div style={buttonContainerStyle}>
            {!isSetup && (
              <button type="button" onClick={onClose} className="btn-secondary" style={{ padding: "10px 20px" }}>
                Cancel
              </button>
            )}
          <button type="submit" disabled={saving} className="btn-primary" style={{ padding: "10px 20px", gap: "8px", opacity: saving ? 0.75 : 1 }}>
              {saving && <span style={spinnerStyle} />}
              {isSetup ? "Get Started" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const spinnerStyle = {
  display: "inline-block",
  width: "14px",
  height: "14px",
  border: "2px solid rgba(255,255,255,0.35)",
  borderTopColor: "#fff",
  borderRadius: "50%",
  animation: "spin 0.6s linear infinite",
  flexShrink: 0,
};

/* â"€â"€ Styles â"€â"€ */

const overlayStyle = {
  position: "fixed",
  inset: 0,
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

const avatarSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "4px",
};

const avatarWrapStyle = {
  position: "relative",
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  background: "var(--color-accent)",
  flexShrink: 0,
  cursor: "pointer",
  overflow: "hidden",
  outline: "none",
  border: "2px solid var(--color-border)",
  transition: "border-color var(--transition)",
};

const avatarImgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const avatarInitialStyle = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "26px",
  fontWeight: "600",
  color: "#ffffff",
  fontFamily: "var(--font-heading)",
};

const avatarOverlayStyle = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.15s ease",
  borderRadius: "50%",
};

const avatarMetaStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const removeAvatarBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  marginTop: "4px",
  background: "none",
  border: "none",
  color: "var(--color-danger)",
  fontSize: "12px",
  fontWeight: "500",
  cursor: "pointer",
  padding: "0",
  fontFamily: "inherit",
};

const errorStyle = {
  fontSize: "12px",
  color: "var(--color-danger)",
  background: "#fef2f2",
  border: "1px solid #fecaca",
  borderRadius: "var(--radius-sm)",
  padding: "8px 12px",
  marginTop: "8px",
  marginBottom: "0",
};

const dividerStyle = {
  height: "1px",
  background: "var(--color-border)",
  margin: "20px 0",
};

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

export default EditModal;

