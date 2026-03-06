import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, GitCommit, Github, Linkedin, Globe, Code2, Activity } from "lucide-react";
import TechBadge from "./TechBadge";
import { sampleProfiles } from "../data/sampleProfiles";

/* ── Micro avatar ─────────────────────────────── */
const Avatar = ({ name, size = 44 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: "var(--color-accent)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.38,
      fontWeight: 700,
      fontFamily: "var(--font-heading)",
      flexShrink: 0,
      border: "2px solid var(--color-border)",
    }}
  >
    {name[0]}
  </div>
);

/* ── Animated pulse dot ───────────────────────── */
const PulseDot = () => (
  <motion.span
    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    style={{
      display: "inline-block",
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--color-accent)",
      flexShrink: 0,
      marginTop: 3,
    }}
  />
);

/* ── Stat mini-card ───────────────────────────── */
const StatCard = ({ label, value, icon }) => (
  <div
    className="card"
    style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 3 }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: 10,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        color: "var(--color-text-muted)",
        marginBottom: 2,
      }}
    >
      {icon}
      {label}
    </div>
    <div
      style={{
        fontSize: 28,
        fontWeight: 700,
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-heading)",
        lineHeight: 1,
      }}
    >
      {value}
    </div>
  </div>
);

/* ── Mini language chart ──────────────────────── */
const LANG_COLORS_MINI = {
  javascript: "#f7df1e", typescript: "#3178c6", python: "#3572a5",
  rust: "#dea584", go: "#00acd7", react: "#61dafb", vue: "#42b883",
  docker: "#2496ed", kubernetes: "#326ce5", fastapi: "#009688",
  pytorch: "#ee4c2c", postgresql: "#336791", nodejs: "#339933",
};
const FALLBACK_MINI = ["#6366f1","#8b5cf6","#ec4899","#f97316","#10b981","#06b6d4"];
function getLangColor(tech, idx) {
  return LANG_COLORS_MINI[tech.toLowerCase().replace(/[\s.]/g,"")] ?? FALLBACK_MINI[idx % FALLBACK_MINI.length];
}

const MiniLanguageChart = ({ projects }) => {
  const counts = {};
  projects.forEach(p => p.tech.forEach(t => { counts[t] = (counts[t] ?? 0) + 1; }));
  const entries = Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,6);
  const total = entries.reduce((s,[,n]) => s+n, 0);
  if (!entries.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-muted)", marginBottom: 2 }}>
        Languages
      </div>
      {/* Segmented bar */}
      <div style={{ display: "flex", height: 6, borderRadius: 999, overflow: "hidden", gap: 1 }}>
        {entries.map(([tech, count], i) => (
          <div key={tech} style={{ height: "100%", width: `${(count/total)*100}%`, background: getLangColor(tech, i), borderRadius: 999, minWidth: 3 }} />
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 10px" }}>
        {entries.map(([tech], i) => (
          <div key={tech} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: getLangColor(tech, i), flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: "var(--color-text-secondary)", fontWeight: 500 }}>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main section ─────────────────────────────── */
const ProfilePreviewSection = () => {
  const [activeId, setActiveId] = useState("priya");
  const active = sampleProfiles.find((p) => p.id === activeId);

  return (
    <section
      className="landing-section"
      style={{
        padding: "88px var(--space-xl)",
        background: "var(--color-bg)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--color-accent)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "10px",
            }}
          >
            Live Preview
          </p>
          <h2
            style={{
              fontSize: "38px",
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "14px",
            }}
          >
            See your dashboard come to life
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Browse real developer profiles. This is exactly what you get — no signup, no fluff.
          </p>
        </motion.div>

        {/* ── Persona selector ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          {sampleProfiles.map((p) => {
            const isActive = p.id === activeId;
            return (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                style={{
                  padding: "9px 20px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "var(--font-heading)",
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  background: isActive ? "var(--color-accent)" : "var(--color-surface)",
                  color: isActive ? "#fff" : "var(--color-text-secondary)",
                  borderColor: isActive ? "var(--color-accent)" : "var(--color-border)",
                  boxShadow: isActive ? "0 2px 12px rgba(37,99,235,0.25)" : "none",
                }}
              >
                {p.emoji} {p.profile.name.split(" ")[0]} · {p.persona}
              </button>
            );
          })}
        </div>

        {/* ── Dashboard preview card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            {/* Mini navbar */}
            <div
              style={{
                background: "var(--color-header-bg)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: "1px solid var(--color-header-border)",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Code2
                  style={{ width: 15, height: 15, color: "var(--color-accent)", strokeWidth: 2.5 }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: 14,
                    color: "var(--color-accent)",
                  }}
                >
                  Devmate
                </span>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {["#f87171", "#fbbf24", "#34d399"].map((c) => (
                  <div
                    key={c}
                    style={{ width: 8, height: 8, borderRadius: "50%", background: c }}
                  />
                ))}
              </div>
            </div>

            {/* Dashboard body — mirrors actual ProfilePage layout */}
            <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* ── 2-col main grid: left (profile + overview + chart) | right (projects) ── */}
              <div className="preview-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "14px", alignItems: "start" }}>

                {/* LEFT column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                  {/* Profile card */}
                  <div className="card" style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <Avatar name={active.profile.name} size={40} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>
                          {active.profile.name}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>
                          {active.profile.role}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {active.profile.bio}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {active.profile.tech.slice(0, 4).map((t) => <TechBadge key={t} tech={t} size="sm" />)}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[{ icon: Github, label: "GitHub" }, { icon: Linkedin, label: "LinkedIn" }, { icon: Globe, label: "Portfolio" }].map(({ icon: Icon, label }) => (
                        <span key={label} style={{ fontSize: 10, color: "var(--color-accent)", display: "flex", alignItems: "center", gap: 3 }}>
                          <Icon style={{ width: 10, height: 10 }} />{label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Overview section (pip header + 3-col grid) */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-accent)", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>Overview</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                      {/* Projects */}
                      <div className="card" style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 3, borderLeft: "2px solid var(--color-accent)" }}>
                        <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-muted)" }}>Projects</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", lineHeight: 1 }}>{active.stats.projects}</div>
                        <div style={{ fontSize: 9, color: "var(--color-text-muted)" }}>Total in DevMate</div>
                      </div>
                      {/* Latest Activity */}
                      <div className="card" style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 3 }}>
                        <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-muted)" }}>Latest Activity</div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {active.stats.latestActivity}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                          <Clock style={{ width: 9, height: 9, color: "var(--color-text-muted)" }} />
                          <span style={{ fontSize: 9, color: "var(--color-text-muted)" }}>2h ago</span>
                        </div>
                      </div>
                      {/* Latest Commit */}
                      <div className="card" style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 3, borderLeft: "2px solid #238636" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-muted)" }}>Latest Commit</div>
                          <Github style={{ width: 9, height: 9, color: "var(--color-text-muted)" }} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <GitCommit style={{ width: 10, height: 10, color: "#238636", flexShrink: 0 }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#238636", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{active.stats.commitRepo}</span>
                        </div>
                        <div style={{ fontSize: 9, color: "var(--color-text-muted)" }}>just now</div>
                      </div>
                    </div>
                  </div>

                  {/* Language chart */}
                  <div className="card" style={{ padding: "10px 12px" }}>
                    <MiniLanguageChart projects={active.projects} />
                  </div>
                </div>

                {/* RIGHT column — Projects */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-accent)", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>Projects</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {active.projects.map((p) => (
                      <div key={p.id} className="card" style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 5 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>{p.title}</div>
                        <p style={{ fontSize: 11, color: "var(--color-text-secondary)", lineHeight: 1.45, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.description}</p>
                        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                          {p.tech.slice(0, 3).map((t) => <TechBadge key={t} tech={t} size="sm" />)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          <Globe style={{ width: 10, height: 10, color: "var(--color-accent)" }} />
                          <span style={{ fontSize: 10, color: "var(--color-accent)", fontWeight: 600 }}>View Project →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Activity — full width, 2-col grid (mirrors ContentTimeline) ── */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", fontFamily: "var(--font-heading)" }}>Activity</span>
                </div>
                <p style={{ fontSize: 10, color: "var(--color-text-secondary)", margin: "0 0 8px 0" }}>
                  Recent updates from DevMate and GitHub
                </p>
                <div className="preview-activity-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {active.activity.map((a, i) => {
                    const isGH = a.source === "github";
                    return (
                      <div key={i} className="card" style={{ padding: "10px 12px", display: "flex", gap: 8, alignItems: "flex-start" }}>
                        {/* Source indicator — matches ContentTimeline */}
                        <div style={{ paddingTop: 1, flexShrink: 0 }}>
                          {isGH ? (
                            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--color-bg-elevated)", border: "1.5px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Github style={{ width: 11, height: 11, color: "var(--color-text-primary)" }} />
                            </div>
                          ) : (
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--color-accent)", marginTop: 4 }} />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>
                            {a.text}
                          </div>
                          {/* Commit message block for GitHub items */}
                          {isGH && a.isPush && a.commitMessage && (
                            <div style={{ display: "flex", alignItems: "center", gap: 4, background: "var(--color-bg-elevated)", border: "1px solid var(--color-border)", borderLeft: "2px solid #238636", borderRadius: 3, padding: "3px 6px", marginBottom: 3 }}>
                              <GitCommit style={{ width: 9, height: 9, color: "#238636", flexShrink: 0 }} />
                              <span style={{ fontSize: 10, color: "var(--color-text-primary)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.commitMessage}</span>
                            </div>
                          )}
                          <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>{a.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProfilePreviewSection;
