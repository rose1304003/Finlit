import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { Search, Bell, Home, Lightbulb, Calculator, User } from 'lucide-react';
import { projects } from '@/data/projects';
import mascotImage from '@/assets/mascot.png';

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const { coins, username } = useGamification();
  const navigate = useNavigate();

  const displayName = username || 'Gafurova Anora';
  const displayHandle = `@${(username || 'anora').toLowerCase().replace(/\s/g, '_')}_17`;

  // 4 main projects for 2x2 grid
  const mainProjects = projects.filter(p => 
    ['finkids', 'finlit-speech', 'finright', 'finsecurity'].includes(p.id)
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-28">
      {/* Header */}
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
          
          <motion.div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#106546] rounded-full">
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

      {/* Banner */}
      <motion.div 
        className="mx-4 mb-4 p-4 bg-[#13593F] rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <h2 className="text-lg font-bold text-[#FFEE5A]">LOYIHALAR</h2>
            <p className="text-sm text-white font-medium">BILAN TANISHIB</p>
            <p className="text-sm text-white font-medium">CHIQING</p>
          </div>
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img src={mascotImage} alt="FinFox" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>

      {/* Section Title */}
      <div className="px-4 mb-3">
        <p className="text-[#FFEE5A] font-medium">Barcha loyihalar</p>
      </div>

      {/* 2x2 GRAY Placeholder Grid - Image 5 */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {mainProjects.map((project, index) => (
          <motion.button
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="bg-[#D9D9D9] rounded-2xl aspect-square relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
              <span className="text-5xl mb-2">{project.icon}</span>
              <p className="font-bold text-sm text-gray-700 text-center">{project.name}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl px-4 py-3 z-50 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 px-4 py-2 text-gray-400">
            <Home className="w-6 h-6" />
            <span className="text-xs">Uy</span>
          </button>
          <button onClick={() => navigate('/projects')} className="flex flex-col items-center gap-1 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-[#13593F] flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-[#13593F] font-medium">Loyihalar</span>
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

export default Projects;
