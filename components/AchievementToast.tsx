import React from 'react';
import { Achievement } from '../types';

interface AchievementToastProps {
    achievement: Achievement;
    t: (key: string) => string;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, t }) => {
    const Icon = achievement.icon;
    return (
        <div className="fixed bottom-24 lg:bottom-10 right-1/2 translate-x-1/2 lg:right-10 lg:translate-x-0 z-50 bg-white dark:bg-[#2A2A2A] text-[#2C2C2C] dark:text-white py-3 px-5 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in-out border border-[#4ECDC4]">
            <Icon className="w-8 h-8 text-[#4ECDC4]" />
            <div>
                <p className="font-semibold text-sm">{t('achievementUnlocked')}</p>
                <p className="font-bold text-lg">{t(achievement.nameKey)}</p>
            </div>
            <style>{`
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: translateY(20px); }
                    10%, 90% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-out {
                    animation: fadeInOut 4s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AchievementToast;