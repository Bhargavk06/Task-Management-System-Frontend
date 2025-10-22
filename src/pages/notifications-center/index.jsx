import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import NotificationCard from './components/NotificationCard';
import NotificationFilters from './components/NotificationFilters';
import NotificationPreferences from './components/NotificationPreferences';
import NotificationStats from './components/NotificationStats';
import SnoozeModal from './components/SnoozeModal';

const NotificationsCenter = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);
  const [snoozeModal, setSnoozeModal] = useState({ isOpen: false, notificationId: null, title: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Mock notification preferences
  const [preferences, setPreferences] = useState({
    digestFrequency: 'immediate',
    quietHours: { start: '22:00', end: '08:00' },
    weekendDND: false,
    types: {
      task_assigned: { in_app: true, email: true, push: true },
      task_completed: { in_app: true, email: false, push: true },
      deadline_reminder: { in_app: true, email: true, push: true },
      comment_added: { in_app: true, email: false, push: false },
      project_update: { in_app: true, email: true, push: false },
      system_alert: { in_app: true, email: true, push: true }
    }
  });

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'task_assigned',
        title: 'New Task Assignment',
        message: 'You have been assigned to "Implement user authentication system" by Sarah Johnson',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        isRead: false,
        priority: 'high',
        project: 'TaskFlow Pro Development',
        sender: 'Sarah Johnson',
        actionUrl: '/task-management-interface'
      },
      {
        id: 2,
        type: 'deadline_reminder',
        title: 'Deadline Approaching',
        message: 'Task "Design notification center UI" is due in 2 hours',
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        isRead: false,
        priority: 'high',
        project: 'TaskFlow Pro Development',
        actionUrl: '/task-management-interface'
      },
      {
        id: 3,
        type: 'comment_added',
        title: 'New Comment',
        message: 'Michael Chen commented on "Database optimization": "Great progress on the query performance improvements!"',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: false,
        priority: 'medium',
        project: 'Backend Infrastructure',
        sender: 'Michael Chen',
        actionUrl: '/task-management-interface'
      },
      {
        id: 4,
        type: 'task_completed',
        title: 'Task Completed',
        message: 'Emily Rodriguez has completed "User interface mockups" ahead of schedule',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: true,
        priority: 'medium',
        project: 'Design System',
        sender: 'Emily Rodriguez',
        actionUrl: '/task-management-interface'
      },
      {
        id: 5,
        type: 'project_update',
        title: 'Project Milestone Reached',
        message: 'TaskFlow Pro Development has reached 75% completion. All core features are now implemented.',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: true,
        priority: 'medium',
        project: 'TaskFlow Pro Development',
        actionUrl: '/analytics-dashboard'
      },
      {
        id: 6,
        type: 'team_mention',
        title: 'Team Mention',
        message: 'You were mentioned in the weekly standup notes: "@john great work on the notification system implementation"',
        timestamp: new Date(Date.now() - 10800000), // 3 hours ago
        isRead: true,
        priority: 'low',
        project: 'Team Communication',
        sender: 'David Kim',
        actionUrl: '/team-overview'
      },
      {
        id: 7,
        type: 'system_alert',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tonight from 11 PM to 1 AM EST. Please save your work.',
        timestamp: new Date(Date.now() - 14400000), // 4 hours ago
        isRead: true,
        priority: 'medium',
        actionUrl: '/dashboard-role-specific'
      },
      {
        id: 8,
        type: 'task_assigned',
        title: 'Urgent Task Assignment',
        message: 'Critical bug fix needed: "Login authentication failure" - assigned by Alex Thompson',
        timestamp: new Date(Date.now() - 18000000), // 5 hours ago
        isRead: false,
        priority: 'high',
        project: 'Bug Fixes',
        sender: 'Alex Thompson',
        actionUrl: '/task-management-interface'
      }
    ];

    setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort notifications
  const filteredAndSortedNotifications = useMemo(() => {
    let filtered = notifications;

    // Apply filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'unread') {
        filtered = filtered?.filter(n => !n?.isRead);
      } else {
        filtered = filtered?.filter(n => n?.type === activeFilter);
      }
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered?.filter(n =>
        n?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        n?.message?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        n?.project?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        n?.sender?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply sort
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        case 'unread':
          if (a?.isRead === b?.isRead) {
            return new Date(b.timestamp) - new Date(a.timestamp);
          }
          return a?.isRead ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [notifications, activeFilter, searchQuery, sortBy]);

  // Calculate statistics
  const stats = useMemo(() => {
    const today = new Date();
    today?.setHours(0, 0, 0, 0);

    return {
      total: notifications?.length,
      unread: notifications?.filter(n => !n?.isRead)?.length,
      highPriority: notifications?.filter(n => n?.priority === 'high')?.length,
      today: notifications?.filter(n => new Date(n.timestamp) >= today)?.length
    };
  }, [notifications]);

  // Notification actions
  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(n => n?.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAsUnread = (notificationId) => {
    setNotifications(prev =>
      prev?.map(n => n?.id === notificationId ? { ...n, isRead: false } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev?.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = (notificationId) => {
    setNotifications(prev => prev?.filter(n => n?.id !== notificationId));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications? This action cannot be undone.')) {
      setNotifications([]);
    }
  };

  const handleSnooze = (notificationId) => {
    const notification = notifications?.find(n => n?.id === notificationId);
    setSnoozeModal({
      isOpen: true,
      notificationId,
      title: notification?.title || ''
    });
  };

  const handleSnoozeConfirm = (snoozeUntil) => {
    console.log(`Notification ${snoozeModal?.notificationId} snoozed until ${snoozeUntil}`);
    // In a real app, you would implement snooze logic here
    setNotifications(prev =>
      prev?.map(n => 
        n?.id === snoozeModal?.notificationId 
          ? { ...n, snoozedUntil: snoozeUntil, isRead: true }
          : n
      )
    );
  };

  const handleNavigate = (url) => {
    navigate(url);
  };

  const handleSavePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    console.log('Preferences saved:', newPreferences);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-muted-foreground">Loading notifications...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
              <p className="text-muted-foreground mt-2">
                Stay updated with all your task-related activities and system alerts
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowPreferences(true)}
            >
              <Icon name="Settings" size={16} className="mr-2" />
              Preferences
            </Button>
          </div>

          {/* Statistics */}
          <NotificationStats stats={stats} />

          {/* Filters */}
          <NotificationFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onMarkAllAsRead={handleMarkAllAsRead}
            onClearAll={handleClearAll}
            unreadCount={stats?.unread}
          />

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredAndSortedNotifications?.length > 0 ? (
              filteredAndSortedNotifications?.map((notification) => (
                <NotificationCard
                  key={notification?.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAsUnread={handleMarkAsUnread}
                  onSnooze={handleSnooze}
                  onDelete={handleDelete}
                  onNavigate={handleNavigate}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Bell" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No notifications found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || activeFilter !== 'all' ?'Try adjusting your filters or search terms' :'You\'re all caught up! New notifications will appear here.'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Load More Button (if needed) */}
          {filteredAndSortedNotifications?.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline">
                <Icon name="MoreHorizontal" size={16} className="mr-2" />
                Load More Notifications
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      <NotificationPreferences
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        preferences={preferences}
        onSave={handleSavePreferences}
      />
      <SnoozeModal
        isOpen={snoozeModal?.isOpen}
        onClose={() => setSnoozeModal({ isOpen: false, notificationId: null, title: '' })}
        onSnooze={handleSnoozeConfirm}
        notificationTitle={snoozeModal?.title}
      />
    </div>
  );
};

export default NotificationsCenter;