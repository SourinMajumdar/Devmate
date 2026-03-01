# Devmate

A local-first developer dashboard to manage projects, track activity, and showcase your work — no accounts, no servers, no setup.

**Live app → [devmateui.vercel.app](https://devmateui.vercel.app)**

---

## What it does

| Feature | Details |
|---|---|
| **Developer Profile** | Name, role, bio, photo, tech stack tags, GitHub / LinkedIn / portfolio links |
| **Project Log** | Add, edit, delete projects with title, description, tech stack, and URL |
| **Momentum Stats** | Auto-calculated: project count, latest activity, current streak, longest streak |
| **Activity Timeline** | Chronological log of every project add or update |

All data is stored in `localStorage`. Nothing leaves your browser.

---

## Tech stack

- **React** 19 + **Vite** 7
- **React Router DOM** 7
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
│   ├── Hero.jsx
│   ├── DashboardMockup.jsx
│   ├── LandingSections.jsx
│   ├── ProfilePreviewSection.jsx
│   ├── TechBadge.jsx
│   ├── ScrollToTopButton.jsx
│   ├── ThemeToggle.jsx
│   ├── Footer.jsx
│   ├── EditModal.jsx
│   ├── ProjectModal.jsx
│   └── DeleteProjectModal.jsx
├── contexts/
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

## Planned

- Multi-user support with accounts and a backend
- More themes
- GitHub sync — real commit activity pulled into the dashboard
