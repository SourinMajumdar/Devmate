/**
 * Button — Primary / Secondary / Danger
 * Consistent sizing, hover behaviour, no scale animations.
 */
const Button = ({
  variant = "primary",
  children,
  onClick,
  type = "button",
  style,
  className = "",
  disabled = false,
  ...rest
}) => {
  const cls = `btn-${variant} ${className}`.trim();
  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
