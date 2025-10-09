import React from 'react';
import { ZapIcon } from '../constants';

interface XpToastProps {
    amount: number;
}

const XpToast: React.FC<XpToastProps> = ({ amount }) => {
    return (
        <div className="fixed bottom-24 lg:bottom-10 right-1/2 translate-x-1/2 lg:right-10 lg:translate-x-0 z-50 bg-[#4ECDC4] text-white py-2 px-5 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in-out">
            <ZapIcon className="w-5 h-5" />
            <span className="font-bold text-lg">+{amount} XP</span>
            <style>{`
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0; transform: translateY(20px); }
                    10%, 90% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-out {
                    animation: fadeInOut 3s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
};

export default XpToast;
