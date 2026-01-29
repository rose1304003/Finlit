import { useMemo } from 'react';
import { projects } from '@/data/projects';
import { newsItems } from '@/data/news';
import { libraryItems } from '@/data/library';
import { Language } from '@/lib/i18n';

export interface SearchResult {
  type: 'project' | 'news' | 'library';
  id: string;
  title: string;
  description: string;
  url: string;
}

export const useSearch = (query: string, language: Language) => {
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search projects
    projects.forEach((project) => {
      const title = project.title[language].toLowerCase();
      const desc = project.description[language].toLowerCase();
      if (title.includes(q) || desc.includes(q)) {
        searchResults.push({
          type: 'project',
          id: project.id,
          title: project.title[language],
          description: project.description[language],
          url: `/projects/${project.id}`,
        });
      }
    });

    // Search news
    newsItems.forEach((news) => {
      const title = news.title[language].toLowerCase();
      const excerpt = news.excerpt[language].toLowerCase();
      if (title.includes(q) || excerpt.includes(q)) {
        searchResults.push({
          type: 'news',
          id: news.id,
          title: news.title[language],
          description: news.excerpt[language],
          url: `/news/${news.id}`,
        });
      }
    });

    // Search library
    libraryItems.forEach((item) => {
      const title = item.title[language].toLowerCase();
      const desc = item.description[language].toLowerCase();
      if (title.includes(q) || desc.includes(q) || item.author.toLowerCase().includes(q)) {
        searchResults.push({
          type: 'library',
          id: item.id,
          title: item.title[language],
          description: `${item.author} • ${item.description[language]}`,
          url: '/library',
        });
      }
    });

    return searchResults.slice(0, 10);
  }, [query, language]);

  return results;
};
