import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGamification } from '@/contexts/GamificationContext';
import { PiggyBank, CreditCard, Wallet, Calculator, Check, Sparkles } from 'lucide-react';
import CoinReward from '@/components/CoinReward';

const Calculators: React.FC = () => {
  const { t, language } = useLanguage();
  const { claimReward, updateStreak } = useGamification();
  
  const [activeCalc, setActiveCalc] = useState<'deposit' | 'credit' | 'budget'>('deposit');
  
  const [depositAmount, setDepositAmount] = useState('10000000');
  const [depositRate, setDepositRate] = useState('23');
  const [depositMonths, setDepositMonths] = useState('12');
  
  const [creditAmount, setCreditAmount] = useState('50000000');
  const [creditRate, setCreditRate] = useState('28');
  const [creditMonths, setCreditMonths] = useState('24');

  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [savedResult, setSavedResult] = useState<string | null>(null);

  const formatNumber = (num: number) => new Intl.NumberFormat('uz-UZ').format(num);

  const calculateDeposit = () => {
    const principal = parseFloat(depositAmount) || 0;
    const rate = parseFloat(depositRate) || 0;
    const months = parseFloat(depositMonths) || 0;
    const monthlyRate = rate / 100 / 12;
    const total = principal * Math.pow(1 + monthlyRate, months);
    const interest = total - principal;
    return { total, interest };
  };

  const calculateCredit = () => {
    const principal = parseFloat(creditAmount) || 0;
    const rate = parseFloat(creditRate) || 0;
    const months = parseFloat(creditMonths) || 0;
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return { monthly: principal / months, total: principal, interest: 0 };
    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const total = monthly * months;
    return { monthly, total, interest: total - principal };
  };

  const depositResult = calculateDeposit();
  const creditResult = calculateCredit();

  const handleSaveResult = useCallback(() => {
    updateStreak();
    
    // Create unique event ID for calculator use today
    const today = new Date().toISOString().split('T')[0];
    const eventId = `calculator-${activeCalc}-${today}-${Date.now()}`;
    
    const rewarded = claimReward(eventId, 'CALCULATOR_USE', { 
      calcType: activeCalc,
      result: activeCalc === 'deposit' ? depositResult : creditResult 
    });
    
    if (rewarded) {
      setRewardAmount(10);
      setShowReward(true);
    }
    
    setSavedResult(activeCalc);
    setTimeout(() => setSavedResult(null), 2000);
  }, [activeCalc, claimReward, updateStreak, depositResult, creditResult]);

  const tabs = [
    { id: 'deposit' as const, label: t('depositCalc'), icon: PiggyBank },
    { id: 'credit' as const, label: t('creditCalc'), icon: CreditCard },
    { id: 'budget' as const, label: t('budgetCalc'), icon: Wallet },
  ];

  const labels = {
    amount: { uz: "Miqdor (so'm)", ru: "Сумма (сум)", en: "Amount (UZS)" },
    rate: { uz: "Foiz stavkasi (%)", ru: "Ставка (%)", en: "Rate (%)" },
    months: { uz: "Muddat (oy)", ru: "Срок (мес)", en: "Term (months)" },
    result: { uz: "Natija", ru: "Результат", en: "Result" },
    totalDeposit: { uz: "Jami summa", ru: "Общая сумма", en: "Total Amount" },
    interest: { uz: "Foiz daromadi", ru: "Доход", en: "Interest" },
    monthlyPayment: { uz: "Oylik to'lov", ru: "Ежемесячный платеж", en: "Monthly Payment" },
    totalPayment: { uz: "Jami to'lov", ru: "Общий платеж", en: "Total Payment" },
    totalInterest: { uz: "Jami foiz", ru: "Всего процентов", en: "Total Interest" },
    budgetNote: { uz: "Budjet kalkulyatori tez orada", ru: "Скоро будет добавлен", en: "Coming soon" },
    saveResult: { uz: "Natijani saqlash", ru: "Сохранить результат", en: "Save Result" },
    saved: { uz: "Saqlandi!", ru: "Сохранено!", en: "Saved!" },
    earnCoins: { uz: "+10 tanga oling", ru: "+10 монет", en: "+10 coins" },
  };

  return (
    <Layout showBack title={t('calculators')}>
      <div className="py-4">
        {/* Tabs */}
        <div className="flex gap-2 px-4 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCalc(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-active ${
                activeCalc === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Deposit Calculator */}
        {activeCalc === 'deposit' && (
          <motion.div 
            className="px-4 space-y-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-4">
              {[
                { label: labels.amount[language], value: depositAmount, setter: setDepositAmount },
                { label: labels.rate[language], value: depositRate, setter: setDepositRate },
                { label: labels.months[language], value: depositMonths, setter: setDepositMonths },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                  <input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
            </div>

            <div className="section-card p-4">
              <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                {labels.result[language]}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{labels.totalDeposit[language]}</span>
                  <span className="font-semibold text-foreground">{formatNumber(Math.round(depositResult.total))} so'm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{labels.interest[language]}</span>
                  <span className="font-semibold text-primary">{formatNumber(Math.round(depositResult.interest))} so'm</span>
                </div>
              </div>
            </div>

            {/* Save Result Button */}
            <motion.button
              onClick={handleSaveResult}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all touch-active ${
                savedResult === 'deposit'
                  ? 'bg-green-500 text-white'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {savedResult === 'deposit' ? (
                <>
                  <Check className="w-5 h-5" />
                  {labels.saved[language]}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {labels.saveResult[language]} • {labels.earnCoins[language]}
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Credit Calculator */}
        {activeCalc === 'credit' && (
          <motion.div 
            className="px-4 space-y-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-4">
              {[
                { label: labels.amount[language], value: creditAmount, setter: setCreditAmount },
                { label: labels.rate[language], value: creditRate, setter: setCreditRate },
                { label: labels.months[language], value: creditMonths, setter: setCreditMonths },
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                  <input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    className="w-full px-4 py-3 bg-secondary rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
            </div>

            <div className="section-card p-4">
              <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-600" />
                {labels.result[language]}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{labels.monthlyPayment[language]}</span>
                  <span className="font-semibold text-foreground">{formatNumber(Math.round(creditResult.monthly))} so'm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{labels.totalPayment[language]}</span>
                  <span className="font-semibold text-foreground">{formatNumber(Math.round(creditResult.total))} so'm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{labels.totalInterest[language]}</span>
                  <span className="font-semibold text-amber-600">{formatNumber(Math.round(creditResult.interest))} so'm</span>
                </div>
              </div>
            </div>

            {/* Save Result Button */}
            <motion.button
              onClick={handleSaveResult}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all touch-active ${
                savedResult === 'credit'
                  ? 'bg-green-500 text-white'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {savedResult === 'credit' ? (
                <>
                  <Check className="w-5 h-5" />
                  {labels.saved[language]}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {labels.saveResult[language]} • {labels.earnCoins[language]}
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Budget Calculator */}
        {activeCalc === 'budget' && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade px-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
              <Wallet className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{labels.budgetNote[language]}</p>
          </div>
        )}
      </div>

      {/* Coin Reward Animation */}
      <CoinReward
        amount={rewardAmount}
        isVisible={showReward}
        onComplete={() => setShowReward(false)}
      />
    </Layout>
  );
};

export default Calculators;
