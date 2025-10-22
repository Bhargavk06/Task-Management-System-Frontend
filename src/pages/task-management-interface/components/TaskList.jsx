import React from 'react';
import Icon from '../../../components/AppIcon';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onTaskEdit, onTaskDelete, onTaskStatusChange, onTaskAssign }) => {
  if (tasks?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Icon name="Search" size={64} className="mb-4 opacity-50" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-sm text-gray-600 text-center max-w-md">
          No tasks match your current filters. Try adjusting your search criteria or create a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="space-y-4">
        {tasks?.map((task) => (
          <TaskCard
            key={task?.id}
            task={task}
            onEdit={onTaskEdit}
            onDelete={onTaskDelete}
            onStatusChange={onTaskStatusChange}
            onAssign={onTaskAssign}
            isDragging={false}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;