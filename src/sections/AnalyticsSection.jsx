import { Clock, GitCommit, Github } from "lucide-react";
import { motion } from "framer-motion";
import MetricCard from "../components/shared/MetricCard";
import LanguageChart from "../components/LanguageChart";
import { timeAgo } from "../utils/github";

/* ── Latest Activity Card ── */
const LatestActivityCard = ({ activity }) => (
  <div
    className="card"
    style={{
      padding: "var(--space-md)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)",
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
      Latest Activity
    </p>

    {activity ? (
      <div style={{ marginTop: "var(--space-xs)" }}>
        <p
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-primary)",
            fontWeight: "var(--font-weight-medium)",
            margin: "0 0 var(--space-xs) 0",
            lineHeight: "var(--line-height-snug)",
            wordBreak: "break-word",
          }}
        >
          {activity.message}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-xs)",
            marginTop: "var(--space-xs)",
          }}
        >
          <Clock
            style={{ width: "12px", height: "12px", color: "var(--color-text-muted)" }}
          />
          <span
            style={{
              fontSize: "var(--font-size-meta)",
              color: "var(--color-text-muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {activity.source}
          </span>
        </div>
        <p
          style={{
            fontSize: "11px",
            color: "var(--color-text-muted)",
            margin: "var(--space-xs) 0 0 0",
          }}
        >
          {activity.time}
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
);

/* ── Latest Commit Card ── */
const LatestCommitCard = ({ commit, loading, error, username }) => (
  <div
    className="card"
    style={{
      padding: "var(--space-md)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-xs)",
      borderLeft: "3px solid #238636",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
        Latest Commit
      </p>
      <Github
        style={{ width: "13px", height: "13px", color: "var(--color-text-muted)" }}
      />
    </div>

    {!username ? (
      <p
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-muted)",
          margin: "var(--space-xs) 0 0 0",
        }}
      >
        Add your GitHub link in profile
      </p>
    ) : loading ? (
      <p
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-text-muted)",
          margin: "var(--space-xs) 0 0 0",
        }}
      >
        Loading…
      </p>
    ) : error ? (
      <p
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-danger)",
          margin: "var(--space-xs) 0 0 0",
        }}
      >
        {error}
      </p>
    ) : commit ? (
      <div style={{ marginTop: "var(--space-xs)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-xs)",
            marginBottom: "var(--space-xs)",
          }}
        >
          <GitCommit style={{ width: "14px", height: "14px", color: "#238636", flexShrink: 0 }} />
          <span
            style={{
              fontSize: "var(--font-size-sm)",
              color: "#238636",
              fontWeight: "var(--font-weight-semibold)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {commit.repo}
          </span>
        </div>
        <p
          style={{
            fontSize: "11px",
            color: "var(--color-text-muted)",
            margin: 0,
          }}
        >
          {timeAgo(commit.timestamp)}
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
        No commits found
      </p>
    )}
  </div>
);

/* ── AnalyticsSection ── */
const AnalyticsSection = ({
  projects,
  latestCommit,
  ghLoading,
  ghError,
  githubUsername,
  latestActivity,
}) => {
  const validProjects =
    projects?.filter((p) => p.title && p.title.trim() !== "") || [];
  const projectCount = validProjects.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="analytics-section-mobile"
      style={{ background: "transparent", padding: 0 }}
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
          Overview
        </h2>
      </div>

      {/* 3-column overview grid */}
      <div
        className="analytics-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "var(--space-sm)",
        }}
      >
        <MetricCard
          label="Projects"
          value={projectCount}
          sub="Total in DevMate"
          style={{ borderLeft: "3px solid var(--color-accent)" }}
        />

        <LatestActivityCard activity={latestActivity} />

        <LatestCommitCard
          commit={latestCommit}
          loading={ghLoading}
          error={ghError}
          username={githubUsername}
        />
      </div>

      {/* Language chart — full width below the grid */}
      <div style={{ marginTop: "var(--space-sm)" }}>
        <LanguageChart projects={validProjects} />
      </div>
    </motion.section>
  );
};

export default AnalyticsSection;
