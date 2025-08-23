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
          const newCards = JSON.parse(data.response);
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
          <div className="relative">
            <div className="gradient-outline rounded-xl p-1">
              <div 
                className="bg-background rounded-xl min-h-48 cursor-pointer perspective-1000"
                onClick={flipCard}
              >
                <div className={`relative transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''} h-48`}>
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden rounded-xl bg-surface">
                    <div className="h-full flex flex-col justify-center items-center text-center space-y-4 p-6">
                      <Star className="w-8 h-8 text-gradient-purple" />
                      <p className="text-lg text-text-primary font-medium">
                        {currentCard.front}
                      </p>
                      <p className="text-sm text-text-muted">Tap to reveal answer</p>
                      <div className="absolute top-3 right-3">
                        <div className="bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-full px-2 py-1">
                          <span className="text-xs text-gradient-purple font-medium">AI Generated</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-surface">
                    <div className="h-full flex flex-col justify-center items-center text-center space-y-4 p-6">
                      <Target className="w-8 h-8 text-gradient-orange" />
                      <p className="text-lg text-text-primary font-medium">
                        {currentCard.back}
                      </p>
                      <p className="text-sm text-gaming-success">Excellent!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
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
                  Generating more...
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

          <div className="text-center">
            <p className="text-xs text-text-muted">
              Subject: {selectedSubject} • Unlimited AI-generated content
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};