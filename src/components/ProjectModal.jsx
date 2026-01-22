import { useEffect, useState } from "react";
import { X } from "lucide-react";

const ProjectModal = ({ project, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [link, setLink] = useState("");

  // Prefill form when editing, reset when adding
  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setTech(project.tech?.join(", ") || "");
      setLink(project.link || "");
    } else {
      setTitle("");
      setDescription("");
      setTech("");
      setLink("");
    }

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
        onClose();
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project], [onClose]);

  const handleSave = () => {
    onSave({
      id: project?.id ?? Date.now(),
      title,
      description,
      tech: tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      link,
    });
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={titleStyle}>
            {project ? "Edit Project" : "Add Project"}
          </h3>
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

        <input
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: "80px" }}
        />

        <input
          placeholder="Tech stack (comma separated)"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Project link (GitHub / live demo)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={inputStyle}
        />

        <div style={buttonRowStyle}>
          <button onClick={handleSave} style={primaryButton}
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
          <button onClick={onClose} style={secondaryButton}
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
        </div>
      </div>
    </div>
  );
};

/* ---------- Styles ---------- */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.7)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
};

const modalStyle = {
  background: "var(--color-bg-surface)",
  padding: "28px",
  borderRadius: "20px",
  width: "420px",
  boxShadow: "var(--shadow-xl)",
  border: "1px solid var(--color-border)",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "700",
  margin: 0,
  letterSpacing: "-0.01em",
  color: "var(--color-text-primary)",
};

const closeButtonStyle = {
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

const inputStyle = {
  width: "100%",
  marginTop: "12px",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid var(--color-border)",
  fontSize: "14px",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  background: "var(--color-bg-elevated)",
  boxSizing: "border-box",
  color: "var(--color-text-primary)",
};

const buttonRowStyle = {
  display: "flex",
  gap: "12px",
  marginTop: "24px",
};

const primaryButton = {
  flex: 1,
  background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  padding: "12px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "var(--shadow-md)",
  transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
};

const secondaryButton = {
  flex: 1,
  background: "var(--color-bg-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "10px",
  padding: "12px",
  fontSize: "14px",
  fontWeight: "600",
  color: "var(--color-text-secondary)",
  cursor: "pointer",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
};

export default ProjectModal;