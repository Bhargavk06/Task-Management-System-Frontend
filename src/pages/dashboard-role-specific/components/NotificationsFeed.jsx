import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationsFeed = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    const icons = {
      task_assigned: 'CheckSquare',
      task_completed: 'CheckCircle',
      deadline_reminder: 'Clock',
      team_update: 'Users',
      system_alert: 'AlertTriangle',
      message: 'MessageSquare',
      approval_request: 'FileCheck'
    };
    return icons?.[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-red-600 bg-red-50';
    
    const colors = {
      task_assigned: 'text-blue-600 bg-blue-50',
      task_completed: 'text-green-600 bg-green-50',
      deadline_reminder: 'text-yellow-600 bg-yellow-50',
      team_update: 'text-purple-600 bg-purple-50',
      system_alert: 'text-red-600 bg-red-50',
      message: 'text-indigo-600 bg-indigo-50',
      approval_request: 'text-orange-600 bg-orange-50'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-50';
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'unread') return !notification?.isRead;
    if (filter === 'high') return notification?.priority === 'high';
    return true;
  });

  const unreadCount = notifications?.filter(n => !n?.isRead)?.length;

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-brand-value text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
            <Icon name="CheckCheck" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted p-1 rounded-lg">
        {[
          { key: 'all', label: 'All', count: notifications?.length },
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'high', label: 'High Priority', count: notifications?.filter(n => n?.priority === 'high')?.length }
        ]?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setFilter(tab?.key)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === tab?.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab?.label} ({tab?.count})
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No notifications to show</p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                notification?.isRead 
                  ? 'bg-background border-border hover:bg-muted/50' :'bg-blue-50 border-blue-200 hover:bg-blue-100'
              }`}
              onClick={() => onMarkAsRead(notification?.id)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification?.type, notification?.priority)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className={`text-sm ${notification?.isRead ? 'text-foreground' : 'font-medium text-foreground'}`}>
                      {notification?.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {notification?.message}
                    </p>
                    {notification?.actionRequired && (
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          <Icon name="ExternalLink" size={14} className="mr-1" />
                          Take Action
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-1 ml-3">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(notification?.timestamp)}
                    </span>
                    {notification?.priority === 'high' && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {filteredNotifications?.length > 0 && (
        <Button variant="outline" className="w-full mt-4">
          <Icon name="ArrowRight" size={16} className="mr-2" />
          View All Notifications
        </Button>
      )}
    </div>
  );
};

export default NotificationsFeed;