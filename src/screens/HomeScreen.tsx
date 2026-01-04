import { DECKS } from '@/lib/deck';
import { DeckCard } from '@/components/DeckCard';
import type { DeckType } from '@/types';
import './HomeScreen.css';

interface HomeScreenProps {
  onSelectDeck: (deckType: DeckType) => void;
  onNavigateHistory: () => void;
  onNavigateSettings: () => void;
}

const deckOrder: DeckType[] = ['upper-body', 'lower-body', 'core-cardio', 'full-body'];

export function HomeScreen({
  onSelectDeck,
  onNavigateHistory,
  onNavigateSettings,
}: HomeScreenProps) {
  return (
    <div className="screen home-screen">
      <div className="home-screen__header">
        <span className="home-screen__logo">💀</span>
        <h1 className="home-screen__title">CARDS OF CARNAGE</h1>
      </div>

      <div className="home-screen__content">
        <h2 className="home-screen__subtitle">Choose Your Deck</h2>
        
        <div className="home-screen__grid">
          {deckOrder.map((deckType) => (
            <DeckCard
              key={deckType}
              deck={DECKS[deckType]}
              onClick={() => onSelectDeck(deckType)}
            />
          ))}
        </div>
      </div>

      <footer className="home-screen__footer">
        <button className="home-screen__nav-btn" onClick={onNavigateHistory}>
          <span className="home-screen__nav-icon">📊</span>
          <span>History</span>
        </button>
        <button className="home-screen__nav-btn" onClick={onNavigateSettings}>
          <span className="home-screen__nav-icon">⚙️</span>
          <span>Settings</span>
        </button>
      </footer>
    </div>
  );
}
