import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BotMischiefContextType {
  kickedOutElements: Set<string>;
  shakeText: boolean;
  showFireworks: boolean;
  tokenUsage: number;
  lastInteractionTime: number;
  botPosition: { x: number; y: number } | null;
  updateTokenUsage: (tokenUsage: { used: number; remaining: number; limit: number }) => void;
  updateLastInteraction: () => void;
  updateBotPosition: (position: { x: number; y: number }) => void;
  kickOutElement: (elementId: string) => void;
  restoreElement: (elementId: string) => void;
  triggerTextShake: () => void;
  triggerFireworks: () => void;
}

const BotMischiefContext = createContext<BotMischiefContextType | undefined>(undefined);

const TOKEN_USAGE_KEY = 'bot_token_usage';
const TOKEN_MONTH_KEY = 'bot_token_month';

// Helper to get current month key
function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}_${now.getMonth()}`;
}

export const BotMischiefProvider = ({ children }: { children: ReactNode }) => {
  const [kickedOutElements, setKickedOutElements] = useState<Set<string>>(new Set());
  const [shakeText, setShakeText] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [tokenUsage, setTokenUsage] = useState<number>(0);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(Date.now());
  const [botPosition, setBotPosition] = useState<{ x: number; y: number } | null>(null);

  // Load token usage from localStorage on mount and check if month changed
  useEffect(() => {
    const storedMonth = localStorage.getItem(TOKEN_MONTH_KEY);
    const currentMonth = getCurrentMonthKey();
    
    // If month changed, reset token usage
    if (storedMonth !== currentMonth) {
      localStorage.setItem(TOKEN_MONTH_KEY, currentMonth);
      localStorage.setItem(TOKEN_USAGE_KEY, '0');
      setTokenUsage(0);
    } else {
      const stored = localStorage.getItem(TOKEN_USAGE_KEY);
      if (stored) {
        setTokenUsage(parseInt(stored, 10) || 0);
      }
    }
  }, []);

  // Kick out components when bot is ignored and hovering over them
  useEffect(() => {
    const IGNORE_TIME_MS = 6000; 
    const KICK_INTERVAL_MS = 500; 

    const checkAndKickComponents = () => {
      const timeSinceLastInteraction = Date.now() - lastInteractionTime;
      
      if (timeSinceLastInteraction > IGNORE_TIME_MS && botPosition) {
        // Find the bot element in the DOM to get its actual viewport position
        const botElement = document.querySelector('[data-bot-container]') as HTMLElement;
        
        if (botElement) {
          const rect = botElement.getBoundingClientRect();
          // Bot center position in viewport coordinates
          const botCenterX = rect.left + rect.width / 2;
          const botCenterY = rect.top + rect.height / 2;
          
          // Get element at bot's center position (using viewport coordinates)
          const elementAtPoint = document.elementFromPoint(botCenterX, botCenterY);
          
          if (elementAtPoint) {
            // Traverse up the DOM tree to find an element with data-bot-id
            let targetElement: HTMLElement | null = elementAtPoint as HTMLElement;
            const validTypes = ['card', 'paragraph', 'image', 'stat-card', 'project-card', 'skill-card', 'cert-card'];
            
            while (targetElement && targetElement !== document.body) {
              // Skip if we hit the bot element itself
              if (targetElement === botElement || targetElement.closest('[data-bot-container]')) {
                break;
              }
              
              const elementType = targetElement.getAttribute('data-bot-target');
              const elementId = targetElement.getAttribute('data-bot-id');
              
              if (elementId && elementType && validTypes.includes(elementType)) {
                // Found a valid wrapped element, kick it out
                setKickedOutElements(prev => {
                  if (!prev.has(elementId)) {
                    // Restore after 5 seconds
                    setTimeout(() => {
                      setKickedOutElements(prevSet => {
                        const newSet = new Set(prevSet);
                        newSet.delete(elementId);
                        return newSet;
                      });
                    }, 5000);
                    return new Set(prev).add(elementId);
                  }
                  return prev;
                });
                break; // Only kick out one element at a time
              }
              
              targetElement = targetElement.parentElement;
            }
          }
        }
      }
    };

    const interval = setInterval(checkAndKickComponents, KICK_INTERVAL_MS);
    
    return () => clearInterval(interval);
  }, [lastInteractionTime, botPosition]);

  const kickOutElement = (elementId: string) => {
    setKickedOutElements(prev => new Set(prev).add(elementId));
  };

  const restoreElement = (elementId: string) => {
    setKickedOutElements(prev => {
      const newSet = new Set(prev);
      newSet.delete(elementId);
      return newSet;
    });
  };

  const triggerTextShake = () => {
    setShakeText(true);
    setTimeout(() => setShakeText(false), 2000);
  };

  const triggerFireworks = () => {
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 3000);
  };

  const updateTokenUsage = (tokenUsageData: { used: number; remaining: number; limit: number }) => {
    // Calculate total usage: limit - remaining
    const totalUsage = tokenUsageData.limit - tokenUsageData.remaining;
    
    // Check if month changed
    const storedMonth = localStorage.getItem(TOKEN_MONTH_KEY);
    const currentMonth = getCurrentMonthKey();
    
    if (storedMonth !== currentMonth) {
      // Month changed, reset
      localStorage.setItem(TOKEN_MONTH_KEY, currentMonth);
      localStorage.setItem(TOKEN_USAGE_KEY, totalUsage.toString());
      setTokenUsage(totalUsage);
    } else {
      // Update with latest from server (most accurate)
      localStorage.setItem(TOKEN_USAGE_KEY, totalUsage.toString());
      setTokenUsage(totalUsage);
    }
  };

  const updateLastInteraction = () => {
    setLastInteractionTime(Date.now());
  };

  const updateBotPosition = (position: { x: number; y: number }) => {
    setBotPosition(position);
  };

  return (
    <BotMischiefContext.Provider
      value={{
        kickedOutElements,
        shakeText,
        showFireworks,
        tokenUsage,
        lastInteractionTime,
        botPosition,
        updateTokenUsage,
        updateLastInteraction,
        updateBotPosition,
        kickOutElement,
        restoreElement,
        triggerTextShake,
        triggerFireworks,
      }}
    >
      {children}
    </BotMischiefContext.Provider>
  );
};

export const useBotMischief = () => {
  const context = useContext(BotMischiefContext);
  if (!context) {
    throw new Error('useBotMischief must be used within BotMischiefProvider');
  }
  return context;
};

