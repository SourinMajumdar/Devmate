/**
 * Shared tech color map used by LanguageChart and ColoredTechTag.
 * Keys are lowercase, no spaces/dots.
 */
export const LANG_COLORS = {
  javascript:  "#f7df1e",
  js:          "#f7df1e",
  typescript:  "#3178c6",
  ts:          "#3178c6",
  python:      "#3572a5",
  rust:        "#dea584",
  go:          "#00acd7",
  java:        "#b07219",
  kotlin:      "#a97bff",
  swift:       "#f05138",
  "c++":       "#f34b7d",
  c:           "#555555",
  "c#":        "#178600",
  csharp:      "#178600",
  ruby:        "#701516",
  php:         "#4f5d95",
  dart:        "#00b4ab",
  scala:       "#c22d40",
  shell:       "#89e051",
  bash:        "#89e051",
  html:        "#e34c26",
  css:         "#663399",
  scss:        "#c6538c",
  sass:        "#c6538c",
  less:        "#1d365d",
  sql:         "#e38c00",
  graphql:     "#e10098",
  react:       "#61dafb",
  vue:         "#42b883",
  angular:     "#dd0031",
  svelte:      "#ff3e00",
  nextjs:      "#000000",
  nuxt:        "#00dc82",
  tailwind:    "#06b6d4",
  tailwindcss: "#06b6d4",
  node:        "#339933",
  nodejs:      "#339933",
  express:     "#000000",
  django:      "#092e20",
  flask:       "#000000",
  fastapi:     "#009688",
  laravel:     "#ff2d20",
  docker:      "#2496ed",
  kubernetes:  "#326ce5",
  mongodb:     "#47a248",
  postgres:    "#336791",
  postgresql:  "#336791",
  mysql:       "#4479a1",
  redis:       "#dc382d",
  firebase:    "#ffca28",
  aws:         "#ff9900",
  gcp:         "#4285f4",
  azure:       "#0089d6",
  vite:        "#646cff",
  webpack:     "#8dd6f9",
  jest:        "#c21325",
  framer:      "#0055ff",
  pytorch:     "#ee4c2c",
  tensorflow:  "#ff6f00",
};

export const FALLBACK_PALETTE = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316",
  "#eab308", "#84cc16", "#10b981", "#06b6d4", "#3b82f6",
];

/** Returns the hex color for a tech name, falling back to palette. */
export function getLangColor(tech, fallbackIndex = 0) {
  const key = tech.toLowerCase().replace(/[\s.]/g, "");
  return LANG_COLORS[key] ?? FALLBACK_PALETTE[fallbackIndex % FALLBACK_PALETTE.length];
}

/**
 * Colored tech tag style map — bg + text for project card pills.
 * Designed to be readable on white cards.
 */
const TECH_TAG_STYLES = {
  react:       { bg: "#fef2f2", text: "#dc2626" },
  javascript:  { bg: "#fefce8", text: "#a16207" },
  js:          { bg: "#fefce8", text: "#a16207" },
  typescript:  { bg: "#eff6ff", text: "#1d4ed8" },
  ts:          { bg: "#eff6ff", text: "#1d4ed8" },
  tailwind:    { bg: "#f0fdfa", text: "#0e7490" },
  tailwindcss: { bg: "#f0fdfa", text: "#0e7490" },
  node:        { bg: "#f0fdf4", text: "#15803d" },
  nodejs:      { bg: "#f0fdf4", text: "#15803d" },
  postgresql:  { bg: "#eff6ff", text: "#1e40af" },
  postgres:    { bg: "#eff6ff", text: "#1e40af" },
  python:      { bg: "#eff6ff", text: "#1d4ed8" },
  rust:        { bg: "#fff7ed", text: "#c2410c" },
  go:          { bg: "#ecfdf5", text: "#059669" },
  docker:      { bg: "#eff6ff", text: "#2563eb" },
  kubernetes:  { bg: "#eff6ff", text: "#3b82f6" },
  vue:         { bg: "#f0fdf4", text: "#15803d" },
  mongodb:     { bg: "#f0fdf4", text: "#15803d" },
  fastapi:     { bg: "#ecfdf5", text: "#059669" },
  pytorch:     { bg: "#fff7ed", text: "#ea580c" },
  graphql:     { bg: "#fdf4ff", text: "#a21caf" },
  swift:       { bg: "#fff7ed", text: "#ea580c" },
  kotlin:      { bg: "#f5f3ff", text: "#7c3aed" },
  angular:     { bg: "#fef2f2", text: "#dc2626" },
  svelte:      { bg: "#fff7ed", text: "#c2410c" },
};

/** Returns { bg, text } for a colored tech badge in project cards. */
export function getTagStyle(tech) {
  const key = tech.toLowerCase().replace(/[\s.]/g, "");
  if (TECH_TAG_STYLES[key]) return TECH_TAG_STYLES[key];
  // Fallback using LANG_COLORS
  const baseColor = LANG_COLORS[key];
  if (baseColor) return { bg: baseColor + "18", text: baseColor };
  return { bg: "var(--color-bg-elevated)", text: "var(--color-text-secondary)" };
}
