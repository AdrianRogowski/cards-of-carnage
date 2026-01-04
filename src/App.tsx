import { useState, useEffect } from 'react';
import { HomeScreen } from '@/screens/HomeScreen';
import { DeckPreviewScreen } from '@/screens/DeckPreviewScreen';
import { WorkoutScreen } from '@/screens/WorkoutScreen';
import { WorkoutCompleteScreen } from '@/screens/WorkoutCompleteScreen';
import { HistoryScreen } from '@/screens/HistoryScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { createWorkout, endWorkoutEarly, getWorkoutSummary } from '@/lib/workout';
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

  // Persist settings
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Persist history
  useEffect(() => {
    saveHistory(history);
  }, [history]);

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
    setCurrentScreen('workout-complete');
  };

  const handleEndWorkout = () => {
    if (!workout) return;
    const ended = endWorkoutEarly(workout);
    const summary = getWorkoutSummary(ended);
    setWorkoutSummary(summary);
    setHistory((prev) => addWorkoutToHistory(prev, summary));
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

  return <div className="app">{renderScreen()}</div>;
}
