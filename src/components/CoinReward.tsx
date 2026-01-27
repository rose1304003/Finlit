import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/contexts/GamificationContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface CoinRewardProps {
  amount: number;
  isVisible: boolean;
  onComplete: () => void;
}

const CoinReward: React.FC<CoinRewardProps> = ({ amount, isVisible, onComplete }) => {
  const { addCoins } = useGamification();
  const { language } = useLanguage();
  const [showCoins, setShowCoins] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowCoins(true);
      addCoins(amount);
      const timer = setTimeout(() => {
        setShowCoins(false);
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, amount, addCoins, onComplete]);

  const rewardText = {
    uz: "tanga topding!",
    ru: "монет получено!",
    en: "coins earned!"
  };

  return (
    <AnimatePresence>
      {showCoins && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-card rounded-3xl p-8 text-center shadow-2xl"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Floating coins */}
            <div className="relative mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-4xl"
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 1,
                    scale: 1 
                  }}
                  animate={{ 
                    x: (i - 2) * 40,
                    y: -60 - Math.random() * 40,
                    opacity: 0,
                    scale: 0.5
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                >
                  🪙
                </motion.span>
              ))}
              <motion.span 
                className="text-6xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: 3
                }}
              >
                🪙
              </motion.span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold text-primary-gold mb-2">+{amount}</h2>
              <p className="text-muted-foreground">{rewardText[language]}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoinReward;
