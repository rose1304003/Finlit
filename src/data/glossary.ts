// Comprehensive glossary data from finlit.uz
// Lug'at - O'zbekiston Respublikasi Markaziy bankining moliyaviy savodxonlik bo'yicha axborot-ta'lim veb-sayti

export interface GlossaryTerm {
  id: string;
  term_uz: string;
  term_ru: string;
  term_en: string;
  definition_uz: string;
  definition_ru: string;
  definition_en: string;
  category?: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  // A
  {
    id: "aholi-daromadlari",
    term_uz: "Aholi daromadlari",
    term_ru: "Доходы населения",
    term_en: "Population Income",
    definition_uz: "Aholi daromadlari - bu fuqarolarning mehnat faoliyati, tadbirkorlik, mulk va boshqa manbalardan oladigan pul mablag'lari yig'indisi.",
    definition_ru: "Доходы населения - это совокупность денежных средств, получаемых гражданами от трудовой деятельности, предпринимательства, имущества и других источников.",
    definition_en: "Population income is the total amount of money received by citizens from employment, business, property and other sources.",
    category: "income"
  },
  {
    id: "aksiya",
    term_uz: "Aksiya",
    term_ru: "Акция",
    term_en: "Stock/Share",
    definition_uz: "Aksiya - aksiyadorlik jamiyati ustav kapitalidagi ulushni tasdiqlovchi qimmatli qog'oz bo'lib, uning egasiga kompaniyani boshqarishda ishtirok etish va dividendlar olish huquqini beradi.",
    definition_ru: "Акция - ценная бумага, удостоверяющая долю в уставном капитале акционерного общества, дающая право её владельцу участвовать в управлении компанией и получать дивиденды.",
    definition_en: "A stock/share is a security that certifies ownership in a company's capital, giving the holder the right to participate in management and receive dividends.",
    category: "securities"
  },
  {
    id: "akkreditiv",
    term_uz: "Akkreditiv",
    term_ru: "Аккредитив",
    term_en: "Letter of Credit",
    definition_uz: "Akkreditiv - bank tomonidan beriladigan hujjat bo'lib, u sotuvchiga tovarlar yetkazib berilgandan so'ng to'lov olinishini kafolatlaydi.",
    definition_ru: "Аккредитив - документ, выдаваемый банком, гарантирующий продавцу получение оплаты после доставки товаров.",
    definition_en: "A letter of credit is a document issued by a bank guaranteeing the seller payment after delivery of goods.",
    category: "banking"
  },
  // B
  {
    id: "bank",
    term_uz: "Bank",
    term_ru: "Банк",
    term_en: "Bank",
    definition_uz: "Bank - bu moliyaviy muassasa bo'lib, u omonatlarni qabul qilish, kreditlar berish va boshqa moliyaviy xizmatlarni ko'rsatish bilan shug'ullanadi.",
    definition_ru: "Банк - финансовое учреждение, которое принимает депозиты, выдает кредиты и оказывает другие финансовые услуги.",
    definition_en: "A bank is a financial institution that accepts deposits, provides loans, and offers other financial services.",
    category: "banking"
  },
  {
    id: "bank-kafolati",
    term_uz: "Bank kafolati",
    term_ru: "Банковская гарантия",
    term_en: "Bank Guarantee",
    definition_uz: "Bank kafolati - bu bankning uchinchi shaxs oldidagi majburiyatlarni bajarishni ta'minlash bo'yicha yozma majburiyati.",
    definition_ru: "Банковская гарантия - это письменное обязательство банка по обеспечению выполнения обязательств перед третьим лицом.",
    definition_en: "A bank guarantee is a bank's written commitment to ensure the fulfillment of obligations to a third party.",
    category: "banking"
  },
  {
    id: "bitcoin",
    term_uz: "Bitcoin",
    term_ru: "Биткоин",
    term_en: "Bitcoin",
    definition_uz: "Bitcoin - bu markazsizlashtirilgan raqamli valyuta bo'lib, u peer-to-peer tarmoqda ishlaydi va hech qanday markaziy organ tomonidan nazorat qilinmaydi.",
    definition_ru: "Биткоин - децентрализованная цифровая валюта, работающая в одноранговой сети без контроля какого-либо центрального органа.",
    definition_en: "Bitcoin is a decentralized digital currency that operates on a peer-to-peer network without control by any central authority.",
    category: "cryptocurrency"
  },
  {
    id: "blockchain",
    term_uz: "Blockchain",
    term_ru: "Блокчейн",
    term_en: "Blockchain",
    definition_uz: "Blockchain - bu markazlashtirilmagan ma'lumotlar bazasi texnologiyasi bo'lib, unda ma'lumotlar zanjir shaklida saqlanadi va o'zgartirilishi mumkin emas.",
    definition_ru: "Блокчейн - технология децентрализованной базы данных, где данные хранятся в виде цепочки и не могут быть изменены.",
    definition_en: "Blockchain is a decentralized database technology where data is stored in a chain format and cannot be modified.",
    category: "technology"
  },
  {
    id: "budjet",
    term_uz: "Budjet",
    term_ru: "Бюджет",
    term_en: "Budget",
    definition_uz: "Budjet - bu ma'lum davr uchun daromadlar va xarajatlarning rejalashtirilgan hisobi. Oilaviy budjet oila moliyaviy resurslarini boshqarish uchun muhim vosita hisoblanadi.",
    definition_ru: "Бюджет - это плановый расчет доходов и расходов на определенный период. Семейный бюджет является важным инструментом управления финансовыми ресурсами семьи.",
    definition_en: "A budget is a planned calculation of income and expenses for a specific period. A family budget is an important tool for managing family financial resources.",
    category: "finance"
  },
  // D
  {
    id: "depozit",
    term_uz: "Depozit (Omonat)",
    term_ru: "Депозит (Вклад)",
    term_en: "Deposit",
    definition_uz: "Depozit - bu bankka qo'yilgan pul mablag'lari bo'lib, bank ulardan foydalangani uchun omonatchi belgilangan foiz stavkasida daromad oladi.",
    definition_ru: "Депозит - это денежные средства, размещенные в банке, за использование которых вкладчик получает доход по установленной процентной ставке.",
    definition_en: "A deposit is money placed in a bank, for which the depositor receives income at a specified interest rate.",
    category: "banking"
  },
  {
    id: "deflyatsiya",
    term_uz: "Deflyatsiya",
    term_ru: "Дефляция",
    term_en: "Deflation",
    definition_uz: "Deflyatsiya - bu umumiy narxlar darajasining pasayishi va pul qiymatining oshishi jarayoni.",
    definition_ru: "Дефляция - процесс снижения общего уровня цен и повышения стоимости денег.",
    definition_en: "Deflation is the process of falling general price levels and increasing value of money.",
    category: "economics"
  },
  {
    id: "dividend",
    term_uz: "Dividend",
    term_ru: "Дивиденд",
    term_en: "Dividend",
    definition_uz: "Dividend - bu aksiyadorlik jamiyati foydasining aksiyadorlar o'rtasida taqsimlanadigan qismi.",
    definition_ru: "Дивиденд - часть прибыли акционерного общества, распределяемая между акционерами.",
    definition_en: "A dividend is a portion of a company's profits distributed among shareholders.",
    category: "securities"
  },
  // E
  {
    id: "elektron-pullar",
    term_uz: "Elektron pullar",
    term_ru: "Электронные деньги",
    term_en: "Electronic Money",
    definition_uz: "Elektron pullar - bu elektron shaklda saqlanadigan va turli to'lov operatsiyalari uchun ishlatiladigan pul qiymati.",
    definition_ru: "Электронные деньги - денежная стоимость, хранящаяся в электронной форме и используемая для различных платежных операций.",
    definition_en: "Electronic money is monetary value stored in electronic form and used for various payment operations.",
    category: "payments"
  },
  // F
  {
    id: "foiz-stavkasi",
    term_uz: "Foiz stavkasi",
    term_ru: "Процентная ставка",
    term_en: "Interest Rate",
    definition_uz: "Foiz stavkasi - bu qarz mablag'lari yoki investitsiyalar uchun to'lanadigan foiz miqdori, odatda yillik foiz sifatida ifodalanadi.",
    definition_ru: "Процентная ставка - величина процента, выплачиваемого за заемные средства или инвестиции, обычно выражается в годовом исчислении.",
    definition_en: "An interest rate is the amount of interest paid for borrowed funds or investments, usually expressed as an annual percentage.",
    category: "finance"
  },
  {
    id: "fyuchers",
    term_uz: "Fyuchers",
    term_ru: "Фьючерс",
    term_en: "Futures",
    definition_uz: "Fyuchers - bu kelajakda ma'lum bir sanada ma'lum narxda aktivni sotib olish yoki sotish bo'yicha standart shartnoma.",
    definition_ru: "Фьючерс - стандартный контракт на покупку или продажу актива по определенной цене в будущем на определенную дату.",
    definition_en: "A futures contract is a standardized agreement to buy or sell an asset at a predetermined price on a specific future date.",
    category: "securities"
  },
  // G
  {
    id: "garov",
    term_uz: "Garov",
    term_ru: "Залог",
    term_en: "Collateral",
    definition_uz: "Garov - bu kredit olishda qarzdor tomonidan bank yoki kreditorga taqdim etiladigan mol-mulk bo'lib, qarz qaytarilmagan taqdirda kreditor tomonidan sotilishi mumkin.",
    definition_ru: "Залог - имущество, предоставляемое заемщиком банку или кредитору при получении кредита, которое может быть продано кредитором в случае невозврата долга.",
    definition_en: "Collateral is property provided by a borrower to a bank or lender when obtaining a loan, which can be sold by the lender if the debt is not repaid.",
    category: "credit"
  },
  // I
  {
    id: "inflyatsiya",
    term_uz: "Inflyatsiya",
    term_ru: "Инфляция",
    term_en: "Inflation",
    definition_uz: "Inflyatsiya - bu tovarlar va xizmatlar narxlarining umumiy darajasining oshishi va pul qiymatining pasayishi jarayoni.",
    definition_ru: "Инфляция - процесс повышения общего уровня цен на товары и услуги и снижения стоимости денег.",
    definition_en: "Inflation is the process of rising general price levels for goods and services and decreasing value of money.",
    category: "economics"
  },
  {
    id: "investitsiya",
    term_uz: "Investitsiya",
    term_ru: "Инвестиция",
    term_en: "Investment",
    definition_uz: "Investitsiya - bu kelajakda daromad olish maqsadida kapital mablag'larni joylashtirish.",
    definition_ru: "Инвестиция - размещение капитальных средств с целью получения дохода в будущем.",
    definition_en: "An investment is the placement of capital with the aim of generating income in the future.",
    category: "finance"
  },
  {
    id: "ipoteka",
    term_uz: "Ipoteka",
    term_ru: "Ипотека",
    term_en: "Mortgage",
    definition_uz: "Ipoteka - bu ko'chmas mulkni garovga qo'yish orqali olinadigan uzoq muddatli kredit turi.",
    definition_ru: "Ипотека - вид долгосрочного кредита, получаемого под залог недвижимости.",
    definition_en: "A mortgage is a type of long-term loan obtained against real estate collateral.",
    category: "credit"
  },
  // K
  {
    id: "kredit",
    term_uz: "Kredit",
    term_ru: "Кредит",
    term_en: "Credit/Loan",
    definition_uz: "Kredit - bu bank yoki moliyaviy tashkilot tomonidan foiz evaziga beriladigan qarz mablag'lari. Kredit oluvchi belgilangan muddat ichida asosiy qarz va foizlarni qaytarishi shart.",
    definition_ru: "Кредит - заемные средства, предоставляемые банком или финансовой организацией под проценты. Заемщик обязан вернуть основной долг и проценты в установленный срок.",
    definition_en: "A credit/loan is borrowed funds provided by a bank or financial institution for interest. The borrower must repay the principal and interest within the specified period.",
    category: "credit"
  },
  {
    id: "kredit-kartasi",
    term_uz: "Kredit kartasi",
    term_ru: "Кредитная карта",
    term_en: "Credit Card",
    definition_uz: "Kredit kartasi - bu bank tomonidan mijozga beriladigan plastik karta bo'lib, u orqali bank hisobidan qarz olish va to'lovlar amalga oshirish mumkin.",
    definition_ru: "Кредитная карта - пластиковая карта, выдаваемая банком клиенту, позволяющая брать кредит с банковского счета и осуществлять платежи.",
    definition_en: "A credit card is a plastic card issued by a bank to a customer, allowing them to borrow from the bank account and make payments.",
    category: "banking"
  },
  // L
  {
    id: "likvidlik",
    term_uz: "Likvidlik",
    term_ru: "Ликвидность",
    term_en: "Liquidity",
    definition_uz: "Likvidlik - bu aktivlarni tez va yo'qotishsiz naqd pulga aylantirish qobiliyati.",
    definition_ru: "Ликвидность - способность быстро и без потерь конвертировать активы в наличные деньги.",
    definition_en: "Liquidity is the ability to quickly convert assets into cash without loss.",
    category: "finance"
  },
  {
    id: "lizing",
    term_uz: "Lizing (moliyaviy ijara)",
    term_ru: "Лизинг (финансовая аренда)",
    term_en: "Leasing (Financial Lease)",
    definition_uz: "Lizing - bu mol-mulkni uzoq muddatga ijaraga berish va ijara muddati tugagandan so'ng uni sotib olish imkoniyatini beruvchi moliyaviy xizmat.",
    definition_ru: "Лизинг - финансовая услуга, предоставляющая возможность долгосрочной аренды имущества с правом его выкупа по окончании срока аренды.",
    definition_en: "Leasing is a financial service that provides long-term rental of property with the option to purchase it at the end of the lease term.",
    category: "finance"
  },
  // M
  {
    id: "markaziy-bank",
    term_uz: "Markaziy bank",
    term_ru: "Центральный банк",
    term_en: "Central Bank",
    definition_uz: "Markaziy bank - bu mamlakatning pul-kredit siyosatini boshqaruvchi, banknotlar chiqaruvchi va bank tizimini nazorat qiluvchi asosiy moliyaviy tashkilot.",
    definition_ru: "Центральный банк - главное финансовое учреждение, управляющее денежно-кредитной политикой страны, выпускающее банкноты и контролирующее банковскую систему.",
    definition_en: "A central bank is the main financial institution that manages a country's monetary policy, issues banknotes, and supervises the banking system.",
    category: "banking"
  },
  {
    id: "moliyaviy-savodxonlik",
    term_uz: "Moliyaviy savodxonlik",
    term_ru: "Финансовая грамотность",
    term_en: "Financial Literacy",
    definition_uz: "Moliyaviy savodxonlik - bu shaxsiy moliyani to'g'ri boshqarish, budjet tuzish, tejash, investitsiya qilish va moliyaviy qarorlar qabul qilish qobiliyati.",
    definition_ru: "Финансовая грамотность - способность правильно управлять личными финансами, составлять бюджет, сберегать, инвестировать и принимать финансовые решения.",
    definition_en: "Financial literacy is the ability to properly manage personal finances, budget, save, invest, and make financial decisions.",
    category: "education"
  },
  {
    id: "moliyaviy-xavfsizlik",
    term_uz: "Moliyaviy xavfsizlik",
    term_ru: "Финансовая безопасность",
    term_en: "Financial Security",
    definition_uz: "Moliyaviy xavfsizlik - bu shaxs yoki oilaning moliyaviy resurslarini firibgarlik, yo'qotish va boshqa xavflardan himoya qilish.",
    definition_ru: "Финансовая безопасность - защита финансовых ресурсов лица или семьи от мошенничества, потерь и других рисков.",
    definition_en: "Financial security is the protection of personal or family financial resources from fraud, loss, and other risks.",
    category: "security"
  },
  // O
  {
    id: "obligatsiya",
    term_uz: "Obligatsiya",
    term_ru: "Облигация",
    term_en: "Bond",
    definition_uz: "Obligatsiya - bu emitentning qarz majburiyatini tasdiqlovchi qimmatli qog'oz bo'lib, u belgilangan muddatda nominal qiymatini va foizlarni to'lashni kafolatlaydi.",
    definition_ru: "Облигация - ценная бумага, удостоверяющая долговое обязательство эмитента, гарантирующая выплату номинальной стоимости и процентов в установленный срок.",
    definition_en: "A bond is a security confirming the issuer's debt obligation, guaranteeing payment of the face value and interest on a specified date.",
    category: "securities"
  },
  {
    id: "overdraft",
    term_uz: "Overdraft",
    term_ru: "Овердрафт",
    term_en: "Overdraft",
    definition_uz: "Overdraft - bu bank hisobvarag'idagi mablag'lardan ko'proq summa sarflash imkonini beruvchi qisqa muddatli kredit turi.",
    definition_ru: "Овердрафт - вид краткосрочного кредита, позволяющий расходовать сумму, превышающую средства на банковском счете.",
    definition_en: "An overdraft is a type of short-term credit that allows spending more than the available balance in a bank account.",
    category: "credit"
  },
  // P
  {
    id: "plastik-karta",
    term_uz: "Plastik karta",
    term_ru: "Пластиковая карта",
    term_en: "Plastic Card",
    definition_uz: "Plastik karta - bu bank hisobvarag'iga ulangan va naqdsiz to'lovlar amalga oshirish, naqd pul olish uchun ishlatiladigan to'lov vositasi.",
    definition_ru: "Пластиковая карта - платежное средство, связанное с банковским счетом и используемое для безналичных платежей и снятия наличных.",
    definition_en: "A plastic card is a payment instrument linked to a bank account and used for cashless payments and cash withdrawals.",
    category: "payments"
  },
  {
    id: "pul-massasi",
    term_uz: "Pul massasi",
    term_ru: "Денежная масса",
    term_en: "Money Supply",
    definition_uz: "Pul massasi - bu iqtisodiyotda muomalada bo'lgan barcha pul mablag'larining umumiy miqdori.",
    definition_ru: "Денежная масса - общий объем всех денежных средств, находящихся в обращении в экономике.",
    definition_en: "Money supply is the total amount of all monetary funds in circulation in an economy.",
    category: "economics"
  },
  // R
  {
    id: "repo",
    term_uz: "REPO operatsiyalari",
    term_ru: "Операции РЕПО",
    term_en: "REPO Operations",
    definition_uz: "REPO - bu qimmatli qog'ozlarni qaytarib sotib olish shartnomasi bo'lib, unda bir tomon qimmatli qog'ozlarni sotadi va kelajakda ma'lum narxda qaytarib sotib olishga majburiyat oladi.",
    definition_ru: "РЕПО - договор обратного выкупа ценных бумаг, при котором одна сторона продает ценные бумаги и обязуется выкупить их обратно по определенной цене в будущем.",
    definition_en: "A REPO is a repurchase agreement where one party sells securities and commits to repurchase them at a specific price in the future.",
    category: "securities"
  },
  // S
  {
    id: "sugurta",
    term_uz: "Sug'urta",
    term_ru: "Страхование",
    term_en: "Insurance",
    definition_uz: "Sug'urta - bu kutilmagan hodisalar yuz berganda moliyaviy yo'qotishlarni qoplash uchun mo'ljallangan himoya tizimi.",
    definition_ru: "Страхование - система защиты, предназначенная для покрытия финансовых потерь при наступлении непредвиденных событий.",
    definition_en: "Insurance is a protection system designed to cover financial losses when unexpected events occur.",
    category: "insurance"
  },
  // T
  {
    id: "tolov-balansи",
    term_uz: "To'lov balansi",
    term_ru: "Платежный баланс",
    term_en: "Balance of Payments",
    definition_uz: "To'lov balansi - bu mamlakat va boshqa mamlakatlar o'rtasidagi barcha iqtisodiy operatsiyalarning statistik hisobi.",
    definition_ru: "Платежный баланс - статистический учет всех экономических операций между страной и другими странами.",
    definition_en: "The balance of payments is a statistical account of all economic transactions between a country and other countries.",
    category: "economics"
  },
  // V
  {
    id: "valyuta",
    term_uz: "Valyuta",
    term_ru: "Валюта",
    term_en: "Currency",
    definition_uz: "Valyuta - bu mamlakatning rasmiy pul birligi bo'lib, xalqaro savdo va moliyaviy operatsiyalarda ishlatiladi.",
    definition_ru: "Валюта - официальная денежная единица страны, используемая в международной торговле и финансовых операциях.",
    definition_en: "Currency is a country's official monetary unit used in international trade and financial operations.",
    category: "finance"
  },
  {
    id: "valyuta-kursi",
    term_uz: "Valyuta kursi",
    term_ru: "Валютный курс",
    term_en: "Exchange Rate",
    definition_uz: "Valyuta kursi - bu bir mamlakatning valyutasini boshqa mamlakatning valyutasiga nisbatan ifodalovchi narx.",
    definition_ru: "Валютный курс - цена валюты одной страны, выраженная в валюте другой страны.",
    definition_en: "An exchange rate is the price of one country's currency expressed in another country's currency.",
    category: "finance"
  }
];

// Get all unique letters from glossary
export const getGlossaryLetters = (language: 'uz' | 'ru' | 'en'): string[] => {
  const letters = new Set<string>();
  glossaryTerms.forEach(term => {
    const termText = term[`term_${language}` as keyof GlossaryTerm] as string;
    if (termText) {
      letters.add(termText[0].toUpperCase());
    }
  });
  return Array.from(letters).sort();
};

// Group terms by first letter
export const getGroupedGlossary = (
  language: 'uz' | 'ru' | 'en',
  searchQuery?: string
): Record<string, GlossaryTerm[]> => {
  let filtered = glossaryTerms;
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = glossaryTerms.filter(term => {
      const termText = term[`term_${language}` as keyof GlossaryTerm] as string;
      return termText?.toLowerCase().includes(query);
    });
  }

  const grouped: Record<string, GlossaryTerm[]> = {};
  
  filtered.forEach(term => {
    const termText = term[`term_${language}` as keyof GlossaryTerm] as string;
    if (termText) {
      const letter = termText[0].toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(term);
    }
  });

  return grouped;
};

// Search terms
export const searchGlossary = (
  query: string,
  language: 'uz' | 'ru' | 'en'
): GlossaryTerm[] => {
  if (!query) return glossaryTerms;
  
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(term => {
    const termText = term[`term_${language}` as keyof GlossaryTerm] as string;
    const definition = term[`definition_${language}` as keyof GlossaryTerm] as string;
    return termText?.toLowerCase().includes(lowerQuery) || 
           definition?.toLowerCase().includes(lowerQuery);
  });
};
