import React, { useState, useEffect } from 'react';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { ParticleBackground } from '@/components/animations/particle-background';
import { Trophy, Clock, X, Grid } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface LogicGridProps {
  subject: string;
  onClose: () => void;
}

interface GridCell {
  value: number;
  isClue: boolean;
  userValue?: number;
}

export const LogicGrid: React.FC<LogicGridProps> = ({ subject, onClose }) => {
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const { toast } = useToast();

  const generateSudoku = () => {
    // Simple 4x4 Sudoku for mobile
    const solutions = [
      [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 1, 4, 3],
        [4, 3, 2, 1]
      ],
      [
        [2, 3, 4, 1],
        [4, 1, 2, 3],
        [1, 4, 3, 2],
        [3, 2, 1, 4]
      ],
      [
        [3, 1, 4, 2],
        [2, 4, 1, 3],
        [4, 2, 3, 1],
        [1, 3, 2, 4]
      ]
    ];

    const selectedSolution = solutions[Math.floor(Math.random() * solutions.length)];
    setSolution(selectedSolution);

    // Create puzzle by removing some numbers
    const puzzle: GridCell[][] = selectedSolution.map(row =>
      row.map(cell => ({
        value: cell,
        isClue: Math.random() > 0.6, // 40% chance to show as clue
        userValue: undefined
      }))
    );

    // Ensure at least one clue per row and column
    for (let i = 0; i < 4; i++) {
      if (!puzzle[i].some(cell => cell.isClue)) {
        puzzle[i][Math.floor(Math.random() * 4)].isClue = true;
      }
      if (!puzzle.some(row => row[i].isClue)) {
        puzzle[Math.floor(Math.random() * 4)][i].isClue = true;
      }
    }

    setGrid(puzzle);
  };

  const updateCell = (row: number, col: number, value: string) => {
    const numValue = parseInt(value) || undefined;
    if (numValue && (numValue < 1 || numValue > 4)) return;

    setGrid(prev => prev.map((gridRow, r) =>
      gridRow.map((cell, c) => {
        if (r === row && c === col && !cell.isClue) {
          return { ...cell, userValue: numValue };
        }
        return cell;
      })
    ));
  };

  const checkSolution = () => {
    let isComplete = true;
    let isCorrect = true;

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const cell = grid[row][col];
        const expectedValue = solution[row][col];
        const actualValue = cell.isClue ? cell.value : cell.userValue;

        if (!actualValue) {
          isComplete = false;
        } else if (actualValue !== expectedValue) {
          isCorrect = false;
        }
      }
    }

    if (isComplete && isCorrect) {
      setIsWin(true);
      setIsGameOver(true);
      setScore(1000 + timeLeft * 10);
      toast({
        title: "Congratulations!",
        description: "You solved the puzzle!",
      });
    } else if (isComplete && !isCorrect) {
      toast({
        title: "Not quite right",
        description: "Check your answers and try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    generateSudoku();
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
    setTimeLeft(180);
    setIsGameOver(false);
    setIsWin(false);
    generateSudoku();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isGameOver) {
    return (
      <div className="min-h-screen bg-background relative flex flex-col p-6">
        <ParticleBackground />
        
        <div className="relative z-10 flex-1 max-w-md mx-auto w-full flex flex-col justify-center">
          <GradientCard className="text-center p-8">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gradient-orange" />
            <h2 className="text-2xl font-bold gradient-text mb-4">
              {isWin ? 'Puzzle Solved!' : 'Time\'s Up!'}
            </h2>
            <p className="text-text-secondary mb-2">Final Score</p>
            <p className="text-3xl font-bold text-gradient-purple mb-6">{score}</p>
            
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
                <Grid className="w-6 h-6 text-gradient-purple" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">Logic Grid</h1>
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
        <div className="grid grid-cols-2 gap-4 mb-6">
          <GradientCard className="text-center p-3">
            <p className="text-sm text-text-secondary">Score</p>
            <p className="text-lg font-bold text-gradient-purple">{score}</p>
          </GradientCard>
          <GradientCard className="text-center p-3">
            <div className="flex items-center justify-center gap-1">
              <Clock className="w-4 h-4 text-gradient-orange" />
              <span className="text-lg font-bold text-gradient-orange">{formatTime(timeLeft)}</span>
            </div>
          </GradientCard>
        </div>

        {/* Instructions */}
        <GradientCard className="mb-6 p-4">
          <h3 className="font-bold text-text-primary mb-2">How to Play:</h3>
          <p className="text-sm text-text-secondary">
            Fill the 4×4 grid so each row, column, and 2×2 box contains numbers 1-4 exactly once.
          </p>
        </GradientCard>

        {/* Sudoku Grid */}
        <GradientCard className="mb-6 p-4">
          <div className="grid grid-cols-4 gap-1 max-w-64 mx-auto">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center ${
                    (Math.floor(rowIndex / 2) + Math.floor(colIndex / 2)) % 2 === 0
                      ? 'bg-surface-muted/50'
                      : 'bg-surface'
                  } ${
                    cell.isClue
                      ? 'border-gradient-purple'
                      : 'border-card-border'
                  }`}
                >
                  {cell.isClue ? (
                    <span className="text-lg font-bold text-gradient-purple">
                      {cell.value}
                    </span>
                  ) : (
                    <input
                      type="text"
                      value={cell.userValue || ''}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      className="w-full h-full text-center text-lg font-bold bg-transparent text-text-primary focus:outline-none focus:ring-2 focus:ring-gradient-orange rounded-lg"
                      maxLength={1}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </GradientCard>

        <GradientButton onClick={checkSolution} className="w-full mb-4">
          Check Solution
        </GradientButton>
      </div>
    </div>
  );
};