import { Code2, ArrowRight, FileCodeCorner, BarChart3, Users } from "lucide-react";
import { motion } from "framer-motion";
import illustration from "../assets/illustration.png";
import FeatureCard from "./shared/FeatureCard";

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
        padding: "var(--space-2xl) var(--space-xl)",
        background: "var(--color-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Purple radial gradient — top left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "-15%",
          width: "60%",
          height: "60%",
          background: "radial-gradient(circle at center, rgba(102, 126, 234, 0.25) 0%, rgba(102, 126, 234, 0.1) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Pink radial gradient — bottom right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-15%",
          width: "60%",
          height: "60%",
          background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.08) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

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
                color: "#667eea",
                strokeWidth: 2.5,
              }}
            />
            <span
              style={{
                fontFamily: "'Funnel Display', sans-serif",
                fontSize: "28px",
                fontWeight: "800",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "1px",
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

        {/* Right — Illustration */}
        <motion.div
          variants={rightVariants}
          className="hero-illustration-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={illustration}
            alt="Developer workspace illustration"
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "auto",
              filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.08))",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
