import React, { useState, useEffect, useCallback } from 'react';
import { Theme, Language, Article, User, LeaderboardUser, DailyProgress, UserStats, Achievement } from './types';
import { TRANSLATIONS, ALL_ACHIEVEMENTS, TOPICS } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ArticleReader from './components/ArticleReader';
import Profile from './components/Profile';
import AdminPage from './components/AdminPage';
import XpToast from './components/XpToast';
import AchievementToast from './components/AchievementToast';

type Page = 'dashboard' | 'profile' | 'admin';

const getToday = () => new Date().toISOString().split('T')[0];

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [language, setLanguage] = useState<Language>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [progressLog, setProgressLog] = useState<DailyProgress[]>([]);
  const [xpToast, setXpToast] = useState<{ amount: number; key: number } | null>(null);
  const [achievementToast, setAchievementToast] = useState<{ achievement: Achievement; key: number } | null>(null);

  const showAchievementToast = useCallback((achievement: Achievement) => {
      setAchievementToast({ achievement, key: Date.now() });
      setTimeout(() => setAchievementToast(null), 4000);
  }, []);

  const handleUserUpdate = useCallback((updatedData: Partial<User>) => {
      if (!currentUser) return;
      const updatedUser = { ...currentUser, ...updatedData };
      setCurrentUser(updatedUser);
      localStorage.setItem('insight_quest_currentUser', JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem('insight_quest_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.accountId === updatedUser.accountId);
      if (userIndex > -1) {
          users[userIndex] = { ...users[userIndex], ...updatedUser };
          localStorage.setItem('insight_quest_users', JSON.stringify(users));
      }
  }, [currentUser]);

  const checkAndAwardAchievements = useCallback((user: User, stats: UserStats, currentLeaderboard: LeaderboardUser[]) => {
      if (!user || !stats) return;

      const newlyUnlocked: string[] = [];

      ALL_ACHIEVEMENTS.forEach(achievement => {
          if (user.unlockedAchievements.includes(achievement.id)) return;

          let unlocked = false;
          const userRank = currentLeaderboard.find(u => u.accountId === user.accountId)?.rank;

          switch (achievement.id) {
              // Daily Streak
              case 'firstRead': unlocked = stats.totalArticlesRead >= 1; break;
              case 'dailyHabit': unlocked = stats.consecutiveCheckInDays >= 3; break;
              case 'perfectWeek': unlocked = stats.consecutiveCheckInDays >= 7; break;
              case 'twoWeekWarrior': unlocked = stats.consecutiveCheckInDays >= 14; break;
              case 'monthlyReader': unlocked = stats.consecutiveCheckInDays >= 30; break;
              case 'hundredDaysOfWisdom': unlocked = stats.consecutiveCheckInDays >= 100; break;
              case 'yearlongFlame': unlocked = stats.consecutiveCheckInDays >= 365; break;
              case 'sunriseScholar': unlocked = stats.readTimestamps.some(ts => { const h = new Date(ts).getHours(); return h >= 5 && h < 10; }); break;
              case 'nightOwl': unlocked = stats.readTimestamps.some(ts => { const h = new Date(ts).getHours(); return h >= 21 || h < 2; }); break;
              case 'weekendDevourer': unlocked = stats.weekendReads >= 10; break;
              // Topic-Based
              case 'scienceSeeker': unlocked = (stats.articlesReadByTopic['science'] ?? 0) >= 10; break;
              case 'historyHunter': unlocked = (stats.articlesReadByTopic['history'] ?? 0) >= 10; break;
              case 'artAficionado': unlocked = (stats.articlesReadByTopic['art'] ?? 0) >= 10; break;
              case 'philosophyThinker': unlocked = (stats.articlesReadByTopic['philosophy'] ?? 0) >= 10; break;
              case 'musicMaestro': unlocked = (stats.articlesReadByTopic['music'] ?? 0) >= 10; break;
              case 'economicExplorer': unlocked = (stats.articlesReadByTopic['economics'] ?? 0) >= 10; break;
              // Knowledge Milestones
              case 'tenArticlesRead': unlocked = stats.totalArticlesRead >= 10; break;
              case 'fiftyArticlesRead': unlocked = stats.totalArticlesRead >= 50; break;
              case 'hundredArticlesRead': unlocked = stats.totalArticlesRead >= 100; break;
              case 'fiveHundredArticlesRead': unlocked = stats.totalArticlesRead >= 500; break;
              case 'thousandArticlesRead': unlocked = stats.totalArticlesRead >= 1000; break;
              case 'firstDeepDive': unlocked = stats.deepDives > 0; break;
              case 'topicMastery': unlocked = TOPICS.every(topic => (stats.articlesReadByTopic[topic.nameKey] ?? 0) >= 1); break;
              case 'crossTopicReader': unlocked = TOPICS.every(topic => (stats.articlesReadByTopic[topic.nameKey] ?? 0) >= 5); break;
              case 'curiosityChampion': unlocked = TOPICS.every(topic => (stats.articlesReadByTopic[topic.nameKey] ?? 0) >= 10); break;
              case 'knowledgeArchitect': unlocked = TOPICS.every(topic => (stats.articlesReadByTopic[topic.nameKey] ?? 0) >= 50); break;
              // Leaderboard & Social
              case 'topCompetitor': unlocked = userRank === 1; break;
              case 'weeklyWinner': unlocked = stats.daysAtRankOne >= 7; break;
              case 'monthlyMaster': unlocked = stats.daysAtRankOne >= 30; break;
              case 'risingStar': unlocked = stats.daysAtRankOne >= 90; break;
          }

          if (unlocked) {
              newlyUnlocked.push(achievement.id);
              showAchievementToast(achievement);
          }
      });

      if (newlyUnlocked.length > 0) {
          handleUserUpdate({ unlockedAchievements: [...user.unlockedAchievements, ...newlyUnlocked] });
      }
  }, [handleUserUpdate, showAchievementToast]);
  
  const updateStats = useCallback((newStats: Partial<UserStats>) => {
      if (!currentUser) return;
      setUserStats(prevStats => {
          const updatedStats = { ...prevStats!, ...newStats };
          localStorage.setItem(`insight_quest_stats_${currentUser.accountId}`, JSON.stringify(updatedStats));
          return updatedStats;
      });
  }, [currentUser]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'zh' : 'en'));
  const t = useCallback((key: string) => TRANSLATIONS[key]?.[language] || key, [language]);
  
  const loadDataForUser = useCallback((user: User) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem('insight_quest_users') || '[]');
    const currentLeaderboard = allUsers
        .map(u => ({ accountId: u.accountId, name: u.name, xp: u.xp, avatar: u.avatar, rank: 0 }))
        .sort((a, b) => b.xp - a.xp)
        .map((u, index) => ({ ...u, rank: index + 1 }));
    setLeaderboard(currentLeaderboard);

    const storedProgress = localStorage.getItem(`insight_quest_progress_${user.accountId}`);
    setProgressLog(storedProgress ? JSON.parse(storedProgress) : []);

    const storedStats = localStorage.getItem(`insight_quest_stats_${user.accountId}`);
    if (storedStats) {
        setUserStats(JSON.parse(storedStats));
    } else {
        setUserStats({
            consecutiveCheckInDays: 0, lastCheckInDate: '', totalArticlesRead: 0,
            articlesReadByTopic: {}, readTimestamps: [], readArticleUrls: [], weekendReads: 0,
            deepDives: 0, daysAtRankOne: 0, lastDateAtRankOne: ''
        });
    }
  }, []);

  useEffect(() => {
    const storedUserJson = localStorage.getItem('insight_quest_currentUser');
    if (storedUserJson) {
        const user: User = JSON.parse(storedUserJson);
        setCurrentUser(user);
        setIsLoggedIn(true);
        loadDataForUser(user);
    }
  }, [loadDataForUser]);
  
  // Effect to check for achievements when user data changes
  useEffect(() => {
      if (currentUser && userStats && leaderboard.length > 0) {
          checkAndAwardAchievements(currentUser, userStats, leaderboard);
      }
  }, [currentUser, userStats, leaderboard, checkAndAwardAchievements]);


  const handleLogin = (user: User) => {
    localStorage.setItem('insight_quest_currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setIsLoggedIn(true);
    loadDataForUser(user);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('insight_quest_currentUser');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
    setLeaderboard([]);
    setProgressLog([]);
    setUserStats(null);
  };

  const updateProgressLog = useCallback((xp: number, time: number) => {
    if (!currentUser) return;
    const today = getToday();
    setProgressLog(currentLog => {
        const newLog = [...currentLog];
        const todayEntryIndex = newLog.findIndex(entry => entry.date === today);
        if (todayEntryIndex > -1) {
            newLog[todayEntryIndex].xp += xp;
            newLog[todayEntryIndex].time += time;
        } else {
            newLog.push({ date: today, xp, time });
        }
        localStorage.setItem(`insight_quest_progress_${currentUser.accountId}`, JSON.stringify(newLog));
        return newLog;
    });
  }, [currentUser]);

  const handleXpEarned = useCallback((amount: number, source?: string) => {
      if (!currentUser || !userStats) return;
      
      const updatedXp = currentUser.xp + amount;
      handleUserUpdate({ xp: updatedXp });
      updateProgressLog(amount, 0);

      if (source === 'daily-check-in') {
          const today = getToday();
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          let newStreak = 1;
          if (userStats.lastCheckInDate === yesterdayStr) {
              newStreak = userStats.consecutiveCheckInDays + 1;
          }
          updateStats({ consecutiveCheckInDays: newStreak, lastCheckInDate: today });
      }

      // Re-calculate leaderboard from the source of truth (all users list)
      // which was just updated by handleUserUpdate
      const allUsers: User[] = JSON.parse(localStorage.getItem('insight_quest_users') || '[]');
      
      const newLeaderboard = allUsers
        .map(u => ({ accountId: u.accountId, name: u.name, xp: u.xp, avatar: u.avatar, rank: 0 }))
        .sort((a, b) => b.xp - a.xp)
        .map((u, index) => ({ ...u, rank: index + 1 }));

      setLeaderboard(newLeaderboard);

      const userRank = newLeaderboard.find(u => u.accountId === currentUser.accountId)?.rank;
      if (userRank === 1) {
          const today = getToday();
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          let newDaysAtRankOne = userStats.daysAtRankOne;
          if(userStats.lastDateAtRankOne === yesterdayStr) {
              newDaysAtRankOne++;
          } else if (userStats.lastDateAtRankOne !== today) {
              newDaysAtRankOne = 1;
          }
          updateStats({ daysAtRankOne: newDaysAtRankOne, lastDateAtRankOne: today });
      }

      setXpToast({ amount, key: Date.now() });
      setTimeout(() => setXpToast(null), 3000);
  }, [currentUser, userStats, updateProgressLog, handleUserUpdate, updateStats]);
  
  const handleLogReadingTime = useCallback((minutes: number) => {
      updateProgressLog(0, minutes);
  }, [updateProgressLog]);

  const handleArticleRead = useCallback((article: Article, deepDive: boolean) => {
    if (!userStats) return;
    
    // This function is now only called for new reads from ArticleReader
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
    
    const newStats: Partial<UserStats> = {
        totalArticlesRead: userStats.totalArticlesRead + 1,
        articlesReadByTopic: {
            ...userStats.articlesReadByTopic,
            [article.category.toLowerCase()]: (userStats.articlesReadByTopic[article.category.toLowerCase()] || 0) + 1,
        },
        readTimestamps: [...userStats.readTimestamps, Date.now()],
        readArticleUrls: [...(userStats.readArticleUrls || []), article.sourceUrl],
    };

    if (deepDive) {
        newStats.deepDives = (userStats.deepDives || 0) + 1;
    }
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        newStats.weekendReads = (userStats.weekendReads || 0) + 1;
    }
    updateStats(newStats);
  }, [userStats, updateStats]);

  const handleSelectArticle = useCallback((article: Article) => {
    setSelectedArticle(article);
  }, []);

  const handleCloseArticle = useCallback(() => {
    setSelectedArticle(null);
  }, []);

  if (!isLoggedIn || !currentUser) {
    return <Login onLogin={handleLogin} t={t} />;
  }

  const renderPage = () => {
    switch (currentPage) {
        case 'dashboard':
            return <Dashboard t={t} theme={theme} onSelectArticle={handleSelectArticle} leaderboard={leaderboard} onXpEarned={handleXpEarned} progressLog={progressLog} language={language} user={currentUser} />;
        case 'profile':
            return <Profile t={t} user={currentUser} onUserUpdate={handleUserUpdate} onLogout={handleLogout} onNavigate={setCurrentPage} />;
        case 'admin':
            return currentUser.is_admin ? <AdminPage t={t} onNavigate={setCurrentPage} /> : <Dashboard t={t} theme={theme} onSelectArticle={handleSelectArticle} leaderboard={leaderboard} onXpEarned={handleXpEarned} progressLog={progressLog} language={language} user={currentUser} />;
        default:
            return <Dashboard t={t} theme={theme} onSelectArticle={handleSelectArticle} leaderboard={leaderboard} onXpEarned={handleXpEarned} progressLog={progressLog} language={language} user={currentUser} />;
    }
  };

  return (
    <div className={`min-h-screen font-sans bg-gray-50 dark:bg-[#1A1A1A] text-[#2C2C2C] dark:text-white transition-colors duration-300`}>
      <div className="flex flex-col h-screen">
        <Header t={t} theme={theme} toggleTheme={toggleTheme} language={language} toggleLanguage={toggleLanguage} user={currentUser} onNavigate={setCurrentPage} onLogout={handleLogout} />
        <main className="flex-grow overflow-y-auto pb-24 lg:pb-8">{renderPage()}</main>
        <BottomNav t={t} currentPage={currentPage} onNavigate={setCurrentPage} user={currentUser} />
      </div>
      {selectedArticle && (
        <ArticleReader 
            article={selectedArticle} 
            onClose={handleCloseArticle} 
            onXpEarned={handleXpEarned} 
            onLogReadingTime={handleLogReadingTime} 
            onArticleRead={handleArticleRead} 
            isRead={userStats?.readArticleUrls?.includes(selectedArticle.sourceUrl) ?? false}
        />
      )}
      {xpToast && <XpToast key={xpToast.key} amount={xpToast.amount} />}
      {achievementToast && <AchievementToast key={achievementToast.key} achievement={achievementToast.achievement} t={t} />}
    </div>
  );
}

export default App;