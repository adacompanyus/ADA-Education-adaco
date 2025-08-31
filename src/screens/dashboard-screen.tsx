import React, { useState, useEffect } from 'react';
import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { ParticleBackground } from '@/components/animations/particle-background';
import { CurriculumFlashcards } from '@/components/curriculum-flashcards';
import { QuickQuiz } from '@/components/mini-games/quick-quiz';
import { MemoryMatch } from '@/components/mini-games/memory-match';
import { TimeTrial } from '@/components/mini-games/time-trial';
import { WordScramble } from '@/components/mini-games/word-scramble';
import { SpeedMatch } from '@/components/mini-games/speed-match';
import { AITutorScreen } from './ai-tutor-screen';
import { QuestsScreen } from './quests-screen';
import { AppSettings } from '@/components/app-settings';
import { MiniGameLauncher } from '@/components/mini-game-launcher';
import { useTheme } from '@/contexts/theme-context';
import { supabase } from '@/integrations/supabase/client';
import { getProductByPriceId } from '@/stripe-config';
import { Star, Target, Trophy, Zap, Brain, Timer, Shuffle, Flame, Award, RotateCcw, ChevronDown, ChevronLeft, ChevronRight, User, Settings, CreditCard, Bell, Shield, HelpCircle, Moon, Sun, Mail, Phone, Calendar, MapPin, Edit, LogOut, Crown } from 'lucide-react';

interface DashboardScreenProps {
  user: {
    name: string;
  };
  selectedSubjects: string[];
  onLogout: () => void;
}

const minigames = [{
  id: 'quick-quiz',
  title: 'Quick Quiz',
  description: 'Rapid-fire questions',
  icon: Zap,
  xpReward: 25,
  difficulty: 'Easy'
}, {
  id: 'memory-match',
  title: 'Memory Match',
  description: 'Match concepts',
  icon: Brain,
  xpReward: 35,
  difficulty: 'Medium'
}, {
  id: 'time-trial',
  title: 'Time Trial',
  description: 'Beat the clock',
  icon: Timer,
  xpReward: 50,
  difficulty: 'Hard'
}, {
  id: 'word-scramble',
  title: 'Word Scramble',
  description: 'Unscramble terms',
  icon: Shuffle,
  xpReward: 30,
  difficulty: 'Medium'
}, {
  id: 'speed-match',
  title: 'Speed Match',
  description: 'Quick matching',
  icon: Flame,
  xpReward: 40,
  difficulty: 'Hard'
}];

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  selectedSubjects,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState(selectedSubjects[0] || '');
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [showAppSettings, setShowAppSettings] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch subscription data
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();
        
        setSubscriptionData(data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };

    fetchSubscription();
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getSubscriptionInfo = () => {
    if (!subscriptionData?.price_id) return null;
    const product = getProductByPriceId(subscriptionData.price_id);
    return product;
  };

  if (activeTab === 'dashboard') {
    const subscriptionInfo = getSubscriptionInfo();
    
    return <div className="min-h-screen bg-background relative pb-20">
        <ParticleBackground />
        
        <div className="relative z-10 p-6 space-y-6">
          {/* Greeting Header */}
          <div className="text-center animate-fade-in">
            <h1 className="text-2xl font-bold text-text-primary">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-text-secondary">Ready to level up your knowledge?</p>
            
            {/* Subscription Status */}
            {subscriptionInfo && (
              <div className="mt-4 flex justify-center">
                <div className="gradient-outline rounded-full p-1">
                  <div className="gradient-outline-content rounded-full px-4 py-2 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-gradient-orange" />
                    <span className="text-sm font-semibold gradient-text">
                      {subscriptionInfo.name.includes('Personal+') ? 'Personal+' : 'Personal'} Plan
                    </span>
                  </div>
                </div>
              </div>
            )}
            
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
            <button onClick={() => setShowSubjectDropdown(!showSubjectDropdown)} className="w-full gradient-outline rounded-lg p-1">
              <div className="gradient-outline-content px-4 py-3 flex items-center justify-between">
                <span className="font-medium text-text-primary">{selectedSubject}</span>
                <ChevronDown className="w-5 h-5 text-gradient-purple" />
              </div>
            </button>

            {showSubjectDropdown && <div className="absolute top-full left-0 right-0 mt-2 gradient-outline rounded-lg p-1 z-50 animate-scale-in">
                <div className="gradient-outline-content rounded-lg max-h-48 overflow-y-auto">
                  {selectedSubjects.map(subject => <button key={subject} onClick={() => {
                setSelectedSubject(subject);
                setShowSubjectDropdown(false);
              }} className="w-full text-left px-4 py-3 hover:bg-surface-muted transition-colors text-text-primary">
                      {subject}
                    </button>)}
                </div>
              </div>}
          </div>

          {/* Curriculum Flashcards */}
          <CurriculumFlashcards selectedSubject={selectedSubject} />

          {/* Minigames */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">Minigames</h2>
            
            <div className="grid gap-4">
              {minigames.map(game => {
              const Icon = game.icon;
              return <GradientCard key={game.id} className="cursor-pointer hover:scale-[1.02]">
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
                      <GradientButton size="sm" onClick={() => setActiveGame(game.id)}>
                        Play
                      </GradientButton>
                    </div>
                  </GradientCard>;
            })}
            </div>
          </div>

          {/* Active Game Modal */}
          {activeGame && <div className="fixed inset-0 w-screen h-screen bg-background/80 backdrop-blur-sm z-[9999] overflow-y-auto !m-0 top-0 left-0">
              <div className="max-w-2xl mx-auto p-4">
                <MiniGameLauncher gameId={activeGame} subject={selectedSubject} onClose={() => setActiveGame(null)} />
              </div>
            </div>}

          {/* App Settings Modal - Show on any tab */}
          {showAppSettings && <AppSettings onClose={() => setShowAppSettings(false)} />}
        </div>

        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>;
  }

  // AI Tutor Tab
  if (activeTab === 'ai-tutor') {
    return <>
        <AITutorScreen user={user} selectedSubjects={selectedSubjects} activeTab={activeTab} onTabChange={setActiveTab} />
        {/* App Settings Modal - Global */}
        {showAppSettings && <AppSettings onClose={() => setShowAppSettings(false)} />}
      </>;
  }

  // Quests Tab
  if (activeTab === 'quests') {
    return <>
        <QuestsScreen activeTab={activeTab} onTabChange={setActiveTab} />
        {/* App Settings Modal - Global */}
        {showAppSettings && <AppSettings onClose={() => setShowAppSettings(false)} />}
      </>;
  }

  // Store Tab
  if (activeTab === 'store') {
    return <div className="min-h-screen bg-background relative pb-20">
        <ParticleBackground />
        <div className="relative z-10 p-6 space-y-6">
          <h1 className="text-2xl font-bold text-text-primary text-center">Token Store</h1>
          
          <div className="text-center">
            <div className="gradient-outline rounded-full p-1 inline-block mt-2">
              <div className="gradient-outline-content rounded-full px-4 py-1">
                <span className="gradient-text font-semibold">🪙 1,250 Tokens</span>
              </div>
            </div>
          </div>
          
          {/* Avatars */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold gradient-text">Avatars</h2>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🐱</span>
                  <div>
                    <h3 className="font-medium text-text-primary">Scholar Cat</h3>
                    <p className="text-sm text-text-secondary">Wise feline companion</p>
                  </div>
                </div>
                <GradientButton size="sm">300 🪙</GradientButton>
              </div>
            </GradientCard>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🦉</span>
                  <div>
                    <h3 className="font-medium text-text-primary">Wise Owl</h3>
                    <p className="text-sm text-text-secondary">Nocturnal study buddy</p>
                  </div>
                </div>
                <GradientButton size="sm">400 🪙</GradientButton>
              </div>
            </GradientCard>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🐉</span>
                  <div>
                    <h3 className="font-medium text-text-primary">Study Dragon</h3>
                    <p className="text-sm text-text-secondary">Mythical learning companion</p>
                  </div>
                </div>
                <GradientButton size="sm">750 🪙</GradientButton>
              </div>
            </GradientCard>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <h3 className="font-medium text-text-primary">AI Assistant</h3>
                    <p className="text-sm text-text-secondary">Future tech avatar</p>
                  </div>
                </div>
                <GradientButton size="sm">600 🪙</GradientButton>
              </div>
            </GradientCard>
          </div>

          {/* Power-ups */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold gradient-text">Power-ups</h2>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <h3 className="font-medium text-text-primary">Streak Freeze</h3>
                    <p className="text-sm text-text-secondary">Protect your streak for 1 day</p>
                  </div>
                </div>
                <GradientButton size="sm">100 🪙</GradientButton>
              </div>
            </GradientCard>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h3 className="font-medium text-text-primary">XP Booster</h3>
                    <p className="text-sm text-text-secondary">Double XP for 1 hour</p>
                  </div>
                </div>
                <GradientButton size="sm">150 🪙</GradientButton>
              </div>
            </GradientCard>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💎</span>
                  <div>
                    <h3 className="font-medium text-text-primary">Gem Multiplier</h3>
                    <p className="text-sm text-text-secondary">2x tokens for next game</p>
                  </div>
                </div>
                <GradientButton size="sm">200 🪙</GradientButton>
              </div>
            </GradientCard>
          </div>

          {/* Special Items */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold gradient-text">Special Items</h2>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h3 className="font-medium text-text-primary">Accuracy Badge</h3>
                    <p className="text-sm text-text-secondary">Perfect score achievement</p>
                  </div>
                </div>
                <GradientButton size="sm">500 🪙</GradientButton>
              </div>
            </GradientCard>
            <GradientCard className="cursor-pointer hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👑</span>
                  <div>
                    <h3 className="font-medium text-text-primary">Master Crown</h3>
                    <p className="text-sm text-text-secondary">Complete subject mastery</p>
                  </div>
                </div>
                <GradientButton size="sm">1000 🪙</GradientButton>
              </div>
            </GradientCard>
          </div>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* App Settings Modal - Global */}
        {showAppSettings && <AppSettings onClose={() => setShowAppSettings(false)} />}
      </div>;
  }

  // Profile Tab (default)
  const {
    theme,
    toggleTheme
  } = useTheme();
  const subscriptionInfo = getSubscriptionInfo();
  
  return <div className="min-h-screen bg-background relative pb-20">
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
            <h1 className="text-2xl font-bold gradient-text">{user.name}</h1>
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

        {/* Subscription Status */}
        {subscriptionInfo && (
          <GradientCard>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold gradient-text">Subscription</h2>
                <Crown className="w-5 h-5 text-gradient-orange" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-primary">Plan</span>
                  <span className="font-semibold text-gradient-purple">
                    {subscriptionInfo.name.includes('Personal+') ? 'Personal+' : 'Personal'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-primary">Price</span>
                  <span className="text-gaming-success font-semibold">
                    ${subscriptionInfo.price}/{subscriptionInfo.interval}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-primary">Status</span>
                  <span className="text-gaming-success font-medium capitalize">
                    {subscriptionData?.subscription_status || 'Active'}
                  </span>
                </div>
                
                {subscriptionData?.current_period_end && (
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary">Next billing</span>
                    <span className="text-text-secondary text-sm">
                      {new Date(subscriptionData.current_period_end * 1000).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </GradientCard>
        )}

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
                  <p className="text-text-primary">{user.name}@email.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gradient-purple" />
                <div>
                  <p className="text-sm text-text-muted">Member Since</p>
                  <p className="text-text-primary">January 2024</p>
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
                  {theme === 'dark' ? <Moon className="w-5 h-5 text-gradient-orange" /> : <Sun className="w-5 h-5 text-gradient-orange" />}
                  <span className="text-text-primary">Theme</span>
                </div>
                <button onClick={toggleTheme} className="text-sm gradient-text font-medium capitalize">
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
              
              <button onClick={() => {
              const emailSubject = encodeURIComponent('ADA App Support Request');
              const emailBody = encodeURIComponent('Hello ADA Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nThanks!');
              window.open(`mailto:adacompanyus@gmail.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
            }} className="flex items-center gap-3 w-full text-left hover:bg-surface-muted rounded-lg p-2 transition-colors">
                <Mail className="w-5 h-5 text-gradient-orange" />
                <span className="text-text-primary">Contact Support</span>
              </button>
              
              <button onClick={() => setShowAppSettings(true)} className="flex items-center gap-3 w-full text-left hover:bg-surface-muted rounded-lg p-2 transition-colors">
                <Settings className="w-5 h-5 text-gradient-purple" />
                <span className="text-text-primary">App Settings</span>
              </button>
            </div>
          </div>
        </GradientCard>

        {/* Logout */}
        <GradientCard className="cursor-pointer hover:scale-[1.02]">
          <button onClick={onLogout} className="flex items-center justify-center gap-3 w-full text-error">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </GradientCard>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* App Settings Modal - Global */}
      {showAppSettings && <AppSettings onClose={() => setShowAppSettings(false)} />}
    </div>;
};