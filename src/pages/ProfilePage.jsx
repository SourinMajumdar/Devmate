import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import ContentTimeline from "../sections/ContentTimeline.jsx";
import AnalyticsSection from "../sections/AnalyticsSection.jsx";
import LanguageChart from "../components/LanguageChart.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";
import { useGitHubActivity } from "../hooks/useGitHubActivity.js";
import { extractGitHubUsername } from "../utils/github.js";

const ProfilePage = ({
  profile,
  projects,
  onEditProfile,
  onAddProject,
  onEditProject,
  onDeleteProject,
  onSignOut,
}) => {
  const navigate = useNavigate();
  const hasAutoOpened = useRef(false);

  // Auto-open setup modal on first visit if profile is empty
  useEffect(() => {
    if (!profile?.id && !hasAutoOpened.current) {
      hasAutoOpened.current = true;
      onEditProfile();
    }
  }, [profile]);

  // Extract GitHub username from the stored GitHub link
  const githubUsername = extractGitHubUsername(
    profile?.githubUsername || profile?.links?.github || ""
  );

  // Single API call — results shared across sections
  const {
    events: ghEvents,
    latestCommit,
    ghStats,
    loading: ghLoading,
    error: ghError,
  } = useGitHubActivity(githubUsername);

  const validProjects =
    (projects || []).filter((p) => p.title && p.title.trim() !== "");

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
      <Navbar onSignOut={onSignOut} />

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
        {/* ── Full-width profile header ── */}
        <ProfileHeader profile={profile} onEditClick={onEditProfile} />

        {/* ── Two-column content area ── */}
        <div
          className="profile-content-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "var(--space-lg)",
            marginTop: "var(--space-lg)",
            alignItems: "start",
          }}
        >
          {/* Left column: Overview + Languages */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            <AnalyticsSection projects={projects} />
            <LanguageChart projects={validProjects} />
          </div>

          {/* Right column: Projects + Activity */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            <ProjectsSection
              projects={projects}
              onAddProject={onAddProject}
              onEditProject={onEditProject}
              onDeleteProject={onDeleteProject}
              onSeeAll={() => navigate("/projects")}
            />
            <ContentTimeline
              projects={projects}
              profile={profile}
              ghEvents={ghEvents}
              ghLoading={ghLoading}
              githubUsername={githubUsername}
            />
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ProfilePage;
