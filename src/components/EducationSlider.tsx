import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./contexts/ThemeContext";
import { GraduationCap } from "lucide-react";

interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
  website?: string;
}

// Education data
const educationData: Education[] = [
  {
    institution: "Faculty of Information and Communication Technologies - Bitola",
    degree: "University St. Kliment Ohridski Bitola",
    period: "2013 - 2018",
    description: "Studied Information and Communication Technologies, focusing on software development, computer science fundamentals, and modern web technologies. Gained comprehensive knowledge in programming, databases, networking, and system design.",
    website: "https://www.uklo.edu.mk/",
  },
  {
    institution: "Brainster Academy",
    degree: "Frontend Web Development Skopje",
    period: "2022 - 2024",
    description: "Intensive Frontend web development program covering modern technologies including React.js, Next.js, and best practices. Participated in hands-on projects, and collaborative learning experiences.",
    website: "https://brainster.co/",
  },
  {
    institution: "Brainster Academy",
    degree: "AI-atWork Skopje",
    period: "2025-present",
    description: "Comprehensive AI and automation program focusing on building AI-driven solutions, implementing RAG pipelines, and working with modern AI tools and frameworks. Gained expertise in AI engineering, automation, and intelligent system development.",
    website: "https://brainster.co/",
  },
];

export const EducationSlider = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideDuration = 5000; // 5 seconds per slide

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % educationData.length);
    }, slideDuration);

    return () => clearInterval(interval);
  }, []);

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
              Education
            </h2>
          </div>
          <p
            className={`text-lg md:text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Universities and Academies I've attended
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
                  className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r hover:opacity-80 transition-opacity cursor-pointer inline-block ${
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
                  className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
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
                className={`text-base md:text-lg leading-relaxed max-w-3xl ${
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

