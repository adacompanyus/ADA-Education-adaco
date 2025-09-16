import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Target, Sparkles, Play, Users, Trophy, CheckCircle, XCircle, Clock, Zap, RotateCcw, Star, MessageCircle, Lightbulb, Timer, Shuffle, Grid, Award } from 'lucide-react';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { AP_CURRICULUM } from '@/data/ap-curriculum';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
  type: 'flashcard' | 'multiple-choice' | 'typing' | 'true-false';
  options?: string[];
  correctAnswer?: number;
  difficulty?: number; // 1-5 scale for spaced repetition
  lastReviewed?: Date;
  nextReview?: Date;
}

interface StudySession {
  correct: number;
  incorrect: number;
  streak: number;
  timeSpent: number;
}

type StudyMode = 'flashcards' | 'learn' | 'test' | 'match' | 'spaced-repetition' | 'write';

export const LearnScreen: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [studyMode, setStudyMode] = useState<StudyMode>('flashcards');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [session, setSession] = useState<StudySession>({ correct: 0, incorrect: 0, streak: 0, timeSpent: 0 });
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [isFlipped, setIsFlipped] = useState(false);
  const [studySettings, setStudySettings] = useState({
    smartGrading: true,
    aiExplanations: true,
    spacedRepetition: true,
    autoAdvance: false
  });
  const { toast } = useToast();

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

  const congratulations = [
    "Excellent! 🎉", "Perfect! ⭐", "Outstanding! 🚀", "Brilliant! 💡", 
    "Amazing! 🌟", "Fantastic! 🎊", "Superb! 👏", "Incredible! 🔥",
    "Well done! 🎯", "Awesome! ⚡", "Magnificent! 🏆", "Spectacular! ✨"
  ];

  // Generate questions from curriculum with spaced repetition logic
  useEffect(() => {
    const curriculum = AP_CURRICULUM[selectedSubject] || [];
    if (curriculum.length === 0) return;

    const allFlashcards = curriculum.flatMap(unit =>
      unit.flashcards.map(card => ({ ...card, unit: unit.name }))
    );

    let gameQuestions: Question[] = [];

    if (studyMode === 'spaced-repetition') {
      // Sort by next review date for spaced repetition
      gameQuestions = allFlashcards
        .map(card => ({
          ...card,
          type: 'flashcard' as const,
          difficulty: 3, // Default difficulty
          lastReviewed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random last review
          nextReview: new Date(Date.now() + Math.random() * 3 * 24 * 60 * 60 * 1000) // Random next review
        }))
        .sort((a, b) => (a.nextReview?.getTime() || 0) - (b.nextReview?.getTime() || 0));
    } else {
      const shuffled = allFlashcards.sort(() => Math.random() - 0.5);
      gameQuestions = shuffled.map((card, index) => {
        let questionType: Question['type'] = 'flashcard';
        
        if (studyMode === 'test' || studyMode === 'learn') {
          const types: Question['type'][] = ['multiple-choice', 'typing', 'true-false'];
          questionType = types[index % 3];
        } else if (studyMode === 'write') {
          questionType = 'typing';
        }
        
        if (questionType === 'multiple-choice') {
          const wrongAnswers = allFlashcards
            .filter(c => c.back !== card.back)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(c => c.back);
          
          const options = [card.back, ...wrongAnswers].sort(() => Math.random() - 0.5);
          const correctAnswer = options.indexOf(card.back);
          
          return {
            ...card,
            type: questionType,
            options,
            correctAnswer,
            difficulty: 3
          };
        }
        
        return { ...card, type: questionType, difficulty: 3 };
      });
    }

    setQuestions(gameQuestions);
    setCurrentQuestion(0);
    setSession({ correct: 0, incorrect: 0, streak: 0, timeSpent: 0 });
    setStartTime(new Date());
  }, [selectedSubject, studyMode]);

  const getAIExplanation = async (question: Question, userAnswer: string) => {
    if (!studySettings.aiExplanations) return;
    
    setLoadingExplanation(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          type: 'explanation',
          subject: selectedSubject,
          prompt: `The student answered "${userAnswer}" to the question "${question.front}". The correct answer is "${question.back}". Explain why their answer is wrong and help them understand the correct concept. Keep it under 100 words and be encouraging.`
        }
      });

      if (error) throw error;

      if (data.success) {
        setAiExplanation(data.response);
      }
    } catch (error) {
      console.error('Error getting AI explanation:', error);
    } finally {
      setLoadingExplanation(false);
    }
  };

  const updateSpacedRepetition = (question: Question, wasCorrect: boolean) => {
    if (!studySettings.spacedRepetition) return;

    const now = new Date();
    let newDifficulty = question.difficulty || 3;
    let nextReviewDays = 1;

    if (wasCorrect) {
      // Increase interval based on difficulty
      newDifficulty = Math.max(1, newDifficulty - 0.5);
      nextReviewDays = Math.pow(2, 5 - newDifficulty); // Exponential backoff
    } else {
      // Decrease interval, review sooner
      newDifficulty = Math.min(5, newDifficulty + 1);
      nextReviewDays = 1;
    }

    const nextReview = new Date(now.getTime() + nextReviewDays * 24 * 60 * 60 * 1000);
    
    // Update question in state
    setQuestions(prev => prev.map(q => 
      q === question 
        ? { ...q, difficulty: newDifficulty, lastReviewed: now, nextReview }
        : q
    ));
  };

  const gradeAnswer = (question: Question, answer: string | number): { isCorrect: boolean; confidence: number } => {
    if (!studySettings.smartGrading) {
      // Simple exact match
      if (question.type === 'multiple-choice') {
        return { isCorrect: answer === question.correctAnswer, confidence: 1.0 };
      }
      const correct = answer.toString().toLowerCase().trim() === question.back.toLowerCase().trim();
      return { isCorrect: correct, confidence: 1.0 };
    }

    // Smart grading logic
    if (question.type === 'multiple-choice') {
      return { isCorrect: answer === question.correctAnswer, confidence: 1.0 };
    }

    const userText = answer.toString().toLowerCase().trim();
    const correctText = question.back.toLowerCase().trim();
    
    // Exact match
    if (userText === correctText) {
      return { isCorrect: true, confidence: 1.0 };
    }

    // Partial match scoring
    const words = correctText.split(/\s+/);
    const userWords = userText.split(/\s+/);
    
    let matchedWords = 0;
    words.forEach(word => {
      if (userWords.some(userWord => 
        userWord.includes(word) || word.includes(userWord) || 
        levenshteinDistance(word, userWord) <= 1
      )) {
        matchedWords++;
      }
    });

    const confidence = matchedWords / words.length;
    
    // Accept if 70% or more words match
    return { 
      isCorrect: confidence >= 0.7, 
      confidence 
    };
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const checkAnswer = async () => {
    const question = questions[currentQuestion];
    let answer: string | number = '';
    
    if (question.type === 'multiple-choice') {
      answer = selectedOption || -1;
    } else {
      answer = userAnswer;
    }

    const grading = gradeAnswer(question, answer);
    setIsCorrect(grading.isCorrect);
    setShowResult(true);

    // Update session stats
    const timeSpent = (new Date().getTime() - startTime.getTime()) / 1000;
    setSession(prev => ({
      ...prev,
      correct: grading.isCorrect ? prev.correct + 1 : prev.correct,
      incorrect: grading.isCorrect ? prev.incorrect : prev.incorrect + 1,
      streak: grading.isCorrect ? prev.streak + 1 : 0,
      timeSpent: timeSpent
    }));

    // Update spaced repetition
    updateSpacedRepetition(question, grading.isCorrect);

    if (grading.isCorrect) {
      const randomCongrats = congratulations[Math.floor(Math.random() * congratulations.length)];
      toast({
        title: randomCongrats,
        description: grading.confidence < 1.0 ? `Smart grading: ${Math.round(grading.confidence * 100)}% match` : `Streak: ${session.streak + 1}`,
      });
    } else {
      // Get AI explanation for wrong answers
      if (studyMode === 'learn' || studyMode === 'test') {
        await getAIExplanation(question, answer.toString());
      }
      
      toast({
        title: "Not quite right",
        description: grading.confidence > 0.3 ? "Close! Check the explanation below." : `The answer was: ${question.back}`,
        variant: "destructive"
      });
    }

    // Auto-advance after delay (except in flashcard mode)
    if (studySettings.autoAdvance && studyMode !== 'flashcards') {
      setTimeout(() => {
        handleNextQuestion();
      }, 3000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setSelectedOption(null);
      setShowResult(false);
      setIsFlipped(false);
      setAiExplanation('');
      setStartTime(new Date());
    } else {
      // End of session - could show completion screen
      setCurrentQuestion(0);
      setUserAnswer('');
      setSelectedOption(null);
      setShowResult(false);
      setIsFlipped(false);
      setAiExplanation('');
    }
  };

  const renderStudyModeSelector = () => (
    <GradientCard>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-gradient-orange" />
          Study Mode
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {studyModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setStudyMode(mode.id as StudyMode)}
                className={`p-3 rounded-lg text-left transition-all ${
                  studyMode === mode.id
                    ? 'gradient-outline'
                    : 'bg-surface-muted text-text-secondary hover:bg-surface'
                }`}
              >
                <div className={studyMode === mode.id ? 'gradient-outline-content p-2' : ''}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${mode.color}`} />
                    <span className="font-medium text-sm">{mode.name}</span>
                  </div>
                  <p className="text-xs text-text-muted">{mode.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </GradientCard>
  );

  const renderFlashcardMode = () => {
    const question = questions[currentQuestion];
    if (!question) return null;

    return (
      <GradientCard>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-xs text-text-muted mb-2">{question.unit}</div>
            <div 
              className="min-h-[120px] flex items-center justify-center cursor-pointer p-4 rounded-lg bg-surface-muted hover:bg-surface-hover transition-colors"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="text-center">
                {!isFlipped ? (
                  <div>
                    <Star className="w-6 h-6 text-gradient-purple mx-auto mb-2" />
                    <p className="text-lg font-medium text-text-primary">{question.front}</p>
                    <p className="text-xs text-text-muted mt-2">Click to reveal answer</p>
                  </div>
                ) : (
                  <div>
                    <Target className="w-6 h-6 text-gradient-orange mx-auto mb-2" />
                    <p className="text-lg font-medium text-text-primary">{question.back}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {isFlipped && (
            <div className="flex gap-2">
              <GradientButton 
                onClick={() => {
                  updateSpacedRepetition(question, false);
                  setSession(prev => ({ ...prev, incorrect: prev.incorrect + 1, streak: 0 }));
                  handleNextQuestion();
                }}
                variant="secondary"
                className="flex-1"
              >
                😅 Hard
              </GradientButton>
              <GradientButton 
                onClick={() => {
                  updateSpacedRepetition(question, true);
                  setSession(prev => ({ ...prev, correct: prev.correct + 1, streak: prev.streak + 1 }));
                  handleNextQuestion();
                }}
                className="flex-1"
              >
                😊 Easy
              </GradientButton>
            </div>
          )}
        </div>
      </GradientCard>
    );
  };

  const renderLearnMode = () => {
    const question = questions[currentQuestion];
    if (!question) return null;

    return (
      <GradientCard>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-xs text-text-muted mb-2">{question.unit}</div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              {question.front}
            </h3>
          </div>
          
          {!showResult ? (
            <div className="space-y-3">
              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(index)}
                      className={`w-full p-3 text-left rounded-lg border transition-all ${
                        selectedOption === index
                          ? 'border-gradient-purple bg-gradient-to-r from-purple-500/10 to-orange-500/10'
                          : 'border-card-border hover:border-gradient-purple/50 bg-surface'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              
              {(question.type === 'typing' || question.type === 'true-false') && (
                <div className="space-y-3">
                  {question.type === 'true-false' ? (
                    <div className="flex gap-3">
                      <GradientButton 
                        onClick={() => { setUserAnswer('true'); }}
                        variant={userAnswer === 'true' ? 'primary' : 'secondary'}
                        className="flex-1"
                      >
                        True
                      </GradientButton>
                      <GradientButton 
                        onClick={() => { setUserAnswer('false'); }}
                        variant={userAnswer === 'false' ? 'primary' : 'secondary'}
                        className="flex-1"
                      >
                        False
                      </GradientButton>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer..."
                      className="w-full p-3 rounded-lg border border-card-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-gradient-purple"
                      onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                    />
                  )}
                </div>
              )}
              
              <GradientButton 
                onClick={checkAnswer} 
                disabled={
                  (question.type === 'multiple-choice' && selectedOption === null) ||
                  ((question.type === 'typing' || question.type === 'true-false') && !userAnswer.trim())
                }
                className="w-full"
              >
                Submit Answer
              </GradientButton>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Result */}
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
                  <strong>Correct Answer:</strong> {question.back}
                </div>
              </div>

              {/* AI Explanation for wrong answers */}
              {!isCorrect && (studyMode === 'learn' || studyMode === 'test') && (
                <div className="space-y-3">
                  {loadingExplanation ? (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-muted">
                      <Brain className="w-4 h-4 text-gradient-purple animate-pulse" />
                      <span className="text-text-secondary">AI is explaining...</span>
                    </div>
                  ) : aiExplanation ? (
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-gradient-purple/30">
                      <div className="flex items-start gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-gradient-orange mt-0.5" />
                        <span className="text-sm font-medium text-gradient-purple">AI Explanation:</span>
                      </div>
                      <p className="text-sm text-text-primary leading-relaxed">{aiExplanation}</p>
                    </div>
                  ) : null}
                </div>
              )}

              <GradientButton onClick={handleNextQuestion} className="w-full">
                Continue
              </GradientButton>
            </div>
          )}
        </div>
      </GradientCard>
    );
  };

  const renderMatchMode = () => {
    // Simplified match mode for now
    return renderLearnMode();
  };

  const renderTestMode = () => {
    const question = questions[currentQuestion];
    if (!question) return null;

    return (
      <GradientCard>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-text-muted">Test Mode • No hints</div>
            <div className="text-xs text-gaming-error font-medium">
              {session.correct}/{session.correct + session.incorrect} correct
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              {question.front}
            </h3>
          </div>
          
          {!showResult ? (
            <div className="space-y-3">
              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedOption(index)}
                      className={`w-full p-3 text-left rounded-lg border transition-all ${
                        selectedOption === index
                          ? 'border-gradient-purple bg-gradient-to-r from-purple-500/10 to-orange-500/10'
                          : 'border-card-border hover:border-gradient-purple/50 bg-surface'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              
              {question.type === 'typing' && (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full p-3 rounded-lg border border-card-border bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:border-gradient-purple"
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
              )}
              
              <GradientButton 
                onClick={checkAnswer} 
                disabled={
                  (question.type === 'multiple-choice' && selectedOption === null) ||
                  (question.type === 'typing' && !userAnswer.trim())
                }
                className="w-full"
              >
                Submit Answer
              </GradientButton>
            </div>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-gaming-success/10 border border-gaming-success' : 'bg-gaming-error/10 border border-gaming-error'}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-gaming-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gaming-error" />
                  )}
                  <span className={`font-medium ${isCorrect ? 'text-gaming-success' : 'text-gaming-error'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <div className="text-sm text-text-primary">
                  <strong>Correct Answer:</strong> {question.back}
                </div>
              </div>

              {!isCorrect && aiExplanation && (
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-gradient-purple/30">
                  <div className="flex items-start gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-gradient-orange mt-0.5" />
                    <span className="text-sm font-medium text-gradient-purple">Why this is wrong:</span>
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed">{aiExplanation}</p>
                </div>
              )}

              <GradientButton onClick={handleNextQuestion} className="w-full">
                Next Question
              </GradientButton>
            </div>
          )}
        </div>
      </GradientCard>
    );
  };

  const renderSpacedRepetitionMode = () => {
    const question = questions[currentQuestion];
    if (!question) return null;

    const dueCount = questions.filter(q => 
      !q.nextReview || q.nextReview <= new Date()
    ).length;

    return (
      <div className="space-y-4">
        <GradientCard className="p-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gradient-purple" />
              <span className="text-text-primary">Due for review: {dueCount}</span>
            </div>
            <div className="text-text-secondary">
              Difficulty: {question.difficulty}/5
            </div>
          </div>
        </GradientCard>
        
        {renderLearnMode()}
      </div>
    );
  };

  const renderCurrentMode = () => {
    switch (studyMode) {
      case 'flashcards':
        return renderFlashcardMode();
      case 'learn':
        return renderLearnMode();
      case 'test':
        return renderTestMode();
      case 'match':
        return renderMatchMode();
      case 'spaced-repetition':
        return renderSpacedRepetitionMode();
      case 'write':
        return renderLearnMode(); // Same as learn but forces typing
      default:
        return renderLearnMode();
    }
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

      {/* Study Mode Selector */}
      {renderStudyModeSelector()}

      {/* Session Stats */}
      {(session.correct > 0 || session.incorrect > 0) && (
        <div className="grid grid-cols-4 gap-2">
          <GradientCard className="text-center p-2">
            <div className="text-xs text-text-secondary">Correct</div>
            <div className="text-lg font-bold text-gaming-success">{session.correct}</div>
          </GradientCard>
          <GradientCard className="text-center p-2">
            <div className="text-xs text-text-secondary">Incorrect</div>
            <div className="text-lg font-bold text-gaming-error">{session.incorrect}</div>
          </GradientCard>
          <GradientCard className="text-center p-2">
            <div className="text-xs text-text-secondary">Streak</div>
            <div className="text-lg font-bold text-gradient-purple">{session.streak}</div>
          </GradientCard>
          <GradientCard className="text-center p-2">
            <div className="text-xs text-text-secondary">Accuracy</div>
            <div className="text-lg font-bold text-gradient-orange">
              {Math.round((session.correct / (session.correct + session.incorrect)) * 100)}%
            </div>
          </GradientCard>
        </div>
      )}

      {/* Progress */}
      {questions.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-text-secondary">Progress</span>
            <span className="text-sm text-gradient-purple font-medium">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-surface-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Study Content */}
      <div className="space-y-4">
        {questions.length > 0 ? (
          renderCurrentMode()
        ) : (
          <GradientCard>
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary">No curriculum available for {selectedSubject}</p>
            </div>
          </GradientCard>
        )}
      </div>

      {/* Study Settings */}
      <GradientCard>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-gradient-purple" />
            Study Settings
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Smart Grading</p>
                <p className="text-xs text-text-secondary">Accept partial matches and typos</p>
              </div>
              <button
                onClick={() => setStudySettings(prev => ({ ...prev, smartGrading: !prev.smartGrading }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  studySettings.smartGrading ? 'bg-gradient-to-r from-purple-500 to-orange-500' : 'bg-surface-muted'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  studySettings.smartGrading ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">AI Explanations</p>
                <p className="text-xs text-text-secondary">Get explanations for wrong answers</p>
              </div>
              <button
                onClick={() => setStudySettings(prev => ({ ...prev, aiExplanations: !prev.aiExplanations }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  studySettings.aiExplanations ? 'bg-gradient-to-r from-purple-500 to-orange-500' : 'bg-surface-muted'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  studySettings.aiExplanations ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Spaced Repetition</p>
                <p className="text-xs text-text-secondary">Optimize review timing</p>
              </div>
              <button
                onClick={() => setStudySettings(prev => ({ ...prev, spacedRepetition: !prev.spacedRepetition }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  studySettings.spacedRepetition ? 'bg-gradient-to-r from-purple-500 to-orange-500' : 'bg-surface-muted'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  studySettings.spacedRepetition ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </GradientCard>
    </div>
  );
};