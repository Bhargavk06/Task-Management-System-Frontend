import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceMetrics = ({ userRole, metricsData }) => {
  const getRoleSpecificMetrics = () => {
    switch (userRole) {
      case 'admin':
        return {
          title: 'Organizational Performance',
          primaryMetric: 'Department Efficiency',
          charts: ['departmentPerformance', 'taskCompletion', 'userActivity']
        };
      case 'manager':
        return {
          title: 'Team Performance',
          primaryMetric: 'Team Productivity',
          charts: ['teamProgress', 'taskDistribution', 'memberPerformance']
        };
      case 'employee':
        return {
          title: 'Personal Performance',
          primaryMetric: 'Individual Progress',
          charts: ['personalTasks', 'weeklyProgress', 'skillDevelopment']
        };
      default:
        return {
          title: 'Performance Overview',
          primaryMetric: 'Overall Progress',
          charts: ['generalMetrics']
        };
    }
  };

  const roleMetrics = getRoleSpecificMetrics();

  const weeklyData = [
    { name: 'Mon', completed: 12, assigned: 15 },
    { name: 'Tue', completed: 19, assigned: 22 },
    { name: 'Wed', completed: 15, assigned: 18 },
    { name: 'Thu', completed: 22, assigned: 25 },
    { name: 'Fri', completed: 18, assigned: 20 },
    { name: 'Sat', completed: 8, assigned: 10 },
    { name: 'Sun', completed: 5, assigned: 7 }
  ];

  const departmentData = [
    { name: 'Engineering', value: 85, color: '#3B82F6' },
    { name: 'Marketing', value: 78, color: '#10B981' },
    { name: 'Sales', value: 92, color: '#F59E0B' },
    { name: 'Support', value: 88, color: '#8B5CF6' }
  ];

  const trendData = [
    { month: 'Jan', efficiency: 75 },
    { month: 'Feb', efficiency: 78 },
    { month: 'Mar', efficiency: 82 },
    { month: 'Apr', efficiency: 85 },
    { month: 'May', efficiency: 88 },
    { month: 'Jun', efficiency: 91 }
  ];

  const kpiCards = [
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+5.2%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'text-green-600'
    },
    {
      title: 'Average Response Time',
      value: '2.4h',
      change: '-12%',
      trend: 'down',
      icon: 'Clock',
      color: 'text-blue-600'
    },
    {
      title: 'Team Satisfaction',
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      icon: 'Star',
      color: 'text-yellow-600'
    },
    {
      title: 'Active Projects',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: 'FolderOpen',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-brand-value text-foreground">{roleMetrics?.title}</h2>
          <p className="text-sm text-muted-foreground">Real-time insights and analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards?.map((kpi, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${kpi?.color}`}>
                <Icon name={kpi?.icon} size={16} />
              </div>
              <div className={`flex items-center space-x-1 text-xs ${
                kpi?.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <Icon name={kpi?.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} size={12} />
                <span>{kpi?.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{kpi?.value}</div>
            <div className="text-sm text-muted-foreground">{kpi?.title}</div>
          </div>
        ))}
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-foreground">Weekly Progress</h3>
            <Button variant="ghost" size="sm">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="completed" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="assigned" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-foreground">Department Performance</h3>
            <Button variant="ghost" size="sm">
              <Icon name="MoreHorizontal" size={16} />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {departmentData?.map((dept, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: dept?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{dept?.name}</span>
                <span className="text-sm font-medium text-foreground">{dept?.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Trend */}
        <div className="bg-card rounded-lg border border-border p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-foreground">Efficiency Trend</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Calendar" size={14} className="mr-2" />
                Last 6 Months
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="MoreHorizontal" size={16} />
              </Button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;