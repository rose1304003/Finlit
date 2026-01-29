import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { Search, Bell, ChevronRight, Play, Mic, BookOpen, Home, Lightbulb, Calculator, User, ExternalLink } from 'lucide-react';
import mascotImage from '@/assets/mascot.png';

const Index: React.FC = () => {
  const { language } = useLanguage();
  const { coins, username, updateStreak } = useGamification();
  const navigate = useNavigate();

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const displayName = username || 'Gafurova Anora';
  const displayHandle = `@${(username || 'anora').toLowerCase().replace(/\s/g, '_')}_17`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-28">
      {/* Header - User Info + Coins */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/profile')}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#13593F]/30 bg-orange-200">
              <img src={mascotImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-white">{displayName}</p>
              <p className="text-xs text-gray-400">{displayHandle}</p>
            </div>
          </motion.div>
          
          {/* Coins Badge */}
          <motion.div 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#106546] rounded-full cursor-pointer"
            onClick={() => navigate('/profile')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-bold text-[#FFEE5A]">{coins}</span>
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
              <span className="text-xs">🪙</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <motion.button
          onClick={() => navigate('/search')}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white rounded-full"
          whileTap={{ scale: 0.98 }}
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 flex-1 text-left">Qidirish...</span>
          <Bell className="w-5 h-5 text-[#13593F]" />
        </motion.button>
      </div>

      {/* Welcome Banner */}
      <motion.div 
        className="mx-4 mb-4 p-4 bg-[#13593F] rounded-2xl relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-bold text-[#FFEE5A]">FINLIT NETWORK</h2>
            <p className="text-sm text-white font-medium">ILOVASIGA</p>
            <p className="text-sm text-white font-medium">XUSH KELIBSIZ!</p>
          </div>
          <motion.div 
            className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img src={mascotImage} alt="FinFox" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </motion.div>

      {/* Project Updates - FINLIT SPEECH */}
      <div className="px-4 mb-2">
        <p className="text-sm text-gray-400 mb-2">Loyihalar bo'yicha yangiliklar</p>
      </div>
      
      <motion.div
        onClick={() => navigate('/projects/finlit-speech')}
        className="mx-4 mb-4 bg-[#13593F] rounded-2xl p-4 relative overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-lg">FINLIT</span>
              <span className="px-2 py-0.5 bg-[#FFEE5A] text-[#13593F] text-xs font-bold rounded">SPEECH</span>
            </div>
            <p className="text-white font-bold text-lg">NETWORK</p>
            <span className="text-white/70 text-sm">14:00</span>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src={mascotImage} alt="Mascot" className="w-full h-full object-cover" />
          </div>
        </div>
        {/* Carousel dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          <div className="w-6 h-1.5 bg-white rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
        </div>
      </motion.div>

      {/* Kutubxona Section */}
      <div className="px-4 mb-2">
        <p className="text-sm text-gray-400 mb-3">Kutubxona</p>
      </div>
      
      <div className="px-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Podkastlar - Left tall */}
          <motion.div
            onClick={() => navigate('/library?tab=podcasts')}
            className="bg-[#13593F] rounded-2xl p-4 row-span-2 relative overflow-hidden cursor-pointer"
            style={{ minHeight: '180px' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-white font-bold text-sm mb-1">Podkastlar</h3>
            <p className="text-white/70 text-xs leading-relaxed">50 dan ortiq moliyaviy savodsizlikka oid podkastlarni tinglang</p>
            <div className="absolute bottom-3 left-3 w-7 h-7 rounded-full bg-[#0f4a33] flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
            <div className="absolute bottom-2 right-2">
              <Mic className="w-10 h-10 text-[#FFEE5A]" />
            </div>
          </motion.div>

          {/* Videolar - Top right */}
          <motion.div
            onClick={() => navigate('/library?tab=videos')}
            className="bg-[#13593F] rounded-2xl p-3 relative overflow-hidden cursor-pointer"
            style={{ minHeight: '85px' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-white font-bold text-sm">Videolar</h3>
            <p className="text-white/70 text-xs">80 dan ortiq</p>
            <div className="absolute bottom-2 right-2">
              <Play className="w-7 h-7 text-[#FFEE5A]" fill="#FFEE5A" />
            </div>
          </motion.div>

          {/* Kitoblar - Bottom right */}
          <motion.div
            onClick={() => navigate('/library?tab=books')}
            className="bg-[#13593F] rounded-2xl p-3 relative overflow-hidden cursor-pointer"
            style={{ minHeight: '85px' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-white font-bold text-sm">Kitoblar</h3>
            <p className="text-white/70 text-xs">100 dan ortiq</p>
            <div className="absolute bottom-2 right-2">
              <BookOpen className="w-7 h-7 text-[#FFEE5A]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quiz Games */}
      <motion.div
        onClick={() => navigate('/quiz')}
        className="mx-4 mb-4 bg-[#13593F] rounded-2xl p-4 cursor-pointer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-[#FFEE5A] font-bold text-xl">QUIZ GAMES</h3>
            <p className="text-white/70 text-xs mt-1 pr-4">Quiz gamida qatnashing va coinlarga ega bo'ling</p>
          </div>
          <div className="text-4xl">❓</div>
        </div>
      </motion.div>

      {/* Moliya Olami */}
      <motion.div
        onClick={() => window.open('https://financeworld.uz/', '_blank')}
        className="mx-4 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4 cursor-pointer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg">MOLIYA OLAMI</h3>
            <p className="text-white/70 text-xs mt-1">O'yin orqali moliyani o'rganing</p>
          </div>
          <div className="text-3xl">🎮</div>
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl px-4 py-3 z-50 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-[#13593F] flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-[#13593F] font-medium">Uy</span>
          </button>
          <button onClick={() => navigate('/projects')} className="flex flex-col items-center gap-1 px-4 py-2 text-gray-400">
            <Lightbulb className="w-6 h-6" />
            <span className="text-xs">Loyihalar</span>
          </button>
          <button onClick={() => navigate('/calculators')} className="flex flex-col items-center gap-1 px-4 py-2 text-gray-400">
            <Calculator className="w-6 h-6" />
            <span className="text-xs">Hisoblash</span>
          </button>
          <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1 px-4 py-2 text-gray-400">
            <User className="w-6 h-6" />
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
