import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { Download, Share2, Trophy, Medal, Crown } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
}

// Mock leaderboard data
const mockLeaderboard: LeaderboardUser[] = [
  { id: '1', name: 'Anora', avatar: '👩🏻', score: 604, rank: 1 },
  { id: '2', name: 'Karina', avatar: '👩🏼‍🦱', score: 597, rank: 2 },
  { id: '3', name: 'Munisa', avatar: '👩🏾', score: 580, rank: 3 },
  { id: '4', name: 'Aziz', avatar: '👨🏻', score: 501, rank: 4 },
  { id: '5', name: 'Asal', avatar: '👩🏻‍🦰', score: 480, rank: 5 },
  { id: '6', name: 'Javohir', avatar: '👨🏽', score: 450, rank: 6 },
  { id: '7', name: 'Leon', avatar: '👨🏿', score: 448, rank: 7 },
];

const avatarColors = [
  'bg-pink-200',
  'bg-purple-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-orange-200',
  'bg-red-200',
];

const Leaderboard: React.FC = () => {
  const { language } = useLanguage();
  const { coins, username } = useGamification();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  const labels = {
    title: { uz: "Top o'quvchilar", ru: "Топ учеников", en: "Top Learners" },
    weekly: { uz: "Haftalik", ru: "Неделя", en: "Weekly" },
    monthly: { uz: "Oylik", ru: "Месяц", en: "Monthly" },
    allTime: { uz: "Barcha vaqt", ru: "Все время", en: "All Time" },
    download: { uz: "Yuklab olish", ru: "Скачать", en: "Download" },
    share: { uz: "Ulashish", ru: "Поделиться", en: "Share" },
    yourRank: { uz: "Sizning o'rningiz", ru: "Ваше место", en: "Your Rank" },
    coins: { uz: "tanga", ru: "монет", en: "coins" },
  };

  // Calculate user's rank based on their coins
  const userRank = mockLeaderboard.filter(u => u.score > coins).length + 1;
  
  // Get top 3 for podium
  const top3 = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return null;
    }
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return 'h-24';
      case 2: return 'h-20';
      case 3: return 'h-16';
      default: return 'h-16';
    }
  };

  return (
    <Layout showBack title={labels.title[language]}>
      <div className="min-h-screen bg-gradient-to-b from-primary-dark to-primary pb-24">
        {/* Decorative Logo */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-10 h-10 text-primary-foreground/30">
              <path fill="currentColor" d="M20 5 L35 15 L35 30 L20 40 L5 30 L5 15 Z" />
              <path fill="currentColor" opacity="0.5" d="M20 10 L30 17 L30 28 L20 35 L10 28 L10 17 Z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <motion.h1 
          className="text-2xl font-bold text-white text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {labels.title[language]}
        </motion.h1>

        {/* Podium */}
        <motion.div 
          className="flex items-end justify-center gap-2 px-4 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className={`w-16 h-16 rounded-full ${avatarColors[1]} flex items-center justify-center text-3xl border-4 border-gray-300`}>
                {top3[1]?.avatar}
              </div>
              <div className="absolute -top-1 -right-1">
                {getRankIcon(2)}
              </div>
            </div>
            <p className="text-white font-medium text-sm">{top3[1]?.name}</p>
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full mt-1">
              <span className="text-xs text-white font-bold">{top3[1]?.score}</span>
            </div>
            <div className={`w-20 ${getPodiumHeight(2)} bg-gradient-to-t from-primary to-primary/80 rounded-t-lg mt-2 flex items-center justify-center`}>
              <span className="text-4xl font-bold text-white/30">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-4">
            <div className="relative mb-2">
              <div className={`w-20 h-20 rounded-full ${avatarColors[0]} flex items-center justify-center text-4xl border-4 border-yellow-400`}>
                {top3[0]?.avatar}
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                {getRankIcon(1)}
              </div>
            </div>
            <p className="text-white font-bold">{top3[0]?.name}</p>
            <div className="flex items-center gap-1 bg-yellow-400/30 px-3 py-1 rounded-full mt-1">
              <span className="text-sm text-white font-bold">{top3[0]?.score}</span>
            </div>
            <div className={`w-24 ${getPodiumHeight(1)} bg-gradient-to-t from-primary to-primary/80 rounded-t-lg mt-2 flex items-center justify-center`}>
              <span className="text-5xl font-bold text-white/30">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className={`w-16 h-16 rounded-full ${avatarColors[2]} flex items-center justify-center text-3xl border-4 border-amber-600`}>
                {top3[2]?.avatar}
              </div>
              <div className="absolute -top-1 -right-1">
                {getRankIcon(3)}
              </div>
            </div>
            <p className="text-white font-medium text-sm">{top3[2]?.name}</p>
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full mt-1">
              <span className="text-xs text-white font-bold">{top3[2]?.score}</span>
            </div>
            <div className={`w-20 ${getPodiumHeight(3)} bg-gradient-to-t from-primary to-primary/80 rounded-t-lg mt-2 flex items-center justify-center`}>
              <span className="text-4xl font-bold text-white/30">3</span>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard List */}
        <motion.div 
          className="bg-card rounded-t-3xl pt-6 px-4 min-h-[40vh]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="space-y-3">
            {rest.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-4 py-3 border-b border-border last:border-b-0"
              >
                <span className="w-6 text-lg font-bold text-muted-foreground">{user.rank}</span>
                <div className={`w-12 h-12 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-2xl`}>
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{user.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-foreground">{user.score}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pb-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium">
              <Download className="w-5 h-5" />
              {labels.download[language]}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-secondary text-foreground rounded-xl font-medium">
              <Share2 className="w-5 h-5" />
              {labels.share[language]}
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
