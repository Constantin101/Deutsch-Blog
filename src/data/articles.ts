import { BlogArticle } from '../types';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'ghid-der-die-das',
    slug: 'ghidul-articolelor-germane-der-die-das',
    title: 'Ghidul Esențial der, die, das: Cum recunoști genul substantivelor fără să memorezi orbește',
    subtitle: 'Regulile de aur ale sufixelor, grupurilor semantice și secretul cuvintelor compuse explicate pentru vorbitorii de limba română.',
    level: 'A1',
    category: 'Gramatică',
    readTime: '7 min de citit',
    publishedDate: '12 Martie 2026',
    heroImage: '/src/assets/images/article_der_die_das_1790678997670.jpg',
    excerpt: 'Genul substantivelor în germană pare haotic la început, dar peste 70% din substantive urmează terminații și tipare logice clare. Iată regulile care îți salvează timpul.',
    keyTakeaway: 'Învață întotdeauna cuvântul împreună cu articolul său (nu "Tisch", ci "der Tisch") și uită-te mai întâi la sufixul final.',
    sections: [
      {
        heading: '1. De ce genurile din germană nu seamănă cu cele din română?',
        body: [
          'Prima greșeală pe care o fac începătorii români este să creadă că genul gramatical corespunde cu cel din română. În germană, soarele (die Sonne) este feminin, în timp ce luna (der Mond) este masculin. Mai mult, fetița (das Mädchen) este neutru!',
          'Genul în germană este o proprietate pur gramaticală a cuvântului, nu a obiectului în sine. De aceea, secretul numărul unu este să înveți orice substantiv nou ca o unitate indivizibilă formată din articol + substantiv + forma de plural.'
        ],
        examples: [
          {
            german: 'die Sonne scheint heute warm.',
            romanian: 'Soarele strălucește cald astăzi.',
            breakdown: 'die Sonne (feminin în germană vs. masculin în română)'
          },
          {
            german: 'der Mond ist heute Nacht voll.',
            romanian: 'Luna este plină în această noapte.',
            breakdown: 'der Mond (masculin în germană vs. feminin în română)'
          },
          {
            german: 'das Mädchen lernt fleißig Deutsch.',
            romanian: 'Fetița învață cu sârguință germana.',
            breakdown: 'das Mädchen (neutru datorită sufixului diminutival -chen)'
          }
        ],
        tip: 'Folosește culori constante în notițele tale: Albastru pentru DER (masculin), Roșu pentru DIE (feminin) și Verde pentru DAS (neutru).'
      },
      {
        heading: '2. Când folosim DER (Masculin)? Sufixe sigure 100%',
        body: [
          'Există terminații care indică fără nicio excepție genul masculin:',
          '• Persoane de sex masculin și profesii: der Mann (bărbatul), der Arzt (medicul), der Lehrer (profesorul)',
          '• Zilele săptămânii, lunile și anotimpurile: der Montag (luni), der Januar (ianuarie), der Sommer (vara)',
          '• Punctele cardinale și fenomenele meteo: der Norden (nordul), der Regen (ploaia), der Schnee (zăpada), der Wind (vântul)',
          '• Sufixe masculine cheie: -ling, -or, -ismus, -ist, -ant'
        ],
        table: {
          caption: 'Terminații tipice pentru DER (Masculin)',
          headers: ['Sufix', 'Exemplu german', 'Traducere în română'],
          rows: [
            ['-ling', 'der Schmetterling / der Lehrling', 'fluturele / ucenicul'],
            ['-or', 'der Motor / der Rektor', 'motorul / rectorul'],
            ['-ismus', 'der Optimismus / der Tourismus', 'optimismul / turismul'],
            ['-ist', 'der Polizist / der Journalist', 'polițistul / jurnalistul'],
            ['-er (agenți)', 'der Fahrer / der Computer', 'șoferul / calculatorul']
          ]
        },
        examples: [
          {
            german: 'Der Regen im November ist kalt.',
            romanian: 'Ploaia din noiembrie este rece.',
            breakdown: 'der Regen (fenomen meteo) + der November (lună) -> ambele masculine'
          }
        ]
      },
      {
        heading: '3. Când folosim DIE (Feminin)? Regula terminațiilor productive',
        body: [
          'Substantivele feminine au unele dintre cele mai predictibile terminații din întreaga limbă germană. Dacă vezi unul dintre aceste sufixe, poți fi aproape 99% sigur că este "die":',
          '• Sufixele -ung, -heit, -keit, -schaft, -ei, -tät, -ion, -ik',
          '• Majoritatea substantivelor formate din 2 silabe care se termină în "-e" (ex: die Katze, die Lampe, die Reise - atenție la câteva excepții precum der Käse, der Name)'
        ],
        table: {
          caption: 'Terminații feminine garantate',
          headers: ['Sufix', 'Exemplu german', 'Traducere în română'],
          rows: [
            ['-ung', 'die Wohnung / die Übung', 'locuința / exercițiul'],
            ['-heit', 'die Gesundheit / die Freiheit', 'sănătatea / libertatea'],
            ['-keit', 'die Möglichkeit / die Höflichkeit', 'posibilitatea / politețea'],
            ['-schaft', 'die Freundschaft / die Mannschaft', 'prietenia / echipa'],
            ['-tät', 'die Universität / die Realität', 'universitatea / realitatea'],
            ['-ion', 'die Information / die Station', 'informația / stația']
          ]
        },
        tip: 'Reține acronimul memotehnic U-H-K-S-E-T-I (ung, heit, keit, schaft, ei, tät, ion) - toate sunt feminine!'
      },
      {
        heading: '4. Când folosim DAS (Neutru)? Diminutive și abstracțiuni',
        body: [
          'Substantivul neutru "das" este folosit pentru diminutive, substantive formate direct din verbe la infinitiv și cuvinte cu origini specifice:',
          '• Diminutivele în -chen și -lein: transformă orice cuvânt în neutru! das Brötchen (chifla), das Mädchen (fata)',
          '• Verbe folosite ca substantive (substantivarea infinitivului): das Essen (mâncarea), das Lernen (învățatul), das Leben (viața)',
          '• Sufixe specifice: -ment, -um, -tum, -ma (das Instrument, das Zentrum, das Datum, das Thema)'
        ],
        examples: [
          {
            german: 'Das Essen im Restaurant war ausgezeichnet.',
            romanian: 'Mâncarea la restaurant a fost excelentă.',
            breakdown: 'das Essen provine din verbul essen (a mânca)'
          },
          {
            german: 'Das Thema der heutigen Lektion ist wichtig.',
            romanian: 'Tema lecției de astăzi este importantă.',
            breakdown: 'das Thema are origini grecești și se termină în -ma'
          }
        ]
      },
      {
        heading: '5. Regula salvatoare: Cuvintele compuse (Komposita)',
        body: [
          'Germana este renumită pentru cuvintele lungi compuse. Regula de aur este extrem de simplă:',
          'Genul oricărui cuvânt compus este ÎNTOTDEAUNA dat de ultimul substantiv din compunere!',
          'Exemple: das Haus (casa) + die Tür (ușa) = die Haustür (ușa casei - feminin, pentru că Tür e feminin).',
          'der Schreibtisch (biroul) = das Schreiben (scrisul) + der Tisch (masa - masculin).'
        ],
        examples: [
          {
            german: 'Ich habe die Haustür geschlossen.',
            romanian: 'Am închis ușa de la intrare.',
            breakdown: 'die Haustür = das Haus + DIE Tür'
          },
          {
            german: 'Das Wörterbuch liegt auf dem Tisch.',
            romanian: 'Dicționarul se află pe masă.',
            breakdown: 'das Wörterbuch = die Wörter + DAS Buch'
          }
        ]
      }
    ]
  },
  {
    id: 'ordinea-cuvintelor-propozitie-v2',
    slug: 'ordinea-cuvintelor-in-germana-regula-v2-tekamolo',
    title: 'Ordinea Cuvintelor în Propoziție: Regula de Aur V2 și formula TeKaMoLo',
    subtitle: 'Cum să așezi corect verbul și complementele în limba germană fără să mai traduci mecanic din română.',
    level: 'A1',
    category: 'Gramatică',
    readTime: '6 min de citit',
    publishedDate: '18 Martie 2026',
    heroImage: '/src/assets/images/article_sentence_structure_1790679010782.jpg',
    excerpt: 'Cea mai mare capcană pentru români este să transpună topica limbii române în germană. Germana are reguli de fier: verbul conjugat pe poziția 2 în propoziția principală și la sfârșit în cea secundară.',
    keyTakeaway: 'În orice propoziție enunțiativă principală (Hauptsatz), verbul conjugat stă OBLIGATORIU pe Poziția 2.',
    sections: [
      {
        heading: '1. Regula de Fier a Verbului pe Poziția a Doua (V2)',
        body: [
          'În limba română poți spune: "Astăzi eu merg la magazin" sau "Astăzi merg eu la magazin" sau "Merg la magazin astăzi". Topica este foarte flexibilă.',
          'În germană există o lege absolută: într-o propoziție afirmativă normală, VERBUL CONJUGAT ocupă întotdeauna POZIȚIA A DOUA.',
          'Atenție! "Poziția 1" nu înseamnă primul cuvânt, ci PRIMUL ELEMENT sintactic (care poate fi un grup de cuvinte, cum ar fi o expresie de timp: "Jeden Tag" = Poziția 1).'
        ],
        examples: [
          {
            german: 'Ich trinke jeden Morgen einen Kaffee.',
            romanian: 'Eu beau în fiecare dimineață o cafea.',
            breakdown: 'Poz 1: Ich (Subiect) | Poz 2: trinke (Verb) | Poz 3: jeden Morgen'
          },
          {
            german: 'Jeden Morgen trinke ich einen Kaffee.',
            romanian: 'În fiecare dimineață beau eu o cafea.',
            breakdown: 'Poz 1: Jeden Morgen (Timp) | Poz 2: trinke (Verb) | Poz 3: ich (Subiect - Inversiune!)'
          }
        ],
        warning: 'Dacă începi propoziția cu timpul sau locul, verbul TREBUIE să rămână pe poziția 2, iar subiectul sare imediat pe poziția 3!'
      },
      {
        heading: '2. Cleștele Verbal (Die Satzklammer)',
        body: [
          'Ce se întâmplă când avem două verbe (un verb modal + infinitiv, sau la timpul trecut Perfekt: auxiliar + participiu)?',
          'Germana folosește conceptul de „clește verbal”: primul verb (cel conjugat) stă pe poziția 2, iar al doilea verb (la infinitiv sau participiu trecut) se duce la SFÂRȘITUL ABSOLUT al propoziției!'
        ],
        examples: [
          {
            german: 'Ich kann morgen leider nicht kommen.',
            romanian: 'Din păcate, mâine nu pot veni.',
            breakdown: 'kann (pe poz 2) ... kommen (la finalul propoziției)'
          },
          {
            german: 'Wir haben gestern einen spannenden Film gesehen.',
            romanian: 'Ieri am văzut un film captivant.',
            breakdown: 'haben (pe poz 2) ... gesehen (Partizip II la final)'
          }
        ]
      },
      {
        heading: '3. Formula Secretă TeKaMoLo pentru Complemente',
        body: [
          'Când ai mai multe detalii într-o propoziție (când, de ce, cum, unde), germanii folosesc o succesiune logică numită Te-Ka-Mo-Lo:',
          '1. Te (Temporal) - Când? (gestern, heute, um 18 Uhr)',
          '2. Ka (Kausal) - Din ce cauză? (wegen des Regens, aus Liebe)',
          '3. Mo (Modal) - Cum? Cu ce? (mit dem Auto, schnell, gerne)',
          '4. Lo (Lokal) - Unde? Încotro? (nach Berlin, im Büro, zu Hause)'
        ],
        examples: [
          {
            german: 'Ich fahre morgen (Te) mit dem Zug (Mo) nach Wien (Lo).',
            romanian: 'Merg mâine cu trenul la Viena.',
            breakdown: 'morgen (Timp) -> mit dem Zug (Mod) -> nach Wien (Loc)'
          },
          {
            german: 'Er arbeitet heute (Te) wegen der Prüfung (Ka) sehr fleißig (Mo) in der Bibliothek (Lo).',
            romanian: 'El lucrează astăzi din cauza examenului foarte sârguincios în bibliotecă.',
            breakdown: 'Succesiune completă Te-Ka-Mo-Lo aplicată perfect'
          }
        ],
        tip: 'Dacă ții minte TeKaMoLo, propozițiile tale vor suna instantaneu natural și nativ!'
      },
      {
        heading: '4. Propoziția Secundară (Nebensatz): Verbul zboară la sfârșit',
        body: [
          'După conjuncții subordonatoare precum weil (pentru că), dass (că), wenn (dacă/când), ob (dacă întrebare indirectă), obwohl (deși):',
          'Verbul conjugat se mută pe ULTIMUL LOC din propoziție!'
        ],
        examples: [
          {
            german: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.',
            romanian: 'Învăț germană pentru că aș vrea să lucrez în Germania.',
            breakdown: 'după "weil", verbul auxiliar "möchte" ajunge pe ultimul loc'
          },
          {
            german: 'Er weiß, dass du heute keine Zeit hast.',
            romanian: 'El știe că tu nu ai timp astăzi.',
            breakdown: 'după "dass", verbul "hast" stă la sfârșit'
          }
        ]
      }
    ]
  },
  {
    id: 'cele-patru-cazuri-germane',
    slug: 'cele-patru-cazuri-nominativ-acuzativ-dativ-genitiv',
    title: 'Cele 4 Cazuri Germane Explicație Completă: Nominativ, Acuzativ, Dativ și Genitiv',
    subtitle: 'Ghid vizual cu tabele de declinare, întrebările de control și trucul Wechselpräpositionen (Wo vs. Wohin).',
    level: 'A2',
    category: 'Gramatică',
    readTime: '9 min de citit',
    publishedDate: '21 Martie 2026',
    heroImage: '/src/assets/images/hero_german_learning_1790678984997.jpg',
    excerpt: 'Declinarea articolelor este adesea cel mai mare obstacol pentru studenți. Descoperă tabelul esențial, cum se schimbă articolele și cum funcționează prepozițiile cu dublu regim.',
    keyTakeaway: 'Singurul articol care se schimbă la Acuzativ față de Nominativ este masculinul: der devine den, ein devine einen.',
    sections: [
      {
        heading: '1. La ce întrebare răspunde fiecare caz?',
        body: [
          'Înainte de a învăța tabelele pe de rost, trebuie să înțelegi rolul sintactic al fiecărui caz:',
          '• Nominativ (Cine? Ce? - Wer? Was?): Subiectul care face acțiunea.',
          '• Acuzativ (Pe cine? Ce? Încotro? - Wen? Was? Wohin?): Complementul direct sau mișcare spre o țintă.',
          '• Dativ (Cui? Unde? - Wem? Wo?): Complementul indirect sau starea de repaus/localizarea.',
          '• Genitiv (Al/A/Ai/Ale cui? - Wessen?): Posesia sau apartenența.'
        ],
        table: {
          caption: 'Tabelul Declinării Articolelor Hotărâte',
          headers: ['Caz', 'Masculin', 'Feminin', 'Neutru', 'Plural'],
          rows: [
            ['Nominativ', 'der', 'die', 'das', 'die'],
            ['Acuzativ', 'den', 'die', 'das', 'die'],
            ['Dativ', 'dem', 'der', 'dem', 'den (+n)'],
            ['Genitiv', 'des (+s)', 'der', 'des (+s)', 'der']
          ]
        },
        tip: 'La Acuzativ, reține regula "Numai Băiatul Schimbă": doar masculinul der se transformă în DEN (ein -> einen). Femininul, neutru și pluralul rămân neschimbate!'
      },
      {
        heading: '2. Prepoziții cu Acuzativ Fix (DOGFU)',
        body: [
          'Anumite prepoziții cer ÎNTOTDEAUNA cazul Acuzativ, indiferent de context. Un acronim excelent este DOGFU:',
          '• D - durch (prin)',
          '• O - ohne (fără)',
          '• G - gegen (împotriva, spre)',
          '• F - für (pentru)',
          '• U - um (în jurul, la o oră)'
        ],
        examples: [
          {
            german: 'Das Geschenk ist für meinen Bruder.',
            romanian: 'Cadoul este pentru fratele meu.',
            breakdown: 'für + Acuzativ masculin -> meinen Bruder'
          },
          {
            german: 'Ohne einen Regenschirm gehe ich nicht raus.',
            romanian: 'Fără o umbrelă nu ies afară.',
            breakdown: 'ohne + Acuzativ masculin -> einen Regenschirm'
          }
        ]
      },
      {
        heading: '3. Prepoziții cu Dativ Fix',
        body: [
          'Aceste prepoziții cer ÎNTOTDEAUNA Dativul: aus, bei, mit, nach, seit, von, zu (și gegenüber).',
          'Sfat auditiv: învață-le ca pe o mică poezie ritmică: „aus - bei - mit - nach - seit - von - zu”.'
        ],
        examples: [
          {
            german: 'Ich fahre mit dem Bus zur Arbeit.',
            romanian: 'Merg cu autobuzul la serviciu.',
            breakdown: 'mit + Dativ masculin (dem Bus); zu + Dativ feminin der Arbeit -> zur'
          },
          {
            german: 'Ich wohne seit einem Jahr in Berlin.',
            romanian: 'Locuiesc de un an în Berlin.',
            breakdown: 'seit + Dativ neutru das Jahr -> einem Jahr'
          }
        ]
      },
      {
        heading: '4. Prepozițiile cu dublu regim (Wechselpräpositionen)',
        body: [
          'Cele 9 prepoziții magice sunt: an, auf, hinter, in, neben, über, unter, vor, zwischen.',
          'Regula este vizuală și simplă:',
          '• WO? (Unde? Repaus, nicio schimbare de spațiu) -> Cazul DATIV',
          '• WOHIN? (Încotro? Mișcare, trecere dintr-un loc în altul) -> Cazul ACUZATIV'
        ],
        examples: [
          {
            german: 'Das Buch liegt auf dem Tisch (Wo? -> Dativ).',
            romanian: 'Cartea stă pe masă (stare de repaus).',
            breakdown: 'auf + dem Tisch (Dativ)'
          },
          {
            german: 'Ich lege das Buch auf den Tisch (Wohin? -> Akkusativ).',
            romanian: 'Eu așez cartea pe masă (acțiune de plasare).',
            breakdown: 'auf + den Tisch (Acuzativ)'
          }
        ]
      }
    ]
  },
  {
    id: 'verbele-modale-in-germana',
    slug: 'verbele-modale-können-müssen-dürfen-wollen-sollen-mögen',
    title: 'Verbele Modale în Germană: Cum exprimi abilități, obligații și permisiuni',
    subtitle: 'Conjugarea completă, nuanțele subtile dintre müssen și sollen, plus poziționarea infinitivului.',
    level: 'A2',
    category: 'Gramatică',
    readTime: '6 min de citit',
    publishedDate: '24 Martie 2026',
    heroImage: '/src/assets/images/article_der_die_das_1790678997670.jpg',
    excerpt: 'Cele 6 verbe modale (können, müssen, wollen, dürfen, sollen, mögen) sunt indispensabile conversației zilnice. Iată cum se conjugă și diferențele cruciale dintre ele.',
    keyTakeaway: 'La toate verbele modale, formele pentru "ich" și "er/sie/es" sunt IDENTICE și NU au terminația -t sau -e (ich kann, er kann).',
    sections: [
      {
        heading: '1. Tabloul general al verbelor modale',
        body: [
          'Verbele modale modifică sensul unui alt verb din propoziție:',
          '• können = a putea, a avea abilitatea fizică sau permisiunea generală',
          '• müssen = a trebui neapărat (necesitate absolută, fără alternativă)',
          '• dürfen = a avea voie, a fi permis prin lege sau regulament',
          '• wollen = a vrea cu hotărâre, intenție fermă',
          '• sollen = a trebui ca urmare a unui sfat sau ordin primit de la altcineva',
          '• möchten (forma de conjunctiv a lui mögen) = a dori politicos'
        ],
        examples: [
          {
            german: 'Hier darf man nicht rauchen.',
            romanian: 'Aici nu este permis fumatul.',
            breakdown: 'dürfen exprimă interdicție oficială'
          },
          {
            german: 'Ich muss heute zum Arzt gehen.',
            romanian: 'Trebuie să merg astăzi la medic.',
            breakdown: 'müssen exprimă o obligație stringentă'
          }
        ]
      },
      {
        heading: '2. Particularități de conjugare la prezent',
        body: [
          'La singular (ich, du, er/sie/es), vocala din rădăcină își schimbă sunetul (își pierde Umlaut-ul sau se schimbă complet):',
          '• können -> ich kann, du kannst, er kann (la plural revine la bază: wir können, ihr könnt, sie können)',
          '• müssen -> ich muss, du musst, er muss (wir müssen, ihr müsst, sie müssen)',
          '• dürfen -> ich darf, du darfst, er darf (wir dürfen, ihr dürft, sie dürfen)',
          '• wissen (se conjugă ca un modal) -> ich weiß, du weißt, er weiß'
        ],
        tip: 'Reține regula singularului fără terminație la persoana a 3-a: "Er muss", NICIODATĂ "Er musst" sau "Er müsst"!'
      }
    ]
  },
  {
    id: 'trecutul-in-germana-perfekt-vs-prateritum',
    slug: 'trecutul-in-germana-perfekt-vs-prateritum-haben-sein',
    title: 'Trecutul în Germană: Când folosim Perfekt și când Präteritum? (Haben vs. Sein)',
    subtitle: 'Secretul verbelor de mișcare și schimbare de stare, formarea participiului trecut și verbele uzuale.',
    level: 'A2',
    category: 'Gramatică',
    readTime: '8 min de citit',
    publishedDate: '26 Martie 2026',
    heroImage: '/src/assets/images/article_sentence_structure_1790679010782.jpg',
    excerpt: 'În vorbirea de zi cu zi, germanii folosesc timpul Perfekt pentru aproape orice acțiune trecută. Află cum alegi corect între "haben" și "sein" și cum formezi Partizip II.',
    keyTakeaway: 'Folosești SEIN doar cu verbe intranzitive care exprimă: 1. Mișcare dintr-un punct A într-un punct B (gehen, fahren, fliegen) sau 2. Schimbare de stare (aufstehen, einschlafen, sterben), plus sein, bleiben, werden.',
    sections: [
      {
        heading: '1. Perfekt în conversație vs. Präteritum în scris',
        body: [
          'Marea veste bună pentru cei care învață germana este că în conversația uzuală vei folosi în 90% din cazuri timpul PERFEKT.',
          'Präteritum (trecutul simplu) este folosit în vorbire doar pentru o mână de verbe foarte frecvente: sein (war), haben (hatte) și verbele modale (konnte, musste, wollte). Restul sunt rezervate ziarelor, cărților și relatărilor formale.'
        ],
        examples: [
          {
            german: 'Gestern habe ich meine Freunde getroffen.',
            romanian: 'Ieri m-am întâlnit cu prietenii mei (Conversație -> Perfekt).',
            breakdown: 'haben + Partizip II (getroffen)'
          },
          {
            german: 'Ich war gestern sehr müde.',
            romanian: 'Ieri am fost foarte obosit (Präteritum al lui sein -> war).',
            breakdown: 'folosirea lui "war" este mult mai naturală decât "ich bin gewesen"'
          }
        ]
      },
      {
        heading: '2. Când folosim auxiliarul SEIN?',
        body: [
          'Formula timpului Perfekt este: [haben sau sein la prezent] + [Partizip II la sfârșit].',
          'Când alegi SEIN?',
          '1. Verbe de deplasare / locomoție: gehen (a merge pe jos), fahren (a călători cu vehicul), fliegen (a zbura), laufen (a alerga), schwimmen (a înota).',
          '2. Verbe de transformare / schimbare de stare: einschlafen (a adormi), aufwachen (a se trezi), wachsen (a crește).',
          '3. Verbele speciale de stare fără deplasare: sein (a fi -> ist gewesen), bleiben (a rămâne -> ist geblieben), werden (a deveni -> ist geworden).'
        ],
        examples: [
          {
            german: 'Wir sind gestern nach München gefahren.',
            romanian: 'Noi am călătorit ieri la München.',
            breakdown: 'fahren implică deplasare A -> B, deci cere SEIN'
          },
          {
            german: 'Er ist heute sehr spät aufgewacht.',
            romanian: 'El s-a trezit astăzi foarte târziu.',
            breakdown: 'aufwachen implică schimbare de stare (somn -> veghe)'
          }
        ]
      }
    ]
  },
  {
    id: 'greseli-frecvente-vorbitori-romana',
    slug: 'greseli-frecvente-ale-romanilor-care-invata-germana',
    title: '10 Greșeli Clasice pe care le fac Românii când învață Germană',
    subtitle: '„Prieteni falși”, capcanele pronunției ch/sch și traducerea cuvânt cu cuvânt a expresiilor.',
    level: 'A1',
    category: 'Ghid de Învățare',
    readTime: '5 min de citit',
    publishedDate: '28 Martie 2026',
    heroImage: '/src/assets/images/hero_german_learning_1790678984997.jpg',
    excerpt: 'De la confundarea cuvântului „Gift” (care înseamnă otravă, nu cadou!) până la uitarea subiectului impersonal „es”, iată capcanele prin care am trecut cu toții.',
    keyTakeaway: 'Nu traduce niciodată expresii din română cuvânt cu cuvânt. Memorează structurile germane fixe ca blocuri întregi de vocabular.',
    sections: [
      {
        heading: '1. Prieteni falși notorii (Falsche Freunde)',
        body: [
          '• das Gift NU înseamnă cadou! Înseamnă otravă. Pentru cadou se folosește das Geschenk.',
          '• bekommen NU înseamnă a deveni! Înseamnă a primi (ex: Ich bekomme einen Brief). A deveni se traduce prin werden.',
          '• brav NU înseamnă curajos! Înseamnă cuminte, ascultător (ex: Das Kind ist brav). Curajos este mutig.',
          '• die Dose NU este doza de medicament, ci doza de băutură din aluminiu sau o cutie metalică.'
        ],
        examples: [
          {
            german: 'Ich habe gestern ein schönes Geschenk bekommen.',
            romanian: 'Ieri am primit un cadou frumos.',
            breakdown: 'bekommen = a primi | das Geschenk = cadoul'
          }
        ]
      },
      {
        heading: '2. Omisiunea subiectului: „Es regnet” vs „Plouă”',
        body: [
          'În limba română putem omite subiectul: spunem simplu „Plouă”, „Este cald”, „E important”.',
          'În germană, o propoziție FĂRĂ subiect este o eroare gravă. Când nu există un agent concret, germana folosește pronumele impersonal ES:',
          '• Es regnet (Plouă)',
          '• Es ist kalt (Este frig)',
          '• Es gibt viele Museen in Berlin (Există multe muzee în Berlin)'
        ],
        examples: [
          {
            german: 'Es ist heute sehr windig.',
            romanian: 'Astăzi este foarte mult vânt.',
            breakdown: 'obligatoriu cu subiectul impersonal "Es"'
          }
        ]
      },
      {
        heading: '3. Diferența de pronunție dintre „ich-Laut” și „ach-Laut”',
        body: [
          'Grupul de litere „ch” are două sunete complet distincte în germană:',
          '1. După vocalele a, o, u, au: se pronunță gutural ca în românescul „h” adânc (ach-Laut): Bach, Buch, kochen.',
          '2. După e, i, ä, ö, ü, eu, ei și după consoane: se pronunță moale, un fâșâit pe cerul gurii (ich-Laut): ich, nicht, sprechen, Mädchen.'
        ],
        tip: 'Pronunță „ich” fără să spui „iș” sau „ik”. Pune vârful limbii în spatele dinților de jos și suflă aer ușor pe cerul gurii.'
      }
    ]
  }
];
