const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

/* CSS filters to override icon colour where needed */
const TECH_ICON_FILTERS = {
  /* Converts any dark icon → Framer Motion red #e8372a */
  "Framer Motion":
    "brightness(0) saturate(100%) invert(23%) sepia(97%) saturate(1700%) hue-rotate(350deg) brightness(108%) contrast(102%)",
};

export const TECH_LOGOS = {
  React:        `${DEVICON_BASE}react/react-original.svg`,
  TypeScript:   `${DEVICON_BASE}typescript/typescript-original.svg`,
  JavaScript:   `${DEVICON_BASE}javascript/javascript-original.svg`,
  Python:       `${DEVICON_BASE}python/python-original.svg`,
  Rust:         `${DEVICON_BASE}rust/rust-original.svg`,
  Go:           `${DEVICON_BASE}go/go-original.svg`,
  "Node.js":    `${DEVICON_BASE}nodejs/nodejs-original.svg`,
  Vue:          `${DEVICON_BASE}vuejs/vuejs-original.svg`,
  "Next.js":    `${DEVICON_BASE}nextjs/nextjs-original.svg`,
  PostgreSQL:   `${DEVICON_BASE}postgresql/postgresql-original.svg`,
  Docker:       `${DEVICON_BASE}docker/docker-original.svg`,
  MongoDB:      `${DEVICON_BASE}mongodb/mongodb-original.svg`,
  Redis:        `${DEVICON_BASE}redis/redis-original.svg`,
  Git:          `${DEVICON_BASE}git/git-original.svg`,
  Vite:         `${DEVICON_BASE}vitejs/vitejs-original.svg`,
  Figma:        `${DEVICON_BASE}figma/figma-original.svg`,
  PyTorch:      `${DEVICON_BASE}pytorch/pytorch-original.svg`,
  TensorFlow:   `${DEVICON_BASE}tensorflow/tensorflow-original.svg`,
  FastAPI:      `${DEVICON_BASE}fastapi/fastapi-original.svg`,
  Kubernetes:   `${DEVICON_BASE}kubernetes/kubernetes-plain.svg`,
  Angular:      `${DEVICON_BASE}angularjs/angularjs-original.svg`,
  Svelte:       `${DEVICON_BASE}svelte/svelte-original.svg`,
  Tailwind:     `${DEVICON_BASE}tailwindcss/tailwindcss-original.svg`,
  TailwindCSS:  `${DEVICON_BASE}tailwindcss/tailwindcss-original.svg`,
  GraphQL:      `${DEVICON_BASE}graphql/graphql-plain.svg`,
  Java:         `${DEVICON_BASE}java/java-original.svg`,
  "C++":        `${DEVICON_BASE}cplusplus/cplusplus-original.svg`,
  Swift:        `${DEVICON_BASE}swift/swift-original.svg`,
  Kotlin:       `${DEVICON_BASE}kotlin/kotlin-original.svg`,
  PHP:          `${DEVICON_BASE}php/php-original.svg`,
  Ruby:         `${DEVICON_BASE}ruby/ruby-original.svg`,
  "Framer Motion": `${DEVICON_BASE}framermotion/framermotion-original.svg`,
};

/**
 * TechBadge — renders a tech stack pill with a logo (if recognized) + name.
 * size: "md" (default) | "sm"
 */
const TechBadge = ({ tech, size = "md" }) => {
  const logoUrl = TECH_LOGOS[tech];
  const iconFilter = TECH_ICON_FILTERS[tech] || undefined;
  const isSmall = size === "sm";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isSmall ? "3px" : "5px",
        background: "var(--color-bg-elevated)",
        padding: isSmall ? "2px 6px" : "4px 10px",
        borderRadius: "var(--radius-sm)",
        fontSize: isSmall ? "11px" : "var(--font-size-meta)",
        color: "var(--color-text-secondary)",
        fontWeight: "var(--font-weight-medium)",
        border: "1px solid var(--color-border)",
        lineHeight: 1.5,
        whiteSpace: "nowrap",
      }}
    >
      {logoUrl && (
        <img
          src={logoUrl}
          alt=""
          aria-hidden="true"
          style={{
            width: isSmall ? "12px" : "14px",
            height: isSmall ? "12px" : "14px",
            objectFit: "contain",
            flexShrink: 0,
            filter: iconFilter,
          }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      )}
      {tech}
    </span>
  );
};

export default TechBadge;
