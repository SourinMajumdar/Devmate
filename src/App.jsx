import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { profile as initialProfile } from "./data/profile";
import { projects as initialProjects } from "./data/projects";

import HeroPage from "./pages/HeroPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import AllProjectsPage from "./pages/AllProjectsPage";
import ProjectModal from "./components/ProjectModal";
import DeleteProjectModal from "./components/DeleteProjectModal";
import EditModal from "./components/EditModal";

function App() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("devmate-profile");
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("devmate-projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  // â”€â”€ Profile modal â”€â”€
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // â”€â”€ Project modal â”€â”€
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);

  // â”€â”€ Delete modal â”€â”€
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDeleteIndex, setProjectToDeleteIndex] = useState(null);

  // â”€â”€ Handlers: profile â”€â”€
  const handleSaveProfile = (updatedProfile) => {
    setProfile({ ...updatedProfile, updatedAt: new Date().toISOString() });
    setIsEditModalOpen(false);
  };

  // â”€â”€ Handlers: projects â”€â”€
  const openAddProject = () => {
    setEditingProjectIndex(null);
    setIsProjectModalOpen(true);
  };

  const openEditProject = (index) => {
    setEditingProjectIndex(index);
    setIsProjectModalOpen(true);
  };

  const saveProject = (project) => {
    const now = new Date().toISOString();
    setProjects((prev) => {
      if (editingProjectIndex !== null) {
        const updated = [...prev];
        updated[editingProjectIndex] = { ...project, updatedAt: now, createdAt: prev[editingProjectIndex]?.createdAt || now };
        return updated;
      }
      return [...prev, { ...project, createdAt: now, updatedAt: now }];
    });
    setIsProjectModalOpen(false);
    setEditingProjectIndex(null);
  };

  const openDeleteProject = (index) => {
    setProjectToDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProject = () => {
    setProjects((prev) => prev.filter((_, i) => i !== projectToDeleteIndex));
    setIsDeleteModalOpen(false);
    setProjectToDeleteIndex(null);
  };

  // â”€â”€ Persist â”€â”€
  useEffect(() => {
    localStorage.setItem("devmate-projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("devmate-profile", JSON.stringify(profile));
  }, [profile]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HeroPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route
          path="/dashboard"
          element={
            <ProfilePage
              profile={profile}
              projects={projects}
              onEditProfile={() => setIsEditModalOpen(true)}
              onAddProject={openAddProject}
              onEditProject={openEditProject}
              onDeleteProject={openDeleteProject}
            />
          }
        />

        <Route
          path="/projects"
          element={
            <AllProjectsPage
              projects={projects}
              onAddProject={openAddProject}
              onEditProject={openEditProject}
              onDeleteProject={openDeleteProject}
            />
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* â”€â”€ Global modals â”€â”€ */}
      {isEditModalOpen && (
        <EditModal
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
          isSetup={!profile.name}
        />
      )}
      {isProjectModalOpen && (
        <ProjectModal
          project={projects[editingProjectIndex]}
          onSave={saveProject}
          onClose={() => setIsProjectModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteProjectModal
          onConfirm={confirmDeleteProject}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setProjectToDeleteIndex(null);
          }}
        />
      )}
    </>
  );
}

export default App;


