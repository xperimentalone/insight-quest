import React, { useState, useRef } from 'react';
import { User } from '../types';
import { ChevronLeftIcon } from '../constants';

interface ProfileProps {
    t: (key: string) => string;
    user: User;
    onUserUpdate: (updatedData: Partial<User>) => void;
    onLogout: () => void;
    onNavigate: (page: 'dashboard' | 'profile') => void;
}

const Profile: React.FC<ProfileProps> = ({ t, user, onUserUpdate, onLogout, onNavigate }) => {
    const [previewAvatar, setPreviewAvatar] = useState(user.avatar);
    const [newAvatarFile, setNewAvatarFile] = useState<string | null>(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreviewAvatar(base64String);
                setNewAvatarFile(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (newAvatarFile) {
            onUserUpdate({ avatar: newAvatarFile });
            setSuccess(t('avatarUpdated'));
            setNewAvatarFile(null);
            setTimeout(() => setSuccess(''), 3000);
        }
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const users = JSON.parse(localStorage.getItem('insight_quest_users') || '[]');
        const userRecord = users.find((u: any) => u.accountId === user.accountId);

        if (!userRecord || userRecord.password !== currentPassword) {
            setError('Current password is not correct.');
            return;
        }

        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters long.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        userRecord.password = newPassword;
        localStorage.setItem('insight_quest_users', JSON.stringify(users));
        
        setSuccess(t('passwordUpdated'));
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setSuccess(''), 3000);
    };

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
                <h1 className="font-poppins text-2xl font-bold text-center w-full text-[#2C2C2C] dark:text-white">{t('profileSettings')}</h1>
            </div>
            <div className="max-w-2xl mx-auto space-y-8">
                {/* User Info & Avatar */}
                <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm p-6 flex flex-col items-center">
                    <img src={previewAvatar} alt="User Avatar" className="w-24 h-24 rounded-full mb-4 border-4 border-[#4ECDC4]" />
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{user.accountId}</p>
                </div>
                
                {/* Change Avatar Form */}
                <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm p-6">
                    <h3 className="font-poppins text-lg font-semibold mb-4 text-[#2C2C2C] dark:text-white">{t('changePicture')}</h3>
                    <form onSubmit={handleAvatarUpdate} className="space-y-4">
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                ref={fileInputRef}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-[#4A4A4A] rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#1A1A1A]"
                            >
                                {t('uploadPicture')}
                            </button>
                        </div>
                        {newAvatarFile && (
                            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4ECDC4] hover:bg-opacity-90">{t('save')}</button>
                        )}
                    </form>
                </div>

                {/* Change Password Form */}
                <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm p-6">
                    <h3 className="font-poppins text-lg font-semibold mb-4 text-[#2C2C2C] dark:text-white">{t('changePassword')}</h3>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div>
                            <label htmlFor="currentPassword">{t('currentPassword')}</label>
                            <input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1A1A] border border-[#C1C1C1] dark:border-[#4A4A4A] rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="newPassword">{t('newPassword')}</label>
                            <input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1A1A] border border-[#C1C1C1] dark:border-[#4A4A4A] rounded-md shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">{t('confirmNewPassword')}</label>
                            <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1A1A] border border-[#C1C1C1] dark:border-[#4A4A4A] rounded-md shadow-sm" />
                        </div>
                         {error && <p className="text-sm text-[#FF6B6B]">{error}</p>}
                         {success && success !== t('avatarUpdated') && <p className="text-sm text-green-500">{success}</p>}
                        <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4ECDC4] hover:bg-opacity-90">{t('save')}</button>
                    </form>
                </div>
                 {success === t('avatarUpdated') && <p className="text-sm text-green-500 text-center">{success}</p>}
                {/* Logout Button */}
                <div className="text-center">
                    <button onClick={onLogout} className="w-full max-w-xs py-2 px-4 border border-[#FF6B6B] rounded-md shadow-sm text-sm font-medium text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B6B]">
                        {t('logout')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
