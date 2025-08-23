import React, { useState, useEffect } from 'react';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { Clock, X, RotateCcw, Zap } from 'lucide-react';
import { AP_CURRICULUM } from '@/data/ap-curriculum';

interface SpeedMatchProps {
  subject: string;
  onClose: () => void;
}

interface MatchPair {
  id: string;
  question: string;
  answer: string;
}

export const SpeedMatch: React.FC<SpeedMatchProps> = ({ subject, onClose }) => {
  const [pairs, setPairs] = useState<MatchPair[]>([]);
  const [currentPair, setCurrentPair] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

  useEffect(() => {
    const curriculum = AP_CURRICULUM[subject];
    if (!curriculum) return;

    const allFlashcards: MatchPair[] = [];
    curriculum.forEach(unit => {
      unit.flashcards.forEach((card, index) => {
        allFlashcards.push({
          id: `${unit.id}-${index}`,
          question: card.front,
          answer: card.back
        });
      });
    });

    const shuffled = allFlashcards.sort(() => Math.random() - 0.5).slice(0, 20);
    setPairs(shuffled);
  }, [subject]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && pairs.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, pairs.length]);

  const generateAnswerOptions = () => {
    if (!pairs[currentPair]) return [];
    
    const correctAnswer = pairs[currentPair].answer;
    const otherAnswers = pairs
      .filter((_, index) => index !== currentPair)
      .map(pair => pair.answer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    return [correctAnswer, ...otherAnswers].sort(() => Math.random() - 0.5);
  };

  const handleAnswerSelect = (selectedAnswer: string) => {
    if (showResult) return;

    const correct = selectedAnswer === pairs[currentPair]?.answer;
    setLastAnswerCorrect(correct);
    setShowResult(true);

    if (correct) {
      const points = 10 + (streak * 2); // Bonus points for streaks
      setScore(score + points);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setShowResult(false);
      if (currentPair + 1 >= pairs.length) {
        setGameOver(true);
      } else {
        setCurrentPair(currentPair + 1);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentPair(0);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setStreak(0);
    setMaxStreak(0);
    setShowResult(false);
    setSelectedAnswers([]);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (pairs.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <GradientCard className="w-full max-w-md">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold gradient-text">Loading...</h3>
            <p className="text-text-secondary">Preparing Speed Match for {subject}</p>
          </div>
        </GradientCard>
      </div>
    );
  }

  if (gameOver) {
    const accuracy = Math.round((score / ((currentPair + 1) * 10)) * 100);
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <GradientCard className="w-full max-w-md">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Speed Match Complete!</h3>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-gaming-success">{score}</p>
              <p className="text-sm text-text-secondary">Final Score</p>
              <div className="flex justify-around text-sm">
                <div>
                  <p className="text-gaming-warning font-semibold">{maxStreak}</p>
                  <p className="text-text-muted">Best Streak</p>
                </div>
                <div>
                  <p className="text-gaming-info font-semibold">{currentPair + 1}</p>
                  <p className="text-text-muted">Questions</p>
                </div>
                <div>
                  <p className="text-gradient-purple font-semibold">{accuracy}%</p>
                  <p className="text-text-muted">Accuracy</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <GradientButton onClick={resetGame} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </GradientButton>
              <GradientButton variant="secondary" onClick={onClose} className="flex-1">
                Close
              </GradientButton>
            </div>
          </div>
        </GradientCard>
      </div>
    );
  }

  const answerOptions = generateAnswerOptions();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <GradientCard className="w-full max-w-lg">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold gradient-text">Speed Match</h3>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gaming-warning" />
              <span className="text-gaming-warning font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gaming-xp" />
              <span className="text-gaming-xp font-semibold">x{streak}</span>
            </div>
            <div className="text-gaming-success font-semibold">Score: {score}</div>
          </div>

          {/* Progress */}
          <div className="w-full bg-surface-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPair + 1) / pairs.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-text-primary mb-4">
              {pairs[currentPair]?.question}
            </h4>
            <p className="text-sm text-text-secondary mb-4">
              Question {currentPair + 1} of {pairs.length}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-2">
            {answerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`w-full p-3 text-left rounded-lg border transition-all ${
                  showResult
                    ? option === pairs[currentPair]?.answer
                      ? 'bg-gaming-success/20 border-gaming-success text-gaming-success'
                      : 'bg-surface border-card-border text-text-secondary'
                    : 'bg-surface border-card-border text-text-primary hover:border-gradient-purple hover:bg-surface-muted'
                }`}
              >
                <div className="font-medium">{option}</div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`text-center py-2 px-4 rounded-lg ${
              lastAnswerCorrect ? 'bg-gaming-success/20 text-gaming-success' : 'bg-gaming-error/20 text-gaming-error'
            }`}>
              {lastAnswerCorrect ? `✓ Correct! +${10 + ((streak - 1) * 2)} points` : '✗ Wrong answer'}
            </div>
          )}
        </div>
      </GradientCard>
    </div>
  );
};