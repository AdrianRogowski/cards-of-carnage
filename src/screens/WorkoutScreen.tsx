import { useState, useEffect } from 'react';
import { DECKS } from '@/lib/deck';
import { getCurrentCard, getProgress, completeCard } from '@/lib/workout';
import { formatElapsedTime } from '@/lib/time';
import { Button } from '@/components/Button';
import { PlayingCard } from '@/components/PlayingCard';
import { ProgressBar } from '@/components/ProgressBar';
import { Modal } from '@/components/Modal';
import type { WorkoutState } from '@/types';
import './WorkoutScreen.css';

interface WorkoutScreenProps {
  workout: WorkoutState;
  onUpdateWorkout: (workout: WorkoutState) => void;
  onEndWorkout: () => void;
  onComplete: () => void;
}

export function WorkoutScreen({
  workout,
  onUpdateWorkout,
  onEndWorkout,
  onComplete,
}: WorkoutScreenProps) {
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const deck = DECKS[workout.deckType];
  const currentCard = getCurrentCard(workout);
  const progress = getProgress(workout);

  // Timer effect - updates every second
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const start = workout.startTime instanceof Date 
        ? workout.startTime.getTime() 
        : new Date(workout.startTime).getTime();
      setElapsedTime(now - start);
    };

    // Initial update
    updateTimer();

    // Only tick when modal is closed
    if (!showPauseModal) {
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [workout.startTime, showPauseModal]);

  const handleCompleteCard = () => {
    const updated = completeCard(workout);
    onUpdateWorkout(updated);

    if (updated.status === 'completed') {
      onComplete();
    }
  };

  const estimatedTotalReps = 380; // Approximate

  return (
    <div className="screen workout-screen">
      <header className="workout-header">
        <button
          className="exit-button"
          onClick={() => setShowPauseModal(true)}
          aria-label="End workout"
          data-testid="exit-button"
        >
          ×
        </button>
        <time 
          className="workout-timer"
          data-testid="workout-timer"
        >
          {formatElapsedTime(elapsedTime)}
        </time>
        <span className="workout-screen__card-count">
          {progress.current}/{progress.total} 🃏
        </span>
      </header>

      <div className="workout-screen__deck-name" data-testid="deck-name">
        {deck.name}
      </div>

      <div className="workout-screen__content">
        {currentCard && (
          <>
            <div className="workout-screen__card-container">
              <PlayingCard card={currentCard} />
            </div>

            <div className="workout-screen__reps">
              <span className="workout-screen__reps-value">{currentCard.reps}</span>
              <span className="workout-screen__reps-label">REPS</span>
            </div>

            <button
              className="workout-screen__instructions-btn"
              onClick={() => setShowInstructions(true)}
            >
              <span>❓</span>
              <span>How to do {currentCard.exercise.name}</span>
            </button>
          </>
        )}

        <div className="workout-screen__progress">
          <ProgressBar value={progress.percentage} showLabel />
          <div className="workout-screen__progress-reps">
            Reps Done: {workout.totalReps} / ~{estimatedTotalReps}
          </div>
        </div>
      </div>

      <div className="workout-screen__footer">
        <Button size="lg" fullWidth onClick={handleCompleteCard}>
          ✓ DONE - NEXT CARD
        </Button>
      </div>

      {/* Pause Modal */}
      <Modal
        isOpen={showPauseModal}
        onClose={() => setShowPauseModal(false)}
      >
        <div className="workout-screen__pause-modal">
          <h2 className="workout-screen__pause-title">⏸️ WORKOUT PAUSED</h2>
          <p className="workout-screen__pause-text">Progress will be saved.</p>
          
          <div className="workout-screen__pause-stats">
            <div className="workout-screen__pause-stat">
              <span>Cards completed:</span>
              <strong>{workout.completedCards.length}/{workout.deck.length}</strong>
            </div>
            <div className="workout-screen__pause-stat">
              <span>Reps so far:</span>
              <strong>{workout.totalReps}</strong>
            </div>
          </div>

          <div className="workout-screen__pause-actions">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setShowPauseModal(false)}
            >
              ▶️ Resume
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={onEndWorkout}
            >
              ✕ End Workout
            </Button>
          </div>
        </div>
      </Modal>

      {/* Instructions Modal */}
      {currentCard && (
        <Modal
          isOpen={showInstructions}
          onClose={() => setShowInstructions(false)}
          title={currentCard.exercise.name}
        >
          <div className="workout-screen__instructions">
            <ol className="workout-screen__instructions-list">
              {currentCard.exercise.instructions.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ol>
            <div className="workout-screen__muscles">
              <strong>Muscles:</strong> {currentCard.exercise.muscles.join(', ')}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
