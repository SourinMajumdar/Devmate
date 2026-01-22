import { useState } from "react";
import { Code2 } from "lucide-react";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import ContentTimeline from "../sections/ContentTimeline.jsx";
import AnalyticsSection from "../sections/AnalyticsSection.jsx";
import EditModal from "../components/EditModal.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import DeleteProjectModal from "../components/DeleteProjectModal.jsx";
import Footer from "../components/Footer.jsx";
import About from "../components/About.jsx";

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
  const [titleHovered, setTitleHovered] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--color-bg-base)",
      width: "100%",
      position: "relative",
      zIndex: 1,
    }}>
      {/* Main container - Horizontally Centered */}
      <div className="main-container" style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "40px 32px",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Page Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "48px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(60px)",
          }} />
          
          <div 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
              cursor: "pointer",
            }}
            onMouseEnter={() => setTitleHovered(true)}
            onMouseLeave={() => setTitleHovered(false)}
          >
            <Code2 
              className="page-icon"
              style={{ 
                width: "45px", 
                height: "45px", 
                color: "var(--color-primary)",
                filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))",
                transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                transform: titleHovered ? "rotate(180deg)" : "rotate(0deg)",
              }} 
            />
            <h1 
              className={`page-heading ${titleHovered ? 'hovered' : ''}`}
              style={{
              fontSize: titleHovered ? "52px" : "48px",
              fontWeight: "800",
              margin: 0,
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
              transition: "font-size 250ms cubic-bezier(0.4, 0, 0.2, 1)",
              height: "52px",
              display: "flex",
              alignItems: "center",
              filter: titleHovered ? "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))" : "none",
            }}>
              Devmate
            </h1>
          </div>
          
          <p className="page-subtitle" style={{
            fontSize: "16px",
            color: "var(--color-text-muted)",
            margin: 0,
            fontWeight: "500",
          }}>
            Your all-in-one developer portfolio dashboard
          </p>
        </div>

        {/* Two Column Layout - Profile + Analytics | Projects */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "700px 550px",
          gap: "24px",
          alignItems: "start",
          marginBottom: "24px",
          width: "fit-content",
          margin: "0 auto 24px auto",
        }}
        className="main-grid"
        >
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
            />
          </div>
        </div>

        {/* Content Timeline - Full Width */}
        <ContentTimeline projects={projects} profile={profile} />
      </div>

      <About/>
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
