import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification, userLevels, badgeDefinitions } from '@/contexts/GamificationContext';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Lock, Check, Zap, Target, BookOpen, Flame, BarChart3 } from 'lucide-react';
import StickerBadge from '@/components/StickerBadge';
import StickerRewardModal from '@/components/StickerRewardModal';
import mascotImage from '@/assets/mascot.png';
import CoinReward from '@/components/CoinReward';

const Profile: React.FC = () => {
  const { language } = useLanguage();
  const { 
    coins, 
    currentLevel, 
    currentSkin, 
    allSkins, 
    getProgressToNextLevel, 
    setSkin,
    username,
    stats,
    streak,
    unlockedBadges,
    getBadgeProgress,
    isBadgeUnlocked,
    newlyUnlockedBadge,
    clearNewlyUnlockedBadge,
  } = useGamification();
  
  const [showReward, setShowReward] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<typeof badgeDefinitions[0] | null>(null);
  
  const progress = getProgressToNextLevel();
  const nextLevel = userLevels.find(l => l.level === currentLevel.level + 1);

  const labels = {
    level: { uz: "Daraja", ru: "Уровень", en: "Level" },
    coins: { uz: "tanga", ru: "монет", en: "coins" },
    skins: { uz: "Skinlar", ru: "Скины", en: "Skins" },
    achievements: { uz: "Yutuqlar", ru: "Достижения", en: "Achievements" },
    statistics: { uz: "Statistika", ru: "Статистика", en: "Statistics" },
    glossaryReads: { uz: "O'qilgan atamalar", ru: "Прочитано терминов", en: "Terms Read" },
    newsReads: { uz: "O'qilgan yangiliklar", ru: "Прочитано новостей", en: "News Read" },
    calculatorUses: { uz: "Kalkulyator", ru: "Калькулятор", en: "Calculator" },
    booksOpened: { uz: "Ochilgan kitoblar", ru: "Открыто книг", en: "Books Opened" },
    currentStreak: { uz: "Joriy streak", ru: "Текущая серия", en: "Current Streak" },
    longestStreak: { uz: "Eng uzun streak", ru: "Лучшая серия", en: "Longest Streak" },
    days: { uz: "kun", ru: "дн.", en: "days" },
    unlocked: { uz: "ochilgan", ru: "открыто", en: "unlocked" },
    progress: { uz: "jarayon", ru: "прогресс", en: "progress" },
  };

  const statItems = [
    { 
      icon: BookOpen, 
      label: labels.glossaryReads,
      value: stats.glossaryReads || 0,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    { 
      icon: Target, 
      label: labels.newsReads,
      value: stats.newsReads || 0,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    { 
      icon: BarChart3, 
      label: labels.calculatorUses,
      value: stats.calculatorUses || 0,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    { 
      icon: Flame, 
      label: labels.currentStreak,
      value: streak.currentStreak || 0,
      suffix: labels.days[language],
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
  ];

  // Convert badge definitions to display format
  const displayBadges = badgeDefinitions.map(badge => ({
    ...badge,
    unlocked: isBadgeUnlocked(badge.id),
  }));

  const handleBadgeClick = (badge: typeof badgeDefinitions[0]) => {
    if (isBadgeUnlocked(badge.id)) {
      setSelectedBadge(badge);
    }
  };

  const rankColors = {
    bronze: 'from-amber-600 to-amber-700',
    silver: 'from-gray-400 to-gray-500',
    gold: 'from-yellow-400 to-yellow-500',
    champion: 'from-purple-500 to-purple-600',
    legend: 'from-gradient-to-r from-yellow-400 via-red-500 to-pink-500',
  };

  return (
    <Layout showBack title={language === 'uz' ? "Profil" : language === 'ru' ? "Профиль" : "Profile"}>
      <div className="py-4 px-4">
        {/* Profile Header */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative inline-block mb-3">
            <motion.div 
              className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary bg-white mx-auto"
              whileHover={{ scale: 1.05 }}
            >
              <img src={mascotImage} alt="Profile" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute -bottom-1 -right-1 text-2xl">
              {currentSkin.icon}
            </div>
          </div>
          <h1 className="text-xl font-bold text-foreground">{username}</h1>
          <p className="text-sm text-muted-foreground">@{username.toLowerCase().replace(/\s/g, '_')}</p>
          
          {/* Coins Display */}
          <motion.div 
            className="inline-flex items-center gap-2 coin-badge mt-3"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-lg">🪙</span>
            <span className="font-bold">{coins}</span>
          </motion.div>
        </motion.div>

        {/* Level Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 mb-4 relative overflow-hidden">
            {/* Rank Badge */}
            <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-gradient-to-r ${rankColors[currentLevel.rank]} text-white text-xs font-bold uppercase`}>
              {currentLevel.rank}
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {labels.level[language]} {currentLevel.level}
                  </p>
                  <p className="font-bold text-foreground">{currentLevel.name[language]}</p>
                </div>
              </div>
            </div>
            
            <Progress value={progress} className="h-3 mb-2" />
            
            {nextLevel && (
              <p className="text-xs text-muted-foreground text-right">
                {nextLevel.minCoins - coins} {labels.coins[language]} → {nextLevel.name[language]}
              </p>
            )}
          </Card>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-lg font-bold text-foreground mb-3">
            {labels.statistics[language]}
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {statItems.map((stat, index) => (
              <Card key={index} className={`p-3 ${stat.bgColor}`}>
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-muted-foreground">{stat.label[language]}</span>
                </div>
                <p className="text-xl font-bold text-foreground">
                  {stat.value}
                  {stat.suffix && <span className="text-sm font-normal ml-1">{stat.suffix}</span>}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Skins Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-foreground mb-3">
            {labels.skins[language]}
          </h2>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {allSkins.map((skin) => (
              <motion.button
                key={skin.id}
                onClick={() => skin.unlocked && setSkin(skin.id)}
                className={`relative p-3 rounded-xl border-2 transition-all ${
                  currentSkin.id === skin.id 
                    ? 'border-primary bg-primary/10' 
                    : skin.unlocked 
                      ? 'border-border bg-card hover:border-primary/50' 
                      : 'border-border bg-muted/50 opacity-50'
                }`}
                whileHover={skin.unlocked ? { scale: 1.05 } : {}}
                whileTap={skin.unlocked ? { scale: 0.95 } : {}}
              >
                <span className="text-2xl block mb-1">{skin.icon}</span>
                <p className="text-[10px] text-foreground font-medium truncate">{skin.name[language]}</p>
                
                {!skin.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
                
                {currentSkin.id === skin.id && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">
              {labels.achievements[language]}
            </h2>
            <span className="text-sm text-muted-foreground">
              {unlockedBadges.length}/{badgeDefinitions.length} {labels.unlocked[language]}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {displayBadges.map((badge, index) => (
              <div key={badge.id} className="relative">
                <StickerBadge 
                  badge={badge} 
                  language={language}
                  index={index}
                  onClick={() => handleBadgeClick(badge)}
                />
                {/* Progress indicator for locked badges */}
                {!badge.unlocked && (
                  <div className="mt-1">
                    <Progress value={getBadgeProgress(badge.id)} className="h-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Badge Detail Modal */}
      {selectedBadge && (
        <StickerRewardModal
          isOpen={!!selectedBadge}
          onClose={() => setSelectedBadge(null)}
          badge={{
            ...selectedBadge,
            unlocked: isBadgeUnlocked(selectedBadge.id),
          }}
          language={language}
        />
      )}

      {/* New Badge Unlock Modal */}
      {newlyUnlockedBadge && (
        <StickerRewardModal
          isOpen={!!newlyUnlockedBadge}
          onClose={clearNewlyUnlockedBadge}
          badge={{
            ...newlyUnlockedBadge,
            unlocked: true,
          }}
          language={language}
        />
      )}
      
      <CoinReward 
        amount={25} 
        isVisible={showReward} 
        onComplete={() => setShowReward(false)} 
      />
    </Layout>
  );
};

export default Profile;
