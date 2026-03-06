import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Code2, Clock, GitCommit, Github, Globe, Linkedin, Activity } from "lucide-react";

/* ── Stagger variants ───────────────────────────────── */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};

/* ── Micro pulse dot ────────────────────────────────── */
const PulseDot = () => (
  <motion.span
    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    style={{
      display: "inline-block",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "var(--color-accent)",
      flexShrink: 0,
    }}
  />
);

/* ── Mock data ──────────────────────────────────────── */
const mockProjects = [
  { title: "devmate", desc: "Developer portfolio & project tracking dashboard.", tech: ["React", "Vite"], link: true },
  { title: "rustfmt-lsp", desc: "LSP implementation for Rust formatting with diagnostics.", tech: ["Rust", "LSP"], link: true },
];

const mockActivity = [
  { text: "Deployed devmate v2", time: "Today", source: "devmate" },
  { text: "Pushed to devmate", time: "1h ago", source: "github", isPush: true, commitMessage: "feat: add GitHub activity feed" },
  { text: "Merged PR: fix auth flow", time: "2 days ago", source: "github", isPush: false },
  { text: "Finished rustfmt-lsp", time: "3 days ago", source: "devmate" },
];

const mockLang = [
  { tech: "TypeScript", color: "#3178c6", pct: 40 },
  { tech: "React", color: "#61dafb", pct: 30 },
  { tech: "Rust", color: "#dea584", pct: 20 },
  { tech: "Vite", color: "#646cff", pct: 10 },
];

/* ── Main component ─────────────────────────────────── */
const DashboardMockup = () => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-140, 140], [6, -6]), {
    stiffness: 220,
    damping: 32,
  });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), {
    stiffness: 220,
    damping: 32,
  });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{ perspective: "1200px", width: "100%", maxWidth: "480px", position: "relative" }}
    >
      {/* Glow blob */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-48px",
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.12) 0%, transparent 68%)",
          pointerEvents: "none",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      {/* Tiltable wrapper */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", position: "relative", zIndex: 1 }}
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
      >
        {/* Card shell */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "var(--shadow-mockup)",
          }}
        >
          {/* ── Mini Navbar ── */}
          <motion.div
            variants={fadeUp}
            style={{
              background: "var(--color-header-bg)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderBottom: "1px solid var(--color-header-border)",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Code2 style={{ width: "13px", height: "13px", color: "var(--color-accent)", strokeWidth: 2.5 }} />
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: "700",
                  fontSize: "13px",
                  color: "var(--color-accent)",
                }}
              >
                Devmate
              </span>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              {["#f87171", "#fbbf24", "#34d399"].map((c) => (
                <div key={c} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c }} />
              ))}
            </div>
          </motion.div>

          {/* ── Body — mirrors actual ProfilePage layout ── */}
          <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: "10px" }}>

            {/* 2-col main grid: left (profile + overview + chart) | right (projects) */}
            <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "8px", alignItems: "start" }}>

              {/* LEFT column */}
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>

                {/* Profile card */}
                <div style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "10px", display: "flex", flexDirection: "column", gap: "7px" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--color-accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700", fontFamily: "var(--font-heading)", flexShrink: 0 }}>AK</div>
                    <div>
                      <div style={{ fontSize: "10px", fontWeight: "600", color: "var(--color-text-primary)", lineHeight: 1.2 }}>Alex Kim</div>
                      <div style={{ fontSize: "9px", color: "var(--color-text-secondary)", marginTop: "1px" }}>Full-Stack Engineer</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "9px", color: "var(--color-text-secondary)", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    Building dev tools and open-source projects. Passionate about DX.
                  </p>
                  <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
                    {["TypeScript", "React", "Rust"].map((t) => (
                      <span key={t} style={{ fontSize: "8px", padding: "1px 5px", borderRadius: "3px", background: "var(--color-accent-subtle)", color: "var(--color-accent)", border: "1px solid var(--color-accent-border)", fontWeight: "500" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[{ icon: Github, label: "GitHub" }, { icon: Linkedin, label: "LinkedIn" }].map(({ icon: Icon, label }) => (
                      <span key={label} style={{ fontSize: "8px", color: "var(--color-accent)", display: "flex", alignItems: "center", gap: "2px" }}>
                        <Icon style={{ width: "8px", height: "8px" }} />{label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Overview section */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "5px" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-accent)", flexShrink: 0 }} />
                    <span style={{ fontSize: "10px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>Overview</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4px" }}>
                    {/* Projects */}
                    <div style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderLeft: "2px solid var(--color-accent)", borderRadius: "6px", padding: "5px 6px" }}>
                      <div style={{ fontSize: "7px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", marginBottom: "2px" }}>Projects</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", lineHeight: 1 }}>3</div>
                      <div style={{ fontSize: "7px", color: "var(--color-text-muted)", marginTop: "2px" }}>In DevMate</div>
                    </div>
                    {/* Latest Activity */}
                    <div style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderRadius: "6px", padding: "5px 6px" }}>
                      <div style={{ fontSize: "7px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)", marginBottom: "2px" }}>Activity</div>
                      <div style={{ fontSize: "9px", fontWeight: "600", color: "var(--color-text-primary)", lineHeight: 1.2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>Deployed devmate v2</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "2px", marginTop: "3px" }}>
                        <Clock style={{ width: "7px", height: "7px", color: "var(--color-text-muted)" }} />
                        <span style={{ fontSize: "7px", color: "var(--color-text-muted)" }}>Today</span>
                      </div>
                    </div>
                    {/* Latest Commit */}
                    <div style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderLeft: "2px solid #238636", borderRadius: "6px", padding: "5px 6px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2px" }}>
                        <div style={{ fontSize: "7px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-muted)" }}>Commit</div>
                        <Github style={{ width: "7px", height: "7px", color: "var(--color-text-muted)" }} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                        <GitCommit style={{ width: "9px", height: "9px", color: "#238636", flexShrink: 0 }} />
                        <span style={{ fontSize: "9px", fontWeight: "600", color: "#238636", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>devmate</span>
                      </div>
                      <div style={{ fontSize: "7px", color: "var(--color-text-muted)", marginTop: "3px" }}>just now</div>
                    </div>
                  </div>
                </div>

                {/* Mini language chart */}
                <div style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderRadius: "6px", padding: "7px 8px", display: "flex", flexDirection: "column", gap: "5px" }}>
                  <div style={{ fontSize: "7px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-muted)" }}>Languages</div>
                  <div style={{ display: "flex", height: "5px", borderRadius: "999px", overflow: "hidden", gap: "1px" }}>
                    {mockLang.map((l) => (
                      <div key={l.tech} style={{ height: "100%", width: `${l.pct}%`, background: l.color, borderRadius: "999px", minWidth: "2px" }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 8px" }}>
                    {mockLang.map((l) => (
                      <div key={l.tech} style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: l.color }} />
                        <span style={{ fontSize: "8px", color: "var(--color-text-secondary)", fontWeight: "500" }}>{l.tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT column — Projects */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "1px" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>Projects</span>
                </div>
                {mockProjects.map((p, i) => (
                  <div key={i} style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderRadius: "7px", padding: "8px 9px", display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div style={{ fontSize: "10px", fontWeight: "600", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>{p.title}</div>
                    <p style={{ fontSize: "9px", color: "var(--color-text-secondary)", lineHeight: 1.45, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
                      {p.tech.map((t) => (
                        <span key={t} style={{ fontSize: "8px", padding: "1px 5px", borderRadius: "3px", background: "var(--color-bg-elevated)", color: "var(--color-text-secondary)", border: "1px solid var(--color-border)", fontWeight: "500" }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Globe style={{ width: "8px", height: "8px", color: "var(--color-accent)", flexShrink: 0 }} />
                      <span style={{ fontSize: "9px", color: "var(--color-accent)", fontWeight: "500" }}>View Project →</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Activity — full width, 2-col (mirrors ContentTimeline) ── */}
            <motion.div variants={fadeUp}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-accent)", flexShrink: 0 }} />
                <span style={{ fontSize: "10px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>Activity</span>
              </div>
              <div style={{ fontSize: "8px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>Recent updates from DevMate and GitHub</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
                {mockActivity.map((a, i) => {
                  const isGH = a.source === "github";
                  return (
                    <div key={i} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "7px", padding: "7px 8px", display: "flex", gap: "6px", alignItems: "flex-start" }}>
                      <div style={{ paddingTop: "1px", flexShrink: 0 }}>
                        {isGH ? (
                          <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "var(--color-bg-elevated)", border: "1.5px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Github style={{ width: "9px", height: "9px", color: "var(--color-text-primary)" }} />
                          </div>
                        ) : (
                          <div style={{ marginTop: "3px" }}><PulseDot /></div>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "9px", fontWeight: "500", color: "var(--color-text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "2px" }}>{a.text}</div>
                        {isGH && a.isPush && a.commitMessage && (
                          <div style={{ display: "flex", alignItems: "center", gap: "3px", background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderLeft: "2px solid #238636", borderRadius: "3px", padding: "2px 5px", marginBottom: "2px" }}>
                            <GitCommit style={{ width: "8px", height: "8px", color: "#238636", flexShrink: 0 }} />
                            <span style={{ fontSize: "8px", color: "var(--color-text-primary)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.commitMessage}</span>
                          </div>
                        )}
                        <div style={{ fontSize: "8px", color: "var(--color-text-muted)" }}>{a.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardMockup;
