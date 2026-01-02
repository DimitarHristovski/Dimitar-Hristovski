import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mic, Info, PieChart } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

const chatSuggestions = [
  "Tell me about yourself",
  "What are your skills?",
  "What are you working on?",
  "How can I contact you?",
  "What's your tech background?",
];

const ChatWidget = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hi there! 👋 I'm Dimitar's AI Portfolio Assistant. I can tell you about his skills, projects, experience, and more! Ask me anything!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY < 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const input = userMessage.text.toLowerCase();

      const responseMap: { [key: string]: string[] } = {
        yourself: [
          "I'm Dimitar Hristovski, a passionate full-stack developer with a strong focus on frontend development. I build modern web applications and AI-driven solutions that merge creativity, technology, and intelligence. I've participated in various bootcamps, game jams, and hackathons, and recently led a team at a startup focused on alternative tourism.",
          "I'm a passionate and driven full-stack developer specializing in frontend development. I've actively contributed to open-source projects and have experience leading teams at startups. My work combines responsive interfaces with backend technologies to deliver complete MERN-stack solutions.",
          "I'm Dimitar, a full-stack developer passionate about building tools that merge creativity, technology, and intelligence. I focus on frontend development but also have strong knowledge of backend technologies, enabling me to deliver end-to-end solutions.",
        ],
        skills: [
          "My skills include Fullstack Development (React.js, Next.js, TypeScript, Node.js, Express, SQL, NoSQL), AI Engineering (LangChain, LangGraph, RAG, VectorDB, Pinecone, Mistral, DeepAgents, n8n, Relevance AI), and UI/UX Design (Figma, Protopie, Bootstrap Studio). I actively contribute to open-source projects and focus on building clean, maintainable, and scalable code.",
          "I'm experienced in creating end-to-end web applications with modern stacks. My core strength is crafting responsive interfaces, but I also develop scalable backend APIs and intelligent AI systems. I use tools like React, TypeScript, Node.js, Express, PostgreSQL, MongoDB, LangChain, LangGraph, and various AI platforms.",
          "I specialize in Fullstack Development, AI Engineering & Automation, and Frontend & UI/UX Design. My tech stack includes React, Next.js, TypeScript, Node.js, Express, SQL/NoSQL databases, LangChain, LangGraph, RAG pipelines, VectorDB, Pinecone, and design tools like Figma and Protopie.",
        ],
        working: [
          "I'm currently focused on building AI-driven agents, implementing RAG (Retrieval-Augmented Generation) pipelines, and exploring high-code vs. low-code to create hybrid AI solutions. I'm also working on scalable backend APIs and intelligent systems using Mistral, LangChain, LangGraph, DeepAgents, n8n, and Relevance AI.",
          "Right now, I'm expanding my work into the AI and automation space. I'm developing scalable backend APIs, building AI-driven agents, and creating hybrid solutions that combine flexibility with efficiency. I'm also continuously learning and contributing to open-source projects.",
          "I'm currently working on AI and automation projects, including building intelligent systems, implementing RAG pipelines, and developing scalable backend APIs. I'm exploring the intersection of high-code and low-code solutions to create efficient AI applications.",
        ],
        contact: [
          "You can reach me at dimihbt@yahoo.com. I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
          "Feel free to contact me at dimihbt@yahoo.com. I'm open to collaborations, new projects, and opportunities. Let's connect and discuss how we can work together!",
          "You can contact me at dimihbt@yahoo.com. I'm always open to discussing new projects, collaborations, or just having a chat about technology and development!",
        ],
        background: [
          "I've participated in various bootcamps, game jams, and hackathons, gaining hands-on experience across a wide range of projects. I led a team at a startup focused on alternative tourism, where I was responsible for frontend design and development using React.js, Figma, Protopie, and Bootstrap Studio. I've also actively contributed to several open-source projects.",
          "My background includes leading teams at startups, contributing to open-source projects, and working on both frontend and backend technologies. I have experience with React.js, Node.js, Express, SQL, NoSQL databases, and various AI tools. I've worked on projects ranging from e-commerce platforms to AI-driven applications.",
          "I have experience in full-stack development with a focus on frontend. I've led teams at startups, contributed to open-source projects, and worked with technologies like React, Next.js, TypeScript, Node.js, Express, and various databases. Recently, I've expanded into AI engineering, working with LangChain, LangGraph, RAG pipelines, and automation tools.",
        ],
        projects: [
          "I've worked on various projects including frontend applications, gaming projects, AI solutions (both no-code and high-code), and UI/UX designs. Some of my work includes e-commerce platforms, AI tourism assistants, automation workflows, and design systems. Check out my projects section to see more!",
          "My projects span across different domains: Frontend applications built with React and Next.js, Gaming projects, AI solutions using LangChain and LangGraph, and UI/UX designs created with Figma and Protopie. I've also worked on automation workflows and AI agents.",
          "I've created projects in multiple categories: Frontend development, Gaming, AI (both high-code with LangChain/LangGraph and no-code with n8n/Relevance AI), and UI/UX designs. Each project focuses on solving real-world problems with modern technology.",
        ],
        experience: [
          "I've gained hands-on experience through bootcamps, game jams, and hackathons. Most recently, I led a team at a startup focused on alternative tourism, handling frontend design and development. I've also contributed to open-source projects, collaborating with developers worldwide.",
          "My experience includes leading frontend teams at startups, contributing to open-source projects, and working on various types of applications. I've participated in bootcamps, game jams, and hackathons, which have given me diverse experience across different project types.",
          "I have experience leading teams, contributing to open-source projects, and working on both frontend and backend solutions. I've participated in bootcamps, game jams, and hackathons, and most recently led a startup team focused on alternative tourism.",
        ],
      };

      // Check for multiple keywords to provide more accurate responses
      const keywords = Object.keys(responseMap);
      let matchedCategory = keywords.find((key) => input.includes(key));
      
      // Check for additional keywords
      if (input.includes("project") || input.includes("work") || input.includes("building")) {
        matchedCategory = matchedCategory || "working";
      }
      if (input.includes("experience") || input.includes("background") || input.includes("history")) {
        matchedCategory = matchedCategory || "experience";
      }
      if (input.includes("project") && !input.includes("working")) {
        matchedCategory = "projects";
      }

      // fallback if no keyword matched
      if (!matchedCategory) {
        matchedCategory = "yourself"; // default
      }

      const possibleAnswers = responseMap[matchedCategory];
      const randomResponse =
        possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed z-50 bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 transform ease-in-out
    ${isOpen 
      ? "bg-gradient-to-br from-energy-red to-fiery-orange rotate-90" 
      : "bg-gradient-to-br from-hero-blue to-fiery-orange hover:from-hero-blue/90 hover:to-fiery-orange/90"}
    ${isVisible ? "opacity-100 block" : "opacity-0 hidden"}`}
      >
        {isOpen ? (
          <X className="text-white" size={24} />
        ) : (
          <MessageCircle className="text-white" size={24} />
        )}
      </button>

      <div
        className={`fixed z-40 bottom-6 right-6 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
          theme === "dark" ? "bg-dark-cosmic border-2 border-cold-steel" : "bg-white border-2 border-gray-200"
        } ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0 pointer-events-none"
        }`}
        style={{ height: "500px", maxHeight: "calc(100vh - 100px)" }}
      >
        <div className="bg-gradient-to-r from-hero-blue to-fiery-orange text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-1.5 bg-white/20 rounded-full mr-3">
                <PieChart size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold">AI Portfolio Assistant</h3>
                <div className="flex items-center text-xs text-white/90">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                  <span>Online | Instant replies</span>
                </div>
              </div>
            </div>
            <button className="text-white/80 hover:text-white">
              <Info size={18} />
            </button>
          </div>
        </div>

        <div className={`flex flex-col h-[calc(100%-132px)] ${
          theme === "dark" ? "bg-dark-cosmic" : "bg-gray-50"
        }`}>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === "user"
                      ? "bg-gradient-to-br from-hero-blue to-deep-purple text-white rounded-tr-none"
                      : theme === "dark"
                      ? "bg-cold-steel/50 text-gray-200 shadow-sm rounded-tl-none"
                      : "bg-white shadow-sm rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className={`${
                  theme === "dark" ? "bg-cold-steel/50" : "bg-white"
                } shadow-sm p-3 rounded-2xl rounded-tl-none`}>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 ${
                      theme === "dark" ? "bg-metal-grey" : "bg-gray-300"
                    } rounded-full animate-bounce`}></div>
                    <div className={`w-2 h-2 ${
                      theme === "dark" ? "bg-metal-grey" : "bg-gray-300"
                    } rounded-full animate-bounce delay-150`}></div>
                    <div className={`w-2 h-2 ${
                      theme === "dark" ? "bg-metal-grey" : "bg-gray-300"
                    } rounded-full animate-bounce delay-300`}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={`px-4 py-2 ${
            theme === "dark" ? "bg-dark-cosmic border-t border-cold-steel" : "bg-white border-t border-gray-100"
          }`}>
            <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
              {chatSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                    theme === "dark"
                      ? "bg-cold-steel/50 text-gray-300 hover:bg-cold-steel border border-metal-grey/30"
                      : "bg-hero-blue/10 text-hero-blue hover:bg-hero-blue/20"
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className={`p-3 ${
            theme === "dark" ? "bg-dark-cosmic border-t border-cold-steel" : "bg-white border-t border-gray-200"
          }`}>
            <div className={`flex items-center rounded-full px-4 py-1 ${
              theme === "dark" ? "bg-cold-steel/50" : "bg-gray-100"
            }`}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                ref={inputRef}
                placeholder="Ask about skills, projects, experience..."
                className={`flex-1 bg-transparent border-none focus:outline-none py-2 text-sm ${
                  theme === "dark" ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
                }`}
              />
              <div className="flex items-center space-x-1">
                <button className={`p-2 transition-colors ${
                  theme === "dark" ? "text-gray-500 hover:text-hero-blue" : "text-gray-500 hover:text-hero-blue"
                }`}>
                  <Mic size={18} />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === ""}
                  className={`p-2 rounded-full transition-colors ${
                    inputValue.trim() !== ""
                      ? theme === "dark"
                        ? "text-hero-blue hover:bg-cold-steel"
                        : "text-hero-blue hover:bg-hero-blue/10"
                      : theme === "dark"
                      ? "text-gray-600"
                      : "text-gray-400"
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
