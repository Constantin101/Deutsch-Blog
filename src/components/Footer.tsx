import React from 'react';
import { BookOpen, Award, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'articole' | 'gramatica' | 'vocabular' | 'exercitii' | 'salvate') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E7E2D9] bg-[#FAF8F5] pt-12 pb-16 text-xs text-[#6F7781]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-lg font-serif font-bold text-[#191E24] block">
              KlarDeutsch
            </span>
            <p className="text-[#565E67] leading-relaxed max-w-sm">
              Platformă editorială dedicată învățării limbii germane pentru vorbitorii de limba română. Explicații logice, vocabular tematic cu pronunție audio nativă și exerciții interactive.
            </p>
            <div className="text-[11px] text-[#868E97]">
              Conform Cadrului European Comun de Referință pentru Limbi (CECRL: A1 · A2 · B1)
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-[#191E24] text-[11px]">
              Secțiuni Principale
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('articole')}
                  className="hover:text-[#191E24] transition-colors cursor-pointer"
                >
                  Articole & Ghiduri de Gramatică
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('gramatica')}
                  className="hover:text-[#191E24] transition-colors cursor-pointer"
                >
                  Tabele & Wechselpräpositionen
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('vocabular')}
                  className="hover:text-[#191E24] transition-colors cursor-pointer"
                >
                  Vocabular Tematic & Flashcards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('exercitii')}
                  className="hover:text-[#191E24] transition-colors cursor-pointer"
                >
                  Antrenor der / die / das & Satzbau
                </button>
              </li>
            </ul>
          </div>

          {/* Golden Rules Summary */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-semibold uppercase tracking-wider text-[#191E24] text-[11px]">
              Trei Reguli de Aur
            </h4>
            <div className="space-y-2 text-[#565E67]">
              <p>
                <strong className="text-[#191E24]">1.</strong> Învață mereu substantivul cu articol și plural (<span className="text-blue-700">der</span>, <span className="text-rose-700">die</span>, <span className="text-emerald-700">das</span>).
              </p>
              <p>
                <strong className="text-[#191E24]">2.</strong> Verbul conjugat stă pe Poziția a Doua (V2) în propoziția principală.
              </p>
              <p>
                <strong className="text-[#191E24]">3.</strong> Prepozițiile de loc: <em>Wo?</em> cere Dativ, <em>Wohin?</em> cere Acuzativ.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#EAE5DC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} KlarDeutsch. Toate drepturile rezervate.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#565E67] hover:text-[#191E24] transition-colors cursor-pointer"
          >
            <span>Mergi sus</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
