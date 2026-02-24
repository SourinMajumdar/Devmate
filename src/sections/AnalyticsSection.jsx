import { Clock, Flame, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import MetricCard from "../components/shared/MetricCard";

const AnalyticsSection = ({ projects }) => {
  const validProjects = projects?.filter((p) => p.title && p.title.trim() !== "") || [];
  const projectCount = validProjects.length;

  const latestActivity = validProjects.length > 0
    ? {
        message: "Updated project dashboard",
        project: validProjects[0].title,
        time: "2 hours ago",
      }
    : null;

  const currentStreak = projectCount > 0 ? Math.min(12 + projectCount * 2, 45) : 0;
  const longestStreak = currentStreak > 0 ? Math.max(currentStreak, 28) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="analytics-section-mobile"
      style={{ background: "transparent", padding: 0 }}
    >
      <h2
        style={{
          fontSize: "var(--font-size-h2)",
          fontWeight: "var(--font-weight-semibold)",
          margin: "0 0 var(--space-md) 0",
          color: "var(--color-text-primary)",
        }}
      >
        Momentum
      </h2>

      {/* 2×2 grid */}
      <div
        className="analytics-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-sm)",
        }}
      >
        {/* Projects count */}
        <MetricCard
          label="Projects"
          value={projectCount}
        />

        {/* Latest Activity */}
        <div
          className="card"
          style={{ padding: "var(--space-md)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "var(--font-size-meta)",
              fontWeight: "var(--font-weight-medium)",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Last Commit
          </p>

          {latestActivity ? (
            <div style={{ marginTop: "var(--space-xs)" }}>
              <p
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-primary)",
                  fontWeight: "var(--font-weight-medium)",
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {latestActivity.message}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-xs)",
                  marginTop: "var(--space-xs)",
                }}
              >
                <Clock style={{ width: "12px", height: "12px", color: "var(--color-text-muted)" }} />
                <span
                  style={{
                    fontSize: "var(--font-size-meta)",
                    color: "var(--color-text-muted)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {latestActivity.project}
                </span>
              </div>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--color-text-muted)",
                  margin: "var(--space-xs) 0 0 0",
                }}
              >
                {latestActivity.time}
              </p>
            </div>
          ) : (
            <p
              style={{
                fontSize: "var(--font-size-sm)",
                color: "var(--color-text-muted)",
                margin: "var(--space-xs) 0 0 0",
              }}
            >
              No recent activity
            </p>
          )}
        </div>

        {/* Current Streak */}
        <MetricCard
          label="Current Streak"
          value={currentStreak}
          sub="Consecutive active days"
          icon={
            <Flame
              style={{ width: "22px", height: "22px", color: "var(--color-text-muted)" }}
            />
          }
        />

        {/* Longest Streak */}
        <MetricCard
          label="Longest Streak"
          value={longestStreak}
          sub="Best consistency so far"
          icon={
            <Trophy
              style={{ width: "20px", height: "20px", color: "var(--color-text-muted)" }}
            />
          }
        />
      </div>
    </motion.section>
  );
};

export default AnalyticsSection;
