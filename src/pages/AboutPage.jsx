import { motion } from "framer-motion";
import { Target, Lightbulb, Users, Zap, Shield, TrendingUp, ArrowRight } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader.jsx";
import Footer from "../components/Footer.jsx";

const AboutPage = ({ onBackToHome, onGoToDashboard }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: Target,
      title: "Centralized Dashboard",
      description: "All your projects, metrics, and activity in one unified interface designed for clarity and efficiency."
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track your progress with live metrics, growth trends, and detailed insights into your development journey."
    },
    {
      icon: Zap,
      title: "Quick Access",
      description: "Instantly view, edit, and manage your projects with an intuitive interface that saves you time."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is stored locally with complete privacy. No external servers, no data collection."
    },
    {
      icon: Users,
      title: "Portfolio Ready",
      description: "Showcase your best work with a professional profile that highlights your skills and achievements."
    },
    {
      icon: Lightbulb,
      title: "Smart Organization",
      description: "Automatically organized activity timeline keeps you informed about recent updates and milestones."
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--color-bg-base)",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <DashboardHeader onBackToHome={onBackToHome} />

      {/* Main Content */}
      <main style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "var(--spacing-10) var(--spacing-8)",
        flex: 1,
      }}>
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{
            textAlign: "center",
            marginBottom: "var(--spacing-10)",
          }}
        >
          <h2 
            style={{
              fontSize: "48px",
              fontWeight: "700",
              marginBottom: "var(--spacing-4)",
              letterSpacing: "-0.02em",
            }}
          >
            About{" "}
            <span style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
            }}>
              Devmate
            </span>
          </h2>
          <p style={{
            fontSize: "20px",
            lineHeight: "1.6",
            color: "var(--color-text-secondary)",
            maxWidth: "800px",
            margin: "0 auto",
          }}>
            Devmate is a centralized developer dashboard that helps developers manage their projects, 
            track activity, and visualize their progress in one place.
          </p>
        </motion.div>

        {/* Main Description Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          whileHover={{
            scale: 1.01,
            boxShadow: "0 10px 30px rgba(79, 70, 229, 0.1)",
            borderColor: "rgba(79, 70, 229, 0.6)",
            borderWidth: "1px",
            transition: { duration: 0.3 }
          }}
          className="card"
          style={{
            padding: "var(--spacing-8)",
            marginBottom: "var(--spacing-10)",
            transition: "all 0.3s ease",
          }}
        >
          <h3 style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "var(--spacing-4)",
            color: "var(--color-text-primary)",
          }}>
            A Living Developer Hub
          </h3>
          <p style={{
            fontSize: "16px",
            lineHeight: "1.8",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--spacing-4)",
            textAlign: "justify",
          }}>
            Devmate brings together key portfolio and dashboard features into a single interface, 
            making it easier to showcase work, monitor recent activity, and maintain a structured 
            view of ongoing development. It's designed to feel more like a living developer hub 
            than a static portfolio.
          </p>
          <p style={{
            fontSize: "16px",
            lineHeight: "1.8",
            color: "var(--color-text-secondary)",
            margin: 0,
            textAlign: "justify",
          }}>
            Built to address the fragmentation developers face when managing projects, portfolios, 
            and activity across multiple tools and platforms, Devmate provides a simple, focused 
            workspace with an emphasis on clarity, usability, and room to grow into deeper insights 
            and integrations over time.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <h3 style={{
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "var(--spacing-6)",
            color: "var(--color-text-primary)",
            textAlign: "center",
          }}>
            Key Features
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--spacing-5)",
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{
                  y: -5,
                  boxShadow: "0 12px 24px rgba(79, 70, 229, 0.12)",
                  borderColor: "rgba(124, 58, 237, 0.6)",
                  borderWidth: "1px",
                  transition: { duration: 0.1, ease: "easeOut" }
                }}
                className="card"
                style={{
                  padding: "var(--spacing-6)",
                  transition: "all 0.3s ease",
                }}
              >
                <motion.div 
                  whileHover={{ 
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: "var(--spacing-4)",
                  }}
                >
                  <feature.icon style={{ 
                    width: "32px", 
                    height: "32px", 
                    color: "var(--color-primary)" 
                  }} />
                </motion.div>
                <h4 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "var(--spacing-2)",
                  color: "var(--color-text-primary)",
                }}>
                  {feature.title}
                </h4>
                <p style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                  textAlign: "justify",
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          style={{
            textAlign: "center",
            marginTop: "var(--spacing-10)",
            padding: "var(--spacing-8)",
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            transition: "all 0.3s ease",
          }}
        >
          <h3 style={{
            fontSize: "28px",
            fontWeight: "600",
            marginBottom: "var(--spacing-3)",
            color: "var(--color-text-primary)",
          }}>
            Ready to get started?
          </h3>
          <p style={{
            fontSize: "16px",
            color: "var(--color-text-secondary)",
            marginBottom: "var(--spacing-5)",
          }}>
            Create your developer profile and start organizing your projects today.
          </p>
          <motion.button
            onClick={onGoToDashboard}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{
              marginTop: "var(--spacing-2)",
              padding: "16px 32px",
              fontSize: "16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-md)",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
            <ArrowRight style={{ width: "18px", height: "18px" }} />
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
