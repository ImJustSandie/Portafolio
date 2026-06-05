import React, { useState } from 'react';
import { TechTag } from './TechTag';

interface TechGroup {
  id: string;
  label: { es: string; en: string };
  tags: string[];
}

const techGroups: TechGroup[] = [
  {
    id: 'development',
    label: {
      es: 'STACK DE DESARROLLO',
      en: 'DEVELOPMENT STACK',
    },
    tags: [
      'Unity', 'C#', 'Python', 'JavaScript',
      'HTML5', 'CSS3', 'React', 'Astro',
      'FastAPI', 'Git', 'Tailwind CSS',
      'WebGL', 'OpenXR', 'XR Interaction Toolkit',
    ],
  },
  {
    id: 'design',
    label: {
      es: 'STACK DE DISEÑO',
      en: 'DESIGN STACK',
    },
    tags: [
      'Maya', 'Mudbox', 'Substance Painter',
      'Figma', 'Photoshop', 'Krita', 'MediBang Paint',
      'Aseprite', 'LibreSprite', 'Piskel',
    ],
  },
  {
    id: 'competences',
    label: {
      es: 'COMPETENCIAS TÉCNICAS',
      en: 'TECHNICAL SKILLS',
    },
    tags: [
      'Game Design', 'Level Design', 'Gameplay Systems',
      'UI/UX 2D/3D', 'VR', 'AR',
      'Scriptable Objects',
      'Technical Art', 'Rigging',
      'System Architecture', 'Modular Design',
      'Tool Development', 'Optimization',
      'Agile Methodologies',
      'Version Control', 'Code Review',
      'Documentation', 'Project Planning',
    ],
  },
];

export function TechStackTabs() {
  const [activeGroup, setActiveGroup] = useState('development');

  const active = techGroups.find(g => g.id === activeGroup) || techGroups[0];
  const label = active.label;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6">
        {techGroups.map((group) => {
          const isActive = group.id === activeGroup;
          return (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={`
                font-mono text-xs sm:text-sm tracking-wider px-3 sm:px-4 py-2 sm:py-2
                -skew-x-[6deg] border-2 transition-all duration-200 w-full sm:w-auto
                active:scale-[0.97]
                ${isActive
                  ? 'bg-p5-black text-p5-white border-p5-white shadow-[4px_4px_0_0_#E50012] hover:shadow-[6px_6px_0_0_#E50012]'
                  : 'bg-panel text-[var(--text-color)] border-adaptive shadow-hard-adaptive hover:bg-p5-black hover:text-p5-white hover:border-p5-white'
                }
              `}
            >
              <span className="inline-block skew-x-[6deg]">
                <span className="lang-es">{group.label.es}</span>
                <span className="lang-en">{group.label.en}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {active.tags.map((tag, i) => (
          <TechTag key={tag} name={tag} index={i} />
        ))}
      </div>
    </div>
  );
}
