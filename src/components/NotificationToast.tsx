import React, { useState, useEffect } from 'react';
import { Bell, Flame, X, ArrowRight, BookOpen, Bookmark, Check } from 'lucide-react';
import { DailyProgressState } from '../utils/dailyProgress';

interface NotificationToastProps {
  isVisible: boolean;
  missingArticles: number;
  missingWords: number;
  streakDays: number;
  onDismiss: () => void;
  onActionRead: () => void;
  onActionVocabulary: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  isVisible,
  missingArticles,
  missingWords,
  streakDays,
  onDismiss,
  onActionRead,
  onActionVocabulary
}) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setHasInteracted(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <aside
      aria-live="polite"
      role="status"
      className="fixed bottom-5 right-4 sm:right-6 z-50 max-w-sm sm:max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl border-2 border-amber-300 shadow-2xl p-4 sm:p-5 transition-all duration-300 animate-slide-up"
    >
      {/* Top row with icon, title and close button */}
      <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-[#F0ECE4]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-amber-800 font-semibold">
              <span>Reminder de Seară</span>
              <span>·</span>
              <span>Serie de {streakDays} {streakDays === 1 ? 'zi' : 'zile'}</span>
            </div>
            <h4 className="font-serif font-bold text-sm text-[#191E24]">
              Obiectivul de astăzi nu este finalizat!
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="p-1 text-[#7C858F] hover:text-[#191E24] rounded-md hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          title="Închide reminderul pentru astăzi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body description */}
      <div className="py-3 text-xs text-[#525A62] leading-relaxed space-y-2">
        <p>
          Este seară și mai ai puțin de parcurs pentru a-ți îndeplini ținta zilnică:
        </p>

        {/* Missing checklist pills */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          {missingArticles > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-medium font-mono text-[11px]">
              <BookOpen className="w-3 h-3 text-amber-700" />
              <span>{missingArticles} {missingArticles === 1 ? 'articol rămas' : 'articole rămase'}</span>
            </span>
          )}

          {missingWords > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-medium font-mono text-[11px]">
              <Bookmark className="w-3 h-3 text-blue-700" />
              <span>{missingWords} {missingWords === 1 ? 'cuvânt de salvat' : 'cuvinte de salvat'}</span>
            </span>
          )}
        </div>

        <p className="text-[11px] text-[#7A828B] italic pt-1">
          O sesiune scurtă de 3 minute îți păstrează seria activă și progresează automat graficul de 7 zile!
        </p>
      </div>

      {/* Quick Action buttons */}
      <div className="pt-2 border-t border-[#F0ECE4] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {missingArticles > 0 ? (
            <button
              type="button"
              onClick={() => {
                setHasInteracted(true);
                onActionRead();
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#191E24] text-white font-medium hover:bg-[#2C343D] transition-colors cursor-pointer"
            >
              <span>Citește un ghid</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setHasInteracted(true);
                onActionVocabulary();
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#191E24] text-white font-medium hover:bg-[#2C343D] transition-colors cursor-pointer"
            >
              <span>Învață cuvinte</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {missingWords > 0 && missingArticles > 0 && (
            <button
              type="button"
              onClick={() => {
                setHasInteracted(true);
                onActionVocabulary();
              }}
              className="px-2.5 py-1.5 rounded-lg border border-[#DFDAD0] bg-[#FAF8F5] text-[#191E24] font-medium hover:bg-[#EFECE6] transition-colors cursor-pointer"
            >
              Vocabular
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="text-[#7C858F] hover:text-[#191E24] transition-colors cursor-pointer text-[11px] underline"
        >
          Amână azi
        </button>
      </div>
    </aside>
  );
};
