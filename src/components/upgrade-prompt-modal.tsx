import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GradientButton } from '@/components/ui/gradient-button';
import { GradientCard } from '@/components/ui/gradient-card';
import { Crown, Zap, Lock } from 'lucide-react';

interface UpgradePromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const UpgradePromptModal: React.FC<UpgradePromptModalProps> = ({
  isOpen,
  onClose,
  onUpgrade
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Lock className="w-5 h-5 text-gradient-orange" />
            Daily Limit Reached
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-text-secondary mb-4">
              You've reached your daily limit of 5 AI prompts. Upgrade to Personal+ for unlimited access!
            </p>
          </div>

          <GradientCard className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="gradient-outline rounded-lg p-2">
                <div className="gradient-outline-content rounded-lg p-2">
                  <Crown className="w-6 h-6 text-gradient-purple" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg text-text-primary">Personal+</h3>
                <p className="text-sm text-text-secondary">Unlimited AI tutoring</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gaming-success" />
                <span className="text-sm text-text-secondary">Unlimited daily prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gaming-success" />
                <span className="text-sm text-text-secondary">Unlimited monthly prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gaming-success" />
                <span className="text-sm text-text-secondary">Premium mini-games</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gaming-success" />
                <span className="text-sm text-text-secondary">Advanced analytics</span>
              </div>
            </div>
          </GradientCard>

          <div className="flex gap-3">
            <GradientButton
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Maybe Later
            </GradientButton>
            <GradientButton
              onClick={onUpgrade}
              className="flex-1"
            >
              Upgrade Now
            </GradientButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};