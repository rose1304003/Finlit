import { Language } from '@/lib/i18n';

export interface LibraryItem {
  id: string;
  type: 'book' | 'podcast' | 'guide';
  title: Record<Language, string>;
  author: string;
  description: Record<Language, string>;
  rating?: number;
}

export const libraryItems: LibraryItem[] = [
  {
    id: 'rich-dad',
    type: 'book',
    title: { uz: "Boy ota, kambag'al ota", ru: "Богатый папа, бедный папа", en: "Rich Dad Poor Dad" },
    author: "Robert Kiyosaki",
    description: { uz: "Moliyaviy savodxonlik haqida mashhur kitob", ru: "Популярная книга о финансовой грамотности", en: "Popular book about financial literacy" },
    rating: 4.8,
  },
  {
    id: 'total-money',
    type: 'book',
    title: { uz: "Pulni to'liq o'zgartirish", ru: "Полная трансформация денег", en: "The Total Money Makeover" },
    author: "Dave Ramsey",
    description: { uz: "Qarzdan chiqish uchun amaliy qo'llanma", ru: "Практическое руководство по избавлению от долгов", en: "Practical guide to getting out of debt" },
    rating: 4.6,
  },
  {
    id: 'finlit-podcast',
    type: 'podcast',
    title: { uz: "Finlit Podcast", ru: "Finlit Подкаст", en: "Finlit Podcast" },
    author: "CBU Team",
    description: { uz: "Moliyaviy savodxonlik bo'yicha haftalik podkast", ru: "Еженедельный подкаст о финансовой грамотности", en: "Weekly podcast about financial literacy" },
  },
  {
    id: 'money-talks',
    type: 'podcast',
    title: { uz: "Pul gaplashadi", ru: "Деньги говорят", en: "Money Talks" },
    author: "Financial Experts",
    description: { uz: "Investitsiya bo'yicha ekspert suhbatlari", ru: "Экспертные беседы об инвестициях", en: "Expert conversations about investing" },
  },
  {
    id: 'budget-guide',
    type: 'guide',
    title: { uz: "Oilaviy budjet qo'llanmasi", ru: "Руководство по семейному бюджету", en: "Family Budget Guide" },
    author: "Finlit",
    description: { uz: "Oilaviy budjetni tuzish va boshqarish", ru: "Как составить семейный бюджет", en: "How to create a family budget" },
  },
  {
    id: 'credit-guide',
    type: 'guide',
    title: { uz: "Kredit olish qo'llanmasi", ru: "Руководство по получению кредита", en: "Loan Guide" },
    author: "Finlit",
    description: { uz: "Kredit olishdan oldin bilishingiz kerak", ru: "Все о получении кредита", en: "Everything about getting a loan" },
  },
  {
    id: 'intelligent-investor',
    type: 'book',
    title: { uz: "Aqlli investor", ru: "Разумный инвестор", en: "The Intelligent Investor" },
    author: "Benjamin Graham",
    description: { uz: "Investitsiya strategiyalari va moliyaviy tushunchalar", ru: "Стратегии инвестирования и финансовые концепции", en: "Investment strategies and financial concepts" },
    rating: 4.9,
  },
  {
    id: 'psychology-of-money',
    type: 'book',
    title: { uz: "Pul psixologiyasi", ru: "Психология денег", en: "The Psychology of Money" },
    author: "Morgan Housel",
    description: { uz: "Pul bilan munosabatlar va moliyaviy qarorlar", ru: "Отношения с деньгами и финансовые решения", en: "Relationships with money and financial decisions" },
    rating: 4.7,
  },
  {
    id: 'millionaire-next-door',
    type: 'book',
    title: { uz: "Qo'shni millioner", ru: "Сосед-миллионер", en: "The Millionaire Next Door" },
    author: "Thomas J. Stanley",
    description: { uz: "Boylik yaratishning yashirin sirlari", ru: "Секреты создания богатства", en: "Secrets of building wealth" },
    rating: 4.5,
  },
  {
    id: 'bogleheads-guide',
    type: 'book',
    title: { uz: "Investitsiya bo'yicha qo'llanma", ru: "Руководство по инвестированию", en: "The Bogleheads' Guide to Investing" },
    author: "Taylor Larimore",
    description: { uz: "Oddiy va samarali investitsiya strategiyalari", ru: "Простые и эффективные стратегии инвестирования", en: "Simple and effective investment strategies" },
    rating: 4.6,
  },
  {
    id: 'your-money-or-your-life',
    type: 'book',
    title: { uz: "Pulingiz yoki hayotingiz", ru: "Ваши деньги или ваша жизнь", en: "Your Money or Your Life" },
    author: "Vicki Robin",
    description: { uz: "Moliyaviy mustaqillik va hayot sifati", ru: "Финансовая независимость и качество жизни", en: "Financial independence and quality of life" },
    rating: 4.4,
  },
  {
    id: 'finlit-investment-podcast',
    type: 'podcast',
    title: { uz: "Investitsiya bo'yicha suhbatlar", ru: "Беседы об инвестициях", en: "Investment Conversations" },
    author: "CBU Financial Experts",
    description: { uz: "Investitsiya mavzularida ekspertlar bilan suhbatlar", ru: "Беседы с экспертами об инвестициях", en: "Conversations with experts about investing" },
  },
  {
    id: 'savings-guide',
    type: 'guide',
    title: { uz: "Tejamkorlik qo'llanmasi", ru: "Руководство по экономии", en: "Savings Guide" },
    author: "Finlit",
    description: { uz: "Pul tejash va moliyaviy rejalashtirish", ru: "Экономия денег и финансовое планирование", en: "Saving money and financial planning" },
  },
];
