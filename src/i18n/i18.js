import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      projectDescriptions: {
        igraliste:
          "A mobile-first E-store MVP built for a client selling clothes (currently in development).",
        learnhub: "An open-source project I'm currently working on.",
        furwood: "A simple E-store I created.",
        clothes: "An SEO-friendly E-store built using Next.js.",
        marinov:
          "A mobile-first E-store MVP for a client selling jewelry (currently in development).",
        portfolio: "A responsive portfolio built for an online competition.",
        educenter: "A simple educational website I created.",
        carrace: "A simple racing game I created (desktop only).",
        stratego: "An interactive strategy game built with React and TypeScript, featuring complex game logic and engaging gameplay.",
        aiTourism: "AI-powered tourism assistant using LangChain and LangGraph, implementing RAG pipelines for intelligent travel recommendations.",
        aiChat: "Embeddable AI chat widget with semantic search capabilities, built with LangChain and Pinecone vector database.",
        automation: "Complex automation workflows built with N8N, streamlining business processes and data integration.",
        aiAgent: "No-code AI agent builder using Relevance AI and DeepAgents, creating intelligent automation solutions without traditional coding.",
        tourismDesign: "Complete UI/UX design for alternative tourism platform, including wireframes, prototypes, and design system in Figma and Protopie.",
        designSystem: "Comprehensive design system for e-commerce platforms, featuring component libraries and style guides created in Figma and Bootstrap Studio.",
      },
      projects: "Featured Projects",
      HeroTitle: "Dimitar Hristovski",
      HeroParagraph: "Full Stack Developer",
      HeroDescription:
        "Passionate full-stack developer with a strong focus on frontend development. Building modern web applications and AI-driven solutions that merge creativity, technology, and intelligence.",
      AboutTitle: "About Me",
      AboutParagraph1:
        "I'm a passionate and driven full-stack developer with a strong focus on frontend development. I've participated in various bootcamps, game jams, and hackathons, gaining hands-on experience across a wide range of projects. Most recently, I led a team at a startup focused on alternative tourism, where I was responsible for frontend design and development using React.js, along with tools like Figma, Protopie, and Bootstrap Studio.",
      AboutParagraph2:
        "In addition to my startup experience, I've actively contributed to several open-source projects, collaborating with developers worldwide and honing my ability to write clean, maintainable, and scalable code. While my core strength lies in crafting responsive and engaging interfaces, I also have strong knowledge of backend technologies such as Node.js, Express, SQL, and NoSQL databases, enabling me to deliver end-to-end MERN-stack solutions.",
      AboutParagraph3:
        "Recently, I've expanded my work into the AI and automation space, developing scalable backend APIs and intelligent systems using Mistral, LangChain, LangGraph, DeepAgents, n8n, and Relevance AI. My current focus includes building AI-driven agents, implementing RAG (Retrieval-Augmented Generation) pipelines, and exploring the high-code vs. low-code to create hybrid AI solutions that combine flexibility with efficiency.",
      AboutTagline: "Building tools that merge creativity, technology, and intelligence",
      ContactTitle: "Let's Connect",
      ContactDescription:
        "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!",
      ContactButton: "Get in Touch",
      SkillsSectionTitle: "What I Do",

      SkillFullstackDescription:
        "Experienced in creating end-to-end web applications with modern stacks like React.js, Next.js, and TypeScript. Strong knowledge of backend technologies including Node.js, Express, SQL, and NoSQL databases, enabling delivery of complete MERN-stack solutions. Actively contribute to open-source projects and have led teams at startups, focusing on building clean, maintainable, and scalable code.",
      SkillAIDescription:
        "Developing scalable backend APIs and intelligent systems using Mistral, LangChain, LangGraph, DeepAgents, n8n, and Relevance AI. Building AI-driven agents, implementing RAG (Retrieval-Augmented Generation) pipelines, and creating hybrid AI solutions that combine high-code flexibility with low-code efficiency. Experienced in semantic search, knowledge retrieval, and task automation.",
      SkillUIDescription:
        "Core strength in crafting responsive and engaging interfaces. Proficient in frontend design and development using React.js, along with design tools like Figma, Protopie, and Bootstrap Studio. Experienced in leading frontend teams and applying UX best practices to create outstanding user experiences that solve real-world problems.",
      // Fun Facts
      FunFactsBadge: "Fun Facts",
      FunFactsTitle: "Get to Know Me",
      FunFactsDescription: "A glimpse into my interests and preferences",
      FunFactsPersonalInterests: "Personal Interests",
      FunFactsTechPreferences: "Tech Preferences",
      FunFactsCoffeeTitle: "Coffee Enthusiast",
      FunFactsCoffeeDesc: "Fueled by code and coffee ☕",
      FunFactsGameTitle: "Game Developer",
      FunFactsGameDesc: "Love creating interactive games",
      FunFactsProblemTitle: "Problem Solver",
      FunFactsProblemDesc: "Enjoy tackling complex challenges",
      FunFactsTechTitle: "Tech Explorer",
      FunFactsTechDesc: "Always experimenting with new tech",
      FunFactsFavoriteFramework: "Favorite Framework",
      FunFactsPreferredLanguage: "Preferred Language",
      FunFactsDesignTool: "Design Tool",
      FunFactsCodeEditor: "Code Editor",
      // Reading List
      ReadingListBadge: "Reading List",
      ReadingListTitle: "Books",
      ReadingListDescription: "I enjoy reading fantasy novels and stoicism philosophy",
      ReadingListBooks: "Books",
      ReadingListStatusReading: "Reading",
      ReadingListStatusWantToRead: "Want to Read",
      // Currently Learning
      CurrentlyLearningBadge: "Currently Learning",
      CurrentlyLearningTitle: "Always Growing, Always Learning",
      CurrentlyLearningDescription: "Continuously expanding my knowledge and skills across all technologies I work with",
      CurrentlyLearningFrontend: "Frontend Technologies",
      CurrentlyLearningFrontendDesc: "React, Next.js, TypeScript, Tailwind CSS, Shadcn/ui",
      CurrentlyLearningBackend: "Backend & Databases",
      CurrentlyLearningBackendDesc: "Node.js, Express, PostgreSQL, MongoDB, SQL, NoSQL",
      CurrentlyLearningAI: "AI & Machine Learning",
      CurrentlyLearningAIDesc: "LangChain, LangGraph, RAG, VectorDB, Pinecone, Mistral, DeepAgents",
      CurrentlyLearningAutomation: "Automation & Tools",
      CurrentlyLearningAutomationDesc: "N8N, n8n workflows, automation platforms",
      CurrentlyLearningDesign: "Design & Prototyping",
      CurrentlyLearningDesignDesc: "Figma, Protopie, Bootstrap Studio, Design Systems",
      CurrentlyLearningDevTools: "Development Tools",
      CurrentlyLearningDevToolsDesc: "Visual Studio Code, Git, modern development workflows",
      // Certifications
      CertificationsBadge: "Certifications",
      CertificationsTitle: "Certifications & Achievements",
      CertificationsDescription: "AI & Technology Certifications",
    },
  },
  de: {
    translation: {
      projectDescriptions: {
        igraliste:
          "Ein Mobile-First E-Store MVP für einen Kunden, der Kleidung verkauft (derzeit in Entwicklung).",
        learnhub: "Ein Open-Source-Projekt, an dem ich derzeit arbeite.",
        furwood: "Ein einfacher E-Store, den ich erstellt habe.",
        clothes: "Ein SEO-freundlicher E-Store, erstellt mit Next.js.",
        marinov:
          "Ein Mobile-First E-Store MVP für einen Kunden, der Schmuck verkauft (derzeit in Entwicklung).",
        portfolio:
          "Ein responsives Portfolio, das ich für einen Online-Wettbewerb erstellt habe.",
        educenter: "Eine einfache Bildungswebsite, die ich erstellt habe.",
        carrace:
          "Ein einfaches Rennspiel, das ich erstellt habe (nur für Desktop).",
      },

      projects: "Ausgewählte Projekte",

      HeroTitle: "Dimitar Hristovski",
      HeroParagraph: "Full-Stack-Entwickler",
      HeroDescription:
        "Spezialisiert auf die Entwicklung moderner Webanwendungen mit Next.js, React und TypeScript. Fokussiert auf effiziente, skalierbare und benutzerfreundliche Lösungen.",
      AboutTitle: "Über mich",
      AboutParagraph1:
        "Als Full-Stack-Entwickler bin ich spezialisiert auf die Erstellung moderner Webanwendungen mit Next.js, React und TypeScript. Mein Ziel ist es, effiziente, skalierbare und benutzerfreundliche Lösungen zu entwickeln, die echte Probleme lösen.",
      AboutParagraph2:
        "Ich habe Erfahrung in der Entwicklung verschiedener Arten von Anwendungen, von E-Commerce-Plattformen bis hin zu Bildungswebsites. Ich lege großen Wert auf sauberen Code, Leistungsoptimierung und die Schaffung außergewöhnlicher Benutzererfahrungen.",
      AboutTagline: "Immer am Lernen, immer am Programmieren",
      ContactTitle: "Lass uns verbinden",
      ContactDescription:
        "Ich bin immer daran interessiert, von neuen Projekten und Möglichkeiten zu hören. Wenn Sie eine Frage haben oder einfach nur Hallo sagen möchten, zögern Sie nicht, Kontakt aufzunehmen!",
      ContactButton: "Kontakt aufnehmen",
      SkillsSectionTitle: "Was ich mache",

      SkillFullstackDescription:
        "Erfahren in der Entwicklung von End-to-End-Webanwendungen mit modernen Stacks wie React, Next.js, TypeScript und modernen CSS-Frameworks sowie Express.js und Node.js, unter Einbeziehung von sowohl relationalen als auch NoSQL-Datenbanken.",
      SkillAIDescription:
        "Fähig in der Gestaltung und Entwicklung intelligenter KI-Agenten, die autonome Entscheidungsfindung, Aufgabenautomatisierung, konversationelle Interaktionen und adaptive Reaktionen mit modernsten Maschinenlern-Frameworks und APIs durchführen können.",
      SkillUIDescription:
        "Kompetent in der Gestaltung intuitiver, benutzerzentrierter Schnittstellen mit Figma und anderen Prototyping-Tools, Anwendung von UX-Best Practices, Responsive Design und Zugänglichkeitsrichtlinien, um herausragende Benutzererlebnisse zu schaffen.",
      // Fun Facts
      FunFactsBadge: "Fun Facts",
      FunFactsTitle: "Lerne mich kennen",
      FunFactsDescription: "Ein Einblick in meine Interessen und Vorlieben",
      FunFactsPersonalInterests: "Persönliche Interessen",
      FunFactsTechPreferences: "Tech-Präferenzen",
      FunFactsCoffeeTitle: "Kaffee-Enthusiast",
      FunFactsCoffeeDesc: "Angetrieben von Code und Kaffee ☕",
      FunFactsGameTitle: "Spieleentwickler",
      FunFactsGameDesc: "Liebe es, interaktive Spiele zu erstellen",
      FunFactsProblemTitle: "Problemlöser",
      FunFactsProblemDesc: "Genieße es, komplexe Herausforderungen anzugehen",
      FunFactsTechTitle: "Tech-Entdecker",
      FunFactsTechDesc: "Experimentiere immer mit neuer Technologie",
      FunFactsFavoriteFramework: "Lieblings-Framework",
      FunFactsPreferredLanguage: "Bevorzugte Sprache",
      FunFactsDesignTool: "Design-Tool",
      FunFactsCodeEditor: "Code-Editor",
      // Reading List
      ReadingListBadge: "Lese Liste",
      ReadingListTitle: "Bücher",
      ReadingListDescription: "Ich lese gerne Fantasy-Romane und stoische Philosophie",
      ReadingListBooks: "Bücher",
      ReadingListStatusReading: "Lesen",
      ReadingListStatusWantToRead: "Möchte lesen",
      // Currently Learning
      CurrentlyLearningBadge: "Aktuell am Lernen",
      CurrentlyLearningTitle: "Immer wachsen, immer lernen",
      CurrentlyLearningDescription: "Erweitere kontinuierlich mein Wissen und meine Fähigkeiten in allen Technologien, mit denen ich arbeite",
      CurrentlyLearningFrontend: "Frontend-Technologien",
      CurrentlyLearningFrontendDesc: "React, Next.js, TypeScript, Tailwind CSS, Shadcn/ui",
      CurrentlyLearningBackend: "Backend & Datenbanken",
      CurrentlyLearningBackendDesc: "Node.js, Express, PostgreSQL, MongoDB, SQL, NoSQL",
      CurrentlyLearningAI: "KI & Maschinelles Lernen",
      CurrentlyLearningAIDesc: "LangChain, LangGraph, RAG, VectorDB, Pinecone, Mistral, DeepAgents",
      CurrentlyLearningAutomation: "Automatisierung & Tools",
      CurrentlyLearningAutomationDesc: "N8N, n8n-Workflows, Automatisierungsplattformen",
      CurrentlyLearningDesign: "Design & Prototyping",
      CurrentlyLearningDesignDesc: "Figma, Protopie, Bootstrap Studio, Design-Systeme",
      CurrentlyLearningDevTools: "Entwicklungstools",
      CurrentlyLearningDevToolsDesc: "Visual Studio Code, Git, moderne Entwicklungsworkflows",
      // Certifications
      CertificationsBadge: "Zertifizierungen",
      CertificationsTitle: "Zertifizierungen & Erfolge",
      CertificationsDescription: "KI & Technologie-Zertifizierungen",
    },
  },
  mk: {
    translation: {
      projectDescriptions: {
        igraliste:
          "Мобилна прво E-store апликација (MVP) за клиент кој продава облека (во развој).",
        learnhub: "Опен-сорс проект на кој моментално работам.",
        furwood: "Едноставен E-store што го имам изработено.",
        clothes: "SEO-пријателски E-store изработен со Next.js.",
        marinov:
          "Мобилна прво E-store апликација (MVP) за клиент што продава накит (во развој).",
        portfolio: "Респонзивно портфолио изработено за онлајн натпревар.",
        educenter: "Едноставна едукативна веб-страница што ја имам направено.",
        carrace:
          "Едноставна тркачка игра што ја имам направено (само за десктоп).",
      },

      projects: "Избрани проекти",
      HeroTitle: "Димитар Христовски",
      HeroParagraph: "Full-Stack-Developer",
      HeroDescription:
        "Специјализиран за создавање на модерни веб апликации со Next.js, React и TypeScript. Фокусиран на создавање на ефикасни, скалабилни и кориснички пријатни решенија.",
      AboutTitle: "За мене",
      AboutParagraph1:
        "Како Full-Stack-Developer, специјализиран сум за создавање на модерни веб апликации со Next.js, React и TypeScript. Мојот фокус е на создавање на ефикасни, скалабилни и кориснички пријатни решенија кои решаваат реални проблеми.",
      AboutParagraph2:
        "Имам искуство во развој на различни видови апликации, од платформи за е-трговија до образовни веб-сајтови. Страствен сум за чист код, оптимизација на перформансите и создавање на изключителни кориснички искуства.",
      AboutTagline: "Секогаш учам, секогаш кодирам",
      ContactTitle: "Да се поврземе",
      ContactDescription:
        "Секогаш сум заинтересиран да слушнам за нови проекти и можности. Дали имате прашање или само сакате да кажете здраво, слободно контактирајте!",
      ContactButton: "Воспостави контакт",
      SkillsSectionTitle: "Што правам",

      SkillFullstackDescription:
        "Искуство во креирање Full-Stack веб-апликации со современи технологии како React, Next.js, TypeScript и CSS рамки, заедно со Express.js и Node.js, користејќи и релациски и NoSQL бази на податоци.",
      SkillAIDescription:
        "Вешт во дизајнирање и развој на интелигентни АИ агенти способни за автономно донесување одлуки, автоматизација на задачи, конверзациски интеракции и адаптивни реакции со користење на најсовремени рамки за машинско учење и API-ја.",
      SkillUIDescription:
        "Искусen во дизајнирање интуитивни, кориснички ориентирани интерфејси со користење на Figma и други алатки за прототипирање, применувајќи најдобри UX практики, адаптивен дизајн и насоки за достапност за да се создадат извонредни кориснички искуства.",
      // Fun Facts
      FunFactsBadge: "Забавни факти",
      FunFactsTitle: "Запознај ме",
      FunFactsDescription: "Поглед во моите интереси и преференции",
      FunFactsPersonalInterests: "Лични интереси",
      FunFactsTechPreferences: "Технолошки преференции",
      FunFactsCoffeeTitle: "Љубител на кафе",
      FunFactsCoffeeDesc: "Напаѓан од код и кафе ☕",
      FunFactsGameTitle: "Развивач на игри",
      FunFactsGameDesc: "Сакам да создавам интерактивни игри",
      FunFactsProblemTitle: "Решавач на проблеми",
      FunFactsProblemDesc: "Уживам да се справувам со сложени предизвици",
      FunFactsTechTitle: "Истражувач на технологија",
      FunFactsTechDesc: "Секогаш експериментирам со нова технологија",
      FunFactsFavoriteFramework: "Омилен фрејмворк",
      FunFactsPreferredLanguage: "Префериран јазик",
      FunFactsDesignTool: "Алатка за дизајн",
      FunFactsCodeEditor: "Уредувач на код",
      // Reading List
      ReadingListBadge: "Листа за читање",
      ReadingListTitle: "Книги",
      ReadingListDescription: "Уживам да читам фантазиски романи и стоичка филозофија",
      ReadingListBooks: "Книги",
      ReadingListStatusReading: "Читам",
      ReadingListStatusWantToRead: "Сакам да прочитам",
      // Currently Learning
      CurrentlyLearningBadge: "Моментално учам",
      CurrentlyLearningTitle: "Секогаш растам, секогаш учам",
      CurrentlyLearningDescription: "Континуирано проширувам моето знаење и вештини во сите технологии со кои работам",
      CurrentlyLearningFrontend: "Frontend технологии",
      CurrentlyLearningFrontendDesc: "React, Next.js, TypeScript, Tailwind CSS, Shadcn/ui",
      CurrentlyLearningBackend: "Backend и бази на податоци",
      CurrentlyLearningBackendDesc: "Node.js, Express, PostgreSQL, MongoDB, SQL, NoSQL",
      CurrentlyLearningAI: "AI и машинско учење",
      CurrentlyLearningAIDesc: "LangChain, LangGraph, RAG, VectorDB, Pinecone, Mistral, DeepAgents",
      CurrentlyLearningAutomation: "Автоматизација и алатки",
      CurrentlyLearningAutomationDesc: "N8N, n8n workflows, платформи за автоматизација",
      CurrentlyLearningDesign: "Дизајн и прототипирање",
      CurrentlyLearningDesignDesc: "Figma, Protopie, Bootstrap Studio, системи за дизајн",
      CurrentlyLearningDevTools: "Алатки за развој",
      CurrentlyLearningDevToolsDesc: "Visual Studio Code, Git, модерни workflows за развој",
      // Certifications
      CertificationsBadge: "Сертификати",
      CertificationsTitle: "Сертификати и достигнувања",
      CertificationsDescription: "AI и технолошки сертификати",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("i18nextLng") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
console.log(i18n.language);

export default i18n;
