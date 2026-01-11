import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ChevronDown } from "lucide-react";
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
    <>
      {/* Window Frame - Complete Frame Around Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none hidden lg:block"
        style={{ height: '4rem', padding: '0 1rem' }}
      >
        {/* Top Frame Bar */}
        <div
          className={`absolute top-0 left-4 right-4 h-3 ${
            isScrolled
              ? "backdrop-blur-xl bg-opacity-60"
              : "backdrop-blur-md bg-opacity-40"
          } ${
            theme === "dark"
              ? "bg-gray-900/40 border-2 border-gray-700/50"
              : "bg-white/40 border-2 border-gray-200/50"
          } rounded-t-xl`}
        />

        {/* Bottom Frame Bar */}
        <div
          className={`absolute bottom-0 left-4 right-4 h-3 ${
            isScrolled
              ? "backdrop-blur-xl bg-opacity-60"
              : "backdrop-blur-md bg-opacity-40"
          } ${
            theme === "dark"
              ? "bg-gray-900/40 border-2 border-gray-700/50"
              : "bg-white/40 border-2 border-gray-200/50"
          } rounded-b-xl`}
        />

        {/* Left Frame Bar */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-3 ${
            isScrolled
              ? "backdrop-blur-xl bg-opacity-60"
              : "backdrop-blur-md bg-opacity-40"
          } ${
            theme === "dark"
              ? "bg-gray-900/40 border-2 border-gray-700/50"
              : "bg-white/40 border-2 border-gray-200/50"
          } rounded-l-xl`}
        />

        {/* Right Frame Bar */}
        <div
          className={`absolute top-0 bottom-0 right-0 w-3 ${
            isScrolled
              ? "backdrop-blur-xl bg-opacity-60"
              : "backdrop-blur-md bg-opacity-40"
          } ${
            theme === "dark"
              ? "bg-gray-900/40 border-2 border-gray-700/50"
              : "bg-white/40 border-2 border-gray-200/50"
          } rounded-r-xl`}
        />

        {/* Corner Decorations - Top Left */}
        <div
          className={`absolute top-0 left-0 w-6 h-6 ${
            theme === "dark" ? "border-gray-600/80" : "border-gray-400/80"
          }`}
          style={{
            borderTopWidth: '3px',
            borderLeftWidth: '3px',
            borderTopColor: theme === "dark" ? "rgba(75, 85, 99, 0.8)" : "rgba(156, 163, 175, 0.8)",
            borderLeftColor: theme === "dark" ? "rgba(75, 85, 99, 0.8)" : "rgba(156, 163, 175, 0.8)",
          }}
        />
        <div
          className={`absolute top-1 left-1 w-3 h-3 ${
            theme === "dark" ? "border-gray-500/60" : "border-gray-300/60"
          }`}
          style={{
            borderTopWidth: '2px',
            borderLeftWidth: '2px',
            borderTopColor: theme === "dark" ? "rgba(107, 114, 128, 0.6)" : "rgba(209, 213, 219, 0.6)",
            borderLeftColor: theme === "dark" ? "rgba(107, 114, 128, 0.6)" : "rgba(209, 213, 219, 0.6)",
          }}
        />

        {/* Corner Decorations - Top Right */}
        <div
          className={`absolute top-0 right-0 w-6 h-6 ${
            theme === "dark" ? "border-gray-600/80" : "border-gray-400/80"
          }`}
          style={{
            borderTopWidth: '3px',
            borderRightWidth: '3px',
            borderTopColor: theme === "dark" ? "rgba(75, 85, 99, 0.8)" : "rgba(156, 163, 175, 0.8)",
            borderRightColor: theme === "dark" ? "rgba(75, 85, 99, 0.8)" : "rgba(156, 163, 175, 0.8)",
          }}
        />
        <div
          className={`absolute top-1 right-1 w-3 h-3 ${
            theme === "dark" ? "border-gray-500/60" : "border-gray-300/60"
          }`}
          style={{
            borderTopWidth: '2px',
            borderRightWidth: '2px',
            borderTopColor: theme === "dark" ? "rgba(107, 114, 128, 0.6)" : "rgba(209, 213, 219, 0.6)",
            borderRightColor: theme === "dark" ? "rgba(107, 114, 128, 0.6)" : "rgba(209, 213, 219, 0.6)",
          }}
        />

        {/* Corner Decorations - Bottom Left */}
        <div
          className={`absolute bottom-0 left-0 w-6 h-6 ${
            theme === "dark" ? "border-gray-600/80" : "border-gray-400/80"
          }`}
          style={{
            borderBottomWidth: '3px',
            borderLeftWidth: '3px',
            borderBottomColor: theme === "dark" ? "rgba(75, 85, 99, 0.8)" : "rgba(156, 163, 175, 0.8)",
            borderLeftColor: theme === "dark" ? "rgba(75, 85, 99, 0.8)" : "rgba(156, 163, 175, 0.8)",
          }}
        />
        <div
          className={`absolute bottom-1 left-1 w-3 h-3 ${
            theme === "dark" ? "border-gray-500/60" : "border-gray-300/60"
          }`}
          style={{
            borderBottomWidth: '2px',
            borderLeftWidth: '2px',
            borderBottomColor: theme === "dark" ? "rgba(107, 114, 128, 0.6)" : "rgba(209, 213, 219, 0.6)",
            borderLeftColor: theme === "dark" ? "rgba(107, 114, 128, 0.6)" : "rgba(209, 213, 219, 0.6)",
          }}
        />

        {/* Corner Decorations - Bottom Right */}
        <div
          className={`absolute bottom-0 right-0 w-6 h-6 ${
            theme === "dark" ? "border-gray-600/80" : "border-gray-400/80"
          }`}
          style={{
            borderBottomWidth: '3px',
            borderRightWidth: '3px',
            borderBottomColor: theme === "dark" ? "rgba(75, 85, 99, 0.8)" : "rgba(156, 163, 175, 0.8)",
            borderRightColor: theme === "dark" ? "rgba(75, 85, 99, 0.8)" : "rgba(156, 163, 175, 0.8)",
          }}
        />
        <div
          className={`absolute bottom-1 right-1 w-3 h-3 ${
            theme === "dark" ? "border-gray-500/60" : "border-gray-300/60"
          }`}
          style={{
            borderBottomWidth: '2px',
            borderRightWidth: '2px',
            borderBottomColor: theme === "dark" ? "rgba(107, 114, 128, 0.6)" : "rgba(209, 213, 219, 0.6)",
            borderRightColor: theme === "dark" ? "rgba(107, 114, 128, 0.6)" : "rgba(209, 213, 219, 0.6)",
          }}
        />
      </motion.div>

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
            ? "bg-dark-cosmic/60 border-b border-dark-cosmic/50"
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
                  ? "from-gold-accent to-fiery-orange"
                  : "from-hero-blue to-fiery-orange"
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
                    ? "bg-gold-accent/20"
                    : "bg-fiery-orange/20"
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
                              ? "bg-hero-blue/20 text-hero-blue"
                              : "bg-hero-blue/10 text-hero-blue"
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
                              theme === "dark" ? "bg-hero-blue" : "bg-hero-blue"
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
    </>
  );
};

export default Header;

