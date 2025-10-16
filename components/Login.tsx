import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
    onLogin: (user: User) => void;
    t: (key: string) => string;
}

const Login: React.FC<LoginProps> = ({ onLogin, t }) => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [name, setName] = useState('');
    const [accountId, setAccountId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const clearForm = () => {
        setName('');
        setAccountId('');
        setPassword('');
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (mode === 'register') {
            // Registration logic
            const users = JSON.parse(localStorage.getItem('insight_quest_users') || '[]');
            const existingUser = users.find((user: any) => user.accountId === accountId);

            if (existingUser) {
                setError('User with this Account ID already exists.');
                return;
            }

            const isAdmin = users.length === 0;

            const newUser = { 
                name, 
                accountId, 
                password, 
                avatar: `https://i.pravatar.cc/150?u=${accountId}`,
                is_admin: isAdmin,
                xp: 100,
                unlockedAchievements: []
            };
            const updatedUsers = [...users, newUser];
            localStorage.setItem('insight_quest_users', JSON.stringify(updatedUsers));
            
            setSuccess(`Registration successful! ${isAdmin ? 'You are the first user and have been made an Admin.' : 'Please log in.'}`);
            setMode('login');
            clearForm();
        } else {
            // Login logic
            const users = JSON.parse(localStorage.getItem('insight_quest_users') || '[]');
            const user = users.find((u: any) => u.accountId === accountId && u.password === password);

            if (user) {
                const { password, ...currentUserData } = user;
                onLogin(currentUserData);
            } else {
                setError('Invalid credentials. Have you registered?');
            }
        }
    };

    const toggleMode = () => {
        setMode(prev => prev === 'login' ? 'register' : 'login');
        setError('');
        setSuccess('');
        clearForm();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#1A1A1A] px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-poppins text-[#4ECDC4]">{t('appName')}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {mode === 'login' ? 'Continue your quest for knowledge.' : 'Join the quest for knowledge.'}
                    </p>
                </div>
                <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm p-8">
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        {mode === 'register' && (
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[#2C2C2C] dark:text-white">{t('name')}</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1A1A] border border-[#C1C1C1] dark:border-[#4A4A4A] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4ECDC4] focus:border-[#4ECDC4] sm:text-sm text-[#2C2C2C] dark:text-white"
                                    placeholder="Your Name"
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="accountId" className="block text-sm font-medium text-[#2C2C2C] dark:text-white">{t('accountId')}</label>
                            <input
                                id="accountId"
                                name="accountId"
                                type="text"
                                autoComplete="username"
                                required
                                value={accountId}
                                onChange={(e) => setAccountId(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1A1A] border border-[#C1C1C1] dark:border-[#4A4A4A] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4ECDC4] focus:border-[#4ECDC4] sm:text-sm text-[#2C2C2C] dark:text-white"
                                placeholder="your-account-id"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#2C2C2C] dark:text-white">{t('password')}</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1A1A] border border-[#C1C1C1] dark:border-[#4A4A4A] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4ECDC4] focus:border-[#4ECDC4] sm:text-sm text-[#2C2C2C] dark:text-white"
                                placeholder="******"
                            />
                        </div>

                        {error && <p className="text-sm text-[#FF6B6B] text-center">{error}</p>}
                        {success && <p className="text-sm text-green-500 text-center">{success}</p>}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4ECDC4] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#87FFDC]"
                            >
                                {mode === 'login' ? t('login') : t('createAccount')}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6">
                        <button onClick={toggleMode} className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#4ECDC4]">
                             {mode === 'login' ? t('noAccount') : t('haveAccount')}
                             <span className="font-semibold text-[#4ECDC4]"> {mode === 'login' ? t('register') : t('login')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;