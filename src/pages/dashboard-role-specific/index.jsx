import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WelcomeHeader from './components/WelcomeHeader';
import QuickActionsPanel from './components/QuickActionsPanel';
import TaskOverviewWidget from './components/TaskOverviewWidget';
import NotificationsFeed from './components/NotificationsFeed';
import PerformanceMetrics from './components/PerformanceMetrics';
import RecentActivity from './components/RecentActivity';

const DashboardRoleSpecific = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedView, setSelectedView] = useState('overview');

  // Mock user data - would come from authentication context
  const currentUser = {
    id: 1,
    name: "Sarah Johnson",
    role: "manager",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1702089050621-62646a2b748f",
    avatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blazer"
  };

  // Mock tasks data
  const mockTasks = [
  {
    id: 1,
    title: "Implement user authentication system",
    assignee: "John Doe",
    status: "in-progress",
    priority: "high",
    isOverdue: false,
    dueDate: "2025-10-25"
  },
  {
    id: 2,
    title: "Design dashboard wireframes",
    assignee: "Jane Smith",
    status: "completed",
    priority: "medium",
    isOverdue: false,
    dueDate: "2025-10-22"
  },
  {
    id: 3,
    title: "Code review for API endpoints",
    assignee: "Mike Wilson",
    status: "pending",
    priority: "low",
    isOverdue: true,
    dueDate: "2025-10-20"
  },
  {
    id: 4,
    title: "Update project documentation",
    assignee: "Lisa Chen",
    status: "in-progress",
    priority: "medium",
    isOverdue: false,
    dueDate: "2025-10-26"
  },
  {
    id: 5,
    title: "Setup CI/CD pipeline",
    assignee: "David Brown",
    status: "completed",
    priority: "high",
    isOverdue: false,
    dueDate: "2025-10-21"
  }];


  // Mock notifications data
  const mockNotifications = [
  {
    id: 1,
    type: "task_assigned",
    title: "New task assigned to you",
    message: "John Doe assigned you \'Implement user authentication system\' with high priority",
    timestamp: new Date(Date.now() - 300000),
    isRead: false,
    priority: "high",
    actionRequired: true
  },
  {
    id: 2,
    type: "task_completed",
    title: "Task completed by team member",
    message: "Jane Smith completed \'Design dashboard wireframes\' ahead of schedule",
    timestamp: new Date(Date.now() - 1800000),
    isRead: false,
    priority: "normal",
    actionRequired: false
  },
  {
    id: 3,
    type: "deadline_reminder",
    title: "Deadline approaching",
    message: "Code review for API endpoints is due tomorrow",
    timestamp: new Date(Date.now() - 3600000),
    isRead: true,
    priority: "medium",
    actionRequired: true
  },
  {
    id: 4,
    type: "team_update",
    title: "Team meeting scheduled",
    message: "Weekly standup meeting scheduled for tomorrow at 10:00 AM",
    timestamp: new Date(Date.now() - 7200000),
    isRead: true,
    priority: "normal",
    actionRequired: false
  },
  {
    id: 5,
    type: "system_alert",
    title: "System maintenance notice",
    message: "Scheduled maintenance window this weekend from 2:00 AM to 4:00 AM",
    timestamp: new Date(Date.now() - 10800000),
    isRead: false,
    priority: "low",
    actionRequired: false
  }];


  // Mock recent activity data
  const mockActivities = [
  {
    id: 1,
    type: "task_completed",
    user: {
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1633355030475-8195b84873ff",
      avatarAlt: "Professional headshot of blonde woman in white blouse smiling",
      role: "Designer"
    },
    description: "completed task \'Design dashboard wireframes'",
    context: "Project Alpha - UI/UX Phase",
    timestamp: new Date(Date.now() - 1800000),
    isUserInvolved: false,
    scope: "team",
    priority: "normal",
    actionable: true,
    canRespond: false
  },
  {
    id: 2,
    type: "comment_added",
    user: {
      name: "Mike Wilson",
      avatar: "https://images.unsplash.com/photo-1561590703-6067143b176e",
      avatarAlt: "Professional headshot of man with dark hair and beard in navy shirt",
      role: "Developer"
    },
    description: "added a comment on \'API Integration Task'",
    context: "Needs clarification on authentication flow",
    timestamp: new Date(Date.now() - 3600000),
    isUserInvolved: true,
    scope: "team",
    priority: "normal",
    actionable: true,
    canRespond: true
  },
  {
    id: 3,
    type: "file_uploaded",
    user: {
      name: "Lisa Chen",
      avatar: "https://images.unsplash.com/photo-1734521992144-5a4d0ea55952",
      avatarAlt: "Professional headshot of Asian woman with long black hair in gray blazer",
      role: "Technical Writer"
    },
    description: "uploaded documentation file",
    context: "Project requirements v2.1",
    timestamp: new Date(Date.now() - 7200000),
    attachment: {
      name: "requirements_v2.1.pdf",
      size: "2.4 MB"
    },
    isUserInvolved: false,
    scope: "team",
    priority: "normal",
    actionable: true,
    canRespond: false
  },
  {
    id: 4,
    type: "task_assigned",
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1702089050621-62646a2b748f",
      avatarAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blazer",
      role: "Manager"
    },
    description: "assigned task \'Setup CI/CD pipeline\' to David Brown",
    context: "DevOps Infrastructure - Phase 1",
    timestamp: new Date(Date.now() - 10800000),
    isUserInvolved: true,
    scope: "team",
    priority: "high",
    actionable: false,
    canRespond: false
  },
  {
    id: 5,
    type: "meeting_scheduled",
    user: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1723607528434-21cde67167c4",
      avatarAlt: "Professional headshot of man with short brown hair in white dress shirt",
      role: "Team Lead"
    },
    description: "scheduled team retrospective meeting",
    context: "Sprint 12 Review - Conference Room A",
    timestamp: new Date(Date.now() - 14400000),
    isUserInvolved: true,
    scope: "team",
    priority: "normal",
    actionable: true,
    canRespond: false
  }];


  // Mock performance metrics data
  const mockMetricsData = {
    completionRate: 94,
    averageResponseTime: 2.4,
    teamSatisfaction: 4.8,
    activeProjects: 23
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleQuickAction = (actionId) => {
    console.log(`Quick action triggered: ${actionId}`);
    // Handle quick actions based on actionId
    switch (actionId) {
      case 'create-task':
        // Navigate to task creation
        break;
      case 'view-analytics':
        // Navigate to analytics dashboard
        break;
      case 'manage-users':
        // Navigate to user management
        break;
      default:
        console.log(`Unhandled action: ${actionId}`);
    }
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    console.log(`Marking notification ${notificationId} as read`);
    // Update notification read status
  };

  const handleMarkAllNotificationsAsRead = () => {
    console.log('Marking all notifications as read');
    // Update all notifications read status
  };

  const viewOptions = [
  { key: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { key: 'tasks', label: 'Tasks Focus', icon: 'CheckSquare' },
  { key: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { key: 'activity', label: 'Activity', icon: 'Activity' }];


  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Header */}
        <WelcomeHeader user={currentUser} currentTime={currentTime} />

        {/* View Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {viewOptions?.map((option) =>
            <button
              key={option?.key}
              onClick={() => setSelectedView(option?.key)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedView === option?.key ?
              'bg-background text-foreground shadow-sm' :
              'text-muted-foreground hover:text-foreground'}`
              }>

                <Icon name={option?.icon} size={16} />
                <span>{option?.label}</span>
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link to="/task-management-interface">
              <Button variant="outline" size="sm">
                <Icon name="CheckSquare" size={16} className="mr-2" />
                Task Management
              </Button>
            </Link>
            <Link to="/team-overview">
              <Button variant="outline" size="sm">
                <Icon name="Users" size={16} className="mr-2" />
                Team Overview
              </Button>
            </Link>
            <Link to="/analytics-dashboard">
              <Button variant="outline" size="sm">
                <Icon name="BarChart3" size={16} className="mr-2" />
                Analytics
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <QuickActionsPanel
          userRole={currentUser?.role}
          onActionClick={handleQuickAction} />


        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Primary Content */}
          <div className="lg:col-span-2 space-y-6">
            {selectedView === 'overview' &&
            <>
                <TaskOverviewWidget tasks={mockTasks} userRole={currentUser?.role} />
                <PerformanceMetrics userRole={currentUser?.role} metricsData={mockMetricsData} />
              </>
            }
            
            {selectedView === 'tasks' &&
            <TaskOverviewWidget tasks={mockTasks} userRole={currentUser?.role} />
            }
            
            {selectedView === 'analytics' &&
            <PerformanceMetrics userRole={currentUser?.role} metricsData={mockMetricsData} />
            }
            
            {selectedView === 'activity' &&
            <RecentActivity activities={mockActivities} userRole={currentUser?.role} />
            }
          </div>

          {/* Right Column - Secondary Content */}
          <div className="space-y-6">
            <NotificationsFeed
              notifications={mockNotifications}
              onMarkAsRead={handleMarkNotificationAsRead}
              onMarkAllAsRead={handleMarkAllNotificationsAsRead} />

            
            {selectedView === 'overview' &&
            <RecentActivity activities={mockActivities} userRole={currentUser?.role} />
            }

            {/* Quick Stats Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-base font-medium text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-green-600" />
                    <span className="text-sm text-muted-foreground">Tasks Completed Today</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-blue-600" />
                    <span className="text-sm text-muted-foreground">Hours Logged</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">6.5h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-purple-600" />
                    <span className="text-sm text-muted-foreground">Team Members Active</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">12/15</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-orange-600" />
                    <span className="text-sm text-muted-foreground">Productivity Score</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="lg:hidden mt-6 grid grid-cols-2 gap-4">
          <Link to="/task-management-interface">
            <Button variant="outline" className="w-full">
              <Icon name="CheckSquare" size={16} className="mr-2" />
              Task Management
            </Button>
          </Link>
          <Link to="/team-overview">
            <Button variant="outline" className="w-full">
              <Icon name="Users" size={16} className="mr-2" />
              Team Overview
            </Button>
          </Link>
          <Link to="/notifications-center">
            <Button variant="outline" className="w-full">
              <Icon name="Bell" size={16} className="mr-2" />
              Notifications
            </Button>
          </Link>
          <Link to="/analytics-dashboard">
            <Button variant="outline" className="w-full">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Analytics
            </Button>
          </Link>
        </div>
      </div>
    </div>);

};

export default DashboardRoleSpecific;