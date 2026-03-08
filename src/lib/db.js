import { supabase } from "./supabase";

// ── Mappers ──────────────────────────────────────────────────────

function dbRowToProfile(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || "",
    username: row.username || "",
    role: row.role || "",
    bio: row.bio || "",
    location: row.location || "",
    avatar: row.avatar_url || "",
    tech: row.tech || [],
    links: {
      github: row.github_url || "",
      linkedin: row.linkedin_url || "",
      medium: row.medium_url || "",
      portfolio: row.portfolio_url || "",
    },
    updatedAt: row.updated_at,
  };
}

function dbRowToProject(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title || "",
    description: row.description || "",
    tech: row.tech || [],
    link: row.link || "",
    githubLink: row.github_link || "",
    liveLink: row.live_link || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ── Profile CRUD ─────────────────────────────────────────────────

/** Fetch the current user's profile (returns null if not set up yet). */
export async function getProfile(userId) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    // maybeSingle returns null if not found, error if query fails
    if (error) {
      console.warn("[Devmate] getProfile error for", userId, ":", error.message);
      return null;
    }
    return dbRowToProfile(data);
  } catch (err) {
    console.error("[Devmate] getProfile exception:", err);
    return null;
  }
}

/** Fetch a profile by username (for public /u/:username route). */
export async function getProfileByUsername(username) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error) throw error;
  return dbRowToProfile(data);
}

/** Create or update the current user's profile. */
export async function upsertProfile(userId, profileData) {
  const dbProfile = {
    id: userId,
    username: profileData.username || null,
    name: profileData.name || null,
    role: profileData.role || null,
    bio: profileData.bio || null,
    location: profileData.location || null,
    avatar_url: profileData.avatar || null,
    tech: profileData.tech || [],
    github_url: profileData.links?.github || null,
    linkedin_url: profileData.links?.linkedin || null,
    medium_url: profileData.links?.medium || null,
    portfolio_url: profileData.links?.portfolio || null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(dbProfile, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;
  return dbRowToProfile(data);
}

// ── Projects CRUD ─────────────────────────────────────────────────

/** Fetch all projects for a user. */
export async function getProjects(userId) {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("[Devmate] getProjects error for", userId, ":", error.message);
      return [];
    }
    return (data || []).map(dbRowToProject);
  } catch (err) {
    console.error("[Devmate] getProjects exception:", err);
    return [];
  }
}

/** Fetch all projects for a user by their profile UUID (for public pages). */
export async function getProjectsByProfileId(profileId) {
  return getProjects(profileId);
}

/** Create or update a project. Pass `project.id` (UUID) to update, omit for insert. */
export async function upsertProject(userId, project) {
  const now = new Date().toISOString();

  const dbProject = {
    user_id: userId,
    title: project.title,
    description: project.description || null,
    tech: project.tech || [],
    link: project.link || null,
    github_link: project.githubLink || null,
    live_link: project.liveLink || null,
    updated_at: now,
  };

  // Include id only if it's a valid UUID (not Date.now() number)
  const idIsUUID = project.id && /^[0-9a-f-]{36}$/.test(String(project.id));
  if (idIsUUID) {
    dbProject.id = project.id;
  } else {
    dbProject.created_at = now;
  }

  const { data, error } = await supabase
    .from("projects")
    .upsert(dbProject, { onConflict: idIsUUID ? "id" : undefined })
    .select()
    .single();

  if (error) throw error;
  return dbRowToProject(data);
}

/** Delete a project by its UUID. */
export async function deleteProjectById(projectId) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) throw error;
}

// ── Avatar Storage ────────────────────────────────────────────────

/**
 * Upload a base64 data URL as an avatar to Supabase Storage.
 * Returns the public URL of the uploaded file.
 */
export async function uploadAvatar(userId, base64DataUrl) {
  const response = await fetch(base64DataUrl);
  const blob = await response.blob();
  const ext = blob.type.split("/")[1] || "jpg";
  const filePath = `${userId}/avatar.${ext}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, blob, { upsert: true, contentType: blob.type });

  if (error) throw error;

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  return data.publicUrl;
}
