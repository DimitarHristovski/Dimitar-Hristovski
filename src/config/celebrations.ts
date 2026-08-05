/**
 * Calendar-driven flourishes: daily accent, DE/MK public holidays, birthday.
 *
 * Birthday defaults to **3 November**. Override with `.env`:
 *   VITE_BIRTHDAY_MONTH=11
 *   VITE_BIRTHDAY_DAY=3
 */

/** Which decoration preset the UI uses */
export type HolidayVisual =
  | "newYear"
  | "christmas"
  | "easterWestern"
  | "easterOrthodox"
  | "labour"
  | "patriotic"
  | "cultural";

export type ResolvedHoliday = {
  visual: HolidayVisual;
  title: string;
  subtitle: string;
};

/** Default birthday when env vars are not set. */
export const PROFILE_BIRTHDAY = { month: 11, day: 3 } as const;

/** Western (Gregorian) Easter Sunday — Anonymous Gregorian algorithm. */
export function getWesternEasterSunday(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { month, day };
}

/**
 * Orthodox Easter Sunday as celebrated on the Gregorian calendar (Julian computus + 13-day shift).
 * Spot-checked: 2024 → May 5, 2025 → Apr 20, 2026 → Apr 12.
 */
export function getOrthodoxEasterSunday(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = year % 7;
  const c = year % 4;
  const d = (19 * a + 15) % 30;
  const e = (2 * c + 4 * b - d + 34) % 7;
  const jMonth = Math.floor((d + e + 114) / 31);
  const jDay = ((d + e + 114) % 31) + 1;
  const g = new Date(year, jMonth - 1, jDay + 13);
  return { month: g.getMonth() + 1, day: g.getDate() };
}

function matchesGregorianOffset(
  year: number,
  month: number,
  day: number,
  baseMonth: number,
  baseDay: number,
  offsetDays: number
): boolean {
  const dt = new Date(year, baseMonth - 1, baseDay + offsetDays);
  return dt.getMonth() + 1 === month && dt.getDate() === day;
}

function westernEasterOffset(year: number, month: number, day: number, offset: number): boolean {
  const e = getWesternEasterSunday(year);
  return matchesGregorianOffset(year, month, day, e.month, e.day, offset);
}

function orthodoxEasterOffset(year: number, month: number, day: number, offset: number): boolean {
  const e = getOrthodoxEasterSunday(year);
  return matchesGregorianOffset(year, month, day, e.month, e.day, offset);
}

const VISUAL_PRIORITY: HolidayVisual[] = [
  "christmas",
  "newYear",
  "easterWestern",
  "easterOrthodox",
  "cultural",
  "patriotic",
  "labour",
];

function gatherHolidays(year: number, month: number, day: number): ResolvedHoliday[] {
  const out: ResolvedHoliday[] = [];

  if (month === 1 && day === 1) {
    out.push({
      visual: "newYear",
      title: "Happy New Year!",
      subtitle: "Germany & North Macedonia",
    });
  }

  if (month === 1 && day === 7) {
    out.push({
      visual: "christmas",
      title: "Orthodox Christmas",
      subtitle: "North Macedonia — Божиќ",
    });
  }

  if (month === 12 && day === 25) {
    out.push({
      visual: "christmas",
      title: "Christmas Day",
      subtitle: "Germany & North Macedonia",
    });
  }

  if (month === 12 && day === 26) {
    out.push({
      visual: "christmas",
      title: "Second Christmas Day",
      subtitle: "Germany — Zweiter Weihnachtsfeiertag",
    });
  }

  // Germany — movable (Western / Gregorian Easter cycle)
  if (westernEasterOffset(year, month, day, -2)) {
    out.push({
      visual: "easterWestern",
      title: "Good Friday",
      subtitle: "Germany — Karfreitag",
    });
  }
  if (westernEasterOffset(year, month, day, 0)) {
    out.push({
      visual: "easterWestern",
      title: "Easter Sunday",
      subtitle: "Western tradition · Germany",
    });
  }
  if (westernEasterOffset(year, month, day, 1)) {
    out.push({
      visual: "easterWestern",
      title: "Easter Monday",
      subtitle: "Germany — Ostermontag",
    });
  }
  if (westernEasterOffset(year, month, day, 39)) {
    out.push({
      visual: "easterWestern",
      title: "Ascension Day",
      subtitle: "Germany — Christi Himmelfahrt",
    });
  }
  if (westernEasterOffset(year, month, day, 50)) {
    out.push({
      visual: "easterWestern",
      title: "Whit Monday",
      subtitle: "Germany — Pfingstmontag",
    });
  }

  // North Macedonia — Orthodox Easter cycle (Gregorian celebration dates)
  if (orthodoxEasterOffset(year, month, day, -2)) {
    out.push({
      visual: "easterOrthodox",
      title: "Good Friday",
      subtitle: "North Macedonia — Orthodox",
    });
  }
  if (orthodoxEasterOffset(year, month, day, 0)) {
    out.push({
      visual: "easterOrthodox",
      title: "Orthodox Easter",
      subtitle: "North Macedonia — Велигден",
    });
  }
  if (orthodoxEasterOffset(year, month, day, 1)) {
    out.push({
      visual: "easterOrthodox",
      title: "Orthodox Easter Monday",
      subtitle: "North Macedonia",
    });
  }

  if (month === 5 && day === 1) {
    out.push({
      visual: "labour",
      title: "Labour Day",
      subtitle: "Germany & North Macedonia — Tag der Arbeit / Ден на трудот",
    });
  }

  if (month === 5 && day === 24) {
    out.push({
      visual: "cultural",
      title: "Saints Cyril & Methodius Day",
      subtitle: "North Macedonia — Св. Кирил и Методиј",
    });
  }

  if (month === 8 && day === 2) {
    out.push({
      visual: "patriotic",
      title: "Republic Day (Ilinden)",
      subtitle: "North Macedonia — Ден на Републиката",
    });
  }

  if (month === 9 && day === 8) {
    out.push({
      visual: "patriotic",
      title: "Independence Day",
      subtitle: "North Macedonia — Ден на независноста",
    });
  }

  if (month === 10 && day === 3) {
    out.push({
      visual: "patriotic",
      title: "German Unity Day",
      subtitle: "Germany — Tag der Deutschen Einheit",
    });
  }

  if (month === 10 && day === 11) {
    out.push({
      visual: "patriotic",
      title: "1941 People Uprising Day",
      subtitle: "North Macedonia — 11 October",
    });
  }

  if (month === 10 && day === 23) {
    out.push({
      visual: "patriotic",
      title: "Day of the Macedonian Revolutionary Struggle",
      subtitle: "North Macedonia",
    });
  }

  if (month === 12 && day === 8) {
    out.push({
      visual: "cultural",
      title: "Saint Clement of Ohrid Day",
      subtitle: "North Macedonia — Св. Климент Охридски",
    });
  }

  return out;
}

function mergeHolidays(matches: ResolvedHoliday[]): ResolvedHoliday | undefined {
  if (matches.length === 0) return undefined;
  const visual =
    VISUAL_PRIORITY.find((v) => matches.some((m) => m.visual === v)) ?? matches[0].visual;
  const title = [...new Set(matches.map((m) => m.title))].join(" · ");
  const subtitle = [...new Set(matches.map((m) => m.subtitle))].join(" · ");
  return { visual, title, subtitle };
}

export function parseBirthdayFromEnv(): { month: number; day: number } | null {
  const rawM = import.meta.env.VITE_BIRTHDAY_MONTH as string | undefined;
  const rawD = import.meta.env.VITE_BIRTHDAY_DAY as string | undefined;
  if (rawM === undefined || rawD === undefined || rawM === "" || rawD === "") {
    return null;
  }
  const month = Number(rawM);
  const day = Number(rawD);
  if (
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }
  return { month, day };
}

export function resolveBirthday(): { month: number; day: number } {
  return parseBirthdayFromEnv() ?? { ...PROFILE_BIRTHDAY };
}

export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export function getDailyAccentHue(date: Date): number {
  const doy = getDayOfYear(date);
  return Math.round((doy * 137.508) % 360);
}

export type CelebrationContext = {
  /** Local calendar date `YYYY-M-D` — stable identity for “today” across years. */
  dateKey: string;
  dayOfYear: number;
  dailyHue: number;
  isBirthday: boolean;
  holiday: ResolvedHoliday | undefined;
};

export function getCelebrationContext(date = new Date()): CelebrationContext {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const matches = gatherHolidays(year, month, day);
  const holiday = mergeHolidays(matches);

  const b = resolveBirthday();
  const isBirthday = b.month === month && b.day === day;

  return {
    dateKey: `${year}-${month}-${day}`,
    dayOfYear: getDayOfYear(date),
    dailyHue: getDailyAccentHue(date),
    isBirthday,
    holiday,
  };
}
