import { motion } from "framer-motion";
import { Target, Lightbulb, Users, Zap, Shield, TrendingUp, ArrowRight } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader.jsx";
import Footer from "../components/Footer.jsx";

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const features = [
  {
    icon: Target,
    title: "Centralized Dashboard",
    description:
      "All your projects, metrics, and activity in one unified interface designed for clarity and efficiency.",
  },
  {
    icon: TrendingUp,
    title: "Developer Momentum",
    description:
      "Get a clear snapshot of your progress with project counts, recent activity, and consistency streaks.",
  },
  {
    icon: Zap,
    title: "Quick Access",
    description:
      "Instantly view, edit, and manage your projects with an intuitive interface that saves you time.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is stored locally with complete privacy. No external servers, no data collection.",
  },
  {
    icon: Users,
    title: "Portfolio Ready",
    description:
      "Showcase your best work with a professional profile that highlights your skills and achievements.",
  },
  {
    icon: Lightbulb,
    title: "Smart Organization",
    description:
      "Automatically organized activity timeline keeps you informed about recent updates and milestones.",
  },
];

const AboutPage = ({ onBackToHome, onGoToDashboard }) => {
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
      <DashboardHeader onBackToHome={onBackToHome} />

      <main
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "var(--space-xl) var(--space-xl)",
          flex: 1,
          width: "100%",
        }}
      >
        {/* Page header — centred */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{ marginBottom: "var(--space-xl)", textAlign: "center" }}
        >
          <h1
            style={{
              fontSize: "var(--font-size-h1)",
              fontWeight: "var(--font-weight-semibold)",
              marginBottom: "var(--space-sm)",
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
            }}
          >
            About{" "}
            <span style={{ color: "var(--color-accent)" }}>Devmate</span>
          </h1>
          <p
            style={{
              fontSize: "17px",
              lineHeight: "var(--line-height-relaxed)",
              color: "var(--color-text-secondary)",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            A centralized developer dashboard to manage your projects, track activity, and visualize progress in one place.
          </p>
        </motion.div>

        {/* Description card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="card"
          style={{
            padding: "var(--space-lg)",
            marginBottom: "var(--space-xl)",
          }}
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
              marginBottom: "var(--space-md)",
              textAlign: "justify",
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
              textAlign: "justify",
            }}
          >
            Built to address the fragmentation developers face when managing projects, portfolios, and activity across multiple tools, Devmate provides a simple, focused workspace with an emphasis on clarity, usability, and room to grow into deeper insights over time.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <h2
            style={{
              fontSize: "var(--font-size-h2)",
              fontWeight: "var(--font-weight-semibold)",
              marginBottom: "var(--space-md)",
              color: "var(--color-text-primary)",
              textAlign: "center",
            }}
          >
            Key Features
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-sm)",
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="card"
                style={{ padding: "var(--space-lg)" }}
              >
                <feature.icon
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "var(--color-accent)",
                    marginBottom: "var(--space-md)",
                    display: "block",
                  }}
                />
                <h3
                  style={{
                    fontSize: "var(--font-size-sm)",
                    fontWeight: "var(--font-weight-semibold)",
                    marginBottom: "var(--space-xs)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-base)",
                    color: "var(--color-text-secondary)",
                    margin: 0,
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{
            textAlign: "center",
            marginTop: "var(--space-xl)",
            padding: "var(--space-xl)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
          }}
        >
          <h2
            style={{
              fontSize: "var(--font-size-h2)",
              fontWeight: "var(--font-weight-semibold)",
              marginBottom: "var(--space-sm)",
              color: "var(--color-text-primary)",
            }}
          >
            Ready to get started?
          </h2>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--space-lg)",
            }}
          >
            Create your developer profile and start organizing your projects today.
          </p>
          <button
            onClick={onGoToDashboard}
            className="btn-primary"
            style={{ padding: "12px 24px", fontSize: "var(--font-size-body)" }}
          >
            Go to Dashboard
            <ArrowRight style={{ width: "16px", height: "16px" }} />
          </button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
