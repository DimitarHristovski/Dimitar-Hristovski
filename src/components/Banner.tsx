import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "./contexts/ThemeContext";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export const Banner = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [currentFrame, setCurrentFrame] = useState(0);
  const directionRef = useRef<1 | -1>(1); // 1 for forward, -1 for backward
  const frameRef = useRef(0);
  
  // Animation configuration
  const totalFrames = 75;
  const framesPerImage = 5;
  // Forward: 5 frames per second = 200ms per frame transition
  // Reverse: 75 frames in 2 seconds = 37.5 frames/second = ~26.67ms per frame transition
  const forwardFrameDuration = 100; // 200ms per frame (5 frames/second)
  const reverseFrameDuration = 2000 / totalFrames; // ~26.67ms per frame (2 seconds for 75 frames)
  const forwardBaseDuration = forwardFrameDuration / framesPerImage; // ~6.67ms per display
  const reverseBaseDuration = reverseFrameDuration / framesPerImage; // ~0.89ms per display
  
  // Calculate speed multiplier based on frame position (faster at edges)
  const getSpeedMultiplier = (frame: number): number => {
    // Normalize frame position (0 to 1)
    const normalized = frame / (totalFrames - 1);
    
    // Create a curve that's faster at the edges (0 and 1) and slower in the middle (0.5)
    // Using a quadratic curve: 1 - 4 * (x - 0.5)^2
    // This gives: 1 at edges (0 and 1), 0 at middle (0.5)
    // We'll invert it and scale it: faster = lower multiplier
    const curve = 1 - 4 * Math.pow(normalized - 0.5, 2);
    
    // Map curve (0 to 1) to speed multiplier (0.3 to 1.0)
    // 0.3 = 3x faster at edges, 1.0 = normal speed in middle
    return 0.3 + (curve * 0.7);
  };

  // Generate frame path
  const getFramePath = (frameNumber: number): string => {
    const paddedNumber = String(frameNumber).padStart(3, "0");
    return `/assets/banner/ezgif-frame-${paddedNumber}.jpg`;
  };

  // Frame animation loop with reverse and variable speed
  useEffect(() => {
    let localCounter = 0;
    let timeoutId: NodeJS.Timeout | null = null;
    
    const animate = () => {
      localCounter += 1;
      
      if (localCounter >= framesPerImage) {
        const nextFrame = frameRef.current + directionRef.current;
        
        // Reverse direction at boundaries
        if (nextFrame >= totalFrames - 1) {
          directionRef.current = -1;
          frameRef.current = totalFrames - 1;
        } else if (nextFrame <= 0) {
          directionRef.current = 1;
          frameRef.current = 0;
        } else {
          frameRef.current = nextFrame;
        }
        
        setCurrentFrame(frameRef.current);
        localCounter = 0;
      }
      
      // Calculate dynamic frame duration based on direction and frame position
      const isReversing = directionRef.current === -1;
      const baseDuration = isReversing ? reverseBaseDuration : forwardBaseDuration;
      const speedMultiplier = getSpeedMultiplier(frameRef.current);
      const dynamicFrameDuration = baseDuration * speedMultiplier;
      
      timeoutId = setTimeout(animate, dynamicFrameDuration);
    };

    // Start the animation (use forward duration initially)
    timeoutId = setTimeout(animate, forwardBaseDuration);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [totalFrames, forwardBaseDuration, reverseBaseDuration, framesPerImage]);

  const handleClick = () => {
    setCurrentFrame(0);
  };

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
      className="relative w-full overflow-hidden cursor-pointer"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.1 }}
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
    >
      {/* Animated background image */}
      <motion.img
        src={getFramePath(currentFrame + 1)}
        alt="Banner animation"
        className="w-full h-auto object-cover min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
        draggable={false}
        animate={{
          scale: [1.2, 1.4, 1.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Text overlay */}
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
            theme === "dark" ? "text-gray-200" : "text-white"
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
            theme === "dark" ? "text-gray-300" : "text-white/90"
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
