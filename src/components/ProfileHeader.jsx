import { Code2, MapPin, Github, Linkedin, Globe, Pencil, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

/* ── Medium icon (inline SVG — not in Lucide) ── */
const MediumIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

/* ── App-icon style link button ── */
const IconLinkBtn = ({ href, icon: Icon, label, color, bg }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={label}
    aria-label={label}
    style={{
      width: "30px",
      height: "30px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      border: "none",
      background: bg,
      color: color,
      textDecoration: "none",
      flexShrink: 0,
      transition: "opacity var(--transition), transform var(--transition)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.opacity = "0.82";
      e.currentTarget.style.transform = "scale(1.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.opacity = "1";
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    <Icon size={15} />
  </a>
);

/* ── App-icon style action button (non-link) ── */
const IconActionBtn = ({ onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    title={label}
    aria-label={label}
    style={{
      width: "30px",
      height: "30px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      border: "none",
      background: "var(--color-bg-elevated)",
      color: "var(--color-text-secondary)",
      cursor: "pointer",
      flexShrink: 0,
      fontFamily: "inherit",
      transition: "opacity var(--transition), transform var(--transition)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.opacity = "0.82";
      e.currentTarget.style.transform = "scale(1.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.opacity = "1";
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    <Icon size={14} />
  </button>
);

const ProfileHeader = ({ profile, onEditClick, isReadOnly = false }) => {
  const isEmpty = !profile.name && !profile.username && !profile.role;

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
          <UserCircle size={22} color="var(--color-accent)" />
        </div>
        <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "var(--space-sm)" }}>
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

  const { name, role, location, bio, avatar, links } = profile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card profile-card"
      style={{ padding: "var(--space-md) var(--space-lg)" }}
    >
      {/* Top accent strip */}
      <div className="profile-card-strip" />

      {/* ── Main row ── */}
      <div
        className="profile-header-row"
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "var(--space-lg)",
        }}
      >
        {/* ── Left: Avatar ── */}
        <div style={{ flexShrink: 0, position: "relative" }}>
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="profile-avatar avatar-ring"
              style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div
              className="profile-avatar avatar-ring"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "var(--color-accent)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: "700",
                fontFamily: "var(--font-heading)",
              }}
            >
              {name[0]}
            </div>
          )}
          {/* Online dot */}
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              right: "5px",
              width: "13px",
              height: "13px",
              borderRadius: "50%",
              background: "#22c55e",
              border: "2.5px solid var(--color-surface)",
            }}
          />
        </div>

        {/* ── Right: all text + buttons ── */}
        <div className="profile-info-row" style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "flex-start", gap: "var(--space-md)" }}>
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Row 1: Name · Location */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
              <h1
                className="profile-name"
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "var(--color-text-primary)",
                  margin: 0,
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </h1>
              {location && (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={12} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: "var(--font-size-meta)", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
                      {location}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Row 2: Role */}
            {role && (
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                <Code2 size={13} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                <span
                  className="profile-role"
                  style={{
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-accent)",
                    fontWeight: "var(--font-weight-semibold)",
                  }}
                >
                  {role}
                </span>
              </div>
            )}

            {/* Row 3: Bio */}
            {bio && (
              <p
                className="profile-bio"
                style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-secondary)",
                  lineHeight: "var(--line-height-base)",
                  margin: 0,
                  maxWidth: "480px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={bio}
              >
                {bio}
              </p>
            )}
          </div>

          {/* Icon-only action buttons */}
          <div
            className="profile-action-buttons"
            style={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              flexShrink: 0,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {links?.github && (
              <IconLinkBtn href={links.github} icon={Github} label="GitHub"
                color="#ffffff" bg="#24292e" />
            )}
            {links?.linkedin && (
              <IconLinkBtn href={links.linkedin} icon={Linkedin} label="LinkedIn"
                color="#ffffff" bg="#0077B5" />
            )}
            {links?.medium && (
              <IconLinkBtn href={links.medium} icon={MediumIcon} label="Medium"
                color="#ffffff" bg="#00ab6c" />
            )}
            {links?.portfolio && (
              <IconLinkBtn href={links.portfolio} icon={Globe} label="Portfolio"
                color="#ffffff" bg="#6366f1" />
            )}
            {!isReadOnly && onEditClick && (
              <IconActionBtn onClick={onEditClick} icon={Pencil} label="Edit profile" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
