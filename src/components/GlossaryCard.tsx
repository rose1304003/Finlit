import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface GlossaryCardProps {
  colorScheme?: 'pink' | 'blue' | 'orange' | 'purple' | 'green' | 'cyan';
}

const colorSchemes = {
  pink: {
    bg: 'project-card-pink',
    icon: 'icon-container-pink',
    arrow: 'bg-pink-200/50 text-pink-600',
  },
  blue: {
    bg: 'project-card-blue',
    icon: 'icon-container-blue',
    arrow: 'bg-blue-200/50 text-blue-600',
  },
  orange: {
    bg: 'project-card-orange',
    icon: 'icon-container-orange',
    arrow: 'bg-orange-200/50 text-orange-600',
  },
  purple: {
    bg: 'project-card-purple',
    icon: 'icon-container-purple',
    arrow: 'bg-purple-200/50 text-purple-600',
  },
  green: {
    bg: 'project-card-green',
    icon: 'icon-container-green',
    arrow: 'bg-green-200/50 text-green-600',
  },
  cyan: {
    bg: 'project-card-cyan',
    icon: 'icon-container-cyan',
    arrow: 'bg-cyan-200/50 text-cyan-600',
  },
};

const GlossaryCard: React.FC<GlossaryCardProps> = ({
  colorScheme = 'purple',
}) => {
  const { t } = useLanguage();
  const colors = colorSchemes[colorScheme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <Link
        to="/glossary"
        className={`block ${colors.bg} rounded-3xl p-4 touch-active relative overflow-hidden`}
      >
        {/* Sparkle decoration */}
        <motion.div
          className="absolute top-2 right-2 text-sm opacity-60"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨
        </motion.div>

        <div className="flex items-start gap-3">
          <div className={colors.icon}>
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-lg">{t('glossary')}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {t('glossaryTitle')}
            </p>
          </div>
        </div>

        {/* Arrow Button */}
        <motion.div 
          className={`absolute bottom-4 left-4 w-8 h-8 rounded-full ${colors.arrow} flex items-center justify-center`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default GlossaryCard;
