import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";

const languages = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "mk", label: "МК" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  const handleChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`  ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100 "
            : "bg-gray-50 text-gray-500"
        } ${"shadow-md rounded-full px-3 py-1 flex gap-2 items-center border border-gray-200"}`}
      >
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChange(lang.code)}
            className={`px-2 py-1 rounded-full text-xs font-semibold transition-colors duration-200
              ${
                i18n.language === lang.code
                  ? "bg-blue-500 text-gray-100 hover:bg-blue-500"
                  : " text-gray-900 hover:bg-red-500"
              }`}
          >
            {lang.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
