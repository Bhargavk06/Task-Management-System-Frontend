import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationPreferences = ({ isOpen, onClose, preferences, onSave }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const notificationTypes = [
    {
      id: 'task_assigned',
      label: 'Task Assignments',
      description: 'When tasks are assigned to you',
      icon: 'UserPlus'
    },
    {
      id: 'task_completed',
      label: 'Task Completions',
      description: 'When tasks you assigned are completed',
      icon: 'CheckCircle'
    },
    {
      id: 'deadline_reminder',
      label: 'Deadline Reminders',
      description: 'Reminders for upcoming deadlines',
      icon: 'Clock'
    },
    {
      id: 'comment_added',
      label: 'Comments & Messages',
      description: 'When someone comments on your tasks',
      icon: 'MessageCircle'
    },
    {
      id: 'project_update',
      label: 'Project Updates',
      description: 'Updates on projects you\'re involved in',
      icon: 'FolderOpen'
    },
    {
      id: 'system_alert',
      label: 'System Alerts',
      description: 'Important system notifications',
      icon: 'AlertTriangle'
    }
  ];

  const deliveryMethods = [
    { value: 'in_app', label: 'In-App Notifications' },
    { value: 'email', label: 'Email Notifications' },
    { value: 'push', label: 'Push Notifications' }
  ];

  const digestFrequencies = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly Digest' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Digest' }
  ];

  const handleTypeToggle = (typeId, method, enabled) => {
    setLocalPreferences(prev => ({
      ...prev,
      types: {
        ...prev?.types,
        [typeId]: {
          ...prev?.types?.[typeId],
          [method]: enabled
        }
      }
    }));
  };

  const handleGlobalSettingChange = (setting, value) => {
    setLocalPreferences(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = () => {
    onSave(localPreferences);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Customize how and when you receive notifications
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6">
          {/* Global Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-foreground mb-4">Global Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Default Digest Frequency
                </label>
                <Select
                  options={digestFrequencies}
                  value={localPreferences?.digestFrequency}
                  onChange={(value) => handleGlobalSettingChange('digestFrequency', value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quiet Hours
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={localPreferences?.quietHours?.start}
                    onChange={(e) => handleGlobalSettingChange('quietHours', {
                      ...localPreferences?.quietHours,
                      start: e?.target?.value
                    })}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                  <span className="text-muted-foreground">to</span>
                  <input
                    type="time"
                    value={localPreferences?.quietHours?.end}
                    onChange={(e) => handleGlobalSettingChange('quietHours', {
                      ...localPreferences?.quietHours,
                      end: e?.target?.value
                    })}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Checkbox
                label="Enable Do Not Disturb on weekends"
                checked={localPreferences?.weekendDND}
                onChange={(e) => handleGlobalSettingChange('weekendDND', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Notification Types */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Notification Types</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Type</th>
                    {deliveryMethods?.map(method => (
                      <th key={method?.value} className="text-center py-3 px-4 font-medium text-foreground">
                        {method?.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notificationTypes?.map((type) => (
                    <tr key={type?.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name={type?.icon} size={16} color="var(--color-primary)" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{type?.label}</div>
                            <div className="text-sm text-muted-foreground">{type?.description}</div>
                          </div>
                        </div>
                      </td>
                      {deliveryMethods?.map(method => (
                        <td key={method?.value} className="py-4 px-4 text-center">
                          <Checkbox
                            checked={localPreferences?.types?.[type?.id]?.[method?.value] || false}
                            onChange={(e) => handleTypeToggle(type?.id, method?.value, e?.target?.checked)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Icon name="Save" size={16} className="mr-2" />
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;