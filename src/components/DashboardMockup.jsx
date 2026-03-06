import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Code2, Clock, Github, Linkedin, Cpu, FolderOpen, Zap, MapPin } from "lucide-react";
import { getLangColor } from "../utils/techColors";

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

/* ── Mock data ──────────────────────────────────────── */
const mockProjects = [
  { title: "devmate", desc: "Developer portfolio & project tracking dashboard.", tech: ["React", "Vite"], updatedAt: new Date(Date.now() - 3600000).toISOString() },
  { title: "rustfmt-lsp", desc: "LSP implementation for Rust formatting with diagnostics.", tech: ["Rust", "TypeScript"], updatedAt: new Date(Date.now() - 86400000 * 3).toISOString() },
];

const mockActivity = [
  { text: "Deployed devmate v2", time: "Today", source: "devmate" },
  { text: "Pushed to devmate", time: "1h ago", source: "github", commitMessage: "feat: add GitHub activity feed" },
  { text: "Merged PR: fix auth flow", time: "2 days ago", source: "github" },
  { text: "Finished rustfmt-lsp", time: "3 days ago", source: "devmate" },
];

const mockLang = [
  { tech: "TypeScript", color: "#3178c6", pct: 40 },
  { tech: "React", color: "#61dafb", pct: 30 },
  { tech: "Rust", color: "#dea584", pct: 20 },
  { tech: "Vite", color: "#646cff", pct: 10 },
];

// Top 3 techs derived from mockProjects
const mockTopTech = [
  { tech: "React", count: 1 },
  { tech: "Vite", count: 1 },
  { tech: "Rust", count: 1 },
];

/* ── Tech chip ───────────────────────────────────────── */
const TechChip = ({ tech, count }) => {
  const color = getLangColor(tech, 0);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "3px", padding: "2px 5px", borderRadius: "999px", background: color + "18", border: "1px solid " + color + "40" }}>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, flexShrink: 0 }} />
      <span style={{ fontSize: "7px", fontWeight: "600", color: "var(--color-text-primary)" }}>{tech}</span>
      <span style={{ fontSize: "7px", color: "var(--color-text-muted)" }}>×{count}</span>
    </div>
  );
};

/* ── Main component ─────────────────────────────────── */
const DashboardMockup = () => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-140, 140], [6, -6]), { stiffness: 220, damping: 32 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { stiffness: 220, damping: 32 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const resetMouse = () => { mouseX.set(0); mouseY.set(0); };

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
          position: "absolute", inset: "-48px",
          background: "radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.12) 0%, transparent 68%)",
          pointerEvents: "none", borderRadius: "50%", zIndex: 0,
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
            background: "var(--color-surface)", border: "1px solid var(--color-border)",
            borderRadius: "14px", overflow: "hidden", boxShadow: "var(--shadow-mockup)",
          }}
        >
          {/* ── Mini Navbar ── */}
          <motion.div
            variants={fadeUp}
            style={{
              background: "var(--color-header-bg)", backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid var(--color-header-border)",
              padding: "8px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Code2 style={{ width: "13px", height: "13px", color: "var(--color-accent)", strokeWidth: 2.5 }} />
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: "700", fontSize: "13px", color: "var(--color-accent)" }}>Devmate</span>
            </div>
            <div style={{ display: "flex", gap: "4px" }}>
              {["#f87171", "#fbbf24", "#34d399"].map((c) => (
                <div key={c} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c }} />
              ))}
            </div>
          </motion.div>

          {/* ── Body ── */}
          <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: "10px" }}>

            {/* 2-col grid */}
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
                      <div style={{ display: "flex", alignItems: "center", gap: "2px", marginTop: "2px" }}>
                        <MapPin style={{ width: "7px", height: "7px", color: "var(--color-text-muted)", flexShrink: 0 }} />
                        <span style={{ fontSize: "8px", color: "var(--color-text-muted)" }}>San Francisco, CA</span>
                      </div>
                    </div>
                    {/* Social icons */}
                    <div style={{ marginLeft: "auto", display: "flex", gap: "3px" }}>
                      {[{ icon: Github, bg: "#24292e" }, { icon: Linkedin, bg: "#0077B5" }].map(({ icon: Icon, bg }) => (
                        <div key={bg} style={{ width: "14px", height: "14px", borderRadius: "3px", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon style={{ width: "8px", height: "8px", color: "#fff" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: "9px", color: "var(--color-text-secondary)", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    Building dev tools and open-source projects. Passionate about DX.
                  </p>
                </div>

                {/* ── Overview card ── */}
                <div style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "6px" }}>
                    <div style={{ width: "2px", height: "10px", borderRadius: "999px", background: "var(--color-accent)", flexShrink: 0 }} />
                    <span style={{ fontSize: "9px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>Overview</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {/* Projects */}
                    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "4px", padding: "5px 6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "2px" }}>
                        <FolderOpen style={{ width: "7px", height: "7px", color: "var(--color-accent)" }} />
                        <span style={{ fontSize: "7px", color: "var(--color-text-muted)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Projects</span>
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", lineHeight: 1 }}>2</div>
                    </div>

                    {/* Latest Activity */}
                    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "4px", padding: "5px 6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "3px" }}>
                        <Clock style={{ width: "7px", height: "7px", color: "var(--color-accent)" }} />
                        <span style={{ fontSize: "7px", color: "var(--color-text-muted)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Latest Activity</span>
                      </div>
                      <div style={{ fontSize: "9px", fontWeight: "600", color: "var(--color-text-primary)", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>devmate</div>
                      <div style={{ fontSize: "7px", color: "var(--color-text-muted)", marginTop: "2px" }}>1h ago</div>
                    </div>

                    {/* Top Tech */}
                    <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "4px", padding: "5px 6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "4px" }}>
                        <Cpu style={{ width: "7px", height: "7px", color: "var(--color-accent)" }} />
                        <span style={{ fontSize: "7px", color: "var(--color-text-muted)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Top Tech</span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                        {mockTopTech.map(({ tech, count }) => (
                          <TechChip key={tech} tech={tech} count={count} />
                        ))}
                      </div>
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
                  <div style={{ width: "2px", height: "10px", borderRadius: "999px", background: "var(--color-accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: "9px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>Projects</span>
                </div>
                {mockProjects.map((p, i) => {
                  const borderColors = ["#2563eb", "#7c3aed"];
                  return (
                    <div key={i} style={{ background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderLeft: `2px solid ${borderColors[i % borderColors.length]}`, borderRadius: "7px", padding: "8px 9px", display: "flex", flexDirection: "column", gap: "5px" }}>
                      <div style={{ fontSize: "10px", fontWeight: "600", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>{p.title}</div>
                      <p style={{ fontSize: "9px", color: "var(--color-text-secondary)", lineHeight: 1.45, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.desc}</p>
                      <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
                        {p.tech.map((t) => {
                          const c = getLangColor(t, 0);
                          return (
                            <span key={t} style={{ fontSize: "7px", padding: "1px 5px", borderRadius: "3px", background: c + "18", color: "var(--color-text-secondary)", border: `1px solid ${c}40`, fontWeight: "500", display: "flex", alignItems: "center", gap: "3px" }}>
                              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: c, flexShrink: 0 }} />{t}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Activity — full width 2-col ── */}
            <motion.div variants={fadeUp}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
                <div style={{ width: "2px", height: "10px", borderRadius: "999px", background: "var(--color-accent)", flexShrink: 0 }} />
                <span style={{ fontSize: "9px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>Recent Activity</span>
              </div>
              <div style={{ fontSize: "7px", color: "var(--color-text-secondary)", marginBottom: "5px" }}>Recent updates from DevMate and GitHub</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                {mockActivity.map((a, i) => {
                  const isGH = a.source === "github";
                  return (
                    <div key={i} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "6px", padding: "6px 7px", display: "flex", gap: "5px", alignItems: "flex-start" }}>
                      <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: isGH ? "var(--color-bg-elevated)" : "var(--color-accent-subtle)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                        {isGH
                          ? <Github style={{ width: "8px", height: "8px", color: "var(--color-text-primary)" }} />
                          : <Zap style={{ width: "8px", height: "8px", color: "var(--color-accent)" }} />
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "8px", fontWeight: "500", color: "var(--color-text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "2px" }}>{a.text}</div>
                        {isGH && a.commitMessage && (
                          <div style={{ fontSize: "7px", color: "var(--color-text-primary)", fontFamily: "monospace", background: "var(--color-bg-elevated)", borderLeft: "2px solid #238636", padding: "1px 4px", borderRadius: "2px", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.commitMessage}</div>
                        )}
                        <div style={{ fontSize: "7px", color: "var(--color-text-muted)" }}>{a.time}</div>
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
