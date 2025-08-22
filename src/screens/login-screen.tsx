import React, { useState } from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { GradientInput } from '@/components/ui/gradient-input';
import { ParticleBackground } from '@/components/animations/particle-background';
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