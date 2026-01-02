import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles, BookOpen, HelpCircle, Smile, Users, Gamepad2, MessageCircle } from "lucide-react";
import { useTheme } from "./contexts/ThemeContext";
import { useBotMischief } from "./contexts/BotMischiefContext";

type GameMode = "chat" | "trivia" | "joke" | "tictactoe" | "rps" | "guess";

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "Why did the developer go broke? Because he used up all his cache! 💰",
  "How do you comfort a JavaScript bug? You console it! 😂",
  "Why did the React component feel lonely? Because it didn't know what state it was in! 😢",
  "What's a programmer's favorite hangout place? Foo Bar! 🍺",
  "Why do Java developers wear glasses? Because they can't C#! 👓",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍻",
  "Why did the programmer quit his job? He didn't get arrays! 😅",
  "What do you call a programmer from Finland? Nerdic! 🇫🇮",
  "Why don't programmers like nature? It has too many bugs! 🐛🌳",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
  "Why did the developer break up with his girlfriend? She didn't support his dependencies! 💔",
];

const triviaFacts = [
  "Did you know? React was created by Facebook (now Meta) in 2013! 🚀",
  "Fun fact: The first programming language was created in 1883! It was called 'Analytical Engine' by Ada Lovelace! 👩‍💻",
  "Interesting: TypeScript was released by Microsoft in 2012 and has grown to be one of the most loved languages! 💙",
  "Cool fact: LangChain makes it easy to build AI applications by chaining together different components! 🔗",
  "Amazing: Vector databases can search through millions of documents in milliseconds using semantic similarity! 🔍",
  "Did you know? The term 'full-stack' developer became popular around 2010 when web development became more complex! 🌐",
  "Fun fact: The first computer bug was an actual bug! A moth was found in the Harvard Mark II computer in 1947! 🦋",
  "Interesting: JavaScript was created in just 10 days by Brendan Eich in 1995! ⚡",
  "Cool fact: Python is named after Monty Python, not the snake! 🐍",
  "Amazing: The first website is still online! Check out info.cern.ch! 🌐",
];

export const ChatRobot = () => {
  const { theme } = useTheme();
  const { kickOutElement, restoreElement, triggerFireworks } = useBotMischief();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot" }>>([
    { text: "Hey there! 👋 I'm here to help with coding questions and discussions! Ask me about programming, web development, AI technologies, or play a game with 'tictactoe', 'rps', or 'guess'! 💻", sender: "bot" }
  ]);
  const [isJumping, setIsJumping] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("chat");
  const [isLoading, setIsLoading] = useState(false);
  const [showJokeBubble, setShowJokeBubble] = useState(false);
  const [showTriviaBubble, setShowTriviaBubble] = useState(false);
  const [currentJoke, setCurrentJoke] = useState<string>("");
  const [currentTrivia, setCurrentTrivia] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [botShape, setBotShape] = useState<"circle" | "square" | "hexagon" | "diamond">("circle");
  const [botColor, setBotColor] = useState<number>(0);
  const [botEmotion, setBotEmotion] = useState<"happy" | "angry" | "neutral">("neutral");
  // Mini game states
  const [ticTacToeBoard, setTicTacToeBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [ticTacToeTurn, setTicTacToeTurn] = useState<"X" | "O">("X");
  const [ticTacToeScores, setTicTacToeScores] = useState({ player: 0, ai: 0 });
  const [rpsScores, setRpsScores] = useState({ player: 0, ai: 0 });
  const [guessNumber, setGuessNumber] = useState<number | null>(null);
  const [guessAttempts, setGuessAttempts] = useState(0);
  const [guessInput, setGuessInput] = useState("");
  const [guessHistory, setGuessHistory] = useState<Array<{ guess: number; result: "high" | "low" | "correct" }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Random position on mount and periodic movement (only when not dragging)
  useEffect(() => {
    const updatePosition = () => {
      if (isDragging) return; // Don't update position while dragging
      const maxX = Math.max(0, window.innerWidth - 100);
      const maxY = Math.max(0, window.innerHeight - 100);
      setPosition({
        x: Math.random() * maxX,
        y: Math.random() * maxY,
      });
    };
    
    updatePosition();
    
    const interval = setInterval(() => {
      if (!isOpen && !isDragging) {
        updatePosition();
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 800);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isOpen, isDragging]);

  // Change bot shape and color periodically
  useEffect(() => {
    const shapes: Array<"circle" | "square" | "hexagon" | "diamond"> = ["circle", "square", "hexagon", "diamond"];
    const colorCount = 6; // Number of color variants
    
    const changeAppearance = () => {
      // Change shape
      setBotShape(prev => {
        const currentIndex = shapes.indexOf(prev);
        const nextIndex = (currentIndex + 1) % shapes.length;
        return shapes[nextIndex];
      });
      
      // Change color
      setBotColor(prev => (prev + 1) % colorCount);
      
      // Change emotion randomly
      const emotions: Array<"happy" | "angry" | "neutral"> = ["happy", "angry", "neutral"];
      setBotEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
    };
    
    // Change every 8 seconds
    const interval = setInterval(changeAppearance, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Bot mischief: based on emotion - happy = fireworks, angry = kick out elements
  useEffect(() => {
    if (isOpen) return; // Don't cause mischief when chat is open
    
    // Smaller element selectors (cards, paragraphs, images)
    const elementSelectors = [
      '[data-bot-target="card"]',
      '[data-bot-target="paragraph"]',
      '[data-bot-target="image"]',
      '[data-bot-target="stat-card"]',
      '[data-bot-target="project-card"]',
      '[data-bot-target="skill-card"]',
      '[data-bot-target="cert-card"]',
    ];

    const causeMischief = () => {
      if (botEmotion === "happy") {
        // Show fireworks when happy
        triggerFireworks();
      } else if (botEmotion === "angry") {
        // Kick out random small elements when angry
        const allElements = document.querySelectorAll(elementSelectors.join(', '));
        if (allElements.length > 0) {
          const randomElement = allElements[Math.floor(Math.random() * allElements.length)];
          const elementId = randomElement.getAttribute('data-bot-id') || `element-${Date.now()}`;
          
          if (!randomElement.getAttribute('data-bot-id')) {
            randomElement.setAttribute('data-bot-id', elementId);
          }
          
          kickOutElement(elementId);
          
          // Restore after 5 seconds
          setTimeout(() => {
            restoreElement(elementId);
          }, 5000);
        }
      }
    };

    // Cause mischief every 15-25 seconds (random interval)
    const getRandomInterval = () => Math.random() * 10000 + 15000; // 15-25 seconds
    
    let timeoutId: NodeJS.Timeout;
    const scheduleNextMischief = () => {
      timeoutId = setTimeout(() => {
        causeMischief();
        scheduleNextMischief();
      }, getRandomInterval());
    };
    
    // Start after initial delay
    const initialTimeout = setTimeout(() => {
      causeMischief();
      scheduleNextMischief();
    }, getRandomInterval());
    
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [isOpen, botEmotion, kickOutElement, restoreElement, triggerFireworks]);

  // Show random jokes and trivia outside chat window
  useEffect(() => {
    if (isOpen) {
      setShowJokeBubble(false);
      setShowTriviaBubble(false);
      return;
    }

    const showRandomJoke = () => {
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      setCurrentJoke(randomJoke);
      setShowJokeBubble(true);
      setShowTriviaBubble(false); // Hide trivia if showing
      
      // Hide joke after 5 seconds
      setTimeout(() => {
        setShowJokeBubble(false);
      }, 5000);
    };

    const showRandomTrivia = () => {
      const randomTrivia = triviaFacts[Math.floor(Math.random() * triviaFacts.length)];
      setCurrentTrivia(randomTrivia);
      setShowTriviaBubble(true);
      setShowJokeBubble(false); // Hide joke if showing
      
      // Hide trivia after 6 seconds (slightly longer for reading)
      setTimeout(() => {
        setShowTriviaBubble(false);
      }, 6000);
    };

    // Show first content after 3 seconds (randomly joke or trivia)
    const firstContentTimeout = setTimeout(() => {
      if (Math.random() > 0.5) {
        showRandomJoke();
      } else {
        showRandomTrivia();
      }
    }, 3000);

    // Then alternate between jokes and trivia every 12 seconds
    let isJoke = true;
    const contentInterval = setInterval(() => {
      if (isJoke) {
        showRandomJoke();
      } else {
        showRandomTrivia();
      }
      isJoke = !isJoke;
    }, 30000);

    return () => {
      clearTimeout(firstContentTimeout);
      clearInterval(contentInterval);
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMouseEnter = () => {
    if (!isDragging) {
      setIsWaving(true);
    }
  };

  const handleMouseLeave = () => {
    setIsWaving(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return; // Don't drag when chat is open
    setIsDragging(true);
    setIsWaving(false);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const maxX = Math.max(0, window.innerWidth - 100);
      const maxY = Math.max(0, window.innerHeight - 100);
      
      let newX = e.clientX - dragOffset.x - 50; // 50 is half of robot width (w-16 = 64px, so ~50 for center)
      let newY = e.clientY - dragOffset.y - 50;
      
      // Constrain to viewport
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);


  const startTicTacToe = () => {
    setGameMode("tictactoe");
    setTicTacToeBoard(Array(9).fill(null));
    setTicTacToeTurn("X");
    setMessages([
      { text: "🎮 Tic-Tac-Toe! You are X, AI is O", sender: "bot" },
      { text: "Click on the board below to make your move! Type 'reset' to start over.", sender: "bot" }
    ]);
  };

  const getBestMove = (board: (string | null)[]): number => {
    // Check if AI can win
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = "O";
        if (calculateWinner(testBoard) === "O") {
          return i;
        }
      }
    }
    
    // Block player from winning
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = "X";
        if (calculateWinner(testBoard) === "X") {
          return i;
        }
      }
    }
    
    // Take center if available
    if (board[4] === null) return 4;
    
    // Take a corner
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available spot
    const available = board.map((cell, i) => cell === null ? i : null).filter(i => i !== null) as number[];
    return available[Math.floor(Math.random() * available.length)];
  };

  const handleTicTacToeMove = (index: number) => {
    if (ticTacToeBoard[index] || calculateWinner(ticTacToeBoard) || ticTacToeTurn !== "X") return;
    
    const newBoard = [...ticTacToeBoard];
    newBoard[index] = "X";
    setTicTacToeBoard(newBoard);
    
    let winner = calculateWinner(newBoard);
    if (winner) {
      if (winner === "X") {
        setTicTacToeScores(prev => ({ ...prev, player: prev.player + 1 }));
        setMessages(prev => [...prev, { text: "🎉 You win! Type 'tictactoe' to play again!", sender: "bot" }]);
      }
      return;
    }
    
    if (newBoard.every(cell => cell !== null)) {
      setMessages(prev => [...prev, { text: "🤝 It's a tie! Type 'tictactoe' to play again!", sender: "bot" }]);
      return;
    }
    
    // AI's turn
    setTimeout(() => {
      const aiMove = getBestMove(newBoard);
      const aiBoard = [...newBoard];
      aiBoard[aiMove] = "O";
      setTicTacToeBoard(aiBoard);
      
      winner = calculateWinner(aiBoard);
      if (winner === "O") {
        setTicTacToeScores(prev => ({ ...prev, ai: prev.ai + 1 }));
        setMessages(prev => [...prev, { text: "🤖 AI wins! Type 'tictactoe' to play again!", sender: "bot" }]);
      } else if (aiBoard.every(cell => cell !== null)) {
        setMessages(prev => [...prev, { text: "🤝 It's a tie! Type 'tictactoe' to play again!", sender: "bot" }]);
      } else {
        setMessages(prev => [...prev, { text: "Your turn! Make your move.", sender: "bot" }]);
      }
    }, 500);
  };

  const calculateWinner = (squares: (string | null)[]): string | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getWinningLine = (squares: (string | null)[]): number[] | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return line;
      }
    }
    return null;
  };

  const startRockPaperScissors = () => {
    setGameMode("rps");
    setMessages([
      { text: "🪨📄✂️ Rock Paper Scissors vs AI!", sender: "bot" },
      { text: "Click 'rock', 'paper', or 'scissors' to play!", sender: "bot" }
    ]);
  };

  const handleRPSChoice = (playerChoice: "rock" | "paper" | "scissors") => {
    const choices: ("rock" | "paper" | "scissors")[] = ["rock", "paper", "scissors"];
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];
    
    const result = getRPSWinner(playerChoice, aiChoice);
    if (result === "player") {
      setRpsScores(prev => ({ ...prev, player: prev.player + 1 }));
      setMessages(prev => [...prev, { 
        text: `🎉 You win! ${playerChoice} beats ${aiChoice}! Type 'rps' to play again!`, 
        sender: "bot" 
      }]);
    } else if (result === "ai") {
      setRpsScores(prev => ({ ...prev, ai: prev.ai + 1 }));
      setMessages(prev => [...prev, { 
        text: `🤖 AI wins! ${aiChoice} beats ${playerChoice}! Type 'rps' to play again!`, 
        sender: "bot" 
      }]);
    } else {
      setMessages(prev => [...prev, { 
        text: `🤝 It's a tie! Both chose ${playerChoice}. Type 'rps' to play again!`, 
        sender: "bot" 
      }]);
    }
  };

  const getRPSWinner = (player: string, ai: string): "player" | "ai" | "tie" => {
    if (player === ai) return "tie";
    if ((player === "rock" && ai === "scissors") || (player === "paper" && ai === "rock") || (player === "scissors" && ai === "paper")) {
      return "player";
    }
    return "ai";
  };

  const startNumberGuess = () => {
    setGameMode("guess");
    const number = Math.floor(Math.random() * 100) + 1;
    setGuessNumber(number);
    setGuessAttempts(0);
    setGuessInput("");
    setGuessHistory([]);
    setMessages([
      { text: "🔢 Number Guessing Game! I'm thinking of a number between 1 and 100!", sender: "bot" },
      { text: "Enter your guess below! I'll tell you if it's too high or too low.", sender: "bot" }
    ]);
  };

  const handleNumberGuess = (guess: number) => {
    if (!guessNumber || guess < 1 || guess > 100) return;
    
    setGuessAttempts(prev => prev + 1);
    setGuessInput("");
    
    if (guess === guessNumber) {
      setGuessHistory(prev => [...prev, { guess, result: "correct" }]);
      setMessages(prev => [...prev, { text: `🎉 Correct! The number was ${guessNumber}! It took ${guessAttempts + 1} attempts!`, sender: "bot" }]);
      setTimeout(() => {
        setGuessNumber(null);
        setGuessHistory([]);
      }, 3000);
    } else if (guess < guessNumber) {
      setGuessHistory(prev => [...prev, { guess, result: "low" }]);
      setMessages(prev => [...prev, { text: `📈 Too low! Try a higher number. (Attempt ${guessAttempts + 1})`, sender: "bot" }]);
    } else {
      setGuessHistory(prev => [...prev, { guess, result: "high" }]);
      setMessages(prev => [...prev, { text: `📉 Too high! Try a lower number. (Attempt ${guessAttempts + 1})`, sender: "bot" }]);
    }
  };

  const handleGuessSubmit = () => {
    const num = parseInt(guessInput);
    if (!isNaN(num) && num >= 1 && num <= 100) {
      handleNumberGuess(num);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      const userMsg = message.trim().toLowerCase();
      setMessages([...messages, { text: message, sender: "user" }]);
      setMessage("");
      
      setTimeout(() => {
        // Game mode handlers
        if (userMsg.includes("tictactoe") || userMsg.includes("tic tac toe") || userMsg.includes("ttt")) {
          startTicTacToe();
          return;
        }
        
        if (userMsg.includes("rps") || userMsg.includes("rock paper scissors")) {
          startRockPaperScissors();
          return;
        }
        
        if ((userMsg.includes("rock") || userMsg.includes("paper") || userMsg.includes("scissors")) && gameMode === "rps") {
          if (userMsg.includes("rock")) handleRPSChoice("rock");
          else if (userMsg.includes("paper")) handleRPSChoice("paper");
          else if (userMsg.includes("scissors")) handleRPSChoice("scissors");
          return;
        }
        
        if (userMsg.includes("guess") || userMsg.includes("number")) {
          if (gameMode === "guess" && !isNaN(parseInt(userMsg))) {
            handleNumberGuess(parseInt(userMsg));
            return;
          } else {
            startNumberGuess();
            return;
          }
        }
        
        if (userMsg.includes("reset") && gameMode === "tictactoe") {
          startTicTacToe();
          return;
        }
        
        // Regular chat - use OpenAI API
        setIsLoading(true);
        const callOpenAI = async () => {
          try {
            // Build conversation history (last 5 messages for context)
            const recentMessages = messages.slice(-5).map(msg => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text
            }));

          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: message.trim(), // Use original message, not lowercased
              conversationHistory: recentMessages,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setMessages(prev => [...prev, { text: data.message, sender: "bot" }]);
            
            // Log token usage (optional - you can remove this if not needed)
            if (data.tokenUsage) {
              console.log('Token usage:', data.tokenUsage);
            }
          } else if (response.status === 429) {
            // Token limit exceeded
            const errorData = await response.json();
            setMessages(prev => [...prev, { 
              text: `⚠️ ${errorData.message || 'Monthly token limit reached. The limit will reset next month.'}`, 
              sender: "bot" 
            }]);
          } else {
            throw new Error('API request failed');
          }
          } catch (error) {
            console.error('Error calling OpenAI API:', error);
            // Fallback to default responses if API fails
            const responses = [
              "I'm having trouble connecting right now, but I'm still here to help! Try asking a coding question or play a game with 'tictactoe', 'rps', or 'guess'! 💻",
              "Oops! Connection issue. I can still help with coding questions or play games! Try 'tictactoe', 'rps', or 'guess'! 🚀",
              "My AI brain is taking a break! But I'm always ready to discuss coding topics or play games! 💡",
              "Looks like I'm having connection issues. Feel free to ask coding questions or try a game! ✨",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            setMessages(prev => [...prev, { text: randomResponse, sender: "bot" }]);
          } finally {
            setIsLoading(false);
          }
        };
        
        callOpenAI();
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const { showFireworks } = useBotMischief();

  return (
    <>
      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="fireworks-container">
          {Array.from({ length: 50 }).map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const colors = ['#2E66F6', '#FF5A2D', '#FF2E2E', '#F7B500', '#3D1B6F'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            return (
              <motion.div
                key={i}
                className="firework"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 2, 0],
                  opacity: [1, 1, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                }}
                transition={{
                  duration: 1,
                  delay,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Floating Robot */}
      <motion.div
        ref={containerRef}
        className={`fixed z-50 ${isDragging ? "cursor-grabbing" : "cursor-grab"} select-none`}
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={isDragging ? { duration: 0 } : {
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onClick={() => {
          if (!isDragging) {
            setIsOpen(true);
          }
        }}
        whileHover={!isDragging ? { scale: 1.15 } : {}}
        whileTap={!isDragging ? { scale: 0.9 } : {}}
      >
        <motion.div
          className={`relative w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-500 ${
            botShape === "circle" ? "rounded-full" :
            botShape === "square" ? "rounded-lg" :
            botShape === "hexagon" ? "hexagon-shape" :
            "diamond-shape"
          }`}
          style={{
            background: botColor === 0 ? "linear-gradient(135deg, #2E66F6, #FF5A2D, #FF2E2E)" :
                       botColor === 1 ? "linear-gradient(135deg, #3D1B6F, #2E66F6, #F7B500)" :
                       botColor === 2 ? "linear-gradient(135deg, #FF5A2D, #F7B500, #2E66F6)" :
                       botColor === 3 ? "linear-gradient(135deg, #2E66F6, #3D1B6F, #FF5A2D)" :
                       botColor === 4 ? "linear-gradient(135deg, #F7B500, #FF2E2E, #2E66F6)" :
                       "linear-gradient(135deg, #FF2E2E, #2E66F6, #F7B500)"
          }}
          animate={{
            y: isJumping ? [-20, 0, -10, 0] : [0, -8, 0],
            rotate: isJumping ? [-10, 10, -5, 0] : [0, 2, -2, 0],
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 10px 30px rgba(46, 102, 246, 0.4)",
              "0 15px 40px rgba(255, 90, 45, 0.5)",
              "0 10px 30px rgba(46, 102, 246, 0.4)",
            ],
          }}
          transition={{
            y: {
              duration: isJumping ? 0.6 : 2,
              repeat: isJumping ? 0 : Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: isJumping ? 0.6 : 3,
              repeat: isJumping ? 0 : Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 0.5,
              ease: "easeInOut",
            },
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <motion.div
            animate={{
              rotate: isWaving ? [0, 15, -15, 10, -10, 0] : 0,
              scale: isWaving ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            <Bot size={32} className="text-white" />
          </motion.div>
          
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Sparkles size={16} className="text-gold-accent" />
          </motion.div>

          <motion.div
            className={`absolute inset-0 rounded-full border-2 ${
              theme === "dark" ? "border-gold-accent" : "border-gold-accent"
            }`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {!isOpen && !showJokeBubble && !showTriviaBubble && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
              theme === "dark"
                ? "bg-dark-cosmic border border-cold-steel text-gray-200"
                : "bg-white border border-gray-200 text-gray-800 shadow-lg"
            }`}
          >
            Let's play! 🎮
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 rotate-45 ${
              theme === "dark" ? "bg-dark-cosmic border-r border-b border-cold-steel" : "bg-white border-r border-b border-gray-200"
            }`} />
          </motion.div>
        )}

        {/* Joke Speech Bubble */}
        {!isOpen && showJokeBubble && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className={`absolute -top-32 left-1/2 transform -translate-x-1/2 w-64 px-4 py-3 rounded-xl shadow-2xl ${
              theme === "dark"
                ? "bg-gradient-to-br from-hero-blue/90 to-fiery-orange/90 border-2 border-gold-accent/50 text-white"
                : "bg-gradient-to-br from-hero-blue/90 to-fiery-orange/90 border-2 border-gold-accent/50 text-white"
            }`}
          >
            <div className="flex items-start gap-2">
              <Smile size={20} className="text-gold-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1">Joke Time! 😄</p>
                <p className="text-xs leading-relaxed">{currentJoke}</p>
              </div>
              <motion.button
                onClick={() => setShowJokeBubble(false)}
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={14} />
              </motion.button>
            </div>
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rotate-45 ${
              theme === "dark"
                ? "bg-gradient-to-br from-hero-blue/90 to-fiery-orange/90 border-r border-b border-gold-accent/50"
                : "bg-gradient-to-br from-hero-blue/90 to-fiery-orange/90 border-r border-b border-gold-accent/50"
            }`} />
          </motion.div>
        )}

        {/* Trivia Speech Bubble */}
        {!isOpen && showTriviaBubble && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className={`absolute -top-32 left-1/2 transform -translate-x-1/2 w-64 px-4 py-3 rounded-xl shadow-2xl ${
              theme === "dark"
                ? "bg-gradient-to-br from-deep-purple/90 to-hero-blue/90 border-2 border-gold-accent/50 text-white"
                : "bg-gradient-to-br from-deep-purple/90 to-hero-blue/90 border-2 border-gold-accent/50 text-white"
            }`}
          >
            <div className="flex items-start gap-2">
              <BookOpen size={20} className="text-gold-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1">Fun Fact! 📚</p>
                <p className="text-xs leading-relaxed">{currentTrivia}</p>
              </div>
              <motion.button
                onClick={() => setShowTriviaBubble(false)}
                className="text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={14} />
              </motion.button>
            </div>
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rotate-45 ${
              theme === "dark"
                ? "bg-gradient-to-br from-deep-purple/90 to-hero-blue/90 border-r border-b border-gold-accent/50"
                : "bg-gradient-to-br from-deep-purple/90 to-hero-blue/90 border-r border-b border-gold-accent/50"
            }`} />
          </motion.div>
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-md h-[600px] rounded-2xl shadow-2xl ${
                theme === "dark"
                  ? "bg-dark-cosmic border-2 border-cold-steel"
                  : "bg-white border-2 border-gray-200"
              } pointer-events-auto flex flex-col overflow-hidden`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-4 border-b ${
                theme === "dark" ? "border-cold-steel" : "border-gray-200"
              }`}>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-hero-blue via-fiery-orange to-energy-red"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot size={24} className="text-white" />
                  </motion.div>
                  <div>
                    <h3 className={`font-bold ${
                      theme === "dark" ? "text-gray-100" : "text-gray-800"
                    }`}>
                      Playful Bot 🤖
                    </h3>
                    <p className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Coding Help • Games • Learning
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    setGameMode("chat");
                  }}
                  className={`p-2 rounded-lg ${
                    theme === "dark"
                      ? "hover:bg-cold-steel text-gray-300"
                      : "hover:bg-gray-100 text-gray-600"
                  } transition-colors`}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Quick Actions */}
              <div className={`px-4 py-3 border-b ${
                theme === "dark" ? "border-cold-steel bg-dark-cosmic" : "border-gray-200 bg-gray-50"
              }`}>
                <div className="flex gap-2 flex-wrap">
                  <motion.button
                    onClick={() => {
                      setGameMode("chat");
                      setMessages(prev => [...prev, { text: "Hi! I'm ready to chat! Ask me anything about coding, technology, or just have a conversation! 💬", sender: "bot" }]);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-hero-blue/50 to-fiery-orange/50 text-gray-200 hover:from-hero-blue/70 hover:to-fiery-orange/70 border border-hero-blue/30"
                        : "bg-gradient-to-r from-hero-blue/20 to-fiery-orange/20 text-gray-800 hover:from-hero-blue/30 hover:to-fiery-orange/30 border border-hero-blue/30"
                    } transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={14} />
                    Chat
                  </motion.button>
                  <motion.button
                    onClick={startTicTacToe}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      theme === "dark"
                        ? "bg-cold-steel/50 text-gray-300 hover:bg-cold-steel"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Gamepad2 size={14} />
                    Tic-Tac-Toe
                  </motion.button>
                  <motion.button
                    onClick={startRockPaperScissors}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      theme === "dark"
                        ? "bg-cold-steel/50 text-gray-300 hover:bg-cold-steel"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Users size={14} />
                    RPS
                  </motion.button>
                  <motion.button
                    onClick={startNumberGuess}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      theme === "dark"
                        ? "bg-cold-steel/50 text-gray-300 hover:bg-cold-steel"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HelpCircle size={14} />
                    Guess
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? theme === "dark"
                          ? "bg-gradient-to-br from-hero-blue to-deep-purple text-white"
                          : "bg-gradient-to-br from-hero-blue to-deep-purple text-white"
                        : theme === "dark"
                        ? "bg-cold-steel/50 text-gray-200"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Tic-Tac-Toe Board */}
                {gameMode === "tictactoe" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="space-y-4"
                  >
                    <div className={`relative p-6 rounded-2xl backdrop-blur-sm ${
                      theme === "dark" 
                        ? "bg-gradient-to-br from-dark-cosmic/90 via-cold-steel/40 to-dark-cosmic/90 border-2 border-gold-accent/30 shadow-2xl" 
                        : "bg-gradient-to-br from-white via-gray-50 to-white border-2 border-hero-blue/30 shadow-xl"
                    }`}>
                      {/* Game Title */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-lg font-bold bg-gradient-to-r from-hero-blue to-fiery-orange bg-clip-text text-transparent`}>
                          Tic-Tac-Toe
                        </h3>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                          theme === "dark" ? "bg-cold-steel/50" : "bg-gray-100"
                        }`}>
                          <span className={`text-xs font-semibold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}>
                            {ticTacToeTurn === "X" ? "Your Turn" : "AI's Turn"}
                          </span>
                        </div>
                      </div>

                      {/* Game Board */}
                      <div className="grid grid-cols-3 gap-3 mb-4 p-2 bg-gradient-to-br from-hero-blue/10 to-fiery-orange/10 rounded-xl">
                        {ticTacToeBoard.map((cell, index) => {
                          const winner = calculateWinner(ticTacToeBoard);
                          const winningLine = getWinningLine(ticTacToeBoard);
                          const isWinningCell = winningLine ? winningLine.includes(index) : false;
                          const isClickable = cell === null && ticTacToeTurn === "X" && !winner;
                          
                          return (
                            <motion.button
                              key={index}
                              onClick={() => handleTicTacToeMove(index)}
                              disabled={!isClickable}
                              className={`relative w-20 h-20 text-3xl font-bold rounded-xl transition-all ${
                                cell === "X"
                                  ? "bg-gradient-to-br from-hero-blue to-deep-purple text-white shadow-lg"
                                  : cell === "O"
                                  ? "bg-gradient-to-br from-fiery-orange to-energy-red text-white shadow-lg"
                                  : isClickable
                                  ? theme === "dark"
                                    ? "bg-cold-steel/40 hover:bg-cold-steel/60 border-2 border-gold-accent/30 cursor-pointer"
                                    : "bg-gray-200 hover:bg-gray-300 border-2 border-hero-blue/30 cursor-pointer"
                                  : theme === "dark"
                                  ? "bg-cold-steel/20 border border-metal-grey/20 cursor-not-allowed"
                                  : "bg-gray-100 border border-gray-200 cursor-not-allowed"
                              } ${isWinningCell ? "ring-4 ring-gold-accent" : ""}`}
                              whileHover={isClickable ? { scale: 1.05, rotate: [0, -5, 5, 0] } : {}}
                              whileTap={isClickable ? { scale: 0.95 } : {}}
                              animate={cell ? { scale: [0.8, 1.1, 1] } : {}}
                            >
                              {cell || ""}
                              {isClickable && (
                                <motion.div
                                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-hero-blue/20 to-fiery-orange/20"
                                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Score Display */}
                      <div className={`flex items-center justify-between p-3 rounded-xl ${
                        theme === "dark" ? "bg-cold-steel/30" : "bg-gray-100"
                      }`}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-hero-blue"></div>
                          <span className={`text-sm font-semibold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}>
                            You: <span className="text-hero-blue">{ticTacToeScores.player}</span>
                          </span>
                        </div>
                        <div className="w-px h-6 bg-metal-grey/30"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-fiery-orange"></div>
                          <span className={`text-sm font-semibold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}>
                            AI: <span className="text-fiery-orange">{ticTacToeScores.ai}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Rock Paper Scissors */}
                {gameMode === "rps" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="space-y-4"
                  >
                    <div className={`relative p-6 rounded-2xl backdrop-blur-sm ${
                      theme === "dark" 
                        ? "bg-gradient-to-br from-dark-cosmic/90 via-cold-steel/40 to-dark-cosmic/90 border-2 border-gold-accent/30 shadow-2xl" 
                        : "bg-gradient-to-br from-white via-gray-50 to-white border-2 border-hero-blue/30 shadow-xl"
                    }`}>
                      {/* Game Title */}
                      <div className="flex items-center justify-center mb-6">
                        <h3 className={`text-lg font-bold bg-gradient-to-r from-hero-blue to-fiery-orange bg-clip-text text-transparent`}>
                          Rock Paper Scissors
                        </h3>
                      </div>

                      {/* Choice Buttons */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {(["rock", "paper", "scissors"] as const).map((choice, index) => {
                          const emoji = choice === "rock" ? "🪨" : choice === "paper" ? "📄" : "✂️";
                          const gradients = [
                            "from-hero-blue to-deep-purple",
                            "from-fiery-orange to-energy-red",
                            "from-gold-accent to-fiery-orange"
                          ];
                          
                          return (
                            <motion.button
                              key={choice}
                              onClick={() => handleRPSChoice(choice)}
                              className={`relative p-4 rounded-xl bg-gradient-to-br ${gradients[index]} text-white shadow-lg overflow-hidden group`}
                              whileHover={{ scale: 1.1, y: -5 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="text-4xl mb-2">{emoji}</div>
                              <div className="text-xs font-semibold uppercase tracking-wider">
                                {choice}
                              </div>
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                              />
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Score Display */}
                      <div className={`flex items-center justify-between p-4 rounded-xl ${
                        theme === "dark" ? "bg-cold-steel/30" : "bg-gray-100"
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-hero-blue"></div>
                          <span className={`text-sm font-semibold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}>
                            You: <span className="text-hero-blue text-lg">{rpsScores.player}</span>
                          </span>
                        </div>
                        <div className="w-px h-8 bg-metal-grey/30"></div>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-fiery-orange"></div>
                          <span className={`text-sm font-semibold ${
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          }`}>
                            AI: <span className="text-fiery-orange text-lg">{rpsScores.ai}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Number Guessing Game */}
                {gameMode === "guess" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="space-y-4"
                  >
                    <div className={`relative p-6 rounded-2xl backdrop-blur-sm ${
                      theme === "dark" 
                        ? "bg-gradient-to-br from-dark-cosmic/90 via-cold-steel/40 to-dark-cosmic/90 border-2 border-gold-accent/30 shadow-2xl" 
                        : "bg-gradient-to-br from-white via-gray-50 to-white border-2 border-hero-blue/30 shadow-xl"
                    }`}>
                      {/* Game Title */}
                      <div className="flex items-center justify-center mb-4">
                        <h3 className={`text-lg font-bold bg-gradient-to-r from-hero-blue to-fiery-orange bg-clip-text text-transparent`}>
                          Number Guessing Game
                        </h3>
                      </div>

                      {/* Range Indicator */}
                      <div className={`mb-4 p-3 rounded-xl ${
                        theme === "dark" ? "bg-cold-steel/30" : "bg-gray-100"
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-semibold ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>Range: 1 - 100</span>
                          <span className={`text-xs font-semibold ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>Attempts: {guessAttempts}</span>
                        </div>
                        <div className={`h-2 rounded-full overflow-hidden ${
                          theme === "dark" ? "bg-cold-steel/50" : "bg-gray-200"
                        }`}>
                          <motion.div
                            className="h-full bg-gradient-to-r from-hero-blue to-fiery-orange"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(guessAttempts / 10) * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>

                      {/* Guess Input */}
                      <div className="flex gap-2 mb-4">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={guessInput}
                          onChange={(e) => setGuessInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && guessInput && guessNumber) {
                              handleGuessSubmit();
                            }
                          }}
                          placeholder="Enter 1-100"
                          disabled={!guessNumber}
                          className={`flex-1 px-4 py-3 rounded-xl text-center text-lg font-bold ${
                            theme === "dark"
                              ? "bg-cold-steel/50 text-gray-200 placeholder-gray-500 border-2 border-metal-grey/30 focus:border-hero-blue"
                              : "bg-gray-100 text-gray-800 placeholder-gray-400 border-2 border-gray-200 focus:border-hero-blue"
                          } focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed`}
                        />
                        <motion.button
                          onClick={handleGuessSubmit}
                          disabled={!guessInput || !guessNumber || parseInt(guessInput) < 1 || parseInt(guessInput) > 100}
                          className={`px-6 py-3 rounded-xl font-semibold ${
                            guessInput && guessNumber && parseInt(guessInput) >= 1 && parseInt(guessInput) <= 100
                              ? "bg-gradient-to-r from-hero-blue to-fiery-orange text-white shadow-lg"
                              : theme === "dark"
                              ? "bg-cold-steel/30 text-gray-500 cursor-not-allowed"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                          whileHover={guessInput && guessNumber && parseInt(guessInput) >= 1 && parseInt(guessInput) <= 100 ? { scale: 1.05 } : {}}
                          whileTap={guessInput && guessNumber && parseInt(guessInput) >= 1 && parseInt(guessInput) <= 100 ? { scale: 0.95 } : {}}
                        >
                          Guess
                        </motion.button>
                      </div>

                      {/* Guess History */}
                      {guessHistory.length > 0 && (
                        <div className={`p-3 rounded-xl ${
                          theme === "dark" ? "bg-cold-steel/20" : "bg-gray-50"
                        }`}>
                          <div className={`text-xs font-semibold mb-2 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}>Recent Guesses:</div>
                          <div className="flex flex-wrap gap-2">
                            {guessHistory.slice(-5).map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                                  item.result === "correct"
                                    ? "bg-gradient-to-r from-gold-accent to-fiery-orange text-white"
                                    : item.result === "low"
                                    ? "bg-hero-blue/20 text-hero-blue border border-hero-blue/30"
                                    : "bg-fiery-orange/20 text-fiery-orange border border-fiery-orange/30"
                                }`}
                              >
                                {item.guess} {item.result === "correct" ? "✓" : item.result === "low" ? "↑" : "↓"}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Status Message */}
                      {!guessNumber && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`text-center p-3 rounded-xl ${
                            theme === "dark" ? "bg-gold-accent/20 border border-gold-accent/30" : "bg-gold-accent/10 border border-gold-accent/30"
                          }`}
                        >
                          <span className={`text-sm font-semibold ${
                            theme === "dark" ? "text-gold-accent" : "text-gold-accent"
                          }`}>
                            🎉 Game Complete! Click "Guess" button to play again!
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className={`p-3 rounded-2xl ${
                      theme === "dark" ? "bg-cold-steel/50" : "bg-gray-100"
                    }`}>
                      <div className="flex space-x-1">
                        <div className={`w-2 h-2 rounded-full ${
                          theme === "dark" ? "bg-metal-grey" : "bg-gray-400"
                        } animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                        <div className={`w-2 h-2 rounded-full ${
                          theme === "dark" ? "bg-metal-grey" : "bg-gray-400"
                        } animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                        <div className={`w-2 h-2 rounded-full ${
                          theme === "dark" ? "bg-metal-grey" : "bg-gray-400"
                        } animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className={`p-4 border-t ${
                theme === "dark" ? "border-cold-steel" : "border-gray-200"
              }`}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask coding questions or try: 'tictactoe', 'rps', 'guess'..."
                    className={`flex-1 px-4 py-2 rounded-lg text-sm ${
                      theme === "dark"
                        ? "bg-cold-steel/50 text-gray-200 placeholder-gray-500 border border-metal-grey/30"
                        : "bg-gray-100 text-gray-800 placeholder-gray-400 border border-gray-200"
                    } focus:outline-none focus:ring-2 focus:ring-hero-blue`}
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className={`p-2 rounded-lg ${
                      message.trim()
                        ? "bg-gradient-to-br from-hero-blue to-fiery-orange text-white"
                        : theme === "dark"
                        ? "bg-cold-steel/50 text-gray-500"
                        : "bg-gray-100 text-gray-400"
                    } transition-all`}
                    whileHover={message.trim() ? { scale: 1.1 } : {}}
                    whileTap={message.trim() ? { scale: 0.9 } : {}}
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
