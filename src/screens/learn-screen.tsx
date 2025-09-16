import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Target, Sparkles, Clock, MessageCircle, Grid } from 'lucide-react';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { LearnModeLauncher } from '@/components/learn-mode-launcher';

type StudyMode = 'flashcards' | 'learn' | 'test' | 'match' | 'spaced-repetition' | 'write';

interface LearnScreenProps {
  selectedSubjects: string[];
}

export const LearnScreen: React.FC<LearnScreenProps> = ({ selectedSubjects }) => {
  const [selectedSubject, setSelectedSubject] = useState(selectedSubjects[0] || '');
  const [studyMode, setStudyMode] = useState<StudyMode>('flashcards');
  const [activeLauncher, setActiveLauncher] = useState<StudyMode | null>(null);

  const studyModes = [
    {
      id: 'flashcards',
      name: 'Flashcards',
      description: 'Classic card review',
      icon: BookOpen,
      color: 'text-gradient-purple'
    },
    {
      id: 'learn',
      name: 'Learn',
      description: 'Adaptive learning with feedback',
      icon: Brain,
      color: 'text-gradient-orange'
    },
    {
      id: 'test',
      name: 'Test',
      description: 'Quiz yourself without hints',
      icon: Target,
      color: 'text-gaming-error'
    },
    {
      id: 'match',
      name: 'Match',
      description: 'Match terms with definitions',
      icon: Grid,
      color: 'text-gaming-success'
    },
    {
      id: 'spaced-repetition',
      name: 'Spaced Repetition',
      description: 'Scientifically optimized review',
      icon: Clock,
      color: 'text-gradient-purple'
    },
    {
      id: 'write',
      name: 'Write',
      description: 'Type out the answers',
      icon: MessageCircle,
      color: 'text-gradient-orange'
    }
  ];

  if (activeLauncher) {
    return (
      <LearnModeLauncher 
        mode={activeLauncher} 
        subject={selectedSubject} 
        onClose={() => setActiveLauncher(null)} 
      />
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="gradient-outline rounded-full p-1">
          <div className="gradient-outline-content p-2">
            <BookOpen className="w-6 h-6 text-gradient-purple" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Learn Mode</h1>
          <p className="text-sm text-text-secondary">Master your subjects with adaptive study tools</p>
        </div>
      </div>

      {/* Subject Selection */}
      <GradientCard>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gradient-orange" />
            Select Subject
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {selectedSubjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  selectedSubject === subject
                    ? 'gradient-outline'
                    : 'bg-surface-muted text-text-secondary hover:bg-surface'
                }`}
              >
                <div className={selectedSubject === subject ? 'gradient-outline-content p-2' : ''}>
                  {subject}
                </div>
              </button>
            ))}
          </div>
        </div>
      </GradientCard>

      {/* Study Mode Selector */}
      <GradientCard>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gradient-orange" />
            Study Mode
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {studyModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveLauncher(mode.id as StudyMode)}
                  className="p-4 rounded-lg text-left transition-all bg-surface-muted text-text-secondary hover:bg-surface hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-5 h-5 ${mode.color}`} />
                    <span className="font-medium text-sm text-text-primary">{mode.name}</span>
                  </div>
                  <p className="text-xs text-text-muted">{mode.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </GradientCard>
    </div>
  );
};