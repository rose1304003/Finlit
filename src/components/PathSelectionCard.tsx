import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import AudienceSelector from './AudienceSelector';
import FinFoxMascot from './FinFoxMascot';

interface PathSelectionCardProps {
  selectedAudience: string;
  onAudienceChange: (audience: string) => void;
}

const PathSelectionCard: React.FC<PathSelectionCardProps> = ({
  selectedAudience,
  onAudienceChange,
}) => {
  const { t } = useLanguage();

  return (
    <motion.div
      className="path-card mx-4 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Sparkle decorations */}
      <motion.div
        className="absolute top-2 left-3 text-lg"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ⭐
      </motion.div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {t('choosePath')}
          </h2>
          <AudienceSelector selected={selectedAudience} onSelect={onAudienceChange} />
        </div>

        {/* Mascot on the right */}
        <div className="flex-shrink-0 -mt-2 -mr-2">
          <FinFoxMascot size="lg" animated />
        </div>
      </div>

      {/* Floating coins */}
      <motion.div
        className="absolute -top-4 right-20 text-2xl"
        animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        🪙
      </motion.div>
      <motion.div
        className="absolute bottom-2 right-32 text-xl opacity-70"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        💰
      </motion.div>
    </motion.div>
  );
};

export default PathSelectionCard;