import { BarChart2, FolderOpen, Clock, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { timeAgo } from "../utils/github";
import { getLangColor } from "../utils/techColors";

/* ── Top-3 tech chips ── */
const TechChip = ({ tech, count }) => {
  const color = getLangColor(tech, 0);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "3px 8px",
        borderRadius: "999px",
        background: color + "18",
        border: "1px solid " + color + "40",
      }}
    >
      <span
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: "11px", fontWeight: "600", color: "var(--color-text-primary)" }}>
        {tech}
      </span>
      <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>×{count}</span>
    </div>
  );
};

/* ── Single metric row ── */
const MetricRow = ({ icon: Icon, label, children }) => (
  <div
    style={{
      padding: "12px 14px",
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-sm)",
      background: "var(--color-bg-elevated)",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
      <Icon style={{ width: "13px", height: "13px", color: "var(--color-accent)", flexShrink: 0 }} />
      <span
        style={{
          fontSize: "var(--font-size-meta)",
          color: "var(--color-text-muted)",
          fontWeight: "var(--font-weight-medium)",
        }}
      >
        {label}
      </span>
    </div>
    <div>{children}</div>
  </div>
);

/* ── AnalyticsSection ── */
const AnalyticsSection = ({ projects }) => {
  const validProjects = (projects || []).filter((p) => p.title?.trim());
  const projectCount = validProjects.length;

  // Latest activity — most recently updated project
  const sorted = [...validProjects].sort(
    (a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0)
  );
  const latest = sorted[0];
  const latestTime = latest?.updatedAt || latest?.createdAt;

  // Top 3 most-used techs
  const techCount = {};
  validProjects.forEach((p) => {
    (p.tech || []).forEach((t) => {
      const key = t.trim();
      if (key) techCount[key] = (techCount[key] || 0) + 1;
    });
  });
  const topTechs = Object.entries(techCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="card"
      style={{ padding: "var(--space-md)" }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "var(--space-md)" }}>
        <BarChart2 style={{ width: "18px", height: "18px", color: "var(--color-accent)" }} />
        <h2
          style={{
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-semibold)",
            margin: 0,
            color: "var(--color-text-primary)",
          }}
        >
          Overview
        </h2>
      </div>

      {/* Metric rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

        {/* Projects */}
        <MetricRow icon={FolderOpen} label="Projects">
          <span
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {projectCount}
          </span>
        </MetricRow>

        {/* Latest activity */}
        <MetricRow icon={Clock} label="Latest Activity">
          {latest ? (
            <div>
              <p
                style={{
                  fontSize: "var(--font-size-sm)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--color-text-primary)",
                  margin: "0 0 2px 0",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {latest.title}
              </p>
              <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                {latestTime ? timeAgo(latestTime) : "—"}
              </span>
            </div>
          ) : (
            <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>No activity yet</span>
          )}
        </MetricRow>

        {/* Top tech */}
        <MetricRow icon={Cpu} label="Top Tech">
          {topTechs.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {topTechs.map(([tech, count]) => (
                <TechChip key={tech} tech={tech} count={count} />
              ))}
            </div>
          ) : (
            <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>Add tech to projects</span>
          )}
        </MetricRow>

      </div>
    </motion.div>
  );
};

export default AnalyticsSection;
