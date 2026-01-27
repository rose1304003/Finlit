import { Language } from '@/lib/i18n';

export interface NewsItem {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
  date: string;
  category: 'update' | 'event' | 'article';
}

export const newsItems: NewsItem[] = [
  {
    id: 'finlit-launch',
    title: {
      uz: "Finlit platformasi ishga tushdi!",
      ru: "Платформа Finlit запущена!",
      en: "Finlit platform launched!",
    },
    excerpt: {
      uz: "O'zbekiston Markaziy banki tomonidan moliyaviy savodxonlik platformasi ishga tushirildi.",
      ru: "Центральный банк Узбекистана запустил платформу финансовой грамотности.",
      en: "The Central Bank of Uzbekistan has launched a financial literacy platform.",
    },
    content: {
      uz: "O'zbekiston Markaziy banki tomonidan moliyaviy savodxonlik platformasi ishga tushirildi. Ushbu platforma orqali fuqarolar moliyaviy bilimlarini oshirishlari mumkin.",
      ru: "Центральный банк Узбекистана запустил платформу финансовой грамотности. Через эту платформу граждане могут повысить свои финансовые знания.",
      en: "The Central Bank of Uzbekistan has launched a financial literacy platform. Through this platform, citizens can improve their financial knowledge.",
    },
    date: "2025-01-20",
    category: 'update',
  },
  {
    id: 'finright-program',
    title: {
      uz: "FinRight dasturi boshlandi",
      ru: "Программа FinRight началась",
      en: "FinRight program started",
    },
    excerpt: {
      uz: "Moliyaviy huquqlar bo'yicha yangi o'quv dasturi barcha fuqarolar uchun bepul taqdim etiladi.",
      ru: "Новая образовательная программа по финансовым правам предоставляется бесплатно всем гражданам.",
      en: "A new educational program on financial rights is provided free to all citizens.",
    },
    content: {
      uz: "Moliyaviy huquqlar bo'yicha yangi o'quv dasturi barcha fuqarolar uchun bepul taqdim etiladi.",
      ru: "Новая образовательная программа по финансовым правам предоставляется бесплатно всем гражданам.",
      en: "A new educational program on financial rights is provided free to all citizens.",
    },
    date: "2025-01-18",
    category: 'event',
  },
  {
    id: 'savings-tips',
    title: {
      uz: "Pul jamg'arishning 5 ta samarali usuli",
      ru: "5 эффективных способов накопления денег",
      en: "5 effective ways to save money",
    },
    excerpt: {
      uz: "Ekspertlar tomonidan tavsiya etilgan pul jamg'arish strategiyalari bilan tanishing.",
      ru: "Ознакомьтесь со стратегиями накопления денег, рекомендованными экспертами.",
      en: "Learn about money saving strategies recommended by experts.",
    },
    content: {
      uz: "Ekspertlar tomonidan tavsiya etilgan pul jamg'arish strategiyalari bilan tanishing.",
      ru: "Ознакомьтесь со стратегиями накопления денег, рекомендованными экспертами.",
      en: "Learn about money saving strategies recommended by experts.",
    },
    date: "2025-01-15",
    category: 'article',
  },
];
