import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakGerman } from '../utils/audio';

interface AudioButtonProps {
  text: string;
  rate?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  rate = 0.9,
  size = 'md',
  label,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setHasError(false);

    const success = speakGerman(
      text,
      rate,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      () => {
        setIsPlaying(false);
        setHasError(true);
      }
    );

    if (!success) {
      setHasError(true);
    }
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      title={hasError ? 'Pronunția audio nu este disponibilă pe acest dispozitiv' : `Ascultă pronunția germană: "${text}"`}
      aria-label={`Ascultă pronunția pentru ${text}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-150 select-none text-xs font-medium cursor-pointer ${
        isPlaying
          ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-400'
          : hasError
          ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 active:scale-95'
      } ${className}`}
    >
      {hasError ? (
        <VolumeX className={iconSizes[size]} />
      ) : (
        <Volume2
          className={`${iconSizes[size]} ${
            isPlaying ? 'text-amber-700 animate-pulse' : 'text-stone-600'
          }`}
        />
      )}
      {label && <span className="whitespace-nowrap">{label}</span>}
      {isPlaying && (
        <span className="flex items-center gap-0.5 ml-0.5" aria-hidden="true">
          <span className="w-1 h-2 bg-amber-600 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 h-3 bg-amber-600 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 h-1.5 bg-amber-600 animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
      )}
    </button>
  );
};
