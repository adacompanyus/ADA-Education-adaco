
import React from 'react';
import { GradientCard } from './ui/gradient-card';
import { GradientButton } from './ui/gradient-button';
import { 
  Star, 
  Zap, 
  Flame,
  Trophy,
  Target,
  Clock,
  Brain,
  X
} from 'lucide-react';

interface DifficultySelectorProps {
  onSelect: (difficulty: 'Easy' | 'Medium' | 'Hard') => void;
  onClose: () => void;
  gameType: string;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  onSelect,
  onClose,
  gameType
}) => {
  const difficulties = [
    {
      level: 'Easy' as const,
      icon: Star,
      color: 'text-gaming-success',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-gaming-success/30',
      description: 'Perfect for beginners',
      features: [
        'More time per question',
        'Fewer distractors',
        'Basic concepts'
      ]
    },
    {
      level: 'Medium' as const,
      icon: Target,
      color: 'text-gaming-warning',
      bgColor: 'from-orange-500/10 to-yellow-500/10',
      borderColor: 'border-gaming-warning/30',
      description: 'Good challenge level',
      features: [
        'Standard time limits',
        'Mixed difficulty concepts',
        'Some advanced topics'
      ]
    },
    {
      level: 'Hard' as const,
      icon: Flame,
      color: 'text-gaming-error',
      bgColor: 'from-red-500/10 to-pink-500/10',
      borderColor: 'border-gaming-error/30',
      description: 'For advanced players',
      features: [
        'Limited time',
        'Complex concepts',
        'Maximum challenge'
      ]
    }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-background z-[9999] overflow-hidden">
      <div className="w-full h-full flex items-center justify-center p-4">
        <GradientCard className="w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold gradient-text">Select Difficulty</h2>
              <button onClick={onClose} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-4">
              <div className="gradient-outline rounded-full p-1 w-16 h-16 mx-auto mb-4">
                <div className="gradient-outline-content rounded-full w-full h-full bg-surface flex items-center justify-center">
                  <Brain className="w-8 h-8 text-gradient-purple" />
                </div>
              </div>
              <p className="text-text-secondary text-sm">{gameType}</p>
            </div>

            <div className="space-y-3">
              {difficulties.map((diff) => {
                const Icon = diff.icon;
                return (
                  <div
                    key={diff.level}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-text-primary flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${diff.color}`} />
                          {diff.level}
                        </p>
                        <p className="text-sm text-text-secondary">{diff.description}</p>
                      </div>
                      <GradientButton onClick={() => onSelect(diff.level)}>
                        Select
                      </GradientButton>
                    </div>
                    
                    <div className="ml-7 space-y-1">
                      {diff.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-text-muted rounded-full" />
                          <span className="text-xs text-text-muted">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-4">
              <GradientButton variant="secondary" onClick={onClose} className="flex-1">
                Cancel
              </GradientButton>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
};
