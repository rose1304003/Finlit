// ============================================================================
// FINLIT NETWORK - Complete Projects Data Structure
// Professional architecture with real content for each project
// ============================================================================

export type ProjectId = 
  | 'finlit-speech' 
  | 'finkids'
  | 'finright' 
  | 'finsecurity' 
  | 'fintalk' 
  | 'fincopedia'
  | 'global-money-week'
  | 'world-savings-day';

export type ContentType = 'event' | 'video' | 'article' | 'quiz' | 'news';

export interface QuizQuestion {
  id: string;
  question: {
    uz: string;
    ru: string;
    en: string;
  };
  options: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  correctIndex: number;
  explanation?: {
    uz: string;
    ru: string;
    en: string;
  };
}

export interface ProjectContent {
  id: string;
  type: ContentType;
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
  image?: string;
  videoUrl?: string;
  date: string;
  time?: string;
  location?: string;
  registrationLink?: string;
  badge?: string;
  coinReward: number;
  quiz?: QuizQuestion[];
  viewed?: boolean;
}

export interface Project {
  id: ProjectId;
  name: string;
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
  color: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  icon: string;
  telegramLink?: string;
  contents: ProjectContent[];
}

// ============================================================================
// PROJECTS DATA
// ============================================================================

export const projects: Project[] = [
  // FINLIT SPEECH - Audio sessions and workshops
  {
    id: 'finlit-speech',
    name: 'FINLIT SPEECH',
    title: {
      uz: "FINLIT SPEECH",
      ru: "FINLIT SPEECH",
      en: "FINLIT SPEECH"
    },
    description: {
      uz: "Audio sessiyalar va moliyaviy mashg'ulotlar",
      ru: "Аудио сессии и финансовые занятия",
      en: "Audio sessions and financial workshops"
    },
    color: '#A78BFA',
    gradientFrom: '#C4B5FD',
    gradientTo: '#A78BFA',
    textColor: 'text-gray-900',
    icon: '🎙️',
    contents: [
      {
        id: 'speech-event-1',
        type: 'event',
        title: {
          uz: "FINLIT NETWORK SPEECH",
          ru: "FINLIT NETWORK SPEECH",
          en: "FINLIT NETWORK SPEECH"
        },
        description: {
          uz: "FINLIT NETWORK SPEECH loyihasi doirasida yangi audio sessiya. Moliyaviy savodxonlik bo'yicha qisqa va amaliy tushunchalar: byudjet tuzish, daromad-xarajat nazorati, tejash odatlari.",
          ru: "Новая аудио сессия в рамках проекта FINLIT NETWORK SPEECH. Практические понятия по финансовой грамотности.",
          en: "New audio session as part of FINLIT NETWORK SPEECH project. Practical concepts on financial literacy."
        },
        date: '2025-02-15',
        time: '14:00',
        location: "Toshkent shahri, Alisher Navoiy ko'chasi, 1A uy",
        badge: 'SPEECH',
        registrationLink: 'https://t.me/finlitnetwork_bot',
        coinReward: 50,
      },
      {
        id: 'speech-video-1',
        type: 'video',
        title: {
          uz: "Byudjet tuzish asoslari",
          ru: "Основы бюджетирования",
          en: "Budgeting Basics"
        },
        description: {
          uz: "Shaxsiy byudjet qanday tuziladi? Daromad va xarajatlarni nazorat qilish usullari.",
          ru: "Как составить личный бюджет? Методы контроля доходов и расходов.",
          en: "How to create a personal budget? Methods for controlling income and expenses."
        },
        videoUrl: 'https://www.youtube.com/watch?v=example1',
        date: '2025-01-20',
        coinReward: 10,
      },
      {
        id: 'speech-quiz-1',
        type: 'quiz',
        title: {
          uz: "Byudjet bo'yicha test",
          ru: "Тест по бюджету",
          en: "Budget Quiz"
        },
        description: {
          uz: "Byudjet tuzish bo'yicha bilimingizni sinab ko'ring!",
          ru: "Проверьте свои знания по составлению бюджета!",
          en: "Test your budgeting knowledge!"
        },
        date: '2025-01-20',
        coinReward: 20,
        quiz: [
          {
            id: 'q1',
            question: {
              uz: "Byudjet nima?",
              ru: "Что такое бюджет?",
              en: "What is a budget?"
            },
            options: {
              uz: ["Pul yig'ish usuli", "Daromad va xarajatlar rejasi", "Bank hisobi", "Kredit"],
              ru: ["Способ накопления денег", "План доходов и расходов", "Банковский счет", "Кредит"],
              en: ["A way to save money", "A plan for income and expenses", "A bank account", "A loan"]
            },
            correctIndex: 1,
            explanation: {
              uz: "Byudjet - bu ma'lum davr uchun daromad va xarajatlar rejasi.",
              ru: "Бюджет - это план доходов и расходов на определенный период.",
              en: "A budget is a plan for income and expenses over a period of time."
            }
          },
          {
            id: 'q2',
            question: {
              uz: "50/30/20 qoidasi nima?",
              ru: "Что такое правило 50/30/20?",
              en: "What is the 50/30/20 rule?"
            },
            options: {
              uz: ["Uyqu/Ish/Dam olish nisbati", "Ehtiyoj/Xohish/Tejash nisbati", "Bank foizi", "Kredit shartlari"],
              ru: ["Соотношение сон/работа/отдых", "Соотношение потребности/желания/сбережения", "Банковский процент", "Условия кредита"],
              en: ["Sleep/Work/Rest ratio", "Needs/Wants/Savings ratio", "Bank interest", "Loan terms"]
            },
            correctIndex: 1,
            explanation: {
              uz: "50/30/20 qoidasi: 50% - zarur xarajatlar, 30% - istaklaringiz, 20% - tejash.",
              ru: "Правило 50/30/20: 50% - необходимые расходы, 30% - желания, 20% - сбережения.",
              en: "50/30/20 rule: 50% - needs, 30% - wants, 20% - savings."
            }
          },
        ]
      },
    ]
  },

  // FINKIDS - Financial literacy for children
  {
    id: 'finkids',
    name: 'FINKIDS',
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
    color: '#F472B6',
    gradientFrom: '#FBCFE8',
    gradientTo: '#F472B6',
    textColor: 'text-gray-900',
    icon: '👶',
    contents: [
      {
        id: 'finkids-event-1',
        type: 'event',
        title: {
          uz: "FINKIDS TRENING",
          ru: "FINKIDS ТРЕНИНГ",
          en: "FINKIDS TRAINING"
        },
        description: {
          uz: "Bolalar uchun moliyaviy savodxonlik mashg'uloti. Bolalar pul nima ekanini, tejash va to'g'ri sarflashni o'rganadilar.",
          ru: "Занятие по финансовой грамотности для детей. Дети узнают, что такое деньги, как экономить.",
          en: "Financial literacy training for children. Children will learn what money is, how to save."
        },
        date: '2025-03-02',
        time: '15:00',
        location: 'ACDF Library',
        badge: '2 MART',
        registrationLink: 'https://t.me/finlitnetwork_bot',
        coinReward: 50,
      },
      {
        id: 'finkids-article-1',
        type: 'article',
        title: {
          uz: "Bolalarga pulni qanday o'rgatish kerak?",
          ru: "Как научить детей обращаться с деньгами?",
          en: "How to teach children about money?"
        },
        description: {
          uz: "Bolalarga moliyaviy savodxonlikni yoshlikdan o'rgatish muhim. Maqolada amaliy maslahatlar berilgan.",
          ru: "Важно учить детей финансовой грамотности с раннего возраста. В статье даны практические советы.",
          en: "It's important to teach children financial literacy from an early age. This article provides practical tips."
        },
        date: '2025-01-15',
        coinReward: 10,
      },
      {
        id: 'finkids-quiz-1',
        type: 'quiz',
        title: {
          uz: "Bolalar uchun pul testi",
          ru: "Денежный тест для детей",
          en: "Money Quiz for Kids"
        },
        description: {
          uz: "Pul haqida qancha bilasiz? O'yin-test!",
          ru: "Сколько вы знаете о деньгах? Игровой тест!",
          en: "How much do you know about money? Fun quiz!"
        },
        date: '2025-01-18',
        coinReward: 15,
        quiz: [
          {
            id: 'k1',
            question: {
              uz: "Pul nima uchun kerak?",
              ru: "Для чего нужны деньги?",
              en: "What is money used for?"
            },
            options: {
              uz: ["O'ynash uchun", "Narsalarni sotib olish uchun", "Yig'ish uchun", "Hammasi to'g'ri"],
              ru: ["Для игры", "Для покупки вещей", "Для коллекционирования", "Все правильно"],
              en: ["To play with", "To buy things", "To collect", "All of the above"]
            },
            correctIndex: 3,
          },
        ]
      },
    ]
  },

  // Global Money Week
  {
    id: 'global-money-week',
    name: 'Global Money Week',
    title: {
      uz: "Global Money Week",
      ru: "Глобальная неделя денег",
      en: "Global Money Week"
    },
    description: {
      uz: "Xalqaro moliyaviy savodxonlik haftaligi",
      ru: "Международная неделя финансовой грамотности",
      en: "International financial literacy week"
    },
    color: '#34D399',
    gradientFrom: '#A7F3D0',
    gradientTo: '#34D399',
    textColor: 'text-gray-900',
    icon: '🌍',
    contents: [
      {
        id: 'gmw-event-1',
        type: 'event',
        title: {
          uz: "Global Money Week 2025",
          ru: "Глобальная неделя денег 2025",
          en: "Global Money Week 2025"
        },
        description: {
          uz: "Har yili mart oyida o'tkaziladigan xalqaro tadbir. Moliyaviy savodxonlik bo'yicha turli tadbirlar.",
          ru: "Международное мероприятие, проводимое каждый март. Различные мероприятия по финансовой грамотности.",
          en: "An international event held every March. Various financial literacy activities."
        },
        date: '2025-03-17',
        time: '10:00',
        location: 'Online & Tashkent',
        badge: 'GMW',
        registrationLink: 'https://t.me/finlitnetwork_bot',
        coinReward: 100,
      },
    ]
  },

  // World Savings Day
  {
    id: 'world-savings-day',
    name: 'World Savings Day',
    title: {
      uz: "World Savings Day",
      ru: "Всемирный день сбережений",
      en: "World Savings Day"
    },
    description: {
      uz: "Jahon tejamkorlik kuni - 31 oktyabr",
      ru: "Всемирный день сбережений - 31 октября",
      en: "World Savings Day - October 31"
    },
    color: '#FBBF24',
    gradientFrom: '#FDE68A',
    gradientTo: '#FBBF24',
    textColor: 'text-gray-900',
    icon: '🐷',
    contents: [
      {
        id: 'wsd-article-1',
        type: 'article',
        title: {
          uz: "Tejash nima uchun muhim?",
          ru: "Почему важно экономить?",
          en: "Why is saving important?"
        },
        description: {
          uz: "Tejash odatini shakllantirish va moliyaviy mustaqillikka erishish yo'llari.",
          ru: "Формирование привычки экономить и пути достижения финансовой независимости.",
          en: "Building a saving habit and ways to achieve financial independence."
        },
        date: '2024-10-31',
        coinReward: 10,
      },
      {
        id: 'wsd-quiz-1',
        type: 'quiz',
        title: {
          uz: "Tejamkorlik testi",
          ru: "Тест на экономию",
          en: "Savings Quiz"
        },
        description: {
          uz: "Tejash bo'yicha bilimingizni tekshiring!",
          ru: "Проверьте свои знания об экономии!",
          en: "Test your savings knowledge!"
        },
        date: '2024-10-31',
        coinReward: 20,
        quiz: [
          {
            id: 's1',
            question: {
              uz: "Favqulodda fond nima?",
              ru: "Что такое чрезвычайный фонд?",
              en: "What is an emergency fund?"
            },
            options: {
              uz: ["Oylik maosh", "Kutilmagan xarajatlar uchun jamg'arma", "Kredit", "Sug'urta"],
              ru: ["Месячная зарплата", "Накопления на непредвиденные расходы", "Кредит", "Страховка"],
              en: ["Monthly salary", "Savings for unexpected expenses", "A loan", "Insurance"]
            },
            correctIndex: 1,
          },
        ]
      },
    ]
  },

  // FINRIGHT
  {
    id: 'finright',
    name: 'FINRIGHT',
    title: {
      uz: "FINRIGHT",
      ru: "FINRIGHT",
      en: "FINRIGHT"
    },
    description: {
      uz: "Moliyaviy huquqlar va iste'molchilar himoyasi",
      ru: "Финансовые права и защита потребителей",
      en: "Financial rights and consumer protection"
    },
    color: '#10B981',
    gradientFrom: '#6EE7B7',
    gradientTo: '#10B981',
    textColor: 'text-white',
    icon: '⚖️',
    contents: [
      {
        id: 'finright-article-1',
        type: 'article',
        title: {
          uz: "Bank mijozlari huquqlari",
          ru: "Права клиентов банков",
          en: "Bank customer rights"
        },
        description: {
          uz: "Bank xizmatlaridan foydalanishda sizning huquqlaringiz. Shikoyat qanday yoziladi?",
          ru: "Ваши права при использовании банковских услуг. Как написать жалобу?",
          en: "Your rights when using banking services. How to file a complaint?"
        },
        date: '2025-01-10',
        coinReward: 10,
      },
    ]
  },

  // FINSECURITY
  {
    id: 'finsecurity',
    name: 'FINSECURITY',
    title: {
      uz: "FINSECURITY",
      ru: "FINSECURITY",
      en: "FINSECURITY"
    },
    description: {
      uz: "Moliyaviy xavfsizlik va firibgarlikdan himoya",
      ru: "Финансовая безопасность и защита от мошенничества",
      en: "Financial security and fraud protection"
    },
    color: '#EF4444',
    gradientFrom: '#FCA5A5',
    gradientTo: '#EF4444',
    textColor: 'text-white',
    icon: '🛡️',
    contents: [
      {
        id: 'finsec-article-1',
        type: 'article',
        title: {
          uz: "Firibgarlikdan qanday himoyalanish?",
          ru: "Как защититься от мошенничества?",
          en: "How to protect yourself from fraud?"
        },
        description: {
          uz: "Internet firibgarlari usullari va ulardan himoyalanish. SMS va telefon firibgarligi.",
          ru: "Методы интернет-мошенников и защита от них. SMS и телефонное мошенничество.",
          en: "Internet scammer methods and protection. SMS and phone fraud."
        },
        date: '2025-01-12',
        coinReward: 10,
      },
      {
        id: 'finsec-quiz-1',
        type: 'quiz',
        title: {
          uz: "Xavfsizlik testi",
          ru: "Тест безопасности",
          en: "Security Quiz"
        },
        description: {
          uz: "Moliyaviy xavfsizlik bo'yicha bilimingizni sinang!",
          ru: "Проверьте знания по финансовой безопасности!",
          en: "Test your financial security knowledge!"
        },
        date: '2025-01-12',
        coinReward: 20,
        quiz: [
          {
            id: 'sec1',
            question: {
              uz: "Bank hech qachon nima so'ramaydi?",
              ru: "Что банк никогда не спрашивает?",
              en: "What does a bank never ask for?"
            },
            options: {
              uz: ["Ismingiz", "Karta raqami va CVV", "Telefon raqami", "Manzil"],
              ru: ["Ваше имя", "Номер карты и CVV", "Номер телефона", "Адрес"],
              en: ["Your name", "Card number and CVV", "Phone number", "Address"]
            },
            correctIndex: 1,
            explanation: {
              uz: "Bank hech qachon karta raqami, CVV yoki PIN-kod so'ramaydi!",
              ru: "Банк никогда не спрашивает номер карты, CVV или PIN-код!",
              en: "A bank never asks for your card number, CVV or PIN!"
            }
          },
        ]
      },
    ]
  },

  // FINTALK
  {
    id: 'fintalk',
    name: 'FINTALK',
    title: {
      uz: "FINTALK",
      ru: "FINTALK",
      en: "FINTALK"
    },
    description: {
      uz: "Moliyaviy podkastlar va suhbatlar",
      ru: "Финансовые подкасты и беседы",
      en: "Financial podcasts and talks"
    },
    color: '#8B5CF6',
    gradientFrom: '#C4B5FD',
    gradientTo: '#8B5CF6',
    textColor: 'text-white',
    icon: '🎧',
    contents: [
      {
        id: 'fintalk-video-1',
        type: 'video',
        title: {
          uz: "Kredit tarixi haqida",
          ru: "О кредитной истории",
          en: "About credit history"
        },
        description: {
          uz: "Kredit tarixini qanday yaxshilash mumkin? Kredit reyting nima?",
          ru: "Как улучшить кредитную историю? Что такое кредитный рейтинг?",
          en: "How to improve credit history? What is a credit rating?"
        },
        videoUrl: 'https://www.youtube.com/watch?v=example2',
        date: '2025-01-08',
        coinReward: 10,
      },
    ]
  },

  // FINCOPEDIA
  {
    id: 'fincopedia',
    name: 'FINCOPEDIA',
    title: {
      uz: "FINCOPEDIA",
      ru: "FINCOPEDIA",
      en: "FINCOPEDIA"
    },
    description: {
      uz: "Moliyaviy terminlar lug'ati",
      ru: "Словарь финансовых терминов",
      en: "Dictionary of financial terms"
    },
    color: '#F59E0B',
    gradientFrom: '#FDE68A',
    gradientTo: '#F59E0B',
    textColor: 'text-white',
    icon: '📚',
    contents: []  // Uses glossary data instead
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getProjectById = (id: ProjectId): Project | undefined => {
  return projects.find(p => p.id === id);
};

export const getAllContents = (): (ProjectContent & { projectId: ProjectId; project: Project })[] => {
  const allContents: (ProjectContent & { projectId: ProjectId; project: Project })[] = [];
  
  projects.forEach(project => {
    project.contents.forEach(content => {
      allContents.push({
        ...content,
        projectId: project.id,
        project
      });
    });
  });

  return allContents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getUpcomingEvents = (): (ProjectContent & { projectId: ProjectId; project: Project })[] => {
  const now = new Date();
  return getAllContents()
    .filter(c => c.type === 'event' && new Date(c.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getProjectsForCarousel = (): Project[] => {
  return projects.filter(p => 
    ['finlit-speech', 'finkids', 'global-money-week', 'world-savings-day'].includes(p.id)
  );
};

export const getMainProjects = (): Project[] => {
  return projects.filter(p => 
    ['finright', 'finsecurity', 'fintalk', 'finkids', 'fincopedia', 'finlit-speech'].includes(p.id)
  );
};
