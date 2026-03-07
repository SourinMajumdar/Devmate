import { useEffect, useState } from "react";
import { X, Github, Globe } from "lucide-react";

const ProjectModal = ({ project, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setTech(project.tech?.join(", ") || "");
      setGithubLink(project.githubLink || "");
      // backward-compat: old `link` field treated as liveLink
      setLiveLink(project.liveLink || project.link || "");
    } else {
      setTitle("");
      setDescription("");
      setTech("");
      setGithubLink("");
      setLiveLink("");
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  const handleSave = () => {
    onSave({
      id: project?.id ?? Date.now(),
      title,
      description,
      tech: tech.split(",").map((t) => t.trim()).filter(Boolean),
      githubLink,
      liveLink,
    });
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={titleStyle}>{project ? "Edit Project" : "Add Project"}</h3>
          <button onClick={onClose} className="btn-secondary" style={closeButtonStyle}>
            <X style={{ width: "18px", height: "18px" }} />
          </button>
        </div>

        {/* Title */}
        <input
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        {/* Description */}
        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: "80px", resize: "vertical" }}
        />

        {/* Tech stack */}
        <input
          placeholder="Tech stack (comma separated)"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          style={inputStyle}
        />

        {/* Links row label */}
        <div style={{ marginTop: "16px", marginBottom: "6px" }}>
          <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Links
          </span>
        </div>

        {/* GitHub link */}
        <div style={linkRowStyle}>
          <div style={linkIconWrap}>
            <Github style={{ width: "14px", height: "14px", color: "var(--color-text-secondary)" }} />
          </div>
          <input
            placeholder="GitHub repository URL"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            style={{ ...inputStyle, marginTop: 0, flex: 1 }}
          />
        </div>

        {/* Live link */}
        <div style={{ ...linkRowStyle, marginTop: "8px" }}>
          <div style={linkIconWrap}>
            <Globe style={{ width: "14px", height: "14px", color: "var(--color-text-secondary)" }} />
          </div>
          <input
            placeholder="Live demo URL"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
            style={{ ...inputStyle, marginTop: 0, flex: 1 }}
          />
        </div>

        {/* Actions */}
        <div style={buttonRowStyle}>
          <button onClick={handleSave} className="btn-primary" style={{ flex: 1, padding: "10px" }}>
            Save
          </button>
          <button onClick={onClose} className="btn-secondary" style={{ flex: 1, padding: "10px" }}>
            Cancel
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
};

const modalStyle = {
  background: "var(--color-bg-surface)",
  padding: "28px",
  borderRadius: "var(--radius-lg)",
  width: "440px",
  maxWidth: "calc(100vw - 32px)",
  boxShadow: "var(--shadow-lg)",
  border: "1px solid var(--color-border)",
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: "700",
  margin: 0,
  letterSpacing: "-0.02em",
  color: "var(--color-text-primary)",
  fontFamily: "var(--font-heading)",
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
  padding: "9px 12px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border)",
  fontSize: "var(--font-size-sm)",
  background: "var(--color-bg-elevated)",
  boxSizing: "border-box",
  color: "var(--color-text-primary)",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color var(--transition)",
};

const linkRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const linkIconWrap = {
  width: "34px",
  height: "34px",
  borderRadius: "var(--radius-sm)",
  background: "var(--color-bg-elevated)",
  border: "1px solid var(--color-border)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const buttonRowStyle = {
  display: "flex",
  gap: "12px",
  marginTop: "24px",
};

export default ProjectModal;
