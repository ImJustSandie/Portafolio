import React, { useState } from 'react';
import { TechTag } from './TechTag';
import { P5Button } from './P5Button';

interface MediaItem {
  type: string;
  url: string;
}

interface ProjectCardProps {
  title: string;
  description: { es: string; en: string };
  tags: string[];
  imageText?: string;
  imageUrl?: string;
  media?: MediaItem[];
  role?: { es: string; en: string };
  variant?: 'red' | 'white' | 'black' | 'red-card';
  primaryButton?: { text: { es: string; en: string }; href: string };
  secondaryButton?: { text: { es: string; en: string }; href: string };
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  imageText = "PROJECT_PREVIEW",
  imageUrl,
  media,
  role,
  variant = 'red',
  primaryButton,
  secondaryButton,
  className = ''
}) => {
  const isRed = variant === 'red';
  const isWhite = variant === 'white';
  const isBlack = variant === 'black';
  const isRedCard = variant === 'red-card';
  const hasImage = Boolean(imageUrl);

  // Determine shadow color based on variant
  // isRed -> Red shadow
  // isWhite -> White shadow
  // isBlack -> Black shadow
  // isRedCard -> Black shadow
  const shadowColor = isRed 
    ? 'shadow-[10px_10px_0_0_#E50012]' 
    : (isWhite ? 'shadow-[10px_10px_0_0_#F4F4F4]' : 'shadow-[10px_10px_0_0_#0F0F0F]');
    
  const hoverShadow = isRed 
    ? 'hover:shadow-[14px_14px_0_0_#E50012]' 
    : (isWhite ? 'hover:shadow-[14px_14px_0_0_#F4F4F4]' : 'hover:shadow-[14px_14px_0_0_#0F0F0F]');

  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const allMedia = media && media.length > 0 ? media : (imageUrl ? [{ type: 'image', url: imageUrl }] : []);
  const hasMultipleMedia = allMedia.length > 1;

  // Background and Text colors for the main card
  let cardBg = 'bg-p5-black text-p5-white';
  if (isRedCard) {
    cardBg = 'bg-p5-red text-p5-white';
  }

  // Border color based on variant
  const borderColor = isWhite ? 'border-p5-white' : ((isBlack || isRedCard) ? 'border-p5-black' : 'border-p5-white');

  return (
    <>
      {/* Tarjeta pequeña (Siempre en el grid) */}
      <article 
        onClick={() => { setIsExpanded(true); setCurrentMediaIndex(0); }}
        className={`
          ${cardBg} border-4 ${borderColor} p-4 
          flex flex-col gap-4 group 
          hover:-translate-y-3 hover:-translate-x-3 hover:-rotate-1 
          transition-all duration-300 relative cursor-pointer active:scale-[0.97]
          ${shadowColor} ${hoverShadow}
          ${className}
        `}
      >
        <div className={`aspect-video w-full overflow-hidden relative border-2 ${isRed ? 'border-p5-white' : 'border-p5-black bg-p5-white'}`}>
          {hasImage ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center font-display text-4xl tracking-widest relative ${isRed ? 'bg-p5-black text-p5-white' : 'bg-p5-white text-p5-black'}`}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
              <span className="z-20 transform rotate-2 group-hover:scale-110 transition-transform duration-500">{imageText}</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <h3 className="font-display text-3xl mb-2 text-p5-white group-hover:text-p5-red transition-colors leading-none uppercase">
            {title}
          </h3>
          <p className="font-body text-base text-p5-white opacity-80 mb-6 flex-1 line-clamp-3">
            <span className="lang-es">{description.es}</span>
            <span className="lang-en">{description.en}</span>
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
              <TechTag key={tag} name={tag} index={i} variant={isWhite ? 'white' : 'black'} />
            ))}
          </div>
        </div>
      </article>

      {/* Modal / Panel Expandido */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex justify-center p-3 sm:p-6 md:p-12 lg:p-20 overflow-y-auto" onClick={() => setIsExpanded(false)}>
          {/* Overlay oscuro lineal */}
          <div className="fixed inset-0 bg-p5-black/90 backdrop-blur-md animate-fade-in"></div>
          
          {/* Contenedor del Modal lineal */}
          <div 
            className={`relative w-full max-w-[160rem] bg-p5-black border-2 md:border-4 ${isRed ? 'border-p5-red' : 'border-p5-white'} p-4 md:p-10 flex flex-col md:flex-row gap-4 md:gap-8 shadow-[4px_4px_0_0_#E50012] md:shadow-[16px_16px_0_0_#E50012] animate-slide-in my-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de Cerrar estilo P5 */}
            <button 
              onClick={() => setIsExpanded(false)}
              className={`absolute top-2 right-2 md:top-4 md:right-4 min-w-[44px] min-h-[44px] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-display text-xl md:text-3xl border-2 md:border-4 transition-colors z-50 -skew-x-[6deg] active:scale-95 ${isRed ? 'bg-p5-white text-p5-black border-p5-black hover:bg-p5-red hover:text-p5-white' : 'bg-p5-white text-p5-black border-p5-black hover:bg-p5-red hover:text-p5-white'}`}
            >
              <span className="skew-x-[6deg]">X</span>
            </button>

            {/* Visual del Modal - Carrusel */}
            <div
              className={`w-full md:w-1/2 aspect-video overflow-hidden relative border-2 md:border-4 cursor-pointer group ${isRed ? 'border-p5-white' : 'border-p5-black bg-p5-white'}`}
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none flex items-center justify-center ${isRed ? 'bg-p5-white/10' : 'bg-p5-black/10'}`}>
                <div className="bg-p5-black text-p5-white font-display text-xl px-3 py-1 border-2 border-p5-white -skew-x-[6deg] tracking-widest scale-90 group-hover:scale-100 transition-transform">
                  <span className="inline-block skew-x-[6deg]">AMPLIAR</span>
                </div>
              </div>
              {allMedia.length > 0 ? (
                <>
                  <div className="w-full h-full relative">
                    {allMedia[currentMediaIndex].type === 'video' ? (
                      <video key={currentMediaIndex} src={allMedia[currentMediaIndex].url} controls className="w-full h-full object-cover" />
                    ) : allMedia[currentMediaIndex].type === 'sketchfab' ? (
                      <iframe
                        src={allMedia[currentMediaIndex].url}
                        className="w-full h-full"
                        allowFullScreen
                        allow="autoplay; fullscreen; xr-spatial-tracking"
                      ></iframe>
                    ) : (
                      <img key={currentMediaIndex} src={allMedia[currentMediaIndex].url} alt={`${title} ${currentMediaIndex + 1}`} className="w-full h-full object-cover" />
                    )}
                  </div>

                  {hasMultipleMedia && (
                    <>
                      <button
                        onClick={() => setCurrentMediaIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1))}
                        className={`absolute left-2 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center font-display text-2xl border-4 transition-colors z-10 -skew-x-[6deg] active:scale-95 ${isRed ? 'bg-p5-white text-p5-black border-p5-black hover:bg-p5-red hover:text-p5-white' : 'bg-p5-black text-p5-white border-p5-white hover:bg-p5-red'}`}
                      >
                        <span className="skew-x-[6deg]">‹</span>
                      </button>
                      <button
                        onClick={() => setCurrentMediaIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1))}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center font-display text-2xl border-4 transition-colors z-10 -skew-x-[6deg] active:scale-95 ${isRed ? 'bg-p5-white text-p5-black border-p5-black hover:bg-p5-red hover:text-p5-white' : 'bg-p5-black text-p5-white border-p5-white hover:bg-p5-red'}`}
                      >
                        <span className="skew-x-[6deg]">›</span>
                      </button>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {allMedia.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentMediaIndex(i)}
                            className={`w-3 h-3 border-2 transition-all ${i === currentMediaIndex ? (isRed ? 'bg-p5-red border-p5-black scale-125' : 'bg-p5-white border-p5-black scale-125') : (isRed ? 'bg-p5-white/50 border-p5-black' : 'bg-p5-black/50 border-p5-white')}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className={`w-full h-full flex items-center justify-center font-display text-5xl md:text-6xl tracking-widest relative ${isRed ? 'bg-p5-black text-p5-white' : 'bg-p5-white text-p5-black'}`}>
                  <div className="absolute inset-0 opacity-10 bg-halftone"></div>
                  <span className="z-20 transform -rotate-2">{imageText}</span>
                </div>
              )}
            </div>

            {/* Info del Modal */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl mb-2 md:mb-4 text-p5-white uppercase leading-none border-b-2 md:border-b-4 border-adaptive pb-2 md:pb-4">
                {title}
              </h3>
              <div className="flex-1">
                <p className="font-body text-sm md:text-lg lg:text-xl text-p5-white opacity-90 mb-4">
                  <span className="lang-es">{description.es}</span>
                  <span className="lang-en">{description.en}</span>
                </p>
                {role && (
                  <div className="mb-4">
                    <h4 className="font-display text-base md:text-lg uppercase text-p5-red tracking-wider mb-1">
                      <span className="lang-es">&gt; MI ROL</span>
                      <span className="lang-en">&gt; MY ROLE</span>
                    </h4>
                    <p className="font-body text-sm md:text-lg lg:text-xl text-p5-white opacity-90">
                      <span className="lang-es">{role.es}</span>
                      <span className="lang-en">{role.en}</span>
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-8">
                {tags.map((tag, i) => (
                  <TechTag key={tag} name={tag} index={i} variant={isRed ? 'black' : 'white'} />
                ))}
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 mt-auto">
                {primaryButton && (
                  <P5Button href={primaryButton.href} variant="primary" className="w-full sm:flex-1 !text-xs md:!text-base">
                    <span className="lang-es">{primaryButton.text.es}</span>
                    <span className="lang-en">{primaryButton.text.en}</span>
                  </P5Button>
                )}
                {secondaryButton && (
                  <P5Button href={secondaryButton.href} variant="outline" className="w-full sm:flex-1 !text-xs md:!text-base">
                    <span className="lang-es">{secondaryButton.text.es}</span>
                    <span className="lang-en">{secondaryButton.text.en}</span>
                  </P5Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-p5-black/95 flex justify-center p-2 md:p-12 overflow-y-auto animate-fade-in"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: 'radial-gradient(#E50012 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          ></div>

          <button
            className="absolute top-2 right-2 md:top-8 md:right-8 min-w-[44px] min-h-[44px] w-10 h-10 md:w-12 md:h-12 bg-p5-red text-p5-white font-display text-xl md:text-3xl flex items-center justify-center border-2 md:border-4 border-p5-white hover:bg-p5-white hover:text-p5-red hover:border-p5-red transition-all z-50 -skew-x-[6deg] active:scale-95"
            onClick={() => setIsFullscreen(false)}
          >
            <span className="skew-x-[6deg]">X</span>
          </button>

          <div
            className="relative w-full max-w-7xl aspect-video border-4 md:border-8 border-p5-white shadow-[4px_4px_0_0_#E50012] md:shadow-[16px_16px_0_0_#E50012] bg-p5-black my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {allMedia.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentMediaIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {item.type === 'video' ? (
                  <video src={item.url} className="w-full h-full object-contain" autoPlay controls loop />
                ) : item.type === 'sketchfab' ? (
                  <iframe
                    src={item.url}
                    className="w-full h-full"
                    allowFullScreen
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                  ></iframe>
                ) : (
                  <img src={item.url} className="w-full h-full object-contain" alt={`Slide ${index}`} />
                )}
              </div>
            ))}

            {hasMultipleMedia && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentMediaIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
                  }}
                  className="absolute inset-y-0 left-0 w-16 md:w-24 flex items-center justify-center bg-transparent hover:bg-p5-red/20 text-p5-white transition-colors z-20 group"
                >
                  <svg className="w-12 h-12 md:w-16 md:h-16 group-hover:-translate-x-2 transition-transform drop-shadow-[2px_2px_0_#0F0F0F]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentMediaIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute inset-y-0 right-0 w-16 md:w-24 flex items-center justify-center bg-transparent hover:bg-p5-red/20 text-p5-white transition-colors z-20 group"
                >
                  <svg className="w-12 h-12 md:w-16 md:h-16 group-hover:translate-x-2 transition-transform drop-shadow-[2px_2px_0_#0F0F0F]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                  </svg>
                </button>
              </>
            )}

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-p5-black border-4 border-p5-red px-6 py-2 font-display text-xl text-p5-white z-20 -skew-x-[6deg]">
              <span className="inline-block skew-x-[6deg]">
                {currentMediaIndex + 1} // {allMedia.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
