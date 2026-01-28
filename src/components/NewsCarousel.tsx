import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProjectsForCarousel, Project } from '@/data/projects';

interface NewsCarouselProps {
  autoScrollInterval?: number;
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({ autoScrollInterval = 5000 }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const carouselProjects = getProjectsForCarousel();

  // Auto-scroll
  useEffect(() => {
    if (isPaused || carouselProjects.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % carouselProjects.length);
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [isPaused, carouselProjects.length, autoScrollInterval]);

  // Scroll to current index
  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = 288 + 12; // card width + gap
      scrollRef.current.scrollTo({
        left: currentIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const handleCardClick = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {carouselProjects.map((project, index) => (
          <motion.div
            key={project.id}
            className="flex-shrink-0 w-72 h-40 rounded-2xl overflow-hidden cursor-pointer snap-center relative"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom} 0%, ${project.gradientTo} 100%)`
            }}
            onClick={() => handleCardClick(project)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              {/* Title */}
              <div>
                <h3 className={`text-lg font-bold ${project.textColor}`}>
                  {project.name}
                </h3>
                <p className={`text-sm mt-1 ${project.textColor} opacity-80`}>
                  {project.description[language]}
                </p>
              </div>

              {/* Icon */}
              <div className="flex justify-end">
                <span className="text-4xl">{project.icon}</span>
              </div>
            </div>

            {/* Content count badge */}
            {project.contents.length > 0 && (
              <div className="absolute top-3 right-3 bg-white/90 px-2 py-0.5 rounded-full">
                <span className="text-xs font-bold text-gray-800">
                  {project.contents.length} {language === 'uz' ? 'ta' : ''}
                </span>
              </div>
            )}

            {/* Rainbow bar for FINKIDS */}
            {project.id === 'finkids' && (
              <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
                <div className="flex-1 bg-red-400"></div>
                <div className="flex-1 bg-orange-400"></div>
                <div className="flex-1 bg-yellow-400"></div>
                <div className="flex-1 bg-green-400"></div>
                <div className="flex-1 bg-blue-400"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-1.5 mt-3">
        {carouselProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-6 h-1.5 bg-primary'
                : 'w-1.5 h-1.5 bg-muted hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsCarousel;
