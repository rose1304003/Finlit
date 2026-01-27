import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Lightbulb, BookOpen, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavItem {
  path: string;
  icon: React.FC<{ className?: string }>;
  label: {
    uz: string;
    ru: string;
    en: string;
  };
}

const navItems: NavItem[] = [
  {
    path: '/',
    icon: Home,
    label: { uz: "Uy", ru: "Главная", en: "Home" },
  },
  {
    path: '/projects',
    icon: Lightbulb,
    label: { uz: "Loyihalar", ru: "Проекты", en: "Projects" },
  },
  {
    path: '/glossary',
    icon: BookOpen,
    label: { uz: "Lug'at", ru: "Глоссарий", en: "Glossary" },
  },
  {
    path: '/profile',
    icon: User,
    label: { uz: "Profil", ru: "Профиль", en: "Profile" },
  },
];

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-primary' : ''}`} />
              <span className={`text-[10px] mt-1 font-medium relative z-10 ${isActive ? 'text-primary' : ''}`}>
                {item.label[language]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
