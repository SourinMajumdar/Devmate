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

  // ── Profile modal ──
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ── Project modal ──
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);

  // ── Delete modal ──
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDeleteIndex, setProjectToDeleteIndex] = useState(null);

  // ── Handlers: profile ──
  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditModalOpen(false);
  };

  // ── Handlers: projects ──
  const openAddProject = () => {
    setEditingProjectIndex(null);
    setIsProjectModalOpen(true);
  };

  const openEditProject = (index) => {
    setEditingProjectIndex(index);
    setIsProjectModalOpen(true);
  };

  const saveProject = (project) => {
    setProjects((prev) => {
      if (editingProjectIndex !== null) {
        const updated = [...prev];
        updated[editingProjectIndex] = project;
        return updated;
      }
      return [...prev, project];
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

  // ── Persist ──
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

      {/* ── Global modals ── */}
      {isEditModalOpen && (
        <EditModal
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
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
