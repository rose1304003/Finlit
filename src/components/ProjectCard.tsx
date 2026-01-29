import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  icon: any;
  colorScheme?: 'pink' | 'blue' | 'orange' | 'purple' | 'green' | 'cyan';
  index?: number;
}

const colorClasses = {
  pink: 'project-card-pink',
  blue: 'project-card-blue',
  orange: 'project-card-orange',
  purple: 'project-card-purple',
  green: 'project-card-green',
  cyan: 'project-card-cyan',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id, 
  title, 
  description, 
  icon,
  colorScheme = 'green',
  index = 0 
}) => {
  // Handle both LucideIcon and emoji string
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <span className="text-3xl">{icon}</span>;
    }
    const Icon = icon;
    return <Icon className="w-8 h-8 text-primary" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={`/projects/${id}`}
        className={`block relative overflow-hidden rounded-2xl p-4 min-h-[140px] ${colorClasses[colorScheme]}`}
      >
        {/* Icon at top */}
        <div className="mb-2">{renderIcon()}</div>
        
        {/* Title */}
        <h3 className="font-bold text-foreground text-sm leading-tight mb-1 line-clamp-2">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Decorative sparkle */}
        <motion.div 
          className="absolute top-2 right-2 text-sm opacity-60"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
