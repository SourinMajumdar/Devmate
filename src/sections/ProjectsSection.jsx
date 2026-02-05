import { Trash2, Pencil, FolderPlus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ProjectsSection = ({ projects, onAddProject, onEditProject, onDeleteProject, onSeeAll, isAllProjectsView = false }) => {
  const displayProjects = isAllProjectsView ? projects : projects.slice(0, 3);
  const hasMoreProjects = projects.length > 3;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isAllProjectsView ? 0 : 0.3 }}
      className="projects-section-mobile"
      style={{
        background: "transparent",
        padding: 0,
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "var(--spacing-5)",
      }}>
        <h2 style={{ 
          fontSize: "18px", 
          fontWeight: "600", 
          margin: 0, 
          color: "var(--color-text-primary)",
        }}>
          Projects {!isAllProjectsView && projects.length > 0 && `(${projects.length})`}
        </h2>

        <button 
          onClick={onAddProject} 
          className="btn-primary"
          style={{
            fontSize: "13px",
            padding: "7px 14px",
          }}
        >
          + Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <div className="card" style={{
          padding: "var(--spacing-8) var(--spacing-6)",
          textAlign: "center",
          border: "1px dashed var(--color-border)",
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "var(--color-primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto var(--spacing-4)",
          }}>
            <FolderPlus style={{ width: "24px", height: "24px", color: "var(--color-primary)" }} />
          </div>

          <p style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "var(--color-text-primary)",
            marginBottom: "var(--spacing-2)",
          }}>
            No projects yet
          </p>

          <p style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            margin: 0,
          }}>
            Add your first project to get started
          </p>
        </div>
      )}

      {projects.length > 0 && (
        <div 
          className={isAllProjectsView ? "all-projects-grid" : ""}
          style={{ 
            display: isAllProjectsView ? "grid" : "flex",
            gridTemplateColumns: isAllProjectsView ? "1fr 1fr" : undefined,
            flexDirection: isAllProjectsView ? undefined : "column",
            gap: "var(--spacing-3)",
          }}
        >
          {displayProjects.map((project, displayIndex) => {
            const actualIndex = isAllProjectsView 
              ? projects.findIndex(p => p.id === project.id)
              : displayIndex;
            
            return (
              <div
                key={project.id}
                className="card"
                style={{
                  padding: "var(--spacing-5)",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => onDeleteProject(actualIndex)}
                  className="btn-secondary"
                  style={{
                    position: "absolute",
                    top: "var(--spacing-4)",
                    right: "calc(var(--spacing-4) + 44px)",
                    padding: "var(--spacing-2)",
                    color: "var(--color-danger)",
                    zIndex: 10,
                  }}
                >
                  <Trash2 style={{ width: "14px", height: "14px" }} />
                </button>

                <button
                  onClick={() => onEditProject(actualIndex)}
                  className="btn-secondary"
                  style={{
                    position: "absolute",
                    top: "var(--spacing-4)",
                    right: "var(--spacing-4)",
                    padding: "var(--spacing-2)",
                    zIndex: 10,
                  }}
                >
                  <Pencil style={{ width: "14px", height: "14px" }} />
                </button>

              <h3 style={{ 
                marginTop: "0", 
                fontSize: "16px", 
                fontWeight: "600", 
                color: "var(--color-text-primary)",
                marginBottom: "var(--spacing-2)",
              }}>
                {project.title}
              </h3>

              <p style={{
                color: "var(--color-text-secondary)",
                fontSize: "14px",
                lineHeight: "1.6",
                marginBottom: "var(--spacing-4)",
              }}>
                {project.description}
              </p>

              {/* Tech stack */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--spacing-2)",
                marginBottom: "var(--spacing-4)",
              }}>
              {project.tech.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      background: "#eff6ff",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "12px",
                      color: "#3b82f6",
                      fontWeight: "500",
                      border: "1px solid #dbeafe",
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
                    fontSize: "14px",
                    color: "var(--color-primary)",
                    fontWeight: "500",
                  }}
                >
                  View Project →
                </a>
              ) : (
                <span style={{
                  fontSize: "14px",
                  color: "var(--color-text-tertiary)",
                  fontWeight: "500",
                }}>
                  No link provided
                </span>
              )}
              </div>
            );
          })}
          
          {!isAllProjectsView && hasMoreProjects && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--spacing-3)" }}>
              <button
                onClick={onSeeAll}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--spacing-2)",
                  padding: "var(--spacing-2) var(--spacing-4)",
                  background: "var(--color-bg-surface)",
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontWeight: "500",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all var(--transition)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-primary)";
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                  e.currentTarget.style.background = "var(--color-primary-light)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.background = "var(--color-bg-surface)";
                }}
              >
                <span>See all {projects.length} projects</span>
                <ArrowRight style={{ width: "14px", height: "14px" }} />
              </button>
            </div>
          )}
        </div>
      )}
    </motion.section>
  );
};

export default ProjectsSection;
