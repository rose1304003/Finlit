import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectListItemProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  index?: number;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({
  id,
  title,
  description,
  icon: Icon,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
    >
      <Link
        to={`/projects/${id}`}
        className="flex items-center gap-3 rounded-2xl px-4 py-4 bg-white/70 border border-white/60 shadow-sm hover:shadow-md transition-all touch-active"
      >
        <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-bold text-foreground truncate">{title}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">{description}</div>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </Link>
    </motion.div>
  );
};

export default ProjectListItem;
