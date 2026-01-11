import { motion } from "framer-motion";
import { BookOpen, BookMarked } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export const ReadingList = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const books = [
    {
      title: "Meditations",
      author: "Marcus Aurelius",
      description: "Stoic philosophy and personal reflections",
      status: "Reading",
      genre: "Stoicism",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      description: "Epic fantasy trilogy - The Fellowship of the Ring",
      status: "Reading",
      genre: "Fantasy",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "The Witcher Series",
      author: "Andrzej Sapkowski",
      description: "The Last Wish - Fantasy short stories",
      status: "Reading",
      genre: "Fantasy",
      color: "from-purple-600 to-blue-600",
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
              borderColor: theme === "dark" ? "rgba(61, 27, 111, 0.3)" : "rgba(61, 27, 111, 0.5)",
              color: theme === "dark" ? "#9D7BF0" : "#3D1B6F",
              backgroundColor: theme === "dark" ? "rgba(61, 27, 111, 0.1)" : "rgba(61, 27, 111, 0.05)",
            }}
          >
            <BookOpen size={16} className="inline mr-2" />
            {t("ReadingListBadge")}
          </motion.span>
          <h2 className={`text-4xl md:text-6xl font-black mb-6 ${
            theme === "dark" ? "text-gray-100" : "text-gray-900"
          }`}>
            {t("ReadingListTitle")}
          </h2>
          <p className={`text-xl ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {t("ReadingListDescription")}
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Books Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={`relative p-6 rounded-2xl border-2 ${
                    theme === "dark"
                      ? "bg-dark-cosmic/50 border-cold-steel/30"
                      : "bg-white border-gray-200"
                  }`}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className={`font-bold text-xl mb-2 ${
                        theme === "dark" ? "text-gray-200" : "text-gray-800"
                      }`}>
                        {book.title}
                      </h4>
                      <p className={`text-sm mb-3 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                        by {book.author}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {book.genre && (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            book.genre === "Fantasy"
                              ? theme === "dark"
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                                : "bg-purple-100 text-purple-700 border-purple-200"
                              : theme === "dark"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }`}>
                            {book.genre}
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          book.status === "Reading"
                            ? theme === "dark"
                              ? "bg-green-500/10 text-green-400 border-green-500/30"
                              : "bg-green-100 text-green-700 border-green-200"
                            : theme === "dark"
                            ? "bg-gray-700 text-gray-400 border-gray-600"
                            : "bg-gray-200 text-gray-600 border-gray-300"
                        }`}>
                          {book.status === "Reading" ? t("ReadingListStatusReading") : t("ReadingListStatusWantToRead")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {book.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
