import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { Search, Bell, Home, Lightbulb, Calculator, User, X, ChevronLeft } from 'lucide-react';
import mascotImage from '@/assets/mascot.png';

type CalcType = 'credit' | 'deposit' | 'budget' | null;

const labels = {
  uz: {
    selectCalc: "KERAKLI HISOBLASH TURINI TANLANG",
    all: "Barcha loyihalar",
    credit: "KREDIT KALKULYATORI",
    creditDesc: "Asosiy ma'lumotlarni kiriting va kalkulyatorning o'zi oylik foiz miqdorlarini hisablab beradi.",
    deposit: "DEPOZIT KALKULYATORI",
    depositDesc: "Redit tashkilotlarining turli xil takliflarini solishtirishingiz mumkin",
    budget: "BUDJET REJALASHTIRISH",
    budgetDesc: "Oylik xarajatlaringizni rejalang va tejashni oshiring",
    loanAmount: "Kredit miqdori (so'm)",
    interestRate: "Yillik foiz stavkasi (%)",
    months: "Muddati (oy)",
    calculate: "Hisoblash",
    monthlyPayment: "Oylik to'lov",
    totalPayment: "Jami to'lov",
    totalInterest: "Jami foiz",
    depositAmount: "Depozit miqdori (so'm)",
    depositMonths: "Muddat (oy)",
    income: "Daromad (so'm)",
    housing: "Uy-joy xarajatlari",
    food: "Oziq-ovqat",
    transport: "Transport",
    entertainment: "Ko'ngil ochar",
    savings: "Tejash",
    remaining: "Qolgan",
    result: "Natija",
    back: "Orqaga",
    home: "Uy",
    projects: "Loyihalar",
    search: "Qidirish...",
  },
  ru: {
    selectCalc: "ВЫБЕРИТЕ ТИП РАСЧЁТА",
    all: "Все проекты",
    credit: "КРЕДИТНЫЙ КАЛЬКУЛЯТОР",
    creditDesc: "Введите данные — калькулятор автоматически рассчитает ежемесячные платежи.",
    deposit: "КАЛЬКУЛЯТОР ДЕПОЗИТА",
    depositDesc: "Сравнивайте предложения различных кредитных организаций",
    budget: "ПЛАНИРОВЩИК БЮДЖЕТА",
    budgetDesc: "Планируйте ежемесячные расходы и увеличивайте сбережения",
    loanAmount: "Сумма кредита (сум)",
    interestRate: "Годовая ставка (%)",
    months: "Срок (месяцев)",
    calculate: "Рассчитать",
    monthlyPayment: "Ежемесячный платёж",
    totalPayment: "Общая сумма",
    totalInterest: "Общий процент",
    depositAmount: "Сумма депозита (сум)",
    depositMonths: "Срок (месяцев)",
    income: "Доход (сум)",
    housing: "Жильё",
    food: "Питание",
    transport: "Транспорт",
    entertainment: "Развлечения",
    savings: "Сбережения",
    remaining: "Остаток",
    result: "Результат",
    back: "Назад",
    home: "Главная",
    projects: "Проекты",
    search: "Поиск...",
  },
  en: {
    selectCalc: "SELECT CALCULATOR TYPE",
    all: "All Projects",
    credit: "CREDIT CALCULATOR",
    creditDesc: "Enter the key details and the calculator will compute your monthly payments.",
    deposit: "DEPOSIT CALCULATOR",
    depositDesc: "Compare offers from various financial institutions",
    budget: "BUDGET PLANNER",
    budgetDesc: "Plan your monthly expenses and increase savings",
    loanAmount: "Loan amount (UZS)",
    interestRate: "Annual interest rate (%)",
    months: "Term (months)",
    calculate: "Calculate",
    monthlyPayment: "Monthly payment",
    totalPayment: "Total payment",
    totalInterest: "Total interest",
    depositAmount: "Deposit amount (UZS)",
    depositMonths: "Term (months)",
    income: "Income (UZS)",
    housing: "Housing",
    food: "Food",
    transport: "Transport",
    entertainment: "Entertainment",
    savings: "Savings",
    remaining: "Remaining",
    result: "Result",
    back: "Back",
    home: "Home",
    projects: "Projects",
    search: "Search...",
  }
};

const formatNum = (n: number) =>
  new Intl.NumberFormat('uz-UZ').format(Math.round(n));

// ─── CREDIT CALCULATOR ───────────────────────────────────────────────────────
const CreditCalc: React.FC<{ lang: 'uz' | 'ru' | 'en' }> = ({ lang }) => {
  const l = labels[lang];
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(amount.replace(/\s/g, ''));
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(months);
    if (!P || !r || !n) return;
    const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    setResult({ monthly, total, interest: total - P });
  };

  return (
    <div className="space-y-4">
      <Input label={l.loanAmount} value={amount} onChange={setAmount} type="number" />
      <Input label={l.interestRate} value={rate} onChange={setRate} type="number" />
      <Input label={l.months} value={months} onChange={setMonths} type="number" />
      <button onClick={calculate} className="w-full py-4 bg-[#13593F] text-white rounded-2xl font-bold text-lg">
        {l.calculate}
      </button>
      {result && (
        <ResultCard items={[
          { label: l.monthlyPayment, value: formatNum(result.monthly) + ' so\'m' },
          { label: l.totalPayment, value: formatNum(result.total) + ' so\'m' },
          { label: l.totalInterest, value: formatNum(result.interest) + ' so\'m' },
        ]} />
      )}
    </div>
  );
};

// ─── DEPOSIT CALCULATOR ───────────────────────────────────────────────────────
const DepositCalc: React.FC<{ lang: 'uz' | 'ru' | 'en' }> = ({ lang }) => {
  const l = labels[lang];
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');
  const [result, setResult] = useState<{ earned: number; total: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(amount.replace(/\s/g, ''));
    const r = parseFloat(rate) / 100;
    const t = parseInt(months) / 12;
    if (!P || !r || !t) return;
    const earned = P * r * t;
    setResult({ earned, total: P + earned });
  };

  return (
    <div className="space-y-4">
      <Input label={l.depositAmount} value={amount} onChange={setAmount} type="number" />
      <Input label={l.interestRate} value={rate} onChange={setRate} type="number" />
      <Input label={l.depositMonths} value={months} onChange={setMonths} type="number" />
      <button onClick={calculate} className="w-full py-4 bg-[#13593F] text-white rounded-2xl font-bold text-lg">
        {l.calculate}
      </button>
      {result && (
        <ResultCard items={[
          { label: l.totalInterest, value: formatNum(result.earned) + ' so\'m' },
          { label: l.totalPayment, value: formatNum(result.total) + ' so\'m' },
        ]} />
      )}
    </div>
  );
};

// ─── BUDGET PLANNER ───────────────────────────────────────────────────────────
const BudgetCalc: React.FC<{ lang: 'uz' | 'ru' | 'en' }> = ({ lang }) => {
  const l = labels[lang];
  const [income, setIncome] = useState('');
  const [housing, setHousing] = useState('');
  const [food, setFood] = useState('');
  const [transport, setTransport] = useState('');
  const [entertainment, setEntertainment] = useState('');
  const [savings, setSavings] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const inc = parseFloat(income) || 0;
    const expenses = [housing, food, transport, entertainment, savings]
      .reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
    setResult(inc - expenses);
  };

  return (
    <div className="space-y-4">
      <Input label={l.income} value={income} onChange={setIncome} type="number" />
      <Input label={l.housing} value={housing} onChange={setHousing} type="number" />
      <Input label={l.food} value={food} onChange={setFood} type="number" />
      <Input label={l.transport} value={transport} onChange={setTransport} type="number" />
      <Input label={l.entertainment} value={entertainment} onChange={setEntertainment} type="number" />
      <Input label={l.savings} value={savings} onChange={setSavings} type="number" />
      <button onClick={calculate} className="w-full py-4 bg-[#13593F] text-white rounded-2xl font-bold text-lg">
        {l.calculate}
      </button>
      {result !== null && (
        <ResultCard items={[
          { label: l.remaining, value: formatNum(result) + ' so\'m', highlight: result >= 0 ? 'green' : 'red' },
        ]} />
      )}
    </div>
  );
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const Input: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string }> = ({ label, value, onChange, type }) => (
  <div>
    <p className="text-white/70 text-sm mb-1">{label}</p>
    <input
      type={type || 'text'}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#FFEE5A]"
    />
  </div>
);

const ResultCard: React.FC<{ items: { label: string; value: string; highlight?: 'green' | 'red' }[] }> = ({ items }) => (
  <motion.div 
    className="bg-white/10 rounded-2xl p-4 space-y-3"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {items.map((item, i) => (
      <div key={i} className="flex justify-between items-center">
        <span className="text-white/70 text-sm">{item.label}</span>
        <span className={`font-bold text-lg ${item.highlight === 'red' ? 'text-red-400' : 'text-[#FFEE5A]'}`}>
          {item.value}
        </span>
      </div>
    ))}
  </motion.div>
);

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const Calculators: React.FC = () => {
  const { language } = useLanguage();
  const { coins, username } = useGamification();
  const navigate = useNavigate();
  const l = labels[language];

  const [activeCalc, setActiveCalc] = useState<CalcType>(null);

  const displayName = username || 'Gafurova Anora';

  const calcCards = [
    { type: 'credit' as CalcType, title: l.credit, desc: l.creditDesc, icon: '💳' },
    { type: 'deposit' as CalcType, title: l.deposit, desc: l.depositDesc, icon: '💰' },
    { type: 'budget' as CalcType, title: l.budget, desc: l.budgetDesc, icon: '📊' },
  ];

  const activeTitle = activeCalc ? calcCards.find(c => c.type === activeCalc)?.title : '';

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-28">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/profile')}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#13593F]/30 bg-orange-200">
              <img src={mascotImage} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-white">{displayName}</p>
            </div>
          </motion.div>
          
          <motion.div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#106546] rounded-full">
            <span className="font-bold text-[#FFEE5A]">{coins}</span>
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
              <span className="text-xs">🪙</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <motion.button
          onClick={() => navigate('/search')}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white rounded-full"
          whileTap={{ scale: 0.98 }}
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400 flex-1 text-left">{l.search}</span>
          <Bell className="w-5 h-5 text-[#13593F]" />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {!activeCalc ? (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Banner */}
            <motion.div 
              className="mx-4 mb-4 p-4 bg-[#13593F] rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h2 className="text-lg font-bold text-white">{l.selectCalc.split(' ').slice(0, 1).join(' ')}</h2>
                  <h2 className="text-lg font-bold text-[#FFEE5A]">{l.selectCalc.split(' ').slice(1, 2).join(' ')}</h2>
                  <h2 className="text-lg font-bold text-white">{l.selectCalc.split(' ').slice(2).join(' ')}</h2>
                </div>
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img src={mascotImage} alt="FinFox" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>

            <div className="px-4 mb-3">
              <p className="text-[#FFEE5A] font-medium">{l.all}</p>
            </div>

            <div className="px-4 space-y-4">
              {calcCards.map((card, i) => (
                <motion.button
                  key={card.type}
                  onClick={() => setActiveCalc(card.type)}
                  className="w-full bg-[#13593F] rounded-2xl p-5 text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="text-[#FFEE5A] font-bold text-xl mb-2">{card.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-4">{card.desc}</p>
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-[#0f4a33] rounded-full">
                        <Calculator className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                      <span className="text-5xl">{card.icon}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="calc" 
            className="px-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
          >
            {/* Back header */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setActiveCalc(null)}
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <h2 className="text-white font-bold text-lg">{activeTitle}</h2>
            </div>

            <div className="bg-[#13593F] rounded-2xl p-5">
              {activeCalc === 'credit' && <CreditCalc lang={language} />}
              {activeCalc === 'deposit' && <DepositCalc lang={language} />}
              {activeCalc === 'budget' && <BudgetCalc lang={language} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl px-4 py-3 z-50 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 px-4 py-2 text-gray-400">
            <Home className="w-6 h-6" />
            <span className="text-xs">{l.home}</span>
          </button>
          <button onClick={() => navigate('/projects')} className="flex flex-col items-center gap-1 px-4 py-2 text-gray-400">
            <Lightbulb className="w-6 h-6" />
            <span className="text-xs">{l.projects}</span>
          </button>
          <button onClick={() => navigate('/calculators')} className="flex flex-col items-center gap-1 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-[#13593F] flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-[#13593F] font-medium">
              {language === 'uz' ? 'Hisoblash' : language === 'ru' ? 'Расчёты' : 'Calculate'}
            </span>
          </button>
          <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1 px-4 py-2 text-gray-400">
            <User className="w-6 h-6" />
            <span className="text-xs">{language === 'uz' ? 'Profil' : language === 'ru' ? 'Профиль' : 'Profile'}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Calculators;
