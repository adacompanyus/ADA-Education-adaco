import React, { useEffect, useState } from 'react';
import { ParticleBackground } from '@/components/animations/particle-background';
import { Brain, Atom } from 'lucide-react';

interface AILoadingScreenProps {
  onComplete: () => void;
  userInfo?: {
    usage: string;
    subjects: string[];
    theme: string;
  };
}

export const AILoadingScreen: React.FC<AILoadingScreenProps> = ({ onComplete, userInfo }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing AI...');

  useEffect(() => {
    const getPersonalizedTexts = () => {
      if (!userInfo) {
        return [
          'Initializing AI...',
          'Analyzing your preferences...',
          'Generating personalized content...',
          'Setting up your learning path...',
          'Compiling your data with AI...',
          'Almost ready!'
        ];
      }

      const subjectCount = userInfo.subjects.length;
      const usageType = userInfo.usage === 'school' ? 'school curriculum' : 'self-study goals';
      const mainSubject = userInfo.subjects[0] || 'your selected subjects';

      return [
        'Initializing AI...',
        `Analyzing your ${usageType}...`,
        `Customizing ${mainSubject} content...`,
        `Setting up your ${subjectCount} AP course${subjectCount !== 1 ? 's' : ''}...`,
        `Optimizing for ${userInfo.theme} mode learning...`,
        'Personalizing your experience...',
        'Almost ready!'
      ];
    };

    const texts = getPersonalizedTexts();

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 2, 100);
        const textIndex = Math.floor((newProgress / 100) * (texts.length - 1));
        setLoadingText(texts[textIndex]);
        
        if (newProgress >= 100) {
          setTimeout(onComplete, 1000);
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete, userInfo]);

  return (
    <div className="min-h-screen bg-background relative flex flex-col justify-center items-center p-6">
      <ParticleBackground />
      
      <div className="relative z-10 text-center space-y-8 animate-fade-in">
        {/* AI Animation Container */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Central Brain Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 gradient-outline rounded-full animate-glow-pulse">
              <div className="gradient-outline-content rounded-full flex items-center justify-center h-full">
                <Brain className="w-8 h-8 text-gradient-purple animate-bounce-gentle" />
              </div>
            </div>
          </div>
          
          {/* Orbiting Atoms */}
          <div className="absolute inset-0 animate-particle-orbit">
            <Atom className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 text-gradient-orange" />
          </div>
          <div className="absolute inset-0 animate-particle-orbit" style={{ animationDelay: '1s', animationDirection: 'reverse' }}>
            <Atom className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 text-gradient-purple-light" />
          </div>
          <div className="absolute inset-0 animate-particle-orbit" style={{ animationDelay: '2s' }}>
            <Atom className="absolute top-1/2 right-0 transform -translate-y-1/2 w-5 h-5 text-gradient-orange-light" />
          </div>

          {/* Circuit-inspired lines */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-purple opacity-60 animate-glow-pulse" />
            <div className="absolute top-1/2 right-0 w-8 h-0.5 bg-gradient-orange opacity-60 animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gradient-purple-light opacity-60 animate-glow-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-gradient-orange-light opacity-60 animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold gradient-text animate-bounce-gentle">
            {loadingText}
          </h2>
          
          {/* Progress Bar */}
          <div className="w-64 mx-auto gradient-outline rounded-full h-3">
            <div className="gradient-outline-content rounded-full h-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gradient-purple to-gradient-orange transition-all duration-200 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <p className="text-sm text-text-muted">
            {progress}% complete
          </p>
        </div>

        {/* Floating particles specific to loading */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-float opacity-40`}
              style={{
                left: `${20 + (i * 6)}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.3}s`,
                backgroundColor: i % 2 === 0 ? 'hsl(var(--gradient-purple))' : 'hsl(var(--gradient-orange))'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};