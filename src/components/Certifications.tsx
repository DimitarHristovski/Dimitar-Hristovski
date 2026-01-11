import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";

// Helper function to format certificate filename to readable title
const formatCertificateTitle = (filename: string): string => {
  return filename
    .replace(/^certificate-/, "")
    .replace(/\.jpg$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Get all certificate filenames
const certificateFiles = [
  "certificate-10-ad-variants-in-10-min-ai-powered-cross-channel-ad-creation.jpg",
  "certificate-30-minute-market-research-with-ai-from-weeks-to-minutes.jpg",
  "certificate-advanced-prompting-for-smarter-ai-use.jpg",
  "certificate-ai-analytics-in-microsoft-365-power-bi-copilot-and-viva-insights.jpg",
  "certificate-ai-driven-automation-for-competitive-analysis-tools-and-workflows-for-knowledge-workers.jpg",
  "certificate-ai-for-fast-prototyping-figma-ai-figma-make.jpg",
  "certificate-ai-image-generation-for-beginners-create-graphics-with-google-gemini-nano-banana.jpg",
  "certificate-ai-scams-and-deepfakes-a-practical-guide-to-staying-safe-and-protecting-your-privacy-in-the-age-of-ai.jpg",
  "certificate-all-about-ai-agents.jpg",
  "certificate-beyond-the-hype-a-business-first-approach-to-ai-for-marketing.jpg",
  "certificate-build-better-presentations-faster-designing-slides-with-ai-and-canva-vs-ai-and-gamma.jpg",
  "certificate-build-your-own-faq-bot.jpg",
  "certificate-building-an-ai-email-summary-bot.jpg",
  "certificate-deploy-your-faq-bot-web-internal-channels.jpg",
  "certificate-empathy-in-the-era-of-ai.jpg",
  "certificate-excel-with-aiturn-data-into-insights-fast.jpg",
  "certificate-forecasting-with-ai-from-quick-insights-to-strategic-predictions.jpg",
  "certificate-go-beyond-prompts-create-a-custom-ai-assistant-with-chatgpt.jpg",
  "certificate-how-to-use-ai-technical-tools-when-youre-non-technical.jpg",
  "certificate-mastering-chatgpt-practical-skills-for-high-impact-ai-workflows.jpg",
  "certificate-practical-ai-workshop-ai-for-outreach-write-faster-personalize-better.jpg",
  "certificate-prompt-engineering-for-professionals-supercharge-your-skills-with-ai.jpg",
  "certificate-smarter-documents-with-ai-docs-made-easy.jpg",
  "certificate-the-ai-powered-customer-experience-from-data-to-dynamic-personalization.jpg",
  "certificate-the-ai-powered-reporting-blueprint-automating-kpi-dashboards-with-generative-ai.jpg",
  "certificate-the-e-commerce-agent-how-ai-shops-compares-recommends.jpg",
  "certificate-the-future-of-recruitment-with-ai-how-companies-use-ai-to-hire-and-how-to-stand-out.jpg",
  "certificate-the-state-of-ai-today-and-whats-on-the-horizon-for-2026.jpg",
  "certificate-writing-with-ai-a-practical-guide-to-better-blogs-articles.jpg",
  "certificate-your-ai-vision-board-for-2026.jpg",
];

// Generate gradient colors for certificates
const getGradientColor = (index: number): string => {
  const gradients = [
    "from-hero-blue to-deep-purple",
    "from-gold-accent to-fiery-orange",
    "from-fiery-orange to-energy-red",
    "from-deep-purple to-hero-blue",
    "from-hero-blue to-fiery-orange",
    "from-gold-accent to-energy-red",
  ];
  return gradients[index % gradients.length];
};

export const Certifications = () => {
  const { theme } = useTheme();
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [certificatesPerView, setCertificatesPerView] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive certificates per view and mobile detection
  useEffect(() => {
    const updateResponsive = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 640) {
        setCertificatesPerView(1); // Mobile: 1 per view
      } else if (width < 1024) {
        setCertificatesPerView(2); // Tablet: 2 per view
      } else {
        setCertificatesPerView(3); // Desktop: 3 per view
      }
    };

    updateResponsive();
    window.addEventListener('resize', updateResponsive);
    return () => window.removeEventListener('resize', updateResponsive);
  }, []);

  const totalSlides = Math.ceil(certificateFiles.length / certificatesPerView);

  const openModal = (filename: string) => {
    setSelectedCertificate(filename);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = "unset";
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section
      className={`py-12 md:py-16 lg:py-24 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-dark-cosmic to-dark-cosmic text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
      style={
        theme === "light"
          ? {
              backgroundImage: "url('/assets/light-theme-background.png')",
              backgroundSize: !isMobile ? "50%" : "cover",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              backgroundAttachment: !isMobile ? "fixed" : "scroll",
            }
          : undefined
      }
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
          theme === "dark" ? "bg-gold-accent" : "bg-gold-accent/30"
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5 ${
          theme === "dark" ? "bg-hero-blue" : "bg-hero-blue/30"
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
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
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-gradient-to-r from-gold-accent to-fiery-orange text-white text-sm font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            <Award size={16} />
            <span>Certifications</span>
          </motion.div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}>
            Certifications & Achievements
          </h2>
          <p className={`text-lg ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {certificateFiles.length} AI & Technology Certifications
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={goToPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-20 p-2 md:p-3 rounded-full backdrop-blur-sm transition-all ${
              theme === "dark"
                ? "bg-dark-cosmic/80 border border-cold-steel hover:bg-dark-cosmic text-gray-300 hover:text-white"
                : "bg-white/80 border border-gray-200 hover:bg-white text-gray-700 hover:text-gray-900 shadow-lg"
            }`}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous certificates"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-20 p-2 md:p-3 rounded-full backdrop-blur-sm transition-all ${
              theme === "dark"
                ? "bg-dark-cosmic/80 border border-cold-steel hover:bg-dark-cosmic text-gray-300 hover:text-white"
                : "bg-white/80 border border-gray-200 hover:bg-white text-gray-700 hover:text-gray-900 shadow-lg"
            }`}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next certificates"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </motion.button>

          {/* Slider */}
          <div className="overflow-hidden mx-4 sm:mx-6 md:mx-8">
            <motion.div
              className="flex gap-4 sm:gap-5 md:gap-6"
              animate={{
                x: `-${currentIndex * (100 / certificatesPerView)}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {certificateFiles.map((filename, index) => {
                const title = formatCertificateTitle(filename);
                const imagePath = `/assets/Certificates/${filename}`;
                const gradient = getGradientColor(index);
                const gapSize = certificatesPerView === 1 ? 0 : certificatesPerView === 2 ? 1.25 : 1.5;

                return (
                  <div
                    key={filename}
                    className="flex-shrink-0"
                    style={{
                      width: `calc((100% - ${(certificatesPerView - 1) * gapSize}rem) / ${certificatesPerView})`,
                    }}
                  >
                    <motion.div
                      className={`relative group cursor-pointer rounded-lg md:rounded-xl overflow-hidden h-full ${
                        theme === "dark"
                          ? "bg-dark-cosmic/50 backdrop-blur-sm border border-cold-steel hover:border-metal-grey"
                          : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 shadow-lg"
                      } transition-all duration-300`}
                      onClick={() => openModal(filename)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: (index % certificatesPerView) * 0.1,
                      }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      {/* Gradient accent */}
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`} />
                      
                      {/* Image container */}
                      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                        <img
                          src={imagePath}
                          alt={title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        {/* Overlay on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            className="p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-sm"
                          >
                            <ZoomIn size={20} className="md:w-6 md:h-6 text-white" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="p-3 md:p-4">
                        <h3 className={`text-xs sm:text-sm font-semibold line-clamp-2 ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}>
                          {title}
                        </h3>
                      </div>

                      {/* Hover effect overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300 pointer-events-none`} />
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? "w-8 h-2 bg-gradient-to-r from-hero-blue to-fiery-orange"
                    : `w-2 h-2 ${
                        theme === "dark" ? "bg-cold-steel hover:bg-metal-grey" : "bg-gray-300 hover:bg-gray-400"
                      }`
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className={`text-center mt-4 text-xs sm:text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {currentIndex + 1} / {totalSlides}
          </div>
        </div>
      </div>

      {/* Modal for viewing certificate */}
      <AnimatePresence>
        {selectedCertificate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <motion.button
                  onClick={closeModal}
                  className="absolute -top-10 sm:-top-12 right-0 sm:right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all z-10"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </motion.button>

                {/* Certificate image */}
                <img
                  src={`/assets/Certificates/${selectedCertificate}`}
                  alt={formatCertificateTitle(selectedCertificate)}
                  className="w-full h-auto rounded-lg sm:rounded-xl shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
