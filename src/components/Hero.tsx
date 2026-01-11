import {
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  GitFork,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./contexts/ThemeContext";
import { useBotMischief } from "./contexts/BotMischiefContext";
import { BotMischiefWrapper } from "./BotMischiefWrapper";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GitHubStats {
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  contributedTo: number;
  languages: { [key: string]: number };
}

const Hero = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { shakeText } = useBotMischief();
  const [statsLoading, setStatsLoading] = useState(true);
  const [langsLoading, setLangsLoading] = useState(true);
  const [statsData, setStatsData] = useState<GitHubStats | null>(null);
  const [statsError, setStatsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);

  const username = "DimitarHristovski";

  // Fetch GitHub stats data with retry logic
  useEffect(() => {
    let isMounted = true;
    const maxRetries = 3;

    const fetchStats = async (retry = 0): Promise<void> => {
      try {
        if (!isMounted) return;
        
        setStatsLoading(true);
        setLangsLoading(true);
        setStatsError(false);
        setErrorMessage("");
        setRetryCount(0);

        // Fetch user data from GitHub API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        
        clearTimeout(timeoutId);

        if (!userResponse.ok) {
          if (userResponse.status === 403) {
            const rateLimitReset = userResponse.headers.get('x-ratelimit-reset');
            
            if (retry < maxRetries) {
              // Rate limit - wait and retry
              const waitTime = rateLimitReset 
                ? Math.max(0, parseInt(rateLimitReset) * 1000 - Date.now()) + 1000
                : 2000 * (retry + 1);
              
              setErrorMessage(`Rate limit reached. Retrying in ${Math.ceil(waitTime / 1000)}s...`);
              await new Promise(resolve => setTimeout(resolve, Math.min(waitTime, 10000)));
              return fetchStats(retry + 1);
            } else {
              throw new Error("GitHub API rate limit exceeded. Please try again later.");
            }
          }
          
          if (userResponse.status === 404) {
            throw new Error("GitHub user not found. Please check the username.");
          }
          
          throw new Error(`Failed to fetch user data: ${userResponse.status} ${userResponse.statusText}`);
        }

        // Fetch repositories with pagination
        let allRepos: any[] = [];
        let page = 1;
        const perPage = 100;

        while (page <= 2) { // Limit to 2 pages (200 repos max)
          const reposController = new AbortController();
          const reposTimeoutId = setTimeout(() => reposController.abort(), 10000);

          const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`,
            {
              signal: reposController.signal,
              headers: {
                'Accept': 'application/vnd.github.v3+json',
              },
            }
          );

          clearTimeout(reposTimeoutId);

          if (!reposResponse.ok) {
            if (reposResponse.status === 403 && retry < maxRetries) {
              const waitTime = 2000 * (retry + 1);
              setErrorMessage(`Rate limit reached. Retrying...`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
              return fetchStats(retry + 1);
            }
            if (reposResponse.status !== 403) {
              console.warn(`Failed to fetch repos page ${page}: ${reposResponse.status}`);
            }
            break;
          }

          const repos = await reposResponse.json();
          if (repos.length === 0) break;
          
          allRepos = [...allRepos, ...repos];
          if (repos.length < perPage) break;
          page++;
        }

        if (!isMounted) return;

        // Calculate stats
        const totalStars = allRepos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        const totalCommits = allRepos.length * 30; // Better approximation
        const totalPRs = 0;
        const totalIssues = 0;
        const contributedTo = 0;

        // Fetch language data with concurrency limit
        const languagePromises = allRepos.slice(0, 50).map(async (repo: any) => {
          try {
            const langController = new AbortController();
            const langTimeoutId = setTimeout(() => langController.abort(), 5000);
            
            const langResponse = await fetch(repo.languages_url, {
              signal: langController.signal,
              headers: {
                'Accept': 'application/vnd.github.v3+json',
              },
            });
            
            clearTimeout(langTimeoutId);
            
            if (langResponse.ok) {
              return await langResponse.json();
            }
            return {};
          } catch {
            return {};
          }
        });

        const languageData = await Promise.all(languagePromises);
        
        if (!isMounted) return;

        const languages: { [key: string]: number } = {};

        languageData.forEach((langs: any) => {
          Object.keys(langs).forEach((lang) => {
            languages[lang] = (languages[lang] || 0) + langs[lang];
          });
        });

        // Sort languages by usage
        const sortedLanguages = Object.entries(languages)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .slice(0, 5)
          .reduce((obj, [key, value]) => {
            obj[key] = value as number;
            return obj;
          }, {} as { [key: string]: number });

        if (isMounted) {
          setStatsData({
            totalStars,
            totalCommits,
            totalPRs,
            totalIssues,
            contributedTo,
            languages: sortedLanguages,
          });

          setStatsLoading(false);
          setLangsLoading(false);
        }
      } catch (error: any) {
        if (!isMounted) return;
        
        console.error("Error fetching GitHub stats:", error);
        
        // Handle specific error types
        if (error.name === 'AbortError') {
          setErrorMessage("Request timed out. Please check your connection.");
        } else if (error.message) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Failed to load GitHub stats. Please try again later.");
        }
        
        if (retry < maxRetries && error.name !== 'AbortError' && !error.message?.includes('rate limit')) {
          // Retry with exponential backoff
          setRetryCount(retry + 1);
          await new Promise(resolve => setTimeout(resolve, 2000 * (retry + 1)));
          return fetchStats(retry + 1);
        }
        
        setStatsError(true);
        setStatsLoading(false);
        setLangsLoading(false);
      }
    };

    fetchStats(0);

    return () => {
      isMounted = false;
    };
  }, [username]);

  // Retry function for manual retry button
  const handleRetry = async () => {
    setStatsError(false);
    setStatsLoading(true);
    setLangsLoading(true);
    setErrorMessage("");
    setRetryCount(0);
    
    // Simplified retry - fetch basic stats
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (!userResponse.ok) {
        if (userResponse.status === 403) {
          setErrorMessage("GitHub API rate limit exceeded. Please try again later.");
        } else {
          setErrorMessage(`Failed to fetch: ${userResponse.status}`);
        }
        setStatsError(true);
        setStatsLoading(false);
        setLangsLoading(false);
        return;
      }

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!reposResponse.ok) {
        setErrorMessage(`Failed to fetch repositories: ${reposResponse.status}`);
        setStatsError(true);
        setStatsLoading(false);
        setLangsLoading(false);
        return;
      }

      const repos = await reposResponse.json();
      const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
      const totalCommits = repos.length * 30;

      // Fetch languages for first 20 repos
      const langPromises = repos.slice(0, 20).map(async (repo: any) => {
        try {
          const langResponse = await fetch(repo.languages_url);
          return langResponse.ok ? await langResponse.json() : {};
        } catch {
          return {};
        }
      });

      const languageData = await Promise.all(langPromises);
      const languages: { [key: string]: number } = {};

      languageData.forEach((langs: any) => {
        Object.keys(langs).forEach((lang) => {
          languages[lang] = (languages[lang] || 0) + langs[lang];
        });
      });

      const sortedLanguages = Object.entries(languages)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 5)
        .reduce((obj, [key, value]) => {
          obj[key] = value as number;
          return obj;
        }, {} as { [key: string]: number });

      setStatsData({
        totalStars,
        totalCommits,
        totalPRs: 0,
        totalIssues: 0,
        contributedTo: 0,
        languages: sortedLanguages,
      });

      setStatsLoading(false);
      setLangsLoading(false);
    } catch (error: any) {
      console.error("Error fetching GitHub stats:", error);
      setStatsError(true);
      setStatsLoading(false);
      setLangsLoading(false);
      setErrorMessage(error.message || "Failed to load GitHub stats. Please try again later.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.section
      id="hero-section"
      className={`min-h-screen flex flex-col justify-center items-center relative px-4 overflow-hidden pt-16 ${shakeText ? "text-shake" : ""} ${
        theme === "dark"
          ? "bg-gradient-to-br from-dark-cosmic via-dark-cosmic to-dark-cosmic text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-deep-purple" : "bg-deep-purple/30"
          }`}
        />
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-fiery-orange" : "bg-fiery-orange/30"
          }`}
        />
      </div>

      <motion.div
        className="text-center max-w-4xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className={`text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${
            theme === "dark"
              ? "from-gold-accent via-fiery-orange to-energy-red"
              : "from-deep-purple via-fiery-orange to-energy-red"
          }`}
        >
          {t("HeroTitle")}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`text-2xl md:text-3xl font-semibold mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {t("HeroParagraph")}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("HeroDescription")}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-6 justify-center mb-16"
        >
          <motion.a
            href="https://github.com/DimitarHristovski"
            className={`group relative p-4 rounded-full transition-all duration-300 overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 text-gray-300 hover:text-white border border-gray-700/50"
                : "bg-white/90 backdrop-blur-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 shadow-lg hover:shadow-xl border border-gray-200/50"
            }`}
            aria-label="GitHub Profile"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-deep-purple/20 to-fiery-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Github size={24} className="relative z-10" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/dimitar-hristovski-1711a9163"
            className={`group relative p-4 rounded-full transition-all duration-300 overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 text-gray-300 hover:text-white border border-gray-700/50"
                : "bg-white/90 backdrop-blur-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 shadow-lg hover:shadow-xl border border-gray-200/50"
            }`}
            aria-label="LinkedIn Profile"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-hero-blue/20 to-deep-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Linkedin size={24} className="relative z-10" />
          </motion.a>
          <motion.a
            href="mailto:dimihbt@yahoo.com"
            className={`group relative p-4 rounded-full transition-all duration-300 overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 text-gray-300 hover:text-white border border-gray-700/50"
                : "bg-white/90 backdrop-blur-sm hover:bg-gray-100 text-gray-700 hover:text-gray-900 shadow-lg hover:shadow-xl border border-gray-200/50"
            }`}
            aria-label="Email Contact"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fiery-orange/20 to-energy-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Mail size={24} className="relative z-10" />
          </motion.a>
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          variants={itemVariants}
          className={`p-6 md:p-8 rounded-2xl shadow-2xl mb-12 backdrop-blur-sm relative overflow-hidden ${
            theme === "dark"
              ? "bg-gray-800/80 border border-gray-700"
              : "bg-white/80 border border-gray-200"
          }`}
        >
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-deep-purple/10 to-fiery-orange/10 rounded-full blur-2xl" />
          
          {/* Section Header */}
          <div className="text-center mb-6 relative z-10">
            <h3 className={`text-xl md:text-2xl font-bold mb-2 ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              GitHub Statistics
            </h3>
            <p className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              My coding activity and contributions
            </p>
          </div>

          {/* Stats Display */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-8 relative z-10">
            {/* GitHub Stats Card */}
            <div className="relative w-full md:w-auto">
              <div className={`relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 ${
                theme === "dark" ? "bg-gray-800/80 border border-gray-700" : "bg-white/80 border border-gray-200"
              }`} style={{ minHeight: '200px', minWidth: '400px' }}>
                {statsLoading && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                      <p className={`text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>Loading stats...</p>
                    </div>
                  </div>
                )}
                {statsError && (
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <div className="text-center">
                      <p className={`text-sm mb-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {errorMessage || "Unable to load stats"}
                      </p>
                      {retryCount > 0 && (
                        <p className={`text-xs ${
                          theme === "dark" ? "text-gray-500" : "text-gray-500"
                        }`}>
                          Retried {retryCount} time{retryCount > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    <motion.button
                      onClick={handleRetry}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === "dark"
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
                    >
                      Retry
                    </motion.button>
                  </div>
                )}
                {!statsLoading && !statsError && statsData && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Github size={20} className={theme === "dark" ? "text-gray-300" : "text-gray-700"} />
                      <h4 className={`font-bold text-lg ${
                        theme === "dark" ? "text-gray-100" : "text-gray-800"
                      }`}>GitHub Statistics</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-3 rounded-lg ${
                        theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Star size={16} className="text-yellow-500" />
                          <span className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>Total Stars</span>
                        </div>
                        <p className={`text-2xl font-bold ${
                          theme === "dark" ? "text-gray-100" : "text-gray-800"
                        }`}>{statsData.totalStars.toLocaleString()}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp size={16} className="text-green-500" />
                          <span className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>Commits</span>
                        </div>
                        <p className={`text-2xl font-bold ${
                          theme === "dark" ? "text-gray-100" : "text-gray-800"
                        }`}>{statsData.totalCommits.toLocaleString()}+</p>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <GitFork size={16} className="text-hero-blue" />
                          <span className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>Repositories</span>
                        </div>
                        <p className={`text-2xl font-bold ${
                          theme === "dark" ? "text-gray-100" : "text-gray-800"
                        }`}>{Object.keys(statsData.languages).length}+</p>
                      </div>
                      <div className={`p-3 rounded-lg ${
                        theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Users size={16} className="text-purple-500" />
                          <span className={`text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>Public Repos</span>
                        </div>
                        <p className={`text-2xl font-bold ${
                          theme === "dark" ? "text-gray-100" : "text-gray-800"
                        }`}>{Object.keys(statsData.languages).length}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top Languages Card */}
            <div className="relative w-full md:w-auto">
              <div className={`relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 ${
                theme === "dark" ? "bg-gray-800/80 border border-gray-700" : "bg-white/80 border border-gray-200"
              }`} style={{ minHeight: '200px', minWidth: '300px' }}>
                {langsLoading && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
                      <p className={`text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>Loading languages...</p>
                    </div>
                  </div>
                )}
                {statsError && (
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <p className={`text-sm text-center ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {errorMessage || "Unable to load languages"}
                    </p>
                    <motion.button
                      onClick={handleRetry}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        theme === "dark"
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
                    >
                      Retry
                    </motion.button>
                  </div>
                )}
                {!langsLoading && !statsError && statsData && (
                  <div className="space-y-4">
                    <h4 className={`font-bold text-lg mb-4 ${
                      theme === "dark" ? "text-gray-100" : "text-gray-800"
                    }`}>Top Languages</h4>
                    <div className="space-y-3">
                      {Object.entries(statsData.languages).map(([lang, bytes]) => {
                        const totalBytes = Object.values(statsData.languages).reduce((a, b) => a + b, 0);
                        const percentage = ((bytes / totalBytes) * 100).toFixed(1);
                        return (
                          <div key={lang} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className={`text-sm font-medium ${
                                theme === "dark" ? "text-gray-300" : "text-gray-700"
                              }`}>{lang}</span>
                              <span className={`text-xs ${
                                theme === "dark" ? "text-gray-400" : "text-gray-600"
                              }`}>{percentage}%</span>
                            </div>
                            <div className={`h-2 rounded-full overflow-hidden ${
                              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                            }`}>
                              <div
                                className="h-full bg-gradient-to-r from-hero-blue to-fiery-orange transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 relative z-10">
            <motion.a
              href="https://github.com/DimitarHristovski?tab=repositories"
              className={`group flex flex-col items-center justify-center gap-2 p-4 md:p-5 rounded-xl transition-all duration-300 border ${
                theme === "dark"
                  ? "bg-gray-700/50 hover:bg-gray-700 text-gray-300 border-gray-600 hover:border-hero-blue"
                  : "bg-fiery-orange/10 hover:bg-fiery-orange/20 text-gray-700 border-fiery-orange/30 hover:border-fiery-orange/50"
              }`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-2 rounded-lg ${
                theme === "dark" ? "bg-hero-blue/20" : "bg-fiery-orange/20"
              }`}>
                <GitFork size={24} className="text-hero-blue" />
              </div>
              <span className="font-semibold text-sm md:text-base">Repositories</span>
              <span className={`text-xs ${
                theme === "dark" ? "text-gray-500" : "text-gray-500"
              }`}>
                View all repos
              </span>
            </motion.a>
            <motion.a
              href="https://github.com/DimitarHristovski?tab=stars"
              className={`group flex flex-col items-center justify-center gap-2 p-4 md:p-5 rounded-xl transition-all duration-300 border ${
                theme === "dark"
                  ? "bg-gray-700/50 hover:bg-gray-700 text-gray-300 border-gray-600 hover:border-gold-accent"
                  : "bg-gold-accent/10 hover:bg-gold-accent/20 text-gray-700 border-gold-accent/30 hover:border-gold-accent/50"
              }`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-2 rounded-lg ${
                theme === "dark" ? "bg-gold-accent/20" : "bg-gold-accent/20"
              }`}>
                <Star size={24} className="text-gold-accent" />
              </div>
              <span className="font-semibold text-sm md:text-base">Stars</span>
              <span className={`text-xs ${
                theme === "dark" ? "text-gray-500" : "text-gray-500"
              }`}>
                Starred repos
              </span>
            </motion.a>
            <motion.a
              href="https://github.com/DimitarHristovski?tab=followers"
              className={`group flex flex-col items-center justify-center gap-2 p-4 md:p-5 rounded-xl transition-all duration-300 border ${
                theme === "dark"
                  ? "bg-gray-700/50 hover:bg-gray-700 text-gray-300 border-gray-600 hover:border-green-500"
                  : "bg-green-50 hover:bg-green-100 text-gray-700 border-green-200 hover:border-green-400"
              }`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-2 rounded-lg ${
                theme === "dark" ? "bg-green-500/20" : "bg-green-100"
              }`}>
                <Users size={24} className="text-green-500" />
              </div>
              <span className="font-semibold text-sm md:text-base">Followers</span>
              <span className={`text-xs ${
                theme === "dark" ? "text-gray-500" : "text-gray-500"
              }`}>
                GitHub network
              </span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown
          size={32}
          className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
        />
      </motion.div>
    </motion.section>
  );
};

export default Hero;
