import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ userRole, onActionClick }) => {
  const getQuickActions = (role) => {
    const actions = {
      admin: [
        { id: 'create-project', label: 'New Project', icon: 'FolderPlus', color: 'bg-blue-500', description: 'Start department initiative' },
        { id: 'assign-manager', label: 'Assign Manager', icon: 'UserCog', color: 'bg-purple-500', description: 'Delegate to team leads' },
        { id: 'view-analytics', label: 'View Analytics', icon: 'BarChart3', color: 'bg-green-500', description: 'Performance insights' },
        { id: 'manage-users', label: 'Manage Users', icon: 'Users', color: 'bg-orange-500', description: 'User administration' }
      ],
      manager: [
        { id: 'create-task', label: 'Create Task', icon: 'Plus', color: 'bg-blue-500', description: 'Assign to team members' },
        { id: 'review-progress', label: 'Review Progress', icon: 'CheckSquare', color: 'bg-green-500', description: 'Track team performance' },
        { id: 'team-meeting', label: 'Schedule Meeting', icon: 'Calendar', color: 'bg-purple-500', description: 'Coordinate with team' },
        { id: 'provide-feedback', label: 'Give Feedback', icon: 'MessageSquare', color: 'bg-orange-500', description: 'Support team growth' }
      ],
      employee: [
        { id: 'view-tasks', label: 'My Tasks', icon: 'CheckSquare', color: 'bg-blue-500', description: 'Current assignments' },
        { id: 'update-progress', label: 'Update Progress', icon: 'TrendingUp', color: 'bg-green-500', description: 'Report completion status' },
        { id: 'ask-question', label: 'Ask Question', icon: 'HelpCircle', color: 'bg-purple-500', description: 'Get clarification' },
        { id: 'submit-work', label: 'Submit Work', icon: 'Upload', color: 'bg-orange-500', description: 'Complete deliverables' }
      ]
    };
    return actions?.[role] || actions?.employee;
  };

  const quickActions = getQuickActions(userRole);

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-brand-value text-foreground">Quick Actions</h2>
        <Icon name="Zap" size={20} className="text-brand-primary" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            onClick={() => onActionClick(action?.id)}
            className="h-auto p-4 flex flex-col items-center space-y-3 hover:shadow-moderate transition-all duration-200"
          >
            <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={action?.icon} size={24} color="white" />
            </div>
            <div className="text-center">
              <div className="font-medium text-sm text-foreground">{action?.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{action?.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;