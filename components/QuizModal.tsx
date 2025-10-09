import React, { useState, useEffect } from 'react';
import { Article, QuizQuestion } from '../types';

interface QuizModalProps {
    t: (key: string) => string;
    quizData: { article: Article; quiz: QuizQuestion };
    onClose: () => void;
    onXpEarned: (amount: number) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ t, quizData, onClose, onXpEarned }) => {
    const { article, quiz } = quizData;
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const isCorrect = selectedOption === quiz.correctAnswerIndex;

    const handleSubmit = () => {
        if (selectedOption === null) return;
        setSubmitted(true);
    };

    useEffect(() => {
        if (submitted) {
            const xpGained = isCorrect ? 25 : 3;
            onXpEarned(xpGained);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitted]);


    const getOptionClasses = (index: number) => {
        if (!submitted) {
            return `border-gray-300 dark:border-gray-600 ${selectedOption === index ? 'bg-[#4ECDC4]/20 border-[#4ECDC4]' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`
        }
        if (index === quiz.correctAnswerIndex) {
            return 'border-green-500 bg-green-500/20';
        }
        if (index === selectedOption && index !== quiz.correctAnswerIndex) {
            return 'border-red-500 bg-red-500/20';
        }
        return 'border-gray-300 dark:border-gray-600 opacity-60';
    };

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 sm:p-8">
                    {/* Article Content */}
                    <div className="mb-4">
                        <span className="text-xs font-semibold text-white bg-[#4ECDC4] px-2 py-0.5 rounded-full">{article.category}</span>
                    </div>
                    <h1 className="font-poppins text-2xl sm:text-3xl font-bold text-[#2C2C2C] dark:text-white mb-4">
                        {article.title}
                    </h1>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line border-b dark:border-gray-700 pb-6 mb-6">
                        {article.summary}
                    </p>

                    {/* Quiz Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">{quiz.question}</h2>
                        <div className="space-y-3">
                            {quiz.options.map((option, index) => (
                                <button
                                    key={index}
                                    disabled={submitted}
                                    onClick={() => setSelectedOption(index)}
                                    className={`w-full text-left p-4 border-2 rounded-lg transition-all ${getOptionClasses(index)}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feedback and Actions */}
                    <div className="mt-6 text-center">
                        {submitted ? (
                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    <h3 className={`text-2xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                        {isCorrect ? t('correctAnswer') : t('wrongAnswer')}
                                    </h3>
                                    <p className="font-semibold text-gray-600 dark:text-gray-300">
                                        {t('xpAwarded')}: <span className="text-[#4ECDC4]">{isCorrect ? '25 XP' : '3 XP'}</span>
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4ECDC4] hover:bg-opacity-90"
                                >
                                    {t('close')}
                                </button>
                            </div>
                        ) : (
                             <button
                                onClick={handleSubmit}
                                disabled={selectedOption === null}
                                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4ECDC4] hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t('submit')}
                            </button>
                        )}
                    </div>
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

export default QuizModal;