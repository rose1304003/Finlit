import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import mascotImage from '@/assets/mascot.png';

const WelcomeBanner: React.FC = () => {
  const { language } = useLanguage();

  const welcomeText = {
    uz: "FINLIT ILOVASIGA XUSH KELIBSIZ!",
    ru: "ДОБРО ПОЖАЛОВАТЬ В FINLIT!",
    en: "WELCOME TO FINLIT!"
  };

  return (
    <motion.div
      className="mx-4 mb-4 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-dark p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 left-4 text-2xl">📚</div>
        <div className="absolute bottom-4 left-8 text-xl">🪙</div>
        <div className="absolute top-6 right-20 text-lg">⭐</div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex-1">
          <h2 className="text-white font-bold text-lg leading-tight">
            {welcomeText[language]}
          </h2>
        </div>
        <motion.div 
          className="w-20 h-20 flex-shrink-0"
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 3, -3, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src={mascotImage} 
            alt="Mascot" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;
