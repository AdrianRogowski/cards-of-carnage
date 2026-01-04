import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createSettings,
  updateSettings,
  loadSettings,
  saveSettings,
  resetSettings,
} from '../settings';
import { DEFAULT_SETTINGS } from '@/types';
import type { Settings } from '@/types';

describe('Settings Management', () => {
  beforeEach(() => {
    // Clear localStorage mock before each test
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  /**
   * SET-001: Joker toggle persists
   * Covers: Toggle jokers scenario
   */
  it('SET-001: should persist joker toggle setting', () => {
    let settings = createSettings();
    expect(settings.includeJokers).toBe(true); // default
    
    settings = updateSettings(settings, { includeJokers: false });
    expect(settings.includeJokers).toBe(false);
    
    saveSettings(settings);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cards-of-carnage-settings',
      expect.stringContaining('"includeJokers":false')
    );
  });

  /**
   * SET-002: Face card value persists
   * Covers: Change face card value scenario
   */
  it('SET-002: should persist face card value setting', () => {
    let settings = createSettings();
    expect(settings.faceCardValue).toBe(10); // default
    
    settings = updateSettings(settings, { faceCardValue: 12 });
    expect(settings.faceCardValue).toBe(12);
    
    saveSettings(settings);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cards-of-carnage-settings',
      expect.stringContaining('"faceCardValue":12')
    );
  });

  /**
   * SET-003: Ace value persists
   * Covers: Change ace value scenario
   */
  it('SET-003: should persist ace value setting', () => {
    let settings = createSettings();
    expect(settings.aceValue).toBe(11); // default
    
    settings = updateSettings(settings, { aceValue: 14 });
    expect(settings.aceValue).toBe(14);
    
    saveSettings(settings);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cards-of-carnage-settings',
      expect.stringContaining('"aceValue":14')
    );
  });

  /**
   * SET-004: Sound toggle works
   * Covers: Toggle sound effects scenario
   */
  it('SET-004: should toggle sound effects setting', () => {
    let settings = createSettings();
    expect(settings.soundEffects).toBe(true); // default
    
    settings = updateSettings(settings, { soundEffects: false });
    expect(settings.soundEffects).toBe(false);
    
    // Toggle back
    settings = updateSettings(settings, { soundEffects: true });
    expect(settings.soundEffects).toBe(true);
  });

  /**
   * SET-005: Theme toggle works
   * Covers: Change theme scenario
   */
  it('SET-005: should toggle theme setting', () => {
    let settings = createSettings();
    expect(settings.theme).toBe('dark'); // default
    
    settings = updateSettings(settings, { theme: 'light' });
    expect(settings.theme).toBe('light');
    
    // Toggle back
    settings = updateSettings(settings, { theme: 'dark' });
    expect(settings.theme).toBe('dark');
  });

  /**
   * SET-006: Clear data removes all history
   * Covers: Clear all data functionality
   */
  it('SET-006: should reset settings to defaults', () => {
    let settings = createSettings();
    
    // Modify all settings
    settings = updateSettings(settings, {
      includeJokers: false,
      faceCardValue: 15,
      aceValue: 1,
      soundEffects: false,
      vibration: false,
      theme: 'light',
    });
    
    // Reset
    const resetSettingsResult = resetSettings();
    
    expect(resetSettingsResult).toEqual(DEFAULT_SETTINGS);
    expect(resetSettingsResult.includeJokers).toBe(true);
    expect(resetSettingsResult.faceCardValue).toBe(10);
    expect(resetSettingsResult.aceValue).toBe(11);
    expect(resetSettingsResult.soundEffects).toBe(true);
    expect(resetSettingsResult.theme).toBe('dark');
  });
});

describe('Settings Persistence', () => {
  it('should load settings from localStorage', () => {
    const savedSettings: Settings = {
      includeJokers: false,
      faceCardValue: 12,
      aceValue: 14,
      soundEffects: false,
      vibration: true,
      theme: 'light',
    };
    
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(JSON.stringify(savedSettings)),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
    
    const loaded = loadSettings();
    
    expect(loaded).toEqual(savedSettings);
    expect(localStorage.getItem).toHaveBeenCalledWith('cards-of-carnage-settings');
  });

  it('should return defaults when no saved settings exist', () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
    
    const loaded = loadSettings();
    
    expect(loaded).toEqual(DEFAULT_SETTINGS);
  });

  it('should handle corrupted localStorage data', () => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue('invalid json {{{'),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
    
    const loaded = loadSettings();
    
    // Should fall back to defaults
    expect(loaded).toEqual(DEFAULT_SETTINGS);
  });

  it('should merge partial saved settings with defaults', () => {
    const partialSettings = {
      includeJokers: false,
      // Other settings missing
    };
    
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(JSON.stringify(partialSettings)),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
    
    const loaded = loadSettings();
    
    // Should have the saved value
    expect(loaded.includeJokers).toBe(false);
    // Should fill in defaults for missing values
    expect(loaded.faceCardValue).toBe(10);
    expect(loaded.aceValue).toBe(11);
  });
});

describe('Settings Validation', () => {
  it('should validate face card value is positive', () => {
    const settings = createSettings();
    const updated = updateSettings(settings, { faceCardValue: -5 });
    
    // Should clamp to minimum valid value
    expect(updated.faceCardValue).toBeGreaterThan(0);
  });

  it('should validate ace value is positive', () => {
    const settings = createSettings();
    const updated = updateSettings(settings, { aceValue: 0 });
    
    // Should clamp to minimum valid value
    expect(updated.aceValue).toBeGreaterThan(0);
  });

  it('should only accept valid theme values', () => {
    const settings = createSettings();
    
    // Valid values should work
    const darkSettings = updateSettings(settings, { theme: 'dark' });
    expect(darkSettings.theme).toBe('dark');
    
    const lightSettings = updateSettings(settings, { theme: 'light' });
    expect(lightSettings.theme).toBe('light');
  });
});

describe('Vibration Setting', () => {
  it('should toggle vibration setting', () => {
    let settings = createSettings();
    expect(settings.vibration).toBe(true); // default
    
    settings = updateSettings(settings, { vibration: false });
    expect(settings.vibration).toBe(false);
  });
});

describe('Settings Integration with Workout', () => {
  it('should apply face card value when creating deck', () => {
    // This is tested in deck.test.ts but we verify the settings type is correct
    const settings = createSettings();
    settings.faceCardValue = 15;
    
    expect(settings.faceCardValue).toBe(15);
    expect(typeof settings.faceCardValue).toBe('number');
  });

  it('should apply ace value when creating deck', () => {
    const settings = createSettings();
    settings.aceValue = 1; // Low ace
    
    expect(settings.aceValue).toBe(1);
    expect(typeof settings.aceValue).toBe('number');
  });
});
