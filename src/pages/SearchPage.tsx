import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { glossaryTerms } from '@/data/glossary';
import { projects } from '@/data/projects';
import { newsItems } from '@/data/news';

interface SearchResult {
  id: string;
  type: 'glossary' | 'project' | 'news' | 'calculator';
  title: string;
  subtitle?: string;
  link: string;
}

const SearchPage: React.FC = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const labels = {
    title: { uz: "Qidirish", ru: "Поиск", en: "Search" },
    placeholder: { uz: "Qidirish...", ru: "Поиск...", en: "Search..." },
    recent: { uz: "So'ngi izlanish", ru: "Недавние поиски", en: "Recent Searches" },
    trending: { uz: "Trendlar", ru: "Тренды", en: "Trending" },
    noResults: { uz: "Natija topilmadi", ru: "Результаты не найдены", en: "No results found" },
    glossary: { uz: "Lug'at", ru: "Глоссарий", en: "Glossary" },
    projects: { uz: "Loyihalar", ru: "Проекты", en: "Projects" },
    news: { uz: "Yangiliklar", ru: "Новости", en: "News" },
    calculator: { uz: "Kalkulyator", ru: "Калькулятор", en: "Calculator" },
  };

  const defaultRecentSearches = [
    { uz: "Hisoblash", ru: "Расчёт", en: "Calculate" },
    { uz: "Finlit", ru: "Finlit", en: "Finlit" },
    { uz: "Finright", ru: "Finright", en: "Finright" },
    { uz: "Fin security", ru: "Fin security", en: "Fin security" },
    { uz: "Kredit tarixi", ru: "Кредитная история", en: "Credit history" },
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    } else {
      setRecentSearches(defaultRecentSearches.map(s => s[language]));
    }
  }, [language]);

  // Save search to recent
  const addToRecent = (search: string) => {
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 6);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Remove from recent
  const removeFromRecent = (search: string) => {
    const updated = recentSearches.filter(s => s !== search);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Perform search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search glossary
    glossaryTerms.forEach(term => {
      const termText = term[`term_${language}` as keyof typeof term] as string;
      if (termText?.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: term.id,
          type: 'glossary',
          title: termText,
          subtitle: labels.glossary[language],
          link: `/glossary?term=${term.id}`,
        });
      }
    });

    // Search projects
    projects.forEach(project => {
      if (project.title[language].toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: project.id,
          type: 'project',
          title: project.title[language],
          subtitle: labels.projects[language],
          link: `/projects/${project.id}`,
        });
      }
    });

    // Search news
    newsItems.forEach(news => {
      if (news.title[language].toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          id: news.id,
          type: 'news',
          title: news.title[language],
          subtitle: labels.news[language],
          link: `/news/${news.id}`,
        });
      }
    });

    // Add calculator if query matches
    if ('kalkulyator'.includes(lowerQuery) || 'calculator'.includes(lowerQuery) || 'hisoblash'.includes(lowerQuery)) {
      searchResults.push({
        id: 'calculator',
        type: 'calculator',
        title: labels.calculator[language],
        subtitle: t('calculators'),
        link: '/calculators',
      });
    }

    setResults(searchResults.slice(0, 10));
    setIsSearching(false);
  }, [query, language]);

  const handleResultClick = (result: SearchResult) => {
    addToRecent(result.title);
    navigate(result.link);
  };

  const handleRecentClick = (search: string) => {
    setQuery(search);
    addToRecent(search);
  };

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'glossary': return '📖';
      case 'project': return '🎯';
      case 'news': return '📰';
      case 'calculator': return '🧮';
      default: return '📄';
    }
  };

  return (
    <Layout showBack title={labels.title[language]}>
      <div className="px-4 py-4">
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.placeholder[language]}
            autoFocus
            className="w-full pl-12 pr-10 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Results or Recent Searches */}
        <AnimatePresence mode="wait">
          {query ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <motion.button
                      key={result.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleResultClick(result)}
                      className="w-full flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-muted/50 transition-colors text-left"
                    >
                      <span className="text-xl">{getTypeIcon(result.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{result.title}</p>
                        {result.subtitle && (
                          <p className="text-xs text-muted-foreground">{result.subtitle}</p>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{labels.noResults[language]}</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="recent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Recent Searches */}
              <div className="mb-6">
                <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {labels.recent[language]}
                </h2>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <motion.div
                      key={search}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
                    >
                      <button
                        onClick={() => handleRecentClick(search)}
                        className="flex-1 text-left text-foreground hover:text-primary transition-colors"
                      >
                        {search}
                      </button>
                      <button
                        onClick={() => removeFromRecent(search)}
                        className="p-1 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trending */}
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {labels.trending[language]}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {['Kredit', 'Depozit', 'Inflyatsiya', 'Budjet', 'Investitsiya'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 bg-secondary rounded-full text-sm text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default SearchPage;
