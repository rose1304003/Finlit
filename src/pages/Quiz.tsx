import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { X } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: { uz: string; ru: string; en: string };
  options: { uz: string[]; ru: string[]; en: string[] };
  correctIndex: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: {
      uz: "Daromad va xarajat nima uchun rejalashtiriladi?",
      ru: "Зачем планируют доходы и расходы?",
      en: "Why are income and expenses planned?",
    },
    options: {
      uz: ["Tejash uchun", "Qarzni oshirish uchun", "Pulni sarflash uchun"],
      ru: ["Для экономии", "Чтобы увеличить долг", "Чтобы тратить деньги"],
      en: ["To save money", "To increase debt", "To spend money"],
    },
    correctIndex: 0,
  },
  {
    id: '2',
    question: {
      uz: "Budjet nima?",
      ru: "Что такое бюджет?",
      en: "What is a budget?",
    },
    options: {
      uz: ["Pul yig'ish usuli", "Daromad va xarajatlar rejasi", "Bank hisobi"],
      ru: ["Способ накопления денег", "План доходов и расходов", "Банковский счёт"],
      en: ["A way to save money", "A plan for income and expenses", "A bank account"],
    },
    correctIndex: 1,
  },
  {
    id: '3',
    question: {
      uz: "50/30/20 qoidasi nima?",
      ru: "Что такое правило 50/30/20?",
      en: "What is the 50/30/20 rule?",
    },
    options: {
      uz: ["Uyqu/Ish/Dam olish", "Ehtiyoj/Xohish/Tejash", "Bank foizi"],
      ru: ["Сон/Работа/Отдых", "Потребности/Желания/Сбережения", "Банковский процент"],
      en: ["Sleep/Work/Rest", "Needs/Wants/Savings", "Bank interest"],
    },
    correctIndex: 1,
  },
  {
    id: '4',
    question: {
      uz: "Bank hech qachon nima so'ramaydi?",
      ru: "Что банк никогда не спрашивает?",
      en: "What does a bank never ask for?",
    },
    options: {
      uz: ["Ismingiz", "Karta raqami va CVV", "Telefon raqami"],
      ru: ["Ваше имя", "Номер карты и CVV", "Номер телефона"],
      en: ["Your name", "Card number and CVV", "Phone number"],
    },
    correctIndex: 1,
  },
  {
    id: '5',
    question: {
      uz: "Favqulodda fond nima?",
      ru: "Что такое чрезвычайный фонд?",
      en: "What is an emergency fund?",
    },
    options: {
      uz: ["Oylik maosh", "Kutilmagan xarajatlar uchun jamg'arma", "Kredit"],
      ru: ["Месячная зарплата", "Накопления на непредвиденные расходы", "Кредит"],
      en: ["Monthly salary", "Savings for unexpected expenses", "A loan"],
    },
    correctIndex: 1,
  },
];

const labels = {
  congratulations: { uz: "Tabriklaymiz!", ru: "Поздравляем!", en: "Congratulations!" },
  yourScore: { uz: "Sizning natijangiz:", ru: "Ваш результат:", en: "Your score:" },
  coinsEarned: { uz: "tanga oldingiz!", ru: "монет получено!", en: "coins earned!" },
  backHome: { uz: "Bosh sahifaga qaytish", ru: "На главную", en: "Back to Home" },
};

const Quiz: React.FC = () => {
  const { language } = useLanguage();
  const { coins, claimReward } = useGamification();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;

  // Timer
  useEffect(() => {
    if (showResult || quizCompleted) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setShowResult(true);
          setIsCorrect(false);
          setTimeout(goToNext, 1500);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showResult, quizCompleted]);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    const correct = index === question.correctIndex;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
    setShowResult(true);
    
    setTimeout(goToNext, 1500);
  };

  const goToNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
      const eventId = `quiz-main-${Date.now()}`;
      if (score >= totalQuestions * 0.8) {
        claimReward('QUIZ_PERFECT', eventId);
      } else {
        claimReward('QUIZ_COMPLETE', eventId);
      }
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) return 'bg-white text-[#13563D]';
    if (index === question.correctIndex) return 'bg-[#00CE93] text-white';
    if (selectedAnswer === index && !isCorrect) return 'bg-[#FF383C] text-white';
    return 'bg-white text-[#13563D]';
  };

  if (quizCompleted) {
    const earnedCoins = score >= totalQuestions * 0.8 ? 50 : 20;
    return (
      <div className="min-h-screen bg-[#13513B] flex flex-col relative overflow-hidden">
        <div 
          className="absolute top-[-211px] left-1/2 transform -translate-x-1/2 w-[640px] h-[640px] rounded-full"
          style={{ background: 'rgba(5, 220, 127, 0.23)', filter: 'blur(250px)' }}
        />
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="text-7xl mb-6">🏆</div>
            <h2 className="text-3xl font-bold text-white mb-4">{labels.congratulations[language]}</h2>
            <p className="text-xl text-white/80 mb-2">{labels.yourScore[language]}</p>
            <p className="text-6xl font-bold text-[#FFEE5A] mb-6">{score} / {totalQuestions}</p>
            <p className="text-xl text-[#00CE93] font-medium mb-10">
              +{earnedCoins} {labels.coinsEarned[language]}
            </p>
            
            <motion.button
              onClick={() => navigate('/')}
              className="px-10 py-4 bg-white text-[#13593F] rounded-full font-bold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {labels.backHome[language]}
            </motion.button>
          </motion.div>
        </div>

        <div className="relative z-10 flex justify-center pb-4">
          <div className="w-36 h-1 bg-white rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#13513B] flex flex-col relative overflow-hidden">
      <div 
        className="absolute top-[-211px] left-1/2 transform -translate-x-1/2 w-[640px] h-[640px] rounded-full"
        style={{ background: 'rgba(5, 220, 127, 0.23)', filter: 'blur(250px)' }}
      />
      
      {/* Header: X, Timer, Coins */}
      <div className="relative z-10 px-4 pt-4 pb-2 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2">
          <X className="w-7 h-7 text-white" />
        </button>
        
        {/* Circular Timer */}
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
            <circle
              cx="24" cy="24" r="20" fill="none" stroke="white" strokeWidth="3"
              strokeDasharray={2 * Math.PI * 20}
              strokeDashoffset={2 * Math.PI * 20 * (1 - timeLeft / 30)}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm">
            {String(timeLeft).padStart(2, '0')}
          </span>
        </div>
        
        {/* Coins */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#106546] rounded-full">
          <span className="font-bold text-[#FFEE5A]">{coins}</span>
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <span className="text-xs">🪙</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 mx-4 mt-2 mb-2 bg-white/20 rounded-full h-1">
        <div 
          className="bg-white rounded-full h-1 transition-all duration-300"
          style={{ width: `${((currentQuestion) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question category */}
      <div className="relative z-10 px-4 mb-2 flex items-center gap-2">
        <span className="text-white/70 text-sm">
          {language === 'uz' ? 'Budjet' : language === 'ru' ? 'Бюджет' : 'Budget'}
        </span>
        <span className="text-white/50 text-sm">{currentQuestion + 1}/{totalQuestions}</span>
      </div>

      {/* Question Text */}
      <div className="relative z-10 px-6 mb-8 mt-4">
        <h2 className="text-2xl font-semibold text-white text-center leading-tight">
          {question.question[language]}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="relative z-10 px-4 space-y-4 flex-1">
        {question.options[language].map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`w-full py-5 px-6 rounded-full font-semibold text-lg transition-all duration-300 ${getOptionStyle(index)}`}
            whileHover={!showResult ? { scale: 1.02 } : {}}
            whileTap={!showResult ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 flex justify-center py-6">
        <div className="w-36 h-1 bg-white rounded-full" />
      </div>
    </div>
  );
};

export default Quiz;
