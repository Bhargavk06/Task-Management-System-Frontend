import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskModal = ({ isOpen, onClose, task, onSave, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    assignee: '',
    dueDate: '',
    estimatedHours: '',
    tags: [],
    project: '',
    category: '',
    dependencies: []
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task && mode === 'edit') {
      setFormData({
        title: task?.title || '',
        description: task?.description || '',
        priority: task?.priority || 'medium',
        status: task?.status || 'pending',
        assignee: task?.assignee?.id || '',
        dueDate: task?.dueDate ? new Date(task.dueDate)?.toISOString()?.split('T')?.[0] : '',
        estimatedHours: task?.estimatedHours || '',
        tags: task?.tags || [],
        project: task?.project || '',
        category: task?.category || '',
        dependencies: task?.dependencies || []
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
        assignee: '',
        dueDate: '',
        estimatedHours: '',
        tags: [],
        project: '',
        category: '',
        dependencies: []
      });
    }
    setErrors({});
  }, [task, mode, isOpen]);

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  const assigneeOptions = [
    { value: '', label: 'Unassigned' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'emily-davis', label: 'Emily Davis' },
    { value: 'alex-chen', label: 'Alex Chen' }
  ];

  const projectOptions = [
    { value: '', label: 'No Project' },
    { value: 'website-redesign', label: 'Website Redesign' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'marketing-campaign', label: 'Q4 Marketing Campaign' },
    { value: 'system-upgrade', label: 'System Infrastructure Upgrade' }
  ];

  const categoryOptions = [
    { value: '', label: 'No Category' },
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'research', label: 'Research' },
    { value: 'testing', label: 'Testing' },
    { value: 'documentation', label: 'Documentation' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Task description is required';
    }

    if (!formData?.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    if (!formData?.estimatedHours || formData?.estimatedHours <= 0) {
      newErrors.estimatedHours = 'Estimated hours must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const taskData = {
        ...formData,
        id: task?.id || Date.now()?.toString(),
        createdAt: task?.createdAt || new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString(),
        progress: task?.progress || 0
      };

      await onSave(taskData);
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {mode === 'edit' ? 'Edit Task' : 'Create New Task'}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6">
              <Input
                label="Task Title"
                type="text"
                value={formData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                placeholder="Enter task title"
                error={errors?.title}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                  placeholder="Enter task description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors?.description && (
                  <p className="mt-1 text-sm text-red-600">{errors?.description}</p>
                )}
              </div>
            </div>

            {/* Task Properties */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Priority"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
              />

              <Select
                label="Status"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
              />

              <Select
                label="Assignee"
                options={assigneeOptions}
                value={formData?.assignee}
                onChange={(value) => handleInputChange('assignee', value)}
              />

              <Input
                label="Due Date"
                type="date"
                value={formData?.dueDate}
                onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
                error={errors?.dueDate}
                required
              />

              <Input
                label="Estimated Hours"
                type="number"
                value={formData?.estimatedHours}
                onChange={(e) => handleInputChange('estimatedHours', e?.target?.value)}
                placeholder="0"
                min="0.5"
                step="0.5"
                error={errors?.estimatedHours}
                required
              />

              <Select
                label="Project"
                options={projectOptions}
                value={formData?.project}
                onChange={(value) => handleInputChange('project', value)}
              />

              <Select
                label="Category"
                options={categoryOptions}
                value={formData?.category}
                onChange={(value) => handleInputChange('category', value)}
              />
            </div>

            {/* Advanced Options */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Advanced Options</h4>
              
              <div className="space-y-4">
                <Checkbox
                  label="Send notification to assignee"
                  checked
                  onChange={() => {}}
                />
                
                <Checkbox
                  label="Add to my watchlist"
                  checked
                  onChange={() => {}}
                />
                
                <Checkbox
                  label="Create recurring task"
                 
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                loading={isLoading}
                iconName="Save"
                iconPosition="left"
              >
                {mode === 'edit' ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;