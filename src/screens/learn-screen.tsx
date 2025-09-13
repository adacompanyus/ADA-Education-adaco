import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Target, Sparkles, Play, Users, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { AP_CURRICULUM } from '@/data/ap-curriculum';
import { useToast } from '@/components/ui/use-toast';

const subjects = [
  "AP Calculus AB",
  "AP Biology", 
  "AP US History",
  "AP Chemistry",
  "AP Physics 1",
  "AP English Literature"
];

interface Question {
  front: string;
  back: string;
  unit: string;
  type: 'true-false' | 'multiple-choice' | 'typing';
  options?: string[];
  correctAnswer?: number;
}

export const LearnScreen: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const { toast } = useToast();

  const congratulations = [
    "Excellent! 🎉", "Perfect! ⭐", "Outstanding! 🚀", "Brilliant! 💡", 
    "Amazing! 🌟", "Fantastic! 🎊", "Superb! 👏", "Incredible! 🔥",
    "Well done! 🎯", "Awesome! ⚡", "Magnificent! 🏆", "Spectacular! ✨"
  ];

  // Generate questions from curriculum
  useEffect(() => {
    const curriculum = AP_CURRICULUM[selectedSubject] || [];
    if (curriculum.length === 0) return;

    const allFlashcards = curriculum.flatMap(unit =>
      unit.flashcards.map(card => ({ ...card, unit: unit.name }))
    );

    const shuffled = allFlashcards.sort(() => Math.random() - 0.5);
    const gameQuestions: Question[] = shuffled.map((card, index) => {
      const questionTypes: ('true-false' | 'multiple-choice' | 'typing')[] = ['true-false', 'multiple-choice', 'typing'];
      const type = questionTypes[index % 3];
      
      if (type === 'multiple-choice') {
        // Create wrong answers from other cards
        const wrongAnswers = allFlashcards
          .filter(c => c.back !== card.back)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(c => c.back);
        
        const options = [card.back, ...wrongAnswers].sort(() => Math.random() - 0.5);
        const correctAnswer = options.indexOf(card.back);
        
        return {
          ...card,
          type,
          options,
          correctAnswer
        };
      }
      
      return { ...card, type };
    });

    setQuestions(gameQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
  }, [selectedSubject]);

  const checkAnswer = () => {
    const question = questions[currentQuestion];
    let correct = false;

    if (question.type === 'true-false') {
      correct = userAnswer.toLowerCase() === 'true' || userAnswer.toLowerCase() === 'false';
    } else if (question.type === 'multiple-choice') {
      correct = selectedOption === question.correctAnswer;
    } else if (question.type === 'typing') {
      const answer = userAnswer.toLowerCase().trim();
      const correctAnswer = question.back.toLowerCase();
      correct = correctAnswer.includes(answer) || answer.includes(correctAnswer);
    }

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setMaxStreak(prev => Math.max(prev, streak + 1));
      
      const randomCongrats = congratulations[Math.floor(Math.random() * congratulations.length)];
      toast({
        title: randomCongrats,
        description: `Streak: ${streak + 1}`,
      });
    } else {
      setStreak(0);
      toast({
        title: "Not quite right",
        description: `The answer was: ${question.back}`,
        variant: "destructive"
      });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setUserAnswer('');
        setSelectedOption(null);
        setShowResult(false);
      } else {
        // End of questions - could restart or show completion
        setCurrentQuestion(0);
        setUserAnswer('');
        setSelectedOption(null);
        setShowResult(false);
      }
    }, 2000);
  };

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

      {/* Interactive Learning */}
      <div className="space-y-4">
        {questions.length > 0 ? (
          <GradientCard>
            <div className="space-y-4">
              {/* Progress */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Question {currentQuestion + 1} of {questions.length}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gaming-xp">Score: {score}</span>
                  <span className="text-sm text-gradient-purple">Streak: {streak}</span>
                </div>
              </div>
              
              <div className="w-full bg-surface-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="text-center space-y-4">
                <div className="text-xs text-text-muted">{questions[currentQuestion]?.unit}</div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {questions[currentQuestion]?.front}
                </h3>
                
                {/* Answer Interface */}
                {!showResult && (
                  <div className="space-y-3">
                    {questions[currentQuestion]?.type === 'true-false' && (
                      <div className="flex gap-3 justify-center">
                        <GradientButton 
                          onClick={() => { setUserAnswer('true'); setTimeout(checkAnswer, 100); }}
                          className="flex-1 max-w-24"
                        >
                          True
                        </GradientButton>
                        <GradientButton 
                          onClick={() => { setUserAnswer('false'); setTimeout(checkAnswer, 100); }}
                          variant="secondary"
                          className="flex-1 max-w-24"
                        >
                          False
                        </GradientButton>
                      </div>
                    )}
                    
                    {questions[currentQuestion]?.type === 'multiple-choice' && (
                      <div className="space-y-2">
                        {questions[currentQuestion]?.options?.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => { setSelectedOption(index); setTimeout(checkAnswer, 100); }}
                            className="w-full p-3 text-left rounded-lg border border-card-border bg-surface hover:border-gradient-purple transition-all"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {questions[currentQuestion]?.type === 'typing' && (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder="Type your answer..."
                          className="w-full p-3 rounded-lg border border-card-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-gradient-purple"
                          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                        />
                        <GradientButton onClick={checkAnswer} disabled={!userAnswer.trim()} className="w-full">
                          Submit Answer
                        </GradientButton>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Result */}
                {showResult && (
                  <div className={`p-4 rounded-lg ${isCorrect ? 'bg-gaming-success/10 border border-gaming-success' : 'bg-gaming-error/10 border border-gaming-error'}`}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-gaming-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gaming-error" />
                      )}
                      <span className={`font-medium ${isCorrect ? 'text-gaming-success' : 'text-gaming-error'}`}>
                        {isCorrect ? congratulations[Math.floor(Math.random() * congratulations.length)] : 'Not quite right'}
                      </span>
                    </div>
                    <div className="text-sm text-text-primary">
                      <strong>Correct Answer:</strong> {questions[currentQuestion]?.back}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </GradientCard>
        ) : (
          <GradientCard>
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary">No curriculum available for {selectedSubject}</p>
            </div>
          </GradientCard>
        )}
      </div>
    </div>
  );
};