const AnalyticsSection = ({projects}) => {
  const validProjects = projects?.filter(p => p.title && p.title.trim() !== "") || [];
  const projectCount = validProjects.length;
  
  const stats = [
    { label: "Projects", value: projectCount },
    { label: "Activity", value: projectCount * 4 },
    { label: "Reach", value: projectCount > 0 ? `${(projectCount * 0.5).toFixed(1)}k` : "0" },
  ];

  const isEmpty = projectCount === 0;

  return (
    <section style={{ marginTop: "0" }}>
      <h2 style={{ 
        fontSize: "26px", 
        fontWeight: "800", 
        marginBottom: "10px", 
        letterSpacing: "-0.03em", 
        background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
        position: "relative",
      }}>
        Analytics Snapshot
      </h2>

      <p
        style={{
          fontSize: "14px",
          color: "var(--color-text-muted)",
          marginBottom: "20px",
          lineHeight: "1.5",
        }}
      >
        {isEmpty ? "Add projects to see analytics" : "Analytics preview (Detailed insights coming soon)"}
      </p>

      {/* Stat cards */ }
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
          marginBottom: "24px",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            style={{
              background: "var(--color-bg-surface)",
              padding: "14px 16px",
              borderRadius: "16px",
              boxShadow: "var(--shadow-md)",
              border: "1px solid var(--color-border)",
              transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "35px",
              justifyContent: "flex-start",
            }}
            className="stat-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "var(--shadow-xl), var(--shadow-glow-subtle)";
              e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.3)";
              e.currentTarget.style.background = "var(--color-bg-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.background = "var(--color-bg-surface)";
            }}
          >
            <div style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: index === 0 ? "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)" : 
                           index === 1 ? "radial-gradient(circle, rgba(141, 93, 255, 0.15) 0%, transparent 70%)" :
                           index === 2 ? "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)" :
                           "radial-gradient(circle, rgba(251, 125, 58, 0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            
            {/* Desktop: Horizontal layout */}
            <div className="stat-content-desktop" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--color-text-muted)",
                  margin: 0,
                  textTransform: "uppercase",
                  fontWeight: "600",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </p>
              <h3
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  margin: 0,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </h3>
            </div>

            {/* Mobile: Vertical layout */}
            <div className="stat-content-mobile" style={{ display: "none", flexDirection: "column", justifyContent: "center" }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--color-text-muted)",
                  margin: 0,
                  textTransform: "uppercase",
                  fontWeight: "600",
                  letterSpacing: "0.05em",
                }}
              >
                {stat.label}
              </p>
              <h3
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  marginTop: "6px",
                  marginBottom: "0",
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {isEmpty ? (
        <div
          style={{
            background: "var(--color-bg-surface)",
            borderRadius: "20px",
            padding: "40px 24px",
            boxShadow: "var(--shadow-lg)",
            border: "2px dashed var(--color-border)",
            textAlign: "center",
            transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)";
            e.currentTarget.style.boxShadow = "var(--shadow-xl), var(--shadow-glow-subtle)";
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
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            filter: "blur(40px)",
          }} />
          
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "28px",
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
            position: "relative",
          }}>
            📊
          </div>
          
          <p style={{
            fontSize: "16px",
            fontWeight: "700",
            color: "var(--color-text-primary)",
            marginBottom: "8px",
            letterSpacing: "-0.01em",
            position: "relative",
          }}>
            No analytics yet
          </p>
          
          <p style={{
            fontSize: "14px",
            color: "var(--color-text-muted)",
            margin: 0,
            lineHeight: "1.6",
            position: "relative",
          }}>
            Add your first project to start tracking growth
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "var(--color-bg-surface)",
            borderRadius: "20px",
            padding: "20px 24px 24px 24px",
            boxShadow: "var(--shadow-lg), var(--shadow-glow-subtle)",
            border: "1px solid var(--color-border)",
            position: "relative",
            overflow: "hidden",
            height: "275px"
          }}
        >
          <div style={{
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "60%",
          height: "200%",
          background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.12) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
        
        <h3 style={{ 
          fontSize: "11px", 
          fontWeight: "600", 
          color: "var(--color-text-muted)",
          marginBottom: "8px",
          marginTop: "0",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          Growth Trend
        </h3>
        
        <svg width="100%" height="220" viewBox="0 0 350 280" style={{ position: "relative", zIndex: 1 }}>
          {/* Grid */}
          {[40, 80, 120, 160, 200, 240].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="330"
              y2={y}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}

          {/* Gradient for area under curve */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Area under the line */}
          <path
            d={`M 0,240 L 55,210 L 110,215 L 165,185 L 220,175 L 275,155 L 330,${240 - projectCount * 35} L 330,280 L 0,280 Z`}
            fill="url(#chartGradient)"
          />

          {/* Line */}
          <polyline
            points={`0,240 55,210 110,215 165,185 220,175 275,155 330,${240 - projectCount * 35}`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))" }}
          />
          
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {/* Dots */}
          {[0, 55, 110, 165, 220, 275, 330].map((x, i) => {
            const y = [240, 210, 215, 185, 175, 155, 240 - projectCount * 35][i];
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="var(--color-bg-surface)"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  style={{ filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))" }}
                />
                <circle
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill="#3b82f6"
                  style={{
                    animation: `chartPulse 2s ease-in-out infinite ${i * 0.2}s`
                  }}
                />
              </g>
            );
          })}
        </svg>

        <p
          style={{
            fontSize: "12px",
            color: "var(--color-text-muted)",
            marginTop: "12px",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          Growth over time (preview)
        </p>
        </div>
      )}

      {/* shimmer keyframes */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
        `}
      </style>
    </section>
  );
};

export default AnalyticsSection;
