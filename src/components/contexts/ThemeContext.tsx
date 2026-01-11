import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setThemeState(prefersDark ? "dark" : "light");
    }
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, themeLoaded]);

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {themeLoaded ? children : null}
    </ThemeContext.Provider>
  );
};
