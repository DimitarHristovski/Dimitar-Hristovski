import { useState } from "react";
import { Github, ExternalLink, ArrowUpRight, Code, Gamepad2, Brain, Zap, Palette, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../../public/assets/Data/Data";
import { useTranslation } from "react-i18next";
import { useTheme } from "./contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useBotMischief } from "./contexts/BotMischiefContext";
import { BotMischiefWrapper } from "./BotMischiefWrapper";

type Category = "all" | "frontend" | "backend"| "gaming" | "ai-hicode" | "ai-nocode" | "uiux" | "profitable";

const categories: { id: Category; label: string; icon: React.ReactNode; color: string }[] = [
  { id: "all", label: "All Projects", icon: <Code size={18} />, color: "from-deep-purple to-hero-blue" },
  { id: "frontend", label: "Frontend", icon: <Code size={18} />, color: "from-hero-blue to-deep-purple" },
  { id: "backend", label: "Backend", icon: <Code size={18} />, color: "from-hero-blue to-deep-purple" },
  { id: "gaming", label: "Gaming", icon: <Gamepad2 size={18} />, color: "from-deep-purple to-hero-blue" },
  { id: "ai-hicode", label: "AI (High-Code)", icon: <Brain size={18} />, color: "from-gold-accent to-fiery-orange" },
  { id: "ai-nocode", label: "AI (No-Code)", icon: <Zap size={18} />, color: "from-fiery-orange to-energy-red" },
  { id: "uiux", label: "UI/UX Design", icon: <Palette size={18} />, color: "from-energy-red to-fiery-orange" },
  { id: "profitable", label: "Profitable", icon: <Palette size={18} />, color: "from-gold-accent to-fiery-orange" },
];

export const Projects = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const projectsPerPage = 6;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setCurrentPage(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const { shakeText } = useBotMischief();

  return (
    <motion.section
      id="projects-section"
      className={`py-24 relative overflow-hidden ${shakeText ? "text-shake" : ""} ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
          theme === "dark" ? "bg-deep-purple" : "bg-deep-purple/30"
        }`} />
        <div className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
          theme === "dark" ? "bg-fiery-orange" : "bg-fiery-orange/30"
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          className="text-center mb-12"
        >
          <motion.h2 
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t("projects")}
          </motion.h2>
          <motion.p 
            className={`text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Explore my work across different domains
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.7,
            type: "spring",
            stiffness: 100,
            delay: 0.3,
          }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : theme === "dark"
                    ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-md"
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${category.color} -z-10`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            {paginatedProjects.length > 0 ? (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {paginatedProjects.map((project) => {
                  const categoryInfo = categories.find(cat => cat.id === project.category);
                  return (
                    <BotMischiefWrapper key={project.id} elementId={`project-${project.id}`} elementType="project-card">
                      <motion.div
                        variants={itemVariants}
                        className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600"
                            : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-2xl"
                        }`}
                        whileHover={{ y: -8, scale: 1.02 }}
                      >
                      {/* Category Badge */}
                      <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryInfo?.color || "from-hero-blue to-fiery-orange"} text-white shadow-lg`}>
                        {categoryInfo?.label}
                      </div>

                      {/* Image container */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                        
                        {/* Hover effect overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${categoryInfo?.color || "from-hero-blue to-fiery-orange"} opacity-0 group-hover:opacity-25 transition-opacity duration-300`} />
                        
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6 relative">
                        <h3 className={`text-2xl font-bold mb-3 ${
                          theme === "dark" ? "text-gray-100" : "text-gray-800"
                        }`}>
                          {project.title}
                        </h3>

                        <p className={`mb-6 leading-relaxed line-clamp-3 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}>
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
                        <div className={`flex gap-4 pt-4 border-t ${
                          theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
                        }`}>
                          {project.githubUrl !== "#" && (
                            <motion.a
                              href={project.githubUrl}
                              className={`group/link relative inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all overflow-hidden ${
                                theme === "dark"
                                  ? "bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, x: 5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-500/20 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                              <Github size={18} className="relative z-10" />
                              <span className="relative z-10">Code</span>
                            </motion.a>
                          )}
                          {project.hostedUrl !== "#" && (
                            <motion.a
                              href={project.hostedUrl}
                              className={`group/link relative inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-gradient-to-r ${categoryInfo?.color || "from-hero-blue to-fiery-orange"} text-white hover:opacity-90 overflow-hidden`}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, x: 5 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                              <span className="relative z-10">Live Demo</span>
                              <ExternalLink size={16} className="relative z-10 transition-transform group-hover/link:translate-x-1" />
                              <ArrowUpRight size={18} />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      {/* Corner accent */}
                      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${categoryInfo?.color || "from-hero-blue to-fiery-orange"} rounded-bl-full opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                      </motion.div>
                    </BotMischiefWrapper>
                  );
                })}
              </motion.div>
            ) : (
              <div className={`text-center py-16 rounded-2xl ${
                theme === "dark" ? "bg-gray-800/50" : "bg-gray-100/50"
              }`}>
                <p className={`text-lg ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  No projects found in this category
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <motion.button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-all ${
                currentPage === 0
                  ? "opacity-50 cursor-not-allowed"
                  : theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-white hover:bg-gray-100 text-gray-700 shadow-md"
              }`}
            >
              <ChevronLeft size={20} />
            </motion.button>
            
            <div className={`flex gap-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}>
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    currentPage === index
                      ? `bg-gradient-to-r ${categories.find(cat => cat.id === activeCategory)?.color || "from-hero-blue to-fiery-orange"} text-white`
                      : theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-400"
                      : "bg-white hover:bg-gray-100 text-gray-600 shadow-md"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <motion.button
              onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPage === totalPages - 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-all ${
                currentPage === totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-white hover:bg-gray-100 text-gray-700 shadow-md"
              }`}
            >
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
