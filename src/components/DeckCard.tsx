import type { DeckDefinition } from '@/types';
import './DeckCard.css';

interface DeckCardProps {
  deck: DeckDefinition;
  onClick: () => void;
}

export function DeckCard({ deck, onClick }: DeckCardProps) {
  return (
    <button className="deck-card" onClick={onClick}>
      <span className="deck-card__icon">{deck.icon}</span>
      <span className="deck-card__name">{deck.name}</span>
      <span className="deck-card__info">{deck.exercises.length} exercises</span>
      <span className="deck-card__info">52 cards</span>
    </button>
  );
}
