import { useState } from "react";
import Hero from "../components/Hero.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import AllProjectsPage from "../pages/AllProjectsPage.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import ContentTimeline from "../sections/ContentTimeline.jsx";
import AnalyticsSection from "../sections/AnalyticsSection.jsx";
import EditModal from "../components/EditModal.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import DeleteProjectModal from "../components/DeleteProjectModal.jsx";
import Footer from "../components/Footer.jsx";

const ProfilePage = ({
  profile,
  projects,
  onEditProfile,
  isEditModalOpen,
  onSaveProfile,
  onCloseProfileModal,
  onAddProject,
  onEditProject,
  isProjectModalOpen,
  editingProjectIndex,
  onSaveProject,
  onCloseProjectModal,
  onDeleteProject,
  isDeleteModalOpen,
  onConfirmDelete,
  onCloseDeleteModal,
}) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem("devmate-current-page");
    return saved || "hero";
  });

  const navigateToPage = (page) => {
    setCurrentPage(page);
    localStorage.setItem("devmate-current-page", page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentPage === "hero") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-bg)", width: "100%" }}>
        <Hero
          onGetStarted={() => navigateToPage("dashboard")}
          onLearnMore={() => navigateToPage("about")}
        />
        <Footer />
      </div>
    );
  }

  if (currentPage === "about") {
    return (
      <AboutPage
        onBackToHome={() => navigateToPage("hero")}
        onGoToDashboard={() => navigateToPage("dashboard")}
      />
    );
  }

  if (currentPage === "all-projects") {
    return (
      <>
        <AllProjectsPage
          projects={projects}
          onAddProject={onAddProject}
          onEditProject={onEditProject}
          onDeleteProject={onDeleteProject}
          onBackToDashboard={() => navigateToPage("dashboard")}
          onBackToHome={() => navigateToPage("hero")}
        />
        {isProjectModalOpen && (
          <ProjectModal
            project={projects[editingProjectIndex]}
            onSave={onSaveProject}
            onClose={onCloseProjectModal}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteProjectModal onConfirm={onConfirmDelete} onCancel={onCloseDeleteModal} />
        )}
      </>
    );
  }

  /* ── Dashboard ─────────────────────────────────────────── */
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
      <DashboardHeader onBackToHome={() => navigateToPage("hero")} />

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
              onSeeAll={() => navigateToPage("all-projects")}
            />
          </div>
        </div>

        {/* Activity timeline — full width below */}
        <div
          className="activity-section-wrapper"
          style={{ marginTop: "var(--space-xl)" }}
        >
          <ContentTimeline projects={projects} profile={profile} />
        </div>
      </div>

      <Footer />

      {isEditModalOpen && (
        <EditModal profile={profile} onClose={onCloseProfileModal} onSave={onSaveProfile} />
      )}
      {isProjectModalOpen && (
        <ProjectModal
          project={projects[editingProjectIndex]}
          onSave={onSaveProject}
          onClose={onCloseProjectModal}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteProjectModal onConfirm={onConfirmDelete} onCancel={onCloseDeleteModal} />
      )}
    </div>
  );
};

export default ProfilePage;
