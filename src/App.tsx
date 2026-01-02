import React from "react";
import Header from "./components/Header";
import "./i18n/i18";
import Hero from "./components/Hero";
import { Skills } from "./components/Skills";
import { Activity } from "./components/Activity";
import About from "./components/About";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import TechBubbleSection from "./components/TechBubbleSection";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TechBubbleSection />
      <Skills />
      <About />
      <Projects />
      <Activity />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
