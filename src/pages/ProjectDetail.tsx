import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { getProjectById, Project, ProjectContent, QuizQuestion, ProjectId } from '@/data/projects';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Play, 
  FileText, 
  ExternalLink, 
  Share2,
  ChevronRight,
  X,
  CheckCircle,
  XCircle,
  Award,
  HelpCircle
} from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { claimReward, claimedEvents } = useGamification();
  const navigate = useNavigate();
  
  const [selectedContent, setSelectedContent] = useState<ProjectContent | null>(null);
  const [quizState, setQuizState] = useState<{
    currentQuestion: number;
    answers: (number | null)[];
    completed: boolean;
    score: number;
  } | null>(null);

  const project = getProjectById(id as ProjectId);

  if (!project) {
    return (
      <Layout showBack title="Not Found">
        <div className="px-4 py-12 text-center">
          <p className="text-muted-foreground">Loyiha topilmadi</p>
        </div>
      </Layout>
    );
  }

  const labels = {
    contents: { uz: "Kontentlar", ru: "Контент", en: "Contents" },
    events: { uz: "Tadbirlar", ru: "Мероприятия", en: "Events" },
    videos: { uz: "Videolar", ru: "Видео", en: "Videos" },
    articles: { uz: "Maqolalar", ru: "Статьи", en: "Articles" },
    quizzes: { uz: "Testlar", ru: "Тесты", en: "Quizzes" },
    noContent: { uz: "Hozircha kontent yo'q", ru: "Пока нет контента", en: "No content yet" },
    register: { uz: "Ro'yxatdan o'tish", ru: "Регистрация", en: "Register" },
    share: { uz: "Ulashish", ru: "Поделиться", en: "Share" },
    watchVideo: { uz: "Videoni ko'rish", ru: "Смотреть видео", en: "Watch Video" },
    startQuiz: { uz: "Testni boshlash", ru: "Начать тест", en: "Start Quiz" },
    nextQuestion: { uz: "Keyingi savol", ru: "Следующий вопрос", en: "Next Question" },
    finish: { uz: "Yakunlash", ru: "Завершить", en: "Finish" },
    correct: { uz: "To'g'ri!", ru: "Правильно!", en: "Correct!" },
    incorrect: { uz: "Noto'g'ri", ru: "Неправильно", en: "Incorrect" },
    yourScore: { uz: "Sizning natijangiz", ru: "Ваш результат", en: "Your Score" },
    earnedCoins: { uz: "tanga oldingiz!", ru: "монет получено!", en: "coins earned!" },
    claimed: { uz: "Olindi", ru: "Получено", en: "Claimed" },
    read: { uz: "O'qish", ru: "Читать", en: "Read" },
  };

  const getContentIcon = (type: ProjectContent['type']) => {
    switch (type) {
      case 'event': return Calendar;
      case 'video': return Play;
      case 'article': return FileText;
      case 'quiz': return HelpCircle;
      default: return FileText;
    }
  };

  const handleContentClick = (content: ProjectContent) => {
    setSelectedContent(content);
    if (content.type === 'quiz' && content.quiz) {
      setQuizState({
        currentQuestion: 0,
        answers: new Array(content.quiz.length).fill(null),
        completed: false,
        score: 0
      });
    }
  };

  const handleRegister = () => {
    window.open('https://t.me/finlitnetwork_bot', '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title[language],
        text: project.description[language],
        url: window.location.href,
      });
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (!quizState || !selectedContent?.quiz) return;
    
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = answerIndex;
    setQuizState({ ...quizState, answers: newAnswers });
  };

  const handleQuizNext = () => {
    if (!quizState || !selectedContent?.quiz) return;
    
    if (quizState.currentQuestion < selectedContent.quiz.length - 1) {
      setQuizState({ ...quizState, currentQuestion: quizState.currentQuestion + 1 });
    } else {
      // Calculate score
      let correct = 0;
      selectedContent.quiz.forEach((q, i) => {
        if (quizState.answers[i] === q.correctIndex) correct++;
      });
      
      const isPerfect = correct === selectedContent.quiz.length;
      setQuizState({ ...quizState, completed: true, score: correct });
      
      // Claim reward
      const eventId = `quiz-${selectedContent.id}`;
      if (!claimedEvents.includes(eventId)) {
        claimReward(isPerfect ? 'QUIZ_PERFECT' : 'QUIZ_COMPLETE', eventId);
      }
    }
  };

  const handleClaimArticleReward = (content: ProjectContent) => {
    const eventId = `article-${content.id}`;
    if (!claimedEvents.includes(eventId)) {
      claimReward('NEWS_READ', eventId);
    }
  };

  const closeContent = () => {
    setSelectedContent(null);
    setQuizState(null);
  };

  return (
    <Layout showBack title={project.name}>
      <div className="pb-24">
        {/* Project Header Banner */}
        <motion.div
          className="mx-4 mt-2 p-6 rounded-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${project.textColor}`}>
                {project.name}
              </h1>
              <p className={`text-sm mt-2 ${project.textColor} opacity-80`}>
                {project.description[language]}
              </p>
            </div>
            {project.id === 'finright' ? (
              <img 
                src="/finright-logo.png" 
                alt="FinRight Logo" 
                className="h-16 w-auto object-contain"
              />
            ) : (
              <span className="text-5xl">{project.icon}</span>
            )}
          </div>
        </motion.div>

        {/* Contents Section */}
        <div className="px-4 mt-6">
          <h2 className="font-bold text-foreground mb-4">{labels.contents[language]}</h2>
          
          {project.contents.length > 0 ? (
            <div className="space-y-3">
              {project.contents.map((content, index) => {
                const Icon = getContentIcon(content.type);
                const isClaimed = claimedEvents.includes(`${content.type === 'quiz' ? 'quiz' : 'article'}-${content.id}`);
                
                return (
                  <motion.button
                    key={content.id}
                    onClick={() => handleContentClick(content)}
                    className="w-full p-4 bg-card rounded-xl border border-border text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${project.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: project.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-foreground truncate">
                            {content.title[language]}
                          </span>
                          {content.badge && (
                            <span 
                              className="px-2 py-0.5 rounded text-xs font-bold flex-shrink-0 text-white"
                              style={{ backgroundColor: project.color }}
                            >
                              {content.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {content.description[language]}
                        </p>
                        
                        {/* Reward indicator */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-medium text-primary">
                            +{content.coinReward} 🪙
                          </span>
                          {isClaimed && (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              {labels.claimed[language]}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">{labels.noContent[language]}</p>
            </div>
          )}
        </div>
      </div>

      {/* Content Detail Sheet */}
      <AnimatePresence>
        {selectedContent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeContent}
              className="fixed inset-0 bg-black/50 z-50"
            />
            
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 max-h-[90vh] overflow-hidden"
            >
              <div className="overflow-y-auto max-h-[90vh]">
                {/* Handle */}
                <div className="sticky top-0 bg-card pt-3 pb-2 px-4 z-10">
                  <div className="w-12 h-1 bg-muted rounded-full mx-auto" />
                </div>

                {/* Close button */}
                <button
                  onClick={closeContent}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center z-20"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Quiz Content */}
                {selectedContent.type === 'quiz' && selectedContent.quiz && quizState && (
                  <div className="px-4 pb-8">
                    {!quizState.completed ? (
                      <>
                        {/* Progress */}
                        <div className="mb-6">
                          <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span>{quizState.currentQuestion + 1} / {selectedContent.quiz.length}</span>
                            <span>+{selectedContent.coinReward} 🪙</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all"
                              style={{ width: `${((quizState.currentQuestion + 1) / selectedContent.quiz.length) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Question */}
                        <h3 className="text-lg font-bold text-foreground mb-6">
                          {selectedContent.quiz[quizState.currentQuestion].question[language]}
                        </h3>

                        {/* Options */}
                        <div className="space-y-3 mb-6">
                          {selectedContent.quiz[quizState.currentQuestion].options[language].map((option, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuizAnswer(i)}
                              className={`w-full p-4 rounded-xl text-left transition-all ${
                                quizState.answers[quizState.currentQuestion] === i
                                  ? 'bg-primary text-white'
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>

                        {/* Next Button */}
                        <button
                          onClick={handleQuizNext}
                          disabled={quizState.answers[quizState.currentQuestion] === null}
                          className="w-full py-3 bg-primary text-white rounded-xl font-medium disabled:opacity-50"
                        >
                          {quizState.currentQuestion < selectedContent.quiz.length - 1 
                            ? labels.nextQuestion[language] 
                            : labels.finish[language]}
                        </button>
                      </>
                    ) : (
                      /* Quiz Results */
                      <div className="text-center py-8">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {labels.yourScore[language]}
                        </h3>
                        <p className="text-3xl font-bold text-primary mb-2">
                          {quizState.score} / {selectedContent.quiz.length}
                        </p>
                        <p className="text-lg text-green-600 font-medium">
                          +{selectedContent.coinReward} {labels.earnedCoins[language]}
                        </p>
                        <button
                          onClick={closeContent}
                          className="mt-6 px-8 py-3 bg-primary text-white rounded-xl font-medium"
                        >
                          OK
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Article/News Content */}
                {(selectedContent.type === 'article' || selectedContent.type === 'news') && (
                  <div className="px-4 pb-24">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      {selectedContent.title[language]}
                    </h2>
                    <p className="text-foreground leading-relaxed mb-6">
                      {selectedContent.description[language]}
                    </p>
                    
                    <button
                      onClick={() => handleClaimArticleReward(selectedContent)}
                      disabled={claimedEvents.includes(`article-${selectedContent.id}`)}
                      className="w-full py-3 bg-primary text-white rounded-xl font-medium disabled:bg-green-600"
                    >
                      {claimedEvents.includes(`article-${selectedContent.id}`) 
                        ? `✓ ${labels.claimed[language]}` 
                        : `${labels.read[language]} (+${selectedContent.coinReward} 🪙)`}
                    </button>
                  </div>
                )}

                {/* Video Content */}
                {selectedContent.type === 'video' && (
                  <div className="px-4 pb-24">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      {selectedContent.title[language]}
                    </h2>
                    <p className="text-foreground leading-relaxed mb-6">
                      {selectedContent.description[language]}
                    </p>
                    
                    <a
                      href={selectedContent.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-xl font-medium"
                    >
                      <Play className="w-5 h-5" />
                      {labels.watchVideo[language]}
                    </a>
                  </div>
                )}

                {/* Event Content */}
                {selectedContent.type === 'event' && (
                  <div className="px-4 pb-32">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      {selectedContent.title[language]}
                    </h2>
                    <p className="text-foreground leading-relaxed mb-6">
                      {selectedContent.description[language]}
                    </p>

                    {/* Event Details */}
                    <div className="bg-muted/50 rounded-xl p-4 space-y-3 mb-6">
                      {selectedContent.date && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-foreground">
                            {new Date(selectedContent.date).toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'en-US')}
                          </span>
                        </div>
                      )}
                      {selectedContent.time && (
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <span className="text-foreground">{selectedContent.time}</span>
                        </div>
                      )}
                      {selectedContent.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="text-foreground">{selectedContent.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex gap-3">
                      <button 
                        onClick={handleRegister}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium"
                      >
                        <ExternalLink className="w-5 h-5" />
                        {labels.register[language]}
                      </button>
                      <button 
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-xl font-medium"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default ProjectDetail;
