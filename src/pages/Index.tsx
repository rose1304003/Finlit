import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import NewsCarousel from '@/components/NewsCarousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { getMainProjects, Project } from '@/data/projects';
import { 
  Search, 
  Bell, 
  ChevronRight, 
  Baby, 
  GraduationCap, 
  Users, 
  Briefcase, 
  Trophy,
  BookOpen,
  Flame
} from 'lucide-react';
import mascotImage from '@/assets/mascot.png';

// Audience categories
const audienceCategories = [
  { id: 'children', icon: Baby, label: { uz: "Bolalar", ru: "Дети", en: "Children" } },
  { id: 'teens', icon: GraduationCap, label: { uz: "O'smirlar", ru: "Подростки", en: "Teens" } },
  { id: 'adults', icon: Users, label: { uz: "Kattalar", ru: "Взрослые", en: "Adults" } },
  { id: 'students', icon: Briefcase, label: { uz: "Talabalar", ru: "Студенты", en: "Students" } },
];

const Index: React.FC = () => {
  const { language } = useLanguage();
  const { coins, username, updateStreak, streak, dailyChallenges, currentLevel } = useGamification();
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);

  const mainProjects = getMainProjects();

  // Update streak on page load
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const labels = {
    search: { uz: "Qidirish...", ru: "Поиск...", en: "Search..." },
    projectUpdates: { uz: "Loyihalar bo'yicha yangiliklar", ru: "Новости проектов", en: "Project Updates" },
    allProjects: { uz: "Barcha loyihalar", ru: "Все проекты", en: "All Projects" },
    leaderboard: { uz: "Top o'quvchilar", ru: "Топ учеников", en: "Top Learners" },
    glossary: { uz: "Lug'at", ru: "Словарь", en: "Glossary" },
    dailyChallenges: { uz: "Kunlik vazifalar", ru: "Ежедневные задания", en: "Daily Challenges" },
  };

  const displayName = username || 'Gafurova Anora';
  const displayHandle = `@${(username || 'anora').toLowerCase().replace(/\s/g, '_')}_17`;

  // Count incomplete daily challenges
  const incompleteChallenges = dailyChallenges.filter(c => !c.completed).length;

  return (
    <Layout hideHeader>
      <div className="pb-24">
        {/* Custom Header */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            {/* User Info */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate('/profile')}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 bg-white">
                <img src={mascotImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-foreground">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayHandle}</p>
              </div>
            </motion.div>
            
            {/* Coins Badge */}
            <motion.div 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full cursor-pointer"
              onClick={() => navigate('/profile')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-bold text-primary">{coins}</span>
              <span className="text-lg">🪙</span>
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

        {/* Welcome Banner with Streak */}
        <motion.div 
          className="mx-4 mb-4 p-4 bg-gradient-to-r from-[#13593F] to-[#0f4a33] rounded-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <h2 className="text-lg font-bold text-[#FFEE5A]">FINLIT NETWORK</h2>
              <p className="text-sm text-white">ILOVASIGA XUSH KELIBSIZ!</p>
              
              {/* Streak indicator */}
              {streak.currentStreak > 0 && (
                <div className="flex items-center gap-1 mt-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-orange-300 font-medium">
                    {streak.currentStreak} {language === 'uz' ? 'kunlik streak' : 'day streak'}
                  </span>
                </div>
              )}
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

        {/* Daily Challenges Quick Access */}
        {incompleteChallenges > 0 && (
          <motion.button
            onClick={() => navigate('/challenges')}
            className="mx-4 mb-4 p-3 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-xl border border-orange-200 dark:border-orange-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-foreground text-sm">{labels.dailyChallenges[language]}</p>
                <p className="text-xs text-muted-foreground">
                  {incompleteChallenges} {language === 'uz' ? 'ta vazifa bajarilmagan' : 'tasks remaining'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </motion.button>
        )}

        {/* Audience Selection Pills */}
        <div className="px-4 mb-4">
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

        {/* Project Updates Carousel */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="font-semibold text-foreground">{labels.projectUpdates[language]}</h3>
          </div>
          <NewsCarousel autoScrollInterval={5000} />
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
            {mainProjects.slice(0, 6).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <motion.button
          onClick={() => navigate('/leaderboard')}
          className="mx-4 mb-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-700"
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

        {/* Finance World Game */}
        <motion.button
          onClick={() => window.open('https://financeworld.uz/', '_blank')}
          className="mx-4 mb-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl border border-purple-200 dark:border-purple-700"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-foreground">Finance World</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'uz' ? "O'yin orqali moliyani o'rganing!" : 'Learn finance through games!'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.button>

        {/* Glossary Quick Access */}
        <motion.button
          onClick={() => navigate('/glossary')}
          className="mx-4 p-4 bg-card rounded-2xl border border-border"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-foreground">{labels.glossary[language]}</h3>
              <p className="text-sm text-muted-foreground">+5 🪙 {language === 'uz' ? 'har bir atama uchun' : 'per term'}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </motion.button>
      </div>
    </Layout>
  );
};

// Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <motion.button
      onClick={() => navigate(`/projects/${project.id}`)}
      className="relative overflow-hidden rounded-2xl aspect-square"
      style={{ 
        background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="absolute inset-0 p-3 flex flex-col justify-between">
        {/* Project Name */}
        <div 
          className="px-2 py-1 rounded-lg text-xs font-bold self-start bg-white/30 backdrop-blur-sm"
          style={{ color: project.textColor === 'text-white' ? 'white' : '#1f2937' }}
        >
          {project.name}
        </div>
        
        {/* Content count & Icon */}
        <div className="flex items-end justify-between">
          {project.contents.length > 0 && (
            <span className="text-xs font-medium px-2 py-0.5 bg-white/50 rounded-full text-gray-800">
              {project.contents.length} {language === 'uz' ? 'ta' : ''}
            </span>
          )}
          <span className="text-3xl">{project.icon}</span>
        </div>
      </div>
    </motion.button>
  );
};

export default Index;
