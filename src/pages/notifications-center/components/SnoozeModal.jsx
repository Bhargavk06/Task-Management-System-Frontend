import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SnoozeModal = ({ isOpen, onClose, onSnooze, notificationTitle }) => {
  const [selectedDuration, setSelectedDuration] = useState('1h');
  const [customDateTime, setCustomDateTime] = useState('');

  const snoozeDurations = [
    { value: '15m', label: '15 minutes', icon: 'Clock3' },
    { value: '1h', label: '1 hour', icon: 'Clock4' },
    { value: '4h', label: '4 hours', icon: 'Clock6' },
    { value: '1d', label: '1 day', icon: 'Clock8' },
    { value: '3d', label: '3 days', icon: 'Clock9' },
    { value: '1w', label: '1 week', icon: 'Clock12' },
    { value: 'custom', label: 'Custom', icon: 'Calendar' }
  ];

  const handleSnooze = () => {
    let snoozeUntil;
    const now = new Date();

    if (selectedDuration === 'custom') {
      snoozeUntil = new Date(customDateTime);
    } else {
      const duration = selectedDuration;
      const amount = parseInt(duration);
      const unit = duration?.slice(-1);

      switch (unit) {
        case 'm':
          snoozeUntil = new Date(now.getTime() + amount * 60 * 1000);
          break;
        case 'h':
          snoozeUntil = new Date(now.getTime() + amount * 60 * 60 * 1000);
          break;
        case 'd':
          snoozeUntil = new Date(now.getTime() + amount * 24 * 60 * 60 * 1000);
          break;
        case 'w':
          snoozeUntil = new Date(now.getTime() + amount * 7 * 24 * 60 * 60 * 1000);
          break;
        default:
          snoozeUntil = new Date(now.getTime() + 60 * 60 * 1000); // Default 1 hour
      }
    }

    onSnooze(snoozeUntil);
    onClose();
  };

  const getMinDateTime = () => {
    const now = new Date();
    now?.setMinutes(now?.getMinutes() + 1);
    return now?.toISOString()?.slice(0, 16);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Snooze Notification</h3>
            <p className="text-sm text-muted-foreground mt-1 truncate">
              {notificationTitle}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6">
          {/* Duration Options */}
          <div className="space-y-3 mb-6">
            <label className="block text-sm font-medium text-foreground">
              Snooze for:
            </label>
            
            <div className="grid grid-cols-2 gap-2">
              {snoozeDurations?.map((duration) => (
                <button
                  key={duration?.value}
                  onClick={() => setSelectedDuration(duration?.value)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                    selectedDuration === duration?.value
                      ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  <Icon name={duration?.icon} size={16} />
                  <span className="text-sm font-medium">{duration?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom DateTime */}
          {selectedDuration === 'custom' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Remind me at:
              </label>
              <input
                type="datetime-local"
                value={customDateTime}
                onChange={(e) => setCustomDateTime(e?.target?.value)}
                min={getMinDateTime()}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          )}

          {/* Preview */}
          <div className="bg-muted/50 rounded-lg p-3 mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Info" size={14} />
              <span>
                This notification will reappear{' '}
                {selectedDuration === 'custom' && customDateTime
                  ? `on ${new Date(customDateTime)?.toLocaleString()}`
                  : `in ${snoozeDurations?.find(d => d?.value === selectedDuration)?.label?.toLowerCase()}`
                }
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSnooze}
            disabled={selectedDuration === 'custom' && !customDateTime}
          >
            <Icon name="Clock" size={16} className="mr-2" />
            Snooze
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SnoozeModal;