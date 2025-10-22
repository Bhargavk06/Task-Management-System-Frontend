import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeamPerformanceTable = ({ data, title }) => {
  const [sortField, setSortField] = useState('completionRate');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const getPerformanceColor = (rate) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 70) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceBadge = (rate) => {
    if (rate >= 90) return { label: 'Excellent', color: 'bg-success/10 text-success' };
    if (rate >= 70) return { label: 'Good', color: 'bg-warning/10 text-warning' };
    return { label: 'Needs Improvement', color: 'bg-error/10 text-error' };
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <Icon 
          name={sortField === field ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
          size={14} 
        />
      </div>
    </th>
  );

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Team Member
              </th>
              <SortableHeader field="completionRate">Completion Rate</SortableHeader>
              <SortableHeader field="tasksCompleted">Tasks Completed</SortableHeader>
              <SortableHeader field="avgResponseTime">Avg Response Time</SortableHeader>
              <SortableHeader field="productivity">Productivity Score</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedData?.map((member) => {
              const badge = getPerformanceBadge(member?.completionRate);
              return (
                <tr key={member?.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={member?.avatar}
                        alt={member?.avatarAlt}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-foreground">{member?.name}</div>
                        <div className="text-sm text-muted-foreground">{member?.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            member?.completionRate >= 90 ? 'bg-success' : 
                            member?.completionRate >= 70 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${member?.completionRate}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getPerformanceColor(member?.completionRate)}`}>
                        {member?.completionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {member?.tasksCompleted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {member?.avgResponseTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium text-foreground">{member?.productivity}</span>
                      <Icon 
                        name={member?.productivityTrend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                        size={14} 
                        className={member?.productivityTrend === 'up' ? 'text-success' : 'text-error'}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${badge?.color}`}>
                      {badge?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm" iconName="MessageSquare">
                        Feedback
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamPerformanceTable;