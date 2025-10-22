import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RecentActivity = ({ activities, userRole }) => {
  const [filter, setFilter] = useState('all');

  const getActivityIcon = (type) => {
    const icons = {
      task_created: 'Plus',
      task_completed: 'CheckCircle',
      task_assigned: 'UserPlus',
      comment_added: 'MessageSquare',
      file_uploaded: 'Upload',
      deadline_updated: 'Calendar',
      status_changed: 'RefreshCw',
      user_joined: 'UserCheck',
      project_created: 'FolderPlus',
      meeting_scheduled: 'Video'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      task_created: 'text-blue-600 bg-blue-50',
      task_completed: 'text-green-600 bg-green-50',
      task_assigned: 'text-purple-600 bg-purple-50',
      comment_added: 'text-indigo-600 bg-indigo-50',
      file_uploaded: 'text-orange-600 bg-orange-50',
      deadline_updated: 'text-yellow-600 bg-yellow-50',
      status_changed: 'text-cyan-600 bg-cyan-50',
      user_joined: 'text-emerald-600 bg-emerald-50',
      project_created: 'text-violet-600 bg-violet-50',
      meeting_scheduled: 'text-pink-600 bg-pink-50'
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

  const getFilteredActivities = () => {
    if (filter === 'my') {
      return activities?.filter(activity => activity?.isUserInvolved);
    }
    if (filter === 'team') {
      return activities?.filter(activity => activity?.scope === 'team');
    }
    return activities;
  };

  const filteredActivities = getFilteredActivities();

  const filterOptions = [
    { key: 'all', label: 'All Activity', count: activities?.length },
    { key: 'my', label: 'My Activity', count: activities?.filter(a => a?.isUserInvolved)?.length },
    { key: 'team', label: 'Team Activity', count: activities?.filter(a => a?.scope === 'team')?.length }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-brand-value text-foreground">Recent Activity</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Filter" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted p-1 rounded-lg">
        {filterOptions?.map((option) => (
          <button
            key={option?.key}
            onClick={() => setFilter(option?.key)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === option?.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {option?.label} ({option?.count})
          </button>
        ))}
      </div>
      {/* Activity Feed */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No recent activity to show</p>
          </div>
        ) : (
          filteredActivities?.map((activity, index) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              {/* Activity Icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* User Avatar and Name */}
                    <div className="flex items-center space-x-2 mb-1">
                      <Image
                        src={activity?.user?.avatar}
                        alt={activity?.user?.avatarAlt}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {activity?.user?.name}
                      </span>
                      {activity?.user?.role && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {activity?.user?.role}
                        </span>
                      )}
                    </div>

                    {/* Activity Description */}
                    <p className="text-sm text-foreground mb-1">
                      {activity?.description}
                    </p>

                    {/* Additional Context */}
                    {activity?.context && (
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Icon name="ArrowRight" size={12} />
                        <span>{activity?.context}</span>
                      </div>
                    )}

                    {/* Attachments or Links */}
                    {activity?.attachment && (
                      <div className="mt-2 p-2 bg-muted/50 rounded border border-border">
                        <div className="flex items-center space-x-2">
                          <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                          <span className="text-xs text-foreground font-medium">
                            {activity?.attachment?.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({activity?.attachment?.size})
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className="flex flex-col items-end space-y-1 ml-3">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(activity?.timestamp)}
                    </span>
                    {activity?.priority === 'high' && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {activity?.actionable && (
                  <div className="mt-2 flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Eye" size={14} className="mr-1" />
                      View
                    </Button>
                    {activity?.canRespond && (
                      <Button variant="outline" size="sm">
                        <Icon name="MessageSquare" size={14} className="mr-1" />
                        Respond
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Load More */}
      {filteredActivities?.length > 0 && (
        <div className="mt-4 text-center">
          <Button variant="outline" className="w-full">
            <Icon name="ChevronDown" size={16} className="mr-2" />
            Load More Activity
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;