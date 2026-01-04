import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import type { Settings } from '@/types';
import './SettingsScreen.css';

interface SettingsScreenProps {
  settings: Settings;
  onUpdateSettings: (updates: Partial<Settings>) => void;
  onClearData: () => void;
  onBack: () => void;
}

export function SettingsScreen({
  settings,
  onUpdateSettings,
  onClearData,
  onBack,
}: SettingsScreenProps) {
  return (
    <div className="screen settings-screen">
      <Header title="SETTINGS" leftAction={{ label: '← Back', onClick: onBack }} />

      <div className="settings-screen__content">
        <section className="settings-screen__section">
          <h3 className="settings-screen__section-title">Workout Settings</h3>

          <div className="settings-screen__option">
            <div className="settings-screen__option-info">
              <span className="settings-screen__option-label">
                Include Jokers (Wildcards)
              </span>
              <span className="settings-screen__option-description">
                Adds 2 challenge cards to deck
              </span>
            </div>
            <button
              className={`settings-screen__toggle ${
                settings.includeJokers ? 'settings-screen__toggle--on' : ''
              }`}
              onClick={() =>
                onUpdateSettings({ includeJokers: !settings.includeJokers })
              }
              role="switch"
              aria-checked={settings.includeJokers}
            >
              <span className="settings-screen__toggle-knob" />
            </button>
          </div>

          <div className="settings-screen__option">
            <div className="settings-screen__option-info">
              <span className="settings-screen__option-label">Face Card Value</span>
              <span className="settings-screen__option-description">
                J, Q, K rep count
              </span>
            </div>
            <select
              className="settings-screen__select"
              value={settings.faceCardValue}
              onChange={(e) =>
                onUpdateSettings({ faceCardValue: Number(e.target.value) })
              }
            >
              {[8, 9, 10, 11, 12, 13, 14, 15].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <div className="settings-screen__option">
            <div className="settings-screen__option-info">
              <span className="settings-screen__option-label">Ace Value</span>
              <span className="settings-screen__option-description">
                Ace rep count
              </span>
            </div>
            <select
              className="settings-screen__select"
              value={settings.aceValue}
              onChange={(e) =>
                onUpdateSettings({ aceValue: Number(e.target.value) })
              }
            >
              {[1, 10, 11, 12, 13, 14, 15].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <div className="settings-screen__option">
            <div className="settings-screen__option-info">
              <span className="settings-screen__option-label">Sound Effects</span>
            </div>
            <button
              className={`settings-screen__toggle ${
                settings.soundEffects ? 'settings-screen__toggle--on' : ''
              }`}
              onClick={() =>
                onUpdateSettings({ soundEffects: !settings.soundEffects })
              }
              role="switch"
              aria-checked={settings.soundEffects}
            >
              <span className="settings-screen__toggle-knob" />
            </button>
          </div>

          <div className="settings-screen__option">
            <div className="settings-screen__option-info">
              <span className="settings-screen__option-label">
                Vibration on Card Draw
              </span>
            </div>
            <button
              className={`settings-screen__toggle ${
                settings.vibration ? 'settings-screen__toggle--on' : ''
              }`}
              onClick={() => onUpdateSettings({ vibration: !settings.vibration })}
              role="switch"
              aria-checked={settings.vibration}
            >
              <span className="settings-screen__toggle-knob" />
            </button>
          </div>
        </section>

        <section className="settings-screen__section">
          <h3 className="settings-screen__section-title">Data</h3>

          <Button variant="secondary" fullWidth onClick={onClearData}>
            Clear All Data
          </Button>
        </section>

        <section className="settings-screen__section">
          <h3 className="settings-screen__section-title">App</h3>

          <div className="settings-screen__option">
            <div className="settings-screen__option-info">
              <span className="settings-screen__option-label">Theme</span>
            </div>
            <select
              className="settings-screen__select"
              value={settings.theme}
              onChange={(e) =>
                onUpdateSettings({ theme: e.target.value as 'dark' | 'light' })
              }
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div className="settings-screen__version">Version 1.0.0</div>
        </section>
      </div>
    </div>
  );
}
