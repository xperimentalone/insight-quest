import * as React from 'react';
import { TOPICS } from '../constants';
import { Article, QuizQuestion } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import QuizModal from './QuizModal';

interface MysteryTopicCardProps {
    t: (key: string) => string;
    onXpEarned: (amount: number) => void;
}

const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const MysteryTopicCard: React.FC<MysteryTopicCardProps> = ({ t, onXpEarned }) => {
    const [rotation, setRotation] = React.useState(0);
    const [spinning, setSpinning] = React.useState(false);
    const [resultTopic, setResultTopic] = React.useState<string | null>(null);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [quizData, setQuizData] = React.useState<{ article: Article; quiz: QuizQuestion } | null>(null);
    const [showQuizModal, setShowQuizModal] = React.useState(false);

    const generateArticleAndQuiz = async (topic: string) => {
        setIsGenerating(true);
        try {
            // FIX: Use process.env.API_KEY to align with Gemini API guidelines.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Step 1: Generate article content using Google Search
            const articleResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Using Google Search, find one recent and interesting news article or a fascinating fact from a reputable source related to the topic of ${t(topic)}. Provide the direct, publicly accessible URL for the article. Then, based *only* on the content at that specific URL, write a concise summary (around 100-150 words). Also provide the article's title. Format the entire response as a single JSON object with keys: "title", "summary", "category" (which should be "${t(topic)}"), and "sourceUrl". Ensure the URL is not behind a paywall. Do not include any text before or after the JSON object.`,
                config: {
                    tools: [{ googleSearch: {} }],
                },
            });

            const responseText = articleResponse.text.trim();
            const jsonMatch = responseText.match(/```(json)?\s*([\s\S]*?)\s*```/);
            let jsonString;

            if (jsonMatch && jsonMatch[2]) {
                jsonString = jsonMatch[2];
            } else {
                const startIndex = responseText.indexOf('{');
                const endIndex = responseText.lastIndexOf('}');
                if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                    jsonString = responseText.substring(startIndex, endIndex + 1);
                } else {
                    console.error("Invalid JSON object format from Gemini:", responseText);
                    throw new Error("No valid JSON object found in the model's response for the article.");
                }
            }
            const articleData = JSON.parse(jsonString);
            const generatedArticle: Article = { id: Date.now(), ...articleData };

            // Step 2: Generate quiz from the article summary
            const quizResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Based on this text: "${generatedArticle.summary}", create one multiple-choice question with exactly 4 options to test comprehension. Indicate the correct answer's index (0-3).`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING },
                            options: { type: Type.ARRAY, items: { type: Type.STRING } },
                            correctAnswerIndex: { type: Type.INTEGER }
                        },
                        required: ["question", "options", "correctAnswerIndex"]
                    }
                }
            });
            const generatedQuiz: QuizQuestion = JSON.parse(quizResponse.text);

            setQuizData({ article: generatedArticle, quiz: generatedQuiz });
            setShowQuizModal(true);

        } catch (err) {
            console.error("Error generating article and quiz:", err);
            // In a real app, show a user-facing error message
            setResultTopic(null); // Reset on error
        } finally {
            setIsGenerating(false);
        }
    };
    
    const spin = () => {
        if (spinning || isGenerating) return;
        
        setSpinning(true);
        setResultTopic(null);
        
        const newRotation = rotation + 360 * 5 + Math.floor(Math.random() * 360);
        setRotation(newRotation);

        setTimeout(() => {
            const finalRotation = newRotation % 360;
            // The pointer is at the top (0 degrees). The winning segment is the one
            // that was at the (-finalRotation) degree position before spinning.
            const pointerAngle = (360 - finalRotation + 360) % 360;
            
            const winnerIndex = Math.floor(pointerAngle / 60);
            const winner = TOPICS[winnerIndex];

            setResultTopic(winner.nameKey);
            setSpinning(false);
            generateArticleAndQuiz(winner.nameKey);
        }, 4000); // Corresponds to transition duration
    };
    
    const handleQuizClose = () => {
        setShowQuizModal(false);
        setQuizData(null);
        setResultTopic(null);
    };

    const renderButton = () => {
        const isLoading = spinning || isGenerating;
        let buttonText = t('spinTheWheel');
        if (spinning) {
            buttonText = t('spinning');
        } else if (isGenerating) {
            buttonText = t('generatingQuiz');
        }

        return (
            <button 
                onClick={spin} 
                disabled={isLoading} 
                className="bg-[#4ECDC4] text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[210px]"
            >
                {isGenerating && !spinning ? <LoadingSpinner /> : null}
                {buttonText}
            </button>
        );
    };

    const ResultIcon = React.useMemo(() => {
        if (!resultTopic) return null;
        const topicData = TOPICS.find(t => t.nameKey === resultTopic);
        return topicData ? topicData.icon : null;
    }, [resultTopic]);

    return (
        <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm p-4 sm:p-6 h-full flex flex-col items-center justify-between">
             {showQuizModal && quizData && (
                <QuizModal 
                    t={t} 
                    quizData={quizData} 
                    onClose={handleQuizClose} 
                    onXpEarned={onXpEarned}
                />
            )}
            <h2 className="font-poppins text-lg font-semibold text-center text-[#2C2C2C] dark:text-white">{t('mysteryTopic')}</h2>
            
            <div className="flex-grow w-full flex flex-col items-center justify-center my-4">
                {isGenerating && resultTopic && ResultIcon ? (
                     <div className="text-center animate-fade-in-fast p-4">
                        <ResultIcon className="w-24 h-24 text-[#4ECDC4] mx-auto animate-pop-in" />
                        <p className="font-semibold text-2xl text-[#4ECDC4] mt-4 animate-fade-in-delay">
                            {t(resultTopic)}
                        </p>
                    </div>
                ) : (
                    <div className="relative w-48 h-48">
                        <div 
                            className="absolute inset-0 rounded-full transition-transform duration-[4000ms] ease-out"
                            style={{ 
                                transform: `rotate(${rotation}deg)`,
                                background: `conic-gradient(
                                    from 0deg,
                                    #FF6B6B 0deg 60deg,
                                    #4ECDC4 60deg 120deg,
                                    #87FFDC 120deg 180deg,
                                    #feca57 180deg 240deg,
                                    #ff9ff3 240deg 300deg,
                                    #54a0ff 300deg 360deg
                                )`
                            }}
                        >
                            {TOPICS.map(({ icon: Icon }, i) => (
                                <div key={i} className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-left flex items-center justify-start pl-4" style={{ transform: `rotate(${i * 60}deg)` }}>
                                <div style={{ transform: `rotate(${30}deg)` }}>
                                        <Icon className="w-7 h-7 text-white" />
                                </div>
                                </div>
                            ))}
                        </div>
                        <div 
                            className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-0 h-0 text-gray-700 dark:text-white"
                            style={{
                                borderLeft: '10px solid transparent',
                                borderRight: '10px solid transparent',
                                borderTop: '15px solid currentColor',
                            }}
                        />
                    </div>
                )}
            </div>

            {renderButton()}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
                @keyframes pop-in {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-pop-in {
                    animation: pop-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
                }
                .animate-fade-in-fast { animation: fade-in 0.3s ease-out; }
                .animate-fade-in-delay { animation: fade-in 0.5s ease-out 0.3s both; }
            `}</style>
        </div>
    );
};

export default MysteryTopicCard;