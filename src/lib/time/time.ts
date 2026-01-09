/**
 * Format elapsed time in milliseconds to a human-readable string.
 * - Under 1 hour: MM:SS (e.g., "05:30")
 * - 1 hour or more: H:MM:SS (e.g., "1:05:23")
 * 
 * @param ms - Elapsed time in milliseconds
 * @returns Formatted time string
 */
export function formatElapsedTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
