import React, { useState } from 'react';
import { TechTag } from './TechTag';
import { P5Button } from './P5Button';

type LocalizedText = {
  es: string;
  en: string;
};

export interface MediaItem {
  type: 'video' | 'image' | 'sketchfab';
  url: string;
  filename: string;
}

interface FeaturedProjectProps {
  title: string;
  context: LocalizedText;
  description: LocalizedText;
  tags: string[];
  media: MediaItem[];
  orientation?: 'left' | 'right';
  className?: string;
  primaryButton?: { text: LocalizedText; href: string };
  secondaryButton?: { text: LocalizedText; href: string };
  role?: LocalizedText;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  title,
  context,
  description,
  tags,
  media,
  orientation = 'left',
  className = '',
  primaryButton,
  secondaryButton,
  role
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isLeft = orientation === 'left';

  const previewMedia = media.filter(m => m.type !== 'sketchfab');
  const [previewIndex, setPreviewIndex] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % media.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + media.length) % media.length);

  const openFullscreen = () => {
    const idx = media.findIndex(m => m.url === previewMedia[previewIndex]?.url);
    setCurrentSlide(idx >= 0 ? idx : 0);
    setIsFullscreen(true);
  };

  const openExpanded = () => {
    const idx = media.findIndex(m => m.url === previewMedia[previewIndex]?.url);
    setCurrentSlide(idx >= 0 ? idx : 0);
    setIsExpanded(true);
  };

  return (
    <section className={`w-full relative pb-8 ${className}`}>
      <div
        className={`relative w-full lg:w-[92%] xl:w-[90%] transition-all duration-300 ${
          isLeft
            ? 'lg:ml-[2%] xl:ml-[3%] mr-auto pr-1 md:pr-4 lg:pr-8'
            : 'lg:mr-[2%] xl:mr-[3%] ml-auto pl-1 md:pl-4 lg:pl-8'
        }`}
      >
        <div
          className={`absolute -top-8 md:-top-10 z-30 pointer-events-none ${
            isLeft ? '-left-1 md:-left-6' : '-right-1 md:-right-6 text-right'
          }`}
        >
          <div
            className={`
              ${
                isLeft
                  ? 'bg-p5-red rotate-2 border-p5-black shadow-hard'
                  : 'bg-p5-black -rotate-2 border-p5-red shadow-hard-white-inverse'
              }
              text-p5-white p-2 md:p-3 lg:p-4 border-2 md:border-4 inline-block min-w-[160px] md:min-w-[250px] lg:min-w-[350px] max-w-[calc(100vw-2rem)]
            `}
          >
            <span className="font-mono text-[10px] md:text-xs block mb-0.5 md:mb-1 opacity-80 tracking-[0.2em] md:tracking-[0.3em]">
              <span className="lang-es">&gt; PROYECTO_ACTUAL:</span>
              <span className="lang-en">&gt; CURRENT_PROJECT:</span>
            </span>
            <h2 className="font-display text-lg md:text-3xl lg:text-4xl tracking-widest uppercase leading-none border-t-2 border-p5-white/30 pt-1 md:pt-2">
              PROJECT_{' '}
              <span className={`${isLeft ? 'text-p5-black bg-p5-white' : 'text-p5-red bg-p5-white'} px-2 md:px-4 uppercase`}>
                {title}
              </span>
            </h2>
          </div>
        </div>

        <div
          className={`bg-panel border-4 md:border-6 border-p5-black p-2 md:p-4 lg:p-6 pt-12 md:pt-16 lg:pt-20 ${
            isLeft ? 'shadow-hard-adaptive' : 'shadow-hard-adaptive-inverse'
          } relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 relative z-10">
            <div className={`lg:col-span-7 flex flex-col justify-center ${isLeft ? '' : 'lg:order-2'}`}>
              <div
                className={`relative aspect-video bg-p5-black border-2 md:border-4 border-p5-white overflow-hidden ${
                  isLeft ? 'shadow-hard' : 'shadow-hard-white-inverse'
                } mb-2 md:mb-3 cursor-pointer group`}
                onClick={openFullscreen}
              >
                <div className="absolute inset-0 bg-p5-red/20 opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none flex items-center justify-center">
                  <div className="bg-p5-black text-p5-white font-display text-2xl px-4 py-2 border-2 border-p5-white -skew-x-[6deg] tracking-widest scale-90 group-hover:scale-100 transition-transform">
                    <span className="inline-block skew-x-[6deg]">
                      <span className="lang-es">AMPLIAR</span>
                      <span className="lang-en">EXPAND</span>
                    </span>
                  </div>
                </div>

                <div className="w-full h-full relative">
                  {previewMedia.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === previewIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      {item.type === 'video' ? (
                        <video src={item.url} className="w-full h-full object-contain" autoPlay muted loop />
                      ) : (
                        <img src={item.url} className="w-full h-full object-contain" alt={`Slide ${index}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {previewMedia.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-2 md:mt-3">
                  {previewMedia.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPreviewIndex(i)}
                      className={`w-3 h-3 border-2 transition-all ${i === previewIndex ? 'bg-p5-red border-p5-black scale-125' : 'bg-p5-white/50 border-p5-black'}`}
                    />
                  ))}
                </div>
              )}

              <div className={`flex items-center px-2 ${isLeft ? 'justify-between' : 'justify-end'}`}>
                <div
                  className={`font-mono text-[10px] px-3 py-1 border border-adaptive uppercase tracking-widest ${
                    isLeft ? 'bg-p5-red text-p5-white -rotate-1' : 'bg-p5-white text-p5-black rotate-1'
                  }`}
                >
                  <span className="lang-es">&gt; ARCHIVO:</span>
                  <span className="lang-en">&gt; FILE:</span>{' '}
                  {previewMedia[previewIndex]?.filename}
                </div>
              </div>
            </div>

            <div className={`lg:col-span-5 flex flex-col gap-4 md:gap-5 ${isLeft ? '' : 'lg:order-1'}`}>
              <div
                className={`
                  ${isLeft ? 'bg-p5-white text-p5-black border-l-[8px] md:border-l-[12px]' : 'bg-p5-black text-p5-white border-l-[8px] md:border-l-[12px]'}
                  p-4 md:p-5 lg:p-6 border-p5-red ${isLeft ? 'shadow-hard' : 'shadow-hard-inverse'} relative
                `}
              >
                <h3
                  className={`font-display text-2xl md:text-3xl lg:text-4xl mb-2 md:mb-3 uppercase tracking-tighter leading-none border-b-2 pb-2 italic ${
                    isLeft ? 'border-p5-black' : 'border-p5-red text-p5-red'
                  }`}
                >
                  <span className="lang-es">{context.es}</span>
                  <span className="lang-en">{context.en}</span>
                </h3>
                <p className="font-body text-xs md:text-sm lg:text-base leading-relaxed opacity-90">
                  <span className="lang-es">{description.es}</span>
                  <span className="lang-en">{description.en}</span>
                </p>
              </div>

              <div className="space-y-2 md:space-y-3">
                <h4 className={`font-display text-base md:text-xl uppercase text-p5-red tracking-widest ${isLeft ? 'text-left' : 'text-right'}`}>
                  TECH_STACK
                </h4>
                <div className={`flex flex-wrap gap-2 md:gap-3 ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  {tags.map((tag, i) => (
                    <TechTag key={tag} name={tag} index={i} />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row w-full gap-2 md:gap-3">
                {primaryButton && (
                  <P5Button
                    href={primaryButton.href}
                    variant="secondary"
                    className="w-full sm:flex-1 !text-xs sm:!text-sm lg:!text-base !px-1 md:!px-3 whitespace-nowrap"
                  >
                    <span className="lang-es">{primaryButton.text.es}</span>
                    <span className="lang-en">{primaryButton.text.en}</span>
                  </P5Button>
                )}
                {secondaryButton && (
                  <P5Button
                    href={secondaryButton.href}
                    variant="primary"
                    className="w-full sm:flex-1 !text-xs sm:!text-sm lg:!text-base !px-1 md:!px-3 whitespace-nowrap"
                  >
                    <span className="lang-es">{secondaryButton.text.es}</span>
                    <span className="lang-en">{secondaryButton.text.en}</span>
                  </P5Button>
                )}
                <P5Button
                  onClick={openExpanded}
                  variant="outline"
                  className="w-full sm:flex-1 !text-xs sm:!text-sm lg:!text-base !px-1 md:!px-3 whitespace-nowrap"
                >
                  <span className="lang-es">MAS INFO</span>
                  <span className="lang-en">MORE INFO</span>
                </P5Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex justify-center p-3 sm:p-6 md:p-12 lg:p-20 overflow-y-auto"
          onClick={() => setIsExpanded(false)}
        >
          <div className="fixed inset-0 bg-p5-black/90 backdrop-blur-md animate-fade-in">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#F4F4F4 1px, transparent 1px)', backgroundSize: '16px 16px' }}
            ></div>
          </div>

          <div
            className={`relative w-full max-w-[160rem] bg-p5-black border-2 md:border-4 ${
              isLeft ? 'border-p5-red' : 'border-p5-white'
            } p-4 md:p-10 flex flex-col md:flex-row gap-4 md:gap-8 shadow-[4px_4px_0_0_#E50012] md:shadow-[16px_16px_0_0_#E50012] animate-slide-in my-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 min-w-[44px] min-h-[44px] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-display text-xl md:text-3xl border-2 md:border-4 transition-colors z-50 -skew-x-[6deg] active:scale-95 bg-p5-white text-p5-black border-p5-black hover:bg-p5-red hover:text-p5-white"
            >
              <span className="skew-x-[6deg]">X</span>
            </button>

            {media[currentSlide]?.type === 'sketchfab' ? (
              <div className="w-full md:w-1/2 aspect-video overflow-hidden relative border-2 md:border-4 border-p5-white">
                <iframe
                  src={media[currentSlide].url}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                ></iframe>
              </div>
            ) : (
              <div
                className="w-full md:w-1/2 aspect-video overflow-hidden relative border-2 md:border-4 border-p5-white cursor-pointer group"
                onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
              >
                <div className="absolute inset-0 bg-p5-red/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none flex items-center justify-center">
                  <div className="bg-p5-black text-p5-white font-display text-xl px-3 py-1 border-2 border-p5-white -skew-x-[6deg] tracking-widest scale-90 group-hover:scale-100 transition-transform">
                    <span className="inline-block skew-x-[6deg]">
                      <span className="lang-es">AMPLIAR</span>
                      <span className="lang-en">EXPAND</span>
                    </span>
                  </div>
                </div>
                {media.length > 0 ? (
                  <>
                    <div className="w-full h-full relative">
                      {media[currentSlide].type === 'video' ? (
                        <video key={currentSlide} src={media[currentSlide].url} className="w-full h-full object-cover" controls />
                      ) : (
                        <img key={currentSlide} src={media[currentSlide].url} alt={`${title} ${currentSlide + 1}`} className="w-full h-full object-cover" />
                      )}
                    </div>

                    {media.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center font-display text-2xl border-4 transition-colors z-10 -skew-x-[6deg] active:scale-95 bg-p5-white text-p5-black border-p5-black hover:bg-p5-red hover:text-p5-white"
                        >
                          <span className="skew-x-[6deg]">‹</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center font-display text-2xl border-4 transition-colors z-10 -skew-x-[6deg] active:scale-95 bg-p5-white text-p5-black border-p5-black hover:bg-p5-red hover:text-p5-white"
                        >
                          <span className="skew-x-[6deg]">›</span>
                        </button>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {media.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                              className={`w-3 h-3 border-2 transition-all ${i === currentSlide ? 'bg-p5-red border-p5-black scale-125' : 'bg-p5-white/50 border-p5-black'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-5xl md:text-6xl tracking-widest relative bg-p5-black text-p5-white">
                    <div className="absolute inset-0 opacity-10 bg-halftone"></div>
                    <span className="z-20 transform -rotate-2">{title}</span>
                  </div>
                )}
              </div>
            )}

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
                    <p className="font-body text-sm md:text-base lg:text-lg text-p5-white opacity-90">
                      <span className="lang-es">{role.es}</span>
                      <span className="lang-en">{role.en}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-8">
                {tags.map((tag, i) => (
                  <TechTag key={tag} name={tag} index={i} variant="black" />
                ))}
              </div>

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
            {media.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
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

            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
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
                    nextSlide();
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
                <span className="lang-es">DIAPO {currentSlide + 1} // {media.length}</span>
                <span className="lang-en">SLIDE {currentSlide + 1} // {media.length}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProject;
