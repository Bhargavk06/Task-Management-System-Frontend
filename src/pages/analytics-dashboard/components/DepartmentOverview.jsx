import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const DepartmentOverview = ({ data, title }) => {
  const COLORS = [
    'var(--color-primary)',
    'var(--color-success)', 
    'var(--color-warning)',
    'var(--color-error)',
    'var(--color-accent)',
    'var(--color-secondary)'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-moderate p-3">
          <p className="font-medium text-foreground">{data?.name}</p>
          <div className="space-y-1 mt-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tasks:</span>
              <span className="font-medium text-foreground">{data?.value}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completion Rate:</span>
              <span className="font-medium text-foreground">{data?.completionRate}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Team Members:</span>
              <span className="font-medium text-foreground">{data?.members}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload?.map((entry, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-sm" 
            style={{ backgroundColor: entry?.color }}
          />
          <span className="text-sm text-foreground">{entry?.value}</span>
        </div>
      ))}
    </div>
  );

  const totalTasks = data?.reduce((sum, dept) => sum + dept?.value, 0);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>Total Tasks: {totalTasks}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="w-full h-64" aria-label="Department Task Distribution Pie Chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Department Stats */}
        <div className="space-y-4">
          {data?.map((dept, index) => (
            <div key={dept?.name} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-sm" 
                  style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                />
                <div>
                  <div className="font-medium text-foreground">{dept?.name}</div>
                  <div className="text-sm text-muted-foreground">{dept?.members} members</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-foreground">{dept?.value} tasks</div>
                <div className={`text-sm ${
                  dept?.completionRate >= 90 ? 'text-success' : 
                  dept?.completionRate >= 70 ? 'text-warning' : 'text-error'
                }`}>
                  {dept?.completionRate}% complete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentOverview;