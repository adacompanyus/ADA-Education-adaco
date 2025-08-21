import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { ThemeProvider } from "./contexts/theme-context";
import { LoginScreen } from "./screens/login-screen";
import { QuestionnaireScreen } from "./screens/questionnaire-screen";
import { AILoadingScreen } from "./screens/ai-loading-screen";
import { SubscriptionScreen } from "./screens/subscription-screen";
import { DashboardScreen } from "./screens/dashboard-screen";

const queryClient = new QueryClient();

type AppState = 'login' | 'questionnaire' | 'loading' | 'subscription' | 'dashboard';

interface UserData {
  name: string;
  email: string;
  usage: string;
  subjects: string[];
}

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>('login');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      const name = email === 'admin@ada.dev' ? 'Admin User' : email.split('@')[0];
      setUserData({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email,
        usage: '',
        subjects: []
      });
      setCurrentScreen('questionnaire');
      setLoading(false);
    }, 1500);
  };

  const handleSignUp = () => {
    // For demo purposes, just show an alert
    alert('Sign up feature would navigate to registration flow');
  };

  const handleQuestionnaireComplete = (data: { usage: string; subjects: string[] }) => {
    setUserData(prev => prev ? { ...prev, ...data } : null);
    setCurrentScreen('loading');
  };

  const handleAILoadingComplete = () => {
    setCurrentScreen('subscription');
  };

  const handlePlanSelect = (plan: string, billing: 'monthly' | 'yearly') => {
    // Simulate in-app purchase
    console.log(`Selected plan: ${plan} (${billing})`);
    
    // For demo, just proceed to dashboard
    setTimeout(() => {
      setCurrentScreen('dashboard');
    }, 1000);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Toaster />
          <Sonner />
          
          <div className="app-container bg-background text-foreground min-h-screen">
            {currentScreen === 'login' && (
              <LoginScreen 
                onLogin={handleLogin}
                onSignUp={handleSignUp}
                loading={loading}
              />
            )}
            
            {currentScreen === 'questionnaire' && (
              <QuestionnaireScreen onComplete={handleQuestionnaireComplete} />
            )}
            
            {currentScreen === 'loading' && (
              <AILoadingScreen onComplete={handleAILoadingComplete} />
            )}
            
            {currentScreen === 'subscription' && (
              <SubscriptionScreen onSelectPlan={handlePlanSelect} />
            )}
            
            {currentScreen === 'dashboard' && userData && (
              <DashboardScreen 
                user={userData}
                selectedSubjects={userData.subjects}
              />
            )}
          </div>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
