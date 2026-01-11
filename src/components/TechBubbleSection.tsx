import { motion } from "framer-motion";
import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiFigma,
  SiN8N,
  SiShadcnui,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { IoGameController } from "react-icons/io5";
import { Brain, Network, Database, Layers, Zap } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";

const techIcons = [
  {
    icon: <SiReact size={40} />,
    name: "React",
    description: "JavaScript library for building user interfaces",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: <SiNextdotjs size={40} />,
    name: "Next.js",
    description: "React framework for production with SSR",
    color: "from-gray-800 to-gray-600",
  },
  {
    icon: <SiTypescript size={40} />,
    name: "TypeScript",
    description: "Typed superset of JavaScript",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: <SiNodedotjs size={40} />,
    name: "Node.js",
    description: "JavaScript runtime for server-side development",
    color: "from-green-500 to-green-700",
  },
  {
    icon: <SiTailwindcss size={40} />,
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: <SiPostgresql size={40} />,
    name: "PostgreSQL",
    description: "Advanced open-source relational database",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: <SiMongodb size={40} />,
    name: "MongoDB",
    description: "NoSQL document database",
    color: "from-green-600 to-emerald-600",
  },
  {
    icon: <SiFigma size={40} />,
    name: "Figma",
    description: "Collaborative design and prototyping tool",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <SiN8N size={40} />,
    name: "N8N",
    description: "Workflow automation platform",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <SiShadcnui size={40} />,
    name: "Shadcn/ui",
    description: "Re-usable components built with Radix UI",
    color: "from-slate-600 to-slate-800",
  },
  {
    icon: <BiLogoVisualStudio size={40} />,
    name: "Visual Studio Code",
    description: "Code editor with powerful extensions",
    color: "from-blue-600 to-purple-600",
  },
  // AI/ML Technologies
  {
    icon: <Brain size={40} />,
    name: "LangChain",
    description: "Framework for building LLM applications",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Network size={40} />,
    name: "LangGraph",
    description: "Build stateful, multi-actor LLM applications",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: <Zap size={40} />,
    name: "RAG",
    description: "Retrieval-Augmented Generation for AI",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: <Database size={40} />,
    name: "VectorDB",
    description: "Vector database for semantic search",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: <Layers size={40} />,
    name: "Pinecone",
    description: "Managed vector database service",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: (

      <a 
        href="https://stratego-nine.vercel.app/" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-center"
        aria-label="Open game project in new tab"
      >
        <IoGameController size={40} />
      </a>
    ),
    name: "Game Development",
    description: "Interactive game development projects",
    color: "from-pink-500 to-rose-500",
  },
];

export default function TechBubbleSection() {
  const { theme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className={`w-full py-20 px-4 sm:px-8 md:px-16 relative ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-300"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-300"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 overflow-visible">
        <motion.h2
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
            theme === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          Technologies & Tools
        </motion.h2>

        <motion.div
          className="flex flex-wrap gap-6 justify-center pb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {techIcons.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.3,
                  rotate: -180,
                  y: 50,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  },
                },
              }}
              animate={{
                y: hoveredIndex === index ? -10 : [0, -15, 0],
                rotate: hoveredIndex === index ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                },
                scale: {
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                },
                y: {
                  duration: hoveredIndex === index ? 0.3 : 3 + index * 0.1,
                  repeat: hoveredIndex === index ? 0 : Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 0.5,
                },
              }}
              className="relative group mb-20"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-2xl ${
                  theme === "dark"
                    ? "bg-gray-800/80 backdrop-blur-md border border-gray-700"
                    : "bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg"
                } transition-all duration-300 cursor-pointer relative overflow-visible`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`}
                />

                {/* Icon */}
                <div
                  className={`relative z-10 transition-transform duration-300 ${
                    hoveredIndex === index ? "scale-110" : ""
                  }`}
                >
                  {tech.icon}
                </div>
              </motion.div>

              {/* Enhanced Tooltip - Positioned outside the icon container */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? 0 : 10,
                  scale: hoveredIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 px-4 py-3 rounded-xl text-center min-w-[180px] max-w-[220px] ${
                  theme === "dark"
                    ? "bg-gray-800/95 backdrop-blur-md text-gray-100 border border-gray-700"
                    : "bg-white/95 backdrop-blur-md text-gray-900 border border-gray-200 shadow-md"
                } pointer-events-none z-50`}
                style={{
                  visibility: hoveredIndex === index ? "visible" : "hidden",
                }}
              >
                <div
                  className={`text-sm font-bold mb-1 ${
                    theme === "dark" ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {tech.name}
                </div>
                {tech.description && (
                  <div
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-700"
                    } leading-relaxed`}
                  >
                    {tech.description}
                  </div>
                )}
                {/* Tooltip arrow */}
                <div
                  className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 ${
                    theme === "dark"
                      ? "bg-gray-800 border-l border-t border-gray-700"
                      : "bg-white border-l border-t border-gray-200"
                  }`}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
