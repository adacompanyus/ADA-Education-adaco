import React, { useState, useEffect } from 'react';
import { GradientCard } from '../ui/gradient-card';
import { GradientButton } from '../ui/gradient-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AP_CURRICULUM } from '@/data/ap-curriculum';
import { 
  Brain, 
  Clock, 
  Trophy,
  Star,
  RotateCcw,
  CheckCircle
} from 'lucide-react';

interface Card {
  id: string;
  content: string;
  type: 'front' | 'back';
  matchId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryMatchProps {
  subject: string;
  onClose: () => void;
}

export const MemoryMatch: React.FC<MemoryMatchProps> = ({ subject, onClose }) => {
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  // Adjust pairs based on difficulty
  const getPairsByDifficulty = () => {
    switch (difficulty) {
      case 'Easy': return 4;    // 4 pairs = 8 cards
      case 'Medium': return 6;  // 6 pairs = 12 cards 
      case 'Hard': return 8;    // 8 pairs = 16 cards
      default: return 6;
    }
  };
  
  const totalPairs = getPairsByDifficulty();

  // Timer
  useEffect(() => {
    if (!gameStarted || gameEnded) return;

    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameEnded]);

  // Initialize game
  useEffect(() => {
    const curriculum = AP_CURRICULUM[subject] || [];
    if (curriculum.length === 0) return;

    // Get random flashcards from the curriculum
    const allFlashcards = curriculum.flatMap(unit => unit.flashcards);
    const selectedFlashcards = allFlashcards
      .sort(() => Math.random() - 0.5)
      .slice(0, totalPairs);

    // Create card pairs
    const gameCards: Card[] = [];
    selectedFlashcards.forEach((flashcard, index) => {
      const matchId = `match-${index}`;
      gameCards.push({
        id: `front-${index}`,
        content: flashcard.front,
        type: 'front',
        matchId,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: `back-${index}`,
        content: flashcard.back,
        type: 'back',
        matchId,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setGameStarted(true);
  }, [subject, difficulty]);

  const handleCardClick = (clickedCard: Card) => {
    if (
      clickedCard.isFlipped || 
      clickedCard.isMatched || 
      flippedCards.length >= 2 ||
      gameEnded
    ) {
      return;
    }

    const newCards = cards.map(card =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      // Check for match after a short delay
      setTimeout(() => {
        const [card1, card2] = newFlippedCards;
        
        if (card1.matchId === card2.matchId) {
          // Match found!
          setCards(prevCards =>
            prevCards.map(card =>
              card.matchId === card1.matchId
                ? { ...card, isMatched: true, isFlipped: true }
                : card
            )
          );
          setMatches(matches + 1);
          
          // Check if game is complete
          if (matches + 1 === totalPairs) {
            setGameEnded(true);
          }
        } else {
          // No match, flip cards back
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === card1.id || card.id === card2.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }
        
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setGameEnded(false);
    
    // Re-initialize cards
    const curriculum = AP_CURRICULUM[subject] || [];
    const allFlashcards = curriculum.flatMap(unit => unit.flashcards);
    const selectedFlashcards = allFlashcards
      .sort(() => Math.random() - 0.5)
      .slice(0, totalPairs);

    const gameCards: Card[] = [];
    selectedFlashcards.forEach((flashcard, index) => {
      const matchId = `match-${index}`;
      gameCards.push({
        id: `front-${index}`,
        content: flashcard.front,
        type: 'front',
        matchId,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: `back-${index}`,
        content: flashcard.back,
        type: 'back',
        matchId,
        isFlipped: false,
        isMatched: false,
      });
    });

    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setGameStarted(true);
  };

  const handleDifficultyChange = (newDifficulty: 'Easy' | 'Medium' | 'Hard') => {
    setDifficulty(newDifficulty);
    // Difficulty change will trigger useEffect to restart the game
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameEnded) {
    const score = Math.max(1000 - (moves * 10) - (timeElapsed * 5), 100);
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gradient-orange" />
            <h2 className="text-xl font-bold text-text-primary">Game Complete!</h2>
          </div>
          <GradientButton onClick={onClose} variant="secondary" size="sm">
            Close
          </GradientButton>
        </div>
        
        <GradientCard>
          <div className="text-center space-y-4">
            <div className="gradient-outline rounded-full p-1 w-20 h-20 mx-auto">
              <div className="gradient-outline-content rounded-full w-full h-full bg-surface flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-gaming-success" />
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold gradient-text">Congratulations!</h3>
              <p className="text-text-secondary">You matched all pairs!</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gradient-purple">{moves}</p>
                <p className="text-xs text-text-muted">Moves</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gradient-orange">{formatTime(timeElapsed)}</p>
                <p className="text-xs text-text-muted">Time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gaming-xp">{score}</p>
                <p className="text-xs text-text-muted">Score</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-2">
              {Array.from({ length: 5 }, (_, i) => {
                const stars = Math.min(5, Math.floor(score / 200));
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
              <p className="text-gaming-xp font-semibold">+35 XP Earned!</p>
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-gradient-purple" />
          <h2 className="text-xl font-bold text-text-primary">Memory Match</h2>
        </div>
        <div className="flex items-center gap-2">
          <Select value={difficulty} onValueChange={handleDifficultyChange}>
            <SelectTrigger className="w-24 h-8 text-xs bg-surface border-card-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-surface border-card-border">
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <GradientButton onClick={onClose} variant="secondary" size="sm">
            Close
          </GradientButton>
        </div>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-4">
        <GradientCard className="text-center p-3">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-gradient-purple" />
            <span className="text-sm font-medium text-text-primary">Time</span>
          </div>
          <span className="text-lg font-bold gradient-text">{formatTime(timeElapsed)}</span>
        </GradientCard>
        
        <GradientCard className="text-center p-3">
          <div className="text-sm font-medium text-text-primary mb-1">Moves</div>
          <span className="text-lg font-bold gradient-text">{moves}</span>
        </GradientCard>
        
        <GradientCard className="text-center p-3">
          <div className="text-sm font-medium text-text-primary mb-1">Matches</div>
          <span className="text-lg font-bold gradient-text">{matches}/{totalPairs}</span>
        </GradientCard>
      </div>

      {/* Game Grid */}
      <div className={`grid gap-3 ${totalPairs <= 4 ? 'grid-cols-4' : totalPairs <= 6 ? 'grid-cols-4' : 'grid-cols-4'}`}>
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={`aspect-square p-2 rounded-lg border-2 transition-all ${
              card.isFlipped || card.isMatched
                ? card.isMatched
                  ? 'border-gaming-success bg-gaming-success/10'
                  : card.type === 'front'
                  ? 'border-gradient-purple bg-gradient-to-br from-purple-500/20 to-purple-600/20'
                  : 'border-gradient-orange bg-gradient-to-br from-orange-500/20 to-orange-600/20'
                : 'border-card-border bg-surface hover:border-gradient-purple/50'
            }`}
          >
            <div className="h-full flex items-center justify-center">
              {card.isFlipped || card.isMatched ? (
                <div className="text-center">
                  <p className="text-xs font-medium text-text-primary leading-tight">
                    {card.content}
                  </p>
                  {card.isMatched && (
                    <CheckCircle className="w-4 h-4 text-gaming-success mx-auto mt-1" />
                  )}
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold">?</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-text-muted">
          Match questions with their answers • Subject: {subject}
        </p>
      </div>
    </div>
  );
};