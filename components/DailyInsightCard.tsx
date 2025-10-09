
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface DailyInsightCardProps {
    t: (key: string) => string;
    onXpEarned: (amount: number, source?: string) => void;
}

const DailyInsightCard: React.FC<DailyInsightCardProps> = ({ t, onXpEarned }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [lastCheckIn, setLastCheckIn] = useState<number | null>(null);
    const [canCheckIn, setCanCheckIn] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });

    useEffect(() => {
        const storedUser = localStorage.getItem('insight_quest_currentUser');
        if (storedUser) {
            const user = JSON.parse(storedUser) as User;
            setCurrentUser(user);
            const storedLastCheckIn = localStorage.getItem(`insight_quest_last_checkin_${user.accountId}`);
            if (storedLastCheckIn) {
                setLastCheckIn(parseInt(storedLastCheckIn, 10));
            } else {
                setCanCheckIn(true); // First time user can check in immediately
            }
        }
    }, []);
    
    useEffect(() => {
        const twentyFourHours = 24 * 60 * 60 * 1000;

        const checkEligibility = () => {
            if (lastCheckIn === null) {
                setCanCheckIn(true);
                return;
            }

            const timeSinceCheckIn = Date.now() - lastCheckIn;
            
            if (timeSinceCheckIn >= twentyFourHours) {
                setCanCheckIn(true);
                setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
            } else {
                setCanCheckIn(false);
                const remainingTime = twentyFourHours - timeSinceCheckIn;
                setTimeLeft({
                    hours: String(Math.floor((remainingTime / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
                    minutes: String(Math.floor((remainingTime / 1000 / 60) % 60)).padStart(2, '0'),
                    seconds: String(Math.floor((remainingTime / 1000) % 60)).padStart(2, '0'),
                });
            }
        };

        checkEligibility();
        const interval = setInterval(checkEligibility, 1000);
        return () => clearInterval(interval);

    }, [lastCheckIn]);

    const handleCheckIn = () => {
        if (!currentUser || !canCheckIn) return;
        onXpEarned(10, 'daily-check-in');
        const now = Date.now();
        localStorage.setItem(`insight_quest_last_checkin_${currentUser.accountId}`, now.toString());
        setLastCheckIn(now);
        setCanCheckIn(false);
    };

    return (
        <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm p-4 sm:p-6 h-full flex flex-col items-center justify-center text-center">
            <div className={`w-16 h-16 flex items-center justify-center rounded-full ${canCheckIn ? 'bg-[#4ECDC4]' : 'bg-[#87FFDC]'} mb-4 transition-colors`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/><path d="m16 16-4-4-4 4"/></svg>
            </div>
            <h2 className="font-poppins text-lg font-semibold text-[#2C2C2C] dark:text-white">{t('dailyInsight')}</h2>
            
            {canCheckIn ? (
                 <>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ready for your daily XP boost?</p>
                    <button 
                        onClick={handleCheckIn} 
                        className="mt-4 bg-[#4ECDC4] text-white font-bold py-2 px-8 rounded-full hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#2A2A2A] focus:ring-[#87FFDC]"
                    >
                        Check In (+10 XP)
                    </button>
                </>
            ) : (
                <>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('unlocksIn')}</p>
                    <div className="flex space-x-2 mt-4 text-2xl font-bold font-mono text-[#4ECDC4]">
                        <span>{timeLeft.hours}</span>
                        <span>:</span>
                        <span>{timeLeft.minutes}</span>
                        <span>:</span>
                        <span>{timeLeft.seconds}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default DailyInsightCard;