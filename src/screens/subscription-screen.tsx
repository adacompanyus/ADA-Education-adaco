import React, { useState } from 'react';
import { GradientButton } from '@/components/ui/gradient-button';
import { GradientCard } from '@/components/ui/gradient-card';
import { ParticleBackground } from '@/components/animations/particle-background';
import { Check, Zap, Crown, Building } from 'lucide-react';

interface SubscriptionScreenProps {
  onSelectPlan: (plan: string, billing: 'monthly' | 'yearly') => void;
}

const plans = [
  {
    id: 'personal',
    name: 'Personal',
    icon: Zap,
    monthlyPrice: 14.99,
    yearlyPrice: 149.99,
    features: [
      'Access to all AP subjects',
      'Personalized learning tracking',
      'AI-powered flashcards',
      'Progress analytics',
      'Basic minigames'
    ],
    popular: false
  },
  {
    id: 'personal-plus',
    name: 'Personal+',
    icon: Crown,
    monthlyPrice: 24.99,
    yearlyPrice: 249.99,
    features: [
      'Everything in Personal',
      'AI tutoring & explanations',
      'Advanced analytics',
      'Priority updates',
      'Unlimited minigames',
      'Custom study plans'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Building,
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      'Everything in Personal+',
      'Team licenses',
      'Dedicated support',
      'Custom integrations',
      'Admin dashboard',
      'Bulk management'
    ],
    popular: false
  }
];

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  onSelectPlan,
}) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      onSelectPlan(selectedPlan, billingCycle);
    }
  };

  const yearlyDiscount = (monthly: number) => {
    const yearly = monthly * 12;
    const discounted = plans.find(p => p.monthlyPrice === monthly)?.yearlyPrice || 0;
    return Math.round(((yearly - discounted) / yearly) * 100);
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col p-6">
      <ParticleBackground />
      
      <div className="relative z-10 flex-1 max-w-md mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold gradient-text mb-2">Choose Your Plan</h1>
          <p className="text-text-secondary">Unlock your full learning potential</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="gradient-outline rounded-full p-1">
            <div className="gradient-outline-content rounded-full flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-gradient-purple text-white' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingCycle === 'yearly' 
                    ? 'bg-gradient-purple text-white' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Yearly
                <span className="ml-1 text-xs bg-gaming-success text-white px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-4 mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            const isEnterprise = plan.id === 'enterprise';
            
            return (
              <GradientCard
                key={plan.id}
                selectable
                selected={isSelected}
                onClick={() => handlePlanSelect(plan.id)}
                className={`cursor-pointer relative ${plan.popular ? 'gradient-glow' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-gradient-purple to-gradient-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="space-y-4">
                  {/* Plan Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="gradient-outline rounded-lg p-2">
                        <div className="gradient-outline-content rounded-lg p-2">
                          <Icon className="w-6 h-6 text-gradient-purple" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-text-primary">{plan.name}</h3>
                        {!isEnterprise && (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold gradient-text">
                              ${billingCycle === 'monthly' ? plan.monthlyPrice : (plan.yearlyPrice! / 12).toFixed(2)}
                            </span>
                            <span className="text-sm text-text-muted">
                              /{billingCycle === 'monthly' ? 'month' : 'month'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {isEnterprise && (
                      <GradientButton size="sm">
                        Contact Sales
                      </GradientButton>
                    )}
                  </div>

                  {/* Yearly Savings */}
                  {!isEnterprise && billingCycle === 'yearly' && (
                    <div className="text-sm text-gaming-success bg-gaming-success/10 px-3 py-2 rounded-lg">
                      Save ${(plan.monthlyPrice! * 12 - plan.yearlyPrice!).toFixed(0)} per year
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-gaming-success flex-shrink-0" />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GradientCard>
            );
          })}
        </div>

        {/* Continue Button */}
        {selectedPlan && selectedPlan !== 'enterprise' && (
          <div className="animate-scale-in">
            <GradientButton
              size="lg"
              className="w-full"
              onClick={handleContinue}
            >
              Continue with {plans.find(p => p.id === selectedPlan)?.name}
            </GradientButton>
          </div>
        )}
      </div>
    </div>
  );
};