import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ChatbotMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: number;
}

interface ChatbotContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: ChatbotMessage[];
  sendMessage: (content: string) => void;
  isTyping: boolean;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([
    {
      id: '1',
      content: 'Hi! I\'m your KindKart assistant. How can I help you today?',
      isBot: true,
      timestamp: Date.now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (content: string) => {
    const userMessage: ChatbotMessage = {
      id: `msg-${Date.now()}`,
      content,
      isBot: false,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      const botMessage: ChatbotMessage = {
        id: `msg-${Date.now()}-bot`,
        content: botResponse,
        isBot: true,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <ChatbotContext.Provider value={{ isOpen, setIsOpen, messages, sendMessage, isTyping }}>
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within ChatbotProvider');
  }
  return context;
}

function generateBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('price') || lowerMessage.includes('pricing')) {
    return 'Our AI pricing system analyzes your product\'s condition, age, and market trends to suggest the optimal price range. Simply upload your product images and details, and we\'ll provide a recommended price!';
  }

  if (lowerMessage.includes('sell') || lowerMessage.includes('list')) {
    return 'To sell a product, click on "Sell Product" in the navigation. Upload images, and our AI will detect the category and suggest a price range. You can then set your price within that range!';
  }

  if (lowerMessage.includes('donate') || lowerMessage.includes('ngo')) {
    return 'You can donate to NGOs in two ways: 1) Browse the NGO Need Board to see what items NGOs need, or 2) Purchase a product from the marketplace and donate it directly to an NGO. All donations earn you impact credits!';
  }

  if (lowerMessage.includes('track') || lowerMessage.includes('delivery')) {
    return 'You can track your deliveries from the "Track Delivery" section. You\'ll see real-time updates on pickup, transit, and delivery status. An OTP will be required for final delivery confirmation.';
  }

  if (lowerMessage.includes('credit') || lowerMessage.includes('reward')) {
    return 'Impact credits are earned through donations and helping the community. You can view your credits in your dashboard and see how you rank on the leaderboard. Keep making an impact!';
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return 'I\'m here to help! You can ask me about selling products, donating to NGOs, tracking deliveries, or understanding our AI pricing system. What would you like to know?';
  }

  return 'Thanks for your message! I can help you with selling products, donating to NGOs, tracking deliveries, understanding our AI pricing, and more. What would you like to know?';
}
