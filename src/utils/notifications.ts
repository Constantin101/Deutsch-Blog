/**
 * Evening Reminder & Notification Management
 */

import { DailyProgressState, getTodayDateString } from './dailyProgress';

export interface ReminderSettings {
  enabled: boolean;
  eveningHour: number; // 18, 19, 20, 21, etc.
  eveningMinute: number;
  lastDismissedDate: string;
  webPushEnabled: boolean;
}

const SETTINGS_KEY = 'klardeutsch_reminder_settings_v1';

export const loadReminderSettings = (): ReminderSettings => {
  const defaultSettings: ReminderSettings = {
    enabled: true,
    eveningHour: 19, // 19:00 (7 PM)
    eveningMinute: 0,
    lastDismissedDate: '',
    webPushEnabled: false
  };

  if (typeof window === 'undefined') return defaultSettings;

  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      saveReminderSettings(defaultSettings);
      return defaultSettings;
    }
    return JSON.parse(raw);
  } catch {
    return defaultSettings;
  }
};

export const saveReminderSettings = (settings: ReminderSettings) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage quota limits
  }
};

export const dismissReminderForToday = (): ReminderSettings => {
  const settings = loadReminderSettings();
  const updated: ReminderSettings = {
    ...settings,
    lastDismissedDate: getTodayDateString()
  };
  saveReminderSettings(updated);
  return updated;
};

export const requestBrowserNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    const isGranted = permission === 'granted';
    const settings = loadReminderSettings();
    saveReminderSettings({
      ...settings,
      webPushEnabled: isGranted
    });
    return isGranted;
  } catch {
    return false;
  }
};

export const sendBrowserNotification = (title: string, body: string, icon?: string) => {
  if (typeof window === 'undefined' || !('Notification' in window)) return;

  try {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: icon || '/favicon.ico',
        tag: 'klardeutsch-evening-reminder'
      });
    }
  } catch {
    // Ignore notification errors in iframe sandboxes
  }
};

/**
 * Checks whether the evening toast should be shown right now
 */
export const shouldTriggerEveningReminder = (
  progress: DailyProgressState,
  settings: ReminderSettings
): {
  shouldShow: boolean;
  missingArticles: number;
  missingWords: number;
} => {
  const todayStr = getTodayDateString();

  const missingArticles = Math.max(0, progress.dailyGoalArticles - progress.today.articlesRead.length);
  const missingWords = Math.max(0, progress.dailyGoalWords - progress.today.wordsSaved.length);

  // If both goals are reached, no reminder is needed
  if (missingArticles === 0 && missingWords === 0) {
    return { shouldShow: false, missingArticles: 0, missingWords: 0 };
  }

  // If disabled or already dismissed today
  if (!settings.enabled || settings.lastDismissedDate === todayStr) {
    return { shouldShow: false, missingArticles, missingWords };
  }

  // Check current time against configured evening hour
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const isPastEveningThreshold =
    currentHour > settings.eveningHour ||
    (currentHour === settings.eveningHour && currentMinute >= settings.eveningMinute);

  return {
    shouldShow: isPastEveningThreshold,
    missingArticles,
    missingWords
  };
};
