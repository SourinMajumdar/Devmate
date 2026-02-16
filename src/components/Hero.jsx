import { Code2, ArrowRight, FileCodeCorner, BarChart3, Users } from "lucide-react";
import { motion } from "framer-motion";

const Hero = ({ onGetStarted, onLearnMore }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const features = [
    {
      icon: FileCodeCorner ,
      title: "Track unlimited projects",
      color: "var(--color-primary)"
    },
    {
      icon: BarChart3,
      title: "Real-time overview",
      color: "var(--color-primary)"
    },
    {
      icon: Users,
      title: "Professional showcase",
      color: "var(--color-primary)"
    }
  ];

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "64px var(--spacing-8)",
      background: "var(--color-bg-base)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Radial gradients - Static background */}
      {/* Purple gradient - Top left */}
      <div
        className="hero-gradient-purple"
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
      
      {/* Pink gradient - Bottom right */}
      <div
        className="hero-gradient-pink"
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
          backgroundImage: `linear-gradient(rgba(102, 126, 234, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(102, 126, 234, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: 0.4,
          pointerEvents: "none",
        }} 
      />

      {/* Main content container */}
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
          gap: "var(--spacing-10)",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left side - Text content */}
        <motion.div 
          variants={leftVariants}
          style={{
            textAlign: "left",
          }}
        >
          {/* Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "var(--spacing-6)",
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
              fontSize: "28px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "1px",
            }}>
              Devmate
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 
            className="hero-heading" 
            style={{
              fontSize: "56px",
              fontWeight: "700",
              lineHeight: "1.15",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              marginBottom: "var(--spacing-5)",
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
          </h1>

          {/* Subtitle */}
          <p 
            className="hero-subtitle" 
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "var(--color-text-secondary)",
              marginBottom: "var(--spacing-8)",
            }}
          >
            Manage your projects, track activity, and showcase your work with a professional dashboard built for developers.
          </p>

          {/* Feature Cards - Glassmorphism */}
          <div 
            className="hero-features-container"
            style={{
              display: "flex",
              gap: "var(--spacing-4)",
              flexWrap: "nowrap",
              marginBottom: "var(--spacing-8)",
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="hero-feature-card"
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 12px 48px rgba(102, 126, 234, 0.2)",
                  borderColor: "rgba(102, 126, 234, 0.73)",
                  borderWidth: "1px"
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "var(--spacing-3)",
                  background: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(10px) saturate(180%)",
                  WebkitBackdropFilter: "blur(10px) saturate(180%)",
                  border: "0.5px solid rgba(102, 126, 234, 0.2)",
                  borderRadius: "16px",
                  padding: "20px",
                  minWidth: "160px",
                  flex: "1",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                }}
              >
                <feature.icon style={{ 
                  width: "32px", 
                  height: "32px", 
                  color: feature.color,
                  strokeWidth: 2,
                  flexShrink: 0
                }} />
                <span style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "var(--color-text-primary)",
                  textAlign: "left",
                  lineHeight: "1.4",
                }}>
                  {feature.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div 
            style={{
              display: "flex",
              gap: "var(--spacing-4)",
              alignItems: "center",
              flexWrap: "wrap",
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
          </div>
        </motion.div>

        {/* Right side - Illustration */}
        <motion.div 
          variants={rightVariants}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Background decoration */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: "absolute",
              width: "80%",
              height: "80%",
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              filter: "blur(40px)",
            }}
          />
          
          {/* Illustration */}
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src="https://pixabay.com/get/gae47a16fa8f37bb50c5a26aeca2023ae971bdc0879de9ad0a9d1bbdf39442a89dd80de04e7226217feeed39255088ee5.svg"
            alt="development, web, design, graphic - illustration by graphicartsangla on Pixabay"
            style={{
              width: "100%",
              maxWidth: "500px",
              height: "auto",
              position: "relative",
              zIndex: 1,
              filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1))",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
