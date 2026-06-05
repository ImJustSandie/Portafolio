import React, { useState, useEffect } from 'react';
import { ProjectCard } from './ProjectCard';

interface ProjectViewsProps {
  devProjects: any[]; // We will pass the mock data for dev projects
  artProjects: any[]; // We will pass the mock data for digital art projects
}

export const ProjectViews: React.FC<ProjectViewsProps> = ({ devProjects, artProjects }) => {
  const [activeView, setActiveView] = useState<'dev' | 'art'>('dev');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    // Modify body background and colors based on view
    if (activeView === 'art') {
      document.body.style.backgroundColor = '#660000'; // Dark Red background
      document.body.style.color = '#F4F4F4';
      document.body.style.backgroundImage = 'radial-gradient(rgba(15, 15, 15, 0.4) 2px, transparent 2px)';
    } else {
      document.body.style.backgroundColor = '#0F0F0F';
      document.body.style.color = '#F4F4F4';
      document.body.style.backgroundImage = 'radial-gradient(var(--grid-color) 2px, transparent 2px)';
    }

    return () => {
      // Cleanup
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.backgroundImage = '';
    };
  }, [activeView]);

  const baseProjects = activeView === 'dev' ? devProjects : artProjects;
  const currentProjects = showFeaturedOnly
    ? baseProjects.filter((p) => p.featured)
    : baseProjects;

  return (
    <div className="w-full">
      {/* View Switcher Tabs */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="bg-p5-black border-2 md:border-4 border-p5-white flex p-1 md:p-2 shadow-hard-white -skew-x-[6deg]">
          <button
            onClick={() => setActiveView('dev')}
            className={`px-3 md:px-8 py-2 md:py-3 font-display text-base md:text-2xl uppercase tracking-widest transition-all ${
              activeView === 'dev' 
                ? 'bg-p5-white text-p5-black shadow-[2px_2px_0_0_#E50012] md:shadow-[4px_4px_0_0_#E50012]' 
                : 'text-p5-white hover:bg-p5-red/20'
            }`}
          >
            <span className="inline-block skew-x-[6deg]">Dev Projects</span>
          </button>
          
          <button
            onClick={() => setActiveView('art')}
            className={`px-3 md:px-8 py-2 md:py-3 font-display text-base md:text-2xl uppercase tracking-widest transition-all ${
              activeView === 'art' 
                ? 'bg-p5-white text-p5-black shadow-[2px_2px_0_0_#0F0F0F] md:shadow-[4px_4px_0_0_#0F0F0F]' 
                : 'text-p5-white hover:bg-p5-black/20'
            }`}
          >
            <span className="inline-block skew-x-[6deg]">Digital Art</span>
          </button>
        </div>
      </div>

      {/* Featured Filter Toggle */}
      <div className="flex justify-center mb-12 relative z-10">
        <button
          onClick={() => setShowFeaturedOnly((prev) => !prev)}
          className={`font-display text-sm md:text-lg tracking-widest uppercase border-2 px-4 md:px-6 py-1 md:py-2 transition-all -skew-x-[6deg] ${
            showFeaturedOnly
              ? 'bg-p5-red text-p5-white border-p5-white shadow-[4px_4px_0_0_#E50012]'
              : 'bg-transparent text-[var(--text-color)] border-adaptive hover:bg-p5-red/10'
          }`}
        >
          <span className="inline-block skew-x-[6deg]">
            {showFeaturedOnly ? '★' : '☆'} <span className="lang-es">Solo destacados</span><span className="lang-en">Featured only</span>
          </span>
        </button>
      </div>

      {/* Projects Grid List */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500`}>
        {currentProjects.map((proj, idx) => (
          <ProjectCard
            key={proj.title}
            title={proj.title}
            description={proj.description}
            tags={proj.tags}
            imageText={proj.title}
            imageUrl={proj.mediaUrl}
            media={proj.media}
            role={proj.role}
            variant={idx % 2 === 0 ? 'red' : 'white'}
            primaryButton={proj.primaryButton}
            secondaryButton={proj.secondaryButton}
            className={activeView === 'art' ? 'theme-red-context' : ''}
          />
        ))}
      </div>

    </div>
  );
};
