import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search } from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import mascotImage from '@/assets/mascot.png';

const UserHeader: React.FC = () => {
  const { coins, username, currentSkin } = useGamification();
  const { language } = useLanguage();

  return (
    <div className="px-4 pt-4 pb-2">
      {/* User Profile Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-gold bg-white"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={mascotImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 text-lg">
              {currentSkin.icon}
            </div>
          </motion.div>
          <div>
            <h2 className="font-bold text-foreground text-lg">{username}</h2>
          </div>
        </div>
        
        {/* Coins Display */}
        <motion.div 
          className="flex items-center gap-1.5 bg-primary-gold/20 px-3 py-1.5 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="font-bold text-primary-gold">{coins}</span>
          <motion.span 
            className="text-lg"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🪙
          </motion.span>
        </motion.div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder={language === 'uz' ? 'Qidirish...' : language === 'ru' ? 'Поиск...' : 'Search...'}
          className="w-full pl-10 pr-12 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <motion.button 
          className="absolute right-3 top-1/2 -translate-y-1/2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
        </motion.button>
      </div>
    </div>
  );
};

export default UserHeader;
