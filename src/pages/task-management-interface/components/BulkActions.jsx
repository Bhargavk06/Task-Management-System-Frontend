import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedTasks, onBulkAction, onClearSelection }) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [bulkStatus, setBulkStatus] = useState('');
  const [bulkAssignee, setBulkAssignee] = useState('');
  const [bulkPriority, setBulkPriority] = useState('');

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' }
  ];

  const assigneeOptions = [
    { value: '', label: 'Select Assignee' },
    { value: 'unassigned', label: 'Unassigned' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'emily-davis', label: 'Emily Davis' }
  ];

  const priorityOptions = [
    { value: '', label: 'Select Priority' },
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const handleBulkAction = (action, value = null) => {
    onBulkAction(action, selectedTasks, value);
    
    // Reset form values
    setBulkStatus('');
    setBulkAssignee('');
    setBulkPriority('');
    setIsActionsOpen(false);
  };

  if (selectedTasks?.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-96">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
              <Icon name="CheckSquare" size={16} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {selectedTasks?.length} task{selectedTasks?.length !== 1 ? 's' : ''} selected
              </h3>
              <p className="text-sm text-gray-600">Choose an action to apply to selected tasks</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('delete')}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Icon name="Trash2" size={14} className="mr-1" />
            Delete
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('duplicate')}
          >
            <Icon name="Copy" size={14} className="mr-1" />
            Duplicate
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkAction('export')}
          >
            <Icon name="Download" size={14} className="mr-1" />
            Export
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsActionsOpen(!isActionsOpen)}
          >
            <Icon name="MoreHorizontal" size={14} className="mr-1" />
            More Actions
            <Icon name={isActionsOpen ? "ChevronUp" : "ChevronDown"} size={14} className="ml-1" />
          </Button>
        </div>

        {/* Extended Actions */}
        {isActionsOpen && (
          <div className="border-t border-gray-200 pt-4 space-y-4">
            {/* Bulk Status Update */}
            <div className="flex items-center space-x-2">
              <Select
                options={statusOptions}
                value={bulkStatus}
                onChange={setBulkStatus}
                placeholder="Update Status"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('updateStatus', bulkStatus)}
                disabled={!bulkStatus}
              >
                Apply
              </Button>
            </div>

            {/* Bulk Assignee Update */}
            <div className="flex items-center space-x-2">
              <Select
                options={assigneeOptions}
                value={bulkAssignee}
                onChange={setBulkAssignee}
                placeholder="Assign To"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('updateAssignee', bulkAssignee)}
                disabled={!bulkAssignee}
              >
                Apply
              </Button>
            </div>

            {/* Bulk Priority Update */}
            <div className="flex items-center space-x-2">
              <Select
                options={priorityOptions}
                value={bulkPriority}
                onChange={setBulkPriority}
                placeholder="Set Priority"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('updatePriority', bulkPriority)}
                disabled={!bulkPriority}
              >
                Apply
              </Button>
            </div>

            {/* Additional Actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('addToProject')}
              >
                <Icon name="FolderPlus" size={14} className="mr-1" />
                Add to Project
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('addTags')}
              >
                <Icon name="Tag" size={14} className="mr-1" />
                Add Tags
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('setDueDate')}
              >
                <Icon name="Calendar" size={14} className="mr-1" />
                Set Due Date
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActions;