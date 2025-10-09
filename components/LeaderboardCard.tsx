
import React, { useState, useEffect } from 'react';
import { User, LeaderboardUser } from '../types';

interface LeaderboardCardProps {
    t: (key: string) => string;
    leaderboardData: LeaderboardUser[];
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ t, leaderboardData }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('insight_quest_currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const processedLeaderboardData = leaderboardData.map(user => {
        // The App component already builds the leaderboard from all users,
        // so we don't need to substitute 'You' anymore.
        // We just need to identify the current user for highlighting.
        return user;
    });

    return (
        <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm p-4 sm:p-6 h-full">
            <h2 className="font-poppins text-lg font-semibold mb-4 text-[#2C2C2C] dark:text-white">{t('leaderboard')}</h2>
            <ul className="space-y-3">
                {processedLeaderboardData.map(user => (
                    <li key={user.accountId} className={`flex items-center p-2 rounded-lg ${user.accountId === currentUser?.accountId ? 'bg-[#87FFDC]/20 dark:bg-[#87FFDC]/10' : ''}`}>
                        <span className="font-bold text-lg w-8 text-center text-gray-500 dark:text-gray-400">{user.rank}</span>
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mx-3" />
                        <span className="font-semibold flex-1">{user.name}</span>
                        <span className="font-bold text-sm text-[#4ECDC4]">{user.xp} XP</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaderboardCard;
