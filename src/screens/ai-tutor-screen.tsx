import React, { useState, useEffect, useRef } from 'react';
import { ParticleBackground } from '@/components/animations/particle-background';
import { GradientCard } from '@/components/ui/gradient-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { GradientInput } from '@/components/ui/gradient-input';
import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  Bot, 
  Send, 
  User, 
  Loader2,
  Brain,
  Sparkles,
  MessageCircle,
  Check
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface AITutorScreenProps {
  user: { name: string };
  selectedSubjects: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AITutorScreen: React.FC<AITutorScreenProps> = ({
  user,
  selectedSubjects,
  activeTab,
  onTabChange,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusSubjects, setFocusSubjects] = useState<string[]>(selectedSubjects);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Initialize with welcome message
  useEffect(() => {
    const subjectText = focusSubjects.length === selectedSubjects.length ? 'all your subjects' : focusSubjects.join(', ');
    const welcomeMessage: Message = {
      id: 'welcome',
      content: `${getGreeting()}, ${user.name}! I am your AI tutor and I am here to answer any questions you have, or any type of review you would like to do. I'm currently focusing on: ${subjectText}.`,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, [user.name, focusSubjects, selectedSubjects.length]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-tutor', {
        body: {
          type: 'explanation',
          subject: focusSubjects.join(', '),
          prompt: inputMessage
        }
      });

      if (error) throw error;

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AI tutor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background relative pb-20">
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="p-6 border-b border-card-border bg-surface/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="gradient-outline rounded-full p-1">
              <div className="gradient-outline-content rounded-full p-2">
                <Bot className="w-6 h-6 text-gradient-purple" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">AI Tutor</h1>
              <p className="text-sm text-text-secondary">Focus Subjects: {focusSubjects.join(', ')}</p>
            </div>
          </div>
          
          {/* Subject Selection */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-primary">Select subjects to focus on:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFocusSubjects(selectedSubjects)}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  focusSubjects.length === selectedSubjects.length
                    ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white'
                    : 'bg-surface-muted text-text-secondary hover:bg-surface-hover'
                }`}
              >
                <Check className="w-3 h-3 inline mr-1" />
                ALL
              </button>
              {selectedSubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => {
                    if (focusSubjects.includes(subject)) {
                      setFocusSubjects(focusSubjects.filter(s => s !== subject));
                    } else {
                      setFocusSubjects([...focusSubjects, subject]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-xs transition-all ${
                    focusSubjects.includes(subject)
                      ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white'
                      : 'bg-surface-muted text-text-secondary hover:bg-surface-hover'
                  }`}
                >
                  <Check className="w-3 h-3 inline mr-1" />
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%]`}>
                {!message.isUser && (
                  <div className="gradient-outline rounded-full p-1 flex-shrink-0">
                    <div className="gradient-outline-content rounded-full p-2">
                      <Brain className="w-5 h-5 text-gradient-purple" />
                    </div>
                  </div>
                )}
                
                <GradientCard className={`${message.isUser ? 'bg-gradient-to-r from-purple-500/10 to-orange-500/10' : ''}`}>
                  <div className="space-y-2">
                    <p className="text-text-primary whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs text-text-muted">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </GradientCard>

                {message.isUser && (
                  <div className="gradient-outline rounded-full p-1 flex-shrink-0">
                    <div className="gradient-outline-content rounded-full p-2 bg-surface">
                      <User className="w-5 h-5 text-gradient-orange" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="gradient-outline rounded-full p-1">
                  <div className="gradient-outline-content rounded-full p-2">
                    <Brain className="w-5 h-5 text-gradient-purple" />
                  </div>
                </div>
                <GradientCard>
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gradient-purple" />
                    <span className="text-text-secondary">AI is thinking...</span>
                  </div>
                </GradientCard>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 sm:p-6 border-t border-card-border bg-surface/80 backdrop-blur-sm">
          <div className="w-full max-w-none">
            <div className="flex gap-3">
              <GradientInput
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask me anything about ${focusSubjects.join(', ')}...`}
                className="flex-1 min-w-0"
                disabled={isLoading}
              />
              <GradientButton 
                onClick={sendMessage} 
                disabled={isLoading || !inputMessage.trim()}
                size="sm"
                className="shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </GradientButton>
            </div>
          
            {/* Quick Actions */}
            <div className="flex gap-2 mt-3 flex-wrap">
              <button
                onClick={() => setInputMessage('Explain the main concepts I should know for the upcoming test')}
                className="text-xs px-3 py-1 rounded-full bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
              >
                <MessageCircle className="w-3 h-3 inline mr-1" />
                Test prep help
              </button>
              <button
                onClick={() => setInputMessage('Give me practice problems to work on')}
                className="text-xs px-3 py-1 rounded-full bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
              >
                <Sparkles className="w-3 h-3 inline mr-1" />
                Practice problems
              </button>
              <button
                onClick={() => setInputMessage('What are the most important topics I should focus on?')}
                className="text-xs px-3 py-1 rounded-full bg-surface-muted text-text-secondary hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-orange-500/10 hover:text-gradient-purple transition-all"
              >
                <Brain className="w-3 h-3 inline mr-1" />
                Study guide
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};