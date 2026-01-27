import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { newsItems } from '@/data/news';
import { Calendar, Share2, CheckCircle } from 'lucide-react';
import CoinReward from '@/components/CoinReward';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { claimReward, updateStreak } = useGamification();

  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [isRead, setIsRead] = useState(false);

  const news = newsItems.find((n) => n.id === id);

  // Update streak and claim reward on page visit
  useEffect(() => {
    if (!news) return;
    
    updateStreak();
    
    // Create unique event ID for this news read today
    const today = new Date().toISOString().split('T')[0];
    const eventId = `news-${id}-${today}`;
    
    // Small delay to let user start reading
    const timer = setTimeout(() => {
      const rewarded = claimReward(eventId, 'NEWS_READ', { newsId: id });
      
      if (rewarded) {
        setRewardAmount(10);
        setShowReward(true);
        setIsRead(true);
      }
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, [id, news, claimReward, updateStreak]);

  const labels = {
    markAsRead: { uz: "O'qildi deb belgilash", ru: "Отметить прочитанным", en: "Mark as Read" },
    read: { uz: "O'qildi", ru: "Прочитано", en: "Read" },
    share: { uz: "Ulashish", ru: "Поделиться", en: "Share" },
  };

  if (!news) {
    return (
      <Layout showBack title={t('news')}>
        <div className="px-4 py-8 text-center">
          <p className="text-muted-foreground">News not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showBack title={t('news')}>
      <article className="px-4 py-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Calendar className="w-4 h-4" />
            <span>{news.date}</span>
            {isRead && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 ml-auto text-green-600"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{labels.read[language]}</span>
              </motion.div>
            )}
          </div>
          
          <h1 className="text-xl font-bold text-foreground mb-4 leading-tight">
            {news.title[language]}
          </h1>

          <p className="text-muted-foreground leading-relaxed">
            {news.content[language]}
          </p>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full py-3 bg-secondary text-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors touch-active"
        >
          <Share2 className="w-4 h-4" />
          {labels.share[language]}
        </motion.button>
      </article>

      {/* Coin Reward Animation */}
      <CoinReward
        amount={rewardAmount}
        isVisible={showReward}
        onComplete={() => setShowReward(false)}
      />
    </Layout>
  );
};

export default NewsDetail;
