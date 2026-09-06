import React from 'react';
import { TechIcon } from './TechIcons';

const TAG_ICON_MAP: Record<string, string> = {
  Unity: "Unity",
  "C#": "C#",
  Python: "Python",
  Java: "Java",
  React: "React",
  Astro: "Astro",
  Blender: "Blender",
  Figma: "Figma",
  Git: "Git",
  GitHub: "GitHub",
  HTML: "HTML5",
  CSS: "CSS3",
  JS: "JavaScript",
  HTML5: "HTML5",
  CSS3: "CSS3",
  JavaScript: "JavaScript",
  "Tailwind CSS": "Tailwind CSS",
  Tailwind: "Tailwind CSS",
  TypeScript: "TypeScript",
  "Node.js": "Node.js",
  Vite: "Vite",
  Vercel: "Vercel",
  Maya: "Maya",
  "Substance Painter": "Substance",
  Substance: "Substance",
  ZBrush: "ZBrush",
  Photoshop: "Photoshop",
  Krita: "Krita",
  Aseprite: "Aseprite",
  LibreSprite: "LibreSprite",
  "MediBang Paint": "MediBang Paint",
  Piskel: "Piskel",
  Mudbox: "Mudbox",
  "Adobe Creative Cloud": "Adobe Creative Cloud",
  "Game Design": "Game Design",
  "Level Design": "Level Design",
  "UI/UX 2D/3D": "UI/UX 2D/3D",
  VR: "VR",
  AR: "AR",
  WebGL: "WebGL",
  "Gameplay Systems": "Gameplay Systems",
  "Scriptable Objects": "Scriptable Objects",
  Preact: "Preact",
  "OpenXR": "OpenXR",
  "XR Interaction Toolkit": "XR Interaction Toolkit",
  Illustrator: "Illustrator",
  "Premiere Pro": "Premiere Pro",
  "After Effects": "After Effects",
  "Godot Engine": "Godot",
};

interface TechTagProps {
  name: string;
  variant?: 'black' | 'white';
  index?: number;
  className?: string;
  icon?: string;
}

export const TechTag: React.FC<TechTagProps> = ({ name, variant = 'black', index = 0, className = '', icon }) => {
  const isWhite = variant === 'white';
  const resolvedIcon = icon || TAG_ICON_MAP[name];

  return (
    <span className={`
      ${isWhite ? 'bg-p5-white text-p5-black border-p5-black' : 'bg-p5-black text-p5-white border-p5-white'}
      font-mono text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1
      hover:bg-p5-red hover:text-p5-white hover:border-p5-black
      transition-all duration-200 cursor-default
      border-2 inline-flex items-center gap-1 group max-w-full overflow-x-clip shrink-0
      ${className}
    `}>
      <span className={`inline-flex items-center gap-1 uppercase tracking-wider truncate`}>
        {resolvedIcon && (
          <span className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex items-center justify-center flex-shrink-0 ${isWhite ? 'text-p5-black/80' : 'text-p5-white/80'} group-hover:text-p5-white transition-colors`}>
            <TechIcon name={resolvedIcon} className="w-full h-full" />
          </span>
        )}
        <span className="truncate">{name}</span>
      </span>
    </span>
  );
};

export default TechTag;
