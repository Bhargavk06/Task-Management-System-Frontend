import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const NotificationFilters = ({
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  onMarkAllAsRead,
  onClearAll,
  unreadCount
}) => {
  const filterOptions = [
    { value: 'all', label: 'All Notifications', icon: 'Bell' },
    { value: 'unread', label: 'Unread', icon: 'BellRing' },
    { value: 'task_assigned', label: 'Task Assignments', icon: 'UserPlus' },
    { value: 'task_completed', label: 'Completions', icon: 'CheckCircle' },
    { value: 'deadline_reminder', label: 'Deadlines', icon: 'Clock' },
    { value: 'comment_added', label: 'Comments', icon: 'MessageCircle' },
    { value: 'project_update', label: 'Project Updates', icon: 'FolderOpen' },
    { value: 'system_alert', label: 'System Alerts', icon: 'AlertTriangle' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'Priority' },
    { value: 'unread', label: 'Unread First' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Notification Center</h2>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All notifications read'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAllAsRead}
            >
              <Icon name="CheckCheck" size={14} className="mr-2" />
              Mark All Read
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Icon name="Trash2" size={14} className="mr-2" />
            Clear All
          </Button>
        </div>
      </div>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterOptions?.map((filter) => (
          <Button
            key={filter?.value}
            variant={activeFilter === filter?.value ? "default" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(filter?.value)}
            className="flex items-center space-x-2"
          >
            <Icon name={filter?.icon} size={14} />
            <span>{filter?.label}</span>
            {filter?.value === 'unread' && unreadCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                {unreadCount}
              </span>
            )}
          </Button>
        ))}
      </div>
      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sort by:</span>
        </div>
        
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
          className="w-40"
        />
      </div>
    </div>
  );
};

export default NotificationFilters;