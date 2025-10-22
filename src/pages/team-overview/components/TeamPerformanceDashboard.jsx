import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TeamPerformanceDashboard = ({ performanceData, timeRange, onTimeRangeChange }) => {
  const [activeMetric, setActiveMetric] = useState('completion');

  const COLORS = ['#2563EB', '#059669', '#F59E0B', '#EF4444', '#7C3AED'];

  const metricOptions = [
    { key: 'completion', label: 'Task Completion', icon: 'CheckCircle' },
    { key: 'efficiency', label: 'Efficiency', icon: 'Zap' },
    { key: 'collaboration', label: 'Collaboration', icon: 'Users' },
    { key: 'quality', label: 'Quality Score', icon: 'Star' }
  ];

  const timeRangeOptions = [
    { key: '7d', label: 'Last 7 Days' },
    { key: '30d', label: 'Last 30 Days' },
    { key: '90d', label: 'Last 90 Days' },
    { key: '1y', label: 'Last Year' }
  ];

  const renderMetricChart = () => {
    const data = performanceData?.metrics?.[activeMetric];
    
    if (activeMetric === 'completion') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data?.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="completed" fill="#059669" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (activeMetric === 'efficiency') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data?.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="efficiency" 
              stroke="#2563EB" 
              strokeWidth={3}
              dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data?.chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
          >
            {data?.chartData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Team Performance Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Comparative metrics and productivity insights
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e?.target?.value)}
            className="px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeRangeOptions?.map((option) => (
              <option key={option?.key} value={option?.key}>
                {option?.label}
              </option>
            ))}
          </select>
          
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metricOptions?.map((metric) => (
          <Button
            key={metric?.key}
            variant={activeMetric === metric?.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveMetric(metric?.key)}
            className="flex items-center space-x-2"
          >
            <Icon name={metric?.icon} size={14} />
            <span>{metric?.label}</span>
          </Button>
        ))}
      </div>
      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {performanceData?.summary?.map((item) => (
          <div key={item?.id} className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name={item?.icon} size={20} className="text-primary" />
              <div className={`text-xs px-2 py-1 rounded-full ${
                item?.trend === 'up' ? 'bg-green-100 text-green-800' :
                item?.trend === 'down'? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}>
                <Icon 
                  name={item?.trend === 'up' ? 'TrendingUp' : item?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  size={10} 
                  className="inline mr-1" 
                />
                {item?.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{item?.value}</div>
            <div className="text-sm text-muted-foreground">{item?.label}</div>
          </div>
        ))}
      </div>
      {/* Chart Area */}
      <div className="bg-background rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">
            {metricOptions?.find(m => m?.key === activeMetric)?.label} Analysis
          </h4>
          <div className="text-sm text-muted-foreground">
            {performanceData?.metrics?.[activeMetric]?.description}
          </div>
        </div>
        {renderMetricChart()}
      </div>
      {/* Team Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Top Performers</h4>
          <div className="space-y-3">
            {performanceData?.topPerformers?.map((performer, index) => (
              <div key={performer?.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-orange-600 text-white': 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{performer?.name}</div>
                    <div className="text-sm text-muted-foreground">{performer?.department}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">{performer?.score}</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Department Comparison</h4>
          <div className="space-y-3">
            {performanceData?.departmentComparison?.map((dept) => (
              <div key={dept?.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{dept?.name}</span>
                  <span className="text-sm text-muted-foreground">{dept?.score}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${dept?.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformanceDashboard;