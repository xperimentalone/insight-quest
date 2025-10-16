import React, { useEffect, useRef } from 'react';
import { Article } from '../types';

interface ArticleReaderProps {
    article: Article;
    onClose: () => void;
    onXpEarned: (amount: number) => void;
    onLogReadingTime: (minutes: number) => void;
    onArticleRead: (article: Article, deepDive: boolean) => void;
    isRead: boolean;
}

const ArticleReader: React.FC<ArticleReaderProps> = ({ article, onClose, onXpEarned, onLogReadingTime, onArticleRead, isRead }) => {
    const xpAwardedRef = useRef(isRead);
    const deepDiveRef = useRef(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (!isRead) {
            timer = setTimeout(() => {
                if (!xpAwardedRef.current) {
                    onXpEarned(3);
                    onLogReadingTime(3); // Assumes an average 3-minute read time
                    xpAwardedRef.current = true;
                }
            }, 15000); // 15 seconds
        }

        return () => {
            if(timer) clearTimeout(timer);
            // Report read stats when component unmounts only if it's a new read
            if (!isRead) {
                onArticleRead(article, deepDiveRef.current);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [article, isRead, onArticleRead, onXpEarned, onLogReadingTime]);

    const handleLinkClick = () => {
        if (!xpAwardedRef.current) {
            onXpEarned(5);
            onLogReadingTime(3);
            xpAwardedRef.current = true;
        }
        deepDiveRef.current = true;
    };

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label="Close article"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="mb-4">
                    <span className="text-xs font-semibold text-white bg-[#4ECDC4] px-2 py-0.5 rounded-full">{article.category}</span>
                </div>
                
                <h1 className="font-poppins text-2xl sm:text-3xl font-bold text-[#2C2C2C] dark:text-white mb-4">
                    {article.title}
                </h1>
                
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {article.summary}
                </p>

                <div className="mt-8 border-t border-[#C1C1C1] dark:border-[#4A4A4A] pt-4">
                    <a 
                        href={article.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={handleLinkClick}
                        className="text-sm text-[#4ECDC4] hover:underline"
                    >
                        Read the full article at source &rarr;
                    </a>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ArticleReader;