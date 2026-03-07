import { NavLink, useNavigate } from "react-router-dom";
import { Code2, Home, LayoutDashboard, Info } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { to: "/", label: "Home", Icon: Home, end: true },
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/about", label: "About", Icon: Info },
];

const Navbar = () => {
  const navigate = useNavigate();

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
        {/* ── Logo (left) ── */}
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

        {/* ── Pill nav (center, desktop only) ── */}
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
                fontWeight: isActive
                  ? "var(--font-weight-semibold)"
                  : "var(--font-weight-medium)",
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

        {/* ── Right: desktop theme toggle / mobile icon-nav + toggle ── */}
        <div className="navbar-right-desktop" style={{ display: "flex", justifyContent: "flex-end" }}>
          <ThemeToggle />
        </div>

        {/* Mobile: icon-nav + toggle (replaces pill nav + right toggle) */}
        <div className="navbar-mobile-right" style={{ display: "none", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
