import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  enabled: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const SoundToggle: React.FC<SoundToggleProps> = ({ 
  enabled, 
  onToggle,
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex items-center justify-center
        transition-colors duration-200
        ${enabled 
          ? 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg shadow-green-200/50 dark:shadow-green-500/20' 
          : 'bg-muted text-muted-foreground'
        }
      `}
      aria-label={enabled ? 'Disable sound' : 'Enable sound'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: enabled ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {enabled ? (
          <Volume2 className={iconSizes[size]} />
        ) : (
          <VolumeX className={iconSizes[size]} />
        )}
      </motion.div>
      
      {/* Sound waves animation when enabled */}
      {enabled && (
        <div className="absolute">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-white/30"
              style={{
                width: `${100 + i * 20}%`,
                height: `${100 + i * 20}%`,
                top: `${-10 * i}%`,
                left: `${-10 * i}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};

export default SoundToggle;
