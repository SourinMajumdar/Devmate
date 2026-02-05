import { Clock, Flame, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const AnalyticsSection = ({projects}) => {
  const validProjects = projects?.filter(p => p.title && p.title.trim() !== "") || [];
  const projectCount = validProjects.length;
  
  const isEmpty = projectCount === 0;

  // Mock latest activity data based on most recent project
  const latestActivity = validProjects.length > 0 ? {
    message: "Updated project dashboard",
    project: validProjects[0].title,
    time: "2 hours ago"
  } : null;

  // Mock streak data - calculate based on project count for consistency
  const currentStreak = projectCount > 0 ? Math.min(12 + projectCount * 2, 45) : 0;
  const longestStreak = currentStreak > 0 ? Math.max(currentStreak, 28) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="analytics-section-mobile"
      style={{
        background: "transparent",
        padding: 0,
      }}
    >
      <h2 style={{ 
        fontSize: "18px", 
        fontWeight: "500", 
        margin: 0,
        marginBottom: "var(--spacing-5)",
        color: "var(--color-text-primary)",
      }}>
        Overview
      </h2>

      {/* 2x2 Grid */}
      <div className="analytics-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto",
        gap: "var(--spacing-3)",
      }}>
        {/* Top-left: Projects (compact) */}
        <div style={{
          padding: "var(--spacing-4)",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid #a3b6ff",
          transition: "all var(--transition)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(99, 101, 241, 0.24)";
          e.currentTarget.style.border = "1.5px solid #1b296293";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(99, 101, 241, 0)";
          e.currentTarget.style.border = "1.5px solid #a3b6ff";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        >
          <p style={{
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            margin: 0,
            textTransform: "uppercase",
            fontWeight: "500",
            letterSpacing: "0.05em",
            marginBottom: "var(--spacing-2)",
          }}>
            Projects
          </p>
          <h3 style={{
            fontSize: "32px",
            fontWeight: "600",
            margin: 0,
            color:"#565656",
          }}>
            {projectCount}
          </h3>
        </div>

        {/* Top-right: Latest Activity (compact) */}
        <div style={{
          padding: "var(--spacing-4)",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid #a3b6ff",
          transition: "all var(--transition)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(99, 101, 241, 0.24)";
          e.currentTarget.style.border = "1.5px solid #1b296293";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(245, 159, 11, 0)";
          e.currentTarget.style.border = "1.5px solid #a3b6ff";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        >
          <p style={{
            fontSize: "11px",
            color: "var(--color-text-tertiary)",
            margin: 0,
            textTransform: "uppercase",
            fontWeight: "500",
            letterSpacing: "0.05em",
            marginBottom: "var(--spacing-2)",
          }}>
            Latest Activity
          </p>
          {latestActivity ? (
            <div>
              <p style={{
                fontSize: "13px",
                color: "var(--color-text-primary)",
                margin: 0,
                fontWeight: "500",
                marginBottom: "var(--spacing-1)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {latestActivity.message}
              </p>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-2)",
                marginTop: "var(--spacing-1)",
              }}>
                <Clock style={{ width: "12px", height: "12px", color: "var(--color-text-tertiary)" }} />
                <p style={{
                  fontSize: "12px",
                  color: "var(--color-text-tertiary)",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {latestActivity.project}
                </p>
              </div>
              <p style={{
                fontSize: "11px",
                color: "var(--color-text-tertiary)",
                margin: 0,
                marginTop: "var(--spacing-1)",
              }}>
                {latestActivity.time}
              </p>
            </div>
          ) : (
            <p style={{
              fontSize: "13px",
              color: "var(--color-text-tertiary)",
              margin: 0,
              fontStyle: "italic",
            }}>
              No recent activity
            </p>
          )}
        </div>

        {/* Bottom-left: Current Streak (primary, emphasized) */}
        <div style={{
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-md)",
          border: "1px solid #2fa24ec9",
          position: "relative",
          transition: "all var(--transition)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(18, 96, 25, 0.41)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(255, 140, 8, 0)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-2)",
            marginBottom: "var(--spacing-3)",
          }}>
            <p style={{
              fontSize: "11px",
              color: "var(--color-text-tertiary)",
              margin: 0,
              textTransform: "uppercase",
              fontWeight: "500",
              letterSpacing: "0.05em",
            }}>
              Current Streak
            </p>
          </div>
          <h3 style={{
            fontSize: "48px",
            fontWeight: "600",
            margin: 0,
            color: "#114f3e",
            marginBottom: "var(--spacing-2)",
          }}>
            {currentStreak} <Flame color="#ff8c08" style={{ width: "40px", height: "40px" }} />

          </h3>
          <p style={{
            fontSize: "13px",
            color: "var(--color-text-secondary)",
            margin: 0,
            fontWeight: "500",
          }}>
            Consecutive active days
          </p>
        </div>

        {/* Bottom-right: Longest Streak (primary) */}
        <div style={{
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-md)",
          border: "1.5px solid #a3b6ff",
          transition: "all var(--transition)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(99, 101, 241, 0.24)";
          e.currentTarget.style.border = "1.5px solid #1b296293";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(255, 140, 8, 0)";
          e.currentTarget.style.border = "1.5px solid #a3b6ff";
          e.currentTarget.style.transform = "translateY(0)";
        }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-2)",
            marginBottom: "var(--spacing-3)",
          }}>
            <p style={{
              fontSize: "11px",
              color: "var(--color-text-tertiary)",
              margin: 0,
              textTransform: "uppercase",
              fontWeight: "500",
              letterSpacing: "0.05em",
            }}>
              Longest Streak
            </p>
          </div>
          <h3 style={{
            fontSize: "42px",
            fontWeight: "600",
            margin: 0,
            color: "#1b2962",
            marginBottom: "var(--spacing-2)",
          }}>
            {longestStreak} <Trophy color="#ff8c08" style={{ width: "32px", height: "32px", marginLeft: "5px" }} />
          </h3>
          <p style={{
            fontSize: "13px",
            color: "var(--color-text-secondary)",
            margin: 0,
            fontWeight: "500",
          }}>
            Best consistency so far
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AnalyticsSection;
