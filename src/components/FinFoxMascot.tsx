import React from 'react';
import { motion } from 'framer-motion';
import mascotImage from '@/assets/mascot.png';

interface FinFoxMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  animated?: boolean;
}

const FinFoxMascot: React.FC<FinFoxMascotProps> = ({ 
  size = 'md', 
  message,
  animated = true 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
  };

  const messageSizes = {
    sm: 'text-xs max-w-[120px]',
    md: 'text-sm max-w-[160px]',
    lg: 'text-base max-w-[200px]',
    xl: 'text-base max-w-[220px]',
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`absolute -top-14 bg-white dark:bg-card rounded-2xl px-3 py-2 shadow-lg border border-border z-10 ${messageSizes[size]}`}
        >
          <p className="text-foreground text-center font-medium">{message}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-card border-r border-b border-border rotate-45" />
        </motion.div>
      )}
      
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={animated ? {
          y: [0, -8, 0],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Mascot Image */}
        <motion.img
          src={mascotImage}
          alt="FinSquirrel Mascot"
          className="w-full h-full object-contain drop-shadow-lg"
          animate={animated ? {
            rotate: [-2, 2, -2],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Sparkle effects */}
        {animated && (
          <>
            <motion.div
              className="absolute -top-2 -right-2 text-yellow-400 text-lg"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-1 -left-2 text-yellow-400 text-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              ⭐
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default FinFoxMascot;
