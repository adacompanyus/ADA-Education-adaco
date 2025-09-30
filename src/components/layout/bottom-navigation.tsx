import React from 'react';
import { Chrome as Home, Bot, BookOpen, Gamepad2, Target, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'ai-tutor', label: 'AI Tutor', icon: Bot },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'games', label: 'Games', icon: Gamepad2 },
  { id: 'quests', label: 'Quests', icon: Target },
  { id: 'store', label: 'Store', icon: ShoppingBag },
  { id: 'profile', label: 'Profile', icon: User },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface-elevated/70 backdrop-blur-md border-t border-card-border z-50">
      <div className="flex justify-around items-center py-1 px-4 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 py-1.5 px-2 transition-all duration-300 hover:bg-surface-muted rounded-lg"
            >
              <div className={cn(
                'p-1.5 rounded-lg transition-all duration-300',
                isActive ? 'gradient-outline' : ''
              )}>
                <div className={cn(
                  'p-0.5 rounded-lg transition-all duration-300',
                  isActive && 'gradient-outline-content'
                )}>
                  <Icon 
                    className={cn(
                      'w-4 h-4 transition-colors duration-300',
                      isActive ? 'text-gradient-purple' : 'text-text-muted'
                    )} 
                  />
                </div>
              </div>
              <span className={cn(
                'text-xs font-medium transition-colors duration-300 text-center',
                isActive ? 'gradient-text' : 'text-text-muted'
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};