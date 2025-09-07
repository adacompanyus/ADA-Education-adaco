import React, { useState } from 'react';
import { GradientCard } from './ui/gradient-card';
import { GradientButton } from './ui/gradient-button';
import { Switch } from './ui/switch';
import { X, Shield, Eye, Database, Lock, UserCheck } from 'lucide-react';

interface PrivacySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacySettingsModal: React.FC<PrivacySettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [settings, setSettings] = useState({
    dataCollection: false,
    analytics: true,
    profileVisibility: false,
    studyDataSharing: false,
    personalizedAds: false,
    thirdPartySharing: false,
    activityTracking: true,
    locationTracking: false,
    twoFactorAuth: false,
    sessionTimeout: true
  });

  if (!isOpen) return null;

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('privacy-settings', JSON.stringify(settings));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
        <GradientCard className="relative">
          <div className="sticky top-0 bg-surface/95 backdrop-blur-sm p-6 pb-4 border-b border-card-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gradient-purple" />
                <h2 className="text-xl font-bold gradient-text">Privacy & Security</h2>
              </div>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Data Privacy */}
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <Database className="w-4 h-4 text-gradient-purple" />
                Data Privacy
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Data Collection</p>
                    <p className="text-xs text-text-secondary">Allow collection of usage data</p>
                  </div>
                  <Switch
                    checked={settings.dataCollection}
                    onCheckedChange={() => updateSetting('dataCollection')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Analytics</p>
                    <p className="text-xs text-text-secondary">Help improve the app with usage analytics</p>
                  </div>
                  <Switch
                    checked={settings.analytics}
                    onCheckedChange={() => updateSetting('analytics')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Study Data Sharing</p>
                    <p className="text-xs text-text-secondary">Share anonymized study patterns</p>
                  </div>
                  <Switch
                    checked={settings.studyDataSharing}
                    onCheckedChange={() => updateSetting('studyDataSharing')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Third-Party Sharing</p>
                    <p className="text-xs text-text-secondary">Share data with educational partners</p>
                  </div>
                  <Switch
                    checked={settings.thirdPartySharing}
                    onCheckedChange={() => updateSetting('thirdPartySharing')}
                  />
                </div>
              </div>
            </div>

            {/* Privacy Controls */}
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <Eye className="w-4 h-4 text-gradient-orange" />
                Privacy Controls
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Profile Visibility</p>
                    <p className="text-xs text-text-secondary">Make your profile visible to others</p>
                  </div>
                  <Switch
                    checked={settings.profileVisibility}
                    onCheckedChange={() => updateSetting('profileVisibility')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Activity Tracking</p>
                    <p className="text-xs text-text-secondary">Track study activity for insights</p>
                  </div>
                  <Switch
                    checked={settings.activityTracking}
                    onCheckedChange={() => updateSetting('activityTracking')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Location Tracking</p>
                    <p className="text-xs text-text-secondary">Use location for personalized content</p>
                  </div>
                  <Switch
                    checked={settings.locationTracking}
                    onCheckedChange={() => updateSetting('locationTracking')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Personalized Ads</p>
                    <p className="text-xs text-text-secondary">Show ads based on your interests</p>
                  </div>
                  <Switch
                    checked={settings.personalizedAds}
                    onCheckedChange={() => updateSetting('personalizedAds')}
                  />
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <Lock className="w-4 h-4 text-gradient-purple" />
                Security
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Two-Factor Authentication</p>
                    <p className="text-xs text-text-secondary">Extra security for your account</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={() => updateSetting('twoFactorAuth')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Auto Session Timeout</p>
                    <p className="text-xs text-text-secondary">Automatically log out after inactivity</p>
                  </div>
                  <Switch
                    checked={settings.sessionTimeout}
                    onCheckedChange={() => updateSetting('sessionTimeout')}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <GradientButton onClick={saveSettings} className="flex-1">
                Save Settings
              </GradientButton>
              <GradientButton onClick={onClose} variant="secondary" className="flex-1">
                Cancel
              </GradientButton>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
};