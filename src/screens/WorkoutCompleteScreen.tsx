import { DECKS } from '@/lib/deck';
import { Button } from '@/components/Button';
import type { WorkoutSummary } from '@/types';
import './WorkoutCompleteScreen.css';

interface WorkoutCompleteScreenProps {
  summary: WorkoutSummary;
  onNewWorkout: () => void;
  onGoHome: () => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function WorkoutCompleteScreen({
  summary,
  onNewWorkout,
  onGoHome,
}: WorkoutCompleteScreenProps) {
  const deck = DECKS[summary.deckType];
  const isComplete = summary.status === 'completed';

  return (
    <div className="screen workout-complete-screen">
      <div className="workout-complete-screen__header">
        <span className="workout-complete-screen__emoji">
          {isComplete ? '🎉' : '💪'}
        </span>
        <h1 className="workout-complete-screen__title">
          {isComplete ? 'WORKOUT COMPLETE!' : 'WORKOUT SAVED'}
        </h1>
      </div>

      <div className="workout-complete-screen__content">
        <div className="workout-complete-screen__hero">
          <span className="workout-complete-screen__skull">💀</span>
          <p className="workout-complete-screen__subtitle">
            {isComplete ? 'YOU SURVIVED THE' : 'PROGRESS SAVED FOR'}
          </p>
          <p className="workout-complete-screen__brand">CARDS OF CARNAGE</p>
        </div>

        <div className="workout-complete-screen__stats-card">
          <div className="workout-complete-screen__stat-row">
            <span>Deck:</span>
            <strong>{deck.name}</strong>
          </div>
          <div className="workout-complete-screen__stat-row">
            <span>Time:</span>
            <strong>{formatDuration(summary.duration)}</strong>
          </div>
          <div className="workout-complete-screen__stat-row">
            <span>Cards:</span>
            <strong>
              {summary.cardsCompleted}/{summary.totalCards}
            </strong>
          </div>
          <div className="workout-complete-screen__stat-row workout-complete-screen__stat-row--highlight">
            <span>Total Reps:</span>
            <strong>{summary.totalReps}</strong>
          </div>

          <div className="workout-complete-screen__divider" />

          <div className="workout-complete-screen__breakdown">
            {Object.entries(summary.repsByExercise).map(([exercise, reps]) => (
              <div key={exercise} className="workout-complete-screen__breakdown-row">
                <span>{exercise}:</span>
                <span>{reps}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="workout-complete-screen__footer">
        <Button variant="primary" fullWidth onClick={onNewWorkout}>
          🔄 New Workout
        </Button>
        <Button variant="ghost" fullWidth onClick={onGoHome}>
          🏠 Home
        </Button>
      </div>
    </div>
  );
}
