import React from 'react';
import AnalyticsCard from './AnalyticsCard';
import NewsFeedCard from './NewsFeedCard';
import LeaderboardCard from './LeaderboardCard';
import AchievementsCard from './AchievementsCard';
import MysteryTopicCard from './MysteryTopicCard';
import DailyInsightCard from './DailyInsightCard';
import { Theme, Article, LeaderboardUser, DailyProgress, Language, User } from '../types';

interface DashboardProps {
    t: (key: string) => string;
    theme: Theme;
    onSelectArticle: (article: Article) => void;
    leaderboard: LeaderboardUser[];
    onXpEarned: (amount: number, source?: string) => void;
    progressLog: DailyProgress[];
    language: Language;
    user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ t, theme, onSelectArticle, leaderboard, onXpEarned, progressLog, language, user }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* 1. Weekly Progress */}
        <div className="lg:col-span-6">
          <AnalyticsCard t={t} theme={theme} progressLog={progressLog} language={language} />
        </div>

        {/* 2. Achievements */}
        <div className="lg:col-span-2">
            <AchievementsCard t={t} user={user} />
        </div>

        {/* 3. Daily Insight */}
        <div className="lg:col-span-2">
            <DailyInsightCard t={t} onXpEarned={onXpEarned} />
        </div>
        
        {/* 4. Mystery Topic */}
        <div className="lg:col-span-2">
            <MysteryTopicCard t={t} onXpEarned={onXpEarned} />
        </div>
        
        {/* 5. Leaderboard */}
        <div className="lg:col-span-3">
            <LeaderboardCard t={t} leaderboardData={leaderboard} />
        </div>
        
        {/* 6. NewsFeed */}
        <div className="lg:col-span-3" id="news-feed-section">
            <NewsFeedCard t={t} onSelectArticle={onSelectArticle} language={language} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;