import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { ChevronLeftIcon } from '../constants';

interface AdminPageProps {
    t: (key: string) => string;
    onNavigate: (page: 'dashboard' | 'profile' | 'admin') => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ t, onNavigate }) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('insight_quest_users') || '[]');
        setUsers(storedUsers);
    }, []);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="relative mb-6 flex items-center">
                <button 
                    onClick={() => onNavigate('dashboard')} 
                    className="absolute left-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2A2A2A]"
                    aria-label={t('back')}
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="font-poppins text-2xl font-bold text-center w-full text-[#2C2C2C] dark:text-white">{t('adminPanel')}</h1>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm">
                    <ul className="divide-y divide-gray-200 dark:divide-[#4A4A4A]">
                        {users.map(user => (
                            <li key={user.accountId} className="p-4 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-[#2C2C2C] dark:text-white">{user.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.accountId}</p>
                                    </div>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${user.is_admin ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'}`}>
                                        {user.is_admin ? 'Admin' : 'User'}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
