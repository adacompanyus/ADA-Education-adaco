import React, { useState, useEffect } from 'react';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { Clock, X, RotateCcw } from 'lucide-react';
import { AP_CURRICULUM } from '@/data/ap-curriculum';

interface WordScrambleProps {
  subject: string;
  onClose: () => void;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

interface Question {
  original: string;
  scrambled: string;
  hint: string;
}

export const WordScramble: React.FC<WordScrambleProps> = ({ subject, onClose, difficulty = 'Medium' }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  // Adjust time based on difficulty
  const getTimeByDifficulty = () => {
    switch (difficulty) {
      case 'Easy': return 120;    // 2 minutes
      case 'Medium': return 90;   // 1.5 minutes
      case 'Hard': return 60;     // 1 minute
      default: return 90;
    }
  };

  const [timeLeft, setTimeLeft] = useState(getTimeByDifficulty());
  const [gameOver, setGameOver] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const scrambleWord = (word: string): string => {
    const chars = word.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
  };

  const extractWords = (text: string): string[] => {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length >= 4 && word.length <= 10);
  };

  useEffect(() => {
    const curriculum = AP_CURRICULUM[subject];
    if (!curriculum) {
      setQuestions([]);
      return;
    }

    const allWords: { word: string; hint: string }[] = [];
    
    curriculum.forEach(unit => {
      unit.flashcards.forEach(card => {
        const frontWords = extractWords(card.front);
        const backWords = extractWords(card.back);
        
        frontWords.forEach(word => {
          if (word.length >= 4) {
            allWords.push({ word, hint: card.back.substring(0, 50) + '...' });
          }
        });
        
        backWords.forEach(word => {
          if (word.length >= 4) {
            allWords.push({ word, hint: card.front });
          }
        });
      });
    });

    const uniqueWords = Array.from(
      new Map(allWords.map(item => [item.word, item])).values()
    );

    const shuffled = uniqueWords.sort(() => Math.random() - 0.5).slice(0, 15);
    
    const gameQuestions = shuffled.map(({ word, hint }) => ({
      original: word,
      scrambled: scrambleWord(word),
      hint
    }));

    setQuestions(gameQuestions);
  }, [subject]);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const checkAnswer = () => {
    if (!questions[currentQuestion]) return;

    const isAnswerCorrect = userAnswer.toLowerCase().trim() === questions[currentQuestion].original;
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    if (isAnswerCorrect) {
      setScore(score + 10);
    }

    setTimeout(() => {
      setShowResult(false);
      setUserAnswer('');
      
      if (currentQuestion + 1 >= questions.length) {
        setGameOver(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer.trim()) {
      checkAnswer();
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setScore(0);
    setTimeLeft(getTimeByDifficulty());
    setGameOver(false);
    setShowResult(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <GradientCard className="w-full max-w-md">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold gradient-text">No Content Available</h3>
            <p className="text-text-secondary">No suitable words found for Word Scramble in {subject}.</p>
            <GradientButton onClick={onClose}>Close</GradientButton>
          </div>
        </GradientCard>
      </div>
    );
  }

  if (gameOver) {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <GradientCard className="w-full max-w-md">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Game Over!</h3>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-gaming-success">{score} points</p>
              <p className="text-text-secondary">{percentage}% accuracy</p>
              <p className="text-sm text-text-muted">{currentQuestion} words completed</p>
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <GradientCard className="w-full max-w-md">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold gradient-text">Word Scramble</h3>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gaming-warning" />
              <span className="text-gaming-warning font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <div className="text-gaming-success font-semibold">Score: {score}</div>
            <div className="text-text-secondary">
              {currentQuestion + 1}/{questions.length}
            </div>
          </div>

          {/* Question */}
          <div className="text-center space-y-3">
            <div className="text-2xl font-mono font-bold gradient-text tracking-wider">
              {questions[currentQuestion]?.scrambled.toUpperCase()}
            </div>
            <p className="text-sm text-text-secondary">
              Hint: {questions[currentQuestion]?.hint}
            </p>
          </div>

          {/* Input */}
          <div className="space-y-3">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Unscramble the word..."
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-gradient-purple"
              disabled={showResult}
            />
            
            {showResult && (
              <div className={`text-center py-2 px-4 rounded-lg ${
                isCorrect ? 'bg-gaming-success/20 text-gaming-success' : 'bg-gaming-error/20 text-gaming-error'
              }`}>
                {isCorrect ? '✓ Correct!' : `✗ Wrong! It was "${questions[currentQuestion]?.original}"`}
              </div>
            )}

            <GradientButton
              onClick={checkAnswer}
              disabled={!userAnswer.trim() || showResult}
              className="w-full"
            >
              Submit Answer
            </GradientButton>
          </div>
        </div>
      </GradientCard>
    </div>
  );
};