import React, { useState, useEffect } from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { GradientCard } from '@/components/ui/gradient-card';
import { ParticleBackground } from '@/components/animations/particle-background';
import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { 
  ChevronDown, 
  RotateCcw, 
  Zap, 
  Trophy, 
  Timer,
  Star,
  Target,
  Brain
} from 'lucide-react';

interface DashboardScreenProps {
  user: { name: string };
  selectedSubjects: string[];
}

const minigames = [
  {
    id: 'quick-quiz',
    title: 'Quick Quiz',
    description: 'Rapid-fire questions',
    icon: Zap,
    xpReward: 25,
    difficulty: 'Easy'
  },
  {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Match concepts',
    icon: Brain,
    xpReward: 35,
    difficulty: 'Medium'
  },
  {
    id: 'time-trial',
    title: 'Time Trial',
    description: 'Beat the clock',
    icon: Timer,
    xpReward: 50,
    difficulty: 'Hard'
  }
];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  selectedSubjects,
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState(selectedSubjects[0] || '');
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const sampleFlashcards = [
    {
      front: "What is the derivative of x²?",
      back: "2x",
      subject: "AP Calculus AB"
    },
    {
      front: "Define photosynthesis",
      back: "The process by which plants convert light energy into chemical energy",
      subject: "AP Biology"
    },
    {
      front: "What year was the Declaration of Independence signed?",
      back: "1776",
      subject: "AP US History"
    }
  ];

  const currentCard = sampleFlashcards[flashcardIndex % sampleFlashcards.length];

  const nextCard = () => {
    setFlashcardIndex(prev => prev + 1);
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  if (activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-background relative pb-20">
        <ParticleBackground />
        
        <div className="relative z-10 p-6 space-y-6">
          {/* Greeting Header */}
          <div className="text-center animate-fade-in">
            <h1 className="text-2xl font-bold text-text-primary">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-text-secondary">Ready to level up your knowledge?</p>
          </div>

          {/* Subject Selector */}
          <div className="relative">
            <button
              onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
              className="w-full gradient-outline rounded-lg p-1"
            >
              <div className="gradient-outline-content px-4 py-3 flex items-center justify-between">
                <span className="font-medium text-text-primary">{selectedSubject}</span>
                <ChevronDown className="w-5 h-5 text-gradient-purple" />
              </div>
            </button>

            {showSubjectDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 gradient-outline rounded-lg p-1 z-50 animate-scale-in">
                <div className="gradient-outline-content rounded-lg max-h-48 overflow-y-auto">
                  {selectedSubjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setShowSubjectDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-surface-muted transition-colors text-text-primary"
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Flashcards */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">AI Flashcards</h2>
            
            <div className="relative">
              <GradientCard 
                className="min-h-48 cursor-pointer perspective-1000"
                onClick={flipCard}
              >
                <div className={`relative transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                      <Star className="w-8 h-8 text-gradient-purple" />
                      <p className="text-lg text-text-primary font-medium">
                        {currentCard.front}
                      </p>
                      <p className="text-sm text-text-muted">Tap to reveal answer</p>
                    </div>
                  </div>
                  
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                      <Target className="w-8 h-8 text-gradient-orange" />
                      <p className="text-lg text-text-primary font-medium">
                        {currentCard.back}
                      </p>
                      <p className="text-sm text-gaming-success">Great job!</p>
                    </div>
                  </div>
                </div>
              </GradientCard>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={nextCard}
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Next Card
                </button>
                <span className="text-sm text-text-muted">
                  Card {flashcardIndex + 1}
                </span>
              </div>
            </div>
          </div>

          {/* Minigames */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">Minigames</h2>
            
            <div className="grid gap-4">
              {minigames.map((game) => {
                const Icon = game.icon;
                return (
                  <GradientCard key={game.id} className="cursor-pointer hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="gradient-outline rounded-lg p-2">
                          <div className="gradient-outline-content rounded-lg p-2">
                            <Icon className="w-6 h-6 text-gradient-purple" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary">{game.title}</h3>
                          <p className="text-sm text-text-secondary">{game.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gaming-xp">+{game.xpReward} XP</span>
                            <span className="text-xs text-text-muted">• {game.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      <GradientButton size="sm">
                        Play
                      </GradientButton>
                    </div>
                  </GradientCard>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  // Other tabs (simplified for now)
  return (
    <div className="min-h-screen bg-background relative pb-20">
      <ParticleBackground />
      
      <div className="relative z-10 p-6 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Trophy className="w-16 h-16 text-gradient-purple mx-auto" />
          <h2 className="text-2xl font-bold gradient-text capitalize">{activeTab}</h2>
          <p className="text-text-secondary">Coming soon! This feature is under development.</p>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};
