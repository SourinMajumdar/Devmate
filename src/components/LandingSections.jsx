import { motion } from "framer-motion";
import { UserCircle, FolderOpen, ArrowRight, ChartColumn } from "lucide-react";
import ProfilePreviewSection from "./ProfilePreviewSection";

/* ── Shared animation ────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] },
  },
});

const viewportOpts = { once: true, margin: "-60px" };

/* ── Data ────────────────────────────────────────────── */
const features = [
  {
    icon: UserCircle,
    title: "Developer Profile",
    desc: "Fill in your name, role, bio and photo. Add your tech stack as tags and link your GitHub, LinkedIn and portfolio.",
  },
  {
    icon: FolderOpen,
    title: "Project Log",
    desc: "Add projects with a title, description, tech stack and a link. Edit or delete any time. Dashboard shows your latest three; see all on a dedicated page.",
  },
  {
    icon: ChartColumn,
    title: "Overview and Activity",
    desc: "Tracks the number of projects you've logged, recent activites accross GithHub and DevMate, and stats about languages and techs in your projects.",
  },
];

const steps = [
  {
    num: "01",
    title: "Set up your profile",
    desc: "Enter your name, role, bio and photo. Add tech tags and paste in your social links.",
  },
  {
    num: "02",
    title: "Log your projects",
    desc: "Add each project with a description, tech stack and a GitHub or live URL.",
  },
  {
    num: "03",
    title: "Watch your momentum",
    desc: "Tech stats and activity timeline update automatically every GitHub or dashboard activity.",
  },
];

/* ── Features Section ────────────────────────────────── */
const FeaturesSection = () => (
  <section
    className="landing-section"
    style={{
      padding: "88px var(--space-xl)",
      background: "var(--color-bg)",
    }}
  >
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Heading */}
      <motion.div
        variants={fadeUp()}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        style={{ textAlign: "center", marginBottom: "52px" }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "10px",
          }}
        >
          Features
        </p>
        <h2
          style={{
            fontSize: "38px",
            fontWeight: "700",
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
            marginBottom: "14px",
          }}
        >
          What Devmate actually does
        </h2>
        <p
          style={{
            fontSize: "17px",
            color: "var(--color-text-secondary)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: "1.7",
          }}
        >
          Devmate is a personal dashboard for developers to log projects, track them, and showcase their work as one shareable profile.
        </p>
      </motion.div>

      {/* Cards */}
      <div
        className="features-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            variants={fadeUp(i * 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOpts}
            className="card"
            style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Icon container — desktop only */}
            <div
              className="feature-icon-box"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "var(--color-accent-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <f.icon style={{ width: "20px", height: "20px", color: "var(--color-accent)", strokeWidth: 1.75 }} />
            </div>
            {/* Title row: raw icon (mobile only) + heading */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <f.icon
                className="feature-icon-inline"
                style={{ width: "18px", height: "18px", color: "var(--color-accent)", strokeWidth: 1.75, flexShrink: 0 }}
              />
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: "600",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-heading)",
                  margin: 0,
                }}
              >
                {f.title}
              </h3>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                lineHeight: "1.65",
                margin: 0,
              }}
            >
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── How It Works ────────────────────────────────────── */
const HowItWorksSection = () => (
  <section
    className="landing-section"
    style={{
      padding: "88px var(--space-xl)",
      background: "var(--color-bg)",
    }}
  >
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* Heading */}
      <motion.div
        variants={fadeUp()}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOpts}
        style={{ textAlign: "center", marginBottom: "60px" }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "10px",
          }}
        >
          How it works
        </p>
        <h2
          style={{
            fontSize: "38px",
            fontWeight: "700",
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Up and running in minutes
        </h2>
      </motion.div>

      {/* Steps */}
      <div
        className="steps-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "32px",
          position: "relative",
        }}
      >
        {/* Connector line */}
        <div
          className="steps-connector"
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "27px",
            left: "calc(16.6% + 20px)",
            right: "calc(16.6% + 20px)",
            height: "1px",
            background:
              "linear-gradient(90deg, var(--color-border) 0%, var(--color-accent) 50%, var(--color-border) 100%)",
            opacity: 0.5,
          }}
        />

        {steps.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUp(i * 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOpts}
            style={{ textAlign: "center", position: "relative", zIndex: 1 }}
          >
            {/* Numbered circle */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "var(--color-accent)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-heading)",
                fontWeight: "700",
                fontSize: "18px",
                margin: "0 auto 24px",
                boxShadow: "0 4px 16px rgba(37,99,235,0.28)",
              }}
            >
              {s.num}
            </div>
            <h3
              style={{
                fontSize: "17px",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-heading)",
                marginBottom: "10px",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "var(--color-text-secondary)",
                lineHeight: "1.65",
                maxWidth: "240px",
                margin: "0 auto",
              }}
            >
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── CTA Section ─────────────────────────────────────── */
const CTASection = ({ onGetStarted }) => (
  <section
    className="landing-section"
    style={{
      padding: "88px var(--space-xl)",
      background: "var(--color-bg)",
    }}
  >
    <motion.div
      variants={fadeUp()}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOpts}
      className="cta-card"
      style={{
        maxWidth: "640px",
        margin: "0 auto",
        textAlign: "center",
        background:
          "linear-gradient(135deg, var(--color-accent-subtle) 0%, var(--color-surface) 60%)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "60px 48px",
        boxShadow: "0 8px 32px rgba(37,99,235,0.08)",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "var(--color-accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 22px",
          boxShadow: "0 4px 16px rgba(37,99,235,0.28)",
        }}
      >
        <UserCircle style={{ width: "24px", height: "24px", color: "#fff" }} />
      </div>
      <h2
        style={{
          fontSize: "34px",
          fontWeight: "700",
          fontFamily: "var(--font-heading)",
          color: "var(--color-text-primary)",
          letterSpacing: "-0.02em",
          marginBottom: "14px",
        }}
      >
        Ready to build your developer brand?
      </h2>
      <p
        style={{
          fontSize: "16px",
          color: "var(--color-text-secondary)",
          lineHeight: "1.7",
          marginBottom: "36px",
          maxWidth: "480px",
          margin: "0 auto 36px",
        }}
      >
        Join developers who use Devmate to track their work and showcase their journey.
      </p>
      <button
        onClick={onGetStarted}
        className="btn-primary"
        style={{ padding: "13px 32px", fontSize: "15px", gap: "8px" }}
      >
        Get Started — it's free
        <ArrowRight style={{ width: "16px", height: "16px" }} />
      </button>
    </motion.div>
  </section>
);

/* ── Composite export ────────────────────────────────── */
const LandingSections = ({ onGetStarted }) => (
  <>
    <FeaturesSection />
    <ProfilePreviewSection />
    <HowItWorksSection />
    <CTASection onGetStarted={onGetStarted} />
  </>
);

export default LandingSections;
