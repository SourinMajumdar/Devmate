import { Trash2, Pencil } from "lucide-react";

const ProjectsSection = ({ projects, onAddProject, onEditProject, onDeleteProject }) => {
  const canAddMore = projects.length < 3;

  return (
    <section style={{ marginTop: "0" }}>
      

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
        >
        <h2 style={{ 
          fontSize: "26px", 
          fontWeight: "800", 
          margin: 0, 
          letterSpacing: "-0.03em", 
          background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))",
          position: "relative",
        }}>
          Projects
        </h2>

        {canAddMore && (
          <button onClick={onAddProject} style={addButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(59, 130, 246, 0.15)";
              e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
              e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.2)";
            }}
          >
            + Add Project
          </button>
        )}
      </div>
      {projects.length === 0 && (
        <div
          style={{
            background: "var(--color-bg-surface)",
            borderRadius: "20px",
            padding: "40px 32px",
            boxShadow: "var(--shadow-lg)",
            border: "2px dashed var(--color-border)",
            textAlign: "center",
            transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)";
            e.currentTarget.style.boxShadow = "var(--shadow-xl), var(--shadow-glow-subtle)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
          }}
        >
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "28px",
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
          }}>
            ✨
          </div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "var(--color-text-primary)",
              marginBottom: "8px",
              letterSpacing: "-0.01em",
            }}
          >
            No projects yet
          </p>

          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-muted)",
              margin: 0,
              lineHeight: "1.6",
            }}
          >
            Add your first project to showcase your incredible work
          </p>
        </div>
      )}

      {projects.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={{
                background: "var(--color-bg-surface)",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "var(--shadow-md)",
                border: "1px solid var(--color-border)",
                position: "relative",
                transition: "all 350ms cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
                e.currentTarget.style.boxShadow = "var(--shadow-xl), var(--shadow-glow)";
                e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              {/* Gradient overlay */}
              <div style={{
                position: "absolute",
                top: "-50%",
                right: "-30%",
                width: "100%",
                height: "150%",
                background: `radial-gradient(ellipse at center, ${
                  index % 3 === 0 ? "rgba(59, 130, 246, 0.08)" :
                  index % 3 === 1 ? "rgba(139, 92, 246, 0.08)" :
                  "rgba(16, 185, 129, 0.08)"
                } 0%, transparent 70%)`,
                pointerEvents: "none",
                zIndex: 0,
              }} />
              <button
                onClick={() => onDeleteProject(index)}
                title="Delete project"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "60px",
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  cursor: "pointer",
                  color: "#ef4444",
                  fontSize: "18px",
                  lineHeight: "1",
                  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                  e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.4)";
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(239, 68, 68, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Trash2 style={{ width: "16px", height: "16px" }} />
              </button>
              <button
                onClick={() => onEditProject(index)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  cursor: "pointer",
                  color: "var(--color-text-muted)",
                  fontSize: "16px",
                  lineHeight: "1",
                  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
                title="Edit project"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "var(--color-border-strong)";
                  e.currentTarget.style.color = "var(--color-primary-light)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-text-muted)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Pencil style={{ width: "16px", height: "16px" }} />
              </button>

              <h3 style={{ marginTop: "0", fontSize: "19px", fontWeight: "700", letterSpacing: "-0.015em", color: "var(--color-text-primary)", position: "relative", zIndex: 1 }}>
                {project.title}
              </h3>

              <p
                style={{
                  marginTop: "10px",
                  color: "var(--color-text-secondary)",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {project.description}
              </p>

              {/* Tech stack */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  position: "relative",
                  zIndex: 1,
                  marginTop: "16px",
                }}
              >
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={tech}
                    style={{
                      background: techIndex % 3 === 0 
                        ? "rgba(59, 130, 246, 0.1)" 
                        : techIndex % 3 === 1 
                        ? "rgba(139, 92, 246, 0.1)" 
                        : "rgba(16, 185, 129, 0.1)",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      color: techIndex % 3 === 0 
                        ? "var(--color-primary-light)" 
                        : techIndex % 3 === 1 
                        ? "#a78bfa" 
                        : "#10b981",
                      fontWeight: "500",
                      border: techIndex % 3 === 0 
                        ? "1px solid rgba(59, 130, 246, 0.2)" 
                        : techIndex % 3 === 1 
                        ? "1px solid rgba(139, 92, 246, 0.2)" 
                        : "1px solid rgba(16, 185, 129, 0.2)",
                      transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = techIndex % 3 === 0 
                        ? "rgba(59, 130, 246, 0.15)" 
                        : techIndex % 3 === 1 
                        ? "rgba(139, 92, 246, 0.15)" 
                        : "rgba(16, 185, 129, 0.15)";
                      e.currentTarget.style.borderColor = techIndex % 3 === 0 
                        ? "rgba(59, 130, 246, 0.4)" 
                        : techIndex % 3 === 1 
                        ? "rgba(139, 92, 246, 0.4)" 
                        : "rgba(16, 185, 129, 0.4)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = techIndex % 3 === 0 
                        ? "rgba(59, 130, 246, 0.1)" 
                        : techIndex % 3 === 1 
                        ? "rgba(139, 92, 246, 0.1)" 
                        : "rgba(16, 185, 129, 0.1)";
                      e.currentTarget.style.borderColor = techIndex % 3 === 0 
                        ? "rgba(59, 130, 246, 0.2)" 
                        : techIndex % 3 === 1 
                        ? "rgba(139, 92, 246, 0.2)" 
                        : "rgba(16, 185, 129, 0.2)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.link && project.link !== "#" ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "18px",
                    fontSize: "14px",
                    color: "var(--color-primary)",
                    fontWeight: "600",
                    textDecoration: "none",
                    transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-primary-light)";
                    e.currentTarget.style.transform = "translateX(2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-primary)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  View Project →
                </a>
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "18px",
                    fontSize: "14px",
                    color: "var(--color-text-muted)",
                    fontWeight: "500",
                  }}
                >
                  No link provided
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const addButtonStyle = {
  padding: "10px 18px",
  background: "rgba(59, 130, 246, 0.1)",
  color: "var(--color-primary-light)",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
};

export default ProjectsSection;
