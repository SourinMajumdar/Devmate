import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, Trophy, Globe, Github, Linkedin, Code2, Activity } from "lucide-react";
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
        borderTop: "1px solid var(--color-border)",
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

            {/* Dashboard body */}
            <div
              style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* 3-column grid: profile | momentum | projects */}
              <div
                className="preview-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1.6fr",
                  gap: "16px",
                  alignItems: "start",
                }}
              >
                {/* ── Profile column ── */}
                <div
                  className="card"
                  style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <Avatar name={active.profile.name} size={44} />
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "var(--color-text-primary)",
                          fontFamily: "var(--font-heading)",
                          lineHeight: 1.2,
                        }}
                      >
                        {active.profile.name}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}
                      >
                        {active.profile.username}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)" }}
                  >
                    {active.profile.role}
                  </div>

                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.55,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {active.profile.bio}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {active.profile.tech.map((t) => (
                      <TechBadge key={t} tech={t} size="sm" />
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 2 }}>
                    {[
                      { icon: Github, label: "GitHub" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Globe, label: "Portfolio" },
                    ].map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        style={{
                          fontSize: 11,
                          color: "var(--color-accent)",
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <Icon style={{ width: 11, height: 11 }} />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Momentum column ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Momentum
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    <StatCard label="Projects" value={active.stats.projects} />

                    {/* Last commit — custom layout */}
                    <div
                      className="card"
                      style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.07em",
                          color: "var(--color-text-muted)",
                          marginBottom: 4,
                        }}
                      >
                        Latest Activity
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          lineHeight: 1.35,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {active.stats.latestActivity}
                      </div>
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 4 }}
                      >
                        <Clock
                          style={{ width: 10, height: 10, color: "var(--color-text-muted)" }}
                        />
                        <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>
                          2 hrs ago
                        </span>
                      </div>
                    </div>

                    <StatCard
                      label="Streak"
                      value={active.stats.streak}
                      icon={
                        <Flame style={{ width: 11, height: 11, color: "#fca919" }} />
                      }
                    />
                    <StatCard
                      label="Best"
                      value={active.stats.longest}
                      icon={
                        <Trophy style={{ width: 11, height: 11, color: "#fca919" }} />
                      }
                    />
                  </div>
                </div>

                {/* ── Projects column ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      Projects{" "}
                      <span style={{ fontWeight: 400 }}>({active.stats.projects})</span>
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        background: "var(--color-accent)",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontWeight: 600,
                      }}
                    >
                      + Add
                    </span>
                  </div>

                  {active.projects.map((p) => (
                    <div
                      key={p.id}
                      className="card"
                      style={{
                        padding: "12px 14px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "var(--color-text-primary)",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {p.title}
                      </div>
                      <p
                        style={{
                          fontSize: 11,
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.5,
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {p.description}
                      </p>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {p.tech.map((t) => (
                          <TechBadge key={t} tech={t} size="sm" />
                        ))}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Globe
                          style={{ width: 10, height: 10, color: "var(--color-accent)" }}
                        />
                        <span
                          style={{
                            fontSize: 11,
                            color: "var(--color-accent)",
                            fontWeight: 600,
                          }}
                        >
                          View Project →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Activity strip ── */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--color-text-muted)",
                    marginBottom: 8,
                  }}
                >
                  <Activity style={{ width: 12, height: 12 }} />
                  Activity
                </div>
                <div
                  className="preview-activity-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 6,
                  }}
                >
                  {active.activity.map((a, i) => (
                    <div
                      key={i}
                      className="card"
                      style={{
                        padding: "10px 12px",
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                      }}
                    >
                      <PulseDot />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "var(--color-text-primary)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginBottom: 2,
                          }}
                        >
                          {a.text}
                        </div>
                        <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>
                          {a.time}
                        </div>
                      </div>
                    </div>
                  ))}
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
