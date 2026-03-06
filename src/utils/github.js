/**
 * Extracts a GitHub username from a full GitHub URL or a bare username string.
 * Handles: https://github.com/octocat, github.com/octocat, octocat
 */
export function extractGitHubUsername(githubInput) {
  if (!githubInput || typeof githubInput !== "string") return "";
  const trimmed = githubInput.trim();
  if (!trimmed) return "";
  if (trimmed.includes("github.com")) {
    const match = trimmed.match(/github\.com\/([^/?\s#]+)/i);
    return match ? match[1] : "";
  }
  return trimmed.split("/")[0].trim();
}

/**
 * Returns a human-readable relative-time string for an ISO date string or Date.
 */
export function timeAgo(dateStr) {
  if (!dateStr) return "";
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  if (isNaN(date.getTime())) return "";
  const diff = Date.now() - date.getTime();
  const secs = Math.floor(diff / 1000);
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (secs < 60) return "just now";
  if (mins < 60) return mins + "m ago";
  if (hours < 24) return hours + "h ago";
  if (days === 1) return "Yesterday";
  if (days < 7) return days + " days ago";
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks + " week" + (weeks > 1 ? "s" : "") + " ago";
  const months = Math.floor(days / 30);
  return months + " month" + (months > 1 ? "s" : "") + " ago";
}

/**
 * Converts a raw GitHub event into a { text, sub } display pair.
 */
export function formatGitHubEvent(event) {
  const repoShort = event.repo?.name?.split("/")[1] || event.repo?.name || "";
  switch (event.type) {
    case "PushEvent": {
      const commits = event.payload?.commits || [];
      const commit = commits[commits.length - 1];
      const msg = commit?.message?.split("\n")[0] || "a commit";
      return { text: "Pushed commit: " + msg, sub: repoShort };
    }
    case "PullRequestEvent": {
      const action = event.payload?.action || "updated";
      const title = event.payload?.pull_request?.title || "a pull request";
      const verb = action === "opened" ? "Opened" : action === "closed" ? "Closed" : "Updated";
      return { text: verb + " PR: " + title, sub: repoShort };
    }
    case "CreateEvent": {
      const refType = event.payload?.ref_type || "repository";
      const ref = event.payload?.ref;
      if (refType === "repository") return { text: "Created repository", sub: repoShort };
      return { text: "Created " + refType + (ref ? " " + ref : ""), sub: repoShort };
    }
    case "IssuesEvent": {
      const action = event.payload?.action || "updated";
      const title = event.payload?.issue?.title || "an issue";
      const verb = action === "opened" ? "Opened" : action === "closed" ? "Closed" : "Updated";
      return { text: verb + " issue: " + title, sub: repoShort };
    }
    case "ForkEvent": return { text: "Forked repository", sub: repoShort };
    case "WatchEvent": return { text: "Starred", sub: repoShort };
    case "IssueCommentEvent": return { text: "Commented on an issue", sub: repoShort };
    case "DeleteEvent":
      return { text: ("Deleted " + (event.payload?.ref_type || "branch") + " " + (event.payload?.ref || "")).trim(), sub: repoShort };
    case "ReleaseEvent":
      return { text: "Released " + (event.payload?.release?.tag_name || "a new version"), sub: repoShort };
    default: return { text: "Activity", sub: repoShort };
  }
}
