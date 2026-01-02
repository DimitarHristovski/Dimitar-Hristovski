import React from "react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "../../public/assets/Data/Data";
import { useTranslation } from "react-i18next";
import { useTheme } from "./contexts/ThemeContext";
import { motion } from "framer-motion";

export const Projects = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
          theme === "dark" ? "bg-blue-500" : "bg-blue-300"
        }`} />
        <div className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
          theme === "dark" ? "bg-purple-500" : "bg-purple-300"
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-5xl font-bold mb-16 text-center ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {t("projects")}
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600"
                  : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-2xl"
              }`}
              whileHover={{ y: -8 }}
            >
              {/* Image container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {project.title}
                </h3>

                <p
                  className={`mb-6 leading-relaxed line-clamp-3 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {t(project.descriptionKey)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        theme === "dark"
                          ? "bg-gray-700/50 text-gray-300 border border-gray-600"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-gray-700/50">
                  <motion.a
                    href={project.githubUrl}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      theme === "dark"
                        ? "bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </motion.a>
                  {project.hostedUrl !== "#" && (
                    <motion.a
                      href={project.hostedUrl}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={18} />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
