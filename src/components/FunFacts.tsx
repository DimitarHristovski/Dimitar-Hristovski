import { motion } from "framer-motion";
import { Sparkles, Coffee, Gamepad2, Lightbulb, Code2, Palette, Monitor } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export const FunFacts = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const facts = [
    {
      icon: <Coffee size={32} />,
      title: t("FunFactsCoffeeTitle"),
      description: t("FunFactsCoffeeDesc"),
      color: "from-gold-accent to-fiery-orange",
    },
    {
      icon: <Gamepad2 size={32} />,
      title: t("FunFactsGameTitle"),
      description: t("FunFactsGameDesc"),
      color: "from-deep-purple to-hero-blue",
    },
    {
      icon: <Lightbulb size={32} />,
      title: t("FunFactsProblemTitle"),
      description: t("FunFactsProblemDesc"),
      color: "from-hero-blue to-fiery-orange",
    },
    {
      icon: <Sparkles size={32} />,
      title: t("FunFactsTechTitle"),
      description: t("FunFactsTechDesc"),
      color: "from-fiery-orange to-energy-red",
    },
  ];

  const techPreferences = [
    { 
      label: t("FunFactsFavoriteFramework"), 
      value: "React/Next.js",
      icon: <Code2 size={24} />,
      color: "from-hero-blue to-deep-purple",
    },
    { 
      label: t("FunFactsPreferredLanguage"), 
      value: "TypeScript",
      icon: <Code2 size={24} />,
      color: "from-deep-purple to-hero-blue",
    },
    { 
      label: t("FunFactsDesignTool"), 
      value: "Figma",
      icon: <Palette size={24} />,
      color: "from-fiery-orange to-energy-red",
    },
    { 
      label: t("FunFactsCodeEditor"), 
      value: "VS Code",
      icon: <Monitor size={24} />,
      color: "from-gold-accent to-fiery-orange",
    },
  ];

  return (
    <section
      className={`py-24 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-dark-cosmic to-dark-cosmic text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === "dark" ? "white" : "black"} 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full mb-6 text-sm font-semibold border-2"
            style={{
              borderColor: theme === "dark" ? "rgba(247, 181, 0, 0.3)" : "rgba(247, 181, 0, 0.5)",
              color: theme === "dark" ? "#F7B500" : "#F7B500",
              backgroundColor: theme === "dark" ? "rgba(247, 181, 0, 0.1)" : "rgba(247, 181, 0, 0.05)",
            }}
          >
            <Sparkles size={16} className="inline mr-2" />
            {t("FunFactsBadge")}
          </motion.span>
          <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}>
            {t("FunFactsTitle")}
          </h2>
          <p className={`text-xl ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {t("FunFactsDescription")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Personal Interests */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-fiery-orange to-energy-red rounded-full" />
              <h3 className={`text-2xl font-bold ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}>
                {t("FunFactsPersonalInterests")}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {facts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl border-2 ${
                    theme === "dark"
                      ? "bg-dark-cosmic/50 border-cold-steel/30"
                      : "bg-white border-gray-200"
                  }`}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${fact.color} text-white mb-4 shadow-lg`}>
                    {fact.icon}
                  </div>
                  <h4 className={`font-bold text-base mb-2 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}>
                    {fact.title}
                  </h4>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {fact.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Preferences */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-hero-blue to-deep-purple rounded-full" />
              <h3 className={`text-2xl font-bold ${
                theme === "dark" ? "text-gray-100" : "text-gray-900"
              }`}>
                {t("FunFactsTechPreferences")}
              </h3>
            </div>
            <div className="space-y-4">
              {techPreferences.map((pref, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl border-2 ${
                    theme === "dark"
                      ? "bg-dark-cosmic/50 border-cold-steel/30"
                      : "bg-white border-gray-200"
                  }`}
                  whileHover={{ x: 5, scale: 1.01 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${pref.color} text-white`}>
                        {pref.icon}
                      </div>
                      <span className={`text-base font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {pref.label}
                      </span>
                    </div>
                    <span className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${pref.color}`}>
                      {pref.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
