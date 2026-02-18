# Devmate 🚀

Devmate is a modern developer dashboard to showcase projects, track activity, and visualize growth - all in one place.

## ✨ Features

### 🏠 Landing & Navigation
- **Hero Page**: Animated landing page with gradient effects and glassmorphic feature cards
- **About Page**: Detailed information showcasing 6 key features and benefits
- **Smooth Navigation**: Client-side routing with page state persistence

### 👤 Profile Management
- Developer profile header with editable information
- Custom profile fields: name, username, role, bio, location
- Tech stack tags and social links (GitHub, LinkedIn, Portfolio)
- LocalStorage persistence for profile data

### 📂 Project Management
- **Add unlimited projects** with title, description, tech stack, and links
- **Edit projects** with a dedicated modal interface
- **Delete projects** with confirmation modal
- **All Projects View**: Grid layout for browsing all projects
- Projects displayed in card format with tech stack badges
- LocalStorage persistence for project data

### 📊 Overview Dashboard
- **Project Count**: Total number of projects tracked
- **Latest Activity**: Most recent project updates with timestamps
- **Current Streak**: Consecutive active days with flame icon
- **Longest Streak**: Best consistency record with trophy icon
- Dynamic calculations based on project data

### 📅 Activity Timeline
- Automatically generated timeline based on projects
- Dynamic action verbs for project milestones
- Color-coded activity indicators (5 unique colors)
- Grid layout with hover effects
- Updates automatically when projects change

### 🎨 Design & UX
- Modern dashboard-style UI with custom design tokens
- Smooth animations powered by Framer Motion
- Hover effects and transitions throughout
- Responsive layout with CSS Grid
- Glassmorphic elements on hero page
- Radial gradient backgrounds

## 🛠️ Tech Stack

### Core
- **React** 19.2.0
- **Vite** 7.2.4
- **React Router DOM** 7.12.0

### Styling
- **Tailwind CSS** v4
- **Custom CSS** (design tokens and variables)
- **PostCSS** with Autoprefixer

### UI & Interactions
- **Framer Motion** 12.31.0 (animations)
- **Lucide React** 0.562.0 (icons)

### Development
- **ESLint** 9.39.1
- **@vitejs/plugin-react** 5.1.1

## 📦 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📁 Project Structure

```
devmate/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── DashboardHeader.jsx
│   │   ├── ProfileHeader.jsx
│   │   ├── Hero.jsx
│   │   ├── Footer.jsx
│   │   ├── EditModal.jsx
│   │   ├── ProjectModal.jsx
│   │   └── DeleteProjectModal.jsx
│   ├── pages/            # Page components
│   │   ├── ProfilePage.jsx
│   │   ├── AboutPage.jsx
│   │   └── AllProjectsPage.jsx
│   ├── sections/         # Dashboard sections
│   │   ├── AnalyticsSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   └── ContentTimeline.jsx
│   ├── data/             # Initial data templates
│   │   ├── profile.js
│   │   ├── projects.js
│   │   ├── analytics.js
│   │   └── content.js
│   ├── App.jsx           # Main app component with state management
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles and design tokens
├── public/               # Static assets
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 💾 Data Storage

All data is stored locally in your browser's localStorage:
- **Profile data**: `devmate-profile`
- **Projects data**: `devmate-projects`
- **Current page**: `devmate-current-page`

No external servers or databases required. Your data stays private and local.

## 🎯 Use Cases

- **Portfolio Showcase**: Present your projects professionally
- **Progress Tracking**: Monitor your development activity and consistency
- **Project Organization**: Keep all your projects in one centralized location
- **Activity Logging**: Automatic timeline of project updates
- **Developer Hub**: One-stop dashboard for your development journey

## 🔮 Future Roadmap

### Multi-User Platform
Currently, Devmate is a **client-side only application** with data stored in browser localStorage. The architecture is designed to be easily scalable into a **multi-user platform** with the following enhancements:

#### Backend Integration
- **User Authentication**: Add signup/login system with JWT or OAuth
- **Database**: Migrate from localStorage to a database (PostgreSQL, MongoDB, or Supabase)
- **RESTful API**: Create backend endpoints for profile and project management
- **Cloud Storage**: Store user data securely in the cloud

#### Multi-User Features
- **User Accounts**: Each developer gets their own account and dashboard
- **Public Profiles**: Share your developer profile via unique URLs
- **Team Collaboration**: Allow teams to share and collaborate on projects
- **Social Features**: Follow other developers, like projects, leave comments
- **Real Analytics**: Track actual activity from Git commits, CI/CD pipelines, or API integrations
- **Cross-Device Sync**: Access your dashboard from any device

#### Potential Tech Stack for Backend
- **Backend**: Node.js/Express, NestJS, or Django
- **Database**: PostgreSQL with Prisma ORM, or Supabase
- **Authentication**: NextAuth.js, Clerk, or Supabase Auth
- **Hosting**: Vercel, Railway, or AWS
- **Real-time Updates**: WebSockets or Server-Sent Events for live activity feeds

The current client-side architecture serves as a solid foundation and proof-of-concept that can be extended without major refactoring.

## 🚀 Built With Kombai

This project was accelerated using [Kombai](https://kombai.com) - AI-powered UI development tool.

---

Made with ❤️ for developers who want to track and showcase their work