import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  getProfile,
  getProjects,
  upsertProfile,
  upsertProject,
  deleteProjectById,
  uploadAvatar,
} from "../lib/db";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Bootstrap session ───────────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const currentUser = data.session?.user ?? null;

        if (!mounted) return;

        setUser(currentUser);

        if (currentUser) {
          await loadUserData(currentUser.id);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("[Devmate] Session bootstrap error:", err);
        setLoading(false);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;

      if (!mounted) return;

      setUser(currentUser);

      if (currentUser) {
        loadUserData(currentUser.id);
      } else {
        setProfile(null);
        setProjects([]);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ── Load user data ──────────────────────────────────────────────
  async function loadUserData(userId) {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [profileData, projectsData] = await Promise.all([
        getProfile(userId),
        getProjects(userId),
      ]);

      console.log("PROFILE DATA:", profileData);
      console.log("PROJECTS:", projectsData);

      setProfile(profileData ?? null);
      setProjects(projectsData ?? []);
    } catch (err) {
      console.error("[Devmate] Error loading user data:", err);
      setProfile(null);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  // ── Auth methods ─────────────────────────────────────────────────

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async function signInWithGitHub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });

    if (error) throw error;
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();

      setUser(null);
      setProfile(null);
      setProjects([]);

      localStorage.clear();

      // Navigation will be handled by the component
    } catch (err) {
      console.error("[Devmate] Sign out error:", err);
    }
  }

  // ── Profile methods ─────────────────────────────────────────────

  async function saveProfile(profileData) {
    if (!user) throw new Error("Not authenticated");

    let avatarValue = profileData.avatar;

    if (avatarValue && avatarValue.startsWith("data:")) {
      try {
        avatarValue = await uploadAvatar(user.id, avatarValue);
      } catch (err) {
        console.warn("[Devmate] Avatar upload failed:", err.message);
        avatarValue = "";
      }
    }

    const updated = await upsertProfile(user.id, {
      ...profileData,
      avatar: avatarValue,
    });

    setProfile(updated);
    return updated;
  }

  // ── Project methods ─────────────────────────────────────────────

  async function saveProject(projectData) {
    if (!user) throw new Error("Not authenticated");

    const saved = await upsertProject(user.id, projectData);

    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === saved.id);

      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = saved;
        return updated;
      }

      return [...prev, saved];
    });

    return saved;
  }

  async function deleteProject(projectId) {
    if (!user) throw new Error("Not authenticated");

    await deleteProjectById(projectId);

    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        projects,
        loading,
        signIn,
        signUp,
        signInWithGitHub,
        signOut,
        saveProfile,
        saveProject,
        deleteProject,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}