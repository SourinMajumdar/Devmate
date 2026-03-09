import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Shield, Database, Zap, CheckCircle2,
  Users, Palette, Share2,
  UserCircle, FolderOpen, Github, Activity,
  BarChart3, Clock, Link2, LayoutDashboard,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import TechBadge from "../components/TechBadge.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";

/* Animations */
const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const viewport = { once: true, margin: "-40px" };

const currentFeatures = [
  {
    icon: UserCircle,
    label: "Developer Profile",
    desc: "Name, role, bio, photo, tech stack tags, and links to GitHub, LinkedIn, and your portfolio.",
  },
  {
    icon: FolderOpen,
    label: "Project Log",
    desc: "Add, edit, and delete projects with a title, description, tech stack, and an optional URL. Your latest three show on the dashboard; a dedicated page lists all of them.",
  },
  {
    icon: Github,
    label: "Overview & GitHub Activity",
    desc: "At-a-glance stats showing your project count, the latest activity from DevMate or GitHub, and your most recent commit — powered by the public GitHub API, no login required.",
  },
  {
    icon: Activity,
    label: "Unified Activity Feed",
    desc: "A merged, reverse-chronological timeline combining DevMate events (projects added, profile edits) with live GitHub activity (commits, PRs, issues). Up to 8 items shown.",
  },
  {
    icon: Users,
    label: "Multi-user & auth",
    desc: "Accounts, login, and backend persistence so your data isn't tied to a single browser.",
  },
  {
    icon: Share2,
    label: "Portfolio showcase",
    desc: "Have a shareable public URL for your DevMate profile to send to recruiters or collaborators.",
  },
];

/* Dashboard sections detail */
const dashboardSections = [
  {
    icon: UserCircle,
    label: "Profile",
    color: "#2563eb",
    bgColor: "rgba(37,99,235,0.08)",
    desc: "Your developer identity card. Set your name, role, bio, and avatar. Add tech stack tags to show your expertise and link out to GitHub, LinkedIn, and your portfolio.",
    details: ["Name, username & role", "Bio & avatar", "Tech stack tags", "GitHub, LinkedIn & Portfolio links"],
  },
  {
    icon: BarChart3,
    label: "Overview",
    color: "#f59e0b",
    bgColor: "rgba(245,158,11,0.08)",
    desc: "At-a-glance stats combining local project data with live GitHub activity. See your project count, the most recent event from any source, and your latest commit — plus a language breakdown chart.",
    details: ["Total projects logged", "Latest activity summary", "Latest GitHub commit", "Language breakdown chart"],
  },
  {
    icon: FolderOpen,
    label: "Projects",
    color: "#059669",
    bgColor: "rgba(5,150,105,0.08)",
    desc: "Your personal project log. Add projects with a title, description, tech stack, and optional link. Edit or delete anytime. Your latest three appear on the dashboard; all projects have their own dedicated page.",
    details: ["Add / edit / delete projects", "Tech stack per project", "Optional project URL", "View all projects page"],
  },
  {
    icon: Activity,
    label: "Activity Timeline",
    color: "#8b5cf6",
    bgColor: "rgba(139,92,246,0.08)",
    desc: "A unified reverse-chronological feed merging DevMate events (projects added, profile edits) with live GitHub activity (commits, PRs, issues and more).",
    details: ["DevMate & GitHub events merged", "Reverse-chronological order", "Up to 8 items shown", "GitHub source indicator"],
  },
];

/* â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const stackItems = [
  "React", "Vite", "JavaScript", "Framer Motion", "Supabase"
];


/* â”€â”€ Stat pill â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const StatPill = ({ value, label }) => (
  <div style={{ textAlign: "center", padding: "var(--space-lg) var(--space-md)" }}>
    <div
      style={{
        fontSize: "36px",
        fontWeight: "800",
        fontFamily: "var(--font-heading)",
        color: "var(--color-accent)",
        letterSpacing: "-0.04em",
        lineHeight: 1,
        marginBottom: "6px",
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: "var(--font-size-sm)",
        color: "var(--color-text-secondary)",
        fontWeight: "var(--font-weight-medium)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  </div>
);

const AboutPage = ({ onSignOut }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar onSignOut={onSignOut} />

      <main
        className="about-main"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "var(--space-xl) var(--space-xl)",
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-xl)",
        }}
      >
        {/* â”€â”€ Hero header â”€â”€ */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "var(--font-size-h1)",
              fontWeight: "700",
              marginBottom: "var(--space-sm)",
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
            }}
          >
            About <span style={{ color: "var(--color-accent)" }}>Devmate</span>
          </h1>
          <p
            style={{
              fontSize: "17px",
              lineHeight: "var(--line-height-relaxed)",
              color: "var(--color-text-secondary)",
              maxWidth: "580px",
              margin: "0 auto",
            }}
          >
            A local-first developer dashboard — manage projects, track activity, and
            showcase your work without accounts, servers, or complexity.
          </p>
        </motion.div>

        {/* â”€â”€ Living Developer Hub â”€â”€ */}
        <motion.div
          initial="hidden" animate="visible" variants={fadeIn}
          className="card"
          style={{ padding: "var(--space-lg)" }}
        >
          <h2
            style={{
              fontSize: "var(--font-size-h2)",
              fontWeight: "var(--font-weight-semibold)",
              marginBottom: "var(--space-md)",
              color: "var(--color-text-primary)",
            }}
          >
            A Living Developer Hub
          </h2>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              lineHeight: "var(--line-height-relaxed)",
              color: "var(--color-text-secondary)",
              margin: "0 0 var(--space-md) 0",
            }}
          >
            Devmate brings together key portfolio and dashboard features into a single interface, making it easier to showcase work, monitor recent activity, and maintain a structured view of ongoing development. It's designed to feel more like a living developer hub than a static portfolio.
          </p>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              lineHeight: "var(--line-height-relaxed)",
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            Built to address the fragmentation developers face when managing projects, portfolios, and activity across multiple tools, Devmate provides a simple, focused workspace with an emphasis on clarity, usability, and room to grow into deeper insights over time.
          </p>
        </motion.div>

        {/* â”€â”€ Dashboard sections overview â”€â”€ */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.div variants={fadeIn} style={{ marginBottom: "var(--space-lg)" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "8px",
              }}
            >
              Dashboard
            </p>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                fontFamily: "var(--font-heading)",
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "6px",
              }}
            >
              What's on your dashboard
            </h2>
            <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", margin: 0 }}>
              Four focused sections, each serving a distinct purpose.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            {dashboardSections.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="card about-dashboard-card"
                style={{ padding: "var(--space-lg)", display: "flex", gap: "var(--space-lg)", alignItems: "flex-start" }}
              >
                {/* Icon container — desktop only */}
                <div
                  className="about-icon-box"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "var(--radius-sm)",
                    background: s.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <s.icon style={{ width: "20px", height: "20px", color: s.color }} />
                </div>

                {/* Body */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Title row: raw icon (mobile only) + heading */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "var(--space-xs)" }}>
                    <s.icon
                      className="about-card-icon-inline"
                      style={{ width: "18px", height: "18px", color: s.color, flexShrink: 0 }}
                    />
                    <h3
                      style={{
                        fontSize: "var(--font-size-body)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--color-text-primary)",
                        margin: 0,
                      }}
                    >
                      {s.label}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: "var(--font-size-sm)",
                      color: "var(--color-text-secondary)",
                      lineHeight: "var(--line-height-base)",
                      margin: "0 0 var(--space-md) 0",
                    }}
                  >
                    {s.desc}
                  </p>

                  {/* Detail pills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)" }}>
                    {s.details.map((d, j) => (
                      <span
                        key={j}
                        style={{
                          fontSize: "var(--font-size-meta)",
                          fontWeight: "var(--font-weight-medium)",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          background: s.bgColor,
                          color: s.color,
                          border: `1px solid ${s.color}22`,
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* â”€â”€ Numbers strip â”€â”€ */}
        {/* <motion.div
          initial="hidden" whileInView="visible" viewport={viewport} variants={fadeIn}
          className="card about-stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            padding: 0,
          }}
        >
          <StatPill value="100%" label="Local — no backend" />
          <StatPill value="0" label="Servers or accounts" />
          <StatPill value="" label="Projects you can log" />
          <StatPill value="4" label="Core features" />
        </motion.div> */}

        

        {/* ==== Built with ===*/}
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.p
            variants={fadeIn}
            style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}
          >
            Stack
          </motion.p>
          <motion.h2
            variants={fadeIn}
            style={{ fontSize: "22px", fontWeight: "700", fontFamily: "var(--font-heading)", color: "var(--color-text-primary)", marginBottom: "var(--space-md)", letterSpacing: "-0.02em" }}
          >
            Built with
          </motion.h2>
          <motion.div variants={fadeIn} className="card" style={{ padding: "var(--space-lg)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)" }}>
              {stackItems.map((tech) => (
                <TechBadge key={tech} tech={tech} />
              ))}
            </div>
            <p
              style={{
                fontSize: "var(--font-size-sm)",
                color: "var(--color-text-secondary)",
                lineHeight: "var(--line-height-base)",
                marginTop: "var(--space-md)",
                marginBottom: 0,
              }}
            >
              Built with React and Vite on the front end, with Supabase handling
              authentication and data persistence for your profile and projects.
            </p>
          </motion.div>
        </motion.div>

        {/* â”€â”€ Current Features â”€â”€ */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.p
            variants={fadeIn}
            style={{ fontSize: "12px", fontWeight: "600", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}
          >
            Today
          </motion.p>
          <motion.h2
            variants={fadeIn}
            style={{ fontSize: "22px", fontWeight: "700", fontFamily: "var(--font-heading)", color: "var(--color-text-primary)", marginBottom: "var(--space-lg)", letterSpacing: "-0.02em" }}
          >
            What's in the app
          </motion.h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-sm)" }}>
            {currentFeatures.map((f, i) => (
              <motion.div
                key={i} variants={fadeIn} className="card"
                style={{ padding: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <f.icon style={{ width: "20px", height: "20px", color: "var(--color-accent)" }} />
                  <span
                    style={{
                      fontSize: "11px", fontWeight: "600", padding: "2px 8px",
                      borderRadius: "999px", background: "rgba(59,130,246,0.12)",
                      color: "var(--color-accent)", border: "1px solid var(--color-accent-border)",
                    }}
                  >
                    Live
                  </span>
                </div>
                <h3 style={{ fontSize: "var(--font-size-sm)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-text-primary)", margin: 0 }}>
                  {f.label}
                </h3>
                <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", lineHeight: "var(--line-height-base)", margin: 0 }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* â”€â”€ CTA â”€â”€ */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewport} variants={fadeIn}
          style={{
            textAlign: "center",
            padding: "var(--space-xl)",
            background: "var(--color-surface)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-border)",
          }}
        >
          <CheckCircle2
            style={{ width: "32px", height: "32px", color: "var(--color-accent)", margin: "0 auto var(--space-md)", display: "block" }}
          />
          <h2
            style={{ fontSize: "var(--font-size-h2)", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--space-sm)", color: "var(--color-text-primary)" }}
          >
            Ready to get started?
          </h2>
          <p style={{ fontSize: "var(--font-size-body)", color: "var(--color-text-secondary)", marginBottom: "var(--space-lg)" }}>
            Set up your profile and start logging projects in under a minute.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="btn-primary"
            style={{ padding: "12px 24px", fontSize: "var(--font-size-body)" }}
          >
            Go to Dashboard
            <ArrowRight style={{ width: "16px", height: "16px" }} />
          </button>
        </motion.div>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default AboutPage;

