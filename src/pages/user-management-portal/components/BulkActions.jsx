import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedUsers, onBulkRoleUpdate, onBulkStatusUpdate, onBulkDelete, onClearSelection }) => {
  const [bulkRole, setBulkRole] = useState('');
  const [bulkStatus, setBulkStatus] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' },
    { value: 'viewer', label: 'Viewer' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const handleBulkRoleUpdate = async () => {
    if (!bulkRole || selectedUsers?.length === 0) return;
    
    setIsProcessing(true);
    await onBulkRoleUpdate(selectedUsers, bulkRole);
    setBulkRole('');
    setIsProcessing(false);
  };

  const handleBulkStatusUpdate = async () => {
    if (!bulkStatus || selectedUsers?.length === 0) return;
    
    setIsProcessing(true);
    await onBulkStatusUpdate(selectedUsers, bulkStatus);
    setBulkStatus('');
    setIsProcessing(false);
  };

  const handleBulkDelete = async () => {
    if (selectedUsers?.length === 0) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete ${selectedUsers?.length} user(s)? This action cannot be undone.`);
    if (!confirmed) return;
    
    setIsProcessing(true);
    await onBulkDelete(selectedUsers);
    setIsProcessing(false);
  };

  if (selectedUsers?.length === 0) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="CheckSquare" size={18} className="text-primary" />
          <span className="font-medium text-foreground">
            {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
        >
          <Icon name="X" size={14} className="mr-2" />
          Clear Selection
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <Select
              options={roleOptions}
              value={bulkRole}
              onChange={setBulkRole}
              placeholder="Update role..."
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBulkRoleUpdate}
            disabled={!bulkRole || isProcessing}
            loading={isProcessing}
          >
            Apply
          </Button>
        </div>

        <div className="flex space-x-2">
          <div className="flex-1">
            <Select
              options={statusOptions}
              value={bulkStatus}
              onChange={setBulkStatus}
              placeholder="Update status..."
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBulkStatusUpdate}
            disabled={!bulkStatus || isProcessing}
            loading={isProcessing}
          >
            Apply
          </Button>
        </div>

        <div className="flex justify-end">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            disabled={isProcessing}
            loading={isProcessing}
          >
            <Icon name="Trash2" size={14} className="mr-2" />
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;