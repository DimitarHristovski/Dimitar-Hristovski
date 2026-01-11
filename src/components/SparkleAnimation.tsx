import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./contexts/ThemeContext";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const SparkleAnimation = () => {
  const { theme } = useTheme();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Create initial sparkles
    const createSparkles = () => {
      const newSparkles: Sparkle[] = [];
      const sparkleCount = 30;

      for (let i = 0; i < sparkleCount; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          duration: Math.random() * 2 + 1.5,
          delay: Math.random() * 2,
        });
      }

      setSparkles(newSparkles);
    };

    createSparkles();

    // Hide sparkles after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {sparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1, 0],
                rotate: [0, 180, 360],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: sparkle.duration,
                delay: sparkle.delay,
                ease: "easeOut",
              }}
              className="absolute"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
              }}
            >
              {/* Main sparkle */}
              <div
                className={`absolute inset-0 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500"
                    : "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600"
                } shadow-lg`}
                style={{
                  boxShadow: `0 0 ${sparkle.size * 2}px ${
                    theme === "dark" ? "rgba(253, 224, 71, 0.8)" : "rgba(234, 179, 8, 0.8)"
                  }`,
                }}
              />
              {/* Outer glow */}
              <div
                className={`absolute inset-0 rounded-full ${
                  theme === "dark"
                    ? "bg-yellow-300/40"
                    : "bg-yellow-400/40"
                } blur-sm`}
                style={{
                  transform: "scale(1.5)",
                }}
              />
              {/* Light rays */}
              <div
                className={`absolute inset-0 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-yellow-300/60 via-yellow-400/80 to-yellow-300/60"
                    : "bg-gradient-to-r from-yellow-400/60 via-yellow-500/80 to-yellow-400/60"
                }`}
                style={{
                  width: `${sparkle.size * 3}px`,
                  height: "2px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) rotate(0deg)",
                }}
              />
              <div
                className={`absolute inset-0 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-yellow-300/60 via-yellow-400/80 to-yellow-300/60"
                    : "bg-gradient-to-r from-yellow-400/60 via-yellow-500/80 to-yellow-400/60"
                }`}
                style={{
                  width: "2px",
                  height: `${sparkle.size * 3}px`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) rotate(0deg)",
                }}
              />
            </motion.div>
          ))}

          {/* Light burst effect in center */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0, 1.5, 2] }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className="w-32 h-32 rounded-full blur-2xl"
              style={{
                background: theme === "dark"
                  ? "radial-gradient(circle, rgba(253, 224, 71, 0.4) 0%, rgba(253, 224, 71, 0.2) 50%, transparent 100%)"
                  : "radial-gradient(circle, rgba(234, 179, 8, 0.4) 0%, rgba(234, 179, 8, 0.2) 50%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* Floating light particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              initial={{
                opacity: 0,
                x: "50%",
                y: "50%",
                scale: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
              className="absolute"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  theme === "dark"
                    ? "bg-yellow-300"
                    : "bg-yellow-400"
                } shadow-lg`}
                style={{
                  boxShadow: `0 0 8px ${
                    theme === "dark" ? "rgba(253, 224, 71, 0.8)" : "rgba(234, 179, 8, 0.8)"
                  }`,
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default SparkleAnimation;

