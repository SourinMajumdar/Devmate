import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      className="btn-secondary"
      style={{ padding: "8px", width: "36px", height: "36px" }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun style={{ width: "15px", height: "15px" }} />
      ) : (
        <Moon style={{ width: "15px", height: "15px" }} />
      )}
    </button>
  );
};

export default ThemeToggle;
