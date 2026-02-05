import { useState } from "react";
import { Code2 } from "lucide-react";
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

  // Profile
  onEditProfile,
  isEditModalOpen,
  onSaveProfile,
  onCloseProfileModal,

  // Projects
  onAddProject,
  onEditProject,
  isProjectModalOpen,
  editingProjectIndex,
  onSaveProject,
  onCloseProjectModal,

  // delete
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    navigateToPage("dashboard");
  };

  const handleLearnMore = () => {
    navigateToPage("about");
  };

  const handleBackToHome = () => {
    navigateToPage("hero");
  };

  const handleGoToDashboard = () => {
    navigateToPage("dashboard");
  };

  const handleSeeAllProjects = () => {
    navigateToPage("all-projects");
  };

  // Show hero page
  if (currentPage === "hero") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "var(--color-bg-base)",
        width: "100%",
      }}>
        <Hero 
          onGetStarted={handleGetStarted} 
          onLearnMore={handleLearnMore}
        />
        <Footer />
      </div>
    );
  }

  // Show about page
  if (currentPage === "about") {
    return (
      <AboutPage 
        onBackToHome={handleBackToHome}
        onGoToDashboard={handleGoToDashboard}
      />
    );
  }

  // Show all projects page
  if (currentPage === "all-projects") {
    return (
      <>
        <AllProjectsPage
          projects={projects}
          onAddProject={onAddProject}
          onEditProject={onEditProject}
          onDeleteProject={onDeleteProject}
          onBackToDashboard={handleGoToDashboard}
          onBackToHome={handleBackToHome}
        />

        {isProjectModalOpen && (
          <ProjectModal
            project={projects[editingProjectIndex]}
            onSave={onSaveProject}
            onClose={onCloseProjectModal}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteProjectModal
            onConfirm={onConfirmDelete}
            onCancel={onCloseDeleteModal}
          />
        )}
      </>
    );
  }

  // Show dashboard page
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--color-bg-base)",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Dashboard Header */}
      <DashboardHeader onBackToHome={handleBackToHome} />

      {/* Main container */}
      <div className="main-container" style={{
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
        padding: "var(--spacing-10) var(--spacing-8)",
        flex: 1,
      }}>
        {/* Two Column Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "700px 550px",
          gap: "var(--spacing-6)",
          alignItems: "start",
          width: "fit-content",
          margin: "0 auto 0 auto",
        }}
        className="main-grid"
        >
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6)" }}>
            {/* Profile Header */}
            <ProfileHeader
              profile={profile}
              onEditClick={onEditProfile}
            />

            {/* Analytics Snapshot */}
            <AnalyticsSection projects={projects}/>
          </div>

          {/* Right Column - Projects */}
          <div>
            <ProjectsSection
              projects={projects}
              onAddProject={onAddProject}
              onEditProject={onEditProject}
              onDeleteProject={onDeleteProject}
              onSeeAll={handleSeeAllProjects}
            />
          </div>
        </div>

        {/* Content Timeline - Full Width */}
        <div className="activity-section-wrapper" style={{ 
          marginTop: "var(--spacing-10)",
          width: "fit-content",
          margin: "var(--spacing-10) auto 0 auto",
        }}>
          <ContentTimeline projects={projects} profile={profile} />
        </div>
      </div>

      <Footer />

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditModal
          profile={profile}
          onClose={onCloseProfileModal}
          onSave={onSaveProfile}
        />
      )}

      {isProjectModalOpen && (
        <ProjectModal
          project={projects[editingProjectIndex]}
          onSave={onSaveProject}
          onClose={onCloseProjectModal}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteProjectModal
          onConfirm={onConfirmDelete}
          onCancel={onCloseDeleteModal}
        />
      )}

    </div>
  );
};

export default ProfilePage;
