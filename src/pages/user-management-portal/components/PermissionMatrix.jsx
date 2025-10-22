import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PermissionMatrix = ({ isOpen, onClose, onSavePermissions }) => {
  const [permissions, setPermissions] = useState({
    admin: {
      'user-management': true,
      'task-management': true,
      'analytics': true,
      'system-settings': true,
      'billing': true,
      'security': true
    },
    manager: {
      'user-management': false,
      'task-management': true,
      'analytics': true,
      'system-settings': false,
      'billing': false,
      'security': false
    },
    employee: {
      'user-management': false,
      'task-management': true,
      'analytics': false,
      'system-settings': false,
      'billing': false,
      'security': false
    },
    viewer: {
      'user-management': false,
      'task-management': false,
      'analytics': false,
      'system-settings': false,
      'billing': false,
      'security': false
    }
  });

  const permissionLabels = {
    'user-management': 'User Management',
    'task-management': 'Task Management',
    'analytics': 'Analytics & Reports',
    'system-settings': 'System Settings',
    'billing': 'Billing & Subscriptions',
    'security': 'Security & Audit'
  };

  const roleLabels = {
    admin: 'Administrator',
    manager: 'Manager',
    employee: 'Employee',
    viewer: 'Viewer'
  };

  const handlePermissionToggle = (role, permission) => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev?.[role],
        [permission]: !prev?.[role]?.[permission]
      }
    }));
  };

  const handleSave = () => {
    onSavePermissions(permissions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-brand-value text-foreground flex items-center">
            <Icon name="Shield" size={20} className="mr-2" />
            Permission Matrix
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={18} />
          </Button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Permission</th>
                  {Object.entries(roleLabels)?.map(([role, label]) => (
                    <th key={role} className="text-center py-3 px-4 font-medium text-foreground min-w-[120px]">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(permissionLabels)?.map(([permission, label]) => (
                  <tr key={permission} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium text-foreground">{label}</td>
                    {Object.keys(roleLabels)?.map(role => (
                      <td key={role} className="py-4 px-4 text-center">
                        <button
                          onClick={() => handlePermissionToggle(role, permission)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                            permissions?.[role]?.[permission]
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          {permissions?.[role]?.[permission] && (
                            <Icon name="Check" size={14} />
                          )}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
            <div className="text-sm text-muted-foreground">
              <Icon name="Info" size={14} className="inline mr-2" />
              Changes will apply to all users with the respective roles
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Icon name="Save" size={14} className="mr-2" />
                Save Permissions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionMatrix;