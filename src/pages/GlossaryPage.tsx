import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { Input } from '@/components/ui/input';
import { glossaryTerms, getGroupedGlossary, GlossaryTerm } from '@/data/glossary';
import { Search, X, Volume2, BookOpen } from 'lucide-react';
import CoinReward from '@/components/CoinReward';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const GlossaryPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { claimReward, updateStreak } = useGamification();
  
  const [query, setQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [activeLetterFilter, setActiveLetterFilter] = useState<string | null>(null);

  const labels = {
    title: { uz: "Lug'at", ru: "Глоссарий", en: "Glossary" },
    subtitle: { 
      uz: "Ushbu lug'atda bank va moliya sohasiga oid terminlarning aniq ta'riflarini to'plashga harakat qildik.", 
      ru: "В этом глоссарии мы собрали точные определения терминов в области банковского дела и финансов.", 
      en: "In this glossary, we have compiled accurate definitions of terms in banking and finance." 
    },
    search: { uz: "Qidirish...", ru: "Поиск...", en: "Search..." },
    noResults: { uz: "Natija topilmadi", ru: "Результаты не найдены", en: "No results found" },
    listen: { uz: "Tinglash", ru: "Слушать", en: "Listen" },
  };

  // Get grouped terms
  const groupedTerms = useMemo(() => {
    let filtered = glossaryTerms;
    
    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(term => {
        const termText = term[`term_${language}`]?.toLowerCase() || '';
        const definition = term[`definition_${language}`]?.toLowerCase() || '';
        return termText.includes(lowerQuery) || definition.includes(lowerQuery);
      });
    }
    
    // Filter by letter
    if (activeLetterFilter) {
      filtered = filtered.filter(term => {
        const termText = term[`term_${language}`] || '';
        return termText[0]?.toUpperCase() === activeLetterFilter;
      });
    }

    // Group by first letter
    const grouped: Record<string, GlossaryTerm[]> = {};
    filtered.forEach(term => {
      const termText = term[`term_${language}`] || '';
      const letter = termText[0]?.toUpperCase();
      if (letter) {
        if (!grouped[letter]) {
          grouped[letter] = [];
        }
        grouped[letter].push(term);
      }
    });

    return grouped;
  }, [query, language, activeLetterFilter]);

  const handleTermSelect = useCallback((term: GlossaryTerm) => {
    setSelectedTerm(term);
    updateStreak();
    
    // Create unique event ID for this term read today
    const today = new Date().toISOString().split('T')[0];
    const eventId = `glossary-${term.id}-${today}`;
    
    // Claim reward (idempotent)
    const rewarded = claimReward(eventId, 'GLOSSARY_READ', { termId: term.id });
    
    if (rewarded) {
      setRewardAmount(5);
      setShowReward(true);
    }
  }, [claimReward, updateStreak]);

  const handleLetterClick = (letter: string) => {
    if (activeLetterFilter === letter) {
      setActiveLetterFilter(null);
    } else {
      setActiveLetterFilter(letter);
      // Scroll to letter section
      const element = document.getElementById(`letter-${letter}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Highlight matching text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">{part}</mark>
        : part
    );
  };

  return (
    <Layout showBack title={labels.title[language]}>
      <div className="px-4 pb-24">
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{labels.title[language]}</h1>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {labels.subtitle[language]}
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder={labels.search[language]}
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* A-Z Index - Two rows */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {LETTERS.slice(0, 13).map(letter => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  activeLetterFilter === letter
                    ? 'bg-primary text-white'
                    : groupedTerms[letter]
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center mt-1.5">
            {LETTERS.slice(13).map(letter => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                  activeLetterFilter === letter
                    ? 'bg-primary text-white'
                    : groupedTerms[letter]
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {letter}
              </button>
            ))}
            <button
              onClick={() => setActiveLetterFilter(null)}
              className={`px-3 h-8 rounded-lg text-sm font-medium transition-all ${
                !activeLetterFilter
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              ...
            </button>
          </div>
        </div>

        {/* Terms List */}
        {Object.keys(groupedTerms).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedTerms)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, terms]) => (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-4">
                  {/* Letter Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-foreground">{letter}</h2>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>

                  {/* Terms */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1">
                    {terms.map((term) => (
                      <motion.button
                        key={term.id}
                        onClick={() => handleTermSelect(term)}
                        className="text-left py-1 text-primary hover:text-primary-dark transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        <span className="underline decoration-primary/30 hover:decoration-primary text-sm">
                          {highlightText(term[`term_${language}`] || '', query)}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{labels.noResults[language]}</p>
          </div>
        )}
      </div>

      {/* Term Detail Drawer */}
      <AnimatePresence>
        {selectedTerm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTerm(null)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 max-h-[70vh] overflow-hidden"
            >
              <div className="p-4">
                {/* Handle */}
                <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Content */}
                <div className="pr-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {selectedTerm[`term_${language}`]}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {selectedTerm[`definition_${language}`]}
                  </p>

                  {/* Listen Button */}
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm font-medium">{labels.listen[language]}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Coin Reward Animation */}
      <CoinReward
        amount={rewardAmount}
        isVisible={showReward}
        onComplete={() => setShowReward(false)}
      />
    </Layout>
  );
};

export default GlossaryPage;
