import { Trash2, Pencil, FolderPlus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ProjectsSection = ({
  projects,
  onAddProject,
  onEditProject,
  onDeleteProject,
  onSeeAll,
  isAllProjectsView = false,
}) => {
  const displayProjects = isAllProjectsView ? projects : projects.slice(0, 3);
  const hasMoreProjects = projects.length > 3;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: isAllProjectsView ? 0 : 0.2 }}
      className="projects-section-mobile"
      style={{ background: "transparent", padding: 0 }}
    >
      {/* Section header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-md)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-h2)",
            fontWeight: "var(--font-weight-semibold)",
            margin: 0,
            color: "var(--color-text-primary)",
          }}
        >
          Projects{" "}
          {!isAllProjectsView && projects.length > 0 && (
            <span
              style={{
                fontSize: "var(--font-size-sm)",
                color: "var(--color-text-muted)",
                fontWeight: "var(--font-weight-normal)",
              }}
            >
              ({projects.length})
            </span>
          )}
        </h2>

        <button
          onClick={onAddProject}
          className="btn-primary"
          style={{ padding: "7px 14px", fontSize: "var(--font-size-meta)" }}
        >
          + Add Project
        </button>
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div
          className="card"
          style={{
            padding: "var(--space-xl) var(--space-lg)",
            textAlign: "center",
            border: "1px dashed var(--color-border)",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "var(--color-accent-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto var(--space-md)",
            }}
          >
            <FolderPlus style={{ width: "20px", height: "20px", color: "var(--color-accent)" }} />
          </div>
          <p
            style={{
              fontSize: "var(--font-size-sm)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-xs)",
            }}
          >
            No projects yet
          </p>
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", margin: 0 }}>
            Add your first project to get started
          </p>
        </div>
      )}

      {/* Project list */}
      {projects.length > 0 && (
        <div
          className={isAllProjectsView ? "all-projects-grid" : ""}
          style={{
            display: isAllProjectsView ? "grid" : "flex",
            gridTemplateColumns: isAllProjectsView ? "1fr 1fr" : undefined,
            flexDirection: isAllProjectsView ? undefined : "column",
            gap: "var(--space-sm)",
          }}
        >
          {displayProjects.map((project, displayIndex) => {
            const actualIndex = isAllProjectsView
              ? projects.findIndex((p) => p.id === project.id)
              : displayIndex;

            return (
              <div
                key={project.id}
                className="card"
                style={{ padding: "var(--space-md)", position: "relative" }}
              >
                {/* Action buttons */}
                <div
                  style={{
                    position: "absolute",
                    top: "var(--space-md)",
                    right: "var(--space-md)",
                    display: "flex",
                    gap: "var(--space-xs)",
                  }}
                >
                  <button
                    onClick={() => onDeleteProject(actualIndex)}
                    className="btn-secondary"
                    style={{
                      padding: "5px",
                      color: "var(--color-danger)",
                      width: "30px",
                      height: "30px",
                    }}
                    title="Delete project"
                  >
                    <Trash2 style={{ width: "13px", height: "13px" }} />
                  </button>

                  <button
                    onClick={() => onEditProject(actualIndex)}
                    className="btn-secondary"
                    style={{ padding: "5px", width: "30px", height: "30px" }}
                    title="Edit project"
                  >
                    <Pencil style={{ width: "13px", height: "13px" }} />
                  </button>
                </div>

                {/* Content */}
                <h3
                  style={{
                    fontSize: "var(--font-size-sm)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--color-text-primary)",
                    marginBottom: "var(--space-xs)",
                    paddingRight: "72px",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-base)",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                {project.tech?.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "var(--space-xs)",
                      marginBottom: "var(--space-md)",
                    }}
                  >
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          background: "var(--color-bg-elevated)",
                          padding: "3px 8px",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "var(--font-size-meta)",
                          color: "var(--color-text-secondary)",
                          fontWeight: "var(--font-weight-medium)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link */}
                {project.link && project.link !== "#" ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-accent)",
                      fontWeight: "var(--font-weight-medium)",
                    }}
                  >
                    View Project →
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    No link provided
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* See all */}
      {!isAllProjectsView && hasMoreProjects && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-md)" }}>
          <button onClick={onSeeAll} className="btn-secondary">
            <span>See all {projects.length} projects</span>
            <ArrowRight style={{ width: "14px", height: "14px" }} />
          </button>
        </div>
      )}
    </motion.section>
  );
};

export default ProjectsSection;
