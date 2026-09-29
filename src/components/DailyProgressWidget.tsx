import React, { useState, useRef, useEffect } from 'react';
import { Flame, CheckCircle2, BookOpen, Bookmark, Target, Settings, ChevronRight, Sparkles, X, BarChart3 } from 'lucide-react';
import { DailyProgressState, updateDailyGoals } from '../utils/dailyProgress';
import { ReminderSettings, requestBrowserNotificationPermission } from '../utils/notifications';
import { isSoundEnabled, setSoundEnabled, playSaveWordSound } from '../utils/soundEffects';
import { BLOG_ARTICLES } from '../data/articles';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { AudioButton } from './AudioButton';
import { ProgressChart } from './ProgressChart';
import { BlogArticle } from '../types';

interface DailyProgressWidgetProps {
  progress: DailyProgressState;
  onUpdateGoals: (articlesGoal: number, wordsGoal: number) => void;
  onOpenArticle?: (article: BlogArticle) => void;
  onExploreVocabulary?: () => void;
  variant?: 'popover' | 'card';
  isOpen?: boolean;
  onClose?: () => void;
  initialTab?: 'today' | 'chart';
  reminderSettings?: ReminderSettings;
  onUpdateReminderSettings?: (settings: ReminderSettings) => void;
  onTestReminderToast?: () => void;
}

export const DailyProgressWidget: React.FC<DailyProgressWidgetProps> = ({
  progress,
  onUpdateGoals,
  onOpenArticle,
  onExploreVocabulary,
  variant = 'card',
  isOpen = false,
  onClose,
  initialTab = 'today',
  reminderSettings,
  onUpdateReminderSettings,
  onTestReminderToast
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'today' | 'chart'>(initialTab);
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [articlesGoalInput, setArticlesGoalInput] = useState(progress.dailyGoalArticles);
  const [wordsGoalInput, setWordsGoalInput] = useState(progress.dailyGoalWords);

  // Reminder form state
  const [reminderEnabled, setReminderEnabled] = useState(reminderSettings?.enabled ?? true);
  const [reminderHour, setReminderHour] = useState(reminderSettings?.eveningHour ?? 19);
  const [soundActive, setSoundActive] = useState(() => isSoundEnabled());

  useEffect(() => {
    setArticlesGoalInput(progress.dailyGoalArticles);
    setWordsGoalInput(progress.dailyGoalWords);
  }, [progress.dailyGoalArticles, progress.dailyGoalWords]);

  useEffect(() => {
    if (reminderSettings) {
      setReminderEnabled(reminderSettings.enabled);
      setReminderHour(reminderSettings.eveningHour);
    }
  }, [reminderSettings]);

  const articlesCount = progress.today.articlesRead.length;
  const wordsCount = progress.today.wordsSaved.length;

  const articlesPercent = Math.min(100, Math.round((articlesCount / progress.dailyGoalArticles) * 100));
  const wordsPercent = Math.min(100, Math.round((wordsCount / progress.dailyGoalWords) * 100));

  const totalGoalReached =
    articlesCount >= progress.dailyGoalArticles && wordsCount >= progress.dailyGoalWords;

  // Retrieve read articles details
  const readArticles = BLOG_ARTICLES.filter((a) =>
    progress.today.articlesRead.includes(a.id)
  );

  // Retrieve saved words details
  const savedWordsToday = VOCABULARY_LIST.filter((w) =>
    progress.today.wordsSaved.includes(w.id)
  );

  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGoals(articlesGoalInput, wordsGoalInput);
    if (onUpdateReminderSettings && reminderSettings) {
      onUpdateReminderSettings({
        ...reminderSettings,
        enabled: reminderEnabled,
        eveningHour: reminderHour
      });
    }
    setIsEditingGoals(false);
  };

  const handleRequestPush = async () => {
    const granted = await requestBrowserNotificationPermission();
    if (onUpdateReminderSettings && reminderSettings) {
      onUpdateReminderSettings({
        ...reminderSettings,
        webPushEnabled: granted
      });
    }
  };

  const formattedDate = new Intl.DateTimeFormat('ro-RO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date());

  const content = (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#EAE5DC]">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#7C858F]">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span className="font-semibold text-amber-900">
              Serie: {progress.streakDays} {progress.streakDays === 1 ? 'zi' : 'zile consecutive'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#191E24] capitalize mt-0.5">
            {formattedDate}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsEditingGoals(!isEditingGoals)}
            className="p-1.5 rounded-md text-[#7C858F] hover:text-[#191E24] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            title="Configurează obiectivele zilnice și reminderul de seară"
          >
            <Settings className="w-4 h-4" />
          </button>
          {variant === 'popover' && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md text-[#7C858F] hover:text-[#191E24] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sub-tab switcher: Activitate Astăzi vs Grafic 7 Zile */}
      <div className="flex items-center p-1 bg-[#EFECE6] rounded-xl text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveSubTab('today')}
          className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
            activeSubTab === 'today'
              ? 'bg-white text-[#191E24] shadow-xs font-semibold'
              : 'text-[#626A72] hover:text-[#191E24]'
          }`}
        >
          Activitate Astăzi
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('chart')}
          className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 ${
            activeSubTab === 'chart'
              ? 'bg-white text-[#191E24] shadow-xs font-semibold'
              : 'text-[#626A72] hover:text-[#191E24]'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-amber-700" />
          <span>Grafic 7 Zile</span>
        </button>
      </div>

      {/* Sub-tab 1: Today Activity */}
      {activeSubTab === 'today' ? (
        <div className="space-y-4">

      {/* Goal & Reminder configuration form (toggleable) */}
      {isEditingGoals ? (
        <form onSubmit={handleSaveGoals} className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#DFDAD0] space-y-3.5 text-xs">
          <div className="font-semibold text-[#191E24] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-amber-700" />
              <span>Configurare Ținte & Remindere:</span>
            </span>
            {onTestReminderToast && (
              <button
                type="button"
                onClick={onTestReminderToast}
                className="text-[11px] text-amber-800 hover:text-amber-950 font-semibold underline cursor-pointer"
              >
                Testează notificarea
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#5B636B] mb-1">Articole de citit/zi:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={articlesGoalInput}
                onChange={(e) => setArticlesGoalInput(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-[#DFDAD0] rounded-lg text-[#191E24] font-mono text-center"
              />
            </div>
            <div>
              <label className="block text-[#5B636B] mb-1">Cuvinte de salvat/zi:</label>
              <input
                type="number"
                min="1"
                max="30"
                value={wordsGoalInput}
                onChange={(e) => setWordsGoalInput(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-[#DFDAD0] rounded-lg text-[#191E24] font-mono text-center"
              />
            </div>
          </div>

          {/* Evening Reminder Settings Section */}
          <div className="pt-2 border-t border-[#DFDAD0] space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[#2C343D] cursor-pointer">
                <input
                  type="checkbox"
                  checked={reminderEnabled}
                  onChange={(e) => setReminderEnabled(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="font-medium">Reminder vizual de seară</span>
              </label>

              <select
                value={reminderHour}
                disabled={!reminderEnabled}
                onChange={(e) => setReminderHour(Number(e.target.value))}
                className="bg-white border border-[#DFDAD0] rounded px-2 py-1 text-[11px] font-mono disabled:opacity-50"
              >
                <option value={18}>18:00 (Seara devreme)</option>
                <option value={19}>19:00 (Ora 19:00)</option>
                <option value={20}>20:00 (Ora 20:00)</option>
                <option value={21}>21:00 (Ora 21:00)</option>
                <option value={22}>22:00 (Ora 22:00)</option>
              </select>
            </div>

            <p className="text-[11px] text-[#7C858F] leading-normal">
              Dacă nu ai atins obiectivele până la ora aleasă, va apărea o notificare prietenoasă tip toast pentru a nu pierde seria zilnică.
            </p>
          </div>

          {/* Sound Feedback Settings Section */}
          <div className="pt-2 border-t border-[#DFDAD0] flex items-center justify-between">
            <label className="flex items-center gap-2 text-[#2C343D] cursor-pointer">
              <input
                type="checkbox"
                checked={soundActive}
                onChange={(e) => {
                  setSoundActive(e.target.checked);
                  setSoundEnabled(e.target.checked);
                  if (e.target.checked) {
                    playSaveWordSound();
                  }
                }}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="font-medium">Feedback audio subtil la acțiuni</span>
            </label>
            {soundActive && (
              <button
                type="button"
                onClick={() => playSaveWordSound()}
                className="text-[11px] text-amber-800 hover:text-amber-950 font-semibold underline cursor-pointer"
              >
                Testează ♫
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleRequestPush}
              className="text-[11px] text-[#525A62] hover:text-[#191E24] underline cursor-pointer"
            >
              Activează notificări Web
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditingGoals(false)}
                className="px-2.5 py-1 text-[#626A72] hover:text-[#191E24] cursor-pointer"
              >
                Anulează
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-[#191E24] text-white rounded-md font-medium hover:bg-[#2C343D] cursor-pointer"
              >
                Salvează
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {/* Total Goal Banner */}
      {totalGoalReached && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3 flex items-center gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
          <div>
            <strong>Ținta de astăzi a fost atinsă!</strong> Felicitări pentru perseverență! Continuă ritmul mâine.
          </div>
        </div>
      )}

      {/* Metric 1: Articles Read Today */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-medium text-[#2C343D]">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Articole citite astăzi</span>
          </span>
          <span className="font-mono text-xs tabular-nums text-[#191E24]">
            <strong>{articlesCount}</strong> / {progress.dailyGoalArticles}
            {articlesCount >= progress.dailyGoalArticles && (
              <span className="ml-1 text-emerald-700 font-bold">✓</span>
            )}
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2 bg-[#EFECE6] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              articlesCount >= progress.dailyGoalArticles ? 'bg-emerald-600' : 'bg-amber-600'
            }`}
            style={{ width: `${articlesPercent}%` }}
          />
        </div>

        {/* Articles list if any */}
        {readArticles.length > 0 ? (
          <div className="pt-1 space-y-1">
            {readArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => onOpenArticle?.(art)}
                className="text-xs p-1.5 rounded-lg hover:bg-[#FAF8F5] flex items-center justify-between gap-2 text-[#4B535B] hover:text-[#191E24] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">{art.title}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-[#9AA2AB] shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-[#7C858F] italic pt-0.5">
            Nu ai citit încă niciun ghid astăzi. Deschide un articol pentru a-l bifa!
          </p>
        )}
      </div>

      {/* Metric 2: Words Saved Today */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-medium text-[#2C343D]">
            <Bookmark className="w-3.5 h-3.5 text-blue-700" />
            <span>Cuvinte noi salvate astăzi</span>
          </span>
          <span className="font-mono text-xs tabular-nums text-[#191E24]">
            <strong>{wordsCount}</strong> / {progress.dailyGoalWords}
            {wordsCount >= progress.dailyGoalWords && (
              <span className="ml-1 text-emerald-700 font-bold">✓</span>
            )}
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2 bg-[#EFECE6] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              wordsCount >= progress.dailyGoalWords ? 'bg-emerald-600' : 'bg-blue-600'
            }`}
            style={{ width: `${wordsPercent}%` }}
          />
        </div>

        {/* Saved words list if any */}
        {savedWordsToday.length > 0 ? (
          <div className="pt-1 space-y-1">
            {savedWordsToday.slice(0, 3).map((w) => (
              <div
                key={w.id}
                className="text-xs p-1.5 rounded-lg bg-[#FAF8F5] border border-[#EFECE6] flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-mono font-bold text-amber-800 text-[10px]">
                    {w.article || '•'}
                  </span>
                  <span className="font-serif font-bold text-[#191E24] truncate">
                    {w.german}
                  </span>
                  <span className="text-[#646C76] truncate text-[11px]">
                    = {w.romanian}
                  </span>
                </div>
                <AudioButton text={`${w.article} ${w.german}`} size="sm" className="scale-85" />
              </div>
            ))}
            {savedWordsToday.length > 3 && (
              <p className="text-[11px] text-[#7C858F] text-right">
                + încă {savedWordsToday.length - 3} cuvinte salvate azi
              </p>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-[#7C858F] italic pt-0.5">
            Salvează cuvinte noi din secțiunea de vocabular pentru a-ți atinge obiectivul!
          </p>
        )}
      </div>

      {/* Footer shortcut */}
      {onExploreVocabulary && (
        <div className="pt-2 border-t border-[#F0ECE4] flex justify-between items-center text-xs">
          <span className="text-[#7C858F]">Exersează zilnic pentru rezultate rapide</span>
          <button
            type="button"
            onClick={onExploreVocabulary}
            className="text-[#191E24] font-semibold hover:text-amber-800 transition-colors cursor-pointer"
          >
            Vezi Vocabular →
          </button>
        </div>
      )}
    </div>
  ) : (
    /* Sub-tab 2: 7-Day Activity Chart */
    <div className="pt-1">
      <ProgressChart progress={progress} compact={variant === 'popover'} />
    </div>
  )}
    </div>
  );

  if (variant === 'popover') {
    if (!isOpen) return null;
    return (
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-start justify-center sm:justify-end sm:pr-8 pt-18 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl border border-[#DFDAD0] shadow-2xl p-5 w-full max-w-sm sm:max-w-md animate-scale-up"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      </div>
    );
  }

  // Card variant
  return (
    <div className="bg-white rounded-2xl border border-[#DFDAD0] p-5 sm:p-6 shadow-xs">
      {content}
    </div>
  );
};
