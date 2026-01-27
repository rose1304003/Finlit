import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification, REWARD_AMOUNTS } from '@/contexts/GamificationContext';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Flame, 
  BookOpen, 
  Newspaper, 
  Calculator, 
  Target,
  Gift,
  Check,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import CoinReward from '@/components/CoinReward';
import FinFoxMascot from '@/components/FinFoxMascot';
import confetti from 'canvas-confetti';

const Challenges: React.FC = () => {
  const { language } = useLanguage();
  const { 
    dailyChallenges, 
    streak, 
    claimStreakReward,
    updateStreak,
    pendingCoinReward,
    clearPendingCoinReward,
  } = useGamification();

  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);

  // Update streak on page visit
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const labels = {
    title: { uz: "Kunlik vazifalar", ru: "Ежедневные задания", en: "Daily Challenges" },
    subtitle: { uz: "Vazifalarni bajaring va mukofot oling!", ru: "Выполняйте задания и получайте награды!", en: "Complete tasks and earn rewards!" },
    streak: { uz: "Kunlik streak", ru: "Дневная серия", en: "Daily Streak" },
    days: { uz: "kun", ru: "дней", en: "days" },
    challenges: { uz: "Bugungi vazifalar", ru: "Задания на сегодня", en: "Today's Challenges" },
    completed: { uz: "Bajarildi", ru: "Выполнено", en: "Completed" },
    streakRewards: { uz: "Streak mukofotlari", ru: "Награды за серию", en: "Streak Rewards" },
    claimReward: { uz: "Olish", ru: "Получить", en: "Claim" },
    claimed: { uz: "Olingan", ru: "Получено", en: "Claimed" },
    locked: { uz: "Qulflangan", ru: "Заблокировано", en: "Locked" },
    keepGoing: { uz: "Davom eting!", ru: "Продолжайте!", en: "Keep going!" },
    greatJob: { uz: "Ajoyib ish!", ru: "Отличная работа!", en: "Great job!" },
    allCompleted: { uz: "Barcha vazifalar bajarildi!", ru: "Все задания выполнены!", en: "All challenges completed!" },
  };

  const challengeIcons = {
    glossary: BookOpen,
    news: Newspaper,
    calculator: Calculator,
    book: BookOpen,
    quiz: Target,
  };

  const challengeColors = {
    glossary: 'from-blue-500 to-blue-600',
    news: 'from-purple-500 to-purple-600',
    calculator: 'from-green-500 to-green-600',
    book: 'from-amber-500 to-amber-600',
    quiz: 'from-pink-500 to-pink-600',
  };

  const streakMilestones = [
    { day: 1, reward: REWARD_AMOUNTS.STREAK_DAY_1, icon: '🔥' },
    { day: 3, reward: REWARD_AMOUNTS.STREAK_DAY_3, icon: '⚡' },
    { day: 7, reward: REWARD_AMOUNTS.STREAK_DAY_7, icon: '🌟' },
    { day: 14, reward: REWARD_AMOUNTS.STREAK_DAY_14, icon: '💎' },
    { day: 30, reward: REWARD_AMOUNTS.STREAK_DAY_30, icon: '👑' },
  ];

  const handleClaimStreakReward = (day: number, reward: number) => {
    const success = claimStreakReward(day);
    if (success) {
      setRewardAmount(reward);
      setShowReward(true);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const completedChallenges = dailyChallenges.filter(c => c.completed).length;
  const allChallengesCompleted = completedChallenges === dailyChallenges.length;

  const foxMessage = allChallengesCompleted 
    ? labels.allCompleted[language]
    : completedChallenges > 0 
      ? labels.greatJob[language]
      : labels.keepGoing[language];

  return (
    <Layout showBack title={labels.title[language]}>
      <div className="py-4 px-4 space-y-6">
        {/* Header with FinFox */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FinFoxMascot size="md" message={foxMessage} />
        </motion.div>

        {/* Streak Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5 bg-gradient-to-br from-orange-500 to-red-500 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Flame className="w-8 h-8" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold">{labels.streak[language]}</h3>
                    <p className="text-sm text-white/80">{labels.keepGoing[language]}</p>
                  </div>
                </div>
                <div className="text-right">
                  <motion.p 
                    className="text-4xl font-bold"
                    key={streak.currentStreak}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                  >
                    {streak.currentStreak}
                  </motion.p>
                  <p className="text-sm text-white/80">{labels.days[language]}</p>
                </div>
              </div>

              {/* Streak Progress Dots */}
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div 
                    key={day}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      day <= streak.currentStreak 
                        ? 'bg-white text-orange-500' 
                        : 'bg-white/20 text-white/60'
                    }`}
                  >
                    {day <= streak.currentStreak ? <Check className="w-4 h-4" /> : day}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Daily Challenges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">{labels.challenges[language]}</h2>
            <span className="text-sm text-muted-foreground">
              {completedChallenges}/{dailyChallenges.length} {labels.completed[language]}
            </span>
          </div>

          <div className="space-y-3">
            {dailyChallenges.map((challenge, index) => {
              const Icon = challengeIcons[challenge.type];
              const colorClass = challengeColors[challenge.type];
              const progress = (challenge.current / challenge.target) * 100;

              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className={`p-4 transition-all ${challenge.completed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{challenge.title[language]}</h3>
                          {challenge.completed && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {challenge.current}/{challenge.target} {challenge.description[language]}
                        </p>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 text-primary-gold font-bold">
                          <span>+{challenge.reward}</span>
                          <span>🪙</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* All Completed Celebration */}
          <AnimatePresence>
            {allChallengesCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-4 p-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl text-white text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-4xl mb-2"
                >
                  🎉
                </motion.div>
                <p className="font-bold">{labels.allCompleted[language]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Streak Rewards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-bold text-foreground mb-4">{labels.streakRewards[language]}</h2>
          
          <div className="space-y-3">
            {streakMilestones.map((milestone, index) => {
              const isUnlocked = streak.currentStreak >= milestone.day;
              const isClaimed = streak.streakRewardsClaimed.includes(milestone.day);
              const canClaim = isUnlocked && !isClaimed;

              return (
                <motion.div
                  key={milestone.day}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className={`p-4 transition-all ${
                    isClaimed 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                      : canClaim 
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 shadow-lg' 
                        : 'opacity-60'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        isUnlocked ? 'bg-gradient-to-br from-yellow-400 to-orange-400' : 'bg-muted'
                      }`}>
                        {milestone.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {milestone.day} {labels.days[language]}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-primary-gold font-medium">
                          <span>+{milestone.reward}</span>
                          <span>🪙</span>
                        </div>
                      </div>

                      <div>
                        {isClaimed ? (
                          <div className="flex items-center gap-1 text-green-600 font-medium">
                            <Check className="w-4 h-4" />
                            <span className="text-sm">{labels.claimed[language]}</span>
                          </div>
                        ) : canClaim ? (
                          <motion.button
                            onClick={() => handleClaimStreakReward(milestone.day, milestone.reward)}
                            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl font-bold text-sm shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="flex items-center gap-1">
                              <Gift className="w-4 h-4" />
                              {labels.claimReward[language]}
                            </span>
                          </motion.button>
                        ) : (
                          <span className="text-sm text-muted-foreground">{labels.locked[language]}</span>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>

      {/* Coin Reward Animation */}
      <CoinReward
        amount={rewardAmount}
        isVisible={showReward}
        onComplete={() => setShowReward(false)}
      />
    </Layout>
  );
};

export default Challenges;
