import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskOverviewWidget = ({ tasks, userRole }) => {
  const getTaskStats = () => {
    const total = tasks?.length;
    const completed = tasks?.filter(task => task?.status === 'completed')?.length;
    const inProgress = tasks?.filter(task => task?.status === 'in-progress')?.length;
    const pending = tasks?.filter(task => task?.status === 'pending')?.length;
    const overdue = tasks?.filter(task => task?.isOverdue)?.length;
    
    return { total, completed, inProgress, pending, overdue };
  };

  const stats = getTaskStats();
  const completionRate = stats?.total > 0 ? Math.round((stats?.completed / stats?.total) * 100) : 0;

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-green-600 bg-green-50',
      'in-progress': 'text-blue-600 bg-blue-50',
      pending: 'text-yellow-600 bg-yellow-50',
      overdue: 'text-red-600 bg-red-50'
    };
    return colors?.[status] || 'text-gray-600 bg-gray-50';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors?.[priority] || 'bg-gray-500';
  };

  const recentTasks = tasks?.slice(0, 5);

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-brand-value text-foreground">Task Overview</h2>
        <Button variant="ghost" size="sm">
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{stats?.total}</div>
          <div className="text-sm text-muted-foreground">Total Tasks</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{stats?.completed}</div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{stats?.inProgress}</div>
          <div className="text-sm text-blue-600">In Progress</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{stats?.overdue}</div>
          <div className="text-sm text-red-600">Overdue</div>
        </div>
      </div>
      {/* Completion Rate */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Completion Rate</span>
          <span className="text-sm font-bold text-foreground">{completionRate}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
      {/* Recent Tasks */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Recent Tasks</h3>
        <div className="space-y-3">
          {recentTasks?.map((task) => (
            <div key={task?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(task?.priority)}`}></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{task?.title}</div>
                <div className="text-xs text-muted-foreground">{task?.assignee}</div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task?.status)}`}>
                {task?.status?.replace('-', ' ')}
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          <Icon name="ArrowRight" size={16} className="mr-2" />
          View All Tasks
        </Button>
      </div>
    </div>
  );
};

export default TaskOverviewWidget;