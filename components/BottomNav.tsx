import React from 'react';
import { HomeIcon, BookOpenIcon, UserCircleIcon, ShieldIcon } from '../constants';
import { User } from '../types';

type Page = 'dashboard' | 'profile' | 'admin';

interface BottomNavProps {
  t: (key: string) => string;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: User | null;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick: () => void; }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${active ? 'text-[#4ECDC4]' : 'text-gray-500 dark:text-gray-400 hover:text-[#4ECDC4] dark:hover:text-[#4ECDC4]'}`}>
    {icon}
    <span className="text-xs font-medium mt-1">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ t, currentPage, onNavigate, user }) => {

  const handleHomeClick = () => {
    onNavigate('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFeedClick = () => {
    onNavigate('dashboard');
    // Give react time to switch to dashboard page if not already on it
    setTimeout(() => {
        document.getElementById('news-feed-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navItems = [
      { id: 'home', icon: <HomeIcon className="w-6 h-6" />, label: t('home'), page: 'dashboard', onClick: handleHomeClick, adminOnly: false },
      { id: 'feed', icon: <BookOpenIcon className="w-6 h-6" />, label: t('feed'), page: 'dashboard', onClick: handleFeedClick, adminOnly: false },
      user?.is_admin && { id: 'admin', icon: <ShieldIcon className="w-6 h-6" />, label: t('admin'), page: 'admin', onClick: () => onNavigate('admin'), adminOnly: true },
      { id: 'profile', icon: <UserCircleIcon className="w-6 h-6" />, label: t('profile'), page: 'profile', onClick: () => onNavigate('profile'), adminOnly: false },
  ].filter(Boolean);


  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-sm border-t border-[#C1C1C1] dark:border-[#4A4A4A] lg:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => (
            <div key={item.id} className="w-1/4 h-full pt-2 pb-1">
                <NavItem icon={item.icon} label={item.label} active={currentPage === item.page && item.id !== 'feed'} onClick={item.onClick} />
            </div>
        ))}
      </div>
    </footer>
  );
};

export default BottomNav;