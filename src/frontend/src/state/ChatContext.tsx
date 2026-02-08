import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useSession } from './SessionContext';

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
  isOwn: boolean;
}

export interface ChatThread {
  id: string;
  participantName: string;
  participantId: string;
  lastMessage: string;
  lastMessageTime: number;
  unread: number;
  messages: ChatMessage[];
}

interface ChatContextType {
  threads: ChatThread[];
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  sendMessage: (threadId: string, content: string) => void;
  markAsRead: (threadId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

function generateSeededThreads(role: string): ChatThread[] {
  const baseTime = Date.now();
  
  // Normalize role to lowercase for comparison
  const normalizedRole = role.toLowerCase();
  
  if (normalizedRole === 'user') {
    return [
      {
        id: 'thread-1',
        participantName: 'KindKart Support',
        participantId: 'support',
        lastMessage: 'How can I help you today?',
        lastMessageTime: baseTime - 3600000,
        unread: 1,
        messages: [
          {
            id: 'msg-1',
            senderId: 'support',
            content: 'Hello! Welcome to KindKart. How can I help you today?',
            timestamp: baseTime - 3600000,
            isOwn: false,
          },
        ],
      },
      {
        id: 'thread-2',
        participantName: 'Seller: Rajesh Kumar',
        participantId: 'seller-1',
        lastMessage: 'The item is still available!',
        lastMessageTime: baseTime - 7200000,
        unread: 0,
        messages: [
          {
            id: 'msg-2',
            senderId: 'user',
            content: 'Is the rice bag still available?',
            timestamp: baseTime - 7300000,
            isOwn: true,
          },
          {
            id: 'msg-3',
            senderId: 'seller-1',
            content: 'Yes, the item is still available! Would you like to purchase it?',
            timestamp: baseTime - 7200000,
            isOwn: false,
          },
        ],
      },
    ];
  } else if (normalizedRole === 'ngo') {
    return [
      {
        id: 'thread-1',
        participantName: 'Donor: Priya Sharma',
        participantId: 'donor-1',
        lastMessage: 'I would like to donate blankets',
        lastMessageTime: baseTime - 1800000,
        unread: 1,
        messages: [
          {
            id: 'msg-1',
            senderId: 'donor-1',
            content: 'Hello, I would like to donate blankets to your organization.',
            timestamp: baseTime - 1800000,
            isOwn: false,
          },
        ],
      },
      {
        id: 'thread-2',
        participantName: 'KindKart Verification Team',
        participantId: 'verification',
        lastMessage: 'Your documents have been approved',
        lastMessageTime: baseTime - 86400000,
        unread: 0,
        messages: [
          {
            id: 'msg-2',
            senderId: 'verification',
            content: 'Congratulations! Your NGO verification documents have been approved.',
            timestamp: baseTime - 86400000,
            isOwn: false,
          },
        ],
      },
    ];
  } else if (normalizedRole === 'deliverypartner') {
    return [
      {
        id: 'thread-1',
        participantName: 'Customer: Amit Patel',
        participantId: 'customer-1',
        lastMessage: 'When will you arrive?',
        lastMessageTime: baseTime - 900000,
        unread: 1,
        messages: [
          {
            id: 'msg-1',
            senderId: 'customer-1',
            content: 'Hello, when will you arrive for the pickup?',
            timestamp: baseTime - 900000,
            isOwn: false,
          },
        ],
      },
      {
        id: 'thread-2',
        participantName: 'KindKart Dispatch',
        participantId: 'dispatch',
        lastMessage: 'New delivery assigned to you',
        lastMessageTime: baseTime - 3600000,
        unread: 0,
        messages: [
          {
            id: 'msg-2',
            senderId: 'dispatch',
            content: 'You have been assigned a new delivery. Please check your dashboard.',
            timestamp: baseTime - 3600000,
            isOwn: false,
          },
        ],
      },
    ];
  } else if (normalizedRole === 'admin') {
    return [
      {
        id: 'thread-1',
        participantName: 'User Report: Suspicious Listing',
        participantId: 'report-1',
        lastMessage: 'This listing seems fake',
        lastMessageTime: baseTime - 1800000,
        unread: 2,
        messages: [
          {
            id: 'msg-1',
            senderId: 'user-reporter',
            content: 'I want to report a suspicious listing. The photos look fake.',
            timestamp: baseTime - 1800000,
            isOwn: false,
          },
        ],
      },
      {
        id: 'thread-2',
        participantName: 'NGO: Hope Foundation',
        participantId: 'ngo-1',
        lastMessage: 'Thank you for the verification',
        lastMessageTime: baseTime - 86400000,
        unread: 0,
        messages: [
          {
            id: 'msg-2',
            senderId: 'ngo-1',
            content: 'Thank you for verifying our organization!',
            timestamp: baseTime - 86400000,
            isOwn: false,
          },
        ],
      },
    ];
  }
  
  return [];
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const { role } = useSession();
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  // Seed threads based on role when role changes
  useEffect(() => {
    if (role) {
      const seededThreads = generateSeededThreads(role);
      setThreads(seededThreads);
    } else {
      setThreads([]);
    }
  }, [role]);

  const sendMessage = (threadId: string, content: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      content,
      timestamp: Date.now(),
      isOwn: true,
    };

    setThreads((prev) => {
      // If no threads exist, create a new one
      if (prev.length === 0) {
        const newThread: ChatThread = {
          id: threadId || 'thread-new',
          participantName: 'New Conversation',
          participantId: 'new-participant',
          lastMessage: content,
          lastMessageTime: newMessage.timestamp,
          unread: 0,
          messages: [newMessage],
        };
        return [newThread];
      }

      return prev.map((thread) => {
        if (thread.id === threadId) {
          const updatedMessages = [...thread.messages, newMessage];
          
          // Simulate a reply after 2 seconds
          setTimeout(() => {
            const replyMessage: ChatMessage = {
              id: `msg-${Date.now()}-reply`,
              senderId: thread.participantId,
              content: 'Thank you for your message. I will get back to you shortly.',
              timestamp: Date.now(),
              isOwn: false,
            };
            
            setThreads((current) =>
              current.map((t) =>
                t.id === threadId
                  ? {
                      ...t,
                      messages: [...t.messages, replyMessage],
                      lastMessage: replyMessage.content,
                      lastMessageTime: replyMessage.timestamp,
                      unread: t.unread + 1,
                    }
                  : t
              )
            );
          }, 2000);

          return {
            ...thread,
            messages: updatedMessages,
            lastMessage: content,
            lastMessageTime: newMessage.timestamp,
          };
        }
        return thread;
      });
    });
  };

  const markAsRead = (threadId: string) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId ? { ...thread, unread: 0 } : thread
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        threads,
        activeThreadId,
        setActiveThreadId,
        sendMessage,
        markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
