import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  viewAllLink?: string;
  viewAllLabel?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  viewAllLink, 
  viewAllLabel = 'View All' 
}) => {
  return (
    <div className="flex items-center justify-between px-4 mb-3">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      {viewAllLink && (
        <Link 
          to={viewAllLink}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {viewAllLabel}
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
