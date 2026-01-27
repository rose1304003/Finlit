import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AudiencePillProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

const AudiencePill: React.FC<AudiencePillProps> = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
        isActive 
          ? 'bg-primary text-white shadow-lg' 
          : 'bg-card text-foreground border border-border hover:border-primary/30'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </motion.button>
  );
};

export default AudiencePill;
