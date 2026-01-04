import { DECKS } from '@/lib/deck';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import type { DeckType } from '@/types';
import './DeckPreviewScreen.css';

interface DeckPreviewScreenProps {
  deckType: DeckType;
  onBack: () => void;
  onStartWorkout: () => void;
}

export function DeckPreviewScreen({
  deckType,
  onBack,
  onStartWorkout,
}: DeckPreviewScreenProps) {
  const deck = DECKS[deckType];

  // Calculate estimated reps (rough estimate)
  // 2-10: (2+3+4+5+6+7+8+9+10) × 4 = 216
  // Face cards: 10 × 12 = 120
  // Aces: 11 × 4 = 44
  // Total: 380
  const estimatedReps = 380;

  return (
    <div className="screen deck-preview-screen">
      <Header
        title={deck.name}
        leftAction={{ label: '← Back', onClick: onBack }}
      />

      <div className="deck-preview-screen__content">
        <div className="deck-preview-screen__card-stack">
          <div className="deck-preview-screen__card-back">
            <span className="deck-preview-screen__card-logo">💀</span>
            <span className="deck-preview-screen__card-text">CARDS OF</span>
            <span className="deck-preview-screen__card-text">CARNAGE</span>
          </div>
          <span className="deck-preview-screen__card-count">52 cards</span>
        </div>

        <div className="deck-preview-screen__exercises">
          <h3 className="deck-preview-screen__section-title">
            Exercises in this deck:
          </h3>
          <div className="deck-preview-screen__exercise-list">
            {deck.exercises.map((exercise, index) => (
              <span key={exercise.id} className="deck-preview-screen__exercise">
                {['♠', '♥', '♦', '♣', '★', '☆', '●', '○'][index % 8]} {exercise.name}
              </span>
            ))}
          </div>
        </div>

        <div className="deck-preview-screen__stats">
          <div className="deck-preview-screen__stat">
            <span className="deck-preview-screen__stat-label">Total Reps</span>
            <span className="deck-preview-screen__stat-value">~{estimatedReps}</span>
          </div>
          <div className="deck-preview-screen__stat">
            <span className="deck-preview-screen__stat-label">Est. Time</span>
            <span className="deck-preview-screen__stat-value">20-30 min</span>
          </div>
        </div>
      </div>

      <div className="deck-preview-screen__footer">
        <Button size="lg" fullWidth onClick={onStartWorkout}>
          🎴 START WORKOUT
        </Button>
      </div>
    </div>
  );
}
