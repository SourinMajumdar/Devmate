import { Trash2, Pencil, FolderOpen, ArrowRight, Plus, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";
import TechBadge from "../components/TechBadge";
import { timeAgo } from "../utils/github";

/* Border colors cycling per project index */
const CARD_BORDER_COLORS = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0891b2"];

const ProjectsSection = ({
  projects,
  onAddProject,
  onEditProject,
  onDeleteProject,
  onSeeAll,
  isAllProjectsView = false,
}) => {
  const displayProjects = isAllProjectsView ? projects : projects.slice(0, 4);
  const hasMoreProjects = !isAllProjectsView && projects.length > 4;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FolderOpen style={{ width: "18px", height: "18px", color: "var(--color-accent)" }} />
          <h2
            style={{
              fontSize: "var(--font-size-sm)",
              fontWeight: "var(--font-weight-semibold)",
              margin: 0,
              color: "var(--color-text-primary)",
            }}
          >
            Projects
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
          <button
            onClick={onAddProject}
            className="btn-secondary"
            style={{ padding: "6px 10px", fontSize: "var(--font-size-meta)" }}
            title="Add project"
          >
            <Plus style={{ width: "13px", height: "13px" }} />
            Add
          </button>
          {!isAllProjectsView && (
            <button
              onClick={onSeeAll}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-accent)",
                fontSize: "var(--font-size-sm)",
                fontWeight: "var(--font-weight-medium)",
                cursor: "pointer",
                fontFamily: "inherit",
                padding: "4px 0",
                transition: "color var(--transition)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            >
              View All
            </button>
          )}
        </div>
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
            <FolderOpen style={{ width: "20px", height: "20px", color: "var(--color-accent)" }} />
          </div>
          <p style={{ fontSize: "var(--font-size-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", marginBottom: "var(--space-xs)" }}>
            No projects yet
          </p>
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", margin: 0 }}>
            Add your first project to get started
          </p>
        </div>
      )}

      {/* Project grid */}
      {projects.length > 0 && (
        <div
          className={isAllProjectsView ? "all-projects-grid" : "projects-grid"}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-sm)",
          }}
        >
          {displayProjects.map((project, displayIndex) => {
            const actualIndex = isAllProjectsView
              ? projects.findIndex((p) => p.id === project.id)
              : displayIndex;

            const borderColor = CARD_BORDER_COLORS[displayIndex % CARD_BORDER_COLORS.length];
            const updatedTime = project.updatedAt || project.createdAt;

            return (
              <div
                key={project.id}
                className="card"
                style={{
                  padding: "var(--space-md)",
                  position: "relative",
                  borderLeft: `3px solid ${borderColor}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-xs)",
                }}
              >
                {/* Action buttons */}
                <div
                  style={{
                    position: "absolute",
                    top: "var(--space-sm)",
                    right: "var(--space-sm)",
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <button
                    onClick={() => onEditProject(actualIndex)}
                    className="btn-secondary"
                    style={{ padding: "4px", width: "26px", height: "26px" }}
                    title="Edit project"
                  >
                    <Pencil style={{ width: "11px", height: "11px" }} />
                  </button>
                  <button
                    onClick={() => onDeleteProject(actualIndex)}
                    className="btn-secondary"
                    style={{ padding: "4px", width: "26px", height: "26px", color: "var(--color-danger)" }}
                    title="Delete project"
                  >
                    <Trash2 style={{ width: "11px", height: "11px" }} />
                  </button>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "var(--font-size-sm)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: "var(--color-text-primary)",
                    margin: "0 0 var(--space-xs) 0",
                    paddingRight: "60px",
                    lineHeight: "var(--line-height-snug)",
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-base)",
                    margin: "0 0 var(--space-sm) 0",
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
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
                      gap: "4px",
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {project.tech.slice(0, 3).map((tech) => (
                      <TechBadge key={tech} tech={tech} size="sm" />
                    ))}
                    {project.tech.length > 3 && (
                      <span style={{ fontSize: "11px", color: "var(--color-text-muted)", alignSelf: "center" }}>
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Footer: timestamp + stars */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto",
                    paddingTop: "var(--space-xs)",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock
                      style={{ width: "11px", height: "11px", color: "var(--color-text-muted)" }}
                    />
                    <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                      {updatedTime ? `Updated ${timeAgo(updatedTime)}` : "No date"}
                    </span>
                  </div>

                  {project.stars != null && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star
                        style={{ width: "11px", height: "11px", color: "var(--color-text-muted)" }}
                      />
                      <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                        {project.stars}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* See all */}
      {hasMoreProjects && (
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
