import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  excerpt,
  date,
  imageUrl,
}) => {
  return (
    <Link
      to={`/news/${id}`}
      className="block card-finlit overflow-hidden animate-fade-in"
    >
      {imageUrl && (
        <div className="w-full h-32 bg-secondary rounded-xl mb-3 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{excerpt}</p>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="w-3.5 h-3.5" />
        <span>{date}</span>
      </div>
    </Link>
  );
};

export default NewsCard;
