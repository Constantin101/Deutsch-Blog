/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CefrLevel, BlogArticle } from './types';
import { BLOG_ARTICLES } from './data/articles';
import { VOCABULARY_LIST } from './data/vocabulary';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { VocabularyExplorer } from './components/VocabularyExplorer';
import { GrammarHub } from './components/GrammarHub';
import { InteractivePractice } from './components/InteractivePractice';
import { BookmarksView } from './components/BookmarksView';
import { SearchModal } from './components/SearchModal';
import { DailyProgressWidget } from './components/DailyProgressWidget';
import { NotificationToast } from './components/NotificationToast';
import { Footer } from './components/Footer';
import {
  loadDailyProgress,
  markArticleReadToday,
  markWordSavedToday,
  removeWordSavedToday,
  updateDailyGoals,
  DailyProgressState
} from './utils/dailyProgress';
import {
  loadReminderSettings,
  saveReminderSettings,
  dismissReminderForToday,
  shouldTriggerEveningReminder,
  sendBrowserNotification,
  ReminderSettings
} from './utils/notifications';
import {
  playSaveWordSound,
  playReadArticleSound,
  playGoalAchievedSound
} from './utils/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<'articole' | 'gramatica' | 'vocabular' | 'exercitii' | 'salvate'>('articole');
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel>('Toate');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toate');
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDailyProgressOpen, setIsDailyProgressOpen] = useState(false);

  // Daily activity state backed by localStorage
  const [dailyProgress, setDailyProgress] = useState<DailyProgressState>(() => loadDailyProgress());

  // Evening reminder settings and toast visibility
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>(() => loadReminderSettings());
  const [showEveningToast, setShowEveningToast] = useState(false);

  // Local storage bookmarks for articles & words
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('klardeutsch_articles');
      return saved ? JSON.parse(saved) : ['ghid-der-die-das'];
    } catch {
      return ['ghid-der-die-das'];
    }
  });

  const [savedWordIds, setSavedWordIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('klardeutsch_words');
      return saved ? JSON.parse(saved) : ['v2', 'v6', 'v12', 'v20'];
    } catch {
      return ['v2', 'v6', 'v12', 'v20'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('klardeutsch_articles', JSON.stringify(bookmarkedArticleIds));
    } catch {
      // ignore storage errors
    }
  }, [bookmarkedArticleIds]);

  useEffect(() => {
    try {
      localStorage.setItem('klardeutsch_words', JSON.stringify(savedWordIds));
    } catch {
      // ignore storage errors
    }
  }, [savedWordIds]);

  // Check evening reminder threshold periodically
  useEffect(() => {
    const checkReminder = () => {
      const { shouldShow, missingArticles, missingWords } = shouldTriggerEveningReminder(
        dailyProgress,
        reminderSettings
      );
      if (shouldShow) {
        setShowEveningToast(true);
        if (reminderSettings.webPushEnabled) {
          sendBrowserNotification(
            'KlarDeutsch · Păstrează seria de învățare! 🔥',
            `Mai ai nevoie de ${missingArticles} articole și ${missingWords} cuvinte pentru a-ți atinge obiectivul zilnic!`
          );
        }
      }
    };

    // Check on mount
    checkReminder();

    // Check every 30 seconds
    const interval = setInterval(checkReminder, 30000);
    return () => clearInterval(interval);
  }, [dailyProgress, reminderSettings]);

  const handleToggleBookmarkArticle = (articleId: string) => {
    setBookmarkedArticleIds((prev) => {
      const willBookmark = !prev.includes(articleId);
      if (willBookmark) {
        playSaveWordSound();
      }
      return willBookmark ? [...prev, articleId] : prev.filter((id) => id !== articleId);
    });
  };

  const handleToggleSaveWord = (wordId: string) => {
    setSavedWordIds((prev) => {
      const isAlreadySaved = prev.includes(wordId);
      if (isAlreadySaved) {
        const updated = prev.filter((id) => id !== wordId);
        const newProgress = removeWordSavedToday(wordId);
        setDailyProgress(newProgress);
        return updated;
      } else {
        const updated = [...prev, wordId];
        const newProgress = markWordSavedToday(wordId);
        setDailyProgress(newProgress);

        // Subtle success audio feedback
        playSaveWordSound();

        // Check if this action completes the full daily goal
        const wasAchieved =
          dailyProgress.today.articlesRead.length >= dailyProgress.dailyGoalArticles &&
          dailyProgress.today.wordsSaved.length >= dailyProgress.dailyGoalWords;
        const nowAchieved =
          newProgress.today.articlesRead.length >= newProgress.dailyGoalArticles &&
          newProgress.today.wordsSaved.length >= newProgress.dailyGoalWords;

        if (nowAchieved && !wasAchieved) {
          setTimeout(playGoalAchievedSound, 320);
        }

        return updated;
      }
    });
  };

  const handleMarkArticleRead = useCallback((articleId: string) => {
    setDailyProgress((prev) => {
      const isAlreadyRead = prev.today.articlesRead.includes(articleId);
      const updated = markArticleReadToday(articleId);

      if (!isAlreadyRead) {
        // Subtle success sound for marking article as read
        playReadArticleSound();

        // Check if this completed the daily goal
        const wasAchieved =
          prev.today.articlesRead.length >= prev.dailyGoalArticles &&
          prev.today.wordsSaved.length >= prev.dailyGoalWords;
        const nowAchieved =
          updated.today.articlesRead.length >= updated.dailyGoalArticles &&
          updated.today.wordsSaved.length >= updated.dailyGoalWords;

        if (nowAchieved && !wasAchieved) {
          setTimeout(playGoalAchievedSound, 350);
        }
      }
      return updated;
    });
  }, []);

  const handleUpdateGoals = (articlesGoal: number, wordsGoal: number) => {
    const updated = updateDailyGoals(articlesGoal, wordsGoal);
    setDailyProgress(updated);
  };

  const handleUpdateReminderSettings = (newSettings: ReminderSettings) => {
    saveReminderSettings(newSettings);
    setReminderSettings(newSettings);
  };

  const handleDismissReminderToast = () => {
    setShowEveningToast(false);
    const updated = dismissReminderForToday();
    setReminderSettings(updated);
  };

  const handleTestReminderToast = () => {
    setShowEveningToast(true);
  };

  const handleSelectTab = (tab: 'articole' | 'gramatica' | 'vocabular' | 'exercitii' | 'salvate') => {
    setActiveTab(tab);
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadArticle = (article: BlogArticle) => {
    setSelectedArticle(article);
    handleMarkArticleRead(article.id);
  };

  const handleSelectArticleBySlug = (slug: string) => {
    const target = BLOG_ARTICLES.find((a) => a.slug === slug || a.id === slug);
    if (target) {
      setSelectedArticle(target);
      handleMarkArticleRead(target.id);
      setActiveTab('articole');
    }
  };

  // Filtered articles list
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesLevel = selectedLevel === 'Toate' || article.level === selectedLevel;
      const matchesCategory = selectedCategory === 'Toate' || article.category === selectedCategory;
      return matchesLevel && matchesCategory;
    });
  }, [selectedLevel, selectedCategory]);

  const articleCategories = ['Toate', 'Gramatică', 'Ghid de Învățare'];

  const isDailyGoalAchieved =
    dailyProgress.today.articlesRead.length >= dailyProgress.dailyGoalArticles &&
    dailyProgress.today.wordsSaved.length >= dailyProgress.dailyGoalWords;

  const missingArticlesCount = Math.max(
    0,
    dailyProgress.dailyGoalArticles - dailyProgress.today.articlesRead.length
  );
  const missingWordsCount = Math.max(
    0,
    dailyProgress.dailyGoalWords - dailyProgress.today.wordsSaved.length
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1F23]">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
        onOpenSearch={() => setIsSearchOpen(true)}
        savedCount={bookmarkedArticleIds.length + savedWordIds.length}
        onOpenDailyProgress={() => setIsDailyProgressOpen(true)}
        articlesReadTodayCount={dailyProgress.today.articlesRead.length}
        wordsSavedTodayCount={dailyProgress.today.wordsSaved.length}
        streakDays={dailyProgress.streakDays}
        isDailyGoalAchieved={isDailyGoalAchieved}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedArticle ? (
          <ArticleDetail
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            isBookmarked={bookmarkedArticleIds.includes(selectedArticle.id)}
            onToggleBookmark={handleToggleBookmarkArticle}
            onSelectArticle={handleReadArticle}
            allArticles={BLOG_ARTICLES}
            isReadToday={dailyProgress.today.articlesRead.includes(selectedArticle.id)}
            onMarkAsReadToday={handleMarkArticleRead}
          />
        ) : (
          <>
            {/* TAB 1: Articole & Ghiduri */}
            {activeTab === 'articole' && (
              <div className="space-y-12">
                {/* Hero section */}
                <Hero
                  onExploreArticles={() => {
                    const el = document.getElementById('articole-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onExploreGrammar={() => handleSelectTab('gramatica')}
                  onExploreVocabulary={() => handleSelectTab('vocabular')}
                  onStartQuiz={() => handleSelectTab('exercitii')}
                />

                {/* Articles Feed */}
                <section id="articole-grid" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
                  {/* Category Filter & Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E7E2D9]">
                    <div className="space-y-1">
                      <div className="text-xs font-mono tracking-widest text-[#7C858F] uppercase">
                        Publicație Editorială
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#191E24]">
                        Toate Ghidurile & Articolele
                      </h2>
                    </div>

                    {/* Category tabs */}
                    <div className="flex items-center gap-1.5 p-1 bg-[#EFECE6] rounded-lg text-xs font-medium self-start sm:self-auto">
                      {articleCategories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                            selectedCategory === cat
                              ? 'bg-white text-[#191E24] shadow-xs font-semibold'
                              : 'text-[#5B636B] hover:text-[#191E24]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Level indicator if filtered */}
                  {selectedLevel !== 'Toate' && (
                    <div className="text-xs text-[#717A84] flex items-center justify-between">
                      <span>
                        Filtru activ: Nivel <strong>{selectedLevel}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedLevel('Toate')}
                        className="text-amber-800 hover:underline cursor-pointer"
                      >
                        Arată toate nivelurile
                      </button>
                    </div>
                  )}

                  {/* Content Split: 8 cols Articles + 4 cols Dedicated Daily Progress Widget */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredArticles.map((article) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          onRead={handleReadArticle}
                          isBookmarked={bookmarkedArticleIds.includes(article.id)}
                          onToggleBookmark={handleToggleBookmarkArticle}
                          isReadToday={dailyProgress.today.articlesRead.includes(article.id)}
                        />
                      ))}
                    </div>

                    {/* Dedicated Daily Progress Companion Widget */}
                    <aside className="lg:col-span-4 sticky top-22">
                      <DailyProgressWidget
                        progress={dailyProgress}
                        onUpdateGoals={handleUpdateGoals}
                        onOpenArticle={handleReadArticle}
                        onExploreVocabulary={() => handleSelectTab('vocabular')}
                        variant="card"
                        reminderSettings={reminderSettings}
                        onUpdateReminderSettings={handleUpdateReminderSettings}
                        onTestReminderToast={handleTestReminderToast}
                      />
                    </aside>
                  </div>
                </section>
              </div>
            )}

            {/* TAB 2: Gramatică Hub */}
            {activeTab === 'gramatica' && (
              <GrammarHub
                onSelectArticleBySlug={handleSelectArticleBySlug}
                articles={BLOG_ARTICLES}
              />
            )}

            {/* TAB 3: Vocabular Tematic */}
            {activeTab === 'vocabular' && (
              <VocabularyExplorer
                initialLevel={selectedLevel}
                savedWordIds={savedWordIds}
                onToggleSaveWord={handleToggleSaveWord}
                wordsSavedToday={dailyProgress.today.wordsSaved}
              />
            )}

            {/* TAB 4: Exerciții & Quiz */}
            {activeTab === 'exercitii' && (
              <InteractivePractice
                savedWords={VOCABULARY_LIST.filter((w) => savedWordIds.includes(w.id))}
                onExploreVocabulary={() => handleSelectTab('vocabular')}
              />
            )}

            {/* TAB 5: Salvate */}
            {activeTab === 'salvate' && (
              <BookmarksView
                bookmarkedArticleIds={bookmarkedArticleIds}
                savedWordIds={savedWordIds}
                onToggleBookmarkArticle={handleToggleBookmarkArticle}
                onToggleSaveWord={handleToggleSaveWord}
                onReadArticle={handleReadArticle}
                onExploreVocabulary={() => handleSelectTab('vocabular')}
                onExploreArticles={() => handleSelectTab('articole')}
                progress={dailyProgress}
              />
            )}
          </>
        )}
      </main>

      {/* Daily Progress Popover Modal (triggered from Header button) */}
      <DailyProgressWidget
        progress={dailyProgress}
        onUpdateGoals={handleUpdateGoals}
        onOpenArticle={(art) => {
          setIsDailyProgressOpen(false);
          handleReadArticle(art);
        }}
        onExploreVocabulary={() => {
          setIsDailyProgressOpen(false);
          handleSelectTab('vocabular');
        }}
        variant="popover"
        isOpen={isDailyProgressOpen}
        onClose={() => setIsDailyProgressOpen(false)}
        reminderSettings={reminderSettings}
        onUpdateReminderSettings={handleUpdateReminderSettings}
        onTestReminderToast={handleTestReminderToast}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(article) => {
          setSelectedArticle(article);
          setActiveTab('articole');
        }}
        onGoToVocabulary={() => {
          setActiveTab('vocabular');
          setSelectedArticle(null);
        }}
        onGoToGrammar={() => {
          setActiveTab('gramatica');
          setSelectedArticle(null);
        }}
      />

      {/* Evening Reminder Toast */}
      <NotificationToast
        isVisible={showEveningToast}
        missingArticles={missingArticlesCount}
        missingWords={missingWordsCount}
        streakDays={dailyProgress.streakDays}
        onDismiss={handleDismissReminderToast}
        onActionRead={() => {
          setShowEveningToast(false);
          const firstUnread = BLOG_ARTICLES.find(
            (a) => !dailyProgress.today.articlesRead.includes(a.id)
          ) || BLOG_ARTICLES[0];
          handleReadArticle(firstUnread);
        }}
        onActionVocabulary={() => {
          setShowEveningToast(false);
          handleSelectTab('vocabular');
        }}
      />

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
