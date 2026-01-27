import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeaderProps {
  showSearch?: boolean;
  showBack?: boolean;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ showBack = false, title }) => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const languages: Language[] = ['uz', 'ru', 'en'];

  const handleLanguageChange = () => {
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const getFlag = (lang: Language) => {
    const flags: Record<Language, string> = {
      uz: '🇺🇿',
      ru: '🇷🇺',
      en: '🇬🇧',
    };
    return flags[lang];
  };

  // Home page doesn't need a header - it uses UserHeader
  if (isHome) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border safe-top">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Back button */}
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-foreground touch-active"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          ) : (
            <div className="w-6" />
          )}

          {/* Center: Title */}
          {title && (
            <h1 className="font-bold text-lg text-foreground flex-1 text-center">
              {title}
            </h1>
          )}

          {/* Right: Language Switcher */}
          <motion.button
            onClick={handleLanguageChange}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-secondary rounded-full text-foreground font-medium touch-active"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm">{getFlag(language)}</span>
            <span className="text-xs">{language.toUpperCase()}</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
