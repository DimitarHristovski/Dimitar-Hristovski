import React from "react";
import { Coffee, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./contexts/ThemeContext";
import { motion } from "framer-motion";

const About = () => {
  const { t } = useTranslation();
  const aboutParagraphKeys = ["AboutParagraph1", "AboutParagraph2"];
  const { theme } = useTheme();

  return (
    <section
      className={`py-24 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 ${
          theme === "dark" ? "bg-purple-500" : "bg-purple-300"
        }`} />
        <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 ${
          theme === "dark" ? "bg-blue-500" : "bg-blue-300"
        }`} />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/assets/start.jpeg"
                alt="Profile"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  theme === "dark"
                    ? "from-gray-900/50 to-transparent"
                    : "from-white/20 to-transparent"
                }`}
              />
            </div>
            {/* Decorative elements */}
            <div
              className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-2xl opacity-30 ${
                theme === "dark" ? "bg-blue-500" : "bg-blue-400"
              }`}
            />
            <div
              className={`absolute -top-6 -left-6 w-24 h-24 rounded-full blur-2xl opacity-30 ${
                theme === "dark" ? "bg-purple-500" : "bg-purple-400"
              }`}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles size={16} />
              <span>About Me</span>
            </motion.div>

            <h2
              className={`text-4xl md:text-5xl font-bold mb-8 ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {t("AboutTitle")}
            </h2>

            <div className="space-y-6 mb-8">
              {aboutParagraphKeys.map((key, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                  className={`text-lg leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t(key)}
                </motion.p>
              ))}
            </div>

            <motion.div
              className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl ${
                theme === "dark"
                  ? "bg-gray-800/50 border border-gray-700"
                  : "bg-gray-100 border border-gray-200"
              }`}
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Coffee
                size={24}
                className={theme === "dark" ? "text-yellow-400" : "text-yellow-600"}
              />
              <span
                className={`font-semibold ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {t("AboutTagline")}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
