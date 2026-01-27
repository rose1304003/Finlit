import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Headphones, FileText, Star, ChevronRight } from 'lucide-react';
import { libraryItems } from '@/data/library';

const Library: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'book' | 'podcast' | 'guide'>('all');

  const tabs = [
    { id: 'all' as const, label: language === 'uz' ? 'Barchasi' : language === 'ru' ? 'Все' : 'All' },
    { id: 'book' as const, label: t('books'), icon: BookOpen },
    { id: 'podcast' as const, label: t('podcasts'), icon: Headphones },
    { id: 'guide' as const, label: t('guides'), icon: FileText },
  ];

  const filteredItems = activeTab === 'all' 
    ? libraryItems 
    : libraryItems.filter(item => item.type === activeTab);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return BookOpen;
      case 'podcast': return Headphones;
      default: return FileText;
    }
  };

  return (
    <Layout showBack title={t('library')}>
      <div className="py-4">
        {/* Tabs */}
        <div className="flex gap-2 px-4 mb-4 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-active ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {tab.icon && <tab.icon className="w-4 h-4" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="section-card mx-4">
          {filteredItems.map((item) => {
            const Icon = getTypeIcon(item.type);
            const isBook = item.type === 'book';
            
            const content = (
              <>
                <div className="flex items-start gap-3 flex-1">
                  <div className="icon-container flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground mb-0.5 line-clamp-1">
                      {item.title[language]}
                    </h3>
                    <p className="text-xs text-primary mb-0.5">{item.author}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.description[language]}
                    </p>
                    {item.rating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-xs text-muted-foreground">{item.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
              </>
            );
            
            return isBook ? (
              <Link
                key={item.id}
                to={`/library/${item.id}`}
                className="list-item px-4 animate-fade touch-active"
              >
                {content}
              </Link>
            ) : (
              <div
                key={item.id}
                className="list-item px-4 animate-fade touch-active"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Library;
