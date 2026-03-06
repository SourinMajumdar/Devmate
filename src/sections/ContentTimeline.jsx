import { History, Github, GitCommit, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { timeAgo } from "../utils/github";

const ACTION_VERBS = ["Deployed", "Finished", "Launched", "Completed", "Built", "Released"];

/** Build DevMate activity items from local projects + profile. */
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

/** Returns icon component + colors for an activity item */
function getIconConfig(item) {
  if (item.source === "github") {
    return { Icon: Github, color: "var(--color-text-primary)", bg: "var(--color-bg-elevated)" };
  }
  // DevMate events
  return { Icon: Zap, color: "var(--color-accent)", bg: "var(--color-accent-subtle)" };
}

/** Renders text with the sub portion highlighted in accent color (GitHub events only) */
function renderText(item) {
  const displayText =
    item.type === "PushEvent" && item.sub
      ? "Pushed to " + item.sub
      : item.text;

  if (item.source === "github" && item.sub && displayText.includes(item.sub)) {
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
}

/* ── Single activity item ── */
const ActivityItem = ({ item }) => {
  const { Icon, color, bg } = getIconConfig(item);

  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-md)",
        alignItems: "flex-start",
        padding: "var(--space-md) 0",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Colored icon circle */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        <Icon style={{ width: "15px", height: "15px", color }} />
      </div>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--color-text-primary)",
            fontWeight: "var(--font-weight-medium)",
            margin: "0 0 4px 0",
            lineHeight: "var(--line-height-snug)",
          }}
        >
          {renderText(item)}
        </p>

        {/* Commit message for PushEvents */}
        {item.type === "PushEvent" && item.commitMessage && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "5px",
              background: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border)",
              borderLeft: "2px solid #238636",
              borderRadius: "var(--radius-sm)",
              padding: "4px 8px",
              margin: "4px 0",
            }}
          >
            <GitCommit
              style={{ width: "11px", height: "11px", color: "#238636", marginTop: "2px", flexShrink: 0 }}
            />
            <span
              style={{
                fontSize: "var(--font-size-meta)",
                color: "var(--color-text-primary)",
                fontFamily: "monospace",
                lineHeight: "1.4",
              }}
            >
              {item.commitMessage}
            </span>
          </div>
        )}

        <span
          style={{
            fontSize: "var(--font-size-meta)",
            color: "var(--color-text-muted)",
          }}
        >
          {timeAgo(item.timestamp)}
        </span>
      </div>
    </div>
  );
};

/* ── GitHub nudge banner ── */
const GitHubNudge = ({ onEditProfile }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--space-md)",
      padding: "var(--space-md) 0",
      borderBottom: "1px solid var(--color-border)",
    }}
  >
    <div
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "var(--color-bg-elevated)",
        border: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Github style={{ width: "15px", height: "15px", color: "var(--color-text-secondary)" }} />
    </div>
    <div>
      <p style={{ fontSize: "var(--font-size-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", margin: "0 0 2px 0" }}>
        Connect GitHub to see live activity
      </p>
      <p style={{ fontSize: "var(--font-size-meta)", color: "var(--color-text-muted)", margin: 0 }}>
        Add your GitHub link in profile settings
      </p>
    </div>
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
      style={{ padding: "var(--space-md)", width: "100%" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "var(--space-xs)",
        }}
      >
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

      <p
        style={{
          fontSize: "var(--font-size-meta)",
          color: "var(--color-text-muted)",
          margin: "0 0 var(--space-xs) 0",
        }}
      >
        {isEmpty
          ? "Your activity timeline will appear here"
          : "Recent updates from DevMate and GitHub"}
      </p>

      {/* Nudge */}
      {!githubUsername && <GitHubNudge />}

      {/* Loading state */}
      {ghLoading && devmateEvents.length === 0 && (
        <div style={{ padding: "var(--space-md) 0", textAlign: "center" }}>
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", margin: 0 }}>
            Loading GitHub activity…
          </p>
        </div>
      )}

      {/* Empty state */}
      {isEmpty && githubUsername && (
        <div style={{ padding: "var(--space-xl) 0", textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--color-accent-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto var(--space-md)",
            }}
          >
            <Activity style={{ width: "18px", height: "18px", color: "var(--color-accent)" }} />
          </div>
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", margin: 0 }}>
            No activity yet — your timeline will update automatically
          </p>
        </div>
      )}

      {/* Activity list — 2-col grid */}
      {allEvents.length > 0 && (
        <div
          className="timeline-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 var(--space-lg)",
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
