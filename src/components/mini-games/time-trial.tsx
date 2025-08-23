import React, { useState, useEffect } from 'react';
import { GradientCard } from '../ui/gradient-card';
import { GradientButton } from '../ui/gradient-button';
import { AP_CURRICULUM } from '@/data/ap-curriculum';
import { 
  Timer, 
  Clock, 
  Trophy,
  Star,
  RotateCcw,
  Zap,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Question {
  front: string;
  back: string;
  unit: string;
}

interface TimeTrialProps {
  subject: string;
  onClose: () => void;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export const TimeTrial: React.FC<TimeTrialProps> = ({ subject, onClose, difficulty = 'Medium' }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameEnded || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameEnded, timeLeft]);

  // Initialize game
  useEffect(() => {
    const curriculum = AP_CURRICULUM[subject] || [];
    if (curriculum.length === 0) return;

    // Get all flashcards and shuffle them
    const allFlashcards = curriculum.flatMap(unit =>
      unit.flashcards.map(card => ({
        ...card,
        unit: unit.name,
      }))
    );

    const shuffledQuestions = allFlashcards
      .sort(() => Math.random() - 0.5)
      .slice(0, 50); // Prepare 50 questions

    setQuestions(shuffledQuestions);
    setGameStarted(true);
  }, [subject]);

  const checkAnswer = () => {
    if (!userAnswer.trim()) return;

    const correctAnswer = questions[currentQuestion].back.toLowerCase();
    const answer = userAnswer.toLowerCase().trim();
    
    // Simple matching - could be improved with fuzzy matching
    const correct = correctAnswer.includes(answer) || answer.includes(correctAnswer) || correctAnswer === answer;
    
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const points = Math.max(10 - Math.floor((120 - timeLeft) / 12), 1) + streak; // Bonus for speed and streak
      setScore(score + points);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1 && timeLeft > 0) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setShowResult(false);
      } else {
        setGameEnded(true);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showResult && userAnswer.trim()) {
      checkAnswer();
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setScore(0);
    setTimeLeft(120);
    setGameStarted(false);
    setGameEnded(false);
    setShowResult(false);
    setStreak(0);
    setMaxStreak(0);
    
    // Reshuffle questions
    const curriculum = AP_CURRICULUM[subject] || [];
    const allFlashcards = curriculum.flatMap(unit =>
      unit.flashcards.map(card => ({
        ...card,
        unit: unit.name,
      }))
    );

    const shuffledQuestions = allFlashcards
      .sort(() => Math.random() - 0.5)
      .slice(0, 50);

    setQuestions(shuffledQuestions);
    setGameStarted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-gradient-orange" />
            <h2 className="text-xl font-bold text-text-primary">Time Trial</h2>
          </div>
          <GradientButton onClick={onClose} variant="secondary" size="sm">
            Close
          </GradientButton>
        </div>
        
        <GradientCard>
          <div className="text-center py-8">
            <p className="text-text-secondary">No curriculum available for {subject}</p>
          </div>
        </GradientCard>
      </div>
    );
  }

  if (gameEnded) {
    const questionsAnswered = currentQuestion + (showResult ? 1 : 0);
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gradient-orange" />
            <h2 className="text-xl font-bold text-text-primary">Time's Up!</h2>
          </div>
          <GradientButton onClick={onClose} variant="secondary" size="sm">
            Close
          </GradientButton>
        </div>
        
        <GradientCard>
          <div className="text-center space-y-4">
            <div className="gradient-outline rounded-full p-1 w-20 h-20 mx-auto">
              <div className="gradient-outline-content rounded-full w-full h-full bg-surface flex items-center justify-center">
                <Timer className="w-10 h-10 text-gradient-orange" />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold gradient-text">{score} Points</h3>
              <p className="text-text-secondary">{questionsAnswered} questions answered</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-gradient-purple">{maxStreak}</p>
                <p className="text-xs text-text-muted">Best Streak</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gradient-orange">{Math.round((score / Math.max(questionsAnswered, 1)) * 10) / 10}</p>
                <p className="text-xs text-text-muted">Avg Points</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-2">
              {Array.from({ length: 5 }, (_, i) => {
                const stars = Math.min(5, Math.floor(score / 20));
                return (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i < stars ? 'text-gradient-orange' : 'text-text-muted'}`}
                    fill={i < stars ? 'currentColor' : 'none'}
                  />
                );
              })}
            </div>
            
            <div className="space-y-2">
              <p className="text-gaming-xp font-semibold">+50 XP Earned!</p>
              {score >= 100 && <p className="text-gaming-success">🚀 Speed demon!</p>}
              {score >= 50 && score < 100 && <p className="text-gradient-orange">⚡ Good pace!</p>}
              {score < 50 && <p className="text-text-secondary">🏃‍♀️ Keep practicing!</p>}
            </div>
            
            <GradientButton onClick={resetGame} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </GradientButton>
          </div>
        </GradientCard>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-gradient-orange" />
          <h2 className="text-xl font-bold text-text-primary">Time Trial</h2>
        </div>
        <GradientButton onClick={onClose} variant="secondary" size="sm">
          Close
        </GradientButton>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-4 gap-2">
        <GradientCard className="text-center p-2">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-3 h-3 text-gradient-purple" />
          </div>
          <span className={`text-sm font-bold ${timeLeft <= 20 ? 'text-gaming-error animate-pulse' : 'gradient-text'}`}>
            {formatTime(timeLeft)}
          </span>
        </GradientCard>
        
        <GradientCard className="text-center p-2">
          <div className="text-xs font-medium text-text-primary mb-1">Score</div>
          <span className="text-sm font-bold gradient-text">{score}</span>
        </GradientCard>
        
        <GradientCard className="text-center p-2">
          <div className="text-xs font-medium text-text-primary mb-1">Streak</div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm font-bold gradient-text">{streak}</span>
            {streak > 0 && <Zap className="w-3 h-3 text-gradient-orange" />}
          </div>
        </GradientCard>
        
        <GradientCard className="text-center p-2">
          <div className="text-xs font-medium text-text-primary mb-1">Question</div>
          <span className="text-sm font-bold gradient-text">{currentQuestion + 1}</span>
        </GradientCard>
      </div>

      {/* Current Question */}
      <GradientCard>
        <div className="space-y-4">
          <div>
            <div className="text-xs text-text-muted mb-2">From: {currentQ.unit}</div>
            <h3 className="text-lg font-medium text-text-primary mb-4">
              {currentQ.front}
            </h3>
          </div>
          
          {!showResult ? (
            <div className="space-y-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer..."
                className="w-full p-3 rounded-lg border border-card-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-gradient-purple"
                autoFocus
              />
              
              <GradientButton 
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="w-full"
              >
                Submit Answer
              </GradientButton>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-3 rounded-lg ${isCorrect ? 'bg-gaming-success/10 border border-gaming-success' : 'bg-gaming-error/10 border border-gaming-error'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-gaming-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gaming-error" />
                  )}
                  <span className={`font-medium ${isCorrect ? 'text-gaming-success' : 'text-gaming-error'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                
                <div className="text-sm text-text-primary">
                  <strong>Correct Answer:</strong> {currentQ.back}
                </div>
                
                {userAnswer && (
                  <div className="text-sm text-text-secondary mt-1">
                    <strong>Your Answer:</strong> {userAnswer}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </GradientCard>

      <div className="text-center">
        <p className="text-xs text-text-muted">
          Answer as many questions as you can in 2 minutes! • {subject}
        </p>
      </div>
    </div>
  );
};