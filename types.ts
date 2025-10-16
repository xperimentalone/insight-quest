// FIX: Import `React` to resolve namespace error for `React.ComponentType`.
import React from 'react';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'zh';

export interface Translation {
  [key: string]: {
    [lang in Language]: string;
  };
}

export interface Article {
  id: number;
  category: string;
  title: string;
  summary: string;
  sourceUrl: string;
  readingTime?: number; // Make readingTime optional as it's not from the API
}

export interface Achievement {
  id: string; // Using nameKey as ID
  nameKey: string;
  descriptionKey: string;
  category: 'Daily Streak' | 'Topic-Based' | 'Knowledge Milestones' | 'Leaderboard & Social';
  icon: React.ComponentType<{ className?: string }>;
}


export interface LeaderboardUser {
  accountId: string;
  rank: number;
  name: string;
  xp: number;
  avatar: string;
}

export interface User {
  name: string;
  accountId: string;
  avatar: string;
  is_admin: boolean;
  xp: number;
  unlockedAchievements: string[]; // Array of achievement IDs
}

export interface UserStats {
    consecutiveCheckInDays: number;
    lastCheckInDate: string; // YYYY-MM-DD
    totalArticlesRead: number;
    articlesReadByTopic: { [topic: string]: number };
    readTimestamps: number[]; // Store timestamps of article reads
    readArticleUrls: string[]; // Store source URLs of read articles
    weekendReads: number;
    deepDives: number;
    daysAtRankOne: number;
    lastDateAtRankOne: string; // YYYY-MM-DD
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface DailyProgress {
    date: string; // YYYY-MM-DD
    xp: number;
    time: number; // in minutes
}