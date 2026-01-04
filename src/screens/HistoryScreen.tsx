import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import type { WorkoutHistory, WorkoutSummary } from '@/types';
import './HistoryScreen.css';

interface HistoryScreenProps {
  history: WorkoutHistory;
  onBack: () => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatTotalTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${mins}m`;
}

function formatDate(date: Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Today, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  } else if (diffDays === 1) {
    return `Yesterday, ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  } else {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}

function WorkoutItem({ workout }: { workout: WorkoutSummary }) {
  const isComplete = workout.status === 'completed';

  return (
    <div className="history-screen__workout-item">
      <div className="history-screen__workout-header">
        <span className="history-screen__workout-date">
          {formatDate(workout.date)}
        </span>
        <span
          className={`history-screen__workout-status ${
            isComplete ? 'history-screen__workout-status--complete' : ''
          }`}
        >
          {isComplete ? '✓ Complete' : '⚠ Partial'}
        </span>
      </div>
      <div className="history-screen__workout-name">{workout.deckName}</div>
      <div className="history-screen__workout-stats">
        {workout.cardsCompleted === workout.totalCards
          ? `${workout.totalCards} cards`
          : `${workout.cardsCompleted}/${workout.totalCards} cards`}{' '}
        • {workout.totalReps} reps • {formatDuration(workout.duration)}
      </div>
    </div>
  );
}

export function HistoryScreen({ history, onBack }: HistoryScreenProps) {
  const { stats, workouts } = history;

  return (
    <div className="screen history-screen">
      <Header title="HISTORY" leftAction={{ label: '← Back', onClick: onBack }} />

      <div className="history-screen__content">
        <div className="history-screen__stats-section">
          <h3 className="history-screen__section-title">📊 All-Time Stats</h3>
          <div className="history-screen__stats-grid">
            <div className="history-screen__stat">
              <span className="history-screen__stat-value">{stats.totalWorkouts}</span>
              <span className="history-screen__stat-label">Workouts</span>
            </div>
            <div className="history-screen__stat">
              <span className="history-screen__stat-value">
                {stats.totalReps.toLocaleString()}
              </span>
              <span className="history-screen__stat-label">Total Reps</span>
            </div>
            <div className="history-screen__stat">
              <span className="history-screen__stat-value">
                {formatTotalTime(stats.totalTimeSeconds)}
              </span>
              <span className="history-screen__stat-label">Time</span>
            </div>
            <div className="history-screen__stat">
              <span className="history-screen__stat-value">{stats.decksCompleted}</span>
              <span className="history-screen__stat-label">Completed</span>
            </div>
          </div>
        </div>

        <div className="history-screen__workouts-section">
          <h3 className="history-screen__section-title">Recent Workouts</h3>

          {workouts.length === 0 ? (
            <div className="history-screen__empty">
              <span className="history-screen__empty-icon">🏋️</span>
              <p className="history-screen__empty-text">No workouts yet</p>
              <p className="history-screen__empty-subtext">
                Complete a workout to see your history
              </p>
            </div>
          ) : (
            <div className="history-screen__workouts-list">
              {workouts.slice(0, 10).map((workout) => (
                <WorkoutItem key={workout.id} workout={workout} />
              ))}
            </div>
          )}

          {workouts.length > 10 && (
            <Button variant="ghost" fullWidth>
              Load More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
