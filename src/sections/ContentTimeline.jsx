import { Activity } from "lucide-react";
import { motion } from "framer-motion";

const ContentTimeline = ({ projects, profile }) => {
  const actionVerbs = ["Deployed", "Finished", "Launched", "Completed", "Built", "Released"];
  
  const validProjects = projects?.filter(p => p.title && p.title.trim() !== "") || [];
  const profileExists = profile?.name && profile.name.trim() !== "";
  
  const timeline = validProjects.map((project, index) => ({
    id: project.id || index,
    text: `${actionVerbs[index % actionVerbs.length]} ${project.title}`,
    time: index === 0 ? "Today" : 
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="activity-section-mobile"
      style={{ 
        width: "1274px",
        background: "transparent",
        padding: 0,
      }}
    >
      <h2 style={{ 
        fontSize: "18px", 
        fontWeight: "600", 
        marginBottom: "var(--spacing-2)", 
        color: "var(--color-text-primary)",
      }}>
        Activity
      </h2>

      <p style={{
        fontSize: "14px",
        color: "var(--color-text-secondary)",
        margin: 0,
        marginBottom: "var(--spacing-5)",
      }}>
        {isEmpty ? "Your activity timeline will appear here" : "Recent updates"}
      </p>

      {isEmpty ? (
        <div className="card" style={{
          padding: "var(--spacing-10) var(--spacing-8)",
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
            <Activity style={{ width: "24px", height: "24px", color: "var(--color-primary)" }} />
          </div>
          
          <p style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "var(--color-text-primary)",
            marginBottom: "var(--spacing-2)",
          }}>
            No activity yet
          </p>
          
          <p style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            margin: 0,
          }}>
            Your timeline will update automatically
          </p>
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--spacing-3)",
        }}
        className="timeline-grid"
        >
          {timeline.map((item, index) => {
            const bulletColors = [
              { bg: "#3b82f6", shadow: "rgba(59, 130, 246, 0.3)" }, // blue
              { bg: "#c026d3", shadow: "rgba(192, 38, 211, 0.3)" }, // pink
              { bg: "#16a34a", shadow: "rgba(22, 163, 74, 0.3)" }, // green
              { bg: "#f59e0b", shadow: "rgba(245, 158, 11, 0.3)" }, // amber
              { bg: "#9333ea", shadow: "rgba(147, 51, 234, 0.3)" }, // purple
            ];
            const bulletColor = bulletColors[index % bulletColors.length];
            
            return (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "var(--spacing-3)",
                alignItems: "flex-start",
                padding: "var(--spacing-4)",
                background: "var(--color-bg-surface)",
                border: "1.5px solid rgba(148, 168, 255, 0.55)",
                borderRadius: "var(--radius-md)",
                transition: "all 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = "1px solid var(--color-primary)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(102, 126, 234, 0.15)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1.5px solid rgba(148, 167, 255, 0.55)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: bulletColor.bg,
                marginTop: "6px",
                flexShrink: 0,
                boxShadow: `0 2px 4px ${bulletColor.shadow}`,
              }} />

              <div style={{ flex: 1 }}>
                <p style={{
                  fontSize: "14px",
                  color: "var(--color-text-primary)",
                  margin: 0,
                  fontWeight: "500",
                  marginBottom: "var(--spacing-1)",
                }}>
                  {item.text}
                </p>
                <span style={{
                  fontSize: "12px",
                  color: "var(--color-text-tertiary)",
                  fontWeight: "500",
                }}>
                  {item.time}
                </span>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
};

export default ContentTimeline;
