const ContentTimeline = ({ projects, profile }) => {
  const DOT_COLORS = [
    {
      bg: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", // blue
      glow: "0 0 15px rgba(59, 130, 246, 0.6)",
      aura: "rgba(59, 130, 246, 0.14)",
    },
    {
      bg: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)", // violet
      glow: "0 0 15px rgba(139, 92, 246, 0.6)",
      aura: "rgba(139, 92, 246, 0.14)",
    },
    {
      bg: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)", // green
      glow: "0 0 15px rgba(34, 197, 94, 0.6)",
      aura: "rgba(34, 197, 94, 0.14)",
    },
    {
      bg: "linear-gradient(135deg, #f59e0b 0%, #b45309 100%)", // amber
      glow: "0 0 15px rgba(245, 158, 11, 0.6)",
      aura: "rgba(245, 158, 11, 0.14)",
    },
    {
      bg: "linear-gradient(135deg, #ec4899 0%, #9d174d 100%)", // pink
      glow: "0 0 15px rgba(236, 72, 153, 0.6)",
      aura: "rgba(236, 72, 153, 0.14)",
    },
  ];

  // Action verbs for variety
  const actionVerbs = ["Deployed", "Finished", "Launched", "Completed", "Built", "Released"];
  
  // Generate timeline from projects
  const validProjects = projects?.filter(p => p.title && p.title.trim() !== "") || [];
  const profileExists = profile?.name && profile.name.trim() !== "";
  
  const timeline = validProjects.map((project, index) => ({
    id: project.id || index,
    text: `${actionVerbs[index % actionVerbs.length]} ${project.title}`,
    time: index === 0 ? "Today" : 
          index === 1 ? "2 days ago" : 
          index === 2 ? "1 week ago" : 
          `${index} weeks ago`,
  }));

  // Add "Published a blog post" entry if profile exists
  if (profileExists) {
    timeline.push({
      id: "blog-post",
      text: "Published a blog post",
      time: validProjects.length > 0 ? `${validProjects.length + 1} weeks ago` : "2 weeks ago",
    });
  }

  const isEmpty = timeline.length === 0;

  return (
    <section style={{ marginTop: "24px", maxWidth: "1274px", margin: "24px auto 0 auto", position: "relative" }}>
      {/* Connecting line */}
      {!isEmpty && (
        <div style={{
          position: "absolute",
          left: "calc(50% - 1px)",
          top: "120px",
          width: "2px",
          height: "calc(100% - 140px)",
          background: "linear-gradient(180deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(16, 185, 129, 0.2) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }} className="timeline-line" />
      )}
      
      <h2 style={{ 
        fontSize: "26px", 
        fontWeight: "800", 
        marginBottom: "10px", 
        marginTop: "50px", 
        letterSpacing: "-0.03em", 
        background: "linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))",
        position: "relative",
      }}>
        Content Timeline
      </h2>

      <p
        style={{
          fontSize: "14px",
          color: "var(--color-text-muted)",
          marginBottom: "20px",
          lineHeight: "1.5",
        }}
      >
        {isEmpty ? "Your project timeline will appear here" : "Activity preview (Tracking coming soon)"}
      </p>

      {isEmpty ? (
        <div
          style={{
            background: "var(--color-bg-surface)",
            borderRadius: "20px",
            padding: "48px 32px",
            boxShadow: "var(--shadow-lg)",
            border: "2px dashed var(--color-border)",
            textAlign: "center",
            transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.4)";
            e.currentTarget.style.boxShadow = "var(--shadow-xl), 0 0 30px -5px rgba(16, 185, 129, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
          }}
        >
          <div style={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "250px",
            height: "250px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(50px)",
          }} />
          
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "32px",
            boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
            position: "relative",
          }}>
            📅
          </div>
          
          <p style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "var(--color-text-primary)",
            marginBottom: "8px",
            letterSpacing: "-0.01em",
            position: "relative",
          }}>
            No activity yet
          </p>
          
          <p style={{
            fontSize: "14px",
            color: "var(--color-text-muted)",
            margin: 0,
            lineHeight: "1.6",
            maxWidth: "400px",
            margin: "0 auto",
            position: "relative",
          }}>
            Your timeline will automatically track when you add projects
          </p>
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          position: "relative",
          zIndex: 1,
        }}
        className="timeline-grid"
        >
        {timeline.map((item, index) => {
          const color = DOT_COLORS[index % DOT_COLORS.length];

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
                background: "var(--color-bg-surface)",
                padding: "18px 20px",
                borderRadius: "14px",
                boxShadow: "var(--shadow-md)",
                border: "1px solid var(--color-border)",
                transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg), var(--shadow-glow-subtle)";
                e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.3)";
                e.currentTarget.style.background = "var(--color-bg-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.background = "var(--color-bg-surface)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${color.aura} 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Timeline dot */}
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: color.bg,
                  marginTop: "4px",
                  flexShrink: 0,
                  boxShadow: color.glow,
                }}
              />

              {/* Content */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--color-text-primary)",
                    margin: 0,
                    fontWeight: "600",
                    lineHeight: "1.5",
                  }}
                >
                  {item.text}
                </p>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-text-muted)",
                    fontWeight: "500",
                  }}
                >
                  {item.time}
                </span>
              </div>
            </div>
          );
        })}
        </div>
      )}
    </section>
  );
};

export default ContentTimeline;