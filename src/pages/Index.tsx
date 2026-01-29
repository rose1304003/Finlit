import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import UserHeader from '@/components/UserHeader';
import WelcomeBanner from '@/components/WelcomeBanner';
import ProjectUpdateCard from '@/components/ProjectUpdateCard';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import LevelProgress from '@/components/LevelProgress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { projects } from '@/data/projects';
import { Baby, GraduationCap, Users, Briefcase } from 'lucide-react';

const audiences = [
  { id: 'kids', icon: Baby, labelKey: 'kids' },
  { id: 'teens', icon: GraduationCap, labelKey: 'teens' },
  { id: 'adults', icon: Users, labelKey: 'adults' },
  { id: 'students', icon: Briefcase, labelKey: 'students' },
];

const projectColorSchemes: Array<'pink' | 'blue' | 'orange' | 'purple' | 'green' | 'cyan'> = [
  'green', 'pink', 'blue', 'orange', 'purple', 'cyan'
];

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const _gamification = useGamification();
  const [selectedAudience, setSelectedAudience] = useState<string>(() => {
    return localStorage.getItem('selectedAudience') || 'kids';
  });

  useEffect(() => {
    localStorage.setItem('selectedAudience', selectedAudience);
  }, [selectedAudience]);

  const audienceLabels = {
    kids: { uz: "Bolalar", ru: "Дети", en: "Kids" },
    teens: { uz: "O'smirlar", ru: "Подростки", en: "Teens" },
    adults: { uz: "Kattalar", ru: "Взрослые", en: "Adults" },
    students: { uz: "Talabalar", ru: "Студенты", en: "Students" },
  };

  return (
    <Layout>
      <div className="pb-6">
        {/* User Header with Coins */}
        <UserHeader />

        {/* Welcome Banner */}
        <WelcomeBanner />

        {/* Audience Selection Pills */}
        <motion.section 
          className="px-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium text-muted-foreground mb-2">
            {language === 'uz' ? "Qaysi yo'llarni tanlaysiz?" : 
             language === 'ru' ? "Какой путь выберете?" : "Choose your path"}
          </p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              const isActive = selectedAudience === audience.id;
              return (
                <motion.button
                  key={audience.id}
                  onClick={() => setSelectedAudience(audience.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'bg-card text-foreground border border-border hover:border-primary/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{audienceLabels[audience.id as keyof typeof audienceLabels][language]}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Level Progress */}
        <LevelProgress />

        {/* Project Updates - Horizontal Scroll */}
        <section className="mb-6">
          <SectionHeader
            title={language === 'uz' ? "Loyihalar bo'yicha yangiliklar" : 
                   language === 'ru' ? "Новости проектов" : "Project Updates"}
          />
          <div className="px-4 flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            <ProjectUpdateCard
              id="finlit-network"
              title="FINLIT NETWORK"
              badge="SPEECH"
              time="14:00"
              colorScheme="green"
              index={0}
            />
            <ProjectUpdateCard
              id="finkids"
              title="FINKIDS TRENING"
              badge="2 MART"
              time="SOAT 15:00"
              colorScheme="pink"
              index={1}
            />
          </div>
          {/* Scroll Indicator */}
          <div className="flex justify-center gap-1.5 mt-2">
            <div className="w-6 h-1.5 rounded-full bg-primary"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-muted"></div>
          </div>
        </section>

        {/* All Projects Section */}
        <section className="mb-6">
          <SectionHeader
            title={language === 'uz' ? "Barcha loyihalar" : 
                   language === 'ru' ? "Все проекты" : "All Projects"}
            viewAllLink="/projects"
            viewAllLabel={t('viewAll')}
          />
          <div className="px-4 grid grid-cols-2 gap-3">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title[language]}
                description={project.description[language]}
                icon={project.icon}
                colorScheme={projectColorSchemes[index % projectColorSchemes.length]}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-8 px-4 pb-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">{t('developedBy')}</p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">{t('aboutProject')}</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">{t('privacyPolicy')}</a>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
