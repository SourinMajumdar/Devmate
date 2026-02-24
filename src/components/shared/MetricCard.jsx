/**
 * MetricCard — Large number with muted label.
 * Used in the Momentum / Analytics overview section.
 * Hover: border darkens + 2px lift (via .card styles).
 */
const MetricCard = ({ label, value, sub, icon, style }) => {
  return (
    <div
      className="card"
      style={{
        padding: "var(--space-md)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-xs)",
        ...style,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "var(--font-size-meta)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--color-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          marginTop: "var(--space-xs)",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "36px",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-text-primary)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {value}
        </h3>
        {icon && (
          <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
        )}
      </div>

      {sub && (
        <p
          style={{
            margin: 0,
            fontSize: "var(--font-size-meta)",
            color: "var(--color-text-muted)",
            marginTop: "var(--space-xs)",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
};

export default MetricCard;
