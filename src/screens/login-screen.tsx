import React, { useState } from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { GradientInput } from '@/components/ui/gradient-input';
import { ParticleBackground } from '@/components/animations/particle-background';
import { supabase } from '@/integrations/supabase/client';
import adaLogo from '@/assets/ada-logo.png';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onSignUp: () => void;
  loading?: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onSignUp,
  loading = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  // Hidden admin login activation (tap logo 5 times quickly)
  const [logoTaps, setLogoTaps] = useState(0);
  const handleLogoClick = () => {
    setLogoTaps(prev => prev + 1);
    if (logoTaps >= 4) {
      setShowAdminLogin(true);
      setEmail('admin@ada.dev');
      setPassword('dev123');
    }
    setTimeout(() => setLogoTaps(0), 2000);
  };

  const adminLogin = () => {
    onLogin('admin@ada.dev', 'dev123');
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('Google login error:', error);
        alert('Failed to login with Google. Please try again.');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col justify-center items-center p-6">
      <ParticleBackground />
      
      <div className="relative z-10 w-full max-w-sm space-y-8 animate-fade-in">
        {/* Logo Section */}
        <div className="text-center space-y-4" onClick={handleLogoClick}>
          <div className="w-20 h-20 mx-auto mb-4 gradient-outline rounded-2xl p-1">
            <div className="w-full h-full gradient-outline-content rounded-xl flex items-center justify-center bg-background">
              <img src="/lovable-uploads/df8fefa1-f972-424c-8656-7a77d894efdf.png" alt="ADA" className="w-12 h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">ADA Learning</h1>
            <p className="text-text-secondary">Master AP subjects with AI</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <GradientInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          
          <GradientInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <div className="space-y-3">
            <GradientButton 
              type="submit" 
              size="lg" 
              className="w-full"
              loading={loading}
            >
              Log In
            </GradientButton>
            
            <GradientButton
              type="button"
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={onSignUp}
            >
              Sign Up
            </GradientButton>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-text-muted">Or continue with</span>
              </div>
            </div>

            <GradientButton
              type="button"
              variant="secondary"
              size="lg"
              className="w-full flex items-center justify-center space-x-2"
              onClick={handleGoogleLogin}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </GradientButton>
          </div>
        </form>

        {/* Admin Test Login (Hidden) */}
        {showAdminLogin && (
          <div className="mt-6 p-4 border border-gaming-warning/30 rounded-lg bg-surface-elevated animate-scale-in">
            <p className="text-sm text-gaming-warning mb-2">Developer Mode</p>
            <GradientButton
              size="sm"
              className="w-full"
              onClick={adminLogin}
            >
              Admin Test Login
            </GradientButton>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-text-muted">
          Tap the logo 5 times for developer access
        </div>
      </div>
    </div>
  );
};