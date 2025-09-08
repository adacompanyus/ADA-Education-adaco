import React, { useState } from 'react';
import { BookOpen, Brain, Target, Sparkles, Play, Users, Trophy } from 'lucide-react';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { AIFlashcardGenerator } from '@/components/ai-flashcard-generator';
import { CurriculumFlashcards } from '@/components/curriculum-flashcards';

const subjects = [
  "AP Calculus AB",
  "AP Biology", 
  "AP US History",
  "AP Chemistry",
  "AP Physics 1",
  "AP English Literature"
];

const studyModes = [
  {
    id: 'flashcards',
    title: 'AI Flashcards',
    description: 'Study with AI-generated flashcards',
    icon: Brain,
    color: 'text-gradient-purple'
  },
  {
    id: 'curriculum',
    title: 'Curriculum Cards',
    description: 'Official AP curriculum flashcards',
    icon: BookOpen,
    color: 'text-gradient-orange'
  },
  {
    id: 'practice',
    title: 'Practice Mode',
    description: 'Test your knowledge with quizzes',
    icon: Target,
    color: 'text-gaming-success'
  },
  {
    id: 'group',
    title: 'Study Groups',
    description: 'Learn with other students',
    icon: Users,
    color: 'text-gradient-blue'
  }
];

export const LearnScreen: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedMode, setSelectedMode] = useState('flashcards');

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
          <p className="text-sm text-text-secondary">Master your subjects with interactive study tools</p>
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
            {subjects.map((subject) => (
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

      {/* Study Mode Selection */}
      <GradientCard>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-gradient-purple" />
            Study Mode
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {studyModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`p-4 rounded-lg text-left transition-all ${
                    selectedMode === mode.id
                      ? 'gradient-outline'
                      : 'bg-surface-muted hover:bg-surface'
                  }`}
                >
                  <div className={selectedMode === mode.id ? 'gradient-outline-content p-3' : ''}>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-5 h-5 ${mode.color}`} />
                      <h4 className="font-semibold text-text-primary">{mode.title}</h4>
                    </div>
                    <p className="text-sm text-text-secondary">{mode.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </GradientCard>

      {/* Study Content */}
      <div className="space-y-4">
        {selectedMode === 'flashcards' && (
          <AIFlashcardGenerator selectedSubject={selectedSubject} />
        )}
        
        {selectedMode === 'curriculum' && (
          <CurriculumFlashcards selectedSubject={selectedSubject} />
        )}
        
        {selectedMode === 'practice' && (
          <GradientCard>
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 text-gradient-orange mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">Practice Mode</h3>
              <p className="text-text-secondary mb-6">Test your knowledge with interactive quizzes</p>
              <GradientButton>
                <Play className="w-4 h-4 mr-2" />
                Start Practice Quiz
              </GradientButton>
            </div>
          </GradientCard>
        )}
        
        {selectedMode === 'group' && (
          <GradientCard>
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gradient-blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">Study Groups</h3>
              <p className="text-text-secondary mb-6">Join or create study groups with other students</p>
              <GradientButton>
                <Users className="w-4 h-4 mr-2" />
                Find Study Group
              </GradientButton>
            </div>
          </GradientCard>
        )}
      </div>
    </div>
  );
};