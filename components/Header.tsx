import React from 'react';
import { Theme, Language, User } from '../types';
import { SunIcon, MoonIcon, ShieldIcon } from '../constants';

type Page = 'dashboard' | 'profile' | 'admin';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  user: User | null;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, language, toggleLanguage, t, user, onNavigate, onLogout }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-sm border-b border-[#C1C1C1] dark:border-[#4A4A4A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold font-poppins text-[#4ECDC4]">{t('appName')}</h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleLanguage}
              className="font-semibold text-sm w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition-colors"
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition-colors"
            >
              {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
             {user?.is_admin && (
                <button
                    onClick={() => onNavigate('admin')}
                    title={t('adminPanel')}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition-colors"
                    >
                    <ShieldIcon className="w-5 h-5" />
                </button>
             )}
             <button
              onClick={onLogout}
              className="hidden sm:flex font-semibold text-sm px-4 py-2 items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2A2A2A] transition-colors"
            >
              {t('logout')}
            </button>
            <button onClick={() => onNavigate('profile')} className="relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1A1A1A] focus:ring-[#4ECDC4] rounded-full">
              <img
                src={user?.avatar ?? "https://i.pravatar.cc/40?u=user"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-[#4ECDC4]"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;