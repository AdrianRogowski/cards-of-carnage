import { useState, useEffect } from 'react';
import { HomeScreen } from '@/screens/HomeScreen';
import { DeckPreviewScreen } from '@/screens/DeckPreviewScreen';
import { WorkoutScreen } from '@/screens/WorkoutScreen';
import { WorkoutCompleteScreen } from '@/screens/WorkoutCompleteScreen';
import { HistoryScreen } from '@/screens/HistoryScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import {
  createWorkout,
  endWorkoutEarly,
  getWorkoutSummary,
  saveInProgressWorkout,
  loadInProgressWorkout,
  clearInProgressWorkout,
} from '@/lib/workout';
import {
  loadSettings,
  saveSettings,
  updateSettings,
} from '@/lib/settings';
import {
  loadHistory,
  saveHistory,
  addWorkoutToHistory,
  clearHistory,
} from '@/lib/history';
import type { DeckType, WorkoutState, WorkoutSummary, Settings, WorkoutHistory } from '@/types';
import '@/styles/global.css';

type Screen =
  | 'home'
  | 'deck-preview'
  | 'workout'
  | 'workout-complete'
  | 'history'
  | 'settings';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedDeck, setSelectedDeck] = useState<DeckType | null>(null);
  const [workout, setWorkout] = useState<WorkoutState | null>(null);
  const [workoutSummary, setWorkoutSummary] = useState<WorkoutSummary | null>(null);
  const [settings, setSettings] = useState<Settings>(() => loadSettings());
  const [history, setHistory] = useState<WorkoutHistory>(() => loadHistory());
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [savedWorkout, setSavedWorkout] = useState<WorkoutState | null>(null);

  // Check for in-progress workout on mount
  useEffect(() => {
    const saved = loadInProgressWorkout();
    if (saved) {
      setSavedWorkout(saved);
      setShowResumePrompt(true);
    }
  }, []);

  // Persist settings
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Persist history
  useEffect(() => {
    saveHistory(history);
  }, [history]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  // Persist workout whenever it changes
  useEffect(() => {
    if (workout) {
      saveInProgressWorkout(workout);
    }
  }, [workout]);

  // Handle resume prompt
  const handleResumeWorkout = () => {
    if (savedWorkout) {
      setWorkout(savedWorkout);
      setSelectedDeck(savedWorkout.deckType);
      setCurrentScreen('workout');
    }
    setShowResumePrompt(false);
    setSavedWorkout(null);
  };

  const handleDiscardWorkout = () => {
    clearInProgressWorkout();
    setShowResumePrompt(false);
    setSavedWorkout(null);
  };

  // Navigation handlers
  const handleSelectDeck = (deckType: DeckType) => {
    setSelectedDeck(deckType);
    setCurrentScreen('deck-preview');
  };

  const handleStartWorkout = () => {
    if (!selectedDeck) return;
    const newWorkout = createWorkout(selectedDeck, settings);
    setWorkout(newWorkout);
    setCurrentScreen('workout');
  };

  const handleUpdateWorkout = (updatedWorkout: WorkoutState) => {
    setWorkout(updatedWorkout);
  };

  const handleWorkoutComplete = () => {
    if (!workout) return;
    const summary = getWorkoutSummary(workout);
    setWorkoutSummary(summary);
    setHistory((prev) => addWorkoutToHistory(prev, summary));
    clearInProgressWorkout();
    setCurrentScreen('workout-complete');
  };

  const handleEndWorkout = () => {
    if (!workout) return;
    const ended = endWorkoutEarly(workout);
    const summary = getWorkoutSummary(ended);
    setWorkoutSummary(summary);
    setHistory((prev) => addWorkoutToHistory(prev, summary));
    clearInProgressWorkout();
    setCurrentScreen('workout-complete');
  };

  const handleNewWorkout = () => {
    setWorkout(null);
    setWorkoutSummary(null);
    setCurrentScreen('home');
  };

  const handleGoHome = () => {
    setWorkout(null);
    setWorkoutSummary(null);
    setSelectedDeck(null);
    setCurrentScreen('home');
  };

  const handleUpdateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => updateSettings(prev, updates));
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all workout history?')) {
      setHistory(clearHistory(history));
      clearInProgressWorkout();
    }
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onSelectDeck={handleSelectDeck}
            onNavigateHistory={() => setCurrentScreen('history')}
            onNavigateSettings={() => setCurrentScreen('settings')}
          />
        );

      case 'deck-preview':
        return selectedDeck ? (
          <DeckPreviewScreen
            deckType={selectedDeck}
            onBack={handleGoHome}
            onStartWorkout={handleStartWorkout}
          />
        ) : null;

      case 'workout':
        return workout ? (
          <WorkoutScreen
            workout={workout}
            onUpdateWorkout={handleUpdateWorkout}
            onEndWorkout={handleEndWorkout}
            onComplete={handleWorkoutComplete}
          />
        ) : null;

      case 'workout-complete':
        return workoutSummary ? (
          <WorkoutCompleteScreen
            summary={workoutSummary}
            onNewWorkout={handleNewWorkout}
            onGoHome={handleGoHome}
          />
        ) : null;

      case 'history':
        return (
          <HistoryScreen history={history} onBack={() => setCurrentScreen('home')} />
        );

      case 'settings':
        return (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onClearData={handleClearData}
            onBack={() => setCurrentScreen('home')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
      
      {/* Resume Workout Prompt */}
      {showResumePrompt && savedWorkout && (
        <div className="resume-prompt-overlay">
          <div className="resume-prompt">
            <h2 className="resume-prompt__title">🏋️ Resume Workout?</h2>
            <p className="resume-prompt__text">
              You have an unfinished workout from earlier.
            </p>
            <div className="resume-prompt__stats">
              <span>{savedWorkout.completedCards.length}/{savedWorkout.deck.length} cards</span>
              <span>•</span>
              <span>{savedWorkout.totalReps} reps</span>
            </div>
            <div className="resume-prompt__actions">
              <button className="resume-prompt__btn resume-prompt__btn--primary" onClick={handleResumeWorkout}>
                ▶️ Resume
              </button>
              <button className="resume-prompt__btn resume-prompt__btn--secondary" onClick={handleDiscardWorkout}>
                Start Fresh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
