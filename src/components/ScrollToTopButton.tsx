import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./contexts/ThemeContext";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / windowHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div
        className={`fixed top-0 left-0 right-0 h-1 z-50 origin-left transition-transform duration-150 ${
          theme === "dark" ? "bg-gradient-to-r from-hero-blue to-fiery-orange" : "bg-gradient-to-r from-hero-blue to-fiery-orange"
        }`}
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-40 ${
              theme === "dark"
                ? "bg-gradient-to-br from-hero-blue to-fiery-orange text-white hover:from-hero-blue/90 hover:to-fiery-orange/90"
                : "bg-gradient-to-br from-hero-blue to-fiery-orange text-white hover:from-hero-blue/90 hover:to-fiery-orange/90"
            } transition-all duration-300 group`}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp size={20} className="relative z-10" />
            </motion.div>
            {/* Glow effect */}
            <div
              className={`absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity ${
                theme === "dark"
                  ? "bg-gradient-to-br from-hero-blue to-fiery-orange"
                  : "bg-gradient-to-br from-hero-blue to-fiery-orange"
              }`}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
