import React, { useState, useEffect, useCallback } from 'react';
import { GradientCard } from './ui/gradient-card';
import { GradientButton } from './ui/gradient-button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';
import { 
  Brain, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw,
  Star,
  Target,
  Loader2,
  Play,
  Pause,
  Settings,
  Check,
  BookOpen
} from 'lucide-react';

interface Flashcard {
  front: string;
  back: string;
  subject: string;
  id: string;
  studied?: boolean;
}

interface AIFlashcardGeneratorProps {
  selectedSubject: string;
}

const subjectTopics: Record<string, string[]> = {
  "AP Calculus AB": [
    "derivatives and applications", "integrals and FTC", "limits and continuity", 
    "optimization problems", "related rates", "area between curves"
  ],
  "AP Biology": [
    "cell structure and function", "genetics and heredity", "evolution", 
    "ecology", "photosynthesis and respiration", "molecular biology"
  ],
  "AP US History": [
    "colonial America", "American Revolution", "Civil War era", 
    "Progressive Era", "World Wars", "Civil Rights Movement"
  ],
  "AP Chemistry": [
    "atomic structure", "chemical bonding", "thermodynamics", 
    "kinetics", "equilibrium", "acids and bases"
  ],
  "AP Physics 1": [
    "kinematics", "forces and Newton's laws", "energy and momentum", 
    "rotational motion", "waves and sound", "electricity"
  ],
  "AP English Literature": [
    "poetry analysis", "prose fiction", "literary devices", 
    "character development", "themes and motifs", "literary periods"
  ]
};

export const AIFlashcardGenerator: React.FC<AIFlashcardGeneratorProps> = ({ selectedSubject }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(3000); // 3 seconds default
  const [showSpeedSettings, setShowSpeedSettings] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const generateFlashcards = async (topic?: string) => {
    setIsGenerating(true);
    const topics = subjectTopics[selectedSubject] || ["general concepts"];
    const selectedTopic = topic || topics[Math.floor(Math.random() * topics.length)];
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          type: 'flashcard',
          subject: selectedSubject,
          prompt: `Generate 5 diverse flashcards about ${selectedTopic} for ${selectedSubject}. Return as valid JSON array with "front" and "back" properties.`
        }
      });

      if (error) throw error;

      if (data.success) {
        try {
          // Clean the response by removing markdown code blocks if present
          let cleanResponse = data.response.trim();
          if (cleanResponse.startsWith('```json')) {
            cleanResponse = cleanResponse.replace(/```json\s*/, '').replace(/```\s*$/, '');
          } else if (cleanResponse.startsWith('```')) {
            cleanResponse = cleanResponse.replace(/```\s*/, '').replace(/```\s*$/, '');
          }
          
          const newCards = JSON.parse(cleanResponse);
          const cardsWithId = newCards.map((card: any, index: number) => ({
            ...card,
            subject: selectedSubject,
            id: `${Date.now()}_${index}`
          }));
          
          setFlashcards(prev => [...prev, ...cardsWithId]);
          
          if (flashcards.length === 0) {
            setCurrentIndex(0);
          }
          
          toast({
            title: "Success!",
            description: `Generated 5 new flashcards for ${selectedTopic}`,
          });
        } catch (parseError) {
          console.error('Parse error:', parseError);
          toast({
            title: "Error",
            description: "Failed to parse AI response. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error generating flashcards:', error);
      toast({
        title: "Error",
        description: "Failed to generate flashcards. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlay && flashcards.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          const nextIndex = prev + 1;
          if (nextIndex < flashcards.length) {
            setIsFlipped(false);
            return nextIndex;
          } else {
            setIsAutoPlay(false); // Stop at end
            return prev;
          }
        });
      }, autoPlaySpeed);
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlay, autoPlaySpeed, flashcards.length]);

  // Generate initial flashcards when component mounts or subject changes
  useEffect(() => {
    setFlashcards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
    generateFlashcards();
  }, [selectedSubject]);

  const currentCard = flashcards[currentIndex];

  const nextCard = () => {
    const nextIndex = currentIndex + 1;
    
    // If we're near the end, generate more cards
    if (nextIndex >= flashcards.length - 2) {
      generateFlashcards();
    }
    
    if (nextIndex < flashcards.length) {
      setCurrentIndex(nextIndex);
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

  const generateMoreCards = () => {
    generateFlashcards();
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const markAsStudied = useCallback(() => {
    if (currentCard) {
      setStudiedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(currentCard.id)) {
          newSet.delete(currentCard.id);
        } else {
          newSet.add(currentCard.id);
        }
        return newSet;
      });
      
      // Auto advance to next card
      setTimeout(() => {
        nextCard();
      }, 500);
    }
  }, [currentCard]);

  const getProgressPercentage = () => {
    if (flashcards.length === 0) return 0;
    return Math.round((studiedCards.size / flashcards.length) * 100);
  };

  if (!currentCard && !isGenerating) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-gradient-purple" />
          <h3 className="text-lg font-semibold text-text-primary">AI Flashcards</h3>
          <Sparkles className="w-4 h-4 text-gradient-orange animate-pulse" />
        </div>
        
        <GradientCard>
          <div className="text-center py-8">
            <p className="text-text-secondary mb-4">Ready to generate AI flashcards for {selectedSubject}?</p>
            <GradientButton onClick={() => generateFlashcards()}>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Flashcards
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
          <h3 className="text-lg font-semibold text-text-primary">AI Flashcards</h3>
          <Sparkles className="w-4 h-4 text-gradient-orange animate-pulse" />
        </div>
        
        <GradientButton 
          onClick={generateMoreCards}
          disabled={isGenerating}
          size="sm"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-1" />
              More
            </>
          )}
        </GradientButton>
      </div>

      {isGenerating && flashcards.length === 0 ? (
        <GradientCard>
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-gradient-purple mx-auto mb-4" />
            <p className="text-text-secondary">Generating AI flashcards for {selectedSubject}...</p>
          </div>
        </GradientCard>
      ) : currentCard ? (
        <>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">Progress</span>
              <span className="text-sm text-gradient-purple font-medium">{getProgressPercentage()}%</span>
            </div>
            <div className="w-full bg-surface-muted rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Flashcard - Quizlet Style */}
            <div className="lg:col-span-2 flex flex-col items-center">
              <div className="relative w-full max-w-md">
                <div className="gradient-outline rounded-xl p-1">
                  <div 
                    className="bg-surface rounded-xl w-full h-40 cursor-pointer perspective-1000 shadow-lg hover:scale-[1.01] transition-all duration-300 relative"
                    onClick={flipCard}
                  >
                    {/* Answer button in top right when not flipped */}
                    {!isFlipped && (
                      <div className="absolute top-3 right-3 z-10">
                        <GradientButton
                          size="sm"
                          variant="secondary"
                          className="px-2 py-1 text-xs"
                        >
                          Answer
                        </GradientButton>
                      </div>
                    )}
                    
                    <div className={`relative transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''} h-full`}>
                      {/* Front */}
                      <div className="absolute inset-0 backface-hidden rounded-xl">
                        <div className="h-full flex flex-col justify-center items-center text-center space-y-2 p-4">
                          <div className="text-2xl font-bold text-gradient-purple mb-1">
                            {currentIndex + 1}
                          </div>
                          <div className="text-sm text-text-primary font-medium leading-relaxed max-w-xs">
                            {currentCard.front}
                          </div>
                        </div>
                      </div>
                      
                      {/* Back */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl">
                        <div className="h-full flex flex-col justify-center items-center text-center space-y-2 p-4">
                          <div className="text-sm text-text-primary font-medium leading-relaxed max-w-xs">
                            {currentCard.back}
                          </div>
                          
                          {/* Mark Studied Button */}
                          <GradientButton
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsStudied();
                            }}
                            size="sm" 
                            className={`mt-4 ${studiedCards.has(currentCard.id) ? 'bg-gaming-success' : ''}`}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            {studiedCards.has(currentCard.id) ? 'Studied' : 'Mark Studied'}
                          </GradientButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Navigation and Controls - Centered under flashcard */}
                <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-md">
                  <div className="text-center">
                    <div className="text-sm text-text-muted mb-2">
                      Card {currentIndex + 1} of {flashcards.length}
                    </div>
                    
                    {/* Auto-play Controls */}
                    <div className="flex items-center gap-2 justify-center">
                      <GradientButton
                        onClick={toggleAutoPlay}
                        variant="secondary"
                        size="sm"
                        className="px-3 py-2"
                      >
                        {isAutoPlay ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                        Auto
                      </GradientButton>
                      
                      <div className="relative">
                        <GradientButton
                          onClick={() => setShowSpeedSettings(!showSpeedSettings)}
                          variant="secondary"
                          size="sm"
                          className="px-3 py-2"
                        >
                          <Settings className="w-4 h-4" />
                        </GradientButton>
                        
                        {showSpeedSettings && (
                          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-surface border border-card-border rounded-lg p-3 shadow-lg z-10 min-w-[160px]">
                            <div className="text-xs text-text-secondary mb-2">Speed</div>
                            {[
                              { label: 'Slow', value: 5000 },
                              { label: 'Normal', value: 3000 },
                              { label: 'Fast', value: 1500 }
                            ].map(speed => (
                              <button
                                key={speed.value}
                                onClick={() => {
                                  setAutoPlaySpeed(speed.value);
                                  setShowSpeedSettings(false);
                                }}
                                className={`block w-full text-left px-2 py-1 text-xs rounded ${
                                  autoPlaySpeed === speed.value 
                                    ? 'bg-gradient-to-r from-purple-500/20 to-orange-500/20 text-gradient-purple' 
                                    : 'text-text-secondary hover:bg-surface-muted'
                                }`}
                              >
                                {speed.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between w-full">
                    <GradientButton
                      onClick={prevCard}
                      disabled={currentIndex === 0}
                      variant="secondary"
                      size="sm"
                      className="px-3 py-2"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </GradientButton>
                    
                    <GradientButton
                      onClick={nextCard}
                      size="sm"
                      className="px-3 py-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar Panel */}
            <div className="lg:col-span-1 space-y-4">
              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-3 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-gradient-purple" />
                    Study Stats
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-secondary">Cards Generated</span>
                        <span className="text-gradient-purple font-medium">{flashcards.length}</span>
                      </div>
                      <div className="w-full bg-surface-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((flashcards.length / 20) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-text-muted mt-1">Goal: 20 cards</div>
                    </div>

                    <div className="gradient-outline rounded-lg p-1">
                      <div className="gradient-outline-content p-2 text-center space-y-1">
                        <div className="flex items-center justify-center gap-2">
                          <Brain className="w-3 h-3 text-gradient-orange" />
                          <span className="text-xs font-medium text-text-primary">Knowledge</span>
                        </div>
                        <div className="text-lg font-bold text-gradient-purple">
                          {Math.floor((currentIndex + 1) / flashcards.length * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-3 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-gradient-orange" />
                    Achievements
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${flashcards.length >= 5 ? 'bg-gaming-success' : 'bg-surface-muted'}`}></div>
                      <span className="text-text-secondary">First 5 Cards</span>
                      {flashcards.length >= 5 && <span className="text-gaming-success">✓</span>}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${flashcards.length >= 10 ? 'bg-gaming-success' : 'bg-surface-muted'}`}></div>
                      <span className="text-text-secondary">Study Streak</span>
                      {flashcards.length >= 10 && <span className="text-gaming-success">✓</span>}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${currentIndex >= 5 ? 'bg-gaming-success' : 'bg-surface-muted'}`}></div>
                      <span className="text-text-secondary">Quick Learner</span>
                      {currentIndex >= 5 && <span className="text-gaming-success">✓</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-3 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <RefreshCw className="w-4 h-4 text-gradient-orange" />
                    Quick Actions
                  </h4>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={flipCard}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      🤖 Flip Card
                    </button>
                    
                    <button 
                      onClick={generateMoreCards}
                      disabled={isGenerating}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all disabled:opacity-50"
                    >
                      {isGenerating ? '⏳ AI Working...' : '✨ Generate More'}
                    </button>
                    
                    <button 
                      onClick={() => setIsFlipped(false)}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      🔄 Reset View
                    </button>
                  </div>
                </div>
              </div>

              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-3 space-y-2">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-gradient-purple" />
                    Study Level
                  </h4>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient-orange mb-1">
                      {Math.floor(flashcards.length / 5) + 1}
                    </div>
                    <div className="text-xs text-text-muted">
                      {flashcards.length < 5 ? 'Beginner' : 
                       flashcards.length < 15 ? 'Intermediate' : 'Advanced'}
                    </div>
                    <div className="w-full bg-surface-muted rounded-full h-1 mt-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-purple-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${(flashcards.length % 5) * 20}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Tools */}
              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-3 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-gradient-orange" />
                    Study Tools
                  </h4>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        const currentCard = flashcards[currentIndex];
                        if (currentCard) {
                          navigator.clipboard.writeText(`Q: ${currentCard.front}\nA: ${currentCard.back}`);
                        }
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      📋 Copy Card
                    </button>
                    
                    <button 
                      onClick={() => {
                        const text = flashcards.map(card => `Q: ${card.front}\nA: ${card.back}`).join('\n\n');
                        navigator.clipboard.writeText(text);
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      📚 Export All
                    </button>
                    
                    <button 
                      onClick={() => {
                        const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
                        setFlashcards(shuffled);
                        setCurrentIndex(0);
                        setIsFlipped(false);
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      🎲 Shuffle Cards
                    </button>
                  </div>
                </div>
              </div>

              {/* Study Session Stats */}
              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-3 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-gradient-purple" />
                    Session Stats
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Cards Reviewed</span>
                      <span className="text-gradient-purple font-medium">{currentIndex + 1}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Cards Studied</span>
                      <span className="text-gradient-orange font-medium">{studiedCards.size}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Accuracy</span>
                      <span className="text-gaming-success font-medium">
                        {flashcards.length > 0 ? Math.round((studiedCards.size / flashcards.length) * 100) : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Time Spent</span>
                      <span className="text-text-muted font-medium">
                        {Math.floor((currentIndex + 1) * 0.5)}m
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Preferences */}
              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-3 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-gradient-orange" />
                    Preferences
                  </h4>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        const unStudiedCards = flashcards.filter(card => !studiedCards.has(card.id));
                        if (unStudiedCards.length > 0) {
                          const randomIndex = flashcards.findIndex(card => card.id === unStudiedCards[Math.floor(Math.random() * unStudiedCards.length)].id);
                          setCurrentIndex(randomIndex);
                          setIsFlipped(false);
                        }
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      🎯 Focus Unstudied
                    </button>
                    
                    <button 
                      onClick={() => {
                        setStudiedCards(new Set());
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      🔄 Reset Progress
                    </button>
                    
                    <button 
                      onClick={() => {
                        const studiedCardsArray = flashcards.filter(card => studiedCards.has(card.id));
                        if (studiedCardsArray.length > 0) {
                          const randomIndex = flashcards.findIndex(card => card.id === studiedCardsArray[Math.floor(Math.random() * studiedCardsArray.length)].id);
                          setCurrentIndex(randomIndex);
                          setIsFlipped(false);
                        }
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      📖 Review Studied
                    </button>
                  </div>
                </div>
              </div>

              {/* Study Tools */}
              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-3 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-gradient-orange" />
                    Study Tools
                  </h4>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        const currentCard = flashcards[currentIndex];
                        if (currentCard) {
                          navigator.clipboard.writeText(`Q: ${currentCard.front}\nA: ${currentCard.back}`);
                        }
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      📋 Copy Card
                    </button>
                    
                    <button 
                      onClick={() => {
                        const text = flashcards.map(card => `Q: ${card.front}\nA: ${card.back}`).join('\n\n');
                        navigator.clipboard.writeText(text);
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      📚 Export All
                    </button>
                    
                    <button 
                      onClick={() => {
                        const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
                        setFlashcards(shuffled);
                        setCurrentIndex(0);
                        setIsFlipped(false);
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      🎲 Shuffle Cards
                    </button>
                  </div>
                </div>
              </div>

              {/* Study Session Stats */}
              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-3 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <Target className="w-4 h-4 text-gradient-purple" />
                    Session Stats
                  </h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Cards Reviewed</span>
                      <span className="text-gradient-purple font-medium">{currentIndex + 1}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Cards Studied</span>
                      <span className="text-gradient-orange font-medium">{studiedCards.size}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Accuracy</span>
                      <span className="text-gaming-success font-medium">
                        {flashcards.length > 0 ? Math.round((studiedCards.size / flashcards.length) * 100) : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Time Spent</span>
                      <span className="text-text-muted font-medium">
                        {Math.floor((currentIndex + 1) * 0.5)}m
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Study Preferences */}
              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-3 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-gradient-orange" />
                    Quick Actions
                  </h4>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        const unStudiedCards = flashcards.filter(card => !studiedCards.has(card.id));
                        if (unStudiedCards.length > 0) {
                          const randomIndex = flashcards.findIndex(card => card.id === unStudiedCards[Math.floor(Math.random() * unStudiedCards.length)].id);
                          setCurrentIndex(randomIndex);
                          setIsFlipped(false);
                        }
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      🎯 Focus Unstudied
                    </button>
                    
                    <button 
                      onClick={() => {
                        setStudiedCards(new Set());
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      🔄 Reset Progress
                    </button>
                    
                    <button 
                      onClick={() => {
                        const studiedCardsArray = flashcards.filter(card => studiedCards.has(card.id));
                        if (studiedCardsArray.length > 0) {
                          const randomIndex = flashcards.findIndex(card => card.id === studiedCardsArray[Math.floor(Math.random() * studiedCardsArray.length)].id);
                          setCurrentIndex(randomIndex);
                          setIsFlipped(false);
                        }
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      📖 Review Studied
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-xs text-text-muted">
              Subject: {selectedSubject} • Unlimited AI-generated content
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};