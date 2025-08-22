import React, { useState, useEffect } from 'react';
import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { ParticleBackground } from '@/components/animations/particle-background';
import { useTheme } from '@/contexts/theme-context';
import {
  Star,
  Target,
  Trophy,
  Zap,
  Brain,
  Timer,
  Award,
  RotateCcw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  Moon,
  Sun,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  LogOut,
} from 'lucide-react';

interface DashboardScreenProps {
  user: { name: string };
  selectedSubjects: string[];
  onLogout: () => void;
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
  onLogout,
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

  const subjectFlashcards = {
    "AP Calculus AB": [
      { front: "What is the derivative of x²?", back: "2x" },
      { front: "What is the integral of 2x?", back: "x² + C" },
      { front: "What is the limit of (sin x)/x as x approaches 0?", back: "1" },
      { front: "What is the chain rule?", back: "d/dx[f(g(x))] = f'(g(x)) × g'(x)" },
      { front: "What is the Mean Value Theorem?", back: "If f is continuous on [a,b] and differentiable on (a,b), then there exists c such that f'(c) = [f(b)-f(a)]/(b-a)" }
    ],
    "AP Biology": [
      { front: "Define photosynthesis", back: "The process by which plants convert light energy into chemical energy" },
      { front: "What is mitosis?", back: "Cell division that produces two identical diploid cells" },
      { front: "What is ATP?", back: "Adenosine triphosphate - the energy currency of cells" },
      { front: "What is the difference between prokaryotes and eukaryotes?", back: "Prokaryotes lack a membrane-bound nucleus; eukaryotes have one" },
      { front: "What is natural selection?", back: "The process by which organisms with favorable traits are more likely to survive and reproduce" }
    ],
    "AP US History": [
      { front: "What year was the Declaration of Independence signed?", back: "1776" },
      { front: "What was the Great Depression?", back: "A severe economic downturn from 1929-1939" },
      { front: "Who was the first President of the United States?", back: "George Washington" },
      { front: "What was the Civil Rights Act of 1964?", back: "Landmark legislation that outlawed discrimination based on race, color, religion, sex, or national origin" },
      { front: "What was the Louisiana Purchase?", back: "1803 land deal between the US and France that doubled the size of the US" }
    ],
    "AP Chemistry": [
      { front: "What is Avogadro's number?", back: "6.022 × 10²³ particles per mole" },
      { front: "What is the ideal gas law?", back: "PV = nRT" },
      { front: "What is electronegativity?", back: "The tendency of an atom to attract electrons in a chemical bond" },
      { front: "What is a buffer solution?", back: "A solution that resists changes in pH when acids or bases are added" },
      { front: "What is the first law of thermodynamics?", back: "Energy cannot be created or destroyed, only transferred or converted" }
    ],
    "AP Physics 1": [
      { front: "What is Newton's first law?", back: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by a net force" },
      { front: "What is the formula for kinetic energy?", back: "KE = ½mv²" },
      { front: "What is the difference between speed and velocity?", back: "Speed is scalar (magnitude only), velocity is vector (magnitude and direction)" },
      { front: "What is Ohm's law?", back: "V = IR (Voltage = Current × Resistance)" },
      { front: "What is the conservation of momentum?", back: "The total momentum of a system remains constant when no external forces act on it" }
    ],
    "AP English Literature": [
      { front: "What is a metaphor?", back: "A direct comparison between two unlike things without using 'like' or 'as'" },
      { front: "What is iambic pentameter?", back: "A poetic meter with five iambs (unstressed-stressed syllable pairs) per line" },
      { front: "What is symbolism?", back: "The use of objects, colors, or actions to represent deeper meanings or ideas" },
      { front: "What is dramatic irony?", back: "When the audience knows something that the characters do not" },
      { front: "What is a sonnet?", back: "A 14-line poem typically written in iambic pentameter with a specific rhyme scheme" }
    ]
  };

  const currentSubjectCards = subjectFlashcards[selectedSubject as keyof typeof subjectFlashcards] || subjectFlashcards["AP Calculus AB"];

  const currentCard = currentSubjectCards[flashcardIndex % currentSubjectCards.length];

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
            
            {/* Streak Counter */}
            <div className="mt-4 flex justify-center">
              <div className="gradient-outline rounded-full p-1">
                <div className="gradient-outline-content rounded-full px-4 py-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-gradient-orange" />
                  <span className="text-sm font-semibold gradient-text">7 Day Streak!</span>
                  <Zap className="w-4 h-4 text-gradient-orange" />
                </div>
              </div>
            </div>
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
                       setFlashcardIndex(0);
                       setIsFlipped(false);
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
                      </div>
                    </div>
                    
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl bg-surface">
                      <div className="h-full flex flex-col justify-center items-center text-center space-y-4 p-6">
                        <Target className="w-8 h-8 text-gradient-orange" />
                        <p className="text-lg text-text-primary font-medium">
                          {currentCard.back}
                        </p>
                        <p className="text-sm text-gaming-success">Great job!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setFlashcardIndex(prev => prev === 0 ? currentSubjectCards.length - 1 : prev - 1)}
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-sm text-text-muted">
                  Card {flashcardIndex + 1} of {currentSubjectCards.length}
                </span>
                <button
                  onClick={() => setFlashcardIndex(prev => prev === currentSubjectCards.length - 1 ? 0 : prev + 1)}
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
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

  // Quests Tab
  if (activeTab === 'quests') {
    return (
      <div className="min-h-screen bg-background relative pb-20">
        <ParticleBackground />
        <div className="relative z-10 p-6 space-y-6">
          <h1 className="text-2xl font-bold text-text-primary text-center">Quests</h1>
          
          {/* Daily Quests */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold gradient-text">Daily Quests</h2>
            <GradientCard>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary">Complete 5 Flashcards</h3>
                  <div className="w-32 bg-surface-muted rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full w-3/5"></div>
                  </div>
                  <p className="text-xs text-text-muted mt-1">3/5 complete</p>
                </div>
                <span className="text-gaming-xp font-semibold">+50 XP</span>
              </div>
            </GradientCard>
          </div>

          {/* Weekly Quests */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold gradient-text">Weekly Quests</h2>
            <GradientCard>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary">7-Day Study Streak</h3>
                  <div className="w-32 bg-surface-muted rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full w-full"></div>
                  </div>
                  <p className="text-xs text-gaming-success mt-1">Complete!</p>
                </div>
                <span className="text-gaming-xp font-semibold">+200 XP</span>
              </div>
            </GradientCard>
          </div>

          {/* Achievement Quests */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold gradient-text">Achievements</h2>
            <GradientCard>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary">First Steps</h3>
                  <p className="text-sm text-text-secondary">Complete your first quiz</p>
                </div>
                <Trophy className="w-6 h-6 text-gradient-orange" />
              </div>
            </GradientCard>
          </div>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  // Store Tab
  if (activeTab === 'store') {
    return (
      <div className="min-h-screen bg-background relative pb-20">
        <ParticleBackground />
        <div className="relative z-10 p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary">Token Store</h1>
            <div className="gradient-outline rounded-full p-1 inline-block mt-2">
              <div className="gradient-outline-content rounded-full px-4 py-1">
                <span className="gradient-text font-semibold">🪙 1,250 Tokens</span>
              </div>
            </div>
          </div>
          
          {/* Themes */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold gradient-text">Themes</h2>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary">Ocean Theme</h3>
                  <p className="text-sm text-text-secondary">Blue gradient interface</p>
                </div>
                <GradientButton size="sm">500 🪙</GradientButton>
              </div>
            </GradientCard>
          </div>

          {/* Avatars */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold gradient-text">Avatars</h2>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary">Scholar Cat</h3>
                  <p className="text-sm text-text-secondary">Wise feline companion</p>
                </div>
                <GradientButton size="sm">300 🪙</GradientButton>
              </div>
            </GradientCard>
          </div>

          {/* Power-ups */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold gradient-text">Power-ups</h2>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-text-primary">Streak Freeze</h3>
                  <p className="text-sm text-text-secondary">Protect your streak for 1 day</p>
                </div>
                <GradientButton size="sm">100 🪙</GradientButton>
              </div>
            </GradientCard>
          </div>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  // Profile Tab (default)
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-background relative pb-20">
      <ParticleBackground />
      
      <div className="relative z-10 p-6 space-y-6">
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <div className="gradient-outline rounded-full p-1 w-24 h-24 mx-auto">
            <div className="gradient-outline-content rounded-full w-full h-full bg-surface flex items-center justify-center">
              <User className="w-12 h-12 text-gradient-purple" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">John Doe</h1>
            <p className="text-text-secondary">Student • Level 12</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="text-center">
                <p className="text-sm text-gaming-xp font-semibold">2,450 XP</p>
                <p className="text-xs text-text-muted">Experience</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-token-silver font-semibold">1,250</p>
                <p className="text-xs text-text-muted">Tokens</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gaming-success font-semibold">7 Days</p>
                <p className="text-xs text-text-muted">Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <GradientCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold gradient-text">Personal Information</h2>
              <Edit className="w-5 h-5 text-text-secondary cursor-pointer hover:text-text-primary transition-colors" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gradient-purple" />
                <div>
                  <p className="text-sm text-text-muted">Email</p>
                  <p className="text-text-primary">john.doe@email.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gradient-orange" />
                <div>
                  <p className="text-sm text-text-muted">Phone</p>
                  <p className="text-text-primary">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gradient-purple" />
                <div>
                  <p className="text-sm text-text-muted">Member Since</p>
                  <p className="text-text-primary">January 2024</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gradient-orange" />
                <div>
                  <p className="text-sm text-text-muted">Location</p>
                  <p className="text-text-primary">New York, NY</p>
                </div>
              </div>
            </div>
          </div>
        </GradientCard>

        {/* Account Settings */}
        <GradientCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold gradient-text">Account Settings</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gradient-purple" />
                  <span className="text-text-primary">Subscription</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gaming-success font-semibold">Personal+</p>
                  <p className="text-xs text-text-muted">$24.99/month</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gradient-orange" />
                  <span className="text-text-primary">Notifications</span>
                </div>
                <button className="text-sm gradient-text font-medium">Manage</button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gradient-purple" />
                  <span className="text-text-primary">Privacy & Security</span>
                </div>
                <button className="text-sm gradient-text font-medium">Settings</button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-gradient-orange" />
                  ) : (
                    <Sun className="w-5 h-5 text-gradient-orange" />
                  )}
                  <span className="text-text-primary">Theme</span>
                </div>
                <button 
                  onClick={toggleTheme}
                  className="text-sm gradient-text font-medium capitalize"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          </div>
        </GradientCard>

        {/* Study Statistics */}
        <GradientCard>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold gradient-text">Study Statistics</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="gradient-outline rounded-lg p-1 mb-2">
                  <div className="gradient-outline-content rounded-lg p-3">
                    <p className="text-2xl font-bold text-gradient-purple">142</p>
                    <p className="text-xs text-text-muted">Cards Studied</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="gradient-outline rounded-lg p-1 mb-2">
                  <div className="gradient-outline-content rounded-lg p-3">
                    <p className="text-2xl font-bold text-gradient-orange">89%</p>
                    <p className="text-xs text-text-muted">Accuracy Rate</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="gradient-outline rounded-lg p-1 mb-2">
                  <div className="gradient-outline-content rounded-lg p-3">
                    <p className="text-2xl font-bold text-gaming-success">24</p>
                    <p className="text-xs text-text-muted">Quests Completed</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="gradient-outline rounded-lg p-1 mb-2">
                  <div className="gradient-outline-content rounded-lg p-3">
                    <p className="text-2xl font-bold text-gaming-xp">15</p>
                    <p className="text-xs text-text-muted">Achievements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GradientCard>

        {/* Support & Help */}
        <GradientCard>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold gradient-text">Support & Help</h2>
            
            <div className="space-y-3">
              <button className="flex items-center gap-3 w-full text-left hover:bg-surface-muted rounded-lg p-2 transition-colors">
                <HelpCircle className="w-5 h-5 text-gradient-purple" />
                <span className="text-text-primary">Help Center</span>
              </button>
              
              <button className="flex items-center gap-3 w-full text-left hover:bg-surface-muted rounded-lg p-2 transition-colors">
                <Mail className="w-5 h-5 text-gradient-orange" />
                <span className="text-text-primary">Contact Support</span>
              </button>
              
              <button className="flex items-center gap-3 w-full text-left hover:bg-surface-muted rounded-lg p-2 transition-colors">
                <Settings className="w-5 h-5 text-gradient-purple" />
                <span className="text-text-primary">App Settings</span>
              </button>
            </div>
          </div>
        </GradientCard>

        {/* Logout */}
        <GradientCard className="cursor-pointer hover:scale-[1.02]">
          <button 
            onClick={onLogout}
            className="flex items-center justify-center gap-3 w-full text-error"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </GradientCard>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};
