import React from 'react';
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
  const selectedDifficulty: Difficulty = 'Medium';

  const renderGame = () => {
    switch (gameId) {
      case 'quick-quiz':
        return <QuickQuiz subject={subject} onClose={onClose} difficulty={selectedDifficulty} />;
      case 'memory-match':
        return <MemoryMatch subject={subject} onClose={onClose} difficulty={selectedDifficulty} />;
      case 'time-trial':
        return <TimeTrial subject={subject} onClose={onClose} difficulty={selectedDifficulty} />;
      case 'word-scramble':
        return <WordScramble subject={subject} onClose={onClose} difficulty={selectedDifficulty} />;
      case 'speed-match':
        return <SpeedMatch subject={subject} onClose={onClose} difficulty={selectedDifficulty} />;
      default:
        return null;
    }
  };

  return renderGame();
};