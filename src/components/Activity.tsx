import { useState, useEffect } from "react";
import { useTheme } from "./contexts/ThemeContext";
import { motion } from "framer-motion";
import { Github, Calendar, ExternalLink, TrendingUp, RefreshCw } from "lucide-react";

export const Activity = () => {
  const { theme } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const username = "DimitarHristovski";

  // Generate chart URL with cache-busting timestamp
  const getChartUrl = () => {
    const timestamp = new Date().getTime();
    // Use multiple services for better reliability and fresh data
    return `https://ghchart.rshah.org/${username}?t=${timestamp}`;
  };

  const [chartUrl, setChartUrl] = useState(getChartUrl());

  const refreshChart = async () => {
    setIsRefreshing(true);
    setImageLoaded(false);
    
    // Force refresh by updating URL with new timestamp
    const newUrl = getChartUrl();
    setChartUrl(newUrl);
    
    // Preload the new image
    const img = new Image();
    img.src = newUrl;
    img.onload = () => {
      setImageLoaded(true);
      setIsRefreshing(false);
      setLastUpdated(new Date());
    };
    img.onerror = () => {
      setIsRefreshing(false);
      setImageLoaded(true); // Show old image if new one fails
    };
  };

  useEffect(() => {
    // Initial load
    const img = new Image();
    img.src = chartUrl;
    img.onload = () => {
      setImageLoaded(true);
      setLastUpdated(new Date());
    };
    
    // Auto-refresh every 5 minutes to get latest data
    const refreshInterval = setInterval(() => {
      refreshChart();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <section
      className={`py-24 relative ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-b from-white via-gray-50 to-white text-gray-800"
      }`}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 opacity-5 ${
          theme === "dark" ? "bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" : "bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23000000\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
        }`} />
        
        {/* Gradient Orbs */}
        <motion.div
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === "dark" ? "bg-green-500" : "bg-green-400"
          }`}
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === "dark" ? "bg-blue-500" : "bg-blue-400"
          }`}
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.9,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white shadow-2xl"
              animate={{ 
                rotate: [0, 5, -5, 0],
                boxShadow: [
                  "0 20px 25px -5px rgba(16, 185, 129, 0.3)",
                  "0 20px 25px -5px rgba(16, 185, 129, 0.5)",
                  "0 20px 25px -5px rgba(16, 185, 129, 0.3)",
                ],
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, repeatDelay: 2 },
                boxShadow: { duration: 3, repeat: Infinity },
              }}
            >
              <Github size={28} />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
            </motion.div>
            <div className="text-left">
              <h2 className={`text-5xl md:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${
                theme === "dark"
                  ? "from-green-400 via-emerald-400 to-teal-400"
                  : "from-green-600 via-emerald-600 to-teal-600"
              }`}>
                GitHub Activity
              </h2>
              <div className="flex items-center gap-2">
                <TrendingUp 
                  size={16} 
                  className={theme === "dark" ? "text-green-400" : "text-green-600"}
                />
                <p className={`text-lg ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Coding journey visualized
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Contribution Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className={`absolute -inset-1 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 ${
            theme === "dark"
              ? "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
              : "bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400"
          }`} />

          <div className={`relative rounded-3xl p-8 md:p-10 ${
            theme === "dark"
              ? "bg-gray-800/90 backdrop-blur-xl border border-gray-700/50"
              : "bg-white/90 backdrop-blur-xl border border-gray-200/50"
          } shadow-2xl`}>
            {/* Header Bar */}
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  theme === "dark"
                    ? "bg-green-500/20 border border-green-500/30"
                    : "bg-green-100 border border-green-200"
                }`}>
                  <Calendar
                    size={24}
                    className={theme === "dark" ? "text-green-400" : "text-green-600"}
                  />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${
                    theme === "dark" ? "text-gray-100" : "text-gray-800"
                  }`}>
                    Contribution Graph
                  </h3>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Last 365 days of activity (public repositories only)
                    {lastUpdated && (
                      <span className="ml-2 text-xs opacity-75">
                        • Updated {lastUpdated.toLocaleTimeString()}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={refreshChart}
                  disabled={isRefreshing}
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition-all ${
                    theme === "dark"
                      ? "bg-gray-700/50 hover:bg-gray-700 text-gray-300 border border-gray-600"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                  } ${isRefreshing ? "opacity-50 cursor-not-allowed" : ""}`}
                  title="Refresh contribution data"
                >
                  <RefreshCw 
                    size={20} 
                    className={isRefreshing ? "animate-spin" : ""} 
                  />
                </motion.button>
                <motion.a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                  } shadow-lg hover:shadow-xl`}
                >
                  View Profile
                  <ExternalLink size={18} />
                </motion.a>
              </div>
            </div>

            {/* Chart Container */}
            <div className={`relative overflow-hidden rounded-2xl ${
              theme === "dark" ? "bg-gray-900/80" : "bg-gray-50"
            } p-6 border ${
              theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
            }`}>
              {(!imageLoaded || isRefreshing) && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900/80 backdrop-blur-sm rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
                    <p className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {isRefreshing ? "Refreshing contribution data..." : "Loading contribution data..."}
                    </p>
                  </div>
                </div>
              )}
              <motion.img
                key={chartUrl} // Force re-render on URL change
                src={chartUrl}
                alt="GitHub Contributions"
                className={`w-full h-auto rounded-xl transition-all duration-700 ${
                  imageLoaded && !isRefreshing ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                loading="lazy"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onLoad={() => {
                  if (!isRefreshing) {
                    setImageLoaded(true);
                  }
                }}
              />
              
              {/* Overlay Gradient */}
              <div className={`absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-t ${
                theme === "dark"
                  ? "from-gray-900/50 via-transparent to-transparent"
                  : "from-white/30 via-transparent to-transparent"
              }`} />
            </div>

            {/* Enhanced Legend */}
            <div className="mt-6 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded bg-gray-700"></div>
                  <div className="w-3 h-3 rounded bg-gray-600"></div>
                </div>
                <span className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Less
                </span>
              </div>
              <div className="h-4 w-px bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded bg-green-400"></div>
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <div className="w-3 h-3 rounded bg-green-600"></div>
                </div>
                <span className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  More
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
