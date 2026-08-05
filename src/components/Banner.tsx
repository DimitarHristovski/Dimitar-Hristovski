import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "./contexts/ThemeContext";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export const Banner = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`relative min-h-[300px] w-full overflow-hidden sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] ${
        theme === "dark" ? "bg-dark-cosmic" : ""
      }`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.1 }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
        {/* Main heading */}
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-3 sm:mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-accent via-fiery-orange to-energy-red drop-shadow-2xl leading-tight"
        >
          {t("HeroTitle")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg px-2 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {t("HeroParagraph")}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-4 sm:px-6 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {t("HeroDescription")}
        </motion.p>

        {/* Social Links */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-4 sm:gap-6 justify-center items-center"
        >
          <motion.a
            href="https://github.com/DimitarHristovski"
            className={`group relative p-3 sm:p-4 rounded-full transition-all duration-300 overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 text-gray-300 hover:text-white border border-gray-700/50"
                : "bg-white/90 backdrop-blur-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 shadow-lg hover:shadow-xl border border-gray-200/50"
            }`}
            aria-label="GitHub Profile"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-deep-purple/20 to-fiery-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Github size={20} className="sm:w-6 sm:h-6 relative z-10" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/dimitar-hristovski-1711a9163"
            className={`group relative p-3 sm:p-4 rounded-full transition-all duration-300 overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 text-gray-300 hover:text-white border border-gray-700/50"
                : "bg-white/90 backdrop-blur-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 shadow-lg hover:shadow-xl border border-gray-200/50"
            }`}
            aria-label="LinkedIn Profile"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-hero-blue/20 to-deep-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Linkedin size={20} className="sm:w-6 sm:h-6 relative z-10" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/dimitar_uiux"
            className={`group relative p-3 sm:p-4 rounded-full transition-all duration-300 overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 text-gray-300 hover:text-white border border-gray-700/50"
                : "bg-white/90 backdrop-blur-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 shadow-lg hover:shadow-xl border border-gray-200/50"
            }`}
            aria-label="Instagram Profile"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Instagram size={20} className="sm:w-6 sm:h-6 relative z-10" />
          </motion.a>
          <motion.a
            href="mailto:dimihbt@yahoo.com"
            className={`group relative p-3 sm:p-4 rounded-full transition-all duration-300 overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 text-gray-300 hover:text-white border border-gray-700/50"
                : "bg-white/90 backdrop-blur-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 shadow-lg hover:shadow-xl border border-gray-200/50"
            }`}
            aria-label="Email Contact"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fiery-orange/20 to-energy-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Mail size={20} className="sm:w-6 sm:h-6 relative z-10" />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};
