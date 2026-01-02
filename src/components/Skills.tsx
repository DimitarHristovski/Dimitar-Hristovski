import React from "react";
import { Code, Palette, Bot } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./contexts/ThemeContext";
import { motion } from "framer-motion";

export const Skills = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const skills = [
    {
      icon: <Code size={32} />,
      title: t("Fullstack Develpoment"),
      description: t("SkillFullstackDescription"),
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: theme === "dark" ? "from-blue-900/20 to-cyan-900/20" : "from-blue-50 to-cyan-50",
    },
    {
      icon: <Bot size={32} />,
      title: t("AI"),
      description: t("SkillAIDescription"),
      gradient: "from-purple-500 to-pink-500",
      bgGradient: theme === "dark" ? "from-purple-900/20 to-pink-900/20" : "from-purple-50 to-pink-50",
    },
    {
      icon: <Palette size={32} />,
      title: t("UIUX"),
      description: t("SkillUIDescription"),
      gradient: "from-orange-500 to-red-500",
      bgGradient: theme === "dark" ? "from-orange-900/20 to-red-900/20" : "from-orange-50 to-red-50",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section
      className={`py-24 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-b from-white to-gray-50 text-gray-800"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
          theme === "dark" ? "bg-blue-500" : "bg-blue-300"
        }`} />
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
          theme === "dark" ? "bg-purple-500" : "bg-purple-300"
        }`} />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-5xl font-bold mb-16 text-center ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {t("SkillsSectionTitle")}
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative group p-8 rounded-2xl transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600"
                  : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-2xl"
              }`}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
              />

              <div className="relative z-10">
                <motion.div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${skill.gradient} mb-6 text-white shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {skill.icon}
                </motion.div>

                <h3
                  className={`text-2xl font-bold mb-4 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {skill.title}
                </h3>

                <p
                  className={`leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {skill.description}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
