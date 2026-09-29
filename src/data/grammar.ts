import { GrammarTopic } from '../types';

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'declinarea-articolelor',
    title: 'Declinarea Articolelor în cele 4 Cazuri',
    germanTitle: 'Deklination der Artikel',
    level: 'A1',
    summary: 'Învață cum se schimbă articolele hotărâte (der, die, das) și nehotărâte (ein, eine, ein) în funcție de rolul lor sintactic în propoziție.',
    rules: [
      {
        title: 'Articole Hotărâte (Bestimmter Artikel)',
        explanation: 'Articolul hotărât se referă la un obiect sau o persoană specifică, deja cunoscută în conversație.',
        table: {
          caption: 'Declinarea Articolului Hotărât (der, die, das)',
          headers: ['Caz', 'Masculin (m)', 'Feminin (f)', 'Neutru (n)', 'Plural (pl)'],
          rows: [
            ['Nominativ (Cine?)', 'der Mann', 'die Frau', 'das Kind', 'die Kinder'],
            ['Acuzativ (Pe cine?)', 'den Mann', 'die Frau', 'das Kind', 'die Kinder'],
            ['Dativ (Cui?)', 'dem Mann', 'der Frau', 'dem Kind', 'den Kindern (+n)'],
            ['Genitiv (Al cui?)', 'des Mannes (+es)', 'der Frau', 'des Kindes (+es)', 'der Kinder']
          ]
        },
        examples: [
          {
            german: 'Der Mann gibt der Frau das Buch.',
            romanian: 'Bărbatul (Nom.) îi dă femeii (Dat.) cartea (Acuz.).',
            breakdown: 'Der Mann (subiect) + der Frau (cui?) + das Buch (ce?)'
          },
          {
            german: 'Ich sehe den neuen Lehrer im Schulhof.',
            romanian: 'Îl văd pe noul profesor în curtea școlii.',
            breakdown: 'den Lehrer (Acuzativ masculin -> der devine den)'
          }
        ],
        tip: 'La Dativ Plural, substantivul primește aproape întotdeauna un "-n" la final dacă nu are deja (ex: Kinder -> den Kindern).'
      },
      {
        title: 'Articole Nehotărâte (Unbestimmter Artikel) și Negația (kein)',
        explanation: 'Articolul nehotărât (ein / o) introduce un element nou. Atenție: la plural NU există articol nehotărât (spunem direct "Kinder"), dar există forma negativă "keine Kinder"!',
        table: {
          caption: 'Declinarea Articolului Nehotărât (ein, eine, ein)',
          headers: ['Caz', 'Masculin', 'Feminin', 'Neutru', 'Negație Plural (kein)'],
          rows: [
            ['Nominativ', 'ein / kein', 'eine / keine', 'ein / kein', '— / keine'],
            ['Acuzativ', 'einen / keinen', 'eine / keine', 'ein / kein', '— / keine'],
            ['Dativ', 'einem / keinem', 'einer / keiner', 'einem / keinem', '— / keinen (+n)'],
            ['Genitiv', 'eines / keines', 'einer / keiner', 'eines / keines', '— / keiner']
          ]
        },
        examples: [
          {
            german: 'Hast du einen Hund? — Nein, ich habe keinen Hund.',
            romanian: 'Ai un câine? — Nu, nu am niciun câine.',
            breakdown: 'haben cere întotdeauna Acuzativ -> einen / keinen Hund'
          },
          {
            german: 'Er hilft einer alten Dame über die Straße.',
            romanian: 'El ajută o doamnă în vârstă să treacă strada.',
            breakdown: 'helfen cere Dativ -> einer Dame'
          }
        ]
      }
    ]
  },
  {
    id: 'pronumele-personale',
    title: 'Pronumele Personale în Nominativ, Acuzativ și Dativ',
    germanTitle: 'Personalpronomen',
    level: 'A1',
    summary: 'Înlocuirea substantivelor cu pronume: „eu, pe mine, mie”, „el, pe el, lui”.',
    rules: [
      {
        title: 'Tabelul complet al pronumelor personale',
        explanation: 'Alegerea pronumelui depinde direct de caz: Nominativ (subiect), Acuzativ (pe cine?) și Dativ (cui?).',
        table: {
          caption: 'Personalpronomen (Nominativ, Akkusativ, Dativ)',
          headers: ['Persoană', 'Nominativ', 'Acuzativ (Pe cine?)', 'Dativ (Cui?)'],
          rows: [
            ['eu (ich)', 'ich', 'mich (pe mine)', 'mir (mie / îmi)'],
            ['tu (du)', 'du', 'dich (pe tine)', 'dir (ție / îți)'],
            ['el (er)', 'er', 'ihn (pe el)', 'ihm (lui / îi)'],
            ['ea (sie)', 'sie', 'sie (pe ea)', 'ihr (ei / îi)'],
            ['el/ea neutru (es)', 'es', 'es (pe el/ea)', 'ihm (lui / îi)'],
            ['noi (wir)', 'wir', 'uns (pe noi)', 'uns (nouă / ne)'],
            ['voi (ihr)', 'ihr', 'euch (pe voi)', 'euch (vouă / vă)'],
            ['ei/ele (sie)', 'sie', 'sie (pe ei/ele)', 'ihnen (lor / le)'],
            ['Dumneavoastră (Sie)', 'Sie', 'Sie (pe Dvs.)', 'Ihnen (Dvs.)']
          ]
        },
        examples: [
          {
            german: 'Wie geht es dir? — Es geht mir sehr gut, danke!',
            romanian: 'Ce mai faci? (Cum îți merge?) — Îmi merge foarte bine, mulțumesc!',
            breakdown: 'expresia "es geht" cere întotdeauna Dativ (dir, mir, ihm)'
          },
          {
            german: 'Liebst du mich? — Ja, ich liebe dich!',
            romanian: 'Mă iubești? — Da, te iubesc!',
            breakdown: 'lieben cere Acuzativ (mich, dich, ihn)'
          }
        ],
        tip: 'Observă cum la persoana a 3-a masculin: er (Nom) -> ihn (Akk, la fel ca den) -> ihm (Dat, la fel ca dem).'
      }
    ]
  },
  {
    id: 'wechselpraepositionen',
    title: 'Prepozițiile cu Dublu Regim (Wechselpräpositionen)',
    germanTitle: 'Wechselpräpositionen: Wo? vs. Wohin?',
    level: 'A2',
    summary: 'Cele 9 prepoziții (an, auf, hinter, in, neben, über, unter, vor, zwischen) care își schimbă cazul între Dativ și Acuzativ în funcție de mișcare sau repaus.',
    rules: [
      {
        title: 'Regula de Aur: Poziție (Dativ) vs. Direcție (Acuzativ)',
        explanation: 'Când acțiunea arată UNDE se petrece ceva (repaus, nicio schimbare de graniță spațială), folosim DATIV. Când acțiunea arată ÎNCOTRO se îndreaptă ceva (deplasare, destinație, schimbare de loc), folosim ACUZATIV.',
        table: {
          caption: 'Comparație: Dativ (Unde?) vs. Acuzativ (Încotro?)',
          headers: ['Prepoziție', 'Wo? (Dativ - Repaus)', 'Wohin? (Acuzativ - Mișcare)'],
          rows: [
            ['in (în)', 'in dem (im) Zimmer (în cameră)', 'in das (ins) Zimmer (înspre cameră)'],
            ['auf (pe)', 'auf dem Tisch (pe masă)', 'auf den Tisch (pe masă - plasare)'],
            ['an (la/pe perete)', 'an der Wand (pe perete)', 'an die Wand (spre perete)'],
            ['unter (sub)', 'unter dem Bett (sub pat)', 'unter das Bett (sub pat - deplasare)'],
            ['vor (în fața)', 'vor der Tür (în fața ușii)', 'vor die Tür (în fața ușii)']
          ]
        },
        examples: [
          {
            german: 'Die Katze schläft auf dem Sofa.',
            romanian: 'Pisica doarme pe canapea (Wo? -> Dativ).',
            breakdown: 'auf + dem Sofa (Dativ neutru: das Sofa -> dem)'
          },
          {
            german: 'Die Katze springt auf das Sofa.',
            romanian: 'Pisica sare pe canapea (Wohin? -> Acuzativ).',
            breakdown: 'auf + das Sofa (Acuzativ neutru: das Sofa)'
          }
        ],
        tip: 'Verbele gemene: liegen (a sta culcat) / stehen (a sta în picioare) / sitzen (a ședea) cer DATIV. Iar legen (a culca) / stellen (a așeza în picioare) / setzen (a așeza în fund) cer ACUZATIV!'
      }
    ]
  },
  {
    id: 'verbele-modale-gramatica',
    title: 'Verbele Modale și Cleștele Verbal',
    germanTitle: 'Modalverben im Präsens',
    level: 'A1',
    summary: 'Stăpânește können, müssen, dürfen, wollen, sollen și möchten: conjugarea specială și regula plasării verbului la infinitiv.',
    rules: [
      {
        title: 'Tabelul de Conjugare la Timpul Prezent',
        explanation: 'Observă cum persoana 1 singular (ich) și persoana a 3-a singular (er/sie/es) sunt 100% IDENTICE și nu au terminații personale!',
        table: {
          caption: 'Conjugarea verbelor modale la prezent',
          headers: ['Pronume', 'können (a putea)', 'müssen (a trebui)', 'dürfen (a avea voie)', 'wollen (a vrea)'],
          rows: [
            ['ich', 'kann', 'muss', 'darf', 'will'],
            ['du', 'kannst', 'musst', 'darfst', 'willst'],
            ['er / sie / es', 'kann', 'muss', 'darf', 'will'],
            ['wir', 'können', 'müssen', 'dürfen', 'wollen'],
            ['ihr', 'könnt', 'müsst', 'dürft', 'wollt'],
            ['sie / Sie', 'können', 'müssen', 'dürfen', 'wollen']
          ]
        },
        examples: [
          {
            german: 'Ich muss morgen um 7 Uhr aufstehen.',
            romanian: 'Trebuie să mă trezesc mâine la ora 7.',
            breakdown: 'muss (verb modal pe poziția 2) ... aufstehen (infinitiv la finalul propoziției)'
          },
          {
            german: 'Darf ich hier mein Auto parken?',
            romanian: 'Am voie să îmi parchez mașina aici?',
            breakdown: 'Darf (întrebare cu verb pe poziția 1) ... parken (infinitiv la final)'
          }
        ]
      }
    ]
  },
  {
    id: 'conjunctions-si-topica',
    title: 'Conjuncțiile: ADUSO vs. Propoziția Secundară (Nebensatz)',
    germanTitle: 'Konjunktionen und Wortstellung',
    level: 'A2',
    summary: 'De ce după „aber” sau „und” ordinea cuvintelor nu se schimbă, dar după „weil” sau „dass” verbul sare pe ultimul loc.',
    rules: [
      {
        title: '1. Grupul ADUSO (Poziția Zero)',
        explanation: 'Conjuncțiile coordonatoare ocupă „Poziția Zero”. Ele unesc două propoziții principale fără să schimbe ordinea cuvintelor!',
        formula: 'A - aber (dar) | D - denn (căci) | U - und (și) | S - sondern (ci) | O - oder (sau)',
        examples: [
          {
            german: 'Ich lerne Deutsch und mein Bruder lernt Englisch.',
            romanian: 'Eu învăț germană și fratele meu învață engleză.',
            breakdown: 'după "und", "mein Bruder" este Subiect (Poz 1) și "lernt" este Verb (Poz 2)'
          },
          {
            german: 'Ich möchte mitkommen, aber ich habe keine Zeit.',
            romanian: 'Aș dori să vin cu voi, dar nu am timp.',
            breakdown: '"aber" = poziția zero, "ich" = poz 1, "habe" = poz 2'
          }
        ]
      },
      {
        title: '2. Conjuncțiile Subordonatoare (Verbul la sfârșit)',
        explanation: 'După: weil (pentru că), dass (că), wenn (dacă/când), obwohl (deși), da (deoarece), als (când în trecut), verbul conjugat se duce OBLIGATORIU la sfârșit.',
        examples: [
          {
            german: 'Er bleibt zu Hause, weil er krank ist.',
            romanian: 'El rămâne acasă pentru că este bolnav.',
            breakdown: 'weil + er (subiect) + krank + IST (verbul conjugat la sfârșit)'
          },
          {
            german: 'Ich hoffe, dass wir uns bald wiedersehen.',
            romanian: 'Sper că ne vom revedea curând.',
            breakdown: 'dass + wir (subiect) + uns bald + WIEDERSEHEN (verbul la final)'
          }
        ]
      }
    ]
  }
];
