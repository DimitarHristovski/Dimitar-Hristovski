import { Code, Palette, Bot } from "lucide-react";
import React from "react";

export const HeroText = {
  title: "Dimitar Hristovski",
  paragraph: "Full Stack Developer",
  description:
    "Passionate full-stack developer with a strong focus on frontend development. Building modern web applications and AI-driven solutions that merge creativity, technology, and intelligence.",
};
export const AboutInfo = {
  title: "About Me",
  paragraphs: [
    "I'm a passionate and driven full-stack developer with a strong focus on frontend development. I've participated in various bootcamps, game jams, and hackathons, gaining hands-on experience across a wide range of projects. Most recently, I led a team at a startup focused on alternative tourism, where I was responsible for frontend design and development using React.js, along with tools like Figma, Protopie, and Bootstrap Studio.",
    "In addition to my startup experience, I've actively contributed to several open-source projects, collaborating with developers worldwide and honing my ability to write clean, maintainable, and scalable code. While my core strength lies in crafting responsive and engaging interfaces, I also have strong knowledge of backend technologies such as Node.js, Express, SQL, and NoSQL databases, enabling me to deliver end-to-end MERN-stack solutions.",
    "Recently, I've expanded my work into the AI and automation space, developing scalable backend APIs and intelligent systems using Mistral, LangChain, LangGraph, DeepAgents, n8n, and Relevance AI. My current focus includes building AI-driven agents, implementing RAG (Retrieval-Augmented Generation) pipelines, and exploring the high-code vs. low-code to create hybrid AI solutions that combine flexibility with efficiency.",
  ],
  tagline: "Building tools that merge creativity, technology, and intelligence",
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
      "Experienced in creating end-to-end web applications with modern stacks like React.js, Next.js, and TypeScript. Strong knowledge of backend technologies including Node.js, Express, SQL, and NoSQL databases, enabling delivery of complete MERN-stack solutions. Actively contribute to open-source projects and have led teams at startups, focusing on building clean, maintainable, and scalable code.",
  },
  {
    icon: <Bot size={24} />,
    title: "AI Engineering & Automation",
    description:
      "Developing scalable backend APIs and intelligent systems using Mistral, LangChain, LangGraph, DeepAgents, n8n, and Relevance AI. Building AI-driven agents, implementing RAG (Retrieval-Augmented Generation) pipelines, and creating hybrid AI solutions that combine high-code flexibility with low-code efficiency. Experienced in semantic search, knowledge retrieval, and task automation.",
  },
  {
    icon: <Palette size={24} />,
    title: "Frontend & UI/UX Design",
    description:
      "Core strength in crafting responsive and engaging interfaces. Proficient in frontend design and development using React.js, along with design tools like Figma, Protopie, and Bootstrap Studio. Experienced in leading frontend teams and applying UX best practices to create outstanding user experiences that solve real-world problems.",
  },
];
