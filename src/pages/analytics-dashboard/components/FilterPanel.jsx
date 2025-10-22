import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ onFiltersChange, isOpen, onToggle }) => {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    departments: [],
    roles: [],
    status: 'all',
    searchTerm: ''
  });

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' },
    { value: 'contractor', label: 'Contractor' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending Review' }
  ];

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleArrayFilterChange = (key, value, checked) => {
    const currentArray = filters?.[key];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray?.filter(item => item !== value);
    
    handleFilterChange(key, newArray);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: '30d',
      departments: [],
      roles: [],
      status: 'all',
      searchTerm: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.departments?.length > 0) count++;
    if (filters?.roles?.length > 0) count++;
    if (filters?.status !== 'all') count++;
    if (filters?.searchTerm) count++;
    if (filters?.dateRange !== '30d') count++;
    return count;
  };

  if (!isOpen) {
    return (
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          className="relative"
        >
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Analytics Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle} iconName="X">
            Close
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Search */}
        <div className="space-y-2">
          <Input
            label="Search"
            type="search"
            placeholder="Search by name, task, or keyword..."
            value={filters?.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </div>

        {/* Departments */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Departments</label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {departmentOptions?.map((dept) => (
              <Checkbox
                key={dept?.value}
                label={dept?.label}
                checked={filters?.departments?.includes(dept?.value)}
                onChange={(e) => handleArrayFilterChange('departments', dept?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Roles</label>
          <div className="space-y-2">
            {roleOptions?.map((role) => (
              <Checkbox
                key={role?.value}
                label={role?.label}
                checked={filters?.roles?.includes(role?.value)}
                onChange={(e) => handleArrayFilterChange('roles', role?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Quick Filters</label>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleFilterChange('status', 'active');
                handleFilterChange('dateRange', '7d');
              }}
              className="w-full justify-start"
            >
              <Icon name="Zap" size={14} className="mr-2" />
              High Performers (7d)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleFilterChange('status', 'pending');
                handleFilterChange('dateRange', '30d');
              }}
              className="w-full justify-start"
            >
              <Icon name="AlertCircle" size={14} className="mr-2" />
              Needs Review (30d)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                handleFilterChange('departments', ['engineering', 'marketing']);
                handleFilterChange('dateRange', '90d');
              }}
              className="w-full justify-start"
            >
              <Icon name="Users" size={14} className="mr-2" />
              Core Teams (90d)
            </Button>
          </div>
        </div>
      </div>
      {/* Applied Filters Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Applied Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters?.searchTerm && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                Search: "{filters?.searchTerm}"
              </span>
            )}
            {filters?.dateRange !== '30d' && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                Date: {dateRangeOptions?.find(d => d?.value === filters?.dateRange)?.label}
              </span>
            )}
            {filters?.status !== 'all' && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                Status: {statusOptions?.find(s => s?.value === filters?.status)?.label}
              </span>
            )}
            {filters?.departments?.map(dept => (
              <span key={dept} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                {departmentOptions?.find(d => d?.value === dept)?.label}
              </span>
            ))}
            {filters?.roles?.map(role => (
              <span key={role} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                {roleOptions?.find(r => r?.value === role)?.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;