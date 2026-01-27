import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { projects } from '@/data/projects';
import { Search, Bell, ChevronRight, Baby, GraduationCap, Users, Briefcase, Trophy } from 'lucide-react';
import mascotImage from '@/assets/mascot.png';

// Audience categories
const audienceCategories = [
  { id: 'children', icon: Baby, label: { uz: "Bolalar", ru: "Дети", en: "Children" } },
  { id: 'teens', icon: GraduationCap, label: { uz: "O'smirlar", ru: "Подростки", en: "Teens" } },
  { id: 'adults', icon: Users, label: { uz: "Kattalar", ru: "Взрослые", en: "Adults" } },
  { id: 'students', icon: Briefcase, label: { uz: "Talabalar", ru: "Студенты", en: "Students" } },
];

// Project events for horizontal scroll
const projectEvents = [
  {
    id: 'finlit-speech',
    title: 'FINLIT NETWORK',
    badge: 'SPEECH',
    time: '14:00',
    bgColor: 'bg-gradient-to-r from-primary to-primary-dark',
    textColor: 'text-white',
    badgeColor: 'bg-yellow-400 text-gray-900',
    icon: '📚',
  },
  {
    id: 'finkids-trening',
    title: 'FINKIDS TRENING',
    badge: '2 MART',
    time: 'SOAT 15:00',
    subtitle: 'ACDF LIBRARY',
    bgColor: 'bg-gradient-to-r from-gray-100 to-gray-200',
    textColor: 'text-gray-900',
    badgeColor: 'bg-gray-900 text-white',
    icon: '🌍',
    hasRainbow: true,
  },
];

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const { coins, username, updateStreak } = useGamification();
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);

  // Update streak on page load
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const labels = {
    search: { uz: "Qidirish...", ru: "Поиск...", en: "Search..." },
    welcome: { uz: "FINLIT NETWORK ILOVASIGA XUSH KELIBSIZ!", ru: "ДОБРО ПОЖАЛОВАТЬ В FINLIT NETWORK!", en: "WELCOME TO FINLIT NETWORK!" },
    chooseAudience: { uz: "Qaysi yo'llarni tanlaysiz?", ru: "Какую категорию выбираете?", en: "Which category do you choose?" },
    projectUpdates: { uz: "Loyihalar bo'yicha yangiliklar", ru: "Новости проектов", en: "Project Updates" },
    allProjects: { uz: "Barcha loyihalar", ru: "Все проекты", en: "All Projects" },
    leaderboard: { uz: "Top o'quvchilar", ru: "Топ учеников", en: "Top Learners" },
  };

  return (
    <Layout hideHeader>
      <div className="pb-24">
        {/* Custom Header */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-white"
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/profile')}
              >
                <img src={mascotImage} alt="Profile" className="w-full h-full object-cover" />
              </motion.div>
              <div>
                <p className="font-bold text-foreground">{username || 'Gafurova Anora'}</p>
                <p className="text-xs text-muted-foreground">@{(username || 'anora').toLowerCase().replace(/\s/g, '_')}_17</p>
              </div>
            </div>
            
            {/* Coins Badge */}
            <motion.div 
              className="coin-badge"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/profile')}
            >
              <span className="font-bold">{coins}</span>
              <span>🪙</span>
            </motion.div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3">
          <motion.button
            onClick={() => navigate('/search')}
            className="w-full flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl"
            whileTap={{ scale: 0.98 }}
          >
            <Search className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground flex-1 text-left">{labels.search[language]}</span>
            <Bell className="w-5 h-5 text-primary" />
          </motion.button>
        </div>

        {/* Welcome Banner */}
        <motion.div 
          className="mx-4 mb-4 p-4 bg-gradient-to-r from-primary to-primary-dark rounded-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <h2 className="text-lg font-bold text-yellow-400">FINLIT NETWORK</h2>
              <p className="text-sm text-white">ILOVASIGA</p>
              <p className="text-sm text-white">XUSH KELIBSIZ!</p>
            </div>
            <motion.div 
              className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img src={mascotImage} alt="FinFox" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </motion.div>

        {/* Audience Selection */}
        <div className="px-4 mb-4">
          <p className="text-sm font-medium text-foreground mb-3">{labels.chooseAudience[language]}</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {audienceCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedAudience(selectedAudience === category.id ? null : category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedAudience === category.id
                    ? 'bg-primary text-white'
                    : 'bg-card border border-border text-foreground'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <category.icon className="w-4 h-4" />
                {category.label[language]}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project Updates - Horizontal Scroll */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="font-semibold text-foreground">{labels.projectUpdates[language]}</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {projectEvents.map((event, index) => (
              <motion.button
                key={event.id}
                onClick={() => navigate(`/events/${event.id}`)}
                className={`flex-shrink-0 w-72 ${event.bgColor} rounded-2xl overflow-hidden relative`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-lg font-bold ${event.textColor}`}>
                        {event.title.split(' ')[0]}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${event.badgeColor}`}>
                        {event.badge}
                      </span>
                    </div>
                    <p className={`font-bold ${event.textColor}`}>
                      {event.title.split(' ').slice(1).join(' ')}
                    </p>
                    <p className={`text-sm ${event.textColor} opacity-80`}>{event.time}</p>
                    {event.subtitle && (
                      <p className={`text-xs ${event.textColor} opacity-60`}>{event.subtitle}</p>
                    )}
                  </div>
                  <span className="text-4xl">{event.icon}</span>
                </div>
                {event.hasRainbow && (
                  <div className="flex h-1.5">
                    <div className="flex-1 bg-red-400"></div>
                    <div className="flex-1 bg-orange-400"></div>
                    <div className="flex-1 bg-yellow-400"></div>
                    <div className="flex-1 bg-green-400"></div>
                    <div className="flex-1 bg-blue-400"></div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
          {/* Dots indicator */}
          <div className="flex justify-center gap-1.5 mt-2">
            <div className="w-6 h-1.5 rounded-full bg-primary"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-muted"></div>
          </div>
        </div>

        {/* All Projects Section */}
        <div className="px-4 mb-4">
          <motion.button
            onClick={() => navigate('/projects')}
            className="w-full flex items-center justify-between py-3"
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-semibold text-foreground">{labels.allProjects[language]}</h3>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>
          
          {/* Project Grid */}
          <div className="grid grid-cols-2 gap-3">
            {projects.slice(0, 4).map((project, index) => (
              <motion.button
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="relative overflow-hidden rounded-2xl aspect-[4/3]"
                style={{ 
                  background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)`,
                  borderColor: project.color,
                  borderWidth: 1,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 p-3 flex flex-col justify-between">
                  <h4 className="font-semibold text-foreground text-sm text-left line-clamp-2">
                    {project.title[language]}
                  </h4>
                  <div className="flex justify-end">
                    <span className="text-3xl">{project.icon}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <motion.button
          onClick={() => navigate('/leaderboard')}
          className="mx-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-foreground">{labels.leaderboard[language]}</h3>
              <p className="text-sm text-muted-foreground">🥇 Anora - 604 | 🥈 Karina - 597</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.button>
      </div>
    </Layout>
  );
};

export default Index;
