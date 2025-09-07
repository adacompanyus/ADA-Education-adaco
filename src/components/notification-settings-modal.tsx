import React, { useState } from 'react';
import { GradientCard } from './ui/gradient-card';
import { GradientButton } from './ui/gradient-button';
import { Switch } from './ui/switch';
import { X, Bell, Smartphone, Mail, MessageSquare } from 'lucide-react';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    studyReminders: true,
    streakReminders: true,
    gameNotifications: false,
    questUpdates: true,
    weeklyProgress: true,
    promotionalEmails: false
  });

  if (!isOpen) return null;

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('notification-settings', JSON.stringify(settings));
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
                <Bell className="w-5 h-5 text-gradient-orange" />
                <h2 className="text-xl font-bold gradient-text">Notification Settings</h2>
              </div>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Push Notifications */}
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-gradient-purple" />
                Push Notifications
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Push Notifications</p>
                    <p className="text-xs text-text-secondary">Receive notifications on your device</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={() => updateSetting('pushNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Study Reminders</p>
                    <p className="text-xs text-text-secondary">Daily study session reminders</p>
                  </div>
                  <Switch
                    checked={settings.studyReminders}
                    onCheckedChange={() => updateSetting('studyReminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Streak Reminders</p>
                    <p className="text-xs text-text-secondary">Don't break your study streak!</p>
                  </div>
                  <Switch
                    checked={settings.streakReminders}
                    onCheckedChange={() => updateSetting('streakReminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Game Notifications</p>
                    <p className="text-xs text-text-secondary">New mini-games and challenges</p>
                  </div>
                  <Switch
                    checked={settings.gameNotifications}
                    onCheckedChange={() => updateSetting('gameNotifications')}
                  />
                </div>
              </div>
            </div>

            {/* Email Notifications */}
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <Mail className="w-4 h-4 text-gradient-orange" />
                Email Notifications
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Email Notifications</p>
                    <p className="text-xs text-text-secondary">Receive important updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={() => updateSetting('emailNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Quest Updates</p>
                    <p className="text-xs text-text-secondary">New quests and achievements</p>
                  </div>
                  <Switch
                    checked={settings.questUpdates}
                    onCheckedChange={() => updateSetting('questUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Weekly Progress</p>
                    <p className="text-xs text-text-secondary">Your weekly study summary</p>
                  </div>
                  <Switch
                    checked={settings.weeklyProgress}
                    onCheckedChange={() => updateSetting('weeklyProgress')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Promotional Emails</p>
                    <p className="text-xs text-text-secondary">Special offers and news</p>
                  </div>
                  <Switch
                    checked={settings.promotionalEmails}
                    onCheckedChange={() => updateSetting('promotionalEmails')}
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