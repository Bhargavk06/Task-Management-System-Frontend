import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TaskCard from './TaskCard';

const KanbanBoard = ({ tasks, onTaskUpdate, onTaskEdit, onTaskDelete, onTaskAssign }) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);

  const columns = [
    { id: 'pending', title: 'Pending', color: 'bg-gray-100', count: 0 },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100', count: 0 },
    { id: 'review', title: 'In Review', color: 'bg-yellow-100', count: 0 },
    { id: 'completed', title: 'Completed', color: 'bg-green-100', count: 0 }
  ];

  // Group tasks by status
  const tasksByStatus = tasks?.reduce((acc, task) => {
    const status = task?.status === 'overdue' ? 'pending' : task?.status;
    if (!acc?.[status]) acc[status] = [];
    acc?.[status]?.push(task);
    return acc;
  }, {});

  // Update column counts
  columns?.forEach(column => {
    column.count = tasksByStatus?.[column?.id]?.length || 0;
  });

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOver(columnId);
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = (e, columnId) => {
    e?.preventDefault();
    setDraggedOver(null);
    
    if (draggedTask && draggedTask?.status !== columnId) {
      onTaskUpdate(draggedTask?.id, { status: columnId });
    }
    
    setDraggedTask(null);
  };

  const getColumnHeaderIcon = (columnId) => {
    switch (columnId) {
      case 'pending': return 'Clock';
      case 'in-progress': return 'Play';
      case 'review': return 'Eye';
      case 'completed': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="flex-1 overflow-x-auto bg-gray-50 p-6">
      <div className="flex space-x-6 min-w-max">
        {columns?.map((column) => (
          <div
            key={column?.id}
            className={`flex-shrink-0 w-80 ${column?.color} rounded-lg`}
            onDragOver={(e) => handleDragOver(e, column?.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column?.id)}
          >
            {/* Column Header */}
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name={getColumnHeaderIcon(column?.id)} size={18} className="text-gray-700" />
                  <h3 className="font-semibold text-gray-900">{column?.title}</h3>
                  <span className="bg-white/50 text-gray-700 text-sm font-medium px-2 py-1 rounded-full">
                    {column?.count}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Column Content */}
            <div 
              className={`p-4 space-y-3 min-h-96 ${
                draggedOver === column?.id ? 'bg-white/30' : ''
              }`}
            >
              {tasksByStatus?.[column?.id]?.map((task) => (
                <div
                  key={task?.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  className="cursor-move"
                >
                  <TaskCard
                    task={task}
                    onEdit={onTaskEdit}
                    onDelete={onTaskDelete}
                    onStatusChange={(task) => onTaskUpdate(task?.id, { status: task?.status })}
                    onAssign={onTaskAssign}
                    isDragging={draggedTask?.id === task?.id}
                  />
                </div>
              )) || (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <Icon name="Package" size={48} className="mb-2 opacity-50" />
                  <p className="text-sm">No tasks in {column?.title?.toLowerCase()}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;