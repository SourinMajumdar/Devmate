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
  }, [project, onClose]);

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
          <button onClick={onClose} className="btn-secondary" style={closeButtonStyle}>
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
          <button onClick={handleSave} className="btn-primary" style={primaryButton}>
            Save
          </button>
          <button onClick={onClose} className="btn-secondary" style={secondaryButton}>
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
  background: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
};

const modalStyle = {
  background: "var(--color-bg-surface)",
  padding: "28px",
  borderRadius: "var(--radius-lg)",
  width: "420px",
  boxShadow: "var(--shadow-lg)",
  border: "1px solid var(--color-border)",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "600",
  margin: 0,
  letterSpacing: "-0.01em",
  color: "var(--color-text-primary)",
};

const closeButtonStyle = {
  padding: "4px",
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const inputStyle = {
  width: "100%",
  marginTop: "12px",
  padding: "10px 12px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border)",
  fontSize: "14px",
  transition: "all var(--transition)",
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
  padding: "10px",
};

const secondaryButton = {
  flex: 1,
  padding: "10px",
};

export default ProjectModal;
