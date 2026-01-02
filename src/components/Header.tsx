import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Globe, ChevronDown } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "mk", label: "Македонски", flag: "🇲🇰" },
];

const Header = () => {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-opacity-80"
          : "backdrop-blur-md bg-opacity-60"
      } ${
        theme === "dark"
          ? "bg-gray-900/60 border-b border-gray-800/50"
          : "bg-white/60 border-b border-gray-200/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <span
              className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                theme === "dark"
                  ? "from-blue-400 to-purple-400"
                  : "from-blue-600 to-purple-600"
              }`}
            >
              DH
            </span>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800/80 hover:bg-gray-700/80 text-yellow-400"
                  : "bg-gray-100/80 hover:bg-gray-200/80 text-gray-700"
              } backdrop-blur-sm border ${
                theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
              }`}
              aria-label="Toggle theme"
            >
              <motion.div
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
                )}
              </motion.div>
              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                  theme === "dark"
                    ? "bg-yellow-400/20"
                    : "bg-blue-500/20"
                }`}
              />
            </motion.button>

            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800/80 hover:bg-gray-700/80 text-gray-100"
                    : "bg-gray-100/80 hover:bg-gray-200/80 text-gray-700"
                } backdrop-blur-sm border ${
                  theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
                }`}
                aria-label="Change language"
              >
               
                <span className="text-sm font-medium hidden sm:inline">
                  {currentLanguage.flag} {currentLanguage.label}
                </span>
                <span className="text-sm font-medium sm:hidden">
                  {currentLanguage.flag}
                </span>
                <motion.div
                  animate={{ rotate: isLangOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </motion.button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl ${
                      theme === "dark"
                        ? "bg-gray-800/90 border border-gray-700/50"
                        : "bg-white/90 border border-gray-200/50"
                    }`}
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                          i18n.language === lang.code
                            ? theme === "dark"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-blue-500/10 text-blue-600"
                            : theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700/50"
                            : "text-gray-700 hover:bg-gray-100/50"
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.label}</span>
                        {i18n.language === lang.code && (
                          <motion.div
                            layoutId="activeLang"
                            className={`ml-auto w-2 h-2 rounded-full ${
                              theme === "dark" ? "bg-blue-400" : "bg-blue-600"
                            }`}
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isLangOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLangOpen(false)}
        />
      )}
    </motion.header>
  );
};

export default Header;

