/**
 * FeatureCard — Icon + label card used in Hero and About page.
 * Same structure as dashboard cards. No glassmorphism.
 * Hover: border darkens + 2px lift (via .card styles).
 */
const FeatureCard = ({ icon: Icon, title, description, style }) => {
  return (
    <div
      className="card hero-feature-card"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "var(--space-md)",
        padding: "var(--space-md)",
        flex: 1,
        minWidth: "140px",
        ...style,
      }}
    >
      {Icon && (
        <Icon
          style={{
            width: "20px",
            height: "20px",
            color: "var(--color-accent)",
            strokeWidth: 2,
            flexShrink: 0,
          }}
        />
      )}
      <div>
        <span
          style={{
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-medium)",
            color: "var(--color-text-primary)",
            lineHeight: "var(--line-height-snug)",
          }}
        >
          {title}
        </span>
        {description && (
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "var(--font-size-meta)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--line-height-base)",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
