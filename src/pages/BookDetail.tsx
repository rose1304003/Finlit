import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { libraryItems } from '@/data/library';
import { BookOpen, Star, ArrowLeft, ExternalLink } from 'lucide-react';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();

  const book = libraryItems.find((item) => item.id === id && item.type === 'book');

  if (!book) {
    return (
      <Layout showBack title={t('books')}>
        <div className="px-4 py-8 text-center">
          <p className="text-muted-foreground">{t('loading')}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBack title={book.title[language]}>
      <div className="px-4 py-4 space-y-6">
        {/* Header Card */}
        <div className="card-dark p-5 animate-fade">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl icon-container-blue flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground mb-1">
                {book.title[language]}
              </h1>
              <p className="text-sm text-primary font-medium mb-2">{book.author}</p>
              {book.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm text-muted-foreground font-medium">{book.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="animate-slide" style={{ animationDelay: '50ms' }}>
          <h2 className="font-semibold text-foreground mb-2">{t('aboutProject')}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {book.description[language]}
          </p>
        </section>

        {/* Action Buttons */}
        <section className="animate-slide" style={{ animationDelay: '100ms' }}>
          <div className="space-y-3">
            <button className="w-full p-4 bg-primary text-primary-foreground rounded-2xl font-semibold flex items-center justify-center gap-2 touch-active">
              <ExternalLink className="w-5 h-5" />
              <span>{t('viewBook')}</span>
            </button>
            <Link
              to="/library"
              className="block w-full p-4 bg-secondary text-foreground rounded-2xl font-semibold text-center touch-active"
            >
              {t('back')} {t('library')}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BookDetail;
