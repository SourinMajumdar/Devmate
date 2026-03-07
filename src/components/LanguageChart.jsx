import { BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { getLangColor, FALLBACK_PALETTE } from "../utils/techColors";

/**
 * LanguageChart
 * Props:
 *   projects — array of project objects with .tech string[]
 */
const LanguageChart = ({ projects }) => {
  const validProjects = (projects ?? []).filter(
    (p) => p.title?.trim() && p.tech?.length
  );

  // Tally
  const counts = {};
  validProjects.forEach((p) => {
    p.tech.forEach((t) => {
      const key = t.trim();
      if (key) counts[key] = (counts[key] ?? 0) + 1;
    });
  });

  const entries = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const total = entries.reduce((sum, [, n]) => sum + n, 0);

  // Empty state
  if (entries.length === 0) {
    return (
      <div
        className="card"
        style={{ padding: "var(--space-md)", border: "1px solid transparent", background: "transparent", boxShadow: "none" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "var(--space-md)" }}>
          <BarChart2 style={{ width: "18px", height: "18px", color: "var(--color-accent)" }} />
          <h2 style={{ fontSize: "var(--font-size-sm)", fontWeight: "var(--font-weight-semibold)", margin: 0 }}>
            Languages
          </h2>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-muted)",
          }}
        >
          Add projects with tech tags to see language usage.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card"
      style={{ padding: "var(--space-md)", border: "1px solid transparent", background: "transparent", boxShadow: "none" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "var(--space-md)",
        }}
      >
        <BarChart2
          style={{ width: "18px", height: "18px", color: "var(--color-accent)" }}
        />
        <h2
          style={{
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-semibold)",
            margin: 0,
            color: "var(--color-text-primary)",
          }}
        >
          Languages
        </h2>
      </div>

      {/* Per-language rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {entries.map(([tech, count], i) => {
          const pct = ((count / total) * 100).toFixed(1);
          const color = getLangColor(tech, i);

          return (
            <div key={tech}>
              {/* Label + percentage */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-text-primary)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  {tech}
                </span>
                <span
                  style={{
                    fontSize: "var(--font-size-meta)",
                    color: "var(--color-text-muted)",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  {pct}%
                </span>
              </div>

              {/* Colored bar */}
              <div
                style={{
                  height: "8px",
                  background: "var(--color-border)",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    background: color,
                    borderRadius: "999px",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LanguageChart;
