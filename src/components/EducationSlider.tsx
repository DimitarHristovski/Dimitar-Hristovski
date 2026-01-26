import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { GraduationCap } from "lucide-react";

interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
  website?: string;
}

export const EducationSlider = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideDuration = 5000; // 5 seconds per slide

  // Education data with translations
  const educationData: Education[] = useMemo(
    () => [
      {
        institution: t("EducationUniversity1"),
        degree: t("EducationUniversity1Degree"),
        period: t("EducationUniversity1Period"),
        description: t("EducationUniversity1Description"),
        website: "https://www.uklo.edu.mk/",
      },
      {
        institution: t("EducationBrainster1"),
        degree: t("EducationBrainster1Degree"),
        period: t("EducationBrainster1Period"),
        description: t("EducationBrainster1Description"),
        website: "https://brainster.co/",
      },
      {
        institution: t("EducationBrainster2"),
        degree: t("EducationBrainster2Degree"),
        period: t("EducationBrainster2Period"),
        description: t("EducationBrainster2Description"),
        website: "https://brainster.co/",
      },
    ],
    [t]
  );

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % educationData.length);
    }, slideDuration);

    return () => clearInterval(interval);
  }, [educationData.length, slideDuration]);

  const currentEducation = educationData[currentIndex];

  return (
    <section
      className={`py-16 md:py-24 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-dark-cosmic to-dark-cosmic text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <GraduationCap
              size={32}
              className={theme === "dark" ? "text-gold-accent" : "text-deep-purple"}
            />
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {t("EducationTitle")}
            </h2>
          </div>
          <p
            className={`text-lg md:text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("EducationSubtitle")}
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative h-96 md:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`absolute inset-0 rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col justify-center ${
                theme === "dark"
                  ? "bg-gray-800/90 backdrop-blur-sm border border-gray-700"
                  : "bg-white/90 backdrop-blur-sm border border-gray-200"
              }`}
            >
              {/* Institution Name (H1) */}
              {currentEducation.website ? (
                <motion.a
                  href={currentEducation.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`text-1xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r hover:opacity-80 transition-opacity cursor-pointer inline-block ${
                    theme === "dark"
                      ? "from-gold-accent via-fiery-orange to-energy-red"
                      : "from-deep-purple via-fiery-orange to-energy-red"
                  }`}
                >
                  {currentEducation.institution}
                </motion.a>
              ) : (
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`text-1xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
                    theme === "dark"
                      ? "from-gold-accent via-fiery-orange to-energy-red"
                      : "from-deep-purple via-fiery-orange to-energy-red"
                  }`}
                >
                  {currentEducation.institution}
                </motion.h1>
              )}

              {/* Degree */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className={`text-xl md:text-2xl font-semibold mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {currentEducation.degree}
              </motion.p>

              {/* Period */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={`text-base md:text-lg mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {currentEducation.period}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`text-sm md:text-lg leading-relaxed max-w-3xl ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {currentEducation.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {educationData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? theme === "dark"
                      ? "bg-gold-accent w-8"
                      : "bg-deep-purple w-8"
                    : theme === "dark"
                    ? "bg-gray-600 w-2"
                    : "bg-gray-300 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

