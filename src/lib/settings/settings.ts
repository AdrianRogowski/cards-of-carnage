import type { Settings } from '@/types';
import { DEFAULT_SETTINGS } from '@/types';

const SETTINGS_STORAGE_KEY = 'cards-of-carnage-settings';

/**
 * Create settings with defaults
 */
export function createSettings(): Settings {
  return { ...DEFAULT_SETTINGS };
}

/**
 * Update settings with partial values
 * Validates and clamps values as needed
 */
export function updateSettings(
  settings: Settings,
  updates: Partial<Settings>
): Settings {
  const newSettings = { ...settings, ...updates };
  
  // Validate and clamp values
  if (newSettings.faceCardValue !== undefined) {
    newSettings.faceCardValue = Math.max(1, newSettings.faceCardValue);
  }
  
  if (newSettings.aceValue !== undefined) {
    newSettings.aceValue = Math.max(1, newSettings.aceValue);
  }
  
  // Ensure theme is valid
  if (newSettings.theme !== 'dark' && newSettings.theme !== 'light') {
    newSettings.theme = DEFAULT_SETTINGS.theme;
  }
  
  return newSettings;
}

/**
 * Reset settings to defaults
 */
export function resetSettings(): Settings {
  return { ...DEFAULT_SETTINGS };
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

/**
 * Load settings from localStorage
 * Returns defaults if no saved settings or if data is corrupted
 */
export function loadSettings(): Settings {
  try {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to handle missing keys
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
      };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return { ...DEFAULT_SETTINGS };
}
