import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import mascotImage from '@/assets/mascot.png';

interface ProjectUpdateCardProps {
  id: string;
  title: string;
  badge?: string;
  time?: string;
  colorScheme?: 'green' | 'pink' | 'blue' | 'orange';
  index?: number;
}

const colorSchemes = {
  green: 'bg-gradient-to-r from-primary to-primary-dark',
  pink: 'bg-gradient-to-r from-pink-500 to-pink-600',
  blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
  orange: 'bg-gradient-to-r from-orange-500 to-orange-600',
};

const ProjectUpdateCard: React.FC<ProjectUpdateCardProps> = ({
  id,
  title,
  badge,
  time,
  colorScheme = 'green',
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={`/projects/${id}`}
        className={`block relative overflow-hidden rounded-2xl p-4 ${colorSchemes[colorScheme]} min-w-[280px]`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-bold text-lg">{title}</h3>
              {badge && (
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>
            {time && (
              <p className="text-white/80 text-sm">{time}</p>
            )}
          </div>
          <motion.div 
            className="w-16 h-16 flex-shrink-0"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img 
              src={mascotImage} 
              alt="Mascot" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectUpdateCard;
