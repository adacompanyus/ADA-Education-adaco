import React, { useState, useEffect } from 'react';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { ParticleBackground } from '@/components/animations/particle-background';
import { Trophy, Clock, X, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PatternPuzzleProps {
  subject: string;
  onClose: () => void;
}

interface Pattern {
  sequence: number[];
  answer: number;
}

export const PatternPuzzle: React.FC<PatternPuzzleProps> = ({ subject, onClose }) => {
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [round, setRound] = useState(1);
  const { toast } = useToast();

  const generatePattern = () => {
    const patterns = [
      // Arithmetic sequences
      { sequence: [2, 4, 6, 8, 10], answer: 12 },
      { sequence: [1, 3, 5, 7, 9], answer: 11 },
      { sequence: [3, 6, 9, 12, 15], answer: 18 },
      { sequence: [5, 10, 15, 20, 25], answer: 30 },
      
      // Fibonacci-like
      { sequence: [1, 1, 2, 3, 5], answer: 8 },
      { sequence: [2, 3, 5, 8, 13], answer: 21 },
      
      // Powers
      { sequence: [1, 4, 9, 16, 25], answer: 36 },
      { sequence: [1, 8, 27, 64, 125], answer: 216 },
      
      // Custom patterns
      { sequence: [1, 4, 7, 10, 13], answer: 16 },
      { sequence: [2, 6, 12, 20, 30], answer: 42 },
    ];
    
    return patterns[Math.floor(Math.random() * patterns.length)];
  };

  const startNewRound = () => {
    setPattern(generatePattern());
    setUserAnswer('');
  };

  const checkAnswer = () => {
    if (!pattern) return;
    
    const answer = parseInt(userAnswer);
    if (answer === pattern.answer) {
      setScore(prev => prev + (10 * round));
      setRound(prev => prev + 1);
      toast({
        title: "Correct!",
        description: `+${10 * round} points`,
      });
      startNewRound();
    } else {
      toast({
        title: "Incorrect",
        description: `The answer was ${pattern.answer}`,
        variant: "destructive"
      });
      startNewRound();
    }
  };

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setRound(1);
    startNewRound();
  };

  if (isGameOver) {
    return (
      <div className="min-h-screen bg-background relative flex flex-col p-6">
        <ParticleBackground />
        
        <div className="relative z-10 flex-1 max-w-md mx-auto w-full flex flex-col justify-center">
          <GradientCard className="text-center p-8">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gradient-orange" />
            <h2 className="text-2xl font-bold gradient-text mb-4">Game Over!</h2>
            <p className="text-text-secondary mb-2">Final Score</p>
            <p className="text-3xl font-bold text-gradient-purple mb-6">{score}</p>
            <p className="text-text-secondary mb-6">Rounds Completed: {round - 1}</p>
            
            <div className="space-y-3">
              <GradientButton onClick={handleRestart} className="w-full">
                Play Again
              </GradientButton>
              <GradientButton variant="secondary" onClick={onClose} className="w-full">
                Close
              </GradientButton>
            </div>
          </GradientCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative flex flex-col p-6">
      <ParticleBackground />
      
      <div className="relative z-10 flex-1 max-w-md mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="gradient-outline rounded-full p-1">
              <div className="gradient-outline-content rounded-full p-2">
                <Sparkles className="w-6 h-6 text-gradient-purple" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">Pattern Puzzle</h1>
              <p className="text-sm text-text-secondary">{subject}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-surface-muted hover:bg-surface-hover transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <GradientCard className="text-center p-3">
            <p className="text-sm text-text-secondary">Score</p>
            <p className="text-lg font-bold text-gradient-purple">{score}</p>
          </GradientCard>
          <GradientCard className="text-center p-3">
            <div className="flex items-center justify-center gap-1">
              <Clock className="w-4 h-4 text-gradient-orange" />
              <span className="text-lg font-bold text-gradient-orange">{timeLeft}s</span>
            </div>
          </GradientCard>
          <GradientCard className="text-center p-3">
            <p className="text-sm text-text-secondary">Round</p>
            <p className="text-lg font-bold text-gradient-purple">{round}</p>
          </GradientCard>
        </div>

        {/* Pattern Display */}
        {pattern && (
          <GradientCard className="mb-6 p-6">
            <h3 className="text-lg font-bold text-text-primary mb-4 text-center">
              Find the Next Number
            </h3>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              {pattern.sequence.map((num, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500/20 to-orange-500/20 flex items-center justify-center border border-card-border"
                >
                  <span className="text-lg font-bold text-text-primary">{num}</span>
                </div>
              ))}
              <div className="w-12 h-12 rounded-lg border-2 border-dashed border-gradient-purple flex items-center justify-center">
                <span className="text-lg font-bold text-gradient-purple">?</span>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter the next number"
                className="w-full p-3 rounded-lg bg-surface border border-card-border text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-gradient-purple"
                onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              />
              
              <GradientButton 
                onClick={checkAnswer} 
                className="w-full"
                disabled={!userAnswer.trim()}
              >
                Submit Answer
              </GradientButton>
            </div>
          </GradientCard>
        )}
      </div>
    </div>
  );
};