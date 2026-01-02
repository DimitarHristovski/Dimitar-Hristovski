import { motion } from "framer-motion";
import { BookOpen, Code, Brain, Database, Palette, Zap, TrendingUp } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";

export const CurrentlyLearning = () => {
  const { theme } = useTheme();

  const learningItems = [
    {
      title: "Frontend Technologies",
      description: "React, Next.js, TypeScript, Tailwind CSS, Shadcn/ui",
      icon: <Code size={32} />,
      color: "from-hero-blue to-deep-purple",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn/ui", "Framer Motion"],
    },
    {
      title: "Backend & Databases",
      description: "Node.js, Express, PostgreSQL, MongoDB, SQL, NoSQL",
      icon: <Database size={32} />,
      color: "from-deep-purple to-hero-blue",
      technologies: ["Node.js", "Express", "PostgreSQL", "MongoDB", "SQL", "NoSQL"],
    },
    {
      title: "AI & Machine Learning",
      description: "LangChain, LangGraph, RAG, VectorDB, Pinecone, Mistral, DeepAgents",
      icon: <Brain size={32} />,
      color: "from-gold-accent to-fiery-orange",
      technologies: ["LangChain", "LangGraph", "RAG", "VectorDB", "Pinecone", "Mistral", "DeepAgents"],
    },
    {
      title: "Automation & Tools",
      description: "N8N, n8n workflows, automation platforms",
      icon: <Zap size={32} />,
      color: "from-fiery-orange to-energy-red",
      technologies: ["N8N", "Automation", "Relevance AI"],
    },
    {
      title: "Design & Prototyping",
      description: "Figma, Protopie, Bootstrap Studio, Design Systems",
      icon: <Palette size={32} />,
      color: "from-energy-red to-fiery-orange",
      technologies: ["Figma", "Protopie", "Bootstrap Studio", "Design Systems"],
    },
    {
      title: "Development Tools",
      description: "Visual Studio Code, Git, modern development workflows",
      icon: <TrendingUp size={32} />,
      color: "from-hero-blue to-fiery-orange",
      technologies: ["VS Code", "Git", "Development Workflows", "Cursor"],
    },
  ];

  return (
    <section
      className={`py-24 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-b from-dark-cosmic to-dark-cosmic text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${theme === "dark" ? "white" : "black"} 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full mb-6 text-sm font-semibold border-2"
            style={{
              borderColor: theme === "dark" ? "rgba(247, 181, 0, 0.3)" : "rgba(247, 181, 0, 0.5)",
              color: theme === "dark" ? "#F7B500" : "#F7B500",
              backgroundColor: theme === "dark" ? "rgba(247, 181, 0, 0.1)" : "rgba(247, 181, 0, 0.05)",
            }}
          >
            <BookOpen size={16} className="inline mr-2" />
            Currently Learning
          </motion.span>
          <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}>
            Always Growing, Always Learning
          </h2>
          <p className={`text-xl ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Continuously expanding my knowledge and skills across all technologies I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
              }}
              className={`relative p-6 rounded-2xl border-2 ${
                theme === "dark"
                  ? "bg-dark-cosmic/50 border-cold-steel/30 hover:border-metal-grey"
                  : "bg-white border-gray-200 hover:border-gray-300"
              } transition-all duration-300`}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} rounded-t-2xl`} />
              
              <div className="mt-2">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.color} text-white mb-4 shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}>
                  {item.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {item.description}
                </p>
                {/* Technology Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                        theme === "dark"
                          ? "bg-cold-steel/30 text-gray-300 border-metal-grey/30"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
