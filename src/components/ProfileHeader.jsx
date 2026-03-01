import { Github, Linkedin, Globe, Pencil, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import TechBadge from "./TechBadge";

/* Shared link badge style — neutral, consistent */
const linkBadgeBase = {
  fontSize: "var(--font-size-sm)",
  fontWeight: "var(--font-weight-medium)",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 12px",
  background: "var(--color-bg-elevated)",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text-secondary)",
  transition: "border-color var(--transition), background var(--transition), color var(--transition)",
  textDecoration: "none",
};

const LinkBadge = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={linkBadgeBase}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--color-border-hover)";
      e.currentTarget.style.color = "var(--color-text-primary)";
      e.currentTarget.style.background = "var(--color-surface-hover)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--color-border)";
      e.currentTarget.style.color = "var(--color-text-secondary)";
      e.currentTarget.style.background = "var(--color-bg-elevated)";
    }}
  >
    <Icon style={{ width: "15px", height: "15px" }} />
    {label}
  </a>
);

const ProfileHeader = ({ profile, onEditClick }) => {
  const isEmpty =
    !profile.name &&
    !profile.username &&
    !profile.role &&
    !profile.bio;

  if (isEmpty) {
    return (
      <div
        style={{
          background: "var(--color-surface)",
          border: "1px dashed var(--color-border)",
          borderRadius: "var(--radius)",
          padding: "var(--space-xl) var(--space-lg)",
          textAlign: "center",
          boxShadow: "var(--shadow-base)",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "var(--color-accent-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto var(--space-md)",
          }}
        >
          <UserCircle style={{ width: "22px", height: "22px", color: "var(--color-accent)" }} />
        </div>

        <h3 style={{ fontSize: "15px", fontWeight: "var(--font-weight-semibold)", marginBottom: "var(--space-sm)" }}>
          No profile yet
        </h3>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", marginBottom: "var(--space-lg)" }}>
          Create your profile to get started
        </p>
        <button onClick={onEditClick} className="btn-primary">
          Create Profile
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="profile-card card"
      style={{ padding: "var(--space-lg)" }}
    >
      {/* Top accent strip */}
      <div className="profile-card-strip" />

      {/* Edit button — desktop */}
      <button
        onClick={onEditClick}
        className="edit-profile-button-desktop btn-secondary"
        style={{
          position: "absolute",
          top: "var(--space-md)",
          right: "var(--space-md)",
          padding: "6px 12px",
        }}
      >
        <Pencil style={{ width: "13px", height: "13px" }} />
        <span>Edit</span>
      </button>

      {/* Header row */}
      <div
        className="profile-header-row"
        style={{
          display: "flex",
          gap: "var(--space-md)",
          alignItems: "center",
          marginBottom: "var(--space-md)",
        }}
      >
        {/* Avatar */}
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.name}
            className="profile-avatar avatar-ring"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            className="profile-avatar avatar-ring"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "var(--color-accent)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "var(--font-weight-semibold)",
              fontFamily: "var(--font-heading)",
              flexShrink: 0,
            }}
          >
            {profile.name[0]}
          </div>
        )}

        <div>
          <h1
            className="profile-name"
            style={{
              fontSize: "20px",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--color-text-primary)",
              marginBottom: "3px",
            }}
          >
            {profile.name}
          </h1>
          <span
            className="profile-username"
            style={{
              color: "var(--color-text-muted)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            {profile.username}
          </span>
        </div>
      </div>

      {/* Role + Bio */}
      <p
        className="profile-role"
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-sm)",
          fontWeight: "var(--font-weight-medium)",
          marginBottom: "var(--space-xs)",
        }}
      >
        {profile.role}
      </p>

      <p
        className="profile-bio"
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-sm)",
          lineHeight: "var(--line-height-base)",
          marginTop: "var(--space-xs)",
        }}
      >
        {profile.bio}
      </p>

      {/* Tech stack */}
      {profile.tech?.length > 0 && (
        <div
          className="profile-tech-stack"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-xs)",
            marginTop: "var(--space-md)",
          }}
        >
          {profile.tech.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      )}

      {/* Links */}
      <div
        className="profile-links"
        style={{
          marginTop: "var(--space-md)",
          display: "flex",
          gap: "var(--space-sm)",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {profile.links?.github && (
          <LinkBadge href={profile.links.github} icon={Github} label="GitHub" />
        )}
        {profile.links?.linkedin && (
          <LinkBadge href={profile.links.linkedin} icon={Linkedin} label="LinkedIn" />
        )}
        {profile.links?.portfolio && (
          <LinkBadge href={profile.links.portfolio} icon={Globe} label="Portfolio" />
        )}

        {/* Edit button — mobile */}
        <button
          onClick={onEditClick}
          className="edit-profile-button-mobile btn-secondary"
          style={{
            display: "none",
            alignItems: "center",
            marginLeft: "auto",
            padding: "6px",
          }}
        >
          <Pencil style={{ width: "13px", height: "13px" }} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
