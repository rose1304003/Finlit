import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { projects } from '@/data/projects';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <Layout showBack title={t('projects')}>
        <div className="px-4 py-8 text-center">
          <p className="text-muted-foreground">Project not found</p>
        </div>
      </Layout>
    );
  }

  const Icon = project.icon;

  return (
    <Layout showBack title={project.title[language]}>
      <div className="px-4 py-4 space-y-6">
        {/* Header Card */}
        <div className="card-dark p-5 animate-fade">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl ${project.iconClass} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1">
                {project.title[language]}
              </h1>
              <p className="text-sm text-muted-foreground">
                {project.description[language]}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="animate-slide" style={{ animationDelay: '50ms' }}>
          <h2 className="font-semibold text-foreground mb-2">{t('aboutProject')}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.fullDescription[language]}
          </p>
        </section>

        {/* Features */}
        <section className="animate-slide" style={{ animationDelay: '100ms' }}>
          <h2 className="font-semibold text-foreground mb-3">
            {language === 'uz' ? "Siz nimani o'rganasiz" : language === 'ru' ? "Что вы изучите" : "What you'll learn"}
          </h2>
          <div className="space-y-2">
            {project.features[language].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 card-dark"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Button */}
        <div className="pt-2 animate-slide" style={{ animationDelay: '150ms' }}>
          <button className="w-full py-3.5 bg-primary text-primary-foreground rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors touch-active">
            {t('startLearning')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
