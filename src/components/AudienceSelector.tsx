import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Scale, ShieldCheck, MessagesSquare, Network } from 'lucide-react';

interface AudienceSelectorProps {
  selected: string;
  onSelect: (audience: string) => void;
}

// NOTE: We keep the component name for backward-compatibility,
// but it's now used to switch between Finlit projects.
const audiences = [
  { id: 'finright', icon: Scale, labelKey: 'finright' },
  { id: 'finsecurity', icon: ShieldCheck, labelKey: 'finsecurity' },
  { id: 'fintalks', icon: MessagesSquare, labelKey: 'fintalks' },
  { id: 'finlit-network', icon: Network, labelKey: 'finlitNetwork' },
];

const AudienceSelector: React.FC<AudienceSelectorProps> = ({ selected, onSelect }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleClick = (audienceId: string) => {
    onSelect(audienceId);
    // Navigate to project detail page
    navigate(`/projects/${audienceId}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {audiences.map((audience) => {
        const Icon = audience.icon;
        const isActive = selected === audience.id;

        return (
          <motion.button
            key={audience.id}
            onClick={() => handleClick(audience.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all ${
              isActive 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white/80 text-foreground border border-gray-200 hover:border-primary/30'
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
  );
};

export default AudienceSelector;
