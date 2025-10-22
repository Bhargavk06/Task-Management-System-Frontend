import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, onAssign, isDragging }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-100';
      case 'in-progress': return 'text-blue-700 bg-blue-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      case 'overdue': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue(task?.dueDate);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${isDragging ? 'opacity-50 rotate-2' : ''}`}>
      {/* Task Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task?.priority)}`}>
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task?.status)}`}>
                {task?.status?.replace('-', ' ')?.charAt(0)?.toUpperCase() + task?.status?.replace('-', ' ')?.slice(1)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {task?.title}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-2">
              {task?.description}
            </p>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Task Details */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>Due: {formatDate(task?.dueDate)}</span>
              {daysUntilDue < 0 && (
                <span className="text-red-600 font-medium">({Math.abs(daysUntilDue)} days overdue)</span>
              )}
              {daysUntilDue >= 0 && daysUntilDue <= 3 && (
                <span className="text-yellow-600 font-medium">({daysUntilDue} days left)</span>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{task?.estimatedHours}h estimated</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {task?.assignee && (
              <div className="flex items-center space-x-2">
                <Image
                  src={task?.assignee?.avatar}
                  alt={task?.assignee?.avatarAlt}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-700">{task?.assignee?.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">{task?.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${task?.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Tags */}
        {task?.tags && task?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task?.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <div className="border-t border-gray-100 pt-3 mt-3 space-y-3">
            {/* Subtasks */}
            {task?.subtasks && task?.subtasks?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Subtasks ({task?.subtasks?.filter(st => st?.completed)?.length}/{task?.subtasks?.length})</h4>
                <div className="space-y-2">
                  {task?.subtasks?.map((subtask) => (
                    <div key={subtask?.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={subtask?.completed}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className={`text-sm ${subtask?.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {subtask?.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            {task?.attachments && task?.attachments?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                <div className="space-y-1">
                  {task?.attachments?.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <Icon name="Paperclip" size={14} />
                      <span>{attachment?.name}</span>
                      <span className="text-xs text-gray-500">({attachment?.size})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Count */}
            {task?.commentsCount > 0 && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Icon name="MessageCircle" size={14} />
                <span>{task?.commentsCount} comments</span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(task)}
            >
              <Icon name="Edit2" size={14} className="mr-1" />
              Edit
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAssign(task)}
            >
              <Icon name="UserPlus" size={14} className="mr-1" />
              Assign
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange(task)}
            >
              <Icon name="RefreshCw" size={14} className="mr-1" />
              Update Status
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Icon name="Trash2" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;