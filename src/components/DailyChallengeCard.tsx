import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { Trophy, ChevronRight, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const DailyChallengeCard: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { dailyChallenges, streak } = useGamification();

  const completedCount = dailyChallenges.filter(c => c.completed).length;
  const totalCount = dailyChallenges.length;
  const progress = (completedCount / totalCount) * 100;
  const allCompleted = completedCount === totalCount;

  const labels = {
    completed: { uz: "Bajarildi", ru: "Выполнено", en: "Completed" },
    streak: { uz: "kun", ru: "дн.", en: "days" },
  };

  return (
    <motion.div
      onClick={() => navigate('/challenges')}
      className="mx-4 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-800 cursor-pointer touch-active relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-3">
          {/* Trophy Icon */}
          <motion.div
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg"
            animate={{ rotate: allCompleted ? [0, 10, -10, 0] : [-3, 3, -3] }}
            transition={{ duration: allCompleted ? 0.5 : 2, repeat: Infinity }}
          >
            {allCompleted ? (
              <span className="text-2xl">🎉</span>
            ) : (
              <Trophy className="w-6 h-6 text-white" />
            )}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground">{t('dailyChallenge')}</h3>
            <p className="text-sm text-muted-foreground">
              {completedCount}/{totalCount} {labels.completed[language]}
            </p>
          </div>

          {/* Streak Badge */}
          {streak.currentStreak > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                {streak.currentStreak}
              </span>
            </div>
          )}

          {/* Arrow */}
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2" />
      </div>
    </motion.div>
  );
};

export default DailyChallengeCard;
