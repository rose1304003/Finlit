import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Scale, ShieldCheck, MessagesSquare, Network } from 'lucide-react';

interface HorizontalAudiencePillsProps {
  selected: string;
  onSelect: (audience: string) => void;
}

// NOTE: Kept name for compatibility; used as a top-level project filter.
const audiences = [
  { id: 'finright', icon: Scale, labelKey: 'finright' },
  { id: 'finsecurity', icon: ShieldCheck, labelKey: 'finsecurity' },
  { id: 'fintalks', icon: MessagesSquare, labelKey: 'fintalks' },
  { id: 'finlit-network', icon: Network, labelKey: 'finlitNetwork' },
];

const HorizontalAudiencePills: React.FC<HorizontalAudiencePillsProps> = ({ selected, onSelect }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleClick = (audienceId: string) => {
    onSelect(audienceId);
    // Navigate to project detail page
    navigate(`/projects/${audienceId}`);
  };

  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-2 pb-2">
        {audiences.map((audience) => {
          const Icon = audience.icon;
          const isActive = selected === audience.id;

          return (
            <motion.button
              key={audience.id}
              onClick={() => handleClick(audience.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white text-foreground border border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                boxShadow: isActive ? '0 4px 15px hsla(217, 91%, 55%, 0.4)' : undefined,
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{t(audience.labelKey as any)}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalAudiencePills;
