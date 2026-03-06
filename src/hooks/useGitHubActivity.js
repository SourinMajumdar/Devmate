import { useState, useEffect } from "react";
import { formatGitHubEvent } from "../utils/github";

/**
 * Fetches public GitHub events for a given username.
 * Returns:
 *  - events      : activity items for the feed (source: "github")
 *  - latestCommit: most recent PushEvent { message, repo, timestamp }
 *  - loading     : boolean
 *  - error       : string | null
 */
export function useGitHubActivity(githubUsername) {
  const [events, setEvents] = useState([]);
  const [latestCommit, setLatestCommit] = useState(null);
  const [ghStats, setGhStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!githubUsername) {
      setEvents([]);
      setLatestCommit(null);
      setGhStats(null);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(
      "https://api.github.com/users/" + githubUsername + "/events?per_page=30",
      {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" },
      }
    )
      .then(function(res) {
        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "GitHub user not found"
              : "Failed to fetch GitHub activity"
          );
        }
        return res.json();
      })
      .then(function(data) {
        if (!Array.isArray(data)) throw new Error("Invalid GitHub API response");

        // Compute ghStats from raw events
        const pushEvs = data.filter(function(e) { return e.type === "PushEvent"; });
        const prEvs = data.filter(function(e) {
          return e.type === "PullRequestEvent" &&
            e.payload?.action === "closed" &&
            e.payload?.pull_request?.merged;
        });
        const totalCommits = pushEvs.reduce(function(sum, e) {
          return sum + (e.payload?.commits?.length || 1);
        }, 0);
        setGhStats({ pushCount: pushEvs.length, prCount: prEvs.length, totalCommits });

        // Latest PushEvent -> Latest Commit card
        const pushEvent = data.find(function(e) { return e.type === "PushEvent"; });
        if (pushEvent) {
          const commits = pushEvent.payload?.commits || [];
          const commit = commits[commits.length - 1];
          setLatestCommit({
            message: commit?.message?.split("\n")[0] || "No commit message",
            repo: pushEvent.repo?.name?.split("/")[1] || pushEvent.repo?.name,
            timestamp: pushEvent.created_at,
          });
        } else {
          setLatestCommit(null);
        }

        // Convert events to activity feed items
        // For PushEvents, surface the commit message as a separate field
        const items = data.slice(0, 15).map(function(event) {
          const formatted = formatGitHubEvent(event);
          var item = {
            id: event.id,
            text: formatted.text,
            sub: formatted.sub,
            timestamp: event.created_at,
            source: "github",
            type: event.type,
          };
          if (event.type === "PushEvent") {
            const commits = event.payload?.commits || [];
            const commit = commits[commits.length - 1];
            if (commit?.message) {
              item.commitMessage = commit.message.split("\n")[0];
            }
          }
          return item;
        });
        setEvents(items);
        setLoading(false);
      })
      .catch(function(err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load GitHub activity");
          setLoading(false);
        }
      });

    return function() { controller.abort(); };
  }, [githubUsername]);

  return { events, latestCommit, ghStats, loading, error };
}
