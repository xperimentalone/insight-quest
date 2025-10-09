import React from 'react';
import { ALL_ACHIEVEMENTS } from '../constants';
import { User, Achievement } from '../types';

interface AchievementsCardProps {
    t: (key: string) => string;
    user: User;
}

const AchievementItem: React.FC<{ achievement: Achievement; t: (key: string) => string; }> = ({ achievement, t }) => {
    const Icon = achievement.icon;
    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-[#87FFDC]">
                <Icon className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs font-semibold mt-2 text-[#2C2C2C] dark:text-white">
                {t(achievement.nameKey)}
            </span>
        </div>
    );
};

const AchievementsCard: React.FC<AchievementsCardProps> = ({ t, user }) => {
    const unlockedAchievements = ALL_ACHIEVEMENTS.filter(ach => user.unlockedAchievements.includes(ach.id));
    
    return (
        <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm p-4 sm:p-6 h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-poppins text-lg font-semibold text-[#2C2C2C] dark:text-white">{t('achievements')}</h2>
                <span className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                    {unlockedAchievements.length} / {ALL_ACHIEVEMENTS.length} {t('unlocked')}
                </span>
            </div>
            {unlockedAchievements.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {unlockedAchievements.slice(0, 6).map(ach => (
                       <AchievementItem key={ach.id} achievement={ach} t={t} />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                    <p>Start reading and checking in daily to unlock achievements!</p>
                </div>
            )}
        </div>
    );
};

export default AchievementsCard;