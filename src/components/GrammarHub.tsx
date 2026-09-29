import React, { useState } from 'react';
import { ArrowRight, HelpCircle, Layers, CheckCircle2, Shuffle, BookOpen } from 'lucide-react';
import { GRAMMAR_TOPICS } from '../data/grammar';
import { AudioButton } from './AudioButton';
import { CefrLevel, BlogArticle } from '../types';

interface GrammarHubProps {
  onSelectArticleBySlug: (slug: string) => void;
  articles: BlogArticle[];
}

export const GrammarHub: React.FC<GrammarHubProps> = ({
  onSelectArticleBySlug,
  articles
}) => {
  // Interactive Case Selector State
  const [selectedCase, setSelectedCase] = useState<'nom' | 'akk' | 'dat' | 'gen'>('akk');

  // Interactive Wechselpräpositionen State
  const [prepMode, setPrepMode] = useState<'wo' | 'wohin'>('wo');

  const caseDetails = {
    nom: {
      name: 'Nominativ',
      question: 'Wer? / Was? (Cine? / Ce?)',
      role: 'Subiectul propoziției — cine face acțiunea',
      articles: { m: 'der', f: 'die', n: 'das', pl: 'die' },
      indefinite: { m: 'ein', f: 'eine', n: 'ein', pl: '— / keine' },
      exampleDe: 'Der Lehrer erklärt die deutsche Grammatik.',
      exampleRo: 'Profesorul explică gramatica germană.',
      note: 'Forma de bază a substantivului din dicționar.'
    },
    akk: {
      name: 'Acuzativ (Akkusativ)',
      question: 'Wen? / Was? (Pe cine? / Ce?) sau Wohin? (Încotro?)',
      role: 'Complementul direct sau direcția de deplasare',
      articles: { m: 'den', f: 'die', n: 'das', pl: 'die' },
      indefinite: { m: 'einen', f: 'eine', n: 'ein', pl: '— / keine' },
      exampleDe: 'Ich trinke jeden Morgen einen heißen Kaffee.',
      exampleRo: 'Beau în fiecare dimineață o cafea fierbinte.',
      note: 'Atenție! Doar masculinul se schimbă: der devine DEN, ein devine EINEN!'
    },
    dat: {
      name: 'Dativ (Dativ)',
      question: 'Wem? (Cui?) sau Wo? (Unde?)',
      role: 'Complementul indirect (destinatarul) sau starea de repaus',
      articles: { m: 'dem', f: 'der', n: 'dem', pl: 'den (+n)' },
      indefinite: { m: 'einem', f: 'einer', n: 'einem', pl: '— / keinen (+n)' },
      exampleDe: 'Ich helfe dem Mann und gebe der Frau den Schlüssel.',
      exampleRo: 'Îl ajut pe bărbat (cui?) și îi dau femeii cheia.',
      note: 'La plural, substantivul primește desinația -n (ex: den Kindern).'
    },
    gen: {
      name: 'Genitiv (Genitiv)',
      question: 'Wessen? (Al / A / Ai / Ale cui?)',
      role: 'Posesia, apartenența sau prepoziții precum wegen, während, trotz',
      articles: { m: 'des (+s/es)', f: 'der', n: 'des (+s/es)', pl: 'der' },
      indefinite: { m: 'eines (+s/es)', f: 'einer', n: 'eines (+s/es)', pl: '— / keiner' },
      exampleDe: 'Das ist das Auto meines Vaters.',
      exampleRo: 'Aceasta este mașina tatălui meu.',
      note: 'Substantivele masculine și neutre primesc desinația -(e)s la final.'
    }
  };

  const prepPairs = [
    {
      prep: 'in (în)',
      wo: {
        de: 'Ich bin im (in dem) Zimmer.',
        ro: 'Sunt în cameră (stare de repaus).',
        highlight: 'Dativ: in dem -> im'
      },
      wohin: {
        de: 'Ich gehe ins (in das) Zimmer.',
        ro: 'Merg înspre cameră (mișcare).',
        highlight: 'Acuzativ: in das -> ins'
      }
    },
    {
      prep: 'auf (pe)',
      wo: {
        de: 'Das Buch liegt auf dem Tisch.',
        ro: 'Cartea stă culcată pe masă.',
        highlight: 'Dativ: dem Tisch'
      },
      wohin: {
        de: 'Ich lege das Buch auf den Tisch.',
        ro: 'Așez cartea pe masă.',
        highlight: 'Acuzativ: den Tisch'
      }
    },
    {
      prep: 'an (la/pe perete)',
      wo: {
        de: 'Das Bild hängt an der Wand.',
        ro: 'Tabloul atârnă pe perete.',
        highlight: 'Dativ: der Wand'
      },
      wohin: {
        de: 'Ich hänge das Bild an die Wand.',
        ro: 'Agăț tabloul pe perete.',
        highlight: 'Acuzativ: die Wand'
      }
    },
    {
      prep: 'unter (sub)',
      wo: {
        de: 'Der Hund schläft unter dem Bett.',
        ro: 'Câinele doarme sub pat.',
        highlight: 'Dativ: dem Bett'
      },
      wohin: {
        de: 'Der Ball rollt unter das Bett.',
        ro: 'Mingea se rostogolește sub pat.',
        highlight: 'Acuzativ: das Bett'
      }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Title */}
      <div className="space-y-3">
        <div className="text-xs font-mono tracking-widest text-[#7C858F] uppercase">
          Manual & Ghid Vizual de Gramatică Germană
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#15191E] tracking-tight">
          Regulile Gramaticale Explicație Pas cu Pas
        </h1>
        <p className="text-base text-[#525A62] max-w-2xl">
          De la declinarea articolelor și poziția verbului (V2) până la prepozițiile cu dublu regim. Experimentează cu simulatoarele interactive de mai jos.
        </p>
      </div>

      {/* INTERACTIVE TOOL 1: Cazurile Germane Explorer */}
      <section className="bg-white rounded-2xl border border-[#DFDAD0] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0ECE4]">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#191E24]">
              1. Simulator Interactiv: Cele 4 Cazuri Germane
            </h2>
            <p className="text-xs text-[#717A84] mt-1">
              Selectează un caz pentru a vedea cum se transformă articolele și cum se folosește în propoziție.
            </p>
          </div>

          {/* Case switcher tabs */}
          <div className="flex items-center bg-[#EFECE6] p-1 rounded-xl gap-1 shrink-0">
            {(['nom', 'akk', 'dat', 'gen'] as const).map((cKey) => (
              <button
                key={cKey}
                type="button"
                onClick={() => setSelectedCase(cKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCase === cKey
                    ? 'bg-white text-[#191E24] shadow-xs'
                    : 'text-[#5B636B] hover:text-[#191E24]'
                }`}
              >
                {cKey === 'nom' ? 'Nominativ' : cKey === 'akk' ? 'Acuzativ' : cKey === 'dat' ? 'Dativ' : 'Genitiv'}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Case Content */}
        {(() => {
          const current = caseDetails[selectedCase];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Details & Formula */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                    Caz selectat: {current.name}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#15191E]">
                    {current.question}
                  </h3>
                  <p className="text-sm text-[#4E565E]">{current.role}</p>
                </div>

                <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EFECE6] space-y-2">
                  <div className="text-xs font-mono uppercase text-[#7C858F] font-semibold">
                    Exemplu în propoziție:
                  </div>
                  <p className="text-base font-serif font-semibold text-[#191E24]">
                    {current.exampleDe}
                  </p>
                  <p className="text-xs text-[#525A62]">{current.exampleRo}</p>
                  <div className="pt-2">
                    <AudioButton text={current.exampleDe} size="sm" label="Ascultă propoziția" />
                  </div>
                </div>

                <div className="text-xs text-amber-900 bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <span className="font-semibold">💡 Notă:</span> {current.note}
                </div>
              </div>

              {/* Right Column: Comparative Declension Table */}
              <div className="lg:col-span-7 space-y-4">
                <div className="overflow-x-auto rounded-xl border border-[#DFDAD0] bg-white">
                  <div className="px-4 py-2.5 bg-[#FAF8F5] border-b border-[#DFDAD0] text-xs font-semibold text-[#40474F]">
                    Tabelul Articolelor la Cazul {current.name}
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#DFDAD0] bg-[#F7F4EE] text-xs font-semibold text-[#191E24]">
                        <th className="px-3 py-2.5">Tip Articol</th>
                        <th className="px-3 py-2.5 text-blue-700">Masculin (m)</th>
                        <th className="px-3 py-2.5 text-rose-700">Feminin (f)</th>
                        <th className="px-3 py-2.5 text-emerald-700">Neutru (n)</th>
                        <th className="px-3 py-2.5 text-purple-700">Plural (pl)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFECE6] text-xs">
                      <tr>
                        <td className="px-3 py-3 font-medium text-[#4B535B]">Articol Hotărât</td>
                        <td className="px-3 py-3 font-mono font-bold text-blue-800 bg-blue-50/40">
                          {current.articles.m}
                        </td>
                        <td className="px-3 py-3 font-mono font-bold text-rose-800 bg-rose-50/40">
                          {current.articles.f}
                        </td>
                        <td className="px-3 py-3 font-mono font-bold text-emerald-800 bg-emerald-50/40">
                          {current.articles.n}
                        </td>
                        <td className="px-3 py-3 font-mono font-bold text-purple-800 bg-purple-50/40">
                          {current.articles.pl}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-3 font-medium text-[#4B535B]">Articol Nehotărât</td>
                        <td className="px-3 py-3 font-mono text-blue-900">{current.indefinite.m}</td>
                        <td className="px-3 py-3 font-mono text-rose-900">{current.indefinite.f}</td>
                        <td className="px-3 py-3 font-mono text-emerald-900">{current.indefinite.n}</td>
                        <td className="px-3 py-3 font-mono text-purple-900">{current.indefinite.pl}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onSelectArticleBySlug('cele-patru-cazuri-nominativ-acuzativ-dativ-genitiv')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#191E24] hover:text-amber-800 transition-colors cursor-pointer"
                  >
                    <span>Citește ghidul complet al cazurilor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* INTERACTIVE TOOL 2: Wechselpräpositionen (Wo vs Wohin) */}
      <section className="bg-white rounded-2xl border border-[#DFDAD0] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0ECE4]">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#191E24]">
              2. Wechselpräpositionen: Repaus (Wo?) vs. Mișcare (Wohin?)
            </h2>
            <p className="text-xs text-[#717A84] mt-1">
              Cele 9 prepoziții (an, auf, hinter, in, neben, über, unter, vor, zwischen) își schimbă cazul automat.
            </p>
          </div>

          {/* Wo vs Wohin switch */}
          <div className="flex items-center bg-[#EFECE6] p-1 rounded-xl gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setPrepMode('wo')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                prepMode === 'wo'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-[#5B636B] hover:text-[#191E24]'
              }`}
            >
              📍 WO? Unde? (DATIV)
            </button>
            <button
              type="button"
              onClick={() => setPrepMode('wohin')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                prepMode === 'wohin'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-[#5B636B] hover:text-[#191E24]'
              }`}
            >
              🏃 WOHIN? Încotro? (ACUZATIV)
            </button>
          </div>
        </div>

        {/* State Banner */}
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm font-medium ${
            prepMode === 'wo'
              ? 'bg-amber-50/70 border-amber-200 text-amber-950'
              : 'bg-blue-50/70 border-blue-200 text-blue-950'
          }`}
        >
          {prepMode === 'wo' ? (
            <p>
              <strong>Regula Dativului (Wo?):</strong> Se folosește când obiectul sau persoana este deja acolo, într-un loc fix (stare de repaus, fără trecere peste o graniță spațială). Verbe tipice: <em>liegen</em> (a zăcea), <em>stehen</em> (a sta în picioare), <em>sitzen</em> (a ședea), <em>sein</em> (a fi).
            </p>
          ) : (
            <p>
              <strong>Regula Acuzativului (Wohin?):</strong> Se folosește când acțiunea arată deplasare spre o țintă sau schimbarea locației (mișcare din punctul A în punctul B). Verbe tipice: <em>legen</em> (a așeza culcat), <em>stellen</em> (a așeza drept), <em>setzen</em> (a așeza în fund), <em>gehen</em> (a merge).
            </p>
          )}
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prepPairs.map((item, idx) => {
            const activeData = prepMode === 'wo' ? item.wo : item.wohin;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-xl border border-[#DFDAD0] p-4 space-y-2 hover:border-[#C7BFB0] transition-colors"
              >
                <div className="flex items-center justify-between text-xs pb-1 border-b border-[#EAE5DC]">
                  <span className="font-mono font-bold text-[#191E24]">{item.prep}</span>
                  <span
                    className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
                      prepMode === 'wo'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    {activeData.highlight}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2 pt-1">
                  <p className="text-base font-serif font-semibold text-[#191E24]">
                    {activeData.de}
                  </p>
                  <AudioButton text={activeData.de} size="sm" />
                </div>
                <p className="text-xs text-[#525A62]">{activeData.ro}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Structured Reference Modules from Data */}
      <div className="space-y-8">
        <h2 className="text-2xl font-serif font-bold text-[#191E24]">
          Lecții de Gramatică Ghidate
        </h2>

        <div className="space-y-8">
          {GRAMMAR_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-[#DFDAD0] p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#717A84]">
                  <span className="font-mono text-amber-800 uppercase font-semibold">
                    {topic.germanTitle}
                  </span>
                  <span>·</span>
                  <span>Nivel {topic.level}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#191E24]">
                  {topic.title}
                </h3>
                <p className="text-sm text-[#525A62]">{topic.summary}</p>
              </div>

              {topic.rules.map((rule, rIdx) => (
                <div key={rIdx} className="space-y-4 pt-4 border-t border-[#F0ECE4]">
                  <h4 className="text-lg font-serif font-semibold text-[#191E24]">
                    {rule.title}
                  </h4>
                  <p className="text-sm text-[#3E454D] leading-relaxed">
                    {rule.explanation}
                  </p>

                  {rule.formula && (
                    <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#DFDAD0] text-xs font-mono text-[#191E24]">
                      <span className="font-bold text-amber-800">Formulă:</span> {rule.formula}
                    </div>
                  )}

                  {rule.table && (
                    <div className="overflow-x-auto rounded-xl border border-[#DFDAD0]">
                      {rule.table.caption && (
                        <div className="px-4 py-2 bg-[#FAF8F5] text-xs font-semibold text-[#40474F] border-b border-[#DFDAD0]">
                          {rule.table.caption}
                        </div>
                      )}
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#DFDAD0] bg-[#F7F4EE] text-[#191E24]">
                            {rule.table.headers.map((h, i) => (
                              <th key={i} className="px-3 py-2.5 font-semibold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EFECE6]">
                          {rule.table.rows.map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-[#FAF8F5]">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3 py-2 text-[#2E353D]">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {rule.examples.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {rule.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="bg-[#FAF8F5] rounded-xl p-3 border border-[#EFECE6] text-xs space-y-1"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-serif font-semibold text-[#191E24]">
                              {ex.german}
                            </p>
                            <AudioButton text={ex.german} size="sm" />
                          </div>
                          <p className="text-[#525A62]">{ex.romanian}</p>
                          {ex.breakdown && (
                            <p className="text-[11px] font-mono text-amber-800 pt-1">
                              {ex.breakdown}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {rule.tip && (
                    <div className="text-xs text-amber-900 bg-amber-50 rounded-lg p-2.5 border border-amber-200">
                      💡 <strong>Sfat cheie:</strong> {rule.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
