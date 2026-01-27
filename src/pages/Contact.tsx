import React from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Send, Phone, Mail, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();

  const labels = {
    title: { uz: "Biz bilan bog'laning", ru: "Свяжитесь с нами", en: "Contact Us" },
    subtitle: { uz: "Savollaringiz bo'lsa, biz bilan bog'laning", ru: "Если у вас есть вопросы", en: "If you have questions" },
    telegram: { uz: "Telegram guruhimiz", ru: "Наша Telegram группа", en: "Our Telegram Group" },
    telegramDesc: { uz: "Savollaringizni guruhda yozing", ru: "Задавайте вопросы в группе", en: "Ask questions in the group" },
    joinGroup: { uz: "Guruhga qo'shilish", ru: "Присоединиться", en: "Join Group" },
    phone: { uz: "Telefon", ru: "Телефон", en: "Phone" },
    email: { uz: "Elektron pochta", ru: "Эл. почта", en: "Email" },
    address: { uz: "Manzil", ru: "Адрес", en: "Address" },
    cbuAddress: { uz: "Toshkent sh., Islom Karimov ko'chasi 6", ru: "г. Ташкент, ул. И. Каримова 6", en: "6 Islam Karimov St, Tashkent" },
  };

  const contactInfo = [
    { icon: Phone, label: labels.phone[language], value: "+998 71 212 61 46", href: "tel:+998712126146" },
    { icon: Mail, label: labels.email[language], value: "info@cbu.uz", href: "mailto:info@cbu.uz" },
    { icon: MapPin, label: labels.address[language], value: labels.cbuAddress[language], href: "#" },
  ];

  return (
    <Layout showBack title={t('contact')}>
      <div className="py-4 space-y-6">
        {/* Header */}
        <div className="text-center px-4 animate-fade">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-lg font-bold text-foreground mb-1">{labels.title[language]}</h1>
          <p className="text-sm text-muted-foreground">{labels.subtitle[language]}</p>
        </div>

        {/* Telegram Card */}
        <div className="mx-4 section-card p-4 animate-slide">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Send className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="font-medium text-foreground mb-0.5">{labels.telegram[language]}</h2>
              <p className="text-sm text-muted-foreground mb-3">{labels.telegramDesc[language]}</p>
              <a
                href="https://t.me/finlit_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm touch-active"
              >
                {labels.joinGroup[language]}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="section-card mx-4">
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="list-item-hover px-4 animate-slide"
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="icon-container flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 pt-4 text-center border-t border-border">
          <p className="text-xs text-muted-foreground">{t('developedBy')}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
