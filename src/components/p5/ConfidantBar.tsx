import React, { useState } from 'react';
import { TechIcon } from './TechIcons';

type LocalizedText = {
  es: string;
  en: string;
};

export interface TagInfo {
  name: string;
  icon: string;
}

export interface ConfidantBarProps {
  title: string | LocalizedText;
  rank: number;
  percentage: number;
  description: LocalizedText;
  tags?: TagInfo[];
}

export const ConfidantBar: React.FC<ConfidantBarProps> = ({ title, rank, percentage, description, tags }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const localizedTitle = typeof title === 'string' ? { es: title, en: title } : title;

  return (
    <div className="group cursor-pointer flex flex-col" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex justify-between items-end mb-1">
        <span className="font-display text-2xl italic group-hover:text-p5-red transition-colors">
          <span className="lang-es">{localizedTitle.es}</span>
          <span className="lang-en">{localizedTitle.en}</span>
        </span>
        <span className="text-p5-red font-display text-xl transition-transform duration-300 group-hover:scale-110 origin-right">
          <span className="lang-es">RANGO {rank}</span>
          <span className="lang-en">RANK {rank}</span>
        </span>
      </div>
      <div className="h-8 border-4 border-p5-black bg-p5-white relative overflow-hidden -skew-x-[12deg] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0_0_#E50012]">
        <div
          className="h-full bg-p5-red-dark transition-colors duration-300 group-hover:bg-p5-red"
          style={{ width: `${percentage}%` }}
        ></div>
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '4px 4px' }}
        ></div>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag.icon}
              className="inline-flex items-center gap-1.5 bg-p5-black text-p5-white font-mono text-xs tracking-wider px-2 py-1 border border-p5-white/30 -skew-x-[6deg] hover:bg-p5-red hover:border-p5-red transition-colors group/tag"
            >
              <span className="inline-flex skew-x-[6deg] items-center gap-1.5">
                {tag.icon && (
                  <span className="w-3.5 h-3.5 flex items-center justify-center text-p5-white/80 group-hover/tag:text-p5-white transition-colors">
                    <TechIcon name={tag.icon} className="w-full h-full" />
                  </span>
                )}
                {tag.name}
              </span>
            </span>
          ))}
        </div>
      )}

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out px-1 pb-2 ${
          isExpanded ? 'max-h-96 opacity-100 mt-2 pt-4' : 'max-h-0 opacity-0 mt-0 pt-0'
        }`}
      >
        <div className="bg-p5-black text-p5-white p-4 border-4 border-p5-white relative shadow-hard flex flex-col transition-transform hover:-translate-y-1">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#F4F4F4 1px, transparent 1px)', backgroundSize: '8px 8px' }}
          ></div>
          <div className="absolute -top-3 -left-2 bg-p5-red text-p5-white font-mono text-xs px-2 py-0.5 border-2 border-p5-white -skew-x-[6deg] shadow-sm z-10">
            <span className="inline-block skew-x-[6deg] font-bold tracking-widest">
              <span className="lang-es">NOTA</span>
              <span className="lang-en">NOTE</span>
            </span>
          </div>
          <p className="font-body text-sm opacity-90 leading-relaxed relative z-10 mt-1 pl-2 border-l-2 border-p5-red">
            <span className="lang-es">{description.es}</span>
            <span className="lang-en">{description.en}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
