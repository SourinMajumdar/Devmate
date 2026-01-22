const About = () => {
  return (
    <section
      className="about-section"
      style={{
        maxWidth: "1250px",
        margin: "50px auto 40px auto",
        padding: "40px 32px",
        borderRadius: "20px",
        background: "var(--color-bg-surface)",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-lg)",
        position: "relative",
        overflow: "hidden",
        transition: "all 350ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-xl), var(--shadow-glow-subtle)";
        e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        e.currentTarget.style.borderColor = "var(--color-border)";
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: "absolute",
        top: "-30%",
        right: "-10%",
        width: "50%",
        height: "150%",
        background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <h3
        style={{
          fontSize: "26px",
          fontWeight: "800",
          marginBottom: "20px",
          marginTop: "0",
          letterSpacing: "-0.03em",
          background: "linear-gradient(135deg, #faa060 0%, #f66a3b 50%, #eb5d25 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 20px rgba(246, 178, 59, 0.3))",
          position: "relative",
          zIndex: 1,
        }}
      >
        What is Devmate?
      </h3>

      <div style={{
        position: "relative",
        zIndex: 1,
      }}>
        <p
          className="about-paragraph"
          style={{
            fontSize: "15px",
            color: "var(--color-text-secondary)",
            lineHeight: "1.8",
            marginBottom: "20px",
            textAlign: "justify",
          }}
        >
          Devmate is a centralized developer dashboard that helps developers manage their projects, 
          track activity, and visualize their progress in one place. 
          It brings together key portfolio and dashboard features into a single 
          interface, making it easier to showcase work, monitor recent activity, 
          and maintain a structured view of ongoing development.
        </p>

        <p
          className="about-paragraph"
          style={{
            fontSize: "15px",
            color: "var(--color-text-secondary)",
            lineHeight: "1.8",
            margin: 0,
            textAlign: "justify",
          }}
        >
          Devmate was built to address the fragmentation developers face when managing projects, 
          portfolios, and activity across multiple tools and platforms. 
          The goal is to create a simple, focused workspace that feels more like a living 
          developer hub than a static portfolio, with an emphasis on clarity, usability, 
          and room to grow into deeper insights and integrations over time.
        </p>
      </div>
    </section>
  );
};

export default About;
