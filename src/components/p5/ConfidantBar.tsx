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
    <div className="group cursor-pointer flex flex-col overflow-x-clip pl-2 sm:pl-0" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex justify-between items-end mb-1 gap-2">
        <span className="font-display text-base sm:text-lg md:text-2xl italic group-hover:text-p5-red transition-colors truncate min-w-0">
          <span className="lang-es">{localizedTitle.es}</span>
          <span className="lang-en">{localizedTitle.en}</span>
        </span>
        <span className="text-p5-red font-display text-xs sm:text-base md:text-xl transition-transform duration-300 group-hover:scale-110 origin-right shrink-0 whitespace-nowrap">
          <span className="lang-es">RANGO {rank}</span>
          <span className="lang-en">RANK {rank}</span>
        </span>
      </div>
      <div className="h-6 md:h-8 border-2 md:border-4 border-p5-black bg-p5-white relative overflow-hidden -skew-x-[12deg] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0_0_#E50012]">
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
        <div className="flex flex-wrap gap-1 md:gap-2 mt-1 md:mt-2 overflow-x-clip pl-1 sm:pl-0">
          {tags.map((tag) => (
            <span
              key={tag.icon}
              className="inline-flex items-center gap-1 bg-p5-black text-p5-white font-mono text-xs md:text-xs tracking-wider px-2 md:px-2 py-0.5 md:py-1 border border-p5-white/30 -skew-x-[6deg] hover:bg-p5-red hover:border-p5-red transition-colors group/tag shrink-0 max-w-full overflow-x-clip"
            >
              <span className="inline-flex skew-x-[6deg] items-center gap-1 truncate max-w-full">
                {tag.icon && (
                  <span className="w-3 h-3 md:w-3.5 md:h-3.5 flex items-center justify-center text-p5-white/80 group-hover/tag:text-p5-white transition-colors shrink-0">
                    <TechIcon name={tag.icon} className="w-full h-full" />
                  </span>
                )}
                <span className="truncate">{tag.name}</span>
              </span>
            </span>
          ))}
        </div>
      )}

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out px-1 pb-2 ${
          isExpanded ? 'max-h-96 opacity-100 mt-1 md:mt-2 pt-2 md:pt-4' : 'max-h-0 opacity-0 mt-0 pt-0'
        }`}
      >
        <div className="bg-p5-black text-p5-white p-3 md:p-4 border-2 md:border-4 border-p5-white relative shadow-hard flex flex-col transition-transform hover:-translate-y-1 ml-1 sm:ml-0">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#F4F4F4 1px, transparent 1px)', backgroundSize: '8px 8px' }}
          ></div>
          <div className="absolute -top-2 md:-top-3 -left-0 sm:-left-2 bg-p5-red text-p5-white font-mono text-xs md:text-xs px-2 md:px-2 py-0.5 border-2 border-p5-white -skew-x-[6deg] shadow-sm z-10">
            <span className="inline-block skew-x-[6deg] font-bold tracking-widest">
              <span className="lang-es">NOTA</span>
              <span className="lang-en">NOTE</span>
            </span>
          </div>
          <p className="font-body text-sm md:text-sm opacity-90 leading-relaxed relative z-10 mt-0.5 md:mt-1 pl-2 md:pl-2 border-l-2 border-p5-red">
            <span className="lang-es">{description.es}</span>
            <span className="lang-en">{description.en}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
