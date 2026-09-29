export type CefrLevel = 'A1' | 'A2' | 'B1' | 'Toate';

export type ArticleGender = 'der' | 'die' | 'das' | '';

export interface ExampleSentence {
  german: string;
  romanian: string;
  breakdown?: string;
}

export interface ArticleContentSection {
  heading: string;
  subheading?: string;
  body: string[];
  examples?: ExampleSentence[];
  tip?: string;
  warning?: string;
  table?: {
    caption?: string;
    headers: string[];
    rows: string[][];
  };
}

export interface PronunciationExercise {
  id: string;
  german: string;
  romanian: string;
  phonetic?: string;
  focusPoint: string;
  tip?: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  level: 'A1' | 'A2' | 'B1';
  category: 'Gramatică' | 'Vocabular' | 'Ghid de Învățare' | 'Pronunție' | 'Exemple Practice';
  readTime: string;
  publishedDate: string;
  heroImage: string;
  excerpt: string;
  keyTakeaway: string;
  sections: ArticleContentSection[];
  pronunciationItems?: PronunciationExercise[];
}

export interface VocabularyWord {
  id: string;
  german: string;
  article: ArticleGender;
  plural?: string;
  romanian: string;
  phonetic?: string;
  category: string;
  level: 'A1' | 'A2' | 'B1';
  exampleGerman: string;
  exampleRomanian: string;
  memoryTip?: string;
}

export interface GrammarRule {
  title: string;
  explanation: string;
  formula?: string;
  table?: {
    caption?: string;
    headers: string[];
    rows: string[][];
  };
  examples: ExampleSentence[];
  tip?: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  germanTitle: string;
  level: 'A1' | 'A2' | 'B1';
  summary: string;
  rules: GrammarRule[];
}

export interface QuizQuestion {
  id: string;
  type: 'article' | 'sentence' | 'case' | 'translation';
  prompt: string;
  hint?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  level: 'A1' | 'A2' | 'B1';
  words?: string[]; // For sentence builder
}
