import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TrendAnalysis = ({ data, title }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetrics, setSelectedMetrics] = useState(['productivity', 'completion']);

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const metrics = [
    { key: 'productivity', label: 'Productivity Score', color: 'var(--color-primary)' },
    { key: 'completion', label: 'Completion Rate', color: 'var(--color-success)' },
    { key: 'efficiency', label: 'Efficiency Index', color: 'var(--color-warning)' },
    { key: 'quality', label: 'Quality Score', color: 'var(--color-accent)' }
  ];

  const toggleMetric = (metricKey) => {
    setSelectedMetrics(prev => 
      prev?.includes(metricKey) 
        ? prev?.filter(m => m !== metricKey)
        : [...prev, metricKey]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg shadow-moderate p-3">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-muted-foreground">{entry?.name}:</span>
              </div>
              <span className="font-medium text-foreground">{entry?.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const filteredData = data?.[timeRange] || data?.['7d'];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Time Range Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <Button
                key={range?.value}
                variant={timeRange === range?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range?.value)}
                className="text-xs"
              >
                {range?.label}
              </Button>
            ))}
          </div>
          
          {/* Export Button */}
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      {/* Metric Toggles */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics?.map((metric) => (
          <Button
            key={metric?.key}
            variant={selectedMetrics?.includes(metric?.key) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleMetric(metric?.key)}
            className="text-xs"
          >
            <div 
              className="w-2 h-2 rounded-full mr-2" 
              style={{ backgroundColor: metric?.color }}
            />
            {metric?.label}
          </Button>
        ))}
      </div>
      {/* Chart */}
      <div className="w-full h-80" aria-label="Performance Trends Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {metrics?.map((metric) => (
              selectedMetrics?.includes(metric?.key) && (
                <Line
                  key={metric?.key}
                  type="monotone"
                  dataKey={metric?.key}
                  stroke={metric?.color}
                  strokeWidth={2}
                  dot={{ fill: metric?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: metric?.color, strokeWidth: 2 }}
                  name={metric?.label}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Best Performing</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Productivity increased by 15% over the selected period with consistent upward trend.
          </p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Needs Attention</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Quality scores show slight decline in the last week. Consider reviewing processes.
          </p>
        </div>
        
        <div className="bg-muted/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Goal Progress</span>
          </div>
          <p className="text-xs text-muted-foreground">
            On track to meet quarterly targets with current performance trajectory.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;