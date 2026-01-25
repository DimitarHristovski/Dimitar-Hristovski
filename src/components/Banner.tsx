import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "./contexts/ThemeContext";

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
        className="w-full h-auto object-cover"
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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {/* Main heading */}
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-accent via-fiery-orange to-energy-red drop-shadow-2xl"
        >
          {t("HeroTitle")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4 drop-shadow-lg ${
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
          className={`text-base md:text-lg lg:text-xl mb-3 md:mb-4 max-w-2xl mx-auto leading-relaxed drop-shadow-lg ${
            theme === "dark" ? "text-gray-300" : "text-white/90"
          }`}
        >
          {t("HeroDescription")}
        </motion.p>
      </div>
    </motion.div>
  );
};
