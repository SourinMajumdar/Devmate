import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Code2, Mail, Lock, Github, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("mode") === "signup" ? "signup" : "login";

  const { user, signIn, signUp, signInWithGitHub } = useAuth();

  const [tab, setTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (tab === "login") {
        await signIn(email, password);
        navigate("/dashboard", { replace: true });
      } else {
        const result = await signUp(email, password);
        // If session is returned immediately, redirect. Otherwise prompt email confirm.
        if (result?.session) {
          navigate("/dashboard", { replace: true });
        } else {
          setSuccess("Account created! Check your email to confirm, then sign in.");
          setTab("login");
          setPassword("");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHub = async () => {
    setGithubLoading(true);
    setError("");
    try {
      await signInWithGitHub();
      // User will be redirected away; no need to navigate
    } catch (err) {
      setError(err.message || "GitHub sign-in failed.");
      setGithubLoading(false);
    }
  };

  const switchTab = (t) => {
    setTab(t);
    setError("");
    setSuccess("");
  };

  return (
    <div style={pageStyle}>
      {/* Top-right theme toggle */}
      <div style={{ position: "fixed", top: "20px", right: "24px", zIndex: 10 }}>
        <ThemeToggle />
      </div>

      {/* Card */}
      <div style={cardStyle}>
        {/* Logo */}
        <div style={logoRowStyle}>
          <div style={logoIconWrap}>
            <Code2 style={{ width: "20px", height: "20px", color: "#fff" }} />
          </div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={logoTextStyle}>Devmate</span>
          </Link>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={headingStyle}>
            {tab === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p style={subStyle}>
            {tab === "login"
              ? "Sign in to access your developer profile"
              : "Start building your shareable developer portfolio"}
          </p>
        </div>

        {/* Tabs */}
        <div style={tabBarStyle}>
          <button
            onClick={() => switchTab("login")}
            style={tabBtnStyle(tab === "login")}
          >
            Sign In
          </button>
          <button
            onClick={() => switchTab("signup")}
            style={tabBtnStyle(tab === "signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div style={alertStyle("error")} role="alert">
            <AlertCircle style={{ width: "15px", height: "15px", flexShrink: 0 }} />
            {error}
          </div>
        )}
        {success && (
          <div style={alertStyle("success")} role="status">
            <CheckCircle2 style={{ width: "15px", height: "15px", flexShrink: 0 }} />
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Email */}
          <label style={labelStyle}>
            Email
            <div style={inputWrapStyle}>
              <Mail style={inputIconStyle} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                style={inputStyle}
              />
            </div>
          </label>

          {/* Password */}
          <label style={labelStyle}>
            Password
            <div style={inputWrapStyle}>
              <Lock style={inputIconStyle} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={tab === "signup" ? "At least 6 characters" : "Your password"}
                required
                minLength={6}
                autoComplete={tab === "login" ? "current-password" : "new-password"}
                style={{ ...inputStyle, paddingRight: "42px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                style={eyeBtnStyle}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword
                  ? <EyeOff style={{ width: "15px", height: "15px" }} />
                  : <Eye style={{ width: "15px", height: "15px" }} />}
              </button>
            </div>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={submitBtnStyle}
          >
            {loading ? (
              <span style={spinnerStyle} />
            ) : (
              <>
                {tab === "login" ? "Sign In" : "Create Account"}
                <ArrowRight style={{ width: "16px", height: "16px" }} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={dividerStyle}>
          <div style={dividerLineStyle} />
          <span style={dividerTextStyle}>or</span>
          <div style={dividerLineStyle} />
        </div>

        {/* GitHub OAuth */}
        <button
          onClick={handleGitHub}
          disabled={githubLoading}
          style={githubBtnStyle}
        >
          {githubLoading ? (
            <span style={{ ...spinnerStyle, borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
          ) : (
            <GithubIcon />
          )}
          Continue with GitHub
        </button>

        {/* Footer switch */}
        <p style={switchTextStyle}>
          {tab === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => switchTab(tab === "login" ? "signup" : "login")}
            style={switchLinkStyle}
          >
            {tab === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

// GitHub SVG (not in Lucide as filled icon)
const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
  </svg>
);

// ── Styles ───────────────────────────────────────────────────────

const pageStyle = {
  minHeight: "100vh",
  background: "var(--color-bg)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px 16px",
};

const cardStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-lg)",
  padding: "40px 36px",
  width: "100%",
  maxWidth: "420px",
};

const logoRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "28px",
};

const logoIconWrap = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  background: "var(--color-accent)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const logoTextStyle = {
  fontFamily: "var(--font-heading)",
  fontSize: "22px",
  fontWeight: "800",
  color: "var(--color-accent)",
  letterSpacing: "0.3px",
};

const headingStyle = {
  fontSize: "22px",
  fontWeight: "700",
  color: "var(--color-text-primary)",
  margin: "0 0 6px 0",
  fontFamily: "var(--font-heading)",
  letterSpacing: "-0.02em",
};

const subStyle = {
  fontSize: "var(--font-size-sm)",
  color: "var(--color-text-secondary)",
  margin: 0,
  lineHeight: "var(--line-height-base)",
};

const tabBarStyle = {
  display: "flex",
  background: "var(--color-bg-elevated)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-sm)",
  padding: "3px",
  gap: "2px",
  marginBottom: "24px",
};

const tabBtnStyle = (isActive) => ({
  flex: 1,
  padding: "8px",
  borderRadius: "calc(var(--radius-sm) - 2px)",
  border: "none",
  background: isActive ? "var(--color-surface)" : "transparent",
  color: isActive ? "var(--color-text-primary)" : "var(--color-text-muted)",
  fontWeight: isActive ? "var(--font-weight-semibold)" : "var(--font-weight-medium)",
  fontSize: "var(--font-size-sm)",
  cursor: "pointer",
  fontFamily: "inherit",
  boxShadow: isActive ? "var(--shadow-base)" : "none",
  transition: "all var(--transition)",
});

const alertStyle = (type) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
  padding: "10px 12px",
  borderRadius: "var(--radius-sm)",
  fontSize: "var(--font-size-sm)",
  lineHeight: "var(--line-height-base)",
  marginBottom: "4px",
  ...(type === "error"
    ? {
        background: "rgba(220, 38, 38, 0.08)",
        border: "1px solid rgba(220, 38, 38, 0.25)",
        color: "var(--color-danger)",
      }
    : {
        background: "rgba(5, 150, 105, 0.08)",
        border: "1px solid rgba(5, 150, 105, 0.25)",
        color: "var(--color-success)",
      }),
});

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontSize: "var(--font-size-sm)",
  fontWeight: "var(--font-weight-medium)",
  color: "var(--color-text-secondary)",
};

const inputWrapStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const inputIconStyle = {
  position: "absolute",
  left: "12px",
  width: "15px",
  height: "15px",
  color: "var(--color-text-muted)",
  pointerEvents: "none",
  flexShrink: 0,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px 10px 38px",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-sm)",
  fontSize: "var(--font-size-sm)",
  background: "var(--color-bg-elevated)",
  color: "var(--color-text-primary)",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color var(--transition)",
};

const eyeBtnStyle = {
  position: "absolute",
  right: "10px",
  background: "none",
  border: "none",
  color: "var(--color-text-muted)",
  cursor: "pointer",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const submitBtnStyle = {
  padding: "11px 20px",
  fontSize: "var(--font-size-sm)",
  fontWeight: "var(--font-weight-semibold)",
  width: "100%",
  marginTop: "4px",
  gap: "8px",
};

const dividerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  margin: "24px 0",
};

const dividerLineStyle = {
  flex: 1,
  height: "1px",
  background: "var(--color-border)",
};

const dividerTextStyle = {
  fontSize: "var(--font-size-meta)",
  color: "var(--color-text-muted)",
  fontWeight: "var(--font-weight-medium)",
  flexShrink: 0,
};

const githubBtnStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "11px 20px",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border)",
  background: "#24292e",
  color: "#ffffff",
  fontSize: "var(--font-size-sm)",
  fontWeight: "var(--font-weight-medium)",
  fontFamily: "inherit",
  cursor: "pointer",
  transition: "opacity var(--transition), transform var(--transition)",
  marginBottom: "20px",
};

const switchTextStyle = {
  textAlign: "center",
  fontSize: "var(--font-size-sm)",
  color: "var(--color-text-secondary)",
  margin: 0,
};

const switchLinkStyle = {
  background: "none",
  border: "none",
  color: "var(--color-accent)",
  fontWeight: "var(--font-weight-semibold)",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "inherit",
  padding: 0,
  textDecoration: "underline",
  textDecorationColor: "transparent",
  transition: "text-decoration-color var(--transition)",
};

const spinnerStyle = {
  display: "inline-block",
  width: "16px",
  height: "16px",
  border: "2px solid rgba(255,255,255,0.35)",
  borderTopColor: "#fff",
  borderRadius: "50%",
  animation: "spin 0.6s linear infinite",
};

export default AuthPage;
