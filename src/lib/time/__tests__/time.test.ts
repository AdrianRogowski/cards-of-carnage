import { describe, it, expect } from 'vitest';
import { formatElapsedTime } from '../time';

describe('Time Formatting', () => {
  /**
   * TMR-001: Timer starts at zero
   * Covers: Timer starts at zero scenario
   */
  it('TMR-001: should display "00:00" at start', () => {
    expect(formatElapsedTime(0)).toBe('00:00');
  });

  /**
   * TMR-002: Timer counts up (seconds)
   * Covers: Timer counts up scenario
   */
  it('TMR-002: should display seconds correctly', () => {
    expect(formatElapsedTime(30 * 1000)).toBe('00:30');
    expect(formatElapsedTime(5 * 1000)).toBe('00:05');
    expect(formatElapsedTime(59 * 1000)).toBe('00:59');
  });

  /**
   * TMR-003: Timer shows minutes correctly
   * Covers: Timer shows minutes correctly scenario
   */
  it('TMR-003: should display minutes and seconds correctly', () => {
    expect(formatElapsedTime(2 * 60 * 1000 + 15 * 1000)).toBe('02:15');
    expect(formatElapsedTime(10 * 60 * 1000)).toBe('10:00');
    expect(formatElapsedTime(45 * 60 * 1000 + 30 * 1000)).toBe('45:30');
  });

  /**
   * TMR-004: Timer handles hour-long workouts
   * Covers: Timer handles hour-long workouts scenario
   */
  it('TMR-004: should display hours for long workouts', () => {
    expect(formatElapsedTime(1 * 60 * 60 * 1000 + 5 * 60 * 1000 + 23 * 1000)).toBe('1:05:23');
    expect(formatElapsedTime(2 * 60 * 60 * 1000)).toBe('2:00:00');
    expect(formatElapsedTime(1 * 60 * 60 * 1000)).toBe('1:00:00');
  });

  /**
   * TMR-005: Timer handles edge cases
   */
  it('TMR-005: should handle edge cases', () => {
    // Just under an hour
    expect(formatElapsedTime(59 * 60 * 1000 + 59 * 1000)).toBe('59:59');
    // Exactly one hour
    expect(formatElapsedTime(60 * 60 * 1000)).toBe('1:00:00');
    // Just over an hour
    expect(formatElapsedTime(60 * 60 * 1000 + 1000)).toBe('1:00:01');
  });

  /**
   * TMR-006: Timer rounds down partial seconds
   */
  it('TMR-006: should round down partial seconds', () => {
    expect(formatElapsedTime(1500)).toBe('00:01'); // 1.5 seconds
    expect(formatElapsedTime(999)).toBe('00:00'); // 0.999 seconds
    expect(formatElapsedTime(61999)).toBe('01:01'); // 1:01.999
  });
});
