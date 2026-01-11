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
      gradient: "from-hero-blue to-deep-purple",
      bgGradient: theme === "dark" ? "from-hero-blue/20 to-deep-purple/20" : "from-hero-blue/10 to-deep-purple/10",
      proficiency: 90,
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "Express"],
    },
    {
      icon: <Bot size={32} />,
      title: t("AI"),
      description: t("SkillAIDescription"),
      gradient: "from-gold-accent to-fiery-orange",
      bgGradient: theme === "dark" ? "from-gold-accent/20 to-fiery-orange/20" : "from-gold-accent/10 to-fiery-orange/10",
      proficiency: 85,
      technologies: ["LangChain", "LangGraph", "RAG", "Pinecone", "VectorDB"],
    },
    {
      icon: <Palette size={32} />,
      title: t("UIUX"),
      description: t("SkillUIDescription"),
      gradient: "from-fiery-orange to-energy-red",
      bgGradient: theme === "dark" ? "from-fiery-orange/20 to-energy-red/20" : "from-fiery-orange/10 to-energy-red/10",
      proficiency: 88,
      technologies: ["Figma", "Protopie", "Bootstrap Studio", "Design Systems"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 15,
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
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
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
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
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
                  className={`leading-relaxed mb-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {skill.description}
                </p>

                {/* Proficiency Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Proficiency
                    </span>
                    <span className={`text-xs font-bold ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}>
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full`}
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        theme === "dark"
                          ? "bg-gray-700/50 text-gray-300 border border-gray-600"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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
