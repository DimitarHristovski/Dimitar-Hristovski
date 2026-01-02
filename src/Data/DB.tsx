import { Code, Palette, Bot } from "lucide-react";
import React from "react";

export const HeroText = {
  title: "Dimitar Hristovski",
  paragraph: "Full Stack Developer",
  description:
    "Specializing in building modern web applications with Next.js ,React, and TypeScript. Focused on creating efficient, scalable, anduser-friendly solutions.",
};
export const AboutInfo = {
  title: "About Me",
  paragraphs: [
    "As a Full Stack Developer, I specialize in creating modern web applications using Next.js, React, and TypeScript. My focus is on building efficient, scalable, and user-friendly solutions that solve real-world problems.",
    "I have experience in developing various types of applications, from e-commerce platforms to educational websites. I'm passionate about clean code, performance optimization, and creating exceptional user experiences.",
  ],
  tagline: "Always learning, always coding",
};
export const ContactInfo = {
  title: "Let's Connect",
  description:
    "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
  email: "dimihbt@yahoo.com",
  buttonText: "Get in Touch",
};

export const skillsData = [
  {
    icon: <Code size={24} />,
    title: "Fullstack Development",
    description:
      "Experienced in creating end-to-end web applications with modern stacks like React, Next.js, TypeScript, and modern CSS frameworks alongside Express.js and Node.js, incorporating both RDBMS and NoSQL databases.",
  },
  {
    icon: <Bot size={24} />,
    title: "AI Engineering",
    description:
      "Skilled in designing and developing intelligent AI agents using LangChain and LangGraph for building stateful, multi-actor applications. Experienced in implementing RAG (Retrieval-Augmented Generation) systems with vector databases like Pinecone and VectorDB for semantic search and knowledge retrieval. Capable of creating autonomous decision-making systems, task automation, and conversational AI with adaptive responses.",
  },
  {
    icon: <Palette size={24} />,
    title: "UI/UX Design",
    description:
      "Proficient in designing intuitive, user-centric interfaces using Figma and other prototyping tools, applying UX best practices, responsive design, and accessibility guidelines to create outstanding user experiences.",
  },
];
