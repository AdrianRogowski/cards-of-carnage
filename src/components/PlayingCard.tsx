import type { PlayableCard, Card, JokerCard } from '@/types';
import './PlayingCard.css';

interface PlayingCardProps {
  card: PlayableCard;
  isRevealed?: boolean;
}

function isJoker(card: PlayableCard): card is JokerCard {
  return 'type' in card && card.type === 'joker';
}

function getSuitSymbol(suit: Card['suit']): string {
  const symbols = {
    spades: '♠',
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
  };
  return symbols[suit];
}

function getSuitColor(suit: Card['suit']): 'red' | 'white' {
  return suit === 'hearts' || suit === 'diamonds' ? 'red' : 'white';
}

function getValueDisplay(value: Card['value']): string {
  if (typeof value === 'number') return value.toString();
  return value;
}

export function PlayingCard({ card, isRevealed = true }: PlayingCardProps) {
  if (!isRevealed) {
    return (
      <div className="playing-card playing-card--back">
        <div className="playing-card__back-design">
          <span className="playing-card__back-logo">💀</span>
          <span className="playing-card__back-text">CARDS OF</span>
          <span className="playing-card__back-text">CARNAGE</span>
        </div>
      </div>
    );
  }

  if (isJoker(card)) {
    return (
      <div className="playing-card playing-card--joker">
        <div className="playing-card__joker-content">
          <span className="playing-card__joker-icon">🃏</span>
          <span className="playing-card__joker-label">JOKER</span>
          <span className="playing-card__joker-wildcard">WILDCARD!</span>
          <span className="playing-card__exercise-name">{card.exercise.name}</span>
          <span className="playing-card__reps">×{card.reps}</span>
        </div>
      </div>
    );
  }

  const suitSymbol = getSuitSymbol(card.suit);
  const suitColor = getSuitColor(card.suit);
  const valueDisplay = getValueDisplay(card.value);

  return (
    <div className={`playing-card playing-card--${suitColor}`}>
      <div className="playing-card__corner playing-card__corner--top">
        <span className="playing-card__value">{valueDisplay}</span>
        <span className="playing-card__suit">{suitSymbol}</span>
      </div>

      <div className="playing-card__center">
        <span className="playing-card__center-value">{valueDisplay}</span>
        <span className="playing-card__exercise-name">{card.exercise.name}</span>
      </div>

      <div className="playing-card__corner playing-card__corner--bottom">
        <span className="playing-card__value">{valueDisplay}</span>
        <span className="playing-card__suit">{suitSymbol}</span>
      </div>
    </div>
  );
}
