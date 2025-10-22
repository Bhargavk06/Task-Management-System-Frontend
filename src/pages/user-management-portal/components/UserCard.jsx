import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const UserCard = ({ user, onUpdateRole, onToggleStatus, onViewDetails }) => {
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role);

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' },
    { value: 'viewer', label: 'Viewer' }
  ];

  const handleRoleUpdate = async () => {
    if (selectedRole !== user?.role) {
      setIsUpdatingRole(true);
      await onUpdateRole(user?.id, selectedRole);
      setIsUpdatingRole(false);
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      manager: 'bg-blue-100 text-blue-800',
      employee: 'bg-green-100 text-green-800',
      viewer: 'bg-gray-100 text-gray-800'
    };
    return colors?.[role] || colors?.viewer;
  };

  const getStatusColor = (status) => {
    return status === 'active' ?'bg-green-100 text-green-800' :'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-moderate transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={user?.avatar}
              alt={user?.avatarAlt}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              user?.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
          </div>
          
          <div>
            <h3 className="font-brand-value text-foreground">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground">{user?.department}</p>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
            {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
            {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-muted-foreground">Last Login:</span>
          <p className="font-medium text-foreground">{user?.lastLogin}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Tasks Assigned:</span>
          <p className="font-medium text-foreground">{user?.tasksAssigned}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Role Assignment</label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Select
                options={roleOptions}
                value={selectedRole}
                onChange={setSelectedRole}
                placeholder="Select role"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRoleUpdate}
              loading={isUpdatingRole}
              disabled={selectedRole === user?.role}
            >
              Update
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(user?.id)}
            className="flex-1"
          >
            <Icon name="Eye" size={14} className="mr-2" />
            View Details
          </Button>
          
          <Button
            variant={user?.status === 'active' ? 'destructive' : 'default'}
            size="sm"
            onClick={() => onToggleStatus(user?.id)}
            className="flex-1"
          >
            <Icon name={user?.status === 'active' ? 'UserX' : 'UserCheck'} size={14} className="mr-2" />
            {user?.status === 'active' ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;