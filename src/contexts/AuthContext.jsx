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

  // ── Bootstrap: get session + subscribe to auth changes ──────────
  useEffect(() => {
    // Grab the existing session (handles page reload and OAuth redirects)
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        loadUserData(currentUser.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await loadUserData(currentUser.id);
      } else {
        setProfile(null);
        setProjects([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadUserData(userId) {
    if (!userId) return;
    setLoading(true);
    try {
      const [profileData, projectsData] = await Promise.all([
        getProfile(userId),
        getProjects(userId),
      ]);
      setProfile(profileData);
      setProjects(projectsData || []);
    } catch (err) {
      console.error("[Devmate] Error loading user data:", err);
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
    const { data, error } = await supabase.auth.signUp({ email, password });
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
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    setUser(null);
    setProfile(null);
    setProjects([]);
    
    localStorage.clear();

    window.location.href = "/";
  }

  // ── Profile methods ───────────────────────────────────────────────

  /**
   * Save profile. If the avatar is a base64 data URL,
   * it is uploaded to Supabase Storage first.
   */
  async function saveProfile(profileData) {
    if (!user) throw new Error("Not authenticated");

    let avatarValue = profileData.avatar;

    if (avatarValue && avatarValue.startsWith("data:")) {
      try {
        avatarValue = await uploadAvatar(user.id, avatarValue);
      } catch (err) {
        console.warn("[Devmate] Avatar upload failed, skipping:", err.message);
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

  // ── Project methods ───────────────────────────────────────────────

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
        // auth
        signIn,
        signUp,
        signInWithGitHub,
        signOut,
        // data
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
