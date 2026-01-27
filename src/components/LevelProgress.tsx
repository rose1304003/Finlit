import React from 'react';
import { motion } from 'framer-motion';
import { useGamification, userLevels } from '@/contexts/GamificationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Progress } from '@/components/ui/progress';
import { Star, Trophy, Zap, Flame } from 'lucide-react';

const LevelProgress: React.FC = () => {
  const { currentLevel, coins, getProgressToNextLevel, allSkins, streak, unlockedBadges } = useGamification();
  const { language } = useLanguage();

  const progress = getProgressToNextLevel();
  const nextLevel = userLevels.find(l => l.level === currentLevel.level + 1);
  const coinsToNext = nextLevel ? nextLevel.minCoins - coins : 0;

  const unlockedSkins = allSkins.filter(s => s.unlocked).length;

  const labels = {
    level: { uz: "Daraja", ru: "Уровень", en: "Level" },
    coinsTo: { uz: "tangacha", ru: "монет до", en: "coins to" },
    skins: { uz: "skin", ru: "скинов", en: "skins" },
    badges: { uz: "yutuq", ru: "наград", en: "badges" },
    streak: { uz: "kun", ru: "дн.", en: "days" },
  };

  return (
    <motion.div
      className="mx-4 mb-4 p-4 bg-card rounded-2xl border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Level Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {labels.level[language]} {currentLevel.level}
            </p>
            <p className="font-bold text-foreground">{currentLevel.name[language]}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-primary-gold">
          <span className="font-bold">{coins}</span>
          <span>🪙</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <Progress value={progress} className="h-3 bg-muted" />
        {nextLevel && (
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {coinsToNext} {labels.coinsTo[language]} {nextLevel.name[language]}
          </p>
        )}
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Star className="w-4 h-4 text-primary-gold" />
          <span>{unlockedSkins}/{allSkins.length} {labels.skins[language]}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-lg">🏆</span>
          <span>{unlockedBadges.length} {labels.badges[language]}</span>
        </div>
        {streak.currentStreak > 0 && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-bold text-orange-600 dark:text-orange-400">{streak.currentStreak}</span>
            <span className="text-xs text-orange-600/80">{labels.streak[language]}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LevelProgress;
