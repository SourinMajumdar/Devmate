import { Code2, ArrowRight, Sparkles, FileCodeCorner , Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const Hero = ({ onGetStarted, onLearnMore }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const features = [
    {
      icon: FileCodeCorner ,
      title: "Track unlimited",
      subtitle: "PROJECTS",
      color: "var(--color-primary)"
    },
    {
      icon: BarChart3,
      title: "Real-time insights",
      subtitle: "ANALYTICS",
      color: "var(--color-primary)"
    },
    {
      icon: Zap,
      title: "Professional showcase",
      subtitle: "PORTFOLIO",
      color: "var(--color-primary)"
    }
  ];

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "64px var(--spacing-8)",
      background: "var(--color-bg-base)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Radial gradients - Static background - More prominent */}
      {/* Purple gradient - Top left */}
      <div
        className="hero-gradient-purple"
        style={{
          position: "absolute",
          top: "-15%",
          left: "-15%",
          width: "70%",
          height: "70%",
          background: "radial-gradient(circle at center, rgba(102, 126, 234, 0.35) 0%, rgba(102, 126, 234, 0.15) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      
      {/* Pink gradient - Bottom right */}
      <div
        className="hero-gradient-pink"
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-15%",
          width: "70%",
          height: "70%",
          background: "radial-gradient(circle at center, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.12) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Cyan gradient - Center right */}
      <div
        className="hero-gradient-cyan"
        style={{
          position: "absolute",
          top: "25%",
          right: "-10%",
          width: "60%",
          height: "60%",
          background: "radial-gradient(circle at center, rgba(20, 184, 166, 0.25) 0%, rgba(20, 184, 166, 0.1) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Animated grid */}
      <motion.div 
        animate={{
          backgroundPosition: ["0px 0px", "50px 50px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(102, 126, 234, 0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(102, 126, 234, 0.15) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: 0.5,
          pointerEvents: "none",
        }} 
      />



      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          maxWidth: "900px", 
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "var(--spacing-8)",
          }}
        >
          <Code2 style={{ 
            width: "24px", 
            height: "24px",
            color: "#667eea",
            strokeWidth: 2.5,
          }} />
          <span style={{ 
            fontFamily: "'Funnel Display', sans-serif",
            fontSize: "32px",
            fontWeight: "800",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "1px",
            // textTransform: "uppercase",
          }}>
            Devmate
          </span>
        </motion.div>

        {/* Main Heading with animated gradient text */}
        <motion.h1 
          variants={itemVariants}
          className="hero-heading" 
          style={{
            fontSize: "64px",
            fontWeight: "700",
            lineHeight: "1.2",
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            marginBottom: "var(--spacing-8)",
          }}
        >
          Your developer journey,{" "}
          <span style={{ 
            background: `linear-gradient(135deg, var(--color-primary) 0%, #7c3aed 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            all in one place
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="hero-subtitle" 
          style={{
            fontSize: "20px",
            lineHeight: "1.8",
            color: "var(--color-text-secondary)",
            maxWidth: "650px",
            margin: "0 auto 48px",
          }}
        >
          Manage your projects, track activity, and showcase your work with a professional dashboard built for developers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          style={{
            display: "flex",
            gap: "var(--spacing-4)",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "56px",
          }}
        >
          <motion.button 
            onClick={onGetStarted}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(79, 70, 229, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{
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
            Get Started
            <ArrowRight style={{ width: "18px", height: "18px" }} />
          </motion.button>

          <motion.button 
            onClick={onLearnMore}
            whileHover={{ 
              scale: 1.05, 
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{
              padding: "16px 32px",
              fontSize: "16px",
              background: "transparent",
              color: "var(--color-text-secondary)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "var(--radius-md)",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="hero-stats" 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--spacing-5)",
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, borderColor: "var(--color-primary)" }}
              transition={{ duration: 0.2 }}
              style={{
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--spacing-5)",
                textAlign: "center",
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto var(--spacing-3)",
              }}>
                <feature.icon style={{ 
                  width: "32px", 
                  height: "32px", 
                  color: feature.color 
                }} />
              </div>
              <div style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "var(--color-text-primary)",
                marginBottom: "var(--spacing-1)",
              }}>
                {feature.title}
              </div>
              <div style={{
                fontSize: "11px",
                color: "var(--color-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: "500",
              }}>
                {feature.subtitle}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
