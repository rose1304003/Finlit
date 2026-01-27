export interface Project {
  id: string;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  icon: string;
  color: string;
  category: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'global-money-week',
    title: {
      uz: "Global Money Week",
      ru: "Глобальная неделя денег",
      en: "Global Money Week"
    },
    description: {
      uz: "Xalqaro moliyaviy savodxonlik tadbirlari",
      ru: "Международные мероприятия по финансовой грамотности",
      en: "International financial literacy events"
    },
    icon: "🌍",
    color: "#10B981",
    category: "event"
  },
  {
    id: 'world-savings-day',
    title: {
      uz: "World Savings Day",
      ru: "Всемирный день сбережений",
      en: "World Savings Day"
    },
    description: {
      uz: "Jahon tejamkorlik kuni tadbirlari",
      ru: "Мероприятия Всемирного дня сбережений",
      en: "World Savings Day events"
    },
    icon: "🐷",
    color: "#F59E0B",
    category: "event"
  },
  {
    id: 'finlit-speech',
    title: {
      uz: "FINLIT SPEECH",
      ru: "FINLIT SPEECH",
      en: "FINLIT SPEECH"
    },
    description: {
      uz: "Audio podkastlar va moliyaviy mashg'ulotlar",
      ru: "Аудио подкасты и финансовые занятия",
      en: "Audio podcasts and financial sessions"
    },
    icon: "🎙️",
    color: "#8B5CF6",
    category: "education"
  },
  {
    id: 'finkids',
    title: {
      uz: "FINKIDS",
      ru: "FINKIDS",
      en: "FINKIDS"
    },
    description: {
      uz: "Bolalar uchun moliyaviy savodxonlik",
      ru: "Финансовая грамотность для детей",
      en: "Financial literacy for children"
    },
    icon: "👶",
    color: "#EC4899",
    category: "education"
  },
  {
    id: 'finteens',
    title: {
      uz: "FINTEENS",
      ru: "FINTEENS",
      en: "FINTEENS"
    },
    description: {
      uz: "O'smirlar uchun moliyaviy ta'lim",
      ru: "Финансовое образование для подростков",
      en: "Financial education for teenagers"
    },
    icon: "🎓",
    color: "#3B82F6",
    category: "education"
  },
  {
    id: 'olimpiada',
    title: {
      uz: "Olimpiadalar",
      ru: "Олимпиады",
      en: "Olympiads"
    },
    description: {
      uz: "Moliyaviy savodxonlik olimpiadalari",
      ru: "Олимпиады по финансовой грамотности",
      en: "Financial literacy olympiads"
    },
    icon: "🏆",
    color: "#EF4444",
    category: "competition"
  },
  {
    id: 'keys-championship',
    title: {
      uz: "Keys-chempionat",
      ru: "Кейс-чемпионат",
      en: "Case Championship"
    },
    description: {
      uz: "Moliyaviy keys yechish musobaqasi",
      ru: "Соревнование по решению финансовых кейсов",
      en: "Financial case solving competition"
    },
    icon: "🔑",
    color: "#14B8A6",
    category: "competition"
  },
  {
    id: 'treninglar',
    title: {
      uz: "Treninglar",
      ru: "Тренинги",
      en: "Trainings"
    },
    description: {
      uz: "Moliyaviy savodxonlik treninglari",
      ru: "Тренинги по финансовой грамотности",
      en: "Financial literacy trainings"
    },
    icon: "📚",
    color: "#6366F1",
    category: "education"
  },
  {
    id: 'ambassadorlar',
    title: {
      uz: "Ambassadorlar",
      ru: "Амбассадоры",
      en: "Ambassadors"
    },
    description: {
      uz: "Moliyaviy savodxonlik ambassadorlari dasturi",
      ru: "Программа амбассадоров финансовой грамотности",
      en: "Financial literacy ambassadors program"
    },
    icon: "🌟",
    color: "#F97316",
    category: "program"
  },
  {
    id: 'video-darslar',
    title: {
      uz: "Video darslar",
      ru: "Видео уроки",
      en: "Video Lessons"
    },
    description: {
      uz: "Moliyaviy savodxonlik video darslari",
      ru: "Видео уроки по финансовой грамотности",
      en: "Financial literacy video lessons"
    },
    icon: "🎬",
    color: "#DC2626",
    category: "education"
  },
  {
    id: 'kalkulyatorlar',
    title: {
      uz: "Kalkulyatorlar",
      ru: "Калькуляторы",
      en: "Calculators"
    },
    description: {
      uz: "Depozit va kredit kalkulyatorlari",
      ru: "Калькуляторы депозитов и кредитов",
      en: "Deposit and credit calculators"
    },
    icon: "🧮",
    color: "#0891B2",
    category: "tools"
  },
  {
    id: 'kitoblar',
    title: {
      uz: "Kitoblar",
      ru: "Книги",
      en: "Books"
    },
    description: {
      uz: "Moliyaviy savodxonlik bo'yicha kitoblar",
      ru: "Книги по финансовой грамотности",
      en: "Books on financial literacy"
    },
    icon: "📖",
    color: "#7C3AED",
    category: "resources"
  },
];

// Get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(p => p.category === category);
};

// Get all unique categories
export const getCategories = (): string[] => {
  return [...new Set(projects.map(p => p.category))];
};
