import { useEffect, useState } from "react";
import {
  getCelebrationContext,
  type CelebrationContext,
} from "../config/celebrations";

/** Avoid setState when nothing meaningful changed (stable refs for React). */
function celebrationSignature(c: CelebrationContext): string {
  return [
    c.dateKey,
    c.isBirthday,
    c.holiday?.visual ?? "",
    c.holiday?.title ?? "",
    c.holiday?.subtitle ?? "",
  ].join("|");
}

/**
 * Live celebration context: refreshes at local midnight, every minute, and when the tab becomes visible.
 */
export function useCelebrationContext(): CelebrationContext {
  const [ctx, setCtx] = useState(() => getCelebrationContext(new Date()));

  useEffect(() => {
    const refresh = () => {
      const next = getCelebrationContext(new Date());
      setCtx((prev) =>
        celebrationSignature(prev) === celebrationSignature(next) ? prev : next,
      );
    };

    refresh();

    let midnightTimer: ReturnType<typeof setTimeout>;
    const scheduleMidnight = () => {
      clearTimeout(midnightTimer);
      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        1,
        0,
      );
      midnightTimer = setTimeout(() => {
        refresh();
        scheduleMidnight();
      }, Math.max(1000, nextMidnight.getTime() - now.getTime()));
    };
    scheduleMidnight();

    const intervalId = setInterval(refresh, 60_000);

    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearTimeout(midnightTimer);
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return ctx;
}
