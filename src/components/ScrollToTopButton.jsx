import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 12, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.85 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          title="Back to top"
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 200,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "var(--color-accent)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(37, 99, 235, 0.35)",
            transition: "background var(--transition)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--color-accent-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--color-accent)")
          }
        >
          <ArrowUp style={{ width: "17px", height: "17px", strokeWidth: 2.5 }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
