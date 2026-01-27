import React from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { newsItems } from '@/data/news';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const News: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <Layout showBack title={t('news')}>
      <div className="py-4">
        <div className="px-4 mb-4">
          <h1 className="text-lg font-bold text-foreground">{t('newsTitle')}</h1>
        </div>

        <div className="section-card mx-4">
          {newsItems.map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className="list-item-hover px-4 animate-fade"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground mb-1 line-clamp-2">
                  {news.title[language]}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {news.excerpt[language]}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground/70">
                  <Calendar className="w-3 h-3" />
                  <span>{news.date}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 ml-2" />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default News;
