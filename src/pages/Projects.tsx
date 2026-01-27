import React from 'react';
import Layout from '@/components/Layout';
import ProjectCard from '@/components/ProjectCard';
import SectionHeader from '@/components/SectionHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { projects } from '@/data/projects';

const Projects: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <Layout showBack title={t('projects')}>
      <div className="py-4">
        <div className="px-4 mb-4">
          <h1 className="text-lg font-bold text-foreground">{t('projectsTitle')}</h1>
          <p className="text-sm text-muted-foreground">{t('projectsSubtitle')}</p>
        </div>

        <div className="section-card mx-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title[language]}
              description={project.description[language]}
              icon={project.icon}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
