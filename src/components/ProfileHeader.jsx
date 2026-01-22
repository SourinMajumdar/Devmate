import { Github, Linkedin, Globe, Pencil } from "lucide-react";

const ProfileHeader = ({ profile, onEditClick }) => {
  return (
    <div
      className="profile-card"
      style={{
        background: "var(--color-bg-surface)",
        borderRadius: "20px",
        padding: "32px",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--color-border)",
        position: "relative",
        transition: "all 350ms cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-xl), var(--shadow-glow)";
        e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.5)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Animated gradient border overlay */}
      <div style={{
        position: "absolute",
        inset: "-1px",
        borderRadius: "20px",
        padding: "1px",
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        opacity: 0,
        transition: "opacity 350ms ease",
        pointerEvents: "none",
      }} className="gradient-border" />
      {/* Edit Button with Icon + Text - Desktop */}
      <button
        onClick={onEditClick}
        className="edit-profile-button-desktop"
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid var(--color-border)",
          borderRadius: "10px",
          padding: "10px 14px",
          cursor: "pointer",
          color: "var(--color-text-secondary)",
          fontSize: "14px",
          fontWeight: "600",
          lineHeight: "1",
          transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.borderColor = "var(--color-border-strong)";
          e.currentTarget.style.color = "var(--color-text-primary)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.color = "var(--color-text-secondary)";
        }}
      >
        <Pencil style={{ width: "16px", height: "16px" }} />
        <span>Edit Profile</span>
      </button>

      {/* Header Row - Avatar + Name/Username */}
      <div className="profile-header-row" style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
        {/* Avatar */}
        <div
          className="profile-avatar"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "700",
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.1)",
            border: "3px solid rgba(59, 130, 246, 0.2)",
            letterSpacing: "-0.02em",
            flexShrink: 0,
          }}
        >
          {profile.name[0]}
        </div>

        {/* Name and Username */}
        <div>
          <h1 className="profile-name" style={{ margin: "0", fontSize: "28px", fontWeight: "700", letterSpacing: "-0.02em", lineHeight: "1.2", color: "var(--color-text-primary)" }}>
            {profile.name}
          </h1>
          <span className="profile-username" style={{ color: "var(--color-text-muted)", fontSize: "16px", fontWeight: "400", display: "block", marginTop: "4px" }}>
            {profile.username}
          </span>
        </div>
      </div>

      {/* Info Section - Below Avatar */}
      <div>
          {/* role */}
        <p className="profile-role" style={{ color: "var(--color-text-secondary)", marginTop: "0", fontSize: "18px", fontWeight: "500" }}>
          {profile.role}
        </p>
          {/* bio */}
        <p className="profile-bio" style={{ color: "var(--color-text-muted)", marginTop: "10px", fontSize: "14px", lineHeight: "1.6" }}>
          {profile.bio}
        </p>

        {/* Tech stack */}
        <div
          className="profile-tech-stack"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "14px",
          }}
        >
          {profile.tech.map((tech, index) => (
            <span
              key={tech}
              style={{
                background: index % 3 === 0 
                  ? "rgba(59, 130, 246, 0.1)" 
                  : index % 3 === 1 
                  ? "rgba(139, 92, 246, 0.1)" 
                  : "rgba(16, 185, 129, 0.1)",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                color: index % 3 === 0 
                  ? "var(--color-primary-light)" 
                  : index % 3 === 1 
                  ? "#a78bfa" 
                  : "#10b981",
                fontWeight: "500",
                border: index % 3 === 0 
                  ? "1px solid rgba(59, 130, 246, 0.2)" 
                  : index % 3 === 1 
                  ? "1px solid rgba(139, 92, 246, 0.2)" 
                  : "1px solid rgba(16, 185, 129, 0.2)",
                transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: index % 3 === 0 
                  ? "0 0 10px rgba(59, 130, 246, 0)" 
                  : index % 3 === 1 
                  ? "0 0 10px rgba(139, 92, 246, 0)" 
                  : "0 0 10px rgba(16, 185, 129, 0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = index % 3 === 0 
                  ? "rgba(59, 130, 246, 0.15)" 
                  : index % 3 === 1 
                  ? "rgba(139, 92, 246, 0.15)" 
                  : "rgba(16, 185, 129, 0.15)";
                e.currentTarget.style.borderColor = index % 3 === 0 
                  ? "rgba(59, 130, 246, 0.4)" 
                  : index % 3 === 1 
                  ? "rgba(139, 92, 246, 0.4)" 
                  : "rgba(16, 185, 129, 0.4)";
                e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
                e.currentTarget.style.boxShadow = index % 3 === 0 
                  ? "0 0 15px rgba(59, 130, 246, 0.6)" 
                  : index % 3 === 1 
                  ? "0 0 15px rgba(139, 92, 246, 0.6)" 
                  : "0 0 15px rgba(16, 185, 129, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = index % 3 === 0 
                  ? "rgba(59, 130, 246, 0.1)" 
                  : index % 3 === 1 
                  ? "rgba(139, 92, 246, 0.1)" 
                  : "rgba(16, 185, 129, 0.1)";
                e.currentTarget.style.borderColor = index % 3 === 0 
                  ? "rgba(59, 130, 246, 0.2)" 
                  : index % 3 === 1 
                  ? "rgba(139, 92, 246, 0.2)" 
                  : "rgba(16, 185, 129, 0.2)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = index % 3 === 0 
                  ? "0 0 10px rgba(59, 130, 246, 0)" 
                  : index % 3 === 1 
                  ? "0 0 10px rgba(139, 92, 246, 0)" 
                  : "0 0 10px rgba(16, 185, 129, 0)";
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="profile-links" style={{ marginTop: "16px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <a 
            href={profile.links.github} 
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-primary-light)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-primary)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Github style={{ width: "16px", height: "16px", marginRight: "6px", display: "inline-block", verticalAlign: "middle" }} />
            GitHub
          </a>
          <a 
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-primary-light)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-primary)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Linkedin style={{ width: "16px", height: "16px", marginRight: "6px", display: "inline-block", verticalAlign: "middle" }} />
            LinkedIn
          </a>
          <a 
            href={profile.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-primary-light)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-primary)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Globe style={{ width: "16px", height: "16px", marginRight: "6px", display: "inline-block", verticalAlign: "middle" }} />
            Portfolio
          </a>

          {/* Edit Button - Mobile */}
          <button
            onClick={onEditClick}
            className="edit-profile-button-mobile"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "var(--color-text-secondary)",
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "1",
              transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
              display: "none",
              alignItems: "center",
              marginLeft: "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "var(--color-border-strong)";
              e.currentTarget.style.color = "var(--color-text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text-secondary)";
            }}
          >
            <Pencil style={{ width: "14px", height: "14px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

const linkStyle = {
  fontSize: "14px",
  color: "var(--color-primary)",
  textDecoration: "none",
  fontWeight: "600",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  display: "inline-flex",
  alignItems: "center",
};

export default ProfileHeader;
