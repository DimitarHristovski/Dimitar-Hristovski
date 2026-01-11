import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { ThemeProvider } from "./components/contexts/ThemeContext.tsx";
import { BotMischiefProvider } from "./components/contexts/BotMischiefContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {" "}
    <ThemeProvider>
      <BotMischiefProvider>
        <App />{" "}
      </BotMischiefProvider>
    </ThemeProvider>
  </StrictMode>
);
