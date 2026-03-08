# Devmate

A developer dashboard to manage projects, track activity, and showcase your work. Sign up, log in, and sync your portfolio across devices with Supabase.

**Live app → [devmateui.vercel.app](https://devmateui.vercel.app)**

---

## What it does

| Feature | Details |
|---|---|
| **Authentication** | Sign up, log in, and secure account management via Supabase Auth |
| **Developer Profile** | Name, role, bio, photo, tech stack tags, GitHub / LinkedIn / portfolio links |
| **Project Log** | Add, edit, delete projects with title, description, tech stack, and URL |
| **Dashboard Overview** | Project count, latest activity, chart for all the tech used, top 3 used tech |
| **Multi-Device Sync** | All data persisted in Supabase - access your portfolio from anywhere |

Data is securely stored in Supabase with Row Level Security (RLS) policies ensuring users can only access their own data.

---

## Tech stack

- **React** 19 + **Vite** 7
- **React Router DOM** 7
- **Supabase** — authentication, PostgreSQL database, Row Level Security
- **Framer Motion** 12 — animations and 3D mockup tilt
- **Lucide React** — icons
- **Vanilla CSS** with CSS custom properties (design tokens)
- Dark mode default, togglable — theme persisted in `localStorage`

---

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build   # production build
npm run preview # preview production build
```

---

## Project structure

```
src/
├── components/       # Reusable UI components
│   ├── DashboardHeader.jsx
│   ├── LandingNav.jsx
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── DashboardMockup.jsx
│   ├── LandingSections.jsx
│   ├── ProfileHeader.jsx
│   ├── ProfilePreviewSection.jsx
│   ├── TechBadge.jsx
│   ├── LanguageChart.jsx
│   ├── ScrollToTopButton.jsx
│   ├── ThemeToggle.jsx
│   ├── Footer.jsx
│   ├── EditModal.jsx
│   ├── ProjectModal.jsx
│   ├── DeleteProjectModal.jsx
│   ├── ProtectedRoute.jsx    # Auth guard for protected pages
│   └── shared/
├── contexts/
│   ├── AuthContext.jsx       # Supabase authentication state
│   └── ThemeContext.jsx
├── pages/
│   ├── HeroPage.jsx
│   ├── AboutPage.jsx
│   ├── ProfilePage.jsx
│   └── AllProjectsPage.jsx
├── sections/
│   ├── AnalyticsSection.jsx
│   └── ProjectsSection.jsx
├── data/
│   ├── profile.js
│   ├── projects.js
│   └── sampleProfiles.js
├── App.jsx
├── main.jsx
└── index.css         # Design tokens + dark mode tokens + responsive overrides
```

---

## Database

The app uses **Supabase** with the following schema:

- **profiles** — User profile data (name, bio, tech stack, social links, avatar)
- **projects** — Project entries linked to user profiles
- **Row Level Security (RLS)** — All tables have RLS enabled, ensuring users can only access their own data

See [supabase/schema.sql](supabase/schema.sql) for the complete schema.

--
