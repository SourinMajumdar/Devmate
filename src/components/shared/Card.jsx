/**
 * Card — Base surface component
 * Neutral background, subtle border, clean shadow.
 * hover: border darkens + 2px lift (no glow, no scale).
 */
const Card = ({
  children,
  style,
  className = "",
  noHover = false,
  as: Tag = "div",
  ...rest
}) => {
  return (
    <Tag
      className={`card${noHover ? " card--no-hover" : ""} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Card;
