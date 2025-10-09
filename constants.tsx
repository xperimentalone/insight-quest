import React from 'react';
import { Achievement, Translation } from './types';

// SVG Icon Components
export const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
export const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
);
export const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
export const UserCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
);
export const FlameIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
);
export const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
export const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
);
export const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
);
export const BookmarkIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
);
export const TrophyIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
);
export const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
export const TargetIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
export const ClockIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
export const ChevronLeftIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);
export const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

// Mystery Topic Icons
export const ScienceIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2.5a2.5 2.5 0 0 0-3 0l-6 11a2.5 2.5 0 0 0 2 3.5h11a2.5 2.5 0 0 0 2-3.5l-6-11Z"/><path d="M8.5 2.5a2.5 2.5 0 0 1 3 0l6 11a2.5 2.5 0 0 1-2 3.5h-11a2.5 2.5 0 0 1-2-3.5l6-11Z"/></svg>;
export const HistoryIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16"/><path d="M8 22V6.13a2.4 2.4 0 0 1 .55-1.5L11 2h2l2.45 2.63a2.4 2.4 0 0 1 .55 1.5V22"/><path d="M15 6H9"/></svg>;
export const ArtIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>;
export const PhilosophyIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Z"/><path d="M5 10a7 7 0 1 0 14 0"/><path d="M5.5 10c0-1.87.5-3.5 1.3-4.9"/><path d="M17.2 5.1c.8 1.4 1.3 3.03 1.3 4.9"/></svg>;
export const MusicIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
export const EconomicsIcon = ({ className }: { className?: string }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>;

// Translation Data
export const TRANSLATIONS: Translation = {
    appName: { en: 'Insight Quest', zh: '洞察任務' },
    home: { en: 'Home', zh: '主頁' },
    feed: { en: 'Feed', zh: '推播' },
    profile: { en: 'Profile', zh: '個人資料' },
    admin: { en: 'Admin', zh: '管理' },
    adminPanel: { en: 'Admin Panel', zh: '管理面板' },
    dailyGoal: { en: 'Daily Goal', zh: '每日目標' },
    weeklyProgress: { en: 'Weekly Progress', zh: '每周進度' },
    readingTime: { en: 'Reading Time', zh: '閱讀時間' },
    xpGained: { en: 'XP Gained', zh: '獲得經驗' },
    newsFeed: { en: 'News Feed', zh: '新聞推播' },
    minRead: { en: 'min read', zh: '分鐘閱讀' },
    leaderboard: { en: 'Leaderboard', zh: '排行榜' },
    achievements: { en: 'Achievements', zh: '成就' },
    unlocked: { en: 'Unlocked', zh: '已解鎖' },
    locked: { en: 'Locked', zh: '未解鎖' },
    achievementUnlocked: { en: 'Achievement Unlocked!', zh: '成就已解鎖！'},
    mysteryTopic: { en: 'Mystery Topic', zh: '神秘話題' },
    spinTheWheel: { en: 'Spin the Wheel', zh: '轉動輪盤' },
    spinning: { en: 'Spinning...', zh: '轉動中' },
    dailyInsight: { en: 'Daily Insight', zh: '每日洞見' },
    unlocksIn: { en: 'Unlocks In', zh: '解鎖倒數' },
    login: { en: 'Login', zh: '登入' },
    register: { en: 'Register', zh: '註冊' },
    name: { en: 'Name', zh: '姓名' },
    accountId: { en: 'Account ID', zh: '帳號' },
    email: { en: 'Email', zh: '電子郵件' },
    password: { en: 'Password', zh: '密碼' },
    createAccount: { en: 'Create Account', zh: '建立帳戶' },
    haveAccount: { en: 'Already have an account?', zh: '已經有帳戶了？' },
    noAccount: { en: 'Don\'t have an account?', zh: '還沒有帳戶？' },
    logout: { en: 'Logout', zh: '登出' },
    profileSettings: { en: 'Profile Settings', zh: '個人設定' },
    changePicture: { en: 'Change Picture', zh: '更換頭像' },
    uploadPicture: { en: 'Upload a picture', zh: '上傳圖片' },
    save: { en: 'Save', zh: '儲存' },
    changePassword: { en: 'Change Password', zh: '更改密碼' },
    currentPassword: { en: 'Current Password', zh: '目前密碼' },
    newPassword: { en: 'New Password', zh: '新密碼' },
    confirmNewPassword: { en: 'Confirm New Password', zh: '確認新密碼' },
    passwordUpdated: { en: 'Password updated successfully!', zh: '密碼更新成功！' },
    avatarUpdated: { en: 'Avatar updated successfully!', zh: '頭像更新成功！' },
    back: { en: 'Back', zh: '返回' },

    // Quiz
    startQuiz: { en: 'Start Quiz (+25 XP)', zh: '開始測驗 (+25 XP)' },
    generatingQuiz: { en: 'Generating Quiz...', zh: '正在生成測驗...' },
    submit: { en: 'Submit', zh: '提交' },
    correctAnswer: { en: 'Correct!', zh: '答對了！' },
    wrongAnswer: { en: 'Incorrect.', zh: '答錯了。' },
    xpAwarded: { en: 'XP Awarded', zh: '獲得經驗值' },
    close: { en: 'Close', zh: '關閉' },

    // Topic Names
    science: { en: 'Science', zh: '科學' },
    history: { en: 'History', zh: '歷史' },
    art: { en: 'Art', zh: '藝術' },
    philosophy: { en: 'Philosophy', zh: '哲學' },
    music: { en: 'Music', zh: '音樂' },
    economics: { en: 'Economics', zh: '經濟學' },

    // Achievement Names
    firstRead: { en: 'First Read', zh: '初次閱讀' },
    dailyHabit: { en: 'Daily Habit', zh: '每日習慣' },
    perfectWeek: { en: 'Perfect Week', zh: '完美一週' },
    twoWeekWarrior: { en: 'Two-Week Warrior', zh: '連續兩週勇士' },
    monthlyReader: { en: 'Monthly Reader', zh: '月度閱讀者' },
    hundredDaysOfWisdom: { en: '100 Days of Wisdom', zh: '百日智慧' },
    yearlongFlame: { en: 'Yearlong Flame', zh: '一年之火' },
    sunriseScholar: { en: 'Sunrise Scholar', zh: '晨讀學者' },
    nightOwl: { en: 'Night Owl', zh: '夜貓子' },
    weekendDevourer: { en: 'Weekend Devourer', zh: '週末閱讀狂' },
    scienceSeeker: { en: 'Science Seeker', zh: '科學探索者' },
    historyHunter: { en: 'History Hunter', zh: '歷史獵人' },
    artAficionado: { en: 'Art Aficionado', zh: '藝術愛好者' },
    philosophyThinker: { en: 'Philosophy Thinker', zh: '哲學思考者' },
    musicMaestro: { en: 'Music Maestro', zh: '音樂大師' },
    economicExplorer: { en: 'Economic Explorer', zh: '經濟探險家' },
    tenArticlesRead: { en: '10 Articles Read', zh: '閱讀十篇文章' },
    fiftyArticlesRead: { en: '50 Articles Read', zh: '閱讀五十篇文章' },
    hundredArticlesRead: { en: '100 Articles Read', zh: '閱讀一百篇文章' },
    fiveHundredArticlesRead: { en: '500 Articles Read', zh: '閱讀五百篇文章' },
    thousandArticlesRead: { en: '1000 Articles Read', zh: '閱讀一千篇文章' },
    firstDeepDive: { en: 'First Deep Dive', zh: '首次深入閱讀' },
    topicMastery: { en: 'Topic Mastery', zh: '主題精通者' },
    crossTopicReader: { en: 'Cross-Topic Reader', zh: '跨領域閱讀者' },
    curiosityChampion: { en: 'Curiosity Champion', zh: '好奇心冠軍' },
    knowledgeArchitect: { en: 'Knowledge Architect', zh: '知識建築師' },
    topCompetitor: { en: 'Top Competitor', zh: '頂尖競爭者' },
    weeklyWinner: { en: 'Weekly Winner', zh: '每週冠軍' },
    monthlyMaster: { en: 'Monthly Master', zh: '月度大師' },
    risingStar: { en: 'Rising Star', zh: '閃耀新星' },

    // Achievement Descriptions
    firstReadDesc: { en: 'Read your first article.', zh: '完成首次文章閱讀。' },
    dailyHabitDesc: { en: 'Check-in for 3 consecutive days.', zh: '連續3天簽到。' },
    perfectWeekDesc: { en: 'Check-in for 7 consecutive days.', zh: '連續7天簽到。' },
    twoWeekWarriorDesc: { en: 'Check-in for 14 consecutive days.', zh: '連續14天簽到。' },
    monthlyReaderDesc: { en: 'Check-in for 30 consecutive days.', zh: '連續30天簽到。' },
    hundredDaysOfWisdomDesc: { en: 'Check-in for 100 consecutive days.', zh: '連續100天簽到。' },
    yearlongFlameDesc: { en: 'Check-in for 365 consecutive days.', zh: '連續365天簽到。' },
    sunriseScholarDesc: { en: 'Read an article between 5 am and 10 am.', zh: '在早上5點到10點之間閱讀一篇文章。' },
    nightOwlDesc: { en: 'Read an article between 9 pm and 2 am.', zh: '在晚上9點到凌晨2點之間閱讀一篇文章。' },
    weekendDevourerDesc: { en: 'Read articles on 10 different weekends.', zh: '在10個不同的週末閱讀文章。' },
    scienceSeekerDesc: { en: 'Read 10 articles about Science.', zh: '閱讀10篇關於科學的文章。' },
    historyHunterDesc: { en: 'Read 10 articles about History.', zh: '閱讀10篇關於歷史的文章。' },
    artAficionadoDesc: { en: 'Read 10 articles about Art.', zh: '閱讀10篇關於藝術的文章。' },
    philosophyThinkerDesc: { en: 'Read 10 articles about Philosophy.', zh: '閱讀10篇關於哲學的文章。' },
    musicMaestroDesc: { en: 'Read 10 articles about Music.', zh: '閱讀10篇關於音樂的文章。' },
    economicExplorerDesc: { en: 'Read 10 articles about Economics.', zh: '閱讀10篇關於經濟學的文章。' },
    tenArticlesReadDesc: { en: 'Read a total of 10 articles.', zh: '總共閱讀10篇文章。' },
    fiftyArticlesReadDesc: { en: 'Read a total of 50 articles.', zh: '總共閱讀50篇文章。' },
    hundredArticlesReadDesc: { en: 'Read a total of 100 articles.', zh: '總共閱讀100篇文章。' },
    fiveHundredArticlesReadDesc: { en: 'Read a total of 500 articles.', zh: '總共閱讀500篇文章。' },
    thousandArticlesReadDesc: { en: 'Read a total of 1000 articles.', zh: '總共閱讀1000篇文章。' },
    firstDeepDiveDesc: { en: 'Click the link to read a full article.', zh: '點擊連結閱讀一篇完整的文章。' },
    topicMasteryDesc: { en: 'Read at least 1 article from each topic.', zh: '每個主題至少閱讀1篇文章。' },
    crossTopicReaderDesc: { en: 'Read at least 5 articles from each topic.', zh: '每個主題至少閱讀5篇文章。' },
    curiosityChampionDesc: { en: 'Read at least 10 articles from each topic.', zh: '每個主題至少閱讀10篇文章。' },
    knowledgeArchitectDesc: { en: 'Read at least 50 articles from each topic.', zh: '每個主題至少閱讀50篇文章。' },
    topCompetitorDesc: { en: 'Attain 1st place on the leaderboard.', zh: '在排行榜上獲得第一名。' },
    weeklyWinnerDesc: { en: 'Hold 1st place for a whole week.', zh: '連續一整週保持第一名。' },
    monthlyMasterDesc: { en: 'Hold 1st place for a whole month.', zh: '連續一整個月保持第一名。' },
    risingStarDesc: { en: 'Hold 1st place for three months.', zh: '連續三個月保持第一名。' },
};

export const TOPICS = [
    { nameKey: 'science', icon: ScienceIcon },
    { nameKey: 'history', icon: HistoryIcon },
    { nameKey: 'art', icon: ArtIcon },
    { nameKey: 'philosophy', icon: PhilosophyIcon },
    { nameKey: 'music', icon: MusicIcon },
    { nameKey: 'economics', icon: EconomicsIcon },
];

export const ALL_ACHIEVEMENTS: Achievement[] = [
    // Daily Streak
    { id: 'firstRead', nameKey: 'firstRead', descriptionKey: 'firstReadDesc', category: 'Daily Streak', icon: BookOpenIcon },
    { id: 'dailyHabit', nameKey: 'dailyHabit', descriptionKey: 'dailyHabitDesc', category: 'Daily Streak', icon: FlameIcon },
    { id: 'perfectWeek', nameKey: 'perfectWeek', descriptionKey: 'perfectWeekDesc', category: 'Daily Streak', icon: FlameIcon },
    { id: 'twoWeekWarrior', nameKey: 'twoWeekWarrior', descriptionKey: 'twoWeekWarriorDesc', category: 'Daily Streak', icon: FlameIcon },
    { id: 'monthlyReader', nameKey: 'monthlyReader', descriptionKey: 'monthlyReaderDesc', category: 'Daily Streak', icon: FlameIcon },
    { id: 'hundredDaysOfWisdom', nameKey: 'hundredDaysOfWisdom', descriptionKey: 'hundredDaysOfWisdomDesc', category: 'Daily Streak', icon: FlameIcon },
    { id: 'yearlongFlame', nameKey: 'yearlongFlame', descriptionKey: 'yearlongFlameDesc', category: 'Daily Streak', icon: FlameIcon },
    { id: 'sunriseScholar', nameKey: 'sunriseScholar', descriptionKey: 'sunriseScholarDesc', category: 'Daily Streak', icon: SunIcon },
    { id: 'nightOwl', nameKey: 'nightOwl', descriptionKey: 'nightOwlDesc', category: 'Daily Streak', icon: MoonIcon },
    { id: 'weekendDevourer', nameKey: 'weekendDevourer', descriptionKey: 'weekendDevourerDesc', category: 'Daily Streak', icon: StarIcon },
    // Topic-Based
    { id: 'scienceSeeker', nameKey: 'scienceSeeker', descriptionKey: 'scienceSeekerDesc', category: 'Topic-Based', icon: ScienceIcon },
    { id: 'historyHunter', nameKey: 'historyHunter', descriptionKey: 'historyHunterDesc', category: 'Topic-Based', icon: HistoryIcon },
    { id: 'artAficionado', nameKey: 'artAficionado', descriptionKey: 'artAficionadoDesc', category: 'Topic-Based', icon: ArtIcon },
    { id: 'philosophyThinker', nameKey: 'philosophyThinker', descriptionKey: 'philosophyThinkerDesc', category: 'Topic-Based', icon: PhilosophyIcon },
    { id: 'musicMaestro', nameKey: 'musicMaestro', descriptionKey: 'musicMaestroDesc', category: 'Topic-Based', icon: MusicIcon },
    { id: 'economicExplorer', nameKey: 'economicExplorer', descriptionKey: 'economicExplorerDesc', category: 'Topic-Based', icon: EconomicsIcon },
    // Knowledge Milestones
    { id: 'tenArticlesRead', nameKey: 'tenArticlesRead', descriptionKey: 'tenArticlesReadDesc', category: 'Knowledge Milestones', icon: BookOpenIcon },
    { id: 'fiftyArticlesRead', nameKey: 'fiftyArticlesRead', descriptionKey: 'fiftyArticlesReadDesc', category: 'Knowledge Milestones', icon: BookOpenIcon },
    { id: 'hundredArticlesRead', nameKey: 'hundredArticlesRead', descriptionKey: 'hundredArticlesReadDesc', category: 'Knowledge Milestones', icon: BookOpenIcon },
    { id: 'fiveHundredArticlesRead', nameKey: 'fiveHundredArticlesRead', descriptionKey: 'fiveHundredArticlesReadDesc', category: 'Knowledge Milestones', icon: BookOpenIcon },
    { id: 'thousandArticlesRead', nameKey: 'thousandArticlesRead', descriptionKey: 'thousandArticlesReadDesc', category: 'Knowledge Milestones', icon: BookOpenIcon },
    { id: 'firstDeepDive', nameKey: 'firstDeepDive', descriptionKey: 'firstDeepDiveDesc', category: 'Knowledge Milestones', icon: TargetIcon },
    { id: 'topicMastery', nameKey: 'topicMastery', descriptionKey: 'topicMasteryDesc', category: 'Knowledge Milestones', icon: ZapIcon },
    { id: 'crossTopicReader', nameKey: 'crossTopicReader', descriptionKey: 'crossTopicReaderDesc', category: 'Knowledge Milestones', icon: ZapIcon },
    { id: 'curiosityChampion', nameKey: 'curiosityChampion', descriptionKey: 'curiosityChampionDesc', category: 'Knowledge Milestones', icon: ZapIcon },
    { id: 'knowledgeArchitect', nameKey: 'knowledgeArchitect', descriptionKey: 'knowledgeArchitectDesc', category: 'Knowledge Milestones', icon: ZapIcon },
    // Leaderboard & Social
    { id: 'topCompetitor', nameKey: 'topCompetitor', descriptionKey: 'topCompetitorDesc', category: 'Leaderboard & Social', icon: TrophyIcon },
    { id: 'weeklyWinner', nameKey: 'weeklyWinner', descriptionKey: 'weeklyWinnerDesc', category: 'Leaderboard & Social', icon: TrophyIcon },
    { id: 'monthlyMaster', nameKey: 'monthlyMaster', descriptionKey: 'monthlyMasterDesc', category: 'Leaderboard & Social', icon: TrophyIcon },
    { id: 'risingStar', nameKey: 'risingStar', descriptionKey: 'risingStarDesc', category: 'Leaderboard & Social', icon: TrophyIcon },
];