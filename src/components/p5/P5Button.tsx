import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'download' | 'action';

interface P5ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
  download?: boolean | string;
}

export const P5Button: React.FC<P5ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  href, 
  className = '',
  icon,
  download
}) => {
  const baseStyles = "font-display text-xl py-3 px-6 transition-all cursor-pointer flex items-center justify-center gap-2 group/btn relative overflow-hidden";
  
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-p5-red text-p5-white border-4 border-p5-black shadow-[8px_8px_0_0_#0F0F0F] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0_0_#0F0F0F] -skew-x-[6deg] active:translate-y-0 active:translate-x-0 active:shadow-[8px_8px_0_0_#0F0F0F]",
    secondary: "bg-p5-black text-p5-white border-2 border-p5-white hover:bg-p5-red transition-colors active:bg-p5-red",
    outline: "bg-p5-white text-p5-black border-2 border-p5-black hover:bg-p5-red hover:text-p5-white transition-all active:bg-p5-red active:text-p5-white",
    download: "bg-p5-red text-p5-white border-4 border-p5-black shadow-hard hover:bg-p5-black active:bg-p5-black",
    action: "bg-p5-white text-p5-black border-2 border-p5-black shadow-[4px_4px_0_0_#E50012] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-1 active:translate-y-1"
  };

  const Element = href ? 'a' : 'button';
  
  return (
    <Element 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      download={download as any}
    >
      {/* Box icon for source code style if primary/secondary */}
      {variant === 'secondary' && <span className="w-4 h-4 bg-p5-white group-hover/btn:bg-p5-black transition-colors"></span>}
      
      {icon && <span className="flex-shrink-0">{icon}</span>}
      
      <span className={variant === 'primary' ? 'inline-block skew-x-[6deg]' : ''}>
        {children}
      </span>
    </Element>
  );
};

export default P5Button;
