import { useState, useEffect } from "react";
import ProfilePage from "./pages/ProfilePage";
import { profile as initialProfile } from "./data/profile";
import { projects as initialProjects } from "./data/projects";

function App() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("devmate-profile");
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("devmate-projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });
  // PROFILE MODAL
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // PROJECT MODAL (single source of truth)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);

  // delete project
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDeleteIndex, setProjectToDeleteIndex] = useState(null);


  // ---- PROFILE ----
  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditModalOpen(false);
  };

  // ---- PROJECTS ----
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
      // EDIT
      if (editingProjectIndex !== null) {
        const updated = [...prev];
        updated[editingProjectIndex] = project;
        return updated;
      }

      // ADD (unlimited)
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
    setProjects((prev) =>
      prev.filter((_, i) => i !== projectToDeleteIndex)
    );
    setIsDeleteModalOpen(false);
    setProjectToDeleteIndex(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProjectToDeleteIndex(null);
  };

  useEffect(() => {
    localStorage.setItem("devmate-projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("devmate-profile", JSON.stringify(profile));
  }, [profile]);


  return (
    <ProfilePage
      profile={profile}
      projects={projects}
      // Profile
      onEditProfile={() => setIsEditModalOpen(true)}
      isEditModalOpen={isEditModalOpen}
      onSaveProfile={handleSaveProfile}
      onCloseProfileModal={() => setIsEditModalOpen(false)}
      // Projects
      onAddProject={openAddProject}
      onEditProject={openEditProject}
      isProjectModalOpen={isProjectModalOpen}
      editingProjectIndex={editingProjectIndex}
      onSaveProject={saveProject}
      onCloseProjectModal={() => setIsProjectModalOpen(false)}

      // Delete project
      onDeleteProject={openDeleteProject}
      isDeleteModalOpen={isDeleteModalOpen}
      onConfirmDelete={confirmDeleteProject}
      onCloseDeleteModal={closeDeleteModal}
    />
  );
}

export default App;