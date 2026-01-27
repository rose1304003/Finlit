import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface CalculatorCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  gradient,
}) => {
  return (
    <Link
      to={`/calculators/${id}`}
      className="block p-4 rounded-2xl bg-card border border-border hover:shadow-card-hover transition-all touch-feedback animate-fade-in group"
    >
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-0.5">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
};

export default CalculatorCard;
