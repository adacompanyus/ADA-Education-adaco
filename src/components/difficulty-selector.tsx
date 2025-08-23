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
  Brain
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
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <GradientCard className="w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <div className="gradient-outline rounded-full p-1 w-16 h-16 mx-auto mb-4">
              <div className="gradient-outline-content rounded-full w-full h-full bg-surface flex items-center justify-center">
                <Brain className="w-8 h-8 text-gradient-purple" />
              </div>
            </div>
            <h2 className="text-xl font-bold gradient-text">Select Difficulty</h2>
            <p className="text-text-secondary text-sm">{gameType}</p>
          </div>

          <div className="space-y-3">
            {difficulties.map((diff) => {
              const Icon = diff.icon;
              return (
                <button
                  key={diff.level}
                  onClick={() => onSelect(diff.level)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:scale-[1.02] ${diff.borderColor} bg-gradient-to-r ${diff.bgColor}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-6 h-6 ${diff.color} flex-shrink-0 mt-1`} />
                    <div className="flex-1">
                      <h3 className={`font-bold ${diff.color} text-lg`}>
                        {diff.level}
                      </h3>
                      <p className="text-text-secondary text-sm mb-2">
                        {diff.description}
                      </p>
                      <ul className="space-y-1">
                        {diff.features.map((feature, index) => (
                          <li key={index} className="text-xs text-text-muted flex items-center gap-2">
                            <div className="w-1 h-1 bg-current rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <GradientButton 
              onClick={onClose} 
              variant="secondary" 
              className="flex-1"
            >
              Cancel
            </GradientButton>
          </div>
        </div>
      </GradientCard>
    </div>
  );
};