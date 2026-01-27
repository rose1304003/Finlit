import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import mascotImage from '@/assets/mascot.png';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = {
  uz: [
    "Kredit nima?",
    "Depozit qanday ishlaydi?",
    "Inflyatsiya nima?",
    "Budjetni qanday tuzish kerak?",
    "Moliyaviy xavfsizlik qoidalari",
  ],
  ru: [
    "Что такое кредит?",
    "Как работает депозит?",
    "Что такое инфляция?",
    "Как составить бюджет?",
    "Правила финансовой безопасности",
  ],
  en: [
    "What is credit?",
    "How does a deposit work?",
    "What is inflation?",
    "How to create a budget?",
    "Financial security rules",
  ],
};

// Simple AI responses based on keywords (simulated)
const getAIResponse = (message: string, language: 'uz' | 'ru' | 'en'): string => {
  const lowerMessage = message.toLowerCase();
  
  const responses = {
    uz: {
      kredit: "Kredit - bu bank yoki moliyaviy tashkilot tomonidan foiz evaziga beriladigan qarz mablag'lari. Kredit olishdan oldin foiz stavkasi, muddat va to'lov shartlarini diqqat bilan o'rganing. Kredit bu majburiyat, u sovg'a yoki ehson emas! 💡",
      depozit: "Depozit (omonat) - bu bankka qo'yilgan pul mablag'lari bo'lib, bank ulardan foydalangani uchun sizga foiz to'laydi. Bu xavfsiz va foydali jamg'arish usuli! Depozitlar Omonatlarni kafolatlash fondi tomonidan himoyalanadi. 🏦",
      inflyatsiya: "Inflyatsiya - bu tovarlar va xizmatlar narxlarining umumiy oshishi. Masalan, avval 1000 so'mga 1 kg non olgan bo'lsangiz, inflyatsiya tufayli endi 1200 so'm to'lashingiz kerak bo'lishi mumkin. Pul qiymatini saqlash uchun depozit yoki investitsiyalardan foydalaning! 📈",
      budjet: "Budjet tuzish uchun: 1) Oylik daromadingizni aniqlang, 2) Majburiy xarajatlarni (uy-joy, kommunal, oziq-ovqat) hisoblang, 3) Daromadning 15-20% ni tejashga ajrating, 4) Qolgan mablag'ni boshqa xarajatlarga rejalashtiring. 50/30/20 qoidasini qo'llang! 📊",
      xavfsizlik: "Moliyaviy xavfsizlik qoidalari: 1) Hech kimga bank karta ma'lumotlarini bermang, 2) SMS kodlarni hech kimga aytmang, 3) Shubhali havolalarni bosmang, 4) PIN-kodni yodda saqlang, yozmang, 5) Bank bilan faqat rasmiy raqamlar orqali bog'laning! 🔒",
      salom: "Assalomu alaykum! Men FinFox - sizning moliyaviy maslahatchingizman! 🦊 Sizga kredit, depozit, budjet, investitsiya va moliyaviy xavfsizlik haqida yordam bera olaman. Savolingiz bormi?",
      default: "Rahmat savolingiz uchun! 🦊 Men moliyaviy savodxonlik bo'yicha yordam bera olaman. Kredit, depozit, budjet, inflyatsiya yoki moliyaviy xavfsizlik haqida so'rang!"
    },
    ru: {
      kredit: "Кредит - это заемные средства, предоставляемые банком под проценты. Перед получением кредита внимательно изучите процентную ставку, срок и условия платежей. Кредит - это обязательство, а не подарок! 💡",
      депозит: "Депозит (вклад) - это денежные средства, размещенные в банке, за которые банк платит вам проценты. Это безопасный и выгодный способ сбережения! Депозиты защищены Фондом гарантирования вкладов. 🏦",
      инфляция: "Инфляция - это общий рост цен на товары и услуги. Например, если раньше за 1000 сум вы покупали 1 кг хлеба, из-за инфляции теперь может потребоваться 1200 сум. Для сохранения стоимости денег используйте депозиты или инвестиции! 📈",
      бюджет: "Для составления бюджета: 1) Определите месячный доход, 2) Посчитайте обязательные расходы, 3) Откладывайте 15-20% на сбережения, 4) Планируйте остаток на другие расходы. Используйте правило 50/30/20! 📊",
      безопасность: "Правила финансовой безопасности: 1) Никому не сообщайте данные карты, 2) Не говорите SMS-коды, 3) Не переходите по подозрительным ссылкам, 4) Запомните PIN-код, не записывайте, 5) Связывайтесь с банком только по официальным номерам! 🔒",
      привет: "Здравствуйте! Я FinFox - ваш финансовый консультант! 🦊 Могу помочь с вопросами о кредитах, депозитах, бюджете, инвестициях и финансовой безопасности. Есть вопросы?",
      default: "Спасибо за вопрос! 🦊 Я могу помочь с финансовой грамотностью. Спросите о кредитах, депозитах, бюджете, инфляции или финансовой безопасности!"
    },
    en: {
      credit: "Credit is borrowed funds provided by a bank for interest. Before getting a loan, carefully study the interest rate, term, and payment conditions. Credit is an obligation, not a gift! 💡",
      deposit: "A deposit is money placed in a bank, for which the bank pays you interest. It's a safe and profitable way to save! Deposits are protected by the Deposit Guarantee Fund. 🏦",
      inflation: "Inflation is the general rise in prices of goods and services. For example, if before you bought 1 kg of bread for 1000 sum, due to inflation you might now need 1200 sum. Use deposits or investments to preserve money value! 📈",
      budget: "To create a budget: 1) Determine monthly income, 2) Calculate mandatory expenses, 3) Set aside 15-20% for savings, 4) Plan the rest for other expenses. Use the 50/30/20 rule! 📊",
      security: "Financial security rules: 1) Never share card details, 2) Don't give SMS codes to anyone, 3) Don't click suspicious links, 4) Remember your PIN, don't write it down, 5) Contact bank only through official numbers! 🔒",
      hello: "Hello! I'm FinFox - your financial consultant! 🦊 I can help with questions about credits, deposits, budgets, investments, and financial security. Any questions?",
      default: "Thanks for your question! 🦊 I can help with financial literacy. Ask about credits, deposits, budgets, inflation, or financial security!"
    }
  };

  const langResponses = responses[language];
  
  // Check for keywords
  for (const [keyword, response] of Object.entries(langResponses)) {
    if (keyword !== 'default' && lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Check for greetings
  if (lowerMessage.includes('salom') || lowerMessage.includes('привет') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return langResponses[language === 'uz' ? 'salom' : language === 'ru' ? 'привет' : 'hello'] || langResponses.default;
  }
  
  return langResponses.default;
};

const AIChatbot: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const labels = {
    title: { uz: "FinFox Yordamchi", ru: "Помощник FinFox", en: "FinFox Assistant" },
    placeholder: { uz: "Savolingizni yozing...", ru: "Напишите ваш вопрос...", en: "Type your question..." },
    suggestions: { uz: "Mashhur savollar:", ru: "Популярные вопросы:", en: "Popular questions:" },
    typing: { uz: "FinFox yozmoqda...", ru: "FinFox печатает...", en: "FinFox is typing..." },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: getAIResponse('salom', language),
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(messageText, language);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-4 z-50 w-14 h-14 bg-gradient-to-r from-primary to-primary-dark rounded-full shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={mascotImage} alt="FinFox" className="w-10 h-10 rounded-full" />
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-20 right-4 left-4 z-50 max-w-md mx-auto bg-card rounded-3xl shadow-2xl overflow-hidden border border-border"
            style={{ maxHeight: 'calc(100vh - 140px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <img src={mascotImage} alt="FinFox" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{labels.title[language]}</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-white/80">Online</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.role === 'user' ? 'bg-primary' : 'bg-gradient-to-br from-amber-400 to-orange-400'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-sm">🦊</span>
                    )}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl ${
                    message.role === 'user' 
                      ? 'bg-primary text-white rounded-br-md' 
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
                    <span className="text-sm">🦊</span>
                  </div>
                  <div className="bg-muted p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-muted-foreground/50 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">{labels.suggestions[language]}</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions[language].slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(question)}
                      className="text-xs px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-foreground transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={labels.placeholder[language]}
                  className="flex-1 px-4 py-2 bg-secondary rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
