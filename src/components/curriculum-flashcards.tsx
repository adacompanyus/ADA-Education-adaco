import React, { useState, useEffect } from 'react';
import { GradientCard } from './ui/gradient-card';
import { GradientButton } from './ui/gradient-button';
import { AP_CURRICULUM, CurriculumUnit } from '@/data/ap-curriculum';
import { 
  Brain, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle,
  Star,
  Target,
  BookOpen,
  ChevronDown,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurriculumFlashcardsProps {
  selectedSubject: string;
}

export const CurriculumFlashcards: React.FC<CurriculumFlashcardsProps> = ({ selectedSubject }) => {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [flashcards, setFlashcards] = useState<Array<{ front: string; back: string; unit: string }>>([]);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);

  const curriculum = AP_CURRICULUM[selectedSubject] || [];

  // Initialize flashcards when subject or unit changes
  useEffect(() => {
    let cards: Array<{ front: string; back: string; unit: string }> = [];
    
    if (selectedUnit) {
      // Show cards from specific unit
      const unit = curriculum.find(u => u.id === selectedUnit);
      if (unit) {
        cards = unit.flashcards.map(card => ({
          ...card,
          unit: unit.name
        }));
      }
    } else {
      // Show all cards from all units
      cards = curriculum.flatMap(unit => 
        unit.flashcards.map(card => ({
          ...card,
          unit: unit.name
        }))
      );
    }
    
    setFlashcards(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsShuffled(false);
  }, [selectedSubject, selectedUnit, curriculum]);

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsShuffled(true);
  };

  const resetOrder = () => {
    // Re-initialize cards in original order
    let cards: Array<{ front: string; back: string; unit: string }> = [];
    
    if (selectedUnit) {
      const unit = curriculum.find(u => u.id === selectedUnit);
      if (unit) {
        cards = unit.flashcards.map(card => ({
          ...card,
          unit: unit.name
        }));
      }
    } else {
      cards = curriculum.flatMap(unit => 
        unit.flashcards.map(card => ({
          ...card,
          unit: unit.name
        }))
      );
    }
    
    setFlashcards(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsShuffled(false);
  };

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const currentCard = flashcards[currentIndex];

  if (curriculum.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-gradient-purple" />
          <h3 className="text-lg font-semibold text-text-primary">AP Curriculum Flashcards</h3>
        </div>
        <GradientCard>
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">No curriculum available for {selectedSubject}</p>
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
          <h3 className="text-lg font-semibold text-text-primary">AP Curriculum Flashcards</h3>
        </div>
        
        <div className="flex gap-2">
          {isShuffled ? (
            <GradientButton onClick={resetOrder} size="sm" variant="secondary">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </GradientButton>
          ) : (
            <GradientButton onClick={shuffleCards} size="sm" variant="secondary">
              <Shuffle className="w-4 h-4 mr-1" />
              Shuffle
            </GradientButton>
          )}
        </div>
      </div>

      {/* Unit Selector */}
      <div className="relative">
        <button
          onClick={() => setShowUnitDropdown(!showUnitDropdown)}
          className="w-full gradient-outline rounded-lg p-1"
        >
          <div className="gradient-outline-content px-4 py-3 flex items-center justify-between">
            <span className="font-medium text-text-primary">
              {selectedUnit ? curriculum.find(u => u.id === selectedUnit)?.name : 'All Units'}
            </span>
            <ChevronDown className="w-5 h-5 text-gradient-purple" />
          </div>
        </button>

        {showUnitDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 gradient-outline rounded-lg p-1 z-50 animate-scale-in bg-background">
            <div className="gradient-outline-content rounded-lg max-h-48 overflow-y-auto">
              <button
                onClick={() => {
                  setSelectedUnit(null);
                  setShowUnitDropdown(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 hover:bg-surface-muted transition-colors",
                  !selectedUnit ? "bg-surface-muted text-gradient-purple" : "text-text-primary"
                )}
              >
                All Units ({curriculum.reduce((sum, unit) => sum + unit.flashcards.length, 0)} cards)
              </button>
              {curriculum.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => {
                    setSelectedUnit(unit.id);
                    setShowUnitDropdown(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 hover:bg-surface-muted transition-colors",
                    selectedUnit === unit.id ? "bg-surface-muted text-gradient-purple" : "text-text-primary"
                  )}
                >
                  {unit.name} ({unit.flashcards.length} cards)
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Flashcard Display */}
      {currentCard ? (
        <>
          {/* Flashcard */}
          <div className="max-w-md mx-auto">
            <div className="gradient-outline rounded-2xl p-1">
              <div 
                className="gradient-outline-content rounded-xl h-24 cursor-pointer hover:scale-[1.01] transition-all duration-300 shadow-lg"
                onClick={flipCard}
              >
                <div className="relative h-full">
                  {!isFlipped ? (
                    /* Front */
                    <div className="absolute inset-0 rounded-xl bg-surface animate-fade-in">
                      <div className="h-full flex flex-col justify-center items-center text-center space-y-2 p-3">
                        <Star className="w-4 h-4 text-gradient-purple" />
                        <p className="text-sm text-text-primary font-medium leading-tight line-clamp-2">
                          {currentCard.front}
                        </p>
                        <div className="absolute top-2 right-2">
                          <div className="bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-full px-2 py-0.5">
                            <span className="text-xs text-gradient-purple font-medium">
                              {currentCard.unit}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Back */
                    <div className="absolute inset-0 rounded-xl bg-surface animate-fade-in">
                      <div className="h-full flex flex-col justify-center items-center text-center space-y-2 p-3">
                        <Target className="w-4 h-4 text-gradient-orange" />
                        <p className="text-sm text-text-primary font-medium leading-tight line-clamp-3">
                          {currentCard.back}
                        </p>
                        <div className="absolute top-2 right-2">
                          <div className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-full px-2 py-0.5">
                            <span className="text-xs text-gradient-orange font-medium">
                              Answer
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons - Right under flashcard */}
            <div className="flex justify-between items-center mt-4 max-w-md">
              <GradientButton
                onClick={prevCard}
                disabled={currentIndex === 0}
                variant="secondary"
                size="sm"
                className="h-8 px-3 text-xs"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </GradientButton>
              
              <div className="text-center">
                <span className="text-sm text-text-muted">
                  Card {currentIndex + 1} of {flashcards.length}
                </span>
                {isShuffled && (
                  <div className="text-xs text-gradient-purple mt-1">
                    🎲 Shuffled
                  </div>
                )}
              </div>
              
              <GradientButton
                onClick={nextCard}
                disabled={currentIndex === flashcards.length - 1}
                size="sm"
                className="h-8 px-3 text-xs"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </GradientButton>
            </div>

            {/* Progress and Actions - Two square boxes */}
            <div className="grid grid-cols-2 gap-4 mt-4 max-w-md">
              {/* Progress Box */}
              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-4 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-gradient-purple" />
                    Progress
                  </h4>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">Cards</span>
                        <span className="text-gradient-purple font-medium">{currentIndex + 1}/{flashcards.length}</span>
                      </div>
                      <div className="w-full bg-surface-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-gradient-purple">
                        {Math.min(currentIndex + 1, 7)}
                      </div>
                      <div className="text-xs text-text-muted">streak</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Box */}
              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-4 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-gradient-orange" />
                    Actions
                  </h4>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={flipCard}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      💡 Flip Card
                    </button>
                    
                    <button 
                      onClick={isShuffled ? resetOrder : shuffleCards}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      {isShuffled ? '🔄 Reset' : '🎲 Shuffle'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="text-xs text-text-muted mb-2">
                {selectedUnit ? `Unit: ${currentCard.unit}` : `From ${currentCard.unit}`} • Complete AP Curriculum
              </p>
              <GradientButton 
                onClick={() => {/* Navigate to learn mode */}} 
                size="sm" 
                className="h-7 px-3 text-xs"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Go to Learn Mode
              </GradientButton>
            </div>
          </div>
        </>
      ) : (
        <GradientCard>
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">No flashcards available</p>
          </div>
        </GradientCard>
      )}
    </div>
  );
};