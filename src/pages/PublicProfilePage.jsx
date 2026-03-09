import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Code2, AlertCircle } from "lucide-react";
import { getProfileByUsername } from "../lib/db";
import { getProjectsByProfileId } from "../lib/db";
import { extractGitHubUsername } from "../utils/github";
import { useGitHubActivity } from "../hooks/useGitHubActivity";
import ProfileHeader from "../components/ProfileHeader";
import AnalyticsSection from "../sections/AnalyticsSection";
import ProjectsSection from "../sections/ProjectsSection";
import ContentTimeline from "../sections/ContentTimeline";
import LanguageChart from "../components/LanguageChart";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

const PublicProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!username) return;
    setLoading(true);
    setNotFound(false);

    getProfileByUsername(username)
      .then(async (prof) => {
        setProfile(prof);
        const projs = await getProjectsByProfileId(prof.id);
        setProjects(projs || []);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [username]);

  const githubUsername = extractGitHubUsername(
    profile?.githubUsername || profile?.links?.github || ""
  );

  const { events: ghEvents, loading: ghLoading } = useGitHubActivity(githubUsername);

  // ── Loading state ──
  if (loading) {
    return (
      <div style={centeredPageStyle}>
        <MiniNav />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", marginTop: "160px" }}>
          <div style={spinnerStyle} />
          <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
            Loading profile…
          </span>
        </div>
      </div>
    );
  }

  // ── Not found state ──
  if (notFound || !profile) {
    return (
      <div style={centeredPageStyle}>
        <MiniNav />
        <div style={notFoundCardStyle}>
          <div style={iconCircleStyle}>
            <AlertCircle style={{ width: "22px", height: "22px", color: "var(--color-text-muted)" }} />
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 8px", fontFamily: "var(--font-heading)" }}>
            Profile not found
          </h2>
          <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", margin: "0 0 24px" }}>
            @{username} hasn't set up their Devmate profile yet.
          </p>
          <Link to="/" className="btn-primary" style={{ textDecoration: "none", padding: "10px 20px" }}>
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const validProjects = projects.filter((p) => p.title?.trim());

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", width: "100%", display: "flex", flexDirection: "column" }}>
      <MiniNav />

      <div
        className="main-container"
        style={{
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          padding: "var(--space-xl) var(--space-xl)",
          flex: 1,
        }}
      >
        {/* Profile header — read-only (no edit click) */}
        <ProfileHeader profile={profile} onEditClick={null} isReadOnly />

        {/* Two-column layout */}
        <div
          className="profile-content-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "var(--space-lg)",
            marginTop: "var(--space-lg)",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            <AnalyticsSection projects={projects} />
            <LanguageChart projects={validProjects} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            <ProjectsSection
              projects={projects}
              onAddProject={null}
              onEditProject={null}
              onDeleteProject={null}
              onSeeAll={null}
              isReadOnly
            />
            <ContentTimeline
              projects={projects}
              profile={profile}
              ghEvents={ghEvents}
              ghLoading={ghLoading}
              githubUsername={githubUsername}
            />
          </div>
        </div>

        {/* Devmate CTA */}
        <div style={ctaBannerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Code2 style={{ width: "16px", height: "16px", color: "var(--color-accent)" }} />
            <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>
              Powered by{" "}
              <Link to="/" style={{ color: "var(--color-accent)", fontWeight: "var(--font-weight-semibold)" }}>
                Devmate
              </Link>
            </span>
          </div>
          <Link
            to="/login?mode=signup"
            className="btn-primary"
            style={{ textDecoration: "none", padding: "8px 16px", fontSize: "var(--font-size-meta)" }}
          >
            Get your profile →
          </Link>
        </div>
      </div>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

/** Minimal navbar shown on public profile pages */
const MiniNav = () => {
  const navigate = useNavigate();
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--color-header-bg)",
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
        padding: "var(--space-sm) 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 var(--space-xl)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Code2 style={{ width: "20px", height: "20px", color: "var(--color-accent)", strokeWidth: 2.5 }} />
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: "800", color: "var(--color-accent)" }}>
            Devmate
          </span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            to="/login?mode=signup"
            className="btn-primary"
            style={{ textDecoration: "none", padding: "7px 16px", fontSize: "var(--font-size-meta)" }}
          >
            Get Started
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

// ── Styles ─────────────────────────────────────────────────────────

const centeredPageStyle = {
  minHeight: "100vh",
  background: "var(--color-bg)",
  display: "flex",
  flexDirection: "column",
};

const notFoundCardStyle = {
  maxWidth: "380px",
  margin: "120px auto 0",
  textAlign: "center",
  padding: "40px 32px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-base)",
};

const iconCircleStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  background: "var(--color-bg-elevated)",
  border: "1px solid var(--color-border)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
};

const spinnerStyle = {
  width: "36px",
  height: "36px",
  border: "3px solid var(--color-border)",
  borderTopColor: "var(--color-accent)",
  borderRadius: "50%",
  animation: "spin 0.7s linear infinite",
};

const ctaBannerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "12px",
  marginTop: "var(--space-xl)",
  padding: "16px 20px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius)",
  boxShadow: "var(--shadow-base)",
};

export default PublicProfilePage;
