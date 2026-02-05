import DashboardHeader from "../components/DashboardHeader.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import Footer from "../components/Footer.jsx";

const AllProjectsPage = ({
  projects,
  onAddProject,
  onEditProject,
  onDeleteProject,
  onBackToDashboard,
  onBackToHome,
}) => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--color-bg-base)",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Dashboard Header */}
      <DashboardHeader 
        onBackToHome={onBackToHome}
        onBackToDashboard={onBackToDashboard}
      />

      {/* Main container */}
      <div className="main-container" style={{
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
        padding: "var(--spacing-10) var(--spacing-8)",
        flex: 1,
      }}>
        {/* Projects Section - Full View */}
        <ProjectsSection
          projects={projects}
          onAddProject={onAddProject}
          onEditProject={onEditProject}
          onDeleteProject={onDeleteProject}
          isAllProjectsView={true}
        />
      </div>

      <Footer />
    </div>
  );
};

export default AllProjectsPage;
