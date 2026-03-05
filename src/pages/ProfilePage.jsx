import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import ContentTimeline from "../sections/ContentTimeline.jsx";
import AnalyticsSection from "../sections/AnalyticsSection.jsx";
import Footer from "../components/Footer.jsx";

const ProfilePage = ({
  profile,
  projects,
  onEditProfile,
  onAddProject,
  onEditProject,
  onDeleteProject,
}) => {
  const navigate = useNavigate();

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
            <AnalyticsSection projects={projects} />
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
          <ContentTimeline projects={projects} profile={profile} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
