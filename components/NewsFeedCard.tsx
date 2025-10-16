import React, { useState, useEffect, useCallback } from 'react';
import { Article, Language } from '../types';
import { GoogleGenAI } from "@google/genai";

interface NewsFeedCardProps {
    t: (key: string) => string;
    onSelectArticle: (article: Article) => void;
    language: Language;
}

const CACHE_KEY_PREFIX = 'insight_quest_news_cache_';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

const NewsFeedCard: React.FC<NewsFeedCardProps> = ({ t, onSelectArticle, language }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true); // For initial load
    const [fetchingMore, setFetchingMore] = useState(false); // For subsequent loads
    const [error, setError] = useState<string | null>(null);

    const fetchNews = useCallback(async (isRefresh: boolean) => {
        const cacheKey = `${CACHE_KEY_PREFIX}${language}`;

        if (isRefresh) {
            setLoading(true);
            const cachedData = localStorage.getItem(cacheKey);
            if (cachedData) {
                try {
                    const { timestamp, articles: cachedArticles } = JSON.parse(cachedData);
                    if (Date.now() - timestamp < CACHE_DURATION && cachedArticles.length > 0) {
                        setArticles(cachedArticles);
                        setLoading(false);
                        setError(null);
                        return; // Use fresh cached data
                    }
                } catch (e) {
                    console.error("Error reading from cache", e);
                    localStorage.removeItem(cacheKey);
                }
            }
        } else {
            setFetchingMore(true);
        }
        
        setError(null);
        try {
            // FIX: Use process.env.API_KEY to align with Gemini API guidelines.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const prompt = language === 'zh'
                ? `以繁體中文，使用 Google 搜尋尋找 5 篇來自香港主要、信譽良好的新聞機構，關於不同類別的最新新聞文章。對於每篇文章，請提供其可公開存取的直接網址，然後*僅根據該特定網址的內容*撰寫一篇 100-150 字的摘要。同時也請提供標題和類別。確保該網址不是付費專區內容。將整個回應格式化為單一 JSON 陣列，其中每個物件都有 "title"、"summary"、"category" 和 "sourceUrl" 的鍵。JSON 陣列前後不要包含任何文字。`
                : `Using Google Search, find 5 recent news articles from Hong Kong from various categories from major, reputable news outlets. For each article, provide its direct, publicly accessible URL, and then create a 100-150 word summary based *only* on the content found at that specific URL. Also provide the title and category. Ensure the URL is not behind a paywall. Format the entire response as a single JSON array where each object has "title", "summary", "category", and "sourceUrl" keys. Do not include any text before or after the JSON array.`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                 config: {
                    tools: [{googleSearch: {}}],
                },
            });
            
            let articlesData = [];
            try {
                const responseText = response.text.trim();
                const jsonMatch = responseText.match(/```(json)?\s*([\s\S]*?)\s*```/);
                let jsonString;

                if (jsonMatch && jsonMatch[2]) {
                    jsonString = jsonMatch[2];
                } else {
                    const startIndex = responseText.indexOf('[');
                    const endIndex = responseText.lastIndexOf(']');
                    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                        jsonString = responseText.substring(startIndex, endIndex + 1);
                    } else {
                        console.error("Invalid JSON response format from Gemini:", responseText);
                        throw new Error("No valid JSON array found in the model's response.");
                    }
                }
                articlesData = JSON.parse(jsonString);
            } catch (parseError) {
                 console.error("Error parsing news JSON:", parseError, "Raw response:", response.text);
                 throw new Error("Failed to parse news data.");
            }

            const newArticlesWithIds: Article[] = articlesData.map((article: any, index: number) => ({ 
                ...article, 
                id: Date.now() + index 
            }));
            
            if (isRefresh) {
                setArticles(newArticlesWithIds);
                const cachePayload = { timestamp: Date.now(), articles: newArticlesWithIds };
                localStorage.setItem(cacheKey, JSON.stringify(cachePayload));
            } else {
                 setArticles(prevArticles => {
                    const allArticles = [...prevArticles, ...newArticlesWithIds];
                    const cachePayload = { timestamp: Date.now(), articles: allArticles };
                    localStorage.setItem(cacheKey, JSON.stringify(cachePayload));
                    return allArticles;
                });
            }

        } catch (err: any) {
            console.error("Error fetching news:", err);
            const errString = err.toString();
            const isRateLimitError = errString.includes('429') || errString.includes('RESOURCE_EXHAUSTED');
            let userMessage = "Failed to fetch news. Please try again later.";
            
            if (isRateLimitError) {
                userMessage = "News service is temporarily unavailable due to high demand. Showing older articles if available.";
            }

            if (isRefresh) {
                const cachedData = localStorage.getItem(cacheKey);
                if (cachedData) {
                    try {
                        const { articles: cachedArticles } = JSON.parse(cachedData);
                        if (cachedArticles.length > 0) {
                            setArticles(cachedArticles);
                            setError(userMessage); // Inform user that data is stale
                            return; // exit from catch block
                        }
                    } catch (e) { console.error("Error reading stale cache", e); }
                }
                
                // If no cache, use hardcoded fallback
                setError(userMessage);
                setArticles([
                    {id: 1, category: 'Tech', title: 'Hong Kong pushes to be a global hub for Web3', summary: 'Hong Kong is making a significant push to establish itself as a leading global hub for Web3 and virtual assets. The government has introduced new licensing regimes for virtual asset trading platforms and is actively encouraging innovation in the space. This strategic move aims to attract talent and capital, positioning the city at the forefront of the next wave of internet technology.', sourceUrl: 'https://www.reuters.com/technology/hong-kongs-new-crypto-rules-explained-2023-05-31/'},
                    {id: 2, category: 'Culture', title: 'M+ Museum becomes a new cultural landmark in Hong Kong', summary: 'The M+ museum in the West Kowloon Cultural District has quickly become a new landmark for arts and culture in Hong Kong. As Asia\'s first global museum of contemporary visual culture, it showcases a vast collection of 20th and 21st-century art, design, architecture, and moving images from Hong Kong, mainland China, and across the world. Its striking architecture and diverse exhibitions have drawn significant international attention.', sourceUrl: 'https://www.mplus.org.hk/en/'},
                ]);
            } else {
                setError(isRateLimitError ? "Could not load more articles due to high demand." : "Could not load more articles.");
            }
        } finally {
            if (isRefresh) setLoading(false);
            else setFetchingMore(false);
        }
    }, [language]);

    useEffect(() => {
        fetchNews(true); // `true` indicates a refresh
    }, [language, fetchNews]); 

    const handleLoadMore = () => {
        if (!fetchingMore) {
            fetchNews(false); // `false` indicates loading more, not refreshing
        }
    };

    const renderSkeleton = () => (
        <div className="flex items-start space-x-4 animate-pulse">
            <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm p-4 sm:p-6 h-full flex flex-col">
            <h2 className="font-poppins text-lg font-semibold mb-4 text-[#2C2C2C] dark:text-white">{t('newsFeed')}</h2>
            <div className="space-y-6 flex-grow">
                {loading ? (
                    <>
                        {Array.from({ length: 3 }).map((_, i) => <div key={i}>{renderSkeleton()}</div>)}
                    </>
                ) : articles.length > 0 ? (
                    articles.map(article => (
                        <div key={article.id} className="group cursor-pointer" onClick={() => onSelectArticle(article)}>
                            <div className="flex items-start space-x-4">
                                <div className="flex-1">
                                    <span className="text-xs font-semibold text-white bg-[#4ECDC4] px-2 py-0.5 rounded-full">{article.category}</span>
                                    <h3 className="font-semibold mt-2 text-base group-hover:text-[#4ECDC4] transition-colors">{article.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">{article.summary}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : null }

                {error && <p className="text-center text-red-500 py-4">{error}</p>}
                
                {fetchingMore && (
                     <>
                        {Array.from({ length: 3 }).map((_, i) => <div key={i}>{renderSkeleton()}</div>)}
                    </>
                )}
            </div>
            {!loading && (
                <div className="flex justify-center mt-6 pt-4 border-t border-gray-200 dark:border-[#4A4A4A]">
                    <button 
                        onClick={handleLoadMore} 
                        disabled={fetchingMore}
                        className="px-6 py-2 text-sm font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 dark:bg-[#4A4A4A] hover:bg-gray-200 dark:hover:bg-opacity-80 transition-colors"
                    >
                        {fetchingMore ? 'Loading...' : 'More'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default NewsFeedCard;