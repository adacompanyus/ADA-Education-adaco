import React, { useState } from 'react';
import { DifficultySelector } from './difficulty-selector';
import { QuickQuiz } from './mini-games/quick-quiz';
import { MemoryMatch } from './mini-games/memory-match';
import { TimeTrial } from './mini-games/time-trial';
import { WordScramble } from './mini-games/word-scramble';
import { SpeedMatch } from './mini-games/speed-match';

interface MiniGameLauncherProps {
  gameId: string;
  subject: string;
  onClose: () => void;
}

type Difficulty = 'Easy' | 'Medium' | 'Hard';

export const MiniGameLauncher: React.FC<MiniGameLauncherProps> = ({
  gameId,
  subject,
  onClose
}) => {
  const [showDifficultySelector, setShowDifficultySelector] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Medium');
  const [gameStarted, setGameStarted] = useState(false);

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultySelector(false);
    setGameStarted(true);
  };

  const handleGameClose = () => {
    setGameStarted(false);
    onClose();
  };

  const getGameTitle = (id: string) => {
    switch (id) {
      case 'quick-quiz': return 'Quick Quiz';
      case 'memory-match': return 'Memory Match';
      case 'time-trial': return 'Time Trial';
      case 'word-scramble': return 'Word Scramble';
      case 'speed-match': return 'Speed Match';
      default: return 'Mini Game';
    }
  };

  const renderGame = () => {
    switch (gameId) {
      case 'quick-quiz':
        return <QuickQuiz subject={subject} onClose={handleGameClose} difficulty={selectedDifficulty} />;
      case 'memory-match':
        return <MemoryMatch subject={subject} onClose={handleGameClose} difficulty={selectedDifficulty} />;
      case 'time-trial':
        return <TimeTrial subject={subject} onClose={handleGameClose} difficulty={selectedDifficulty} />;
      case 'word-scramble':
        return <WordScramble subject={subject} onClose={handleGameClose} difficulty={selectedDifficulty} />;
      case 'speed-match':
        return <SpeedMatch subject={subject} onClose={handleGameClose} difficulty={selectedDifficulty} />;
      default:
        return null;
    }
  };

  if (showDifficultySelector) {
    return (
      <DifficultySelector
        gameType={getGameTitle(gameId)}
        onSelect={handleDifficultySelect}
        onClose={onClose}
      />
    );
  }

  if (gameStarted) {
    return renderGame();
  }

  return null;
};