import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BotMischiefContextType {
  kickedOutElements: Set<string>;
  shakeText: boolean;
  showFireworks: boolean;
  kickOutElement: (elementId: string) => void;
  restoreElement: (elementId: string) => void;
  triggerTextShake: () => void;
  triggerFireworks: () => void;
}

const BotMischiefContext = createContext<BotMischiefContextType | undefined>(undefined);

export const BotMischiefProvider = ({ children }: { children: ReactNode }) => {
  const [kickedOutElements, setKickedOutElements] = useState<Set<string>>(new Set());
  const [shakeText, setShakeText] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

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

  return (
    <BotMischiefContext.Provider
      value={{
        kickedOutElements,
        shakeText,
        showFireworks,
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

