import { Activity } from "lucide-react";
import { motion } from "framer-motion";

const ContentTimeline = ({ projects, profile }) => {
  const actionVerbs = ["Deployed", "Finished", "Launched", "Completed", "Built", "Released"];

  const validProjects = projects?.filter((p) => p.title && p.title.trim() !== "") || [];
  const profileExists = profile?.name && profile.name.trim() !== "";

  const timeline = validProjects.map((project, index) => ({
    id: project.id || index,
    text: `${actionVerbs[index % actionVerbs.length]} ${project.title}`,
    time:
      index === 0 ? "Today" :
      index === 1 ? "2 days ago" :
      index === 2 ? "1 week ago" :
      `${index} weeks ago`,
  }));

  if (profileExists) {
    timeline.push({
      id: "blog-post",
      text: "Published a blog post",
      time: validProjects.length > 0 ? `${validProjects.length + 1} weeks ago` : "2 weeks ago",
    });
  }

  const isEmpty = timeline.length === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="activity-section-mobile"
      style={{ width: "100%", background: "transparent", padding: 0 }}
    >
      <div className="section-header-row">
        <div className="section-pip" />
        <h2
          style={{
            fontSize: "var(--font-size-h2)",
            fontWeight: "var(--font-weight-semibold)",
            margin: 0,
            color: "var(--color-text-primary)",
          }}
        >
          Activity
        </h2>
      </div>

      <p
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-secondary)",
          margin: "0 0 var(--space-md) 0",
        }}
      >
        {isEmpty ? "Your activity timeline will appear here" : "Recent updates"}
      </p>

      {isEmpty ? (
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
            <Activity style={{ width: "20px", height: "20px", color: "var(--color-accent)" }} />
          </div>
          <p
            style={{
              fontSize: "var(--font-size-sm)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-xs)",
            }}
          >
            No activity yet
          </p>
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", margin: 0 }}>
            Your timeline will update automatically
          </p>
        </div>
      ) : (
        <div
          className="timeline-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-sm)",
          }}
        >
          {timeline.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                alignItems: "flex-start",
                padding: "var(--space-md)",
              }}
            >
              <div className="timeline-dot" />

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-text-primary)",
                    margin: 0,
                    fontWeight: "var(--font-weight-medium)",
                    marginBottom: "3px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.text}
                </p>
                <span
                  style={{
                    fontSize: "var(--font-size-meta)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default ContentTimeline;
