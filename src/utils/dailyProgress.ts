/**
 * Daily Progress Tracker using localStorage
 */

export interface DailyActivity {
  date: string; // ISO date format YYYY-MM-DD
  articlesRead: string[]; // List of article IDs read on this date
  wordsSaved: string[]; // List of word IDs saved on this date
  quizzesCompleted?: number;
}

export interface DailyProgressState {
  today: DailyActivity;
  streakDays: number;
  lastActiveDate: string;
  dailyGoalArticles: number;
  dailyGoalWords: number;
  history: Record<string, DailyActivity>;
}

export interface DayProgressStat {
  date: string;
  dayName: string;
  fullDate: string;
  articole: number;
  cuvinte: number;
  total: number;
  isToday: boolean;
}

const STORAGE_KEY = 'klardeutsch_daily_progress_v2';

export const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getOffsetDateString = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Default seed data for the previous days to give immediate visual value
const createDefaultHistory = (todayStr: string): Record<string, DailyActivity> => {
  const history: Record<string, DailyActivity> = {};
  
  // Past 6 days with realistic learner baseline
  const sampleCounts = [
    { articles: ['ghid-der-die-das'], words: ['v1', 'v2', 'v4'] }, // -1 day
    { articles: ['ordinea-cuvintelor-propozitie-v2'], words: ['v6', 'v8'] }, // -2 days
    { articles: [], words: ['v12', 'v13', 'v14', 'v15'] }, // -3 days
    { articles: ['cele-patru-cazuri-germane'], words: ['v17', 'v19'] }, // -4 days
    { articles: ['verbele-modale-in-germana'], words: ['v22', 'v23', 'v24'] }, // -5 days
    { articles: [], words: ['v27', 'v29'] } // -6 days
  ];

  sampleCounts.forEach((sample, index) => {
    const pastDate = getOffsetDateString(index + 1);
    history[pastDate] = {
      date: pastDate,
      articlesRead: sample.articles,
      wordsSaved: sample.words
    };
  });

  history[todayStr] = {
    date: todayStr,
    articlesRead: [],
    wordsSaved: []
  };

  return history;
};

export const loadDailyProgress = (): DailyProgressState => {
  const todayStr = getTodayDateString();
  const yesterdayStr = getOffsetDateString(1);

  const initialHistory = createDefaultHistory(todayStr);

  const defaultState: DailyProgressState = {
    today: {
      date: todayStr,
      articlesRead: [],
      wordsSaved: []
    },
    streakDays: 3,
    lastActiveDate: todayStr,
    dailyGoalArticles: 1,
    dailyGoalWords: 3,
    history: initialHistory
  };

  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveDailyProgress(defaultState);
      return defaultState;
    }

    const parsed: DailyProgressState = JSON.parse(raw);
    const existingHistory = parsed.history || initialHistory;

    // If today is already recorded
    if (parsed.today && parsed.today.date === todayStr) {
      return {
        ...parsed,
        history: {
          ...existingHistory,
          [todayStr]: parsed.today
        }
      };
    }

    // A new day has begun: check streak continuity
    const hadActivityYesterday = parsed.lastActiveDate === yesterdayStr;
    let newStreak = parsed.streakDays || 1;

    if (parsed.lastActiveDate === todayStr) {
      newStreak = parsed.streakDays;
    } else if (hadActivityYesterday) {
      newStreak = (parsed.streakDays || 0) + 1;
    } else {
      newStreak = 1;
    }

    const newToday: DailyActivity = {
      date: todayStr,
      articlesRead: [],
      wordsSaved: []
    };

    const updatedState: DailyProgressState = {
      ...parsed,
      today: newToday,
      lastActiveDate: todayStr,
      streakDays: newStreak,
      history: {
        ...existingHistory,
        [todayStr]: newToday
      }
    };

    saveDailyProgress(updatedState);
    return updatedState;
  } catch {
    return defaultState;
  }
};

export const saveDailyProgress = (state: DailyProgressState) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota limits
  }
};

export const markArticleReadToday = (articleId: string): DailyProgressState => {
  const state = loadDailyProgress();
  const todayStr = getTodayDateString();

  if (!state.today.articlesRead.includes(articleId)) {
    const updatedToday: DailyActivity = {
      ...state.today,
      articlesRead: [...state.today.articlesRead, articleId]
    };
    const updated: DailyProgressState = {
      ...state,
      lastActiveDate: todayStr,
      today: updatedToday,
      history: {
        ...state.history,
        [todayStr]: updatedToday
      }
    };
    saveDailyProgress(updated);
    return updated;
  }
  return state;
};

export const markWordSavedToday = (wordId: string): DailyProgressState => {
  const state = loadDailyProgress();
  const todayStr = getTodayDateString();

  if (!state.today.wordsSaved.includes(wordId)) {
    const updatedToday: DailyActivity = {
      ...state.today,
      wordsSaved: [...state.today.wordsSaved, wordId]
    };
    const updated: DailyProgressState = {
      ...state,
      lastActiveDate: todayStr,
      today: updatedToday,
      history: {
        ...state.history,
        [todayStr]: updatedToday
      }
    };
    saveDailyProgress(updated);
    return updated;
  }
  return state;
};

export const removeWordSavedToday = (wordId: string): DailyProgressState => {
  const state = loadDailyProgress();
  const todayStr = getTodayDateString();

  if (state.today.wordsSaved.includes(wordId)) {
    const updatedToday: DailyActivity = {
      ...state.today,
      wordsSaved: state.today.wordsSaved.filter((id) => id !== wordId)
    };
    const updated: DailyProgressState = {
      ...state,
      today: updatedToday,
      history: {
        ...state.history,
        [todayStr]: updatedToday
      }
    };
    saveDailyProgress(updated);
    return updated;
  }
  return state;
};

export const updateDailyGoals = (articlesGoal: number, wordsGoal: number): DailyProgressState => {
  const state = loadDailyProgress();
  const updated: DailyProgressState = {
    ...state,
    dailyGoalArticles: Math.max(1, articlesGoal),
    dailyGoalWords: Math.max(1, wordsGoal)
  };
  saveDailyProgress(updated);
  return updated;
};

/**
 * Returns formatted 7 days array (from 6 days ago up to today)
 */
export const getLast7DaysProgress = (state: DailyProgressState): DayProgressStat[] => {
  const dayNames = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'];
  const monthNames = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'];
  const todayStr = getTodayDateString();

  const result: DayProgressStat[] = [];

  // 6 days ago to 0 (today)
  for (let offset = 6; offset >= 0; offset--) {
    const d = new Date();
    d.setDate(d.getDate() - offset);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    const isToday = dateStr === todayStr;

    // Retrieve activity from history or current today state
    const activity = isToday
      ? state.today
      : state.history[dateStr] || {
          date: dateStr,
          articlesRead: [],
          wordsSaved: []
        };

    const articoleCount = activity.articlesRead ? activity.articlesRead.length : 0;
    const cuvinteCount = activity.wordsSaved ? activity.wordsSaved.length : 0;

    result.push({
      date: dateStr,
      dayName: isToday ? 'Azi' : dayNames[d.getDay()],
      fullDate: `${d.getDate()} ${monthNames[d.getMonth()]}`,
      articole: articoleCount,
      cuvinte: cuvinteCount,
      total: articoleCount + cuvinteCount,
      isToday
    });
  }

  return result;
};
