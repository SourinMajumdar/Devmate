-- ============================================================
-- DEVMATE — CLEAN SUPABASE SCHEMA
-- Run in: Supabase → SQL Editor → New Query
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. Profiles Table
-- ────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique,
  name text,
  role text,
  bio text,
  location text,
  avatar_url text,
  tech text[] default '{}',
  github_url text,
  linkedin_url text,
  medium_url text,
  portfolio_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
-- 2. Projects Table
-- ────────────────────────────────────────────────────────────
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  tech text[] default '{}',
  link text,
  github_link text,
  live_link text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_projects_user_id on public.projects(user_id);

-- ────────────────────────────────────────────────────────────
-- 3. Enable Row Level Security
-- ────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.projects enable row level security;

-- ────────────────────────────────────────────────────────────
-- 4. Profiles Policies
-- ────────────────────────────────────────────────────────────

-- Public can view profiles (for portfolio pages)
create policy "Profiles are publicly readable"
on public.profiles
for select
using (true);

-- User can insert their own profile
create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);

-- User can update their own profile
create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id);

-- ────────────────────────────────────────────────────────────
-- 5. Projects Policies
-- ────────────────────────────────────────────────────────────

-- Public can view projects
create policy "Projects are publicly readable"
on public.projects
for select
using (true);

-- User can insert their own projects
create policy "Users can insert own projects"
on public.projects
for insert
with check (auth.uid() = user_id);

-- User can update their own projects
create policy "Users can update own projects"
on public.projects
for update
using (auth.uid() = user_id);

-- User can delete their own projects
create policy "Users can delete own projects"
on public.projects
for delete
using (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────
-- 6. Auto-create profile when a user signs up
-- ────────────────────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

-- ────────────────────────────────────────────────────────────
-- 7. Storage bucket for avatars
-- ────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Public read
create policy "Avatar images are public"
on storage.objects
for select
using (bucket_id = 'avatars');

-- Authenticated users upload
create policy "Authenticated users upload avatars"
on storage.objects
for insert
with check (
  bucket_id = 'avatars'
  and auth.role() = 'authenticated'
);

-- Users update their avatar
create policy "Users update their avatar"
on storage.objects
for update
using (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Users delete their avatar
create policy "Users delete their avatar"
on storage.objects
for delete
using (
  bucket_id = 'avatars'
  and auth.uid()::text = (storage.foldername(name))[1]
);