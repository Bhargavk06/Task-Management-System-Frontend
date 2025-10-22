import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCard = ({ 
  notification, 
  onMarkAsRead, 
  onMarkAsUnread, 
  onSnooze, 
  onDelete,
  onNavigate 
}) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'task_assigned':
        return 'UserPlus';
      case 'task_completed':
        return 'CheckCircle';
      case 'deadline_reminder':
        return 'Clock';
      case 'comment_added':
        return 'MessageCircle';
      case 'project_update':
        return 'FolderOpen';
      case 'system_alert':
        return 'AlertTriangle';
      case 'team_mention':
        return 'AtSign';
      default:
        return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-moderate ${
      !notification?.isRead ? 'bg-blue-50/30 border-blue-200' : ''
    }`}>
      <div className="flex items-start space-x-4">
        {/* Notification Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          notification?.priority === 'high' ? 'bg-red-100' : 
          notification?.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
        }`}>
          <Icon 
            name={getNotificationIcon(notification?.type)} 
            size={20} 
            color={
              notification?.priority === 'high' ? '#DC2626' : 
              notification?.priority === 'medium' ? '#D97706' : '#2563EB'
            }
          />
        </div>

        {/* Notification Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`text-sm font-medium ${!notification?.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {notification?.title}
                </h3>
                {!notification?.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notification?.priority)}`}>
                  {notification?.priority}
                </span>
              </div>
              
              <p className={`text-sm ${!notification?.isRead ? 'text-foreground' : 'text-muted-foreground'} mb-2`}>
                {notification?.message}
              </p>

              {notification?.actionUrl && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => onNavigate(notification?.actionUrl)}
                  className="p-0 h-auto text-primary hover:text-primary/80"
                >
                  View Details
                  <Icon name="ExternalLink" size={12} className="ml-1" />
                </Button>
              )}
            </div>

            {/* Timestamp */}
            <div className="flex-shrink-0 text-xs text-muted-foreground">
              {formatTimestamp(notification?.timestamp)}
            </div>
          </div>

          {/* Metadata */}
          {(notification?.project || notification?.sender) && (
            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
              {notification?.project && (
                <div className="flex items-center space-x-1">
                  <Icon name="FolderOpen" size={12} />
                  <span>{notification?.project}</span>
                </div>
              )}
              {notification?.sender && (
                <div className="flex items-center space-x-1">
                  <Icon name="User" size={12} />
                  <span>{notification?.sender}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t border-border">
        {!notification?.isRead ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead(notification?.id)}
          >
            <Icon name="Check" size={14} className="mr-1" />
            Mark Read
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsUnread(notification?.id)}
          >
            <Icon name="RotateCcw" size={14} className="mr-1" />
            Mark Unread
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSnooze(notification?.id)}
        >
          <Icon name="Clock" size={14} className="mr-1" />
          Snooze
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(notification?.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Icon name="Trash2" size={14} />
        </Button>
      </div>
    </div>
  );
};

export default NotificationCard;