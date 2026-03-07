import { History, Github, GitCommit, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { timeAgo } from "../utils/github";

const ACTION_VERBS = ["Deployed", "Finished", "Launched", "Completed", "Built", "Released"];

function buildDevmateEvents(projects, profile) {
  const validProjects = (projects || []).filter((p) => p.title?.trim());
  const events = validProjects.map((project, i) => ({
    id: "dm-project-" + (project.id !== undefined ? project.id : i),
    text: ACTION_VERBS[i % ACTION_VERBS.length] + " " + project.title,
    sub: project.title,
    timestamp: project.updatedAt || project.createdAt || null,
    source: "devmate",
  }));
  if (profile?.name?.trim() && profile.updatedAt) {
    events.push({
      id: "dm-profile-edit",
      text: "Edited profile",
      sub: "DevMate",
      timestamp: profile.updatedAt,
      source: "devmate",
    });
  }
  return events;
}

/* ── Single activity item — compact card style ── */
const ActivityItem = ({ item }) => {
  const isGH = item.source === "github";
  const Icon = isGH ? Github : Zap;
  const accentColor = isGH ? "var(--color-text-muted)" : "var(--color-accent)";
  const borderColor = isGH ? "var(--color-border)" : "var(--color-accent)";

  /* Build display text */
  const displayText =
    item.type === "PushEvent" && item.sub
      ? "Pushed to " + item.sub
      : item.text;

  /* Highlight repo/project name */
  const renderText = () => {
    if (item.sub && displayText.includes(item.sub)) {
      const idx = displayText.indexOf(item.sub);
      return (
        <>
          {displayText.slice(0, idx)}
          <span style={{ color: "var(--color-accent)", fontWeight: "var(--font-weight-semibold)" }}>
            {item.sub}
          </span>
          {displayText.slice(idx + item.sub.length)}
        </>
      );
    }
    return displayText;
  };

  return (
    <div
      style={{
        background: "var(--color-bg-elevated)",
        border: "1px solid var(--color-border)",
        borderLeft: `2px solid ${borderColor}`,
        borderRadius: "var(--radius-sm)",
        padding: "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      {/* Top row: icon + text + timestamp */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
        <Icon
          style={{
            width: "13px",
            height: "13px",
            color: accentColor,
            flexShrink: 0,
            marginTop: "2px",
          }}
        />
        <span
          style={{
            flex: 1,
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-primary)",
            fontWeight: "var(--font-weight-medium)",
            lineHeight: "var(--line-height-snug)",
          }}
        >
          {renderText()}
        </span>
        <span
          style={{
            fontSize: "11px",
            color: "var(--color-text-muted)",
            flexShrink: 0,
            marginTop: "2px",
            whiteSpace: "nowrap",
          }}
        >
          {timeAgo(item.timestamp)}
        </span>
      </div>

      {/* Commit message — simple mono line, no box */}
      {item.type === "PushEvent" && item.commitMessage && (
        <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingLeft: "20px" }}>
          <GitCommit style={{ width: "10px", height: "10px", color: "#238636", flexShrink: 0 }} />
          <span
            style={{
              fontSize: "11px",
              fontFamily: "monospace",
              color: "var(--color-text-secondary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.commitMessage}
          </span>
        </div>
      )}
    </div>
  );
};

/* ── GitHub nudge — subtle inline bar ── */
const GitHubNudge = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 12px",
      borderRadius: "var(--radius-sm)",
      background: "var(--color-accent-subtle)",
      border: "1px solid var(--color-accent-border)",
      marginBottom: "var(--space-sm)",
    }}
  >
    <Github style={{ width: "13px", height: "13px", color: "var(--color-accent)", flexShrink: 0 }} />
    <p style={{ fontSize: "var(--font-size-meta)", color: "var(--color-text-secondary)", margin: 0 }}>
      Add your GitHub username in profile to see live activity
    </p>
  </div>
);

/* ── ContentTimeline ── */
const ContentTimeline = ({ projects, profile, ghEvents, ghLoading, githubUsername }) => {
  const devmateEvents = buildDevmateEvents(projects, profile);

  const allEvents = devmateEvents
    .concat(ghEvents || [])
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 8);

  const isEmpty = allEvents.length === 0 && !ghLoading;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="card activity-section-mobile"
      style={{ padding: "var(--space-md)", width: "100%", border: "1px solid transparent", background: "transparent", boxShadow: "none" }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <History style={{ width: "18px", height: "18px", color: "var(--color-accent)" }} />
        <h2
          style={{
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-semibold)",
            margin: 0,
            color: "var(--color-text-primary)",
          }}
        >
          Recent Activity
        </h2>
      </div>
      <p style={{ fontSize: "var(--font-size-meta)", color: "var(--color-text-muted)", margin: "0 0 var(--space-md) 0" }}>
        Recent updates from DevMate and GitHub
      </p>

      {/* GitHub nudge */}
      {!githubUsername && <GitHubNudge />}

      {/* Loading */}
      {ghLoading && devmateEvents.length === 0 && (
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", margin: 0 }}>
          Loading GitHub activity…
        </p>
      )}

      {/* Empty state */}
      {isEmpty && githubUsername && (
        <div style={{ padding: "var(--space-xl) 0", textAlign: "center" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--color-accent-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto var(--space-sm)",
            }}
          >
            <Activity style={{ width: "16px", height: "16px", color: "var(--color-accent)" }} />
          </div>
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", margin: 0 }}>
            No activity yet
          </p>
        </div>
      )}

      {/* 2-col activity grid */}
      {allEvents.length > 0 && (
        <div
          className="timeline-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-sm)",
          }}
        >
          {allEvents.map((item) => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default ContentTimeline;
