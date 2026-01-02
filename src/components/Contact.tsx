import React from "react";
import { Mail, Send, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./contexts/ThemeContext";
import { motion } from "framer-motion";

export const Contact = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <section
      className={`py-24 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-blue-50 text-gray-800"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 ${
          theme === "dark" ? "bg-blue-500" : "bg-blue-400"
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 ${
          theme === "dark" ? "bg-purple-500" : "bg-purple-400"
        }`} />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            <MessageCircle size={16} />
            <span>Get In Touch</span>
          </motion.div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {t("ContactTitle")}
          </h2>

          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("ContactDescription")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <motion.a
            href="mailto:dimihbt@yahoo.com"
            className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <Mail size={24} className="relative z-10" />
            <span className="relative z-10">{t("ContactButton")}</span>
            <Send
              size={20}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.a>
        </motion.div>

        {/* Additional contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-12 p-6 rounded-xl text-center ${
            theme === "dark"
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white/50 border border-gray-200"
          }`}
        >
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Email:{" "}
            <a
              href="mailto:dimihbt@yahoo.com"
              className={`font-semibold hover:underline ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              dimihbt@yahoo.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
