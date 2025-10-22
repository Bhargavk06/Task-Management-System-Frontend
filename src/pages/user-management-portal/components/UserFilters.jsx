import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const UserFilters = ({ 
  searchTerm, 
  onSearchChange, 
  roleFilter, 
  onRoleFilterChange, 
  statusFilter, 
  onStatusFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
  onClearFilters 
}) => {
  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' },
    { value: 'viewer', label: 'Viewer' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const hasActiveFilters = searchTerm || roleFilter !== 'all' || statusFilter !== 'all' || departmentFilter !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-brand-value text-foreground flex items-center">
          <Icon name="Filter" size={18} className="mr-2" />
          Filter Users
        </h3>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
          >
            <Icon name="X" size={14} className="mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
          />
        </div>

        <div>
          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={onRoleFilterChange}
            placeholder="Filter by role"
          />
        </div>

        <div>
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusFilterChange}
            placeholder="Filter by status"
          />
        </div>

        <div>
          <Select
            options={departmentOptions}
            value={departmentFilter}
            onChange={onDepartmentFilterChange}
            placeholder="Filter by department"
          />
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                Search: "{searchTerm}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-2 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {roleFilter !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Role: {roleOptions?.find(r => r?.value === roleFilter)?.label}
                <button
                  onClick={() => onRoleFilterChange('all')}
                  className="ml-2 hover:text-blue-600"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Status: {statusOptions?.find(s => s?.value === statusFilter)?.label}
                <button
                  onClick={() => onStatusFilterChange('all')}
                  className="ml-2 hover:text-green-600"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {departmentFilter !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                Dept: {departmentOptions?.find(d => d?.value === departmentFilter)?.label}
                <button
                  onClick={() => onDepartmentFilterChange('all')}
                  className="ml-2 hover:text-purple-600"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilters;