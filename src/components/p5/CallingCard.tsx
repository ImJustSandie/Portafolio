import React, { useState } from 'react';

interface CallingCardProps {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  orcid?: string;
  sketchfab?: string;
  className?: string;
}

export const CallingCard: React.FC<CallingCardProps> = ({
  name,
  email,
  linkedin,
  github,
  orcid,
  sketchfab,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative w-full mx-auto group ${className}`}>
      {/* Red Shadow Offset */}
      <div className="absolute inset-0 bg-p5-red transform translate-x-2 md:translate-x-4 translate-y-2 md:translate-y-4 -rotate-1"></div>
      
      {/* Main Card Body */}
      <div className="relative bg-p5-black border-2 md:border-4 border-p5-white px-5 md:px-8 lg:px-10 py-5 md:py-8 overflow-hidden h-full">
        {/* Halftone Texture Overlay */}
        <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none"></div>
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-p5-white transform translate-x-12 -translate-y-12 rotate-45"></div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          <div className="border-l-4 border-p5-red pl-3 md:pl-5">
            <h3 className="font-display text-2xl md:text-5xl text-p5-white leading-none uppercase tracking-tighter">
              {name}
            </h3>
            <span className="font-mono text-[10px] md:text-sm text-p5-red tracking-widest uppercase mt-1 md:mt-2 block">
              <span className="lang-es">// DESARROLLADOR DE VIDEOJUEGOS</span>
              <span className="lang-en">// GAME DEVELOPER</span>
            </span>
          </div>

          <div className="space-y-2 md:space-y-3 font-mono text-xs md:text-base">
            <div className="group/item flex flex-col sm:flex-row sm:items-center">
              <span className="text-p5-red min-w-[5rem] md:w-28 text-xs md:text-sm shrink-0">EMAIL:</span>
              <a 
                href={`mailto:${email}`} 
                onClick={handleCopyEmail}
                className={`transition-colors px-2 py-1 inline-block cursor-pointer ${copied ? 'bg-p5-white text-p5-black font-bold' : 'text-p5-white hover:bg-p5-white hover:text-p5-black'}`}
                title="Click to copy"
              >
                {copied ? (
                  <>
                    <span className="lang-es">COPIADO AL PORTAPAPELES</span>
                    <span className="lang-en">COPIED TO CLIPBOARD!</span>
                  </>
                ) : (
                  email
                )}
              </a>
            </div>
            <div className="group/item flex flex-col sm:flex-row sm:items-center">
              <span className="text-p5-red min-w-[5rem] md:w-28 text-xs md:text-sm shrink-0">LINKEDIN:</span>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-p5-white hover:bg-p5-white hover:text-p5-black transition-colors px-2 py-1 inline-block text-xs md:text-sm">
                /in/alejandro-sandoval/
              </a>
            </div>
            <div className="group/item flex flex-col sm:flex-row sm:items-center">
              <span className="text-p5-red min-w-[5rem] md:w-28 text-xs md:text-sm shrink-0">GITHUB:</span>
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-p5-white hover:bg-p5-white hover:text-p5-black transition-colors px-2 py-1 inline-block text-xs md:text-sm">
                /ImJustSandie
              </a>
            </div>
            {orcid && (
              <div className="group/item flex flex-col sm:flex-row sm:items-center">
                <span className="text-p5-red min-w-[5rem] md:w-28 text-xs md:text-sm shrink-0">ORCID:</span>
                <a href={`https://orcid.org/${orcid}`} target="_blank" rel="noopener noreferrer" className="text-p5-white hover:bg-p5-white hover:text-p5-black transition-colors px-2 py-1 inline-block text-xs">
                  {orcid}
                </a>
              </div>
            )}
            {sketchfab && (
              <div className="group/item flex flex-col sm:flex-row sm:items-center">
                <span className="text-p5-red min-w-[5rem] md:w-28 text-xs md:text-sm shrink-0">SKETCHFAB:</span>
                <a href={sketchfab} target="_blank" rel="noopener noreferrer" className="text-p5-white hover:bg-p5-white hover:text-p5-black transition-colors px-2 py-1 inline-block text-xs md:text-sm">
                  /ImJustSandie
                </a>
              </div>
            )}
          </div>

          <div className="pt-3 md:pt-4 border-t-2 border-p5-gray flex justify-between items-end mt-4 md:mt-8">
            <div className="font-display text-xl md:text-3xl text-p5-white opacity-40 italic tracking-widest">
              <span className="lang-es">TARJETA_DE_CONTACTO</span>
              <span className="lang-en">CALLING_CARD</span>
            </div>
            <div className="w-8 h-8 bg-p5-red rotate-45 transform translate-y-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallingCard;
