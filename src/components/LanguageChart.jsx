import { motion } from "framer-motion";

/**
 * Language colour map — covers common langs/frameworks.
 * Falls back to a deterministic palette for unknowns.
 */
const LANG_COLORS = {
  javascript:  "#f7df1e",
  js:          "#f7df1e",
  typescript:  "#3178c6",
  ts:          "#3178c6",
  python:      "#3572a5",
  rust:        "#dea584",
  go:          "#00acd7",
  java:        "#b07219",
  kotlin:      "#a97bff",
  swift:       "#f05138",
  "c++":       "#f34b7d",
  c:           "#555555",
  "c#":        "#178600",
  csharp:      "#178600",
  ruby:        "#701516",
  php:         "#4f5d95",
  dart:        "#00b4ab",
  scala:       "#c22d40",
  shell:       "#89e051",
  bash:        "#89e051",
  html:        "#e34c26",
  css:         "#663399",
  scss:        "#c6538c",
  sass:        "#c6538c",
  less:        "#1d365d",
  sql:         "#e38c00",
  graphql:     "#e10098",
  react:       "#61dafb",
  vue:         "#42b883",
  angular:     "#dd0031",
  svelte:      "#ff3e00",
  nextjs:      "#000000",
  nuxt:        "#00dc82",
  tailwind:    "#06b6d4",
  tailwindcss: "#06b6d4",
  node:        "#339933",
  nodejs:      "#339933",
  express:     "#000000",
  django:      "#092e20",
  flask:       "#000000",
  fastapi:     "#009688",
  laravel:     "#ff2d20",
  docker:      "#2496ed",
  kubernetes:  "#326ce5",
  mongodb:     "#47a248",
  postgres:    "#336791",
  postgresql:  "#336791",
  mysql:       "#4479a1",
  redis:       "#dc382d",
  firebase:    "#ffca28",
  aws:         "#ff9900",
  gcp:         "#4285f4",
  azure:       "#0089d6",
  vite:        "#646cff",
  webpack:     "#8dd6f9",
  jest:        "#c21325",
  framer:      "#0055ff",
};

/** Fallback palette for unmapped techs */
const FALLBACK_PALETTE = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316",
  "#eab308", "#84cc16", "#10b981", "#06b6d4", "#3b82f6",
];

function getColor(tech, fallbackIndex) {
  const key = tech.toLowerCase().replace(/[\s.]/g, "");
  return LANG_COLORS[key] ?? FALLBACK_PALETTE[fallbackIndex % FALLBACK_PALETTE.length];
}

/**
 * LanguageChart
 * Props:
 *   projects — array of project objects with .tech string[]
 */
const LanguageChart = ({ projects }) => {
  const validProjects = (projects ?? []).filter(
    (p) => p.title?.trim() && p.tech?.length
  );

  // ── Tally ──────────────────────────────────────────────
  const counts = {};
  validProjects.forEach((p) => {
    p.tech.forEach((t) => {
      const key = t.trim();
      if (key) counts[key] = (counts[key] ?? 0) + 1;
    });
  });

  const entries = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // cap at 10 for readability

  const total = entries.reduce((sum, [, n]) => sum + n, 0);

  // Empty state
  if (entries.length === 0) {
    return (
      <div
        className="card"
        style={{
          padding: "var(--space-md)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-xs)",
          borderLeft: "3px solid var(--color-accent)",
        }}
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
          Languages
        </p>
        <p
          style={{
            margin: "var(--space-xs) 0 0",
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
    <div
      className="card"
      style={{
        padding: "var(--space-md)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        borderLeft: "3px solid var(--color-accent)",
      }}
    >
      {/* Header */}
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
        Languages
      </p>

      {/* Stacked pill bar */}
      <div
        style={{
          display: "flex",
          height: "8px",
          borderRadius: "999px",
          overflow: "hidden",
          gap: "2px",
        }}
      >
        {entries.map(([tech, count], i) => {
          const pct = (count / total) * 100;
          return (
            <motion.div
              key={tech}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
              title={`${tech}: ${pct.toFixed(1)}%`}
              style={{
                height: "100%",
                background: getColor(tech, i),
                borderRadius: "999px",
                minWidth: "4px",
              }}
            />
          );
        })}
      </div>

      {/* Legend list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {entries.map(([tech, count], i) => {
          const pct = ((count / total) * 100).toFixed(1);
          const color = getColor(tech, i);
          return (
            <div
              key={tech}
              style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}
            >
              {/* Dot */}
              <span
                style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: color,
                  flexShrink: 0,
                }}
              />

              {/* Name */}
              <span
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-primary)",
                  fontWeight: "var(--font-weight-medium)",
                  flex: "0 0 auto",
                  minWidth: "72px",
                }}
              >
                {tech}
              </span>

              {/* Bar track */}
              <div
                style={{
                  flex: 1,
                  height: "5px",
                  background: "var(--color-border)",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    background: color,
                    borderRadius: "999px",
                  }}
                />
              </div>

              {/* Percentage */}
              <span
                style={{
                  fontSize: "var(--font-size-meta)",
                  color: "var(--color-text-muted)",
                  flex: "0 0 36px",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageChart;
