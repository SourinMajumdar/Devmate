import { Code2, ArrowRight, FileCodeCorner, BarChart3, Users } from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "./shared/FeatureCard";
import DashboardMockup from "./DashboardMockup";

/* ── Floating tech icons around the mockup ── */
const TECH_ICONS = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",           label: "React",      style: { top: "-5%",   left: "30%" },    delay: 0,    size: 43 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", label: "TypeScript", style: { top: "6%",   right: "10%" },   delay: 0.7,  size: 40 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",         label: "Python",     style: { top: "36%",  left: "28%" },    delay: 1.2,  size: 42 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",         label: "Node.js",    style: { top: "38%",  right: "4%" },   delay: 0.4,  size: 43 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",         label: "Docker",     style: { bottom: "12%", right: "8%" }, delay: 1.0,  size: 44 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",        label: "PyTorch",    style: { bottom: "8%",  left: "6%" },   delay: 0.3,  size: 40 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",  label: "TensorFlow", style: { bottom: "-5%",  left: "60%" },  delay: 1.8,  size: 40 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",        label: "Go",         style: { top: "20%",  left: "2%" },    delay: 1.5,  size: 43 },
];

const FloatingTechIcons = () => (
  <>
    {TECH_ICONS.map(({ src, label, style, delay, size }) => (
      <motion.div
        key={label}
        aria-label={label}
        title={label}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.4, delay, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          ...style,
          width: "70px",
          height: "70px",
          borderRadius: "16px",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 4,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <img src={src} alt={label} width={size} height={size} style={{ display: "block" }} />
      </motion.div>
    ))}
  </>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const leftVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const rightVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
  },
};

const features = [
  { icon: FileCodeCorner, title: "Track unlimited projects" },
  { icon: BarChart3, title: "Real-time overview" },
  { icon: Users, title: "Professional showcase" },
];

const Hero = ({ onGetStarted, onLearnMore }) => {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-xs) var(--space-xl) var(--space-2xl)",
        background: "var(--color-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle static grid — very faint, no animation */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px),
                            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: "1200px",
          width: "100%",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-xl)",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left — Text content */}
        <motion.div variants={leftVariants} style={{ textAlign: "left" }}>
          {/* Logo / brand */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "var(--space-lg)",
            }}
          >
            <Code2
              style={{
                width: "24px",
                height: "24px",
                color: "var(--color-accent)",
                strokeWidth: 2.5,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "26px",
                fontWeight: "800",
                color: "var(--color-accent)",
                letterSpacing: "0.5px",
              }}
            >
              Devmate
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="hero-heading"
            style={{
              fontSize: "var(--font-size-display)",
              fontWeight: "var(--font-weight-medium)",
              lineHeight: "var(--line-height-tight)",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              marginBottom: "var(--space-md)",
            }}
          >
            Your developer journey,{" "}
            <span style={{ color: "var(--color-accent)", fontWeight: "700" }}>all in one place</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle"
            style={{
              fontSize: "17px",
              lineHeight: "var(--line-height-relaxed)",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-xl)",
              maxWidth: "480px",
            }}
          >
            Manage your projects, track activity, and showcase your work with a professional dashboard built for developers.
          </p>

          {/* Feature cards */}
          <div
            className="hero-features-container"
            style={{
              display: "flex",
              gap: "var(--space-sm)",
              flexWrap: "nowrap",
              marginBottom: "var(--space-xl)",
            }}
          >
            {features.map((feature, i) => (
              <FeatureCard key={i} icon={feature.icon} title={feature.title} />
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "var(--space-sm)",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={onGetStarted}
              className="btn-primary"
              style={{
                padding: "12px 24px",
                fontSize: "var(--font-size-body)",
                gap: "var(--space-sm)",
              }}
            >
              Get Started
              <ArrowRight style={{ width: "16px", height: "16px" }} />
            </button>

            <button
              onClick={onLearnMore}
              className="btn-secondary"
              style={{
                padding: "12px 24px",
                fontSize: "var(--font-size-body)",
              }}
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right — Animated Dashboard Mockup */}
        <motion.div
          variants={rightVariants}
          className="hero-illustration-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <FloatingTechIcons />
          <DashboardMockup />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
