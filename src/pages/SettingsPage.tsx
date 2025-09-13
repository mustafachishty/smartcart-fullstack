import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Moon, Sun, Globe, Save, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useToast } from '../contexts/ToastContext';
import { DeleteAccountModal } from '../components/auth/DeleteAccountModal';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { showSuccess } = useToast();
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotionalEmails: false,
    twoFactorAuth: false,
    language: 'en'
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please sign in to access settings
          </h2>
        </div>
      </div>
    );
  }

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save settings to backend
    showSuccess('Settings Saved', 'Your preferences have been updated successfully.');
  };

  const settingSections = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { key: 'emailNotifications', label: 'Email Notifications', type: 'toggle' },
        { key: 'pushNotifications', label: 'Push Notifications', type: 'toggle' },
        { key: 'orderUpdates', label: 'Order Updates', type: 'toggle' },
        { key: 'promotionalEmails', label: 'Promotional Emails', type: 'toggle' }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      settings: [
        { key: 'twoFactorAuth', label: 'Two-Factor Authentication', type: 'toggle' }
      ]
    },
    {
      title: 'Preferences',
      icon: Globe,
      settings: [
        { 
          key: 'language', 
          label: 'Language', 
          type: 'select',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' }
          ]
        }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Settings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 dark:text-gray-400 text-lg"
          >
            Customize your SmartCart experience
          </motion.p>
        </div>

        <div className="space-y-8">
          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Theme
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Choose your preferred theme
                  </p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDarkMode ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Settings Sections */}
          {settingSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + sectionIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Icon size={24} className="text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {section.settings.map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between">
                      <div>
                        <label className="text-gray-900 dark:text-white font-medium">
                          {setting.label}
                        </label>
                      </div>
                      
                      {setting.type === 'toggle' ? (
                        <button
                          onClick={() => handleSettingChange(setting.key, !settings[setting.key as keyof typeof settings])}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings[setting.key as keyof typeof settings] ? 'bg-emerald-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings[setting.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      ) : setting.type === 'select' ? (
                        <select
                          value={settings[setting.key as keyof typeof settings] as string}
                          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          {setting.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Trash2 size={24} className="text-red-600 dark:text-red-400" />
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
                Danger Zone
              </h3>
            </div>
            <p className="text-red-700 dark:text-red-300 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center"
          >
            <button
              onClick={handleSaveSettings}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Save size={20} />
              <span className="font-semibold">Save Settings</span>
            </button>
          </motion.div>
        </div>
      </div>
      
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </motion.div>
  );
};