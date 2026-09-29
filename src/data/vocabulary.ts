import { VocabularyWord } from '../types';

export const VOCABULARY_CATEGORIES = [
  'Toate',
  'Saluturi & Politețe',
  'Restaurant & Mâncare',
  'Călătorii & Oraș',
  'Muncă & Birou',
  'Sănătate & Medic',
  'Casă & Familie',
  'Expresii Idiomatice'
] as const;

export const VOCABULARY_LIST: VocabularyWord[] = [
  // 1. Saluturi & Politețe
  {
    id: 'v1',
    german: 'Guten Morgen',
    article: '',
    romanian: 'Bună dimineața',
    phonetic: 'gu-tən mor-gən',
    category: 'Saluturi & Politețe',
    level: 'A1',
    exampleGerman: 'Guten Morgen, wie geht es Ihnen heute?',
    exampleRomanian: 'Bună dimineața, ce mai faceți astăzi?',
    memoryTip: 'Folosit de dimineață până pe la ora 11:00.'
  },
  {
    id: 'v2',
    german: 'Entschuldigung',
    article: 'die',
    plural: 'die Entschuldigungen',
    romanian: 'Scuze / Iertare / Pardon',
    phonetic: 'ɛnt-ʃʊl-dɪ-gʊŋ',
    category: 'Saluturi & Politețe',
    level: 'A1',
    exampleGerman: 'Entschuldigung, können Sie mir bitte helfen?',
    exampleRomanian: 'Scuzați-mă, mă puteți ajuta vă rog?',
    memoryTip: 'Sufixul -ung este întotdeauna feminin (die).'
  },
  {
    id: 'v3',
    german: 'Auf Wiedersehen',
    article: 'das',
    romanian: 'La revedere (formal)',
    phonetic: 'aʊf viː-dɐ-zeː-ən',
    category: 'Saluturi & Politețe',
    level: 'A1',
    exampleGerman: 'Vielen Dank für Ihre Hilfe und auf Wiedersehen!',
    exampleRomanian: 'Vă mulțumesc mult pentru ajutor și la revedere!',
    memoryTip: 'Literal: "până la re-vedere". La telefon se spune "Auf Wiederhören".'
  },
  {
    id: 'v4',
    german: 'Bitte schön',
    article: '',
    romanian: 'Cu plăcere / Poftim',
    phonetic: 'bɪ-tə ʃøːn',
    category: 'Saluturi & Politețe',
    level: 'A1',
    exampleGerman: 'Danke für den Kaffee! — Bitte schön!',
    exampleRomanian: 'Mulțumesc pentru cafea! — Cu plăcere!'
  },
  {
    id: 'v5',
    german: 'Schönen Tag noch',
    article: '',
    romanian: 'O zi frumoasă în continuare',
    phonetic: 'ʃøː-nən taːk nɔx',
    category: 'Saluturi & Politețe',
    level: 'A1',
    exampleGerman: 'Auf Wiedersehen und einen schönen Tag noch!',
    exampleRomanian: 'La revedere și o zi frumoasă în continuare!',
    memoryTip: 'Formulă uzuală la finalul cumpărăturilor în orice magazin din Germania.'
  },

  // 2. Restaurant & Mâncare
  {
    id: 'v6',
    german: 'Kaffee',
    article: 'der',
    plural: 'die Kaffees',
    romanian: 'cafeaua',
    phonetic: 'ka-feː',
    category: 'Restaurant & Mâncare',
    level: 'A1',
    exampleGerman: 'Ich möchte bitte einen schwarzen Kaffee mit Zucker.',
    exampleRomanian: 'Aș dori vă rog o cafea neagră cu zahăr.',
    memoryTip: 'Masculin (der Kaffee). În acuzativ devine "einen Kaffee".'
  },
  {
    id: 'v7',
    german: 'Rechnung',
    article: 'die',
    plural: 'die Rechnungen',
    romanian: 'nota de plată / factura',
    phonetic: 'rɛç-nʊŋ',
    category: 'Restaurant & Mâncare',
    level: 'A1',
    exampleGerman: 'Können wir bitte die Rechnung haben? Wir möchten zahlen.',
    exampleRomanian: 'Putem primi nota de plată vă rog? Dorim să plătim.',
    memoryTip: 'Sufixul -ung arată clar că e feminin (die).'
  },
  {
    id: 'v8',
    german: 'Brötchen',
    article: 'das',
    plural: 'die Brötchen',
    romanian: 'chifla / franzeluța',
    phonetic: 'bʁøːt-çən',
    category: 'Restaurant & Mâncare',
    level: 'A1',
    exampleGerman: 'Zum Frühstück esse ich zwei frische Brötchen mit Käse.',
    exampleRomanian: 'La micul dejun mănânc două chifle proaspete cu brânză.',
    memoryTip: 'Diminutiv în -chen -> întotdeauna neutru (das)!'
  },
  {
    id: 'v9',
    german: 'Speisekarte',
    article: 'die',
    plural: 'die Speisekarten',
    romanian: 'meniul (la restaurant)',
    phonetic: 'ʃpaɪ-zə-kar-tə',
    category: 'Restaurant & Mâncare',
    level: 'A1',
    exampleGerman: 'Bringen Sie uns bitte die Speisekarte.',
    exampleRomanian: 'Aduceți-ne vă rog meniul.',
    memoryTip: 'Cuvânt compus: die Speise + die Karte = die Speisekarte.'
  },
  {
    id: 'v10',
    german: 'Trinkgeld',
    article: 'das',
    plural: 'die Trinkgelder',
    romanian: 'bacșișul',
    phonetic: 'tʁɪŋk-ɡɛlt',
    category: 'Restaurant & Mâncare',
    level: 'A2',
    exampleGerman: 'In Deutschland gibt man meistens etwa 10 Prozent Trinkgeld.',
    exampleRomanian: 'În Germania se lasă de obicei circa 10 la sută bacșiș.',
    memoryTip: 'Literal: "banii de băut" (trinken + das Geld = das Trinkgeld).'
  },
  {
    id: 'v11',
    german: 'lecker',
    article: '',
    romanian: 'gustos / delicios',
    phonetic: 'lɛ-kɐ',
    category: 'Restaurant & Mâncare',
    level: 'A1',
    exampleGerman: 'Das Essen war wirklich sehr lecker, danke!',
    exampleRomanian: 'Mâncarea a fost într-adevăr foarte gustoasă, mulțumesc!'
  },

  // 3. Călătorii & Oraș
  {
    id: 'v12',
    german: 'Bahnhof',
    article: 'der',
    plural: 'die Bahnhöfe',
    romanian: 'gara feroviară',
    phonetic: 'baːn-hoːf',
    category: 'Călătorii & Oraș',
    level: 'A1',
    exampleGerman: 'Wie komme ich am schnellsten zum Hauptbahnhof?',
    exampleRomanian: 'Cum ajung cel mai repede la gara centrală?',
    memoryTip: 'die Bahn (calea ferată) + der Hof (curtea) = der Bahnhof.'
  },
  {
    id: 'v13',
    german: 'Fahrkarte',
    article: 'die',
    plural: 'die Fahrkarten',
    romanian: 'biletul de călătorie',
    phonetic: 'faːɐ̯-kar-tə',
    category: 'Călătorii & Oraș',
    level: 'A1',
    exampleGerman: 'Haben Sie schon eine Fahrkarte für den ICE gekauft?',
    exampleRomanian: 'Ați cumpărat deja un bilet pentru trenul ICE?',
    memoryTip: 'Se mai folosește și termenul "das Ticket".'
  },
  {
    id: 'v14',
    german: 'Gleis',
    article: 'das',
    plural: 'die Gleise',
    romanian: 'linia de cale ferată / peronul',
    phonetic: 'ɡlaɪs',
    category: 'Călătorii & Oraș',
    level: 'A1',
    exampleGerman: 'Der Zug nach Frankfurt fährt heute von Gleis 4 ab.',
    exampleRomanian: 'Trenul spre Frankfurt pleacă astăzi de la linia 4.'
  },
  {
    id: 'v15',
    german: 'Verspätung',
    article: 'die',
    plural: 'die Verspätungen',
    romanian: 'întârzierea',
    phonetic: 'fɛɐ̯-ʃpɛː-tʊŋ',
    category: 'Călătorii & Oraș',
    level: 'A2',
    exampleGerman: 'Der Zug hat leider 20 Minuten Verspätung.',
    exampleRomanian: 'Din păcate, trenul are o întârziere de 20 de minute.',
    memoryTip: 'Cuvânt indispensabil pentru călătoriile cu trenul în Germania!'
  },
  {
    id: 'v16',
    german: 'Ampel',
    article: 'die',
    plural: 'die Ampeln',
    romanian: 'semaforul',
    phonetic: 'am-pəl',
    category: 'Călătorii & Oraș',
    level: 'A1',
    exampleGerman: 'Biegen Sie an der nächsten Ampel nach links ab.',
    exampleRomanian: 'Virați la stânga la următorul semafor.'
  },

  // 4. Muncă & Birou
  {
    id: 'v17',
    german: 'Vorstellungsgespräch',
    article: 'das',
    plural: 'die Vorstellungsgespräche',
    romanian: 'interviul de angajare',
    phonetic: 'foːɐ̯-ʃtɛ-lʊŋs-ɡə-ʃpʁɛː-çə',
    category: 'Muncă & Birou',
    level: 'B1',
    exampleGerman: 'Morgen habe ich ein wichtiges Vorstellungsgespräch bei Siemens.',
    exampleRomanian: 'Mâine am un interviu de angajare important la Siemens.',
    memoryTip: 'das Gespräch (discuția) dictează genul neutru.'
  },
  {
    id: 'v18',
    german: 'Lebenslauf',
    article: 'der',
    plural: 'die Lebensläufe',
    romanian: 'CV-ul / istoricul profesional',
    phonetic: 'leː-bəns-laʊf',
    category: 'Muncă & Birou',
    level: 'A2',
    exampleGerman: 'Ich habe meinen Lebenslauf und das Anschreiben per E-Mail gesendet.',
    exampleRomanian: 'Am trimis CV-ul și scrisoarea de intenție prin e-mail.',
    memoryTip: 'Literal: "cursul vieții" (das Leben + der Lauf).'
  },
  {
    id: 'v19',
    german: 'Besprechung',
    article: 'die',
    plural: 'die Besprechungen',
    romanian: 'ședința / întâlnirea de lucru',
    phonetic: 'bə-ʃpʁɛ-çʊŋ',
    category: 'Muncă & Birou',
    level: 'A2',
    exampleGerman: 'Die wöchentliche Besprechung beginnt um 10 Uhr im Konferenzraum.',
    exampleRomanian: 'Ședința săptămânală începe la ora 10 în sala de conferințe.'
  },
  {
    id: 'v20',
    german: 'Feierabend',
    article: 'der',
    plural: 'die Feierabende',
    romanian: 'sfârșitul programului de lucru / timpul liber după muncă',
    phonetic: 'faɪ-ɐ-aː-bənt',
    category: 'Muncă & Birou',
    level: 'A2',
    exampleGerman: 'Endlich 17 Uhr! Schönen Feierabend allerseits!',
    exampleRomanian: 'În sfârșit ora 17! Vă doresc o seară plăcută după muncă tuturor!',
    memoryTip: 'Concept cultural german pur: momentul sacru când termini munca pe ziua respectivă.'
  },
  {
    id: 'v21',
    german: 'Gehalt',
    article: 'das',
    plural: 'die Gehälter',
    romanian: 'salariul (lunar)',
    phonetic: 'ɡə-halt',
    category: 'Muncă & Birou',
    level: 'A2',
    exampleGerman: 'Das Gehalt wird immer am Ende des Monats überwiesen.',
    exampleRomanian: 'Salariul este virat întotdeauna la sfârșitul lunii.'
  },

  // 5. Sănătate & Medic
  {
    id: 'v22',
    german: 'Kopfschmerzen',
    article: 'die',
    plural: 'die Kopfschmerzen (Plural)',
    romanian: 'durerile de cap',
    phonetic: 'kɔpf-ʃmɛʁ-tsən',
    category: 'Sănătate & Medic',
    level: 'A1',
    exampleGerman: 'Ich habe seit gestern starke Kopfschmerzen und leichtes Fieber.',
    exampleRomanian: 'Am de ieri dureri puternice de cap și febră ușoară.',
    memoryTip: 'der Kopf (capul) + die Schmerzen (durerile).'
  },
  {
    id: 'v23',
    german: 'Termin',
    article: 'der',
    plural: 'die Termine',
    romanian: 'programarea / întâlnirea stabilită',
    phonetic: 'tɛɐ̯-miːn',
    category: 'Sănătate & Medic',
    level: 'A1',
    exampleGerman: 'Ich möchte bitte einen Termin beim Zahnarzt vereinbaren.',
    exampleRomanian: 'Aș dori vă rog să stabilesc o programare la dentist.',
    memoryTip: 'Unul dintre cele mai folosite cuvinte în viața cotidiană din Germania!'
  },
  {
    id: 'v24',
    german: 'Apotheke',
    article: 'die',
    plural: 'die Apotheken',
    romanian: 'farmacia',
    phonetic: 'a-po-teː-kə',
    category: 'Sănătate & Medic',
    level: 'A1',
    exampleGerman: 'Wo befindet sich die nächste Notfall-Apotheke?',
    exampleRomanian: 'Unde se află cea mai apropiată farmacie de gardă?'
  },
  {
    id: 'v25',
    german: 'Rezept',
    article: 'das',
    plural: 'die Rezepte',
    romanian: 'rețeta medicală (sau culinară)',
    phonetic: 'ʁe-tsɛpt',
    category: 'Sănătate & Medic',
    level: 'A2',
    exampleGerman: 'Der Arzt hat mir ein Rezept für Antibiotika ausgestellt.',
    exampleRomanian: 'Medicul mi-a eliberat o rețetă pentru antibiotice.'
  },
  {
    id: 'v26',
    german: 'Gute Besserung',
    article: '',
    romanian: 'Însănătoșire grabnică!',
    phonetic: 'gu-tə bɛ-sə-ʁʊŋ',
    category: 'Sănătate & Medic',
    level: 'A1',
    exampleGerman: 'Du bist krank? Ruh dich gut aus und gute Besserung!',
    exampleRomanian: 'Ești bolnav? Odihnește-te bine și însănătoșire grabnică!'
  },

  // 6. Casă & Familie
  {
    id: 'v27',
    german: 'Wohnung',
    article: 'die',
    plural: 'die Wohnungen',
    romanian: 'apartamentul / locuința',
    phonetic: 'voː-nʊŋ',
    category: 'Casă & Familie',
    level: 'A1',
    exampleGerman: 'Wir suchen eine helle Drei-Zimmer-Wohnung im Zentrum.',
    exampleRomanian: 'Căutăm un apartament luminos cu trei camere în centru.'
  },
  {
    id: 'v28',
    german: 'Miete',
    article: 'die',
    plural: 'die Mieten',
    romanian: 'chiria',
    phonetic: 'miː-tə',
    category: 'Casă & Familie',
    level: 'A2',
    exampleGerman: 'Wie hoch ist die Warmmiete inklusive Nebenkosten?',
    exampleRomanian: 'Cât este chiria caldă incluzând cheltuielile de întreținere?',
    memoryTip: 'Warmmiete = chiria cu încălzire și utilități incluse; Kaltmiete = chiria netă fără utilități.'
  },
  {
    id: 'v29',
    german: 'Kühlschrank',
    article: 'der',
    plural: 'die Kühlschränke',
    romanian: 'frigiderul',
    phonetic: 'kyːl-ʃʁaŋk',
    category: 'Casă & Familie',
    level: 'A1',
    exampleGerman: 'Stell die Milch bitte sofort zurück in den Kühlschrank.',
    exampleRomanian: 'Pune te rog laptele imediat înapoi în frigider.',
    memoryTip: 'kühl (răcoros) + der Schrank (dulapul) = dulapul răcoros!'
  },
  {
    id: 'v30',
    german: 'Nachbar',
    article: 'der',
    plural: 'die Nachbarn',
    romanian: 'vecinul',
    phonetic: 'nax-baːɐ̯',
    category: 'Casă & Familie',
    level: 'A1',
    exampleGerman: 'Unsere Nachbarn im zweiten Stock sind sehr freundlich.',
    exampleRomanian: 'Vecinii noștri de la etajul doi sunt foarte prietenoși.'
  },

  // 7. Expresii Idiomatice (Redewendungen)
  {
    id: 'v31',
    german: 'Ich verstehe nur Bahnhof',
    article: '',
    romanian: 'Nu înțeleg absolut nimic / E chineză pentru mine',
    phonetic: 'ɪç fɛɐ̯-ʃteː-ə nuːɐ̯ baːn-hoːf',
    category: 'Expresii Idiomatice',
    level: 'B1',
    exampleGerman: 'Kannst du das langsamer erklären? Ich verstehe nur Bahnhof.',
    exampleRomanian: 'Poți explica mai lent? Nu înțeleg absolut nimic.',
    memoryTip: 'Origine: Soldații din Primul Război Mondial voiau doar să se întoarcă acasă (la gară / Bahnhof).'
  },
  {
    id: 'v32',
    german: 'Die Daumen drücken',
    article: '',
    romanian: 'A ține pumnii / A ura mult succes',
    phonetic: 'diː daʊ-mən dʁʏ-kən',
    category: 'Expresii Idiomatice',
    level: 'A2',
    exampleGerman: 'Ich drücke dir ganz fest die Daumen für deine Deutschprüfung!',
    exampleRomanian: 'Îți țin foarte strâns pumnii pentru examenul tău de germană!',
    memoryTip: 'În germană se apasă pe degetele mari (Daumen), în timp ce în română ținem pumnii.'
  },
  {
    id: 'v33',
    german: 'Das ist mir Wurst',
    article: '',
    romanian: 'Mi-e totuna / Nu-mi pasă deloc',
    phonetic: 'das ɪst miːɐ̯ vʊʁst',
    category: 'Expresii Idiomatice',
    level: 'B1',
    exampleGerman: 'Willst du Pizza oder Pasta essen? — Das ist mir völlig Wurst.',
    exampleRomanian: 'Vrei să mănânci pizza sau paste? — Mi-e complet egal.',
    memoryTip: 'Wurst = cârnat. Expresie colocvială foarte frecventă în Germania!'
  },
  {
    id: 'v34',
    german: 'Zwei Fliegen mit einer Klappe schlagen',
    article: '',
    romanian: 'A împușca doi iepuri dintr-o lovitură',
    phonetic: 'tsvaɪ fliː-gən mɪt aɪ-nɐ kla-pə ʃlaː-gən',
    category: 'Expresii Idiomatice',
    level: 'B1',
    exampleGerman: 'Wenn wir in die Stadt fahren, können wir einkaufen und die Post erledigen: zwei Fliegen mit einer Klappe!',
    exampleRomanian: 'Dacă mergem în oraș, facem cumpărături și trecem și pe la poștă: doi iepuri dintr-o lovitură!'
  }
];
