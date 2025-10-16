import React, { useMemo } from 'react';
import { Theme, DailyProgress, Language } from '../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface AnalyticsCardProps {
    t: (key: string) => string;
    theme: Theme;
    progressLog: DailyProgress[];
    language: Language;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ t, theme, progressLog, language }) => {
  const [activeTab, setActiveTab] = React.useState<'xp' | 'time'>('xp');

  const chartData = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1, etc.
    const startOfWeek = new Date(today);
    // Adjust date to the Monday of the current week
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const weekData = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        const dateString = day.toISOString().split('T')[0]; // YYYY-MM-DD

        const progressForDay = progressLog.find(p => p.date === dateString) || { xp: 0, time: 0 };
        
        let dayLabel = '';
        if (language === 'zh') {
            const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            dayLabel = `${day.getMonth() + 1}月${day.getDate()}日 (${weekdays[day.getDay()]})`;
        } else {
            const shortWeekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(day);
            const shortMonth = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(day);
            dayLabel = `${day.getDate()} ${shortMonth} (${shortWeekday})`;
        }

        weekData.push({
            day: dayLabel,
            xp: progressForDay.xp,
            time: progressForDay.time,
        });
    }
    return weekData;
  }, [progressLog, language]);

  const tickColor = theme === 'dark' ? '#A0A0A0' : '#6B7280';

  const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
          return (
              <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm p-2 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm">
                  <p className="font-semibold">{label}</p>
                  {payload[0].dataKey === 'xp' && <p className="text-[#4ECDC4]">{`${t('xpGained')}: ${payload[0].value}`}</p>}
                  {payload[0].dataKey === 'time' && <p className="text-[#87FFDC]">{`${t('readingTime')}: ${payload[0].value}m`}</p>}
              </div>
          );
      }
      return null;
  };
  
  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const { value } = payload;
    const parts = value.split(' (');
    const date = parts[0];
    const weekday = parts.length > 1 ? `(${parts[1]}` : '';

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="middle" fill={tickColor} fontSize={11}>
                <tspan x="0" dy="0">{date}</tspan>
                <tspan x="0" dy="1.3em">{weekday}</tspan>
            </text>
        </g>
    );
  };

  return (
    <div className="bg-white dark:bg-[#2A2A2A] rounded-lg shadow-sm p-4 sm:p-6 h-full">
      <div className="mb-4">
        <h2 className="font-poppins text-lg font-semibold text-[#2C2C2C] dark:text-white mb-4">{t('weeklyProgress')}</h2>
        <div className="flex">
          <div className="flex space-x-2 border border-[#C1C1C1] dark:border-[#4A4A4A] rounded-full p-1">
            <button onClick={() => setActiveTab('xp')} className={`px-4 py-1 text-sm font-semibold rounded-full ${activeTab === 'xp' ? 'bg-[#4ECDC4] text-white' : 'hover:bg-gray-100 dark:hover:bg-[#4A4A4A]'}`}>{t('xpGained')}</button>
            <button onClick={() => setActiveTab('time')} className={`px-4 py-1 text-sm font-semibold rounded-full ${activeTab === 'time' ? 'bg-[#4ECDC4] text-white' : 'hover:bg-gray-100 dark:hover:bg-[#4A4A4A]'}`}>{t('readingTime')}</button>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'xp' ? (
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A4A4A' : '#E5E7EB'} />
                    <XAxis dataKey="day" stroke={tickColor} tick={<CustomizedAxisTick />} height={50} interval={0} />
                    <YAxis stroke={tickColor} fontSize={12} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(135, 255, 220, 0.1)' }}/>
                    <Bar dataKey="xp" fill="#4ECDC4" radius={[4, 4, 0, 0]} />
                </BarChart>
            ) : (
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A4A4A' : '#E5E7EB'} />
                    <XAxis dataKey="day" stroke={tickColor} tick={<CustomizedAxisTick />} height={50} interval={0} />
                    <YAxis stroke={tickColor} fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="time" stroke="#87FFDC" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                </LineChart>
            )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCard;