import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Code2, Clock, Flame, Trophy, FolderPlus, Globe } from "lucide-react";

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
  {
    title: "devmate",
    desc: "Developer portfolio & project tracking dashboard.",
    tech: ["React", "Vite"],
    link: true,
  },
  {
    title: "rustfmt-lsp",
    desc: "LSP implementation for Rust formatting with diagnostics.",
    tech: ["Rust", "LSP"],
    link: true,
  },
];

const mockActivity = [
  { text: "Deployed devmate",       time: "Today" },
  { text: "Finished rustfmt-lsp",   time: "2 days ago" },
  { text: "Launched pg-migrate",    time: "1 week ago" },
  { text: "Published a blog post",  time: "2 weeks ago" },
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

          {/* ── Body ── */}
          <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: "10px" }}>

            {/* ── Two-column: profile+momentum | projects ── */}
            <motion.div
              variants={fadeUp}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}
            >
              {/* LEFT: Profile card */}
              <div
                style={{
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {/* Avatar + name */}
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: "var(--color-accent)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: "700",
                      fontFamily: "var(--font-heading)",
                      flexShrink: 0,
                    }}
                  >
                    AK
                  </div>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: "600", color: "var(--color-text-primary)", lineHeight: 1.2 }}>
                      Alex Kim
                    </div>
                    <div style={{ fontSize: "9px", color: "var(--color-text-secondary)", marginTop: "1px" }}>
                      Full-Stack Eng.
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p
                  style={{
                    fontSize: "9px",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.5,
                    margin: 0,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  Building dev tools and open-source projects. Passionate about DX.
                </p>

                {/* Tech tags */}
                <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
                  {["TypeScript", "React", "Rust"].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "8px",
                        padding: "1px 5px",
                        borderRadius: "3px",
                        background: "var(--color-accent-subtle)",
                        color: "var(--color-accent)",
                        border: "1px solid var(--color-accent-border)",
                        fontWeight: "500",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "var(--color-border)" }} />

                {/* Momentum label */}
                <div style={{ fontSize: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-muted)" }}>
                  Momentum
                </div>

                {/* 2×2 stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                  {/* Projects */}
                  <div
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "6px",
                      padding: "5px 6px",
                    }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", lineHeight: 1 }}>3</div>
                    <div style={{ fontSize: "8px", color: "var(--color-text-muted)", marginTop: "2px" }}>Projects</div>
                  </div>

                  {/* Latest Activity */}
                  <div
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "6px",
                      padding: "5px 6px",
                    }}
                  >
                    <div style={{ fontSize: "8px", fontWeight: "600", color: "var(--color-text-muted)", marginBottom: "3px" }}>Latest Activity</div>
                    <div style={{ fontSize: "9px", fontWeight: "500", color: "var(--color-text-primary)", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      Updated dashboard
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", marginTop: "2px" }}>
                      <Clock style={{ width: "8px", height: "8px", color: "var(--color-text-muted)", flexShrink: 0 }} />
                      <span style={{ fontSize: "8px", color: "var(--color-text-muted)" }}>2 hours ago</span>
                    </div>
                  </div>

                  {/* Current Streak */}
                  <div
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "6px",
                      padding: "5px 6px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "2px" }}>
                      <Flame style={{ width: "9px", height: "9px", color: "#fca919", flexShrink: 0 }} />
                      <div style={{ fontSize: "8px", color: "var(--color-text-muted)" }}>Current</div>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", lineHeight: 1 }}>18</div>
                    <div style={{ fontSize: "8px", color: "var(--color-text-muted)", marginTop: "1px" }}>day streak</div>
                  </div>

                  {/* Longest Streak */}
                  <div
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "6px",
                      padding: "5px 6px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "2px" }}>
                      <Trophy style={{ width: "9px", height: "9px", color: "#fca919", flexShrink: 0 }} />
                      <div style={{ fontSize: "8px", color: "var(--color-text-muted)" }}>Longest</div>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", lineHeight: 1 }}>28</div>
                    <div style={{ fontSize: "8px", color: "var(--color-text-muted)", marginTop: "1px" }}>best streak</div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Projects section */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {/* Section header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "600",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    Projects{" "}
                    <span style={{ color: "var(--color-text-muted)", fontWeight: "400" }}>(3)</span>
                  </span>
                  <span
                    style={{
                      fontSize: "8px",
                      background: "var(--color-accent)",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontWeight: "500",
                    }}
                  >
                    + Add
                  </span>
                </div>

                {/* Project cards */}
                {mockProjects.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "7px",
                      padding: "8px 9px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "600",
                        color: "var(--color-text-primary)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {p.title}
                    </div>
                    <p
                      style={{
                        fontSize: "9px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.45,
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.desc}
                    </p>
                    {/* Tech tags */}
                    <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: "8px",
                            padding: "1px 5px",
                            borderRadius: "3px",
                            background: "var(--color-bg-elevated)",
                            color: "var(--color-text-secondary)",
                            border: "1px solid var(--color-border)",
                            fontWeight: "500",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {/* Link */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        marginTop: "1px",
                      }}
                    >
                      <Globe style={{ width: "8px", height: "8px", color: "var(--color-accent)", flexShrink: 0 }} />
                      <span style={{ fontSize: "9px", color: "var(--color-accent)", fontWeight: "500" }}>
                        View Project →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Activity timeline (full width) ── */}
            <motion.div variants={fadeUp}>
              {/* Header */}
              <div style={{ marginBottom: "6px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Activity
                </div>
                <div style={{ fontSize: "8px", color: "var(--color-text-secondary)", marginTop: "1px" }}>
                  Recent updates
                </div>
              </div>

              {/* 2-col grid of activity cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
                {mockActivity.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "7px",
                      padding: "7px 8px",
                      display: "flex",
                      gap: "6px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ marginTop: "3px" }}>
                      <PulseDot />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "9px",
                            fontWeight: "500",
                            color: "var(--color-text-primary)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginBottom: "2px",
                          }}
                        >
                          {a.text}
                        </div>
                        <div style={{ fontSize: "8px", color: "var(--color-text-muted)" }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardMockup;
