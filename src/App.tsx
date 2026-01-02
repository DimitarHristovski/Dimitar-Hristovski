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
import SparkleAnimation from "./components/SparkleAnimation";
import { CurrentlyLearning } from "./components/CurrentlyLearning";
import { Certifications } from "./components/Certifications";
import { FunFacts } from "./components/FunFacts";
import { ReadingList } from "./components/ReadingList";
import { ThreeDBackground } from "./components/ThreeDBackground";
import { TechStack3D } from "./components/TechStack3D";
import { ChatRobot } from "./components/ChatRobot";

function App() {
  return (
    <div className="min-h-screen relative">
      <ThreeDBackground />
      <TechStack3D />
      <SparkleAnimation />
      <ChatRobot />
      <Header />
      <Hero />
      <TechBubbleSection />
      <Skills />
      <About />
      <Projects />
      <CurrentlyLearning />
      <Certifications />
      <FunFacts />
      <ReadingList />
      <Activity />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
