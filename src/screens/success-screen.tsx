import React, { useEffect, useState } from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { GradientCard } from '@/components/ui/gradient-card';
import { ParticleBackground } from '@/components/animations/particle-background';
import { CheckCircle, Loader2, Trophy, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getProductByPriceId } from '@/stripe-config';

interface SuccessScreenProps {
  onContinue: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onContinue }) => {
  const [loading, setLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (error) {
          console.error('Error fetching subscription:', error);
          setError('Failed to load subscription details');
          return;
        }

        setSubscriptionData(data as any);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  const getProductInfo = () => {
    if (!subscriptionData?.price_id) return null;
    return getProductByPriceId(subscriptionData.price_id);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative flex flex-col justify-center items-center p-6">
        <ParticleBackground />
        
        <div className="relative z-10 text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-gradient-purple mx-auto" />
          <h1 className="text-2xl font-bold text-text-primary">Loading your subscription...</h1>
          <p className="text-text-secondary">Please wait while we confirm your payment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background relative flex flex-col justify-center items-center p-6">
        <ParticleBackground />
        
        <div className="relative z-10 max-w-md mx-auto w-full">
          <GradientCard>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gaming-error/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-gaming-error" />
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">Something went wrong</h1>
                <p className="text-text-secondary">{error}</p>
              </div>
              
              <GradientButton onClick={onContinue} className="w-full">
                Continue to Dashboard
              </GradientButton>
            </div>
          </GradientCard>
        </div>
      </div>
    );
  }

  const product = getProductInfo();

  return (
    <div className="min-h-screen bg-background relative flex flex-col justify-center items-center p-6">
      <ParticleBackground />
      
      <div className="relative z-10 max-w-md mx-auto w-full space-y-6">
        {/* Success Animation */}
        <div className="text-center animate-scale-in">
          <div className="gradient-outline rounded-full p-1 w-24 h-24 mx-auto mb-6">
            <div className="gradient-outline-content rounded-full w-full h-full bg-surface flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-gaming-success" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold gradient-text mb-2">Welcome to ADA!</h1>
          <p className="text-text-secondary">Your subscription is now active</p>
        </div>

        {/* Subscription Details */}
        <GradientCard>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-gradient-orange" />
              <h2 className="text-lg font-semibold text-text-primary">Subscription Details</h2>
            </div>
            
            {product && (
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-text-primary">{product.name}</h3>
                  <p className="text-sm text-text-secondary">{product.description}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-muted">Price</span>
                  <span className="font-semibold gradient-text">
                    ${product.price}/{product.interval}
                  </span>
                </div>
                
                {subscriptionData?.current_period_end && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Next billing date</span>
                    <span className="text-sm text-text-primary">
                      {formatDate(subscriptionData.current_period_end)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-muted">Status</span>
                  <span className="text-sm text-gaming-success font-medium capitalize">
                    {subscriptionData?.subscription_status || 'Active'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </GradientCard>

        {/* What's Next */}
        <GradientCard>
          <div className="space-y-4">
            <h3 className="font-semibold text-text-primary">What's included:</h3>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gradient-purple" />
                <span className="text-sm text-text-secondary">Access to all AP subjects</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gradient-orange" />
                <span className="text-sm text-text-secondary">AI-powered learning tools</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gradient-purple" />
                <span className="text-sm text-text-secondary">Personalized study plans</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gradient-orange" />
                <span className="text-sm text-text-secondary">Progress tracking & analytics</span>
              </div>
              {product?.name.includes('Personal+') && (
                <>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-gradient-purple" />
                    <span className="text-sm text-text-secondary">Advanced mini-games</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-gradient-orange" />
                    <span className="text-sm text-text-secondary">Priority support</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </GradientCard>

        {/* Continue Button */}
        <GradientButton onClick={onContinue} size="lg" className="w-full">
          Start Learning
        </GradientButton>
      </div>
    </div>
  );
};