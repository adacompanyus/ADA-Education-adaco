import React, { useState } from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { GradientCard } from '@/components/ui/gradient-card';
import { ParticleBackground } from '@/components/animations/particle-background';
import { ChevronRight, Check } from 'lucide-react';

interface QuestionnaireScreenProps {
  onComplete: (data: { usage: string; subjects: string[] }) => void;
}

const apSubjects = [
  'AP Calculus AB', 'AP Calculus BC', 'AP Statistics', 'AP Computer Science A',
  'AP Computer Science Principles', 'AP Physics 1', 'AP Physics 2', 'AP Physics C: Mechanics',
  'AP Physics C: Electricity and Magnetism', 'AP Chemistry', 'AP Biology',
  'AP Environmental Science', 'AP English Language and Composition',
  'AP English Literature and Composition', 'AP World History: Modern',
  'AP US History', 'AP European History', 'AP Government and Politics',
  'AP Macroeconomics', 'AP Microeconomics', 'AP Psychology',
  'AP Human Geography', 'AP Art History', 'AP Studio Art',
  'AP Music Theory', 'AP Spanish Language and Culture', 'AP French Language and Culture',
  'AP German Language and Culture', 'AP Italian Language and Culture',
  'AP Japanese Language and Culture', 'AP Chinese Language and Culture',
  'AP Latin', 'AP Seminar', 'AP Research'
];

export const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [usage, setUsage] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleUsageSelect = (value: string) => {
    setUsage(value);
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleContinue = () => {
    if (step === 1 && usage) {
      setStep(2);
    } else if (step === 2 && selectedSubjects.length > 0) {
      onComplete({ usage, subjects: selectedSubjects });
    }
  };

  const canContinue = (step === 1 && usage) || (step === 2 && selectedSubjects.length > 0);

  return (
    <div className="min-h-screen bg-background relative flex flex-col p-6">
      <ParticleBackground />
      
      <div className="relative z-10 flex-1 max-w-md mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="flex space-x-2">
              <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-gradient-purple' : 'bg-surface-muted'}`} />
              <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-gradient-purple' : 'bg-surface-muted'}`} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {step === 1 ? 'Getting Started' : 'Choose Your Subjects'}
          </h1>
          <p className="text-text-secondary">
            {step === 1 
              ? 'Help us personalize your experience'
              : 'Select the AP courses you want to study'
            }
          </p>
        </div>

        {/* Step 1: Usage Type */}
        {step === 1 && (
          <div className="space-y-4 animate-slide-up">
            <h2 className="text-lg font-semibold text-text-primary mb-6">
              How will you be using ADA?
            </h2>
            
            <GradientCard
              selectable
              selected={usage === 'school'}
              onClick={() => handleUsageSelect('school')}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-primary">School Use</h3>
                  <p className="text-sm text-text-secondary">
                    Supplement your classroom learning
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gradient-purple" />
              </div>
            </GradientCard>

            <GradientCard
              selectable
              selected={usage === 'personal'}
              onClick={() => handleUsageSelect('personal')}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-text-primary">Personal Study</h3>
                  <p className="text-sm text-text-secondary">
                    Self-directed AP preparation
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gradient-purple" />
              </div>
            </GradientCard>
          </div>
        )}

        {/* Step 2: Subject Selection */}
        {step === 2 && (
          <div className="space-y-4 animate-slide-up">
            <div className="text-center mb-6">
              <p className="text-sm text-text-secondary">
                {selectedSubjects.length} subject{selectedSubjects.length !== 1 ? 's' : ''} selected
              </p>
            </div>
            
            <div className="max-h-96 overflow-y-auto space-y-3 pb-20">
              {apSubjects.map((subject) => (
                <GradientCard
                  key={subject}
                  selectable
                  selected={selectedSubjects.includes(subject)}
                  onClick={() => handleSubjectToggle(subject)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-primary">
                      {subject}
                    </span>
                    {selectedSubjects.includes(subject) && (
                      <Check className="w-5 h-5 text-gaming-success" />
                    )}
                  </div>
                </GradientCard>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="fixed bottom-6 left-6 right-6 max-w-md mx-auto">
          <GradientButton
            size="lg"
            className="w-full"
            onClick={handleContinue}
            disabled={!canContinue}
          >
            Continue
          </GradientButton>
        </div>
      </div>
    </div>
  );
};