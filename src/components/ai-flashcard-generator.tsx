import React, { useState, useEffect } from 'react';
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
  Loader2
} from 'lucide-react';

interface Flashcard {
  front: string;
  back: string;
  subject: string;
  id: string;
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

  // Generate initial flashcards when component mounts or subject changes
  useEffect(() => {
    setFlashcards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* AI Flashcard */}
            <div className="lg:col-span-3">
              <div className="relative">
                <div className="gradient-outline rounded-2xl p-1">
                  <div 
                    className="bg-background rounded-2xl aspect-[3/2] cursor-pointer perspective-1000 shadow-lg hover:scale-[1.01] transition-all duration-300"
                    onClick={flipCard}
                  >
                    <div className={`relative transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''} h-full`}>
                      {/* Front */}
                      <div className="absolute inset-0 backface-hidden rounded-2xl bg-surface">
                        <div className="h-full flex flex-col justify-center items-center text-center space-y-6 p-8">
                          <Star className="w-10 h-10 text-gradient-purple" />
                          <p className="text-xl text-text-primary font-medium leading-relaxed">
                            {currentCard.front}
                          </p>
                          <p className="text-sm text-text-muted">Tap to reveal answer</p>
                          <div className="absolute top-4 right-4">
                            <div className="bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-full px-3 py-1">
                              <span className="text-xs text-gradient-purple font-medium">🤖 AI Generated</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Back */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-surface">
                        <div className="h-full flex flex-col justify-center items-center text-center space-y-6 p-8">
                          <Target className="w-10 h-10 text-gradient-orange" />
                          <p className="text-xl text-text-primary font-medium leading-relaxed">
                            {currentCard.back}
                          </p>
                          <p className="text-sm text-gaming-success font-medium">Excellent! 🎉</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Gamification Panel */}
            <div className="lg:col-span-1 space-y-4">
              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-4 space-y-4">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gradient-purple" />
                    AI Stats
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
                      <div className="gradient-outline-content p-3 text-center space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <Brain className="w-4 h-4 text-gradient-orange" />
                          <span className="text-sm font-medium text-text-primary">AI Knowledge</span>
                        </div>
                        <div className="text-2xl font-bold text-gradient-purple">
                          {Math.floor((currentIndex + 1) / flashcards.length * 100)}%
                        </div>
                        <div className="text-xs text-text-muted">topics mastered</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-gaming-success"></div>
                        <span className="text-text-secondary">Understood: {Math.ceil(currentIndex * 0.9)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-gaming-warning"></div>
                        <span className="text-text-secondary">Learning: {Math.floor(currentIndex * 0.1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gradient-outline rounded-xl p-1">
                <div className="gradient-outline-content p-4 space-y-3">
                  <h4 className="font-semibold text-text-primary flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-gradient-orange" />
                    AI Actions
                  </h4>
                  
                  <div className="space-y-2">
                    <button 
                      onClick={flipCard}
                      className="w-full text-sm px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
                    >
                      🤖 AI Reveal
                    </button>
                    
                    <button 
                      onClick={generateMoreCards}
                      disabled={isGenerating}
                      className="w-full text-sm px-3 py-2 rounded-lg bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all disabled:opacity-50"
                    >
                      {isGenerating ? '⏳ Generating...' : '✨ More AI Cards'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <GradientButton
              onClick={prevCard}
              disabled={currentIndex === 0}
              variant="secondary"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </GradientButton>
            
            <div className="text-center">
              <span className="text-sm text-text-muted">
                Card {currentIndex + 1} of {flashcards.length}
              </span>
              {isGenerating && (
                <div className="text-xs text-gradient-purple mt-1">
                  🤖 Generating more...
                </div>
              )}
            </div>
            
            <GradientButton
              onClick={nextCard}
              size="sm"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </GradientButton>
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