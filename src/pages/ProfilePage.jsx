import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import ContentTimeline from "../sections/ContentTimeline.jsx";
import AnalyticsSection from "../sections/AnalyticsSection.jsx";
import Footer from "../components/Footer.jsx";
import { useGitHubActivity } from "../hooks/useGitHubActivity.js";
import { extractGitHubUsername, timeAgo } from "../utils/github.js";

const ProfilePage = ({
  profile,
  projects,
  onEditProfile,
  onAddProject,
  onEditProject,
  onDeleteProject,
}) => {
  const navigate = useNavigate();
  const hasAutoOpened = useRef(false);

  // Auto-open setup modal on first visit if profile is empty
  useEffect(() => {
    if (!profile?.name && !hasAutoOpened.current) {
      hasAutoOpened.current = true;
      onEditProfile();
    }
  }, []);

  // Extract GitHub username from the stored GitHub link
  const githubUsername = extractGitHubUsername(
    profile?.githubUsername || profile?.links?.github || ""
  );

  // Single API call — results shared between AnalyticsSection and ContentTimeline
  const { events: ghEvents, latestCommit, loading: ghLoading, error: ghError } =
    useGitHubActivity(githubUsername);

  // Build the "Latest Activity" card data
  const validProjects = projects?.filter((p) => p.title && p.title.trim() !== "") || [];
  const latestActivityItem = (function() {
    // Most recent DevMate project (use real timestamp if available)
    const latestProject = validProjects.slice().sort(function(a, b) {
      return new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0);
    })[0];
    const dmTs = latestProject
      ? new Date(latestProject.updatedAt || latestProject.createdAt || 0).getTime()
      : 0;
    const dmActivity = latestProject
      ? { message: "Updated " + latestProject.title, source: latestProject.title, time: dmTs ? timeAgo(latestProject.updatedAt || latestProject.createdAt) : "Today" }
      : null;

    // Most recent GitHub event
    const ghTs = ghEvents.length > 0 && ghEvents[0].timestamp
      ? new Date(ghEvents[0].timestamp).getTime()
      : 0;
    const ghActivity = ghEvents.length > 0
      ? { message: ghEvents[0].text, source: ghEvents[0].sub, time: timeAgo(ghEvents[0].timestamp) }
      : null;

    if (ghActivity && dmActivity) return ghTs > dmTs ? ghActivity : dmActivity;
    return ghActivity || dmActivity;
  })();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <div
        className="main-container"
        style={{
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          padding: "var(--space-xl) var(--space-xl)",
          flex: 1,
        }}
      >
        {/* Two-column layout */}
        <div
          className="main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
            gap: "var(--space-lg)",
            alignItems: "start",
          }}
        >
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            <ProfileHeader profile={profile} onEditClick={onEditProfile} />
            <AnalyticsSection
              projects={projects}
              latestCommit={latestCommit}
              ghLoading={ghLoading}
              ghError={ghError}
              githubUsername={githubUsername}
              latestActivity={latestActivityItem}
            />
          </div>

          {/* Right column */}
          <div>
            <ProjectsSection
              projects={projects}
              onAddProject={onAddProject}
              onEditProject={onEditProject}
              onDeleteProject={onDeleteProject}
              onSeeAll={() => navigate("/projects")}
            />
          </div>
        </div>

        {/* Activity timeline — full width */}
        <div
          className="activity-section-wrapper"
          style={{ marginTop: "var(--space-xl)" }}
        >
          <ContentTimeline
            projects={projects}
            profile={profile}
            ghEvents={ghEvents}
            ghLoading={ghLoading}
            githubUsername={githubUsername}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;



