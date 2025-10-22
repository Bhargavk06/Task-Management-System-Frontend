import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TaskFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onViewChange, 
  currentView,
  taskCounts 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const assigneeOptions = [
    { value: 'all', label: 'All Assignees' },
    { value: 'unassigned', label: 'Unassigned' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'emily-davis', label: 'Emily Davis' }
  ];

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
    { value: 'title', label: 'Title' },
    { value: 'created', label: 'Created Date' },
    { value: 'updated', label: 'Last Updated' }
  ];

  const viewOptions = [
    { value: 'list', icon: 'List', label: 'List View' },
    { value: 'kanban', icon: 'Columns', label: 'Kanban Board' },
    { value: 'calendar', icon: 'Calendar', label: 'Calendar View' },
    { value: 'gantt', icon: 'BarChart3', label: 'Gantt Chart' }
  ];

  const hasActiveFilters = filters?.search || filters?.status !== 'all' || filters?.priority !== 'all' || filters?.assignee !== 'all';

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      {/* View Toggle and Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {viewOptions?.map((view) => (
            <Button
              key={view?.value}
              variant={currentView === view?.value ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange(view?.value)}
              className="flex items-center space-x-2"
            >
              <Icon name={view?.icon} size={16} />
              <span className="hidden sm:inline">{view?.label}</span>
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Task Counts */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Total: {taskCounts?.total}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>In Progress: {taskCounts?.inProgress}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Completed: {taskCounts?.completed}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Overdue: {taskCounts?.overdue}</span>
            </div>
          </div>

          {/* Search */}
          <div className="w-64">
            <Input
              type="search"
              placeholder="Search tasks..."
              value={filters?.search}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-4">
          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
            placeholder="Filter by status"
            className="w-40"
          />

          <Select
            options={priorityOptions}
            value={filters?.priority}
            onChange={(value) => onFilterChange('priority', value)}
            placeholder="Filter by priority"
            className="w-40"
          />

          <Select
            options={assigneeOptions}
            value={filters?.assignee}
            onChange={(value) => onFilterChange('assignee', value)}
            placeholder="Filter by assignee"
            className="w-40"
          />

          <Select
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => onFilterChange('sortBy', value)}
            placeholder="Sort by"
            className="w-36"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => onFilterChange('sortOrder', filters?.sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center space-x-1"
          >
            <Icon name={filters?.sortOrder === 'asc' ? "ArrowUp" : "ArrowDown"} size={14} />
            <span>{filters?.sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
          </Button>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear Filters
          </Button>
        )}
      </div>
      {/* Quick Filters */}
      <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-100">
        <span className="text-sm font-medium text-gray-700">Quick Filters:</span>
        
        <Button
          variant={filters?.quickFilter === 'my-tasks' ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange('quickFilter', filters?.quickFilter === 'my-tasks' ? '' : 'my-tasks')}
        >
          My Tasks
        </Button>

        <Button
          variant={filters?.quickFilter === 'due-today' ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange('quickFilter', filters?.quickFilter === 'due-today' ? '' : 'due-today')}
        >
          Due Today
        </Button>

        <Button
          variant={filters?.quickFilter === 'overdue' ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange('quickFilter', filters?.quickFilter === 'overdue' ? '' : 'overdue')}
        >
          Overdue
        </Button>

        <Button
          variant={filters?.quickFilter === 'high-priority' ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange('quickFilter', filters?.quickFilter === 'high-priority' ? '' : 'high-priority')}
        >
          High Priority
        </Button>

        <Button
          variant={filters?.quickFilter === 'unassigned' ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange('quickFilter', filters?.quickFilter === 'unassigned' ? '' : 'unassigned')}
        >
          Unassigned
        </Button>
      </div>
    </div>
  );
};

export default TaskFilters;