import { NavLink, useNavigate } from "react-router-dom";
import { Code2, Home, LayoutDashboard, Info, LogOut, LogIn } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("[Devmate] Sign out error:", err);
    }
  };

  const NAV_LINKS = [
    { to: "/", label: "Home", Icon: Home, end: true },
    ...(user ? [{ to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard }] : []),
    { to: "/about", label: "About", Icon: Info },
  ];

  const initials = profile?.name
    ? profile.name[0].toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--color-header-bg)",
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
        borderBottom: "none",
        padding: "var(--space-sm) 0",
      }}
    >
      <div
        className="navbar-inner"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 var(--space-3xl)",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "var(--space-md)",
        }}
      >
        {/* ── Logo ── */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            justifyContent: "flex-start",
          }}
        >
          <Code2
            style={{ width: "22px", height: "22px", color: "var(--color-accent)", strokeWidth: 2.5 }}
          />
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "22px",
              fontWeight: "800",
              color: "var(--color-accent)",
              letterSpacing: "0.5px",
            }}
          >
            Devmate
          </span>
        </button>

        {/* ── Pill nav (center, desktop) ── */}
        <nav
          className="navbar-pill-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            background: "var(--color-bg-elevated)",
            border: "1px solid var(--color-border)",
            borderRadius: "999px",
            padding: "3px",
          }}
        >
          {NAV_LINKS.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "var(--font-size-sm)",
                fontWeight: isActive ? "var(--font-weight-semibold)" : "var(--font-weight-medium)",
                color: isActive ? "var(--color-accent)" : "var(--color-text-secondary)",
                background: isActive ? "var(--color-accent-subtle)" : "transparent",
                textDecoration: "none",
                transition: "background var(--transition), color var(--transition)",
                whiteSpace: "nowrap",
              })}
              className="pill-nav-link"
            >
              <Icon style={{ width: "14px", height: "14px", flexShrink: 0 }} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── Right: auth + theme (desktop) ── */}
        <div
          className="navbar-right-desktop"
          style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-end" }}
        >
          {user ? (
            <>
              {/* Share profile link */}
              {profile?.username && (
                <NavLink
                  to={`/u/${profile.username}`}
                  title="View public profile"
                  style={{
                    fontSize: "var(--font-size-meta)",
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    fontWeight: "var(--font-weight-medium)",
                    transition: "color var(--transition)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                >
                  @{profile.username}
                </NavLink>
              )}

              {/* Avatar */}
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name || "Avatar"}
                  style={avatarImgStyle}
                />
              ) : (
                <div style={avatarFallbackStyle}>{initials}</div>
              )}

              {/* Sign out */}
              <button
                onClick={handleSignOut}
                title="Sign out"
                aria-label="Sign out"
                className="btn-secondary"
                style={{ padding: "6px 10px", gap: "5px", fontSize: "var(--font-size-meta)" }}
              >
                <LogOut style={{ width: "13px", height: "13px" }} />
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn-primary"
              style={{ padding: "7px 14px", gap: "5px", fontSize: "var(--font-size-meta)" }}
            >
              <LogIn style={{ width: "13px", height: "13px" }} />
              Sign In
            </button>
          )}

          <ThemeToggle />
        </div>

        {/* ── Mobile: icon-nav + toggle ── */}
        <div
          className="navbar-mobile-right"
          style={{ display: "none", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}
        >
          {NAV_LINKS.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={label}
              aria-label={label}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                color: isActive ? "var(--color-accent)" : "var(--color-text-muted)",
                background: isActive ? "var(--color-accent-subtle)" : "transparent",
                textDecoration: "none",
                transition: "background var(--transition), color var(--transition)",
                flexShrink: 0,
              })}
            >
              <Icon style={{ width: "17px", height: "17px" }} />
            </NavLink>
          ))}
          {user && (
            <button
              onClick={handleSignOut}
              title="Sign out"
              aria-label="Sign out"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                background: "transparent",
                color: "var(--color-text-muted)",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                flexShrink: 0,
              }}
            >
              <LogOut style={{ width: "17px", height: "17px" }} />
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

const avatarImgStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid var(--color-border)",
  flexShrink: 0,
};

const avatarFallbackStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  background: "var(--color-accent)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "700",
  fontFamily: "var(--font-heading)",
  flexShrink: 0,
  border: "2px solid var(--color-accent-subtle)",
};

export default Navbar;
