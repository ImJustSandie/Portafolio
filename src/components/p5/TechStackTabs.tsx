import React, { useState } from 'react';
import { TechTag } from './TechTag';

interface TechGroup {
  id: string;
  label: string;
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
      'Unity', 'C#', 'Python', 'Java', 'TypeScript', 'JavaScript',
      'HTML5', 'CSS3', 'React', 'Preact', 'Astro', 'Node.js',
      'FastAPI', 'Git', 'GitHub', 'Vite', 'Tailwind CSS',
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
      'Blender', 'Maya', 'ZBrush', 'Mudbox', 'Substance', 'Substance Painter',
      'Figma', 'Adobe Creative Cloud', 'Photoshop',
      'Illustrator', 'Premiere Pro', 'After Effects',
      'Krita', 'MediBang Paint', 'Aseprite', 'LibreSprite', 'Piskel',
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
      'Agile Methodologies', 'SCRUM',
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
      <div className="flex flex-wrap gap-3 mb-6">
        {techGroups.map((group) => {
          const isActive = group.id === activeGroup;
          return (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={`
                font-mono text-sm tracking-wider px-4 py-2
                -skew-x-[6deg] border-2 transition-all duration-200
                ${
                  isActive
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
        {active.tags.map((tag) => (
          <TechTag key={tag} name={tag} />
        ))}
      </div>
    </div>
  );
}
