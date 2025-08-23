import React from 'react';
import { Home, Trophy, ShoppingBag, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'ai-tutor', label: 'AI Tutor', icon: Trophy },
  { id: 'store', label: 'Store', icon: ShoppingBag },
  { id: 'profile', label: 'Profile', icon: User },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface-elevated border-t border-card-border z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 py-2 px-3 transition-all duration-300 hover:bg-surface-muted rounded-lg"
            >
              <div className={cn(
                'p-2 rounded-lg transition-all duration-300',
                isActive ? 'gradient-outline' : ''
              )}>
                <div className={cn(
                  'p-1 rounded-lg transition-all duration-300',
                  isActive && 'gradient-outline-content'
                )}>
                  <Icon 
                    className={cn(
                      'w-5 h-5 transition-colors duration-300',
                      isActive ? 'text-gradient-purple' : 'text-text-muted'
                    )} 
                  />
                </div>
              </div>
              <span className={cn(
                'text-xs font-medium transition-colors duration-300',
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