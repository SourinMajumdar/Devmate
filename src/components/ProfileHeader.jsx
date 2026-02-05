import { Github, Linkedin, Globe, Pencil, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

const ProfileHeader = ({ profile, onEditClick }) => {
  const isEmpty =
  !profile.name &&
  !profile.username &&
  !profile.role &&
  !profile.bio;
  
  if (isEmpty) {
    return (
      <div style={{
        background: "var(--color-bg-surface)",
        border: "1.5px dashed var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-10) var(--spacing-8)",
        textAlign: "center",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "var(--color-primary-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto var(--spacing-4)",
        }}>
          <UserCircle style={{ width: "24px", height: "24px", color: "var(--color-primary)" }} />
        </div>

        <h3 style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "var(--color-text-primary)",
          marginBottom: "var(--spacing-2)",
        }}>
          No profile yet
        </h3>

        <p style={{
          fontSize: "14px",
          color: "var(--color-text-secondary)",
          marginBottom: "var(--spacing-5)",
          lineHeight: "1.5",
        }}>
          Create your profile to get started
        </p>

        <button
          onClick={onEditClick}
          className="btn-primary"
        >
          Create Profile
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="profile-card card"
      style={{
        padding: "var(--spacing-6)",
        position: "relative",
        border: "2px solid var(--color-border)",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
      }}
    >
      {/* Edit Button - Desktop */}
      <button
        onClick={onEditClick}
        className="edit-profile-button-desktop btn-secondary"
        style={{
          position: "absolute",
          top: "var(--spacing-4)",
          right: "var(--spacing-4)",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <Pencil style={{ width: "14px", height: "14px" }} />
        <span>Edit</span>
      </button>

      {/* Header Row */}
      <div className="profile-header-row" style={{ 
        display: "flex", 
        gap: "var(--spacing-4)", 
        alignItems: "center", 
        marginBottom: "var(--spacing-4)" 
      }}>
        {/* Avatar */}
        <div
          className="profile-avatar"
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: "600",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
          }}
        >
          {profile.name[0]}
        </div>

        {/* Name and Username */}
        <div>
          <h1 className="profile-name" style={{ 
            fontSize: "24px", 
            fontWeight: "600", 
            color: "var(--color-text-primary)",
            marginBottom: "var(--spacing-1)",
          }}>
            {profile.name}
          </h1>
          <span className="profile-username" style={{ 
            color: "var(--color-text-tertiary)", 
            fontSize: "14px",
          }}>
            {profile.username}
          </span>
        </div>
      </div>

      {/* Info */}
      <div>
        <p className="profile-role" style={{ 
          color: "var(--color-text-secondary)", 
          fontSize: "15px", 
          fontWeight: "500",
          marginBottom: "var(--spacing-2)",
        }}>
          {profile.role}
        </p>

        <p className="profile-bio" style={{ 
          color: "var(--color-text-secondary)", 
          fontSize: "14px", 
          lineHeight: "1.6",
          marginTop: "var(--spacing-2)",
        }}>
          {profile.bio}
        </p>

        {/* Tech stack */}
        <div
          className="profile-tech-stack"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--spacing-2)",
            marginTop: "var(--spacing-4)",
          }}
        >
          {profile.tech.map((tech) => (
              <span
                key={tech}
                style={{
                  background: "#eff6ff",
                  padding: "6px 12px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "12px",
                  color: "#3b82f6",
                  fontWeight: "500",
                  border: "1px solid #dbeafe",
                }}
              >
                {tech}
              </span>
            ))}
        </div>

        {/* Links */}
        <div className="profile-links" style={{ 
          marginTop: "var(--spacing-4)", 
          display: "flex", 
          gap: "var(--spacing-4)", 
          flexWrap: "wrap", 
          alignItems: "center" 
        }}>
          <a 
            href={profile.links.github} 
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "14px",
              color: "#24292e",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              background: "#f6f8fa",
              borderRadius: "var(--radius-sm)",
              border: "1px solid #d0d7de",
              transition: "all var(--transition)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#24292e";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "#24292e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f6f8fa";
              e.currentTarget.style.color = "#24292e";
              e.currentTarget.style.borderColor = "#d0d7de";
            }}
          >
            <Github style={{ width: "16px", height: "16px" }} />
            GitHub
          </a>
          <a 
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "14px",
              color: "#0077b5",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              background: "#e7f3f8",
              borderRadius: "var(--radius-sm)",
              border: "1px solid #b8dde8",
              transition: "all var(--transition)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0077b5";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "#0077b5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#e7f3f8";
              e.currentTarget.style.color = "#0077b5";
              e.currentTarget.style.borderColor = "#b8dde8";
            }}
          >
            <Linkedin style={{ width: "16px", height: "16px" }} />
            LinkedIn
          </a>
          <a 
            href={profile.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "14px",
              color: "#7c3aed",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              background: "#f5f3ff",
              borderRadius: "var(--radius-sm)",
              border: "1px solid #ddd6fe",
              transition: "all var(--transition)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#7c3aed";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "#7c3aed";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f5f3ff";
              e.currentTarget.style.color = "#7c3aed";
              e.currentTarget.style.borderColor = "#ddd6fe";
            }}
          >
            <Globe style={{ width: "16px", height: "16px" }} />
            Portfolio
          </a>

          {/* Edit Button - Mobile */}
          <button
            onClick={onEditClick}
            className="edit-profile-button-mobile btn-secondary"
            style={{
              display: "none",
              alignItems: "center",
              marginLeft: "auto",
              padding: "var(--spacing-2)",
            }}
          >
            <Pencil style={{ width: "14px", height: "14px" }} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
