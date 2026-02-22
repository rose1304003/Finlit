import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, MapPin, Clock, Calendar, Share2, ExternalLink } from 'lucide-react';

interface ProjectEvent {
  id: string;
  title: string;
  badge?: string;
  time?: string;
  date?: string;
  location?: string;
  image: string;
  colorScheme: 'green' | 'pink' | 'blue' | 'purple';
  description: {
    uz: string;
    ru: string;
    en: string;
  };
  details?: {
    uz: string[];
    ru: string[];
    en: string[];
  };
}

const projectEvents: ProjectEvent[] = [
  {
    id: 'finlit-speech',
    title: 'FINLIT NETWORK',
    badge: 'SPEECH',
    time: '14:00',
    image: '/events/finlit-speech.png',
    colorScheme: 'green',
    location: "Toshkent shahri, Alisher Navoiy ko'chasi, 1A uy",
    description: {
      uz: "FINLIT NETWORK SPEECH (14:00) loyihasi doirasida yangi audio sessiya ishga tushdi. Unda moliyaviy savodxonlik bo'yicha qisqa va amaliy tushunchalar beriladi: budjet tuzish, daromad-xarajat nazorati, tejash odatlari, maqsad qo'yish jamg'arma va oddiy investitsiya prinsiplari. Sessiya formati: 10-15 daqiqalik audio + asosiy xulosalar + kichik test. Ishtirokchilar savollarni yuborishi mumkin, eng ko'p berilgan savollarga keyingi chiqishda javob beriladi.",
      ru: "В рамках проекта FINLIT NETWORK SPEECH (14:00) запущена новая аудиосессия. В ней даются краткие и практические понятия по финансовой грамотности: составление бюджета, контроль доходов и расходов, привычки экономии, постановка целей, принципы накопления и простых инвестиций.",
      en: "As part of the FINLIT NETWORK SPEECH (14:00) project, a new audio session has been launched. It provides brief and practical concepts on financial literacy: budgeting, income and expense control, saving habits, goal setting, principles of savings and simple investments."
    },
    details: {
      uz: [
        "Loyiha yoshlar va keng auditoriya uchun moliyaviy bilimlarni qulay platformada shakllantirishga yordam beradigan qulay platformada ishlab chiqilgan.",
        "Har bir audio sessiya foydalanuvchini o'z moliyasini oqil boshqarishga undaydi va barqaror moliyaviy kelajak sari yetaklaydi."
      ],
      ru: [
        "Проект разработан на удобной платформе для формирования финансовых знаний у молодежи и широкой аудитории.",
        "Каждая аудиосессия побуждает пользователя разумно управлять своими финансами и ведет к стабильному финансовому будущему."
      ],
      en: [
        "The project is developed on a convenient platform to help young people and a wide audience develop financial knowledge.",
        "Each audio session encourages users to manage their finances wisely and leads to a stable financial future."
      ]
    }
  },
  {
    id: 'finkids-trening',
    title: 'FINKIDS',
    badge: '2 MART',
    time: 'SOAT 15:00',
    date: '2 mart',
    location: 'ACDF Library',
    image: '/events/finkids.png',
    colorScheme: 'pink',
    description: {
      uz: "FINKIDS — bolalar uchun mo'ljallangan interaktiv moliyaviy savodxonlik dasturi. Ushbu dastur bolalarga puning qiymatini tushunish, tejash, to'g'ri tanlov qilish va mas'uliyatli o'rganishga yordam beradi.",
      ru: "FINKIDS — интерактивная программа финансовой грамотности, предназначенная для детей. Эта программа помогает детям понять ценность денег, экономить, делать правильный выбор и учиться ответственности.",
      en: "FINKIDS is an interactive financial literacy program designed for children. This program helps children understand the value of money, save, make the right choices, and learn responsibility."
    },
    details: {
      uz: [
        "pul nima ekanini va qayerdan kelishini;",
        "cho'ntak pulini to'g'ri sarflashni;",
        "tejash nima uchun muhimligini;",
        "maqsad qo'yish va orzu uchun jamg'arishni;",
        "xarid qilishda to'g'ri tanlov qilishni o'yinlar, rasmlar va kichik topshiriqlar orqali o'rganadılar."
      ],
      ru: [
        "что такое деньги и откуда они берутся;",
        "как правильно тратить карманные деньги;",
        "почему важно экономить;",
        "ставить цели и копить на мечту;",
        "делать правильный выбор при покупке через игры, рисунки и небольшие задания."
      ],
      en: [
        "what money is and where it comes from;",
        "how to spend pocket money wisely;",
        "why saving is important;",
        "setting goals and saving for dreams;",
        "making the right choice when buying through games, pictures, and small tasks."
      ]
    }
  }
];

const ProjectNewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const event = projectEvents.find(e => e.id === id);

  const labels = {
    title: { uz: "Loyihalar bo'yicha yangiliklar", ru: "Новости проектов", en: "Project Updates" },
    register: { uz: "Ro'yxatdan o'tish", ru: "Регистрация", en: "Register" },
    share: { uz: "Ulashish", ru: "Поделиться", en: "Share" },
    location: { uz: "Manzil", ru: "Адрес", en: "Location" },
    time: { uz: "Vaqt", ru: "Время", en: "Time" },
    date: { uz: "Sana", ru: "Дата", en: "Date" },
    learnMore: { uz: "Mashg'ulot davomida bolalar:", ru: "Во время занятий дети:", en: "During the session children:" },
  };

  if (!event) {
    return (
      <Layout showBack title={labels.title[language]}>
        <div className="px-4 py-8 text-center">
          <p className="text-muted-foreground">Event not found</p>
        </div>
      </Layout>
    );
  }

  const colorClasses = {
    green: 'bg-gradient-to-r from-primary to-primary-dark',
    pink: 'bg-gradient-to-r from-gray-100 to-gray-200',
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="font-semibold text-foreground">{labels.title[language]}</h1>
        </div>
      </div>

      <div className="px-4 py-4 pb-32">
        {/* Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl overflow-hidden mb-6 ${colorClasses[event.colorScheme]}`}
        >
          <div className="p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className={`text-2xl font-bold ${event.colorScheme === 'pink' ? 'text-gray-900' : 'text-white'}`}>
                  {event.title.split(' ')[0]}
                </h2>
                {event.badge && (
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    event.colorScheme === 'pink' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-yellow-400 text-gray-900'
                  }`}>
                    {event.badge}
                  </span>
                )}
              </div>
              <p className={`text-xl font-bold ${event.colorScheme === 'pink' ? 'text-gray-900' : 'text-white'}`}>
                {event.title.split(' ').slice(1).join(' ')}
              </p>
              {event.time && (
                <p className={`text-sm mt-1 ${event.colorScheme === 'pink' ? 'text-gray-600' : 'text-white/80'}`}>
                  {event.time}
                </p>
              )}
              {event.location && event.colorScheme === 'pink' && (
                <p className="text-xs text-gray-500 mt-1">{event.location}</p>
              )}
            </div>
            <div className="w-20 h-20">
              {event.colorScheme === 'green' ? (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl">📚</span>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl">🌍</span>
                </div>
              )}
            </div>
          </div>
          {event.colorScheme === 'pink' && (
            <div className="flex h-2">
              <div className="flex-1 bg-red-400"></div>
              <div className="flex-1 bg-orange-400"></div>
              <div className="flex-1 bg-yellow-400"></div>
              <div className="flex-1 bg-green-400"></div>
              <div className="flex-1 bg-blue-400"></div>
            </div>
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <p className="text-foreground leading-relaxed">
            {event.description[language]}
          </p>

          {event.details && (
            <>
              <p className="font-medium text-foreground">{labels.learnMore[language]}</p>
              <ul className="space-y-2">
                {event.details[language].map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Event Details */}
          <div className="bg-card rounded-xl p-4 space-y-3 mt-6">
            {event.date && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{labels.date[language]}</p>
                  <p className="font-medium text-foreground">{event.date}</p>
                </div>
              </div>
            )}
            {event.time && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{labels.time[language]}</p>
                  <p className="font-medium text-foreground">{event.time}</p>
                </div>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{labels.location[language]}</p>
                  <p className="font-medium text-foreground">{event.location}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium">
          <ExternalLink className="w-5 h-5" />
          {labels.register[language]}
        </button>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-xl font-medium">
          <Share2 className="w-5 h-5" />
          {labels.share[language]}
        </button>
      </div>
    </div>
  );
};

export default ProjectNewsDetail;
