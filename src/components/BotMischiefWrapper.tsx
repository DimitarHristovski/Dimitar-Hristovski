import { useEffect } from 'react';
import { useBotMischief } from './contexts/BotMischiefContext';

interface BotMischiefWrapperProps {
  children: React.ReactNode;
  elementId: string;
  elementType: 'card' | 'paragraph' | 'image' | 'stat-card' | 'project-card' | 'skill-card' | 'cert-card';
}

export const BotMischiefWrapper = ({ children, elementId, elementType }: BotMischiefWrapperProps) => {
  const { kickedOutElements, tokenUsage } = useBotMischief();
  const isKickedOut = kickedOutElements.has(elementId);
  const isHidden = tokenUsage >= 100000; // Hide when token usage reaches 100k

  useEffect(() => {
    // Set data attributes for bot targeting
    const element = document.querySelector(`[data-bot-id="${elementId}"]`);
    if (element) {
      element.setAttribute('data-bot-target', elementType);
    }
  }, [elementId, elementType]);

  // Hide the wrapper if token usage >= 100k
  if (isHidden) {
    return null;
  }

  return (
    <div
      data-bot-id={elementId}
      data-bot-target={elementType}
      className={isKickedOut ? 'bot-kicked-out' : ''}
      style={
        isKickedOut
          ? {
              '--kick-x': `${Math.random() > 0.5 ? -2000 : 2000}px`,
              '--kick-y': `${Math.random() > 0.5 ? -2000 : 2000}px`,
            } as React.CSSProperties
          : {}
      }
    >
      {children}
    </div>
  );
};

