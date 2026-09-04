import React, { useState } from 'react';

interface LocalizedText {
  es: string;
  en: string;
}

type ButtonAction = 'redirigir' | 'copiar';

interface TestimonialButton {
  text: LocalizedText;
  action: ButtonAction;
  url?: string;
  content?: string;
}

export type CardAngle = 'skew-y-1' | 'skew-y-2' | 'skew-y-neg1' | 'skew-y-neg2' | 'skew-x-1' | 'skew-x-neg1' | 'none';

const ANGLE_CLASSES: Record<CardAngle, string> = {
  'skew-y-1': 'skew-y-[1deg]',
  'skew-y-2': 'skew-y-[2deg]',
  'skew-y-neg1': '-skew-y-[1deg]',
  'skew-y-neg2': '-skew-y-[2deg]',
  'skew-x-1': 'skew-x-[1deg]',
  'skew-x-neg1': '-skew-x-[1deg]',
  'none': '',
};

const SHADOW_VARIANTS = [
  'shadow-[4px_4px_0_0_#E50012] sm:shadow-[8px_8px_0_0_#E50012] md:shadow-[12px_12px_0_0_#E50012] md:hover:shadow-[16px_16px_0_0_#E50012]',
  'shadow-[-4px_4px_0_0_#E50012] sm:shadow-[-8px_8px_0_0_#E50012] md:shadow-[-12px_12px_0_0_#E50012] md:hover:shadow-[-16px_16px_0_0_#E50012]',
  'shadow-[4px_-3px_0_0_#E50012] sm:shadow-[8px_-4px_0_0_#E50012] md:shadow-[12px_-6px_0_0_#E50012] md:hover:shadow-[16px_-8px_0_0_#E50012]',
  'shadow-[-4px_4px_0_0_#E50012] sm:shadow-[-6px_8px_0_0_#E50012] md:shadow-[-8px_12px_0_0_#E50012] md:hover:shadow-[-12px_16px_0_0_#E50012]',
] as const;

const BADGE_SIDES = ['left-4 md:left-8', 'right-4 md:right-8'] as const;

export interface TestimonialData {
  name: string;
  text: LocalizedText;
  linkedin?: string;
  role?: LocalizedText;
  image?: string;
  button?: TestimonialButton;
}

interface TestimonialCardProps {
  name: string;
  text: LocalizedText;
  linkedin?: string;
  role?: LocalizedText;
  image?: string;
  button?: TestimonialButton;
  angle?: CardAngle;
  shadowIndex?: number;
  badgeRight?: boolean;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  text,
  linkedin,
  role,
  image,
  button,
  angle = 'skew-y-neg1',
  shadowIndex = 0,
  badgeRight = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent, content: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderButton = () => {
    if (!button) return null;

    const baseClasses =
      'inline-flex items-center gap-2 font-display text-sm md:text-base px-4 py-2 border-2 border-p5-black shadow-[3px_3px_0_0_#E50012] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all';

    if (button.action === 'redirigir' && button.url) {
      return (
        <a
          href={button.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} bg-p5-white text-p5-black`}
        >
          <span className="lang-es">{button.text.es}</span>
          <span className="lang-en">{button.text.en}</span>
        </a>
      );
    }

    if (button.action === 'copiar' && button.content) {
      return (
        <button
          onClick={(e) => handleCopy(e, button.content!)}
          className={`${baseClasses} ${copied ? 'bg-p5-black text-p5-white' : 'bg-p5-white text-p5-black'}`}
        >
          {copied ? (
            <>
              <span className="lang-es">COPIADO</span>
              <span className="lang-en">COPIED</span>
            </>
          ) : (
            <>
              <span className="lang-es">{button.text.es}</span>
              <span className="lang-en">{button.text.en}</span>
            </>
          )}
        </button>
      );
    }

    return null;
  };
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`relative bg-p5-black p-3 sm:p-4 md:p-6 border-2 md:border-4 border-p5-white ${ANGLE_CLASSES[angle]} ${SHADOW_VARIANTS[shadowIndex % SHADOW_VARIANTS.length]} md:hover:-translate-y-1 md:hover:-translate-x-1 transition-all duration-300`}>
      {/* Halftone overlay */}
      <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none"></div>

      {/* Name Badge */}
      <div className={`absolute -top-3 sm:-top-4 md:-top-6 ${badgeRight ? 'right-2 sm:right-4 md:right-8' : 'left-3 sm:left-4 md:left-8'} bg-p5-red text-p5-white font-display text-sm sm:text-base md:text-2xl px-2 sm:px-3 md:px-6 py-0.5 md:py-1 -skew-x-[12deg] border-2 border-p5-white z-10 max-w-[85%] truncate`}>
        <span className="inline-block skew-x-[12deg]">{name}</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-3 md:gap-6 pt-4 md:pt-6">
        {/* Image / Avatar */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-20 h-20 md:w-24 md:h-24 object-cover border-4 border-p5-red shadow-[4px_4px_0_0_#F4F4F4] -skew-x-[3deg]"
            />
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 bg-p5-red border-4 border-p5-white shadow-[4px_4px_0_0_#F4F4F4] flex items-center justify-center -skew-x-[3deg]">
              <span className="font-display text-2xl md:text-3xl text-p5-white skew-x-[3deg]">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 space-y-4">
          {role && (
            <span className="font-mono text-xs text-p5-red tracking-widest uppercase block">
              <span className="lang-es">{role.es}</span>
              <span className="lang-en">{role.en}</span>
            </span>
          )}
          <div className="space-y-4">
            <p className="font-body text-p5-white text-base md:text-lg leading-relaxed">
              {text.es.split('\n').map((p, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  <span className="lang-es">{p}</span>
                </React.Fragment>
              ))}
              {text.en.split('\n').map((p, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  <span className="lang-en">{p}</span>
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            {renderButton()}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display text-sm md:text-base px-4 py-2 bg-p5-white text-p5-black border-2 border-p5-black shadow-[3px_3px_0_0_#E50012] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LINKEDIN</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Triangle indicator */}
      <div className="absolute bottom-4 right-4 animate-bounce z-10">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="var(--color-p5-red)">
          <polygon points="0,0 20,0 10,20"></polygon>
        </svg>
      </div>
    </div>
  );
};

export default TestimonialCard;
