-- ============================================================
--  DEVMATE — Supabase Schema
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── 1. Profiles ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username      TEXT UNIQUE,
  name          TEXT,
  role          TEXT,
  bio           TEXT,
  location      TEXT,
  avatar_url    TEXT,
  tech          TEXT[]   DEFAULT '{}',
  github_url    TEXT,
  linkedin_url  TEXT,
  medium_url    TEXT,
  portfolio_url TEXT,
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. Projects ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  tech        TEXT[]   DEFAULT '{}',
  link        TEXT,
  github_link TEXT,
  live_link   TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. Row Level Security ────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, owner write
CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Projects: public read, owner write
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Users can insert own projects"
  ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE USING (auth.uid() = user_id);

-- ── 4. Storage — Avatars bucket ──────────────────────────────
-- Run the following in Supabase Dashboard → Storage → New Bucket
-- OR paste the SQL below:

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Avatars are publicly readable"
  ON storage.objects FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ── 5. Auth settings (manual steps) ─────────────────────────
-- In Supabase Dashboard → Authentication → URL Configuration:
--   Site URL:       http://localhost:5173          (dev)
--   Redirect URLs:  http://localhost:5173/**        (dev)
-- Also add your production URL when deploying.
--
-- To enable GitHub OAuth:
--   Authentication → Providers → GitHub → enable + add Client ID & Secret
