import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  credits: number;
  donations: number;
}

interface RewardsContextType {
  impactCredits: number;
  addCredits: (amount: number) => void;
  badges: Badge[];
  awardBadge: (badge: Badge) => void;
  leaderboard: LeaderboardEntry[];
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: '1', userName: 'Sarah Johnson', credits: 2500, donations: 45 },
  { rank: 2, userId: '2', userName: 'Michael Chen', credits: 2200, donations: 38 },
  { rank: 3, userId: '3', userName: 'Emma Williams', credits: 1950, donations: 32 },
  { rank: 4, userId: '4', userName: 'David Brown', credits: 1800, donations: 29 },
  { rank: 5, userId: '5', userName: 'Lisa Anderson', credits: 1650, donations: 27 },
];

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [impactCredits, setImpactCredits] = useState(150);
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'badge-1',
      name: 'First Donation',
      description: 'Made your first donation',
      icon: '🎁',
      earnedAt: Date.now() - 86400000,
    },
  ]);
  const [leaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);

  const addCredits = (amount: number) => {
    setImpactCredits((prev) => prev + amount);
  };

  const awardBadge = (badge: Badge) => {
    setBadges((prev) => [...prev, badge]);
  };

  return (
    <RewardsContext.Provider value={{ impactCredits, addCredits, badges, awardBadge, leaderboard }}>
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within RewardsProvider');
  }
  return context;
}
