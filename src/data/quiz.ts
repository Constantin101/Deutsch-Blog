import { QuizQuestion } from '../types';

export const ARTICLE_TRAINER_ITEMS = [
  { word: 'Mädchen', correct: 'das', explanation: 'Sufixul diminutival -chen dictează întotdeauna genul neutru (das).' },
  { word: 'Wohnung', correct: 'die', explanation: 'Sufixul -ung este întotdeauna feminin (die).' },
  { word: 'Tisch', correct: 'der', explanation: 'Obiect de mobilier uzual monosilabic masculin (der Tisch).' },
  { word: 'Freiheit', correct: 'die', explanation: 'Sufixul -heit este 100% feminin (die).' },
  { word: 'Schmetterling', correct: 'der', explanation: 'Sufixul -ling este întotdeauna masculin (der).' },
  { word: 'Auto', correct: 'das', explanation: 'Împrumut internațional / mijloc de transport neutru (das Auto).' },
  { word: 'Möglichkeit', correct: 'die', explanation: 'Sufixul -keit este întotdeauna feminin (die).' },
  { word: 'Kühlschrank', correct: 'der', explanation: 'Cuvânt compus format cu "der Schrank" (ultimul cuvânt dă genul).' },
  { word: 'Universität', correct: 'die', explanation: 'Sufixul -tät este feminin garantat (die).' },
  { word: 'Essen', correct: 'das', explanation: 'Verbele folosite ca substantive (substantivarea infinitivului) sunt neutre (das).' },
  { word: 'Regen', correct: 'der', explanation: 'Fenomenele meteo sunt masculine în limba germană (der Regen).' },
  { word: 'Freundschaft', correct: 'die', explanation: 'Sufixul -schaft este întotdeauna feminin (die).' }
];

export const SENTENCE_BUILDER_PUZZLES = [
  {
    id: 'sb1',
    prompt: 'Construiește propoziția: „Astăzi merg eu cu autobuzul la birou.”',
    hint: 'Regula TeKaMoLo: Timp (Heute) -> Verb pe Poziția 2 (fahre) -> Subiect (ich) -> Mod (mit dem Bus) -> Loc (ins Büro).',
    correctOrder: ['Heute', 'fahre', 'ich', 'mit', 'dem', 'Bus', 'ins', 'Büro'],
    scrambled: ['ins', 'fahre', 'Büro', 'Heute', 'Bus', 'ich', 'mit', 'dem'],
    explanation: 'Deoarece am început propoziția cu timpul („Heute”), verbul „fahre” rămâne pe Poziția 2, iar subiectul „ich” trece imediat pe Poziția 3 (inversiune).'
  },
  {
    id: 'sb2',
    prompt: 'Construiește propoziția cu verb modal: „Eu nu pot veni mâine.”',
    hint: 'Cleștele verbal: Modalul pe poziția 2, verbul la infinitiv la sfârșitul propoziției.',
    correctOrder: ['Ich', 'kann', 'morgen', 'leider', 'nicht', 'kommen'],
    scrambled: ['kommen', 'kann', 'nicht', 'morgen', 'Ich', 'leider'],
    explanation: 'Verbul modal „kann” ocupă poziția 2, iar infinitivul „kommen” se duce la sfârșitul absolut al propoziției.'
  },
  {
    id: 'sb3',
    prompt: 'Construiește propoziția secundară: „El rămâne acasă pentru că este bolnav.”',
    hint: 'După „weil”, verbul conjugat („ist”) se mută la sfârșitul frazei!',
    correctOrder: ['Er', 'bleibt', 'zu', 'Hause,', 'weil', 'er', 'krank', 'ist'],
    scrambled: ['ist', 'zu', 'weil', 'bleibt', 'krank', 'Hause,', 'Er', 'er'],
    explanation: 'Conjuncția „weil” cere ca verbul conjugat („ist”) să fie plasat pe ultimul loc în propoziția secundară.'
  },
  {
    id: 'sb4',
    prompt: 'Construiește propoziția la timpul trecut Perfekt: „Noi am băut o cafea ieri.”',
    hint: 'Auxiliarul „haben” pe poziția 2, iar Partizip II („getrunken”) la sfârșit.',
    correctOrder: ['Wir', 'haben', 'gestern', 'einen', 'Kaffee', 'getrunken'],
    scrambled: ['getrunken', 'Kaffee', 'haben', 'gestern', 'Wir', 'einen'],
    explanation: 'La timpul trecut Perfekt, auxiliarul „haben” se conjugă pe poziția 2, iar participiul trecut „getrunken” închide cleștele verbal la final.'
  }
];

export const GRAMMAR_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'gq1',
    type: 'case',
    prompt: 'Completează cu articolul corect: „Ich schenke _______ (der Bruder) ein Buch.”',
    options: ['den Bruder', 'dem Bruder', 'des Bruders', 'der Bruder'],
    correctAnswer: 'dem Bruder',
    explanation: 'Verbul „schenken” (a dărui) cere persoanei cazul DATIV (Cui dăruiesc? -> Dativ masculin: der Bruder devine dem Bruder).',
    level: 'A2'
  },
  {
    id: 'gq2',
    type: 'case',
    prompt: 'Completează corect (Wechselpräposition - mișcare vs repaus): „Das Kind läuft in _______ (das Zimmer).”',
    options: ['das Zimmer', 'dem Zimmer', 'den Zimmer', 'des Zimmers'],
    correctAnswer: 'das Zimmer',
    explanation: 'Întrebarea este „Wohin läuft das Kind?” (Încotro aleargă copilul?). Mișcarea spre o destinație cere ACUZATIV: das Zimmer rămâne das Zimmer (prescurtat „ins Zimmer”).',
    level: 'A2'
  },
  {
    id: 'gq3',
    type: 'article',
    prompt: 'Care este forma corectă a verbului modal können: „Er _______ sehr gut Deutsch sprechen.”',
    options: ['kann', 'kannst', 'könnt', 'können'],
    correctAnswer: 'kann',
    explanation: 'La persoana a 3-a singular (er/sie/es), verbul modal își schimbă vocala și NU are terminație: er kann!',
    level: 'A1'
  },
  {
    id: 'gq4',
    type: 'case',
    prompt: 'Alege prepoziția și cazul corect: „Ich fahre jeden Tag mit _______ (der Bus) zur Arbeit.”',
    options: ['den Bus', 'dem Bus', 'des Busses', 'der Bus'],
    correctAnswer: 'dem Bus',
    explanation: 'Prepoziția „mit” cere ÎNTOTDEAUNA cazul Dativ. Pentru masculin: der Bus devine dem Bus.',
    level: 'A1'
  },
  {
    id: 'gq5',
    type: 'sentence',
    prompt: 'Ce conjuncție cere verbul pe ULTIMUL LOC?',
    options: ['aber', 'und', 'weil', 'oder'],
    correctAnswer: 'weil',
    explanation: '„weil” este o conjuncție subordonatoare care aruncă verbul conjugat pe ultimul loc. În schimb, „aber”, „und” și „oder” fac parte din grupul ADUSO (poziția zero).',
    level: 'A2'
  }
];
