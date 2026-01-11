import React from "react";
import { useTheme } from "./contexts/ThemeContext";
import ScrollToTopButton from "./ScrollToTopButton";
import ChatWidget from "./ChatMessage";
import { motion } from "framer-motion";

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`py-12 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-600"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-5 ${
          theme === "dark" ? "bg-blue-500" : "bg-blue-300"
        }`} />
      </div>

      <ChatWidget />
      <ScrollToTopButton />
      
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={`h-px w-24 mx-auto mb-6 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-300"
          }`} />
          <p className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            © {new Date().getFullYear()} Dimitar Hristovski. All rights reserved.
          </p>
          <p className={`text-xs mt-2 ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}>
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
