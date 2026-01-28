import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { ChevronLeft, Download, Share2, Home, Lightbulb, BookOpen, User } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  borderColor: string;
  score: number;
  rank: number;
}

// Mock leaderboard data
const mockLeaderboard: LeaderboardUser[] = [
  { id: '1', name: 'Anora', avatar: '👩🏻', avatarBg: 'bg-pink-200', borderColor: 'border-yellow-400', score: 604, rank: 1 },
  { id: '2', name: 'Karina', avatar: '👩🏼', avatarBg: 'bg-purple-200', borderColor: 'border-purple-300', score: 597, rank: 2 },
  { id: '3', name: 'Munisa', avatar: '👩🏾', avatarBg: 'bg-orange-200', borderColor: 'border-orange-400', score: 580, rank: 3 },
  { id: '4', name: 'Aziz', avatar: '👨🏻', avatarBg: 'bg-pink-200', borderColor: 'border-pink-300', score: 501, rank: 4 },
  { id: '5', name: 'Asal', avatar: '👩🏻', avatarBg: 'bg-purple-200', borderColor: 'border-purple-300', score: 480, rank: 5 },
  { id: '6', name: 'Javohir', avatar: '👨🏻', avatarBg: 'bg-teal-200', borderColor: 'border-teal-300', score: 450, rank: 6 },
  { id: '7', name: 'Leon', avatar: '👨🏽', avatarBg: 'bg-green-200', borderColor: 'border-green-300', score: 448, rank: 7 },
];

// Crown SVG
const CrownIcon: React.FC = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0L17.5 7L26 3.5L22 15H6L2 3.5L10.5 7L14 0Z" fill="#FFD700" stroke="#E5B800" strokeWidth="0.5"/>
  </svg>
);

// Medal SVG
const MedalIcon: React.FC<{ type: 'silver' | 'bronze' }> = ({ type }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="7" fill={type === 'silver' ? '#C0C0C0' : '#CD7F32'} stroke={type === 'silver' ? '#A8A8A8' : '#B87333'} strokeWidth="1"/>
    <path d="M9 4L10.5 6.5L13.5 7L11.25 9.25L11.5 12.5L9 11.25L6.5 12.5L6.75 9.25L4.5 7L7.5 6.5L9 4Z" fill="white" fillOpacity="0.8"/>
  </svg>
);

// Hexagon for logo
const HexagonLogo: React.FC = () => (
  <div className="w-12 h-14 flex items-center justify-center">
    <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0L40 11.5V34.5L20 46L0 34.5V11.5L20 0Z" fill="#13593F"/>
    </svg>
  </div>
);

const Leaderboard: React.FC = () => {
  const { language } = useLanguage();
  const { coins, username } = useGamification();
  const navigate = useNavigate();
  const [downloadLoading, setDownloadLoading] = useState(false);

  const labels = {
    title: { uz: "Top o'quvchilar", ru: "Топ учеников", en: "Top Learners" },
    download: { uz: "Yuklab olish", ru: "Скачать", en: "Download" },
    share: { uz: "Ulashish", ru: "Поделиться", en: "Share" },
    home: { uz: "Uy", ru: "Главная", en: "Home" },
    projects: { uz: "Loyihalar", ru: "Проекты", en: "Projects" },
    glossary: { uz: "Lug'at", ru: "Словарь", en: "Glossary" },
    profile: { uz: "Profil", ru: "Профиль", en: "Profile" },
  };

  const top3 = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);
  
  // Podium order: 2nd, 1st, 3rd
  const podiumOrder = [top3[1], top3[0], top3[2]];

  const handleDownload = async () => {
    setDownloadLoading(true);
    // Simulate download - in real app, this would generate a certificate/image
    setTimeout(() => {
      setDownloadLoading(false);
      // Show success toast or download file
      alert(language === 'uz' ? 'Yuklab olindi!' : 'Downloaded!');
    }, 1000);
  };

  const handleShare = async () => {
    const shareText = language === 'uz' 
      ? `🏆 FINLIT NETWORK Top o'quvchilar!\n\n🥇 ${top3[0].name} - ${top3[0].score}\n🥈 ${top3[1].name} - ${top3[1].score}\n🥉 ${top3[2].name} - ${top3[2].score}\n\nIlovaga qo'shiling: @finlitnetwork_bot`
      : `🏆 FINLIT NETWORK Top Learners!\n\n🥇 ${top3[0].name} - ${top3[0].score}\n🥈 ${top3[1].name} - ${top3[1].score}\n🥉 ${top3[2].name} - ${top3[2].score}\n\nJoin the app: @finlitnetwork_bot`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FINLIT NETWORK Leaderboard',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert(language === 'uz' ? 'Nusxalandi!' : 'Copied!');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-background px-4 py-3 flex items-center justify-between sticky top-0 z-10 border-b border-border">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg">{labels.title[language]}</h1>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">uz</span>
          <span className="font-bold">UZ</span>
        </div>
      </div>

      {/* Green Section with Podium */}
      <div className="bg-[#13593F] pt-6 pb-10 px-4 flex-shrink-0">
        {/* Hexagon Logo */}
        <div className="flex justify-center mb-4">
          <HexagonLogo />
        </div>

        {/* Title */}
        <h2 className="text-white text-2xl font-bold text-center mb-8">
          {labels.title[language]}
        </h2>

        {/* Podium Section */}
        <div className="flex items-end justify-center gap-3 px-4">
          {podiumOrder.map((user, index) => {
            const isFirst = user.rank === 1;
            const isSecond = user.rank === 2;
            
            return (
              <motion.div
                key={user.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Crown/Medal */}
                <div className="h-6 flex items-end justify-center mb-1">
                  {isFirst && <CrownIcon />}
                  {isSecond && <MedalIcon type="silver" />}
                  {!isFirst && !isSecond && <MedalIcon type="bronze" />}
                </div>

                {/* Avatar */}
                <div 
                  className={`${isFirst ? 'w-20 h-20' : 'w-16 h-16'} rounded-full ${user.avatarBg} border-4 ${user.borderColor} flex items-center justify-center mb-2`}
                  style={{ fontSize: isFirst ? '2.5rem' : '2rem' }}
                >
                  {user.avatar}
                </div>

                {/* Name */}
                <p className="text-white font-medium text-sm mb-1">{user.name}</p>

                {/* Score Badge */}
                <div className={`px-3 py-1 rounded-full text-sm font-bold mb-3 ${
                  isFirst 
                    ? 'bg-[#9ACD32] text-gray-900' 
                    : 'bg-[#4a7c6a] text-white'
                }`}>
                  {user.score}
                </div>

                {/* Podium */}
                <div 
                  className={`w-20 ${isFirst ? 'h-20' : isSecond ? 'h-14' : 'h-12'} bg-[#1a6b4a] rounded-t-xl flex items-center justify-center`}
                >
                  <span className="text-white/40 text-3xl font-bold">{user.rank}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Rest of the List */}
      <div className="bg-card rounded-t-3xl -mt-4 flex-1 relative z-10">
        <div className="pt-4">
          {rest.map((user, index) => (
            <motion.div
              key={user.id}
              className="flex items-center gap-4 px-4 py-3 border-b border-border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {/* Rank */}
              <span className="w-6 text-lg font-bold text-primary">{user.rank}</span>

              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full ${user.avatarBg} flex items-center justify-center text-2xl`}>
                {user.avatar}
              </div>

              {/* Name */}
              <span className="flex-1 font-medium text-foreground">{user.name}</span>

              {/* Score */}
              <span className="font-bold text-primary">{user.score}</span>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-4 flex gap-3">
          <motion.button
            onClick={handleDownload}
            disabled={downloadLoading}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-xl font-medium disabled:opacity-70"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-5 h-5" />
            {downloadLoading ? '...' : labels.download[language]}
          </motion.button>
          
          <motion.button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary/10 text-primary rounded-xl font-medium border border-primary/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Share2 className="w-5 h-5" />
            {labels.share[language]}
          </motion.button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-card border-t border-border px-4 py-2 sticky bottom-0">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground">
            <Home className="w-6 h-6" />
            <span className="text-xs">{labels.home[language]}</span>
          </button>
          <button onClick={() => navigate('/projects')} className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground">
            <Lightbulb className="w-6 h-6" />
            <span className="text-xs">{labels.projects[language]}</span>
          </button>
          <button onClick={() => navigate('/glossary')} className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs">{labels.glossary[language]}</span>
          </button>
          <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground">
            <User className="w-6 h-6" />
            <span className="text-xs">{labels.profile[language]}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Leaderboard;
