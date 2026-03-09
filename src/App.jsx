import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import HeroPage from "./pages/HeroPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import AllProjectsPage from "./pages/AllProjectsPage";
import AuthPage from "./pages/AuthPage";
import PublicProfilePage from "./pages/PublicProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";

import ProjectModal from "./components/ProjectModal";
import DeleteProjectModal from "./components/DeleteProjectModal";
import EditModal from "./components/EditModal";
import SignOutModal from "./components/SignOutModal";

function App() {
  const { profile, projects, saveProfile, saveProject, deleteProject, loading, signOut } = useAuth();
  const navigate = useNavigate();
  // ── Profile modal ──────────────────────────────────────────────
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // ── Project modal ──────────────────────────────────────────────
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // ── Delete modal ───────────────────────────────────────────────
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDeleteId, setProjectToDeleteId] = useState(null);

  // ── Sign out modal ────────────────────────────────────────────
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  // ── Handlers: profile ──────────────────────────────────────────
  const handleSaveProfile = async (updatedProfile) => {
    try {
      await saveProfile(updatedProfile);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("[Devmate] Error saving profile:", err);
    }
  };

  // ── Handlers: projects ─────────────────────────────────────────
  const openAddProject = () => {
    setEditingProjectId(null);
    setIsProjectModalOpen(true);
  };

  const openEditProject = (projectId) => {
    setEditingProjectId(projectId);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (projectData) => {
    try {
      await saveProject(projectData);
      setIsProjectModalOpen(false);
      setEditingProjectId(null);
    } catch (err) {
      console.error("[Devmate] Error saving project:", err);
    }
  };

  const openDeleteProject = (projectId) => {
    setProjectToDeleteId(projectId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProject = async () => {
    try {
      await deleteProject(projectToDeleteId);
      setIsDeleteModalOpen(false);
      setProjectToDeleteId(null);
    } catch (err) {
      console.error("[Devmate] Error deleting project:", err);
    }
  };

  const editingProject = projects.find((p) => p.id === editingProjectId) ?? null;

  // ── Sign out handler ──────────────────────────────────────────
  const handleConfirmSignOut = async () => {
    try {
      await signOut();
      setIsSignOutModalOpen(false);
    } catch (err) {
      console.error("[Devmate] Sign out error:", err);
    }
  };

  return (
    <>
      <Routes>
        {/* ── Public routes ── */}
        <Route path="/" element={<HeroPage onSignOut={() => setIsSignOutModalOpen(true)} />} />
        <Route path="/about" element={<AboutPage onSignOut={() => setIsSignOutModalOpen(true)} />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/u/:username" element={<PublicProfilePage />} />

        {/* ── Protected routes ── */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProfilePage
                profile={profile || {}}
                projects={projects}
                onEditProfile={() => setIsEditModalOpen(true)}
                onAddProject={openAddProject}
                onEditProject={openEditProject}
                onDeleteProject={openDeleteProject}
                onSignOut={() => setIsSignOutModalOpen(true)}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <AllProjectsPage
                projects={projects}
                onAddProject={openAddProject}
                onEditProject={openEditProject}
                onDeleteProject={openDeleteProject}
                onSignOut={() => setIsSignOutModalOpen(true)}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={<HeroPage onSignOut={() => setIsSignOutModalOpen(true)} />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ── Global modals ── */}
      {!loading && isEditModalOpen && (
        <EditModal
          profile={profile || {}}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
          isSetup={profile === null}
        />
      )}
      {isProjectModalOpen && (
        <ProjectModal
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => {
            setIsProjectModalOpen(false);
            setEditingProjectId(null);
          }}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteProjectModal
          onConfirm={confirmDeleteProject}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setProjectToDeleteId(null);
          }}
        />
      )}
      {isSignOutModalOpen && (
        <SignOutModal
          isOpen={isSignOutModalOpen}
          onConfirm={handleConfirmSignOut}
          onCancel={() => setIsSignOutModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;
