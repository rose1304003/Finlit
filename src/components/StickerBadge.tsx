import React from 'react';
import { motion } from 'framer-motion';

export interface BadgeData {
  id: string;
  icon: string;
  name: Record<'uz' | 'ru' | 'en', string>;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface StickerBadgeProps {
  badge: BadgeData;
  language?: 'uz' | 'ru' | 'en';
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  index?: number;
}

const rarityStyles = {
  common: {
    bg: 'from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800',
    border: 'border-gray-300 dark:border-gray-600',
    glow: '',
  },
  rare: {
    bg: 'from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40',
    border: 'border-blue-400',
    glow: 'shadow-blue-200/50 dark:shadow-blue-500/20',
  },
  epic: {
    bg: 'from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40',
    border: 'border-purple-400',
    glow: 'shadow-purple-200/50 dark:shadow-purple-500/20',
  },
  legendary: {
    bg: 'from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-900/40 dark:via-orange-900/40 dark:to-red-900/40',
    border: 'border-yellow-500',
    glow: 'shadow-yellow-200/50 dark:shadow-yellow-500/30',
  },
};

const sizeClasses = {
  sm: 'w-16 h-20',
  md: 'w-20 h-24',
  lg: 'w-24 h-28',
};

const iconSizes = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
};

const StickerBadge: React.FC<StickerBadgeProps> = ({ 
  badge, 
  language = 'en', 
  onClick,
  size = 'sm',
  index = 0
}) => {
  const styles = rarityStyles[badge.rarity];

  return (
    <motion.div
      whileHover={badge.unlocked ? { scale: 1.1, rotate: [-2, 2, -2, 0] } : {}}
      whileTap={badge.unlocked ? { scale: 0.95 } : {}}
      onClick={badge.unlocked ? onClick : undefined}
      className={`
        ${sizeClasses[size]}
        relative cursor-pointer
        ${!badge.unlocked && 'opacity-40 grayscale'}
      `}
    >
      {/* Sticker shape - folded corner effect */}
      <div className={`
        w-full h-full
        bg-gradient-to-br ${styles.bg}
        rounded-2xl
        border-2 ${styles.border}
        shadow-lg ${badge.unlocked ? styles.glow : ''}
        flex flex-col items-center justify-center
        p-2
        relative
        overflow-hidden
      `}>
        {/* Shine effect */}
        {badge.unlocked && badge.rarity !== 'common' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        )}
        
        {/* Folded corner */}
        <div className="absolute top-0 right-0 w-4 h-4">
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-l-[16px] border-t-white dark:border-t-gray-900 border-l-transparent" />
          <div className="absolute top-0 right-0 w-0 h-0 border-b-[16px] border-l-[16px] border-b-gray-200 dark:border-b-gray-600 border-l-transparent transform rotate-180 translate-x-[16px]" />
        </div>
        
        {/* Icon */}
        <span className={`${iconSizes[size]} mb-1`} role="img" aria-label={badge.name[language]}>
          {badge.icon}
        </span>
        
        {/* Name */}
        <p className="text-[10px] font-bold text-center text-foreground leading-tight line-clamp-2">
          {badge.name[language]}
        </p>
        
        {/* Locked overlay */}
        {!badge.unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-2xl">
            <span className="text-2xl">🔒</span>
          </div>
        )}
        
        {/* Rarity indicator dots */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
          {badge.rarity === 'legendary' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />}
          {['epic', 'legendary'].includes(badge.rarity) && <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />}
          {['rare', 'epic', 'legendary'].includes(badge.rarity) && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
        </div>
      </div>
      
      {/* New badge sparkle */}
      {badge.unlocked && badge.rarity === 'legendary' && (
        <>
          <motion.span
            className="absolute -top-1 -left-1 text-sm"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute -bottom-1 -right-1 text-sm"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            ⭐
          </motion.span>
        </>
      )}
    </motion.div>
  );
};

export default StickerBadge;
