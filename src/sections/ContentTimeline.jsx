import { Activity, Github, GitCommit } from "lucide-react";
import { motion } from "framer-motion";
import { timeAgo } from "../utils/github";

const ACTION_VERBS = ["Deployed", "Finished", "Launched", "Completed", "Built", "Released"];

/** Build DevMate activity items from local projects + profile. */
function buildDevmateEvents(projects, profile) {
  const validProjects = projects?.filter(function(p) { return p.title && p.title.trim(); }) || [];
  const events = validProjects.map(function(project, i) {
    var ts = project.updatedAt || project.createdAt || null;
    return {
      id: "dm-project-" + (project.id !== undefined ? project.id : i),
      text: ACTION_VERBS[i % ACTION_VERBS.length] + " " + project.title,
      sub: project.title,
      timestamp: ts,
      source: "devmate",
    };
  });
  if (profile && profile.name && profile.name.trim() && profile.updatedAt) {
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

/* ── Single activity item ── */
const ActivityItem = function({ item }) {
  var isGitHub = item.source === "github";
  var isPush = item.type === "PushEvent";

  return (
    <div
      className="card"
      style={{
        display: "flex",
        gap: "var(--space-sm)",
        alignItems: "flex-start",
        padding: "var(--space-md)",
      }}
    >
      {/* Source indicator */}
      <div style={{ paddingTop: "1px", flexShrink: 0 }}>
        {isGitHub ? (
          <div
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              background: "var(--color-bg-elevated)",
              border: "1.5px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Github
              style={{
                width: "15px",
                height: "15px",
                color: "var(--color-text-primary)",
              }}
            />
          </div>
        ) : (
          <div className="timeline-dot" style={{ marginTop: "8px" }} />
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Action label */}
        <p
          style={{
            fontSize: "var(--font-size-meta)",
            color: "var(--color-text-secondary)",
            margin: "0 0 4px 0",
            fontWeight: "var(--font-weight-medium)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {/* For push events show "Pushed to repo", for others show full text */}
          {isPush && item.sub
            ? "Pushed to " + item.sub
            : item.text}
        </p>

        {/* Commit message — shown prominently for PushEvents */}
        {isPush && item.commitMessage && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "5px",
              background: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border)",
              borderLeft: "2px solid #238636",
              borderRadius: "var(--radius-sm)",
              padding: "5px 8px",
              margin: "0 0 5px 0",
            }}
          >
            <GitCommit
              style={{ width: "12px", height: "12px", color: "#238636", marginTop: "2px", flexShrink: 0 }}
            />
            <span
              style={{
                fontSize: "var(--font-size-sm)",
                color: "var(--color-text-primary)",
                fontWeight: "var(--font-weight-medium)",
                lineHeight: "1.4",
                fontFamily: "monospace",
              }}
            >
              {item.commitMessage}
            </span>
          </div>
        )}

        {/* Sub label (repo name / project name) */}
        {!isPush && item.sub && (
          <p
            style={{
              fontSize: "var(--font-size-meta)",
              color: isGitHub ? "var(--color-accent)" : "var(--color-text-muted)",
              margin: "0 0 3px 0",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.sub}
          </p>
        )}

        {/* Timestamp */}
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
const GitHubNudge = function({ onEditProfile }) {
  return (
    <div
      className="card"
      style={{
        padding: "var(--space-md)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-md)",
        borderLeft: "3px solid var(--color-border)",
        background: "var(--color-bg-elevated)",
        gridColumn: "1 / -1",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "var(--color-surface)",
          border: "1.5px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Github style={{ width: "18px", height: "18px", color: "var(--color-text-secondary)" }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: "var(--font-size-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-primary)", margin: "0 0 2px 0" }}>
          Connect GitHub to see live activity
        </p>
        <p style={{ fontSize: "var(--font-size-meta)", color: "var(--color-text-muted)", margin: 0 }}>
          Add your GitHub link in profile settings to pull in commits, PRs and more
        </p>
      </div>
    </div>
  );
};

/* ── ContentTimeline ── */
const ContentTimeline = function({ projects, profile, ghEvents, ghLoading, githubUsername }) {
  var devmateEvents = buildDevmateEvents(projects, profile);

  // Merge DevMate + GitHub events, sort newest first, cap at 8
  var allEvents = devmateEvents
    .concat(ghEvents || [])
    .sort(function(a, b) { return new Date(b.timestamp) - new Date(a.timestamp); })
    .slice(0, 8);

  var isEmpty = allEvents.length === 0 && !ghLoading;

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
        {isEmpty
          ? "Your activity timeline will appear here"
          : "Recent updates from DevMate and GitHub"}
      </p>

      {isEmpty ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
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
              <Activity
                style={{ width: "20px", height: "20px", color: "var(--color-accent)" }}
              />
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
            <p
              style={{
                fontSize: "var(--font-size-sm)",
                color: "var(--color-text-secondary)",
                margin: 0,
              }}
            >
              Your timeline will update automatically
            </p>
          </div>
          {!githubUsername && <GitHubNudge />}
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
          {ghLoading && devmateEvents.length === 0 && (
            <div
              className="card"
              style={{
                padding: "var(--space-md)",
                gridColumn: "1 / -1",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-muted)",
                  margin: 0,
                }}
              >
                Loading GitHub activity…
              </p>
            </div>
          )}
          {!githubUsername && <GitHubNudge />}
          {allEvents.map(function(item) {
            return <ActivityItem key={item.id} item={item} />;
          })}
        </div>
      )}
    </motion.section>
  );
};

export default ContentTimeline;
