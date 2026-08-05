import { useMemo, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./contexts/ThemeContext";
import { type ResolvedHoliday, type HolidayVisual } from "../config/celebrations";
import { useCelebrationContext } from "../hooks/useCelebrationContext";

function DailyAccentWash({ hue }: { hue: number }) {
  const { theme } = useTheme();
  const opacity = theme === "dark" ? 0.11 : 0.07;
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `linear-gradient(125deg, hsla(${hue}, 72%, 58%, ${opacity}) 0%, transparent 42%, hsla(${(hue + 40) % 360}, 65%, 52%, ${opacity * 0.65}) 100%)`,
        mixBlendMode: theme === "dark" ? "soft-light" : "overlay",
      }}
    />
  );
}

const BALLOON_COLORS = ["#FF5A2D", "#2E66F6", "#F7B500", "#FF2E2E", "#3D1B6F"];

type BalloonConfig = {
  id: number;
  leftPct: number;
  bottomPct: number;
  delay: number;
  duration: number;
  color: string;
};

function BalloonFigure({ color }: { color: string }) {
  return (
    <>
      <div
        className="h-24 w-16 shrink-0 rounded-[50%] shadow-lg sm:h-28 sm:w-[4.25rem]"
        style={{
          background: `radial-gradient(circle at 35% 28%, rgba(255,255,255,0.55), transparent 42%), ${color}`,
        }}
      />
      <div
        className="mx-auto mt-0.5 h-14 w-px shrink-0 opacity-60 sm:h-[4.5rem]"
        style={{
          background: `linear-gradient(to bottom, ${color}, transparent)`,
        }}
      />
    </>
  );
}

/** Float in place until tapped — then pops and unmounts. */
function FloatingBalloon({ b }: { b: BalloonConfig }) {
  const [popped, setPopped] = useState(false);
  const [gone, setGone] = useState(false);

  const handlePop = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPopped(true);
  }, []);

  const anchorStyle = {
    left: `${b.leftPct}%`,
    bottom: `${b.bottomPct}%`,
  };

  const ampX = 26 + (b.id % 5) * 8;
  const ampY = 32 + (b.id % 7) * 7;

  if (gone) return null;

  if (popped) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2"
        style={anchorStyle}
      >
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ scale: 1, opacity: 0.9 }}
          animate={{
            scale: [1, 1.5, 0],
            opacity: [0.9, 1, 0],
            rotate: [0, 18, -32],
          }}
          transition={{ duration: 0.26, ease: "easeOut" }}
          onAnimationComplete={() => setGone(true)}
        >
          <BalloonFigure color={b.color} />
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <motion.span
              key={s}
              className="pointer-events-none absolute top-10 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
              style={{ background: b.color }}
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity: 0,
                x: Math.cos((s / 6) * Math.PI * 2) * 44,
                y: Math.sin((s / 6) * Math.PI * 2) * 44,
                scale: 0,
              }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2"
      style={anchorStyle}
    >
      <motion.div
        className="flex cursor-pointer flex-col items-center rounded-lg px-2 pb-2 pt-1 opacity-90 outline-none pointer-events-auto touch-manipulation [-webkit-tap-highlight-color:transparent] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-gold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        role="button"
        tabIndex={0}
        aria-label="Pop balloon"
        whileTap={{ scale: 0.96 }}
        onClick={handlePop}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handlePop(e);
        }}
        initial={{ x: 0, y: 0, rotate: -4 }}
        animate={{
          x: [0, ampX * 0.85, -ampX * 0.65, ampX * 0.4, -ampX * 0.55, 0],
          y: [0, -ampY, ampY * 0.55, -ampY * 0.42, ampY * 0.35, 0],
          rotate: [-7, 9, -6, 8, -5, -7],
        }}
        transition={{
          duration: b.duration,
          delay: b.delay,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <BalloonFigure color={b.color} />
      </motion.div>
    </div>
  );
}

function BirthdayBalloons() {
  const reduceMotion = useReducedMotion();
  const balloons = useMemo(() => {
    const count = 22;
    return Array.from({ length: count }, (_, i) => {
      const spread = count <= 1 ? 50 : 6 + (i / (count - 1)) * 88;
      const jitter =
        Math.sin(i * 12.9898) * 2.8 + Math.cos(i * 7.137) * 1.6;
      const leftPct = Math.min(94, Math.max(6, spread + jitter));
      const row = i % 6;
      const layer = Math.floor(i / 6);
      const bottomPct = Math.min(
        78,
        Math.max(
          10,
          14 + row * 11 + layer * 4 + Math.sin(i * 4.21) * 6
        )
      );
      return {
        id: i,
        leftPct,
        bottomPct,
        delay: (i % 9) * 0.22,
        duration: 11 + (i % 9) * 1.15,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      } satisfies BalloonConfig;
    });
  }, []);

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[30] overflow-hidden">
      {balloons.map((b) => (
        <FloatingBalloon key={b.id} b={b} />
      ))}
    </div>
  );
}

function Snowflakes() {
  const reduceMotion = useReducedMotion();
  const flakes = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: `${(i * 53) % 100}%`,
        delay: (i % 12) * 0.4,
        duration: 11 + (i % 9),
        size: 10 + (i % 8),
      })),
    []
  );
  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[28] bg-gradient-to-b from-white/10 to-transparent"
      />
    );
  }
  return (
    <div className="pointer-events-none fixed inset-0 z-[28] overflow-hidden">
      {flakes.map((f) => (
        <motion.span
          key={f.id}
          aria-hidden
          className="absolute -top-8 text-white/70"
          style={{ left: f.left, fontSize: f.size }}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: ["0vh", "105vh"], opacity: [0, 1, 1, 0], rotate: [0, 360] }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❄
        </motion.span>
      ))}
    </div>
  );
}

function EasterFloat({
  theme,
  title,
  subtitle,
}: {
  theme: "light" | "dark";
  title: string;
  subtitle: string;
}) {
  const reduceMotion = useReducedMotion();
  const glyphs = ["🥚", "🐰", "🌷", "🐣"];
  const items = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 59) % 84)}%`,
        delay: (i % 9) * 0.4,
        duration: 13 + (i % 8),
        glyph: glyphs[i % glyphs.length],
      })),
    []
  );
  return (
    <>
      <motion.div
        role="status"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-none fixed top-24 left-1/2 z-[45] w-[min(92vw,440px)] -translate-x-1/2 px-3 text-center sm:top-28"
      >
        <div
          className={`rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md ${
            theme === "dark"
              ? "border-hero-blue/40 bg-dark-cosmic/92 text-gray-100"
              : "border-hero-blue/35 bg-white/95 text-gray-800"
          }`}
        >
          <p className="text-sm font-semibold tracking-wide text-hero-blue dark:text-gold-accent">
            {title}
          </p>
          <p className="mt-0.5 text-xs opacity-85">{subtitle}</p>
        </div>
      </motion.div>
      {!reduceMotion ? (
        <div className="pointer-events-none fixed inset-0 z-[28] overflow-hidden">
          {items.map((it) => (
            <motion.span
              key={it.id}
              aria-hidden
              className="absolute bottom-[-6%] text-2xl opacity-85 sm:text-3xl"
              style={{ left: it.left }}
              animate={{
                y: ["0vh", "-88vh"],
                x: [0, 14, -12, 10, -8, 0],
                rotate: [0, 14, -10, 8, 0],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: it.duration,
                delay: it.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {it.glyph}
            </motion.span>
          ))}
        </div>
      ) : null}
    </>
  );
}

function NewYearSparkle({
  theme,
  title = "Happy New Year!",
  subtitle = "Fresh start, same builds.",
}: {
  theme: "light" | "dark";
  title?: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pointer-events-none fixed top-24 left-1/2 z-[45] w-[min(92vw,440px)] -translate-x-1/2 px-3 text-center sm:top-28"
    >
      <div
        className={`rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md ${
          theme === "dark"
            ? "border-gold-accent/40 bg-dark-cosmic/90 text-gold-accent"
            : "border-gold-accent/50 bg-white/90 text-gray-800"
        }`}
      >
        <p className="text-sm font-semibold tracking-wide">{title}</p>
        <p className="mt-0.5 text-xs opacity-80">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function ChristmasCelebration({
  theme,
  title,
  subtitle,
}: {
  theme: "light" | "dark";
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <Snowflakes />
      <motion.div
        role="status"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-none fixed top-24 left-1/2 z-[45] w-[min(92vw,440px)] -translate-x-1/2 px-3 text-center sm:top-28"
      >
        <div
          className={`rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md ${
            theme === "dark"
              ? "border-gold-accent/35 bg-dark-cosmic/92 text-gray-100"
              : "border-fiery-orange/35 bg-white/95 text-gray-800"
          }`}
        >
          <p className="text-sm font-semibold tracking-wide text-gold-accent">
            {title}
          </p>
          <p className="mt-0.5 text-xs opacity-85">{subtitle}</p>
        </div>
      </motion.div>
    </>
  );
}

function HolidayBanner({
  theme,
  title,
  subtitle,
  variant,
}: {
  theme: "light" | "dark";
  title: string;
  subtitle: string;
  variant: HolidayVisual;
}) {
  const ring =
    variant === "labour"
      ? theme === "dark"
        ? "border-fiery-orange/40"
        : "border-fiery-orange/40"
      : variant === "patriotic"
        ? theme === "dark"
          ? "border-hero-blue/40"
          : "border-hero-blue/45"
        : theme === "dark"
          ? "border-deep-purple/45"
          : "border-deep-purple/40";

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-none fixed top-24 left-1/2 z-[45] w-[min(92vw,460px)] -translate-x-1/2 px-3 text-center sm:top-28"
    >
      <div
        className={`rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md ${ring} ${
          theme === "dark"
            ? "bg-dark-cosmic/92 text-gray-100"
            : "bg-white/95 text-gray-800"
        }`}
      >
        <p
          className={`text-sm font-semibold tracking-wide ${
            variant === "labour"
              ? "text-fiery-orange"
              : variant === "patriotic"
                ? "text-hero-blue dark:text-gold-accent"
                : "text-deep-purple dark:text-gold-accent"
          }`}
        >
          {title}
        </p>
        <p className="mt-0.5 text-xs opacity-85">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function HolidayOverlay({
  holiday,
  theme,
}: {
  holiday: ResolvedHoliday;
  theme: "light" | "dark";
}) {
  switch (holiday.visual) {
    case "christmas":
      return (
        <ChristmasCelebration
          theme={theme}
          title={holiday.title}
          subtitle={holiday.subtitle}
        />
      );
    case "newYear":
      return (
        <NewYearSparkle
          theme={theme}
          title={holiday.title}
          subtitle={holiday.subtitle}
        />
      );
    case "easterWestern":
    case "easterOrthodox":
      return (
        <EasterFloat
          theme={theme}
          title={holiday.title}
          subtitle={holiday.subtitle}
        />
      );
    case "labour":
    case "patriotic":
    case "cultural":
      return (
        <HolidayBanner
          theme={theme}
          variant={holiday.visual}
          title={holiday.title}
          subtitle={holiday.subtitle}
        />
      );
    default:
      return null;
  }
}

export function CelebrationLayer() {
  const { theme } = useTheme();
  const ctx = useCelebrationContext();

  return (
    <>
      <DailyAccentWash hue={ctx.dailyHue} />

      {ctx.isBirthday ? <BirthdayBalloons /> : null}

      {ctx.holiday ? (
        <HolidayOverlay holiday={ctx.holiday} theme={theme} />
      ) : null}
    </>
  );
}
