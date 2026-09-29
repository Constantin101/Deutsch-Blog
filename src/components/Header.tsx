import React from 'react';
import { Search, Bookmark, Sparkles, Flame } from 'lucide-react';
import { CefrLevel } from '../types';

interface HeaderProps {
  activeTab: 'articole' | 'gramatica' | 'vocabular' | 'exercitii' | 'salvate';
  onSelectTab: (tab: 'articole' | 'gramatica' | 'vocabular' | 'exercitii' | 'salvate') => void;
  selectedLevel: CefrLevel;
  onSelectLevel: (level: CefrLevel) => void;
  onOpenSearch: () => void;
  savedCount: number;
  onOpenDailyProgress: () => void;
  articlesReadTodayCount: number;
  wordsSavedTodayCount: number;
  streakDays: number;
  isDailyGoalAchieved: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  selectedLevel,
  onSelectLevel,
  onOpenSearch,
  savedCount,
  onOpenDailyProgress,
  articlesReadTodayCount,
  wordsSavedTodayCount,
  streakDays,
  isDailyGoalAchieved
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E7E2D9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element brand wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('articole')}
          className="text-xl font-serif font-bold tracking-tight text-[#191E24] hover:opacity-90 transition-opacity text-left shrink-0 cursor-pointer"
        >
          KlarDeutsch
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#525A62]">
          <button
            type="button"
            onClick={() => onSelectTab('articole')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'articole'
                ? 'text-[#191E24] font-semibold border-b-2 border-[#191E24]'
                : 'hover:text-[#191E24]'
            }`}
          >
            Articole & Ghiduri
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('gramatica')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'gramatica'
                ? 'text-[#191E24] font-semibold border-b-2 border-[#191E24]'
                : 'hover:text-[#191E24]'
            }`}
          >
            Gramatică
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('vocabular')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'vocabular'
                ? 'text-[#191E24] font-semibold border-b-2 border-[#191E24]'
                : 'hover:text-[#191E24]'
            }`}
          >
            Vocabular Tematic
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('exercitii')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 ${
              activeTab === 'exercitii'
                ? 'text-[#191E24] font-semibold border-b-2 border-[#191E24]'
                : 'hover:text-[#191E24]'
            }`}
          >
            Exerciții & Quiz
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('salvate')}
            className={`transition-colors whitespace-nowrap cursor-pointer pb-0.5 flex items-center gap-1.5 ${
              activeTab === 'salvate'
                ? 'text-[#191E24] font-semibold border-b-2 border-[#191E24]'
                : 'hover:text-[#191E24]'
            }`}
          >
            <span>Salvate</span>
            {savedCount > 0 && (
              <span className="text-xs font-mono tabular-nums text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions + Daily Progress indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Level Filter Segmented Control */}
          <div className="hidden lg:flex items-center bg-[#EFECE6] p-1 rounded-lg">
            {(['Toate', 'A1', 'A2', 'B1'] as CefrLevel[]).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => onSelectLevel(lvl)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-white text-[#191E24] shadow-xs'
                    : 'text-[#626A72] hover:text-[#191E24]'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Daily Progress Indicator Trigger in Zone 3 */}
          <button
            type="button"
            onClick={onOpenDailyProgress}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              isDailyGoalAchieved
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                : 'bg-white text-[#191E24] border-[#DFDAD0] hover:bg-[#F6F3EC]'
            }`}
            title={`Progresul de astăzi: ${articlesReadTodayCount} articole citite, ${wordsSavedTodayCount} cuvinte salvate`}
          >
            <Flame className={`w-3.5 h-3.5 ${streakDays > 0 ? 'text-amber-600 fill-amber-500' : 'text-[#7C858F]'}`} />
            <span className="hidden sm:inline">Azi:</span>
            <span className="font-mono tabular-nums font-semibold">
              {articlesReadTodayCount} art · {wordsSavedTodayCount} cuv
            </span>
          </button>

          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#4B535B] bg-[#EFECE6] hover:bg-[#E5E1D8] rounded-lg transition-colors cursor-pointer"
            title="Caută articole, cuvinte sau reguli de gramatică (Ctrl + K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Caută...</span>
            <kbd className="hidden xl:inline text-[10px] font-mono text-[#78818A] bg-white px-1.5 py-0.5 rounded shadow-xs border border-[#DFDAD0]">
              ⌘K
            </kbd>
          </button>

          {/* Mobile saved button */}
          <button
            type="button"
            onClick={() => onSelectTab('salvate')}
            className="md:hidden p-2 text-[#4B535B] hover:text-[#191E24] relative cursor-pointer"
            aria-label="Lecții salvate"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-600 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Subnavigation Row */}
      <div className="md:hidden border-t border-[#E7E2D9] px-4 py-2 flex items-center justify-between overflow-x-auto gap-3 text-xs font-medium">
        <button
          type="button"
          onClick={() => onSelectTab('articole')}
          className={`whitespace-nowrap px-2 py-1 rounded ${
            activeTab === 'articole' ? 'bg-[#191E24] text-white' : 'text-[#525A62]'
          }`}
        >
          Articole
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('gramatica')}
          className={`whitespace-nowrap px-2 py-1 rounded ${
            activeTab === 'gramatica' ? 'bg-[#191E24] text-white' : 'text-[#525A62]'
          }`}
        >
          Gramatică
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('vocabular')}
          className={`whitespace-nowrap px-2 py-1 rounded ${
            activeTab === 'vocabular' ? 'bg-[#191E24] text-white' : 'text-[#525A62]'
          }`}
        >
          Vocabular
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('exercitii')}
          className={`whitespace-nowrap px-2 py-1 rounded ${
            activeTab === 'exercitii' ? 'bg-[#191E24] text-white' : 'text-[#525A62]'
          }`}
        >
          Exerciții
        </button>
        <button
          type="button"
          onClick={onOpenDailyProgress}
          className="whitespace-nowrap px-2 py-1 rounded bg-[#EFECE6] text-[#191E24] flex items-center gap-1 shrink-0 font-mono text-[11px]"
        >
          <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
          <span>{articlesReadTodayCount} art · {wordsSavedTodayCount} cuv</span>
        </button>
        <select
          value={selectedLevel}
          onChange={(e) => onSelectLevel(e.target.value as CefrLevel)}
          className="bg-[#EFECE6] text-[#191E24] text-xs font-medium px-2 py-1 rounded border-none focus:ring-1 focus:ring-[#191E24]"
        >
          <option value="Toate">Toate Nivelurile</option>
          <option value="A1">A1 Începător</option>
          <option value="A2">A2 Elementar</option>
          <option value="B1">B1 Intermediar</option>
        </select>
      </div>
    </header>
  );
};
