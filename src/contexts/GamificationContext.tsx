import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Safe localStorage wrapper for Telegram Mini Apps
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail
    }
  }
};

export type Language = 'uz' | 'ru' | 'en';

export interface UserLevel {
  level: number;
  name: { uz: string; ru: string; en: string };
  minCoins: number;
  maxCoins: number;
  rank: 'bronze' | 'silver' | 'gold' | 'champion' | 'legend';
}

export interface Skin {
  id: string;
  name: { uz: string; ru: string; en: string };
  icon: string;
  requiredLevel: number;
  unlocked: boolean;
}

export interface BadgeDefinition {
  id: string;
  icon: string;
  name: { uz: string; ru: string; en: string };
  description: { uz: string; ru: string; en: string };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  criteria: {
    type: 'stat' | 'streak' | 'level' | 'event';
    stat?: keyof UserStats;
    threshold: number;
  };
}

export interface UserStats {
  glossaryReads: number;
  newsReads: number;
  calculatorUses: number;
  booksOpened: number;
  booksCompleted: number;
  chaptersCompleted: number;
  quizzesCompleted: number;
  perfectQuizzes: number;
  projectsViewed: number;
  totalCoinsEarned: number;
}

export interface DailyChallenge {
  id: string;
  type: 'glossary' | 'news' | 'calculator' | 'book' | 'quiz';
  target: number;
  current: number;
  reward: number;
  completed: boolean;
  title: { uz: string; ru: string; en: string };
  description: { uz: string; ru: string; en: string };
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  streakRewardsClaimed: number[];
}

export const userLevels: UserLevel[] = [
  { level: 1, name: { uz: "Yangi boshlovchi", ru: "Новичок", en: "Beginner" }, minCoins: 0, maxCoins: 99, rank: 'bronze' },
  { level: 2, name: { uz: "O'rganuvchi", ru: "Ученик", en: "Learner" }, minCoins: 100, maxCoins: 299, rank: 'bronze' },
  { level: 3, name: { uz: "Bilimdon", ru: "Знаток", en: "Scholar" }, minCoins: 300, maxCoins: 599, rank: 'silver' },
  { level: 4, name: { uz: "Mutaxassis", ru: "Специалист", en: "Expert" }, minCoins: 600, maxCoins: 999, rank: 'silver' },
  { level: 5, name: { uz: "Usta", ru: "Мастер", en: "Master" }, minCoins: 1000, maxCoins: 1499, rank: 'gold' },
  { level: 6, name: { uz: "Chempion", ru: "Чемпион", en: "Champion" }, minCoins: 1500, maxCoins: 2499, rank: 'champion' },
  { level: 7, name: { uz: "Qahramond", ru: "Герой", en: "Hero" }, minCoins: 2500, maxCoins: 3999, rank: 'champion' },
  { level: 8, name: { uz: "Afsonalar", ru: "Легенда", en: "Legend" }, minCoins: 4000, maxCoins: Infinity, rank: 'legend' },
];

export const skins: Skin[] = [
  { id: 'default', name: { uz: "Oddiy", ru: "Обычный", en: "Default" }, icon: '🐿️', requiredLevel: 1, unlocked: true },
  { id: 'student', name: { uz: "Talaba", ru: "Студент", en: "Student" }, icon: '🎓', requiredLevel: 2, unlocked: false },
  { id: 'businessman', name: { uz: "Biznesmen", ru: "Бизнесмен", en: "Businessman" }, icon: '👔', requiredLevel: 3, unlocked: false },
  { id: 'scientist', name: { uz: "Olim", ru: "Учёный", en: "Scientist" }, icon: '🔬', requiredLevel: 4, unlocked: false },
  { id: 'astronaut', name: { uz: "Kosmonavt", ru: "Космонавт", en: "Astronaut" }, icon: '🚀', requiredLevel: 5, unlocked: false },
  { id: 'wizard', name: { uz: "Sehrgar", ru: "Волшебник", en: "Wizard" }, icon: '🧙', requiredLevel: 6, unlocked: false },
  { id: 'king', name: { uz: "Qirol", ru: "Король", en: "King" }, icon: '👑', requiredLevel: 7, unlocked: false },
  { id: 'dragon', name: { uz: "Ajdar", ru: "Дракон", en: "Dragon" }, icon: '🐉', requiredLevel: 8, unlocked: false },
];

export const badgeDefinitions: BadgeDefinition[] = [
  {
    id: 'beginner',
    icon: '🌟',
    name: { uz: "Yangi boshlovchi", ru: "Новичок", en: "Beginner" },
    description: { uz: "Ilovaga xush kelibsiz!", ru: "Добро пожаловать!", en: "Welcome to the app!" },
    rarity: 'common',
    criteria: { type: 'level', threshold: 1 },
  },
  {
    id: 'bookworm',
    icon: '📚',
    name: { uz: "Kitobxon", ru: "Книголюб", en: "Bookworm" },
    description: { uz: "10 ta kitobni oching", ru: "Откройте 10 книг", en: "Open 10 books" },
    rarity: 'common',
    criteria: { type: 'stat', stat: 'booksOpened', threshold: 10 },
  },
  {
    id: 'saver',
    icon: '💰',
    name: { uz: "Tejamkor", ru: "Экономист", en: "Saver" },
    description: { uz: "Kalkulyatorni 5 marta ishlating", ru: "Используйте калькулятор 5 раз", en: "Use calculator 5 times" },
    rarity: 'rare',
    criteria: { type: 'stat', stat: 'calculatorUses', threshold: 5 },
  },
  {
    id: 'quiz_master',
    icon: '🧠',
    name: { uz: "Viktorina ustasi", ru: "Мастер викторин", en: "Quiz Master" },
    description: { uz: "5 ta viktorinani mukammal yakunlang", ru: "Пройдите 5 викторин идеально", en: "Complete 5 quizzes perfectly" },
    rarity: 'rare',
    criteria: { type: 'stat', stat: 'perfectQuizzes', threshold: 5 },
  },
  {
    id: 'expert',
    icon: '🏆',
    name: { uz: "Mutaxassis", ru: "Эксперт", en: "Expert" },
    description: { uz: "4-darajaga yeting", ru: "Достигните 4 уровня", en: "Reach level 4" },
    rarity: 'epic',
    criteria: { type: 'level', threshold: 4 },
  },
];

export const REWARD_AMOUNTS = {
  GLOSSARY_READ: 5,
  NEWS_READ: 10,
  CALCULATOR_USE: 10,
  BOOK_OPEN: 5,
  BOOK_COMPLETE: 50,
  CHAPTER_COMPLETE: 15,
  QUIZ_COMPLETE: 20,
  QUIZ_PERFECT: 50,
  PROJECT_VIEW: 5,
  DAILY_CHALLENGE_COMPLETE: 25,
  STREAK_DAY_1: 10,
  STREAK_DAY_3: 30,
  STREAK_DAY_7: 100,
  STREAK_DAY_14: 200,
  STREAK_DAY_30: 500,
};

const getToday = () => new Date().toISOString().split('T')[0];

const generateDailyChallenges = (): DailyChallenge[] => {
  const today = getToday();
  const seed = today.split('-').join('');
  const random = (max: number) => (parseInt(seed) % max);

  return [
    {
      id: `${today}-glossary`,
      type: 'glossary',
      target: 3 + random(3),
      current: 0,
      reward: 25,
      completed: false,
      title: { uz: "Lug'at o'rganish", ru: "Изучить глоссарий", en: "Learn Glossary" },
      description: { uz: "atama o'qing", ru: "терминов прочитайте", en: "terms read" },
    },
    {
      id: `${today}-news`,
      type: 'news',
      target: 2 + random(2),
      current: 0,
      reward: 30,
      completed: false,
      title: { uz: "Yangiliklar o'qish", ru: "Читать новости", en: "Read News" },
      description: { uz: "yangilik o'qing", ru: "новостей прочитайте", en: "news articles" },
    },
    {
      id: `${today}-calculator`,
      type: 'calculator',
      target: 1,
      current: 0,
      reward: 20,
      completed: false,
      title: { uz: "Kalkulyator ishlatish", ru: "Использовать калькулятор", en: "Use Calculator" },
      description: { uz: "kalkulyatorni ishlating", ru: "раз используйте калькулятор", en: "calculator uses" },
    },
  ];
};

interface GamificationContextType {
  coins: number;
  currentLevel: UserLevel;
  currentSkin: Skin;
  allSkins: Skin[];
  username: string;
  stats: UserStats;
  streak: StreakData;
  dailyChallenges: DailyChallenge[];
  unlockedBadges: string[];
  claimedEvents: string[];
  claimReward: (eventId: string, eventType: keyof typeof REWARD_AMOUNTS, metadata?: Record<string, any>) => boolean;
  addCoins: (amount: number) => void;
  setSkin: (skinId: string) => void;
  setUsername: (name: string) => void;
  getProgressToNextLevel: () => number;
  checkAndUnlockBadges: () => string[];
  updateStreak: () => void;
  claimStreakReward: (day: number) => boolean;
  getBadgeProgress: (badgeId: string) => number;
  isBadgeUnlocked: (badgeId: string) => boolean;
  newlyUnlockedBadge: BadgeDefinition | null;
  clearNewlyUnlockedBadge: () => void;
  pendingCoinReward: { amount: number; eventId: string } | null;
  clearPendingCoinReward: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const defaultStats: UserStats = {
  glossaryReads: 0,
  newsReads: 0,
  calculatorUses: 0,
  booksOpened: 0,
  booksCompleted: 0,
  chaptersCompleted: 0,
  quizzesCompleted: 0,
  perfectQuizzes: 0,
  projectsViewed: 0,
  totalCoinsEarned: 0,
};

const defaultStreak: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  streakRewardsClaimed: [],
};

export const GamificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Core state with safe localStorage
  const [coins, setCoins] = useState(() => {
    const saved = safeStorage.getItem('userCoins');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [currentSkinId, setCurrentSkinId] = useState(() => {
    return safeStorage.getItem('userSkin') || 'default';
  });

  const [username, setUsernameState] = useState(() => {
    return safeStorage.getItem('username') || 'Guest';
  });

  const [stats, setStats] = useState<UserStats>(() => {
    const saved = safeStorage.getItem('userStats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultStats;
      }
    }
    return defaultStats;
  });

  const [streak, setStreak] = useState<StreakData>(() => {
    const saved = safeStorage.getItem('userStreak');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultStreak;
      }
    }
    return defaultStreak;
  });

  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>(() => {
    const saved = safeStorage.getItem('dailyChallenges');
    const today = getToday();
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[0]?.id.startsWith(today)) {
          return parsed;
        }
      } catch {
        // Fall through to generate new
      }
    }
    return generateDailyChallenges();
  });

  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    const saved = safeStorage.getItem('unlockedBadges');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return ['beginner'];
      }
    }
    return ['beginner'];
  });

  const [claimedEvents, setClaimedEvents] = useState<string[]>(() => {
    const saved = safeStorage.getItem('claimedEvents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<BadgeDefinition | null>(null);
  const [pendingCoinReward, setPendingCoinReward] = useState<{ amount: number; eventId: string } | null>(null);

  // Compute current level
  const currentLevel = userLevels.find(l => coins >= l.minCoins && coins <= l.maxCoins) || userLevels[0];

  // Compute unlocked skins
  const allSkins = skins.map(s => ({
    ...s,
    unlocked: currentLevel.level >= s.requiredLevel,
  }));

  const currentSkin = allSkins.find(s => s.id === currentSkinId) || allSkins[0];

  // Persist to storage
  useEffect(() => {
    safeStorage.setItem('userCoins', coins.toString());
  }, [coins]);

  useEffect(() => {
    safeStorage.setItem('userSkin', currentSkinId);
  }, [currentSkinId]);

  useEffect(() => {
    safeStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    safeStorage.setItem('userStats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    safeStorage.setItem('userStreak', JSON.stringify(streak));
  }, [streak]);

  useEffect(() => {
    safeStorage.setItem('dailyChallenges', JSON.stringify(dailyChallenges));
  }, [dailyChallenges]);

  useEffect(() => {
    safeStorage.setItem('unlockedBadges', JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  useEffect(() => {
    safeStorage.setItem('claimedEvents', JSON.stringify(claimedEvents));
  }, [claimedEvents]);

  // Claim reward
  const claimReward = useCallback((eventId: string, eventType: keyof typeof REWARD_AMOUNTS, metadata?: Record<string, any>): boolean => {
    if (claimedEvents.includes(eventId)) {
      return false;
    }

    const rewardAmount = REWARD_AMOUNTS[eventType];
    setCoins(prev => prev + rewardAmount);
    
    // Update stats
    setStats(prev => {
      const newStats = { ...prev, totalCoinsEarned: prev.totalCoinsEarned + rewardAmount };
      
      switch (eventType) {
        case 'GLOSSARY_READ':
          newStats.glossaryReads = prev.glossaryReads + 1;
          break;
        case 'NEWS_READ':
          newStats.newsReads = prev.newsReads + 1;
          break;
        case 'CALCULATOR_USE':
          newStats.calculatorUses = prev.calculatorUses + 1;
          break;
        case 'BOOK_OPEN':
          newStats.booksOpened = prev.booksOpened + 1;
          break;
        case 'BOOK_COMPLETE':
          newStats.booksCompleted = prev.booksCompleted + 1;
          break;
        case 'CHAPTER_COMPLETE':
          newStats.chaptersCompleted = prev.chaptersCompleted + 1;
          break;
        case 'QUIZ_COMPLETE':
          newStats.quizzesCompleted = prev.quizzesCompleted + 1;
          break;
        case 'QUIZ_PERFECT':
          newStats.quizzesCompleted = prev.quizzesCompleted + 1;
          newStats.perfectQuizzes = prev.perfectQuizzes + 1;
          break;
        case 'PROJECT_VIEW':
          newStats.projectsViewed = prev.projectsViewed + 1;
          break;
      }
      
      return newStats;
    });

    // Update daily challenges
    setDailyChallenges(prev => prev.map(challenge => {
      if (challenge.completed) return challenge;
      
      let shouldUpdate = false;
      switch (eventType) {
        case 'GLOSSARY_READ':
          shouldUpdate = challenge.type === 'glossary';
          break;
        case 'NEWS_READ':
          shouldUpdate = challenge.type === 'news';
          break;
        case 'CALCULATOR_USE':
          shouldUpdate = challenge.type === 'calculator';
          break;
        case 'BOOK_OPEN':
        case 'BOOK_COMPLETE':
        case 'CHAPTER_COMPLETE':
          shouldUpdate = challenge.type === 'book';
          break;
        case 'QUIZ_COMPLETE':
        case 'QUIZ_PERFECT':
          shouldUpdate = challenge.type === 'quiz';
          break;
      }
      
      if (shouldUpdate) {
        const newCurrent = challenge.current + 1;
        const completed = newCurrent >= challenge.target;
        return { ...challenge, current: newCurrent, completed };
      }
      
      return challenge;
    }));

    setClaimedEvents(prev => [...prev, eventId]);
    setPendingCoinReward({ amount: rewardAmount, eventId });

    return true;
  }, [claimedEvents]);

  const addCoins = useCallback((amount: number) => {
    setCoins(prev => prev + amount);
  }, []);

  const getBadgeProgress = useCallback((badgeId: string): number => {
    const badge = badgeDefinitions.find(b => b.id === badgeId);
    if (!badge) return 0;

    const { criteria } = badge;
    let current = 0;

    switch (criteria.type) {
      case 'stat':
        current = criteria.stat ? (stats[criteria.stat] || 0) : 0;
        break;
      case 'streak':
        current = streak.currentStreak;
        break;
      case 'level':
        current = currentLevel.level;
        break;
    }

    return Math.min((current / criteria.threshold) * 100, 100);
  }, [stats, streak, currentLevel]);

  const isBadgeUnlocked = useCallback((badgeId: string): boolean => {
    return unlockedBadges.includes(badgeId);
  }, [unlockedBadges]);

  const checkAndUnlockBadges = useCallback((): string[] => {
    const newlyUnlocked: string[] = [];

    badgeDefinitions.forEach(badge => {
      if (unlockedBadges.includes(badge.id)) return;

      const { criteria } = badge;
      let current = 0;

      switch (criteria.type) {
        case 'stat':
          current = criteria.stat ? (stats[criteria.stat] || 0) : 0;
          break;
        case 'streak':
          current = streak.currentStreak;
          break;
        case 'level':
          current = currentLevel.level;
          break;
      }

      if (current >= criteria.threshold) {
        newlyUnlocked.push(badge.id);
      }
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedBadges(prev => [...prev, ...newlyUnlocked]);
      
      const firstNewBadge = badgeDefinitions.find(b => b.id === newlyUnlocked[0]);
      if (firstNewBadge) {
        setNewlyUnlockedBadge(firstNewBadge);
      }
    }

    return newlyUnlocked;
  }, [unlockedBadges, stats, streak, currentLevel]);

  useEffect(() => {
    checkAndUnlockBadges();
  }, [stats, streak.currentStreak, currentLevel.level, checkAndUnlockBadges]);

  const updateStreak = useCallback(() => {
    const today = getToday();
    
    setStreak(prev => {
      if (prev.lastActiveDate === today) {
        return prev;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak: StreakData;

      if (prev.lastActiveDate === yesterdayStr) {
        const newCount = prev.currentStreak + 1;
        newStreak = {
          ...prev,
          currentStreak: newCount,
          longestStreak: Math.max(prev.longestStreak, newCount),
          lastActiveDate: today,
        };
      } else if (prev.lastActiveDate === null || prev.lastActiveDate < yesterdayStr) {
        newStreak = {
          ...prev,
          currentStreak: 1,
          longestStreak: Math.max(prev.longestStreak, 1),
          lastActiveDate: today,
        };
      } else {
        newStreak = prev;
      }

      return newStreak;
    });
  }, []);

  const claimStreakReward = useCallback((day: number): boolean => {
    if (streak.currentStreak < day || streak.streakRewardsClaimed.includes(day)) {
      return false;
    }

    let rewardAmount = 0;
    switch (day) {
      case 1: rewardAmount = REWARD_AMOUNTS.STREAK_DAY_1; break;
      case 3: rewardAmount = REWARD_AMOUNTS.STREAK_DAY_3; break;
      case 7: rewardAmount = REWARD_AMOUNTS.STREAK_DAY_7; break;
      case 14: rewardAmount = REWARD_AMOUNTS.STREAK_DAY_14; break;
      case 30: rewardAmount = REWARD_AMOUNTS.STREAK_DAY_30; break;
      default: return false;
    }

    setCoins(prev => prev + rewardAmount);
    setStreak(prev => ({
      ...prev,
      streakRewardsClaimed: [...prev.streakRewardsClaimed, day],
    }));
    setPendingCoinReward({ amount: rewardAmount, eventId: `streak-${day}` });

    return true;
  }, [streak]);

  const setSkin = (skinId: string) => {
    const skin = allSkins.find(s => s.id === skinId);
    if (skin && skin.unlocked) {
      setCurrentSkinId(skinId);
    }
  };

  const setUsername = (name: string) => {
    setUsernameState(name);
  };

  const getProgressToNextLevel = () => {
    const nextLevel = userLevels.find(l => l.level === currentLevel.level + 1);
    if (!nextLevel) return 100;
    const progressInCurrentLevel = coins - currentLevel.minCoins;
    const levelRange = currentLevel.maxCoins - currentLevel.minCoins + 1;
    return Math.min((progressInCurrentLevel / levelRange) * 100, 100);
  };

  const clearNewlyUnlockedBadge = () => setNewlyUnlockedBadge(null);
  const clearPendingCoinReward = () => setPendingCoinReward(null);

  return (
    <GamificationContext.Provider
      value={{
        coins,
        currentLevel,
        currentSkin,
        allSkins,
        username,
        stats,
        streak,
        dailyChallenges,
        unlockedBadges,
        claimedEvents,
        claimReward,
        addCoins,
        setSkin,
        setUsername,
        getProgressToNextLevel,
        checkAndUnlockBadges,
        updateStreak,
        claimStreakReward,
        getBadgeProgress,
        isBadgeUnlocked,
        newlyUnlockedBadge,
        clearNewlyUnlockedBadge,
        pendingCoinReward,
        clearPendingCoinReward,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
