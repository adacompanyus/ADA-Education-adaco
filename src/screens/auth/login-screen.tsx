import React, { useState } from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { GradientInput } from '@/components/ui/gradient-input';
import { ParticleBackground } from '@/components/animations/particle-background';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onNavigateToSignup: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onNavigateToSignup,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [logoTaps, setLogoTaps] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Welcome back to ADA Learning!",
      });
      
      onLogin();
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Hidden admin login activation (tap logo 5 times quickly)
  const handleLogoClick = () => {
    setLogoTaps(prev => prev + 1);
    if (logoTaps >= 4) {
      setShowAdminLogin(true);
      setEmail('admin@ada.dev');
      setPassword('dev123');
    }
    setTimeout(() => setLogoTaps(0), 2000);
  };

  const adminLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'admin@ada.dev',
        password: 'dev123',
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Admin login successful!",
      });
      
      onLogin();
    } catch (error: any) {
      console.error('Admin login error:', error);
      toast({
        title: "Admin Login Failed",
        description: error.message || "Invalid admin credentials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col justify-center items-center p-6">
      <ParticleBackground />
      
      <div className="relative z-10 w-full max-w-sm space-y-8 animate-fade-in">
        {/* Logo Section */}
        <div className="text-center space-y-4" onClick={handleLogoClick}>
          <div className="w-20 h-20 mx-auto mb-4 gradient-outline rounded-2xl p-1 cursor-pointer">
            <div className="w-full h-full gradient-outline-content rounded-xl flex items-center justify-center bg-background">
              <img src="/lovable-uploads/df8fefa1-f972-424c-8656-7a77d894efdf.png" alt="ADA" className="w-12 h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Welcome Back</h1>
            <p className="text-text-secondary">Sign in to continue your learning journey</p>
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
          
          <div className="relative">
            <GradientInput
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-text-muted hover:text-text-primary"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-3">
            <GradientButton 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
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
              disabled={loading}
            >
              Admin Test Login
            </GradientButton>
          </div>
        )}

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-text-secondary">
            Don't have an account?{' '}
            <button
              onClick={onNavigateToSignup}
              className="gradient-text font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-text-muted">
          Tap the logo 5 times for developer access
        </div>
      </div>
    </div>
  );
};