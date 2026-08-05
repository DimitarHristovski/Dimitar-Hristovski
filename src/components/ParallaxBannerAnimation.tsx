import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "./contexts/ThemeContext";

/** Frame sequence from `/public/assets/banner/` — scroll-parallax strip between About and Projects */
export const ParallaxBannerAnimation = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });
  // Strong foreground parallax (image moves opposite to scroll feel)
  const imageY = useTransform(smoothProgress, [0, 1], ["32%", "-32%"]);
  // Softer layer on the vignette for depth
  const overlayY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);

  const [currentFrame, setCurrentFrame] = useState(0);
  const directionRef = useRef<1 | -1>(1);
  const frameRef = useRef(0);

  const totalFrames = 75;
  const framesPerImage = 5;
  const forwardFrameDuration = 100;
  const reverseFrameDuration = 2000 / totalFrames;
  const forwardBaseDuration = forwardFrameDuration / framesPerImage;
  const reverseBaseDuration = reverseFrameDuration / framesPerImage;

  const getSpeedMultiplier = (frame: number): number => {
    const normalized = frame / (totalFrames - 1);
    const curve = 1 - 4 * Math.pow(normalized - 0.5, 2);
    return 0.3 + curve * 0.7;
  };

  const getFramePath = (frameNumber: number): string => {
    const paddedNumber = String(frameNumber).padStart(3, "0");
    return `/assets/banner/ezgif-frame-${paddedNumber}.jpg`;
  };

  useEffect(() => {
    let localCounter = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const animate = () => {
      localCounter += 1;

      if (localCounter >= framesPerImage) {
        const nextFrame = frameRef.current + directionRef.current;

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

      const isReversing = directionRef.current === -1;
      const baseDuration = isReversing ? reverseBaseDuration : forwardBaseDuration;
      const speedMultiplier = getSpeedMultiplier(frameRef.current);
      const dynamicFrameDuration = baseDuration * speedMultiplier;

      timeoutId = setTimeout(animate, dynamicFrameDuration);
    };

    timeoutId = setTimeout(animate, forwardBaseDuration);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [totalFrames, forwardBaseDuration, reverseBaseDuration, framesPerImage]);

  return (
    <section
      ref={sectionRef}
      aria-hidden
      className={`relative z-0 w-full overflow-hidden border-y shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ${
        theme === "dark"
          ? "border-gray-800/80 bg-gray-950/40"
          : "border-gray-200/80 bg-gray-100/50"
      }`}
    >
      {/* Clip + flex center: avoids mixing Tailwind translate-x with motion `y` (same transform property). */}
      <div className="relative mx-auto h-[min(48vh,520px)] w-full max-w-[1920px] overflow-hidden sm:h-[min(54vh,600px)] md:h-[min(58vh,680px)]">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.div
            className="h-[165%] w-[122%] max-w-none shrink-0 sm:h-[155%] sm:w-[116%] md:w-[112%]"
            style={{ y: imageY }}
          >
            <div className="h-full w-full overflow-hidden">
              <motion.img
                src={getFramePath(currentFrame + 1)}
                alt=""
                className="pointer-events-none h-full w-full object-cover object-center select-none"
                draggable={false}
                style={{ transformOrigin: "center center" }}
                animate={{ scale: [1.05, 1.1, 1.05] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          style={{ y: overlayY }}
          className={`pointer-events-none absolute inset-x-0 -top-[18%] -bottom-[18%] bg-gradient-to-b ${
            theme === "dark"
              ? "from-gray-950/70 via-transparent to-gray-950/75"
              : "from-white/65 via-transparent to-white/70"
          }`}
        />
      </div>
    </section>
  );
};
