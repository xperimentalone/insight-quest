import React from 'react';
import { Achievement } from '../types';

interface AchievementToastProps {
    achievement: Achievement;
    t: (key: string) => string;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, t }) => {
    const Icon = achievement.icon;
    return (
        <div className="fixed bottom-24 lg:bottom-10 right-1/2 translate-x-1/2 lg:right-10 lg:translate-x-0 z-50 bg-white dark:bg-[#2A2A2A] text-[#2C2C2C] dark:text-white py-3 px-5 rounded-lg shadow-lg flex items-center space-x-3 animate-achievement-toast border border-[#4ECDC4]">
            <div className="animate-icon">
                <Icon className="w-8 h-8 text-[#4ECDC4]" />
            </div>
            <div>
                <p className="font-semibold text-sm">{t('achievementUnlocked')}</p>
                <p className="font-bold text-lg">{t(achievement.nameKey)}</p>
            </div>
            <style>{`
                @keyframes achievementToast-in {
                    0% {
                        opacity: 0;
                        transform: translateY(30px) scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes achievementToast-out {
                    0% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                }
                @keyframes icon-pop {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.3) rotate(-10deg); }
                    100% { transform: scale(1) rotate(0deg); }
                }

                .animate-achievement-toast {
                    animation: achievementToast-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
                               achievementToast-out 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) 3.5s forwards;
                }

                .animate-icon {
                    animation: icon-pop 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
                }
            `}</style>
        </div>
    );
};

export default AchievementToast;
