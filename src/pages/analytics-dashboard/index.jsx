import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import ProductivityChart from './components/ProductivityChart';
import TeamPerformanceTable from './components/TeamPerformanceTable';
import DepartmentOverview from './components/DepartmentOverview';
import TrendAnalysis from './components/TrendAnalysis';
import FilterPanel from './components/FilterPanel';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AnalyticsDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock data for metrics cards
  const metricsData = [
  {
    title: "Overall Productivity",
    value: "87.5%",
    change: "+12.3%",
    changeType: "positive",
    icon: "TrendingUp",
    description: "Average team productivity score",
    trend: [45, 52, 48, 61, 70, 65, 78, 85, 87]
  },
  {
    title: "Task Completion Rate",
    value: "94.2%",
    change: "+5.7%",
    changeType: "positive",
    icon: "CheckCircle",
    description: "Tasks completed on time",
    trend: [88, 89, 91, 90, 92, 93, 94, 94, 94]
  },
  {
    title: "Average Response Time",
    value: "2.4h",
    change: "-18.5%",
    changeType: "positive",
    icon: "Clock",
    description: "Time to respond to assignments",
    trend: [65, 62, 58, 55, 52, 48, 45, 42, 40]
  },
  {
    title: "Team Efficiency",
    value: "91.8%",
    change: "+8.2%",
    changeType: "positive",
    icon: "Zap",
    description: "Resource utilization efficiency",
    trend: [75, 78, 82, 85, 87, 89, 90, 91, 92]
  },
  {
    title: "Quality Score",
    value: "96.1%",
    change: "+2.1%",
    changeType: "positive",
    icon: "Award",
    description: "Work quality assessment",
    trend: [92, 93, 94, 95, 95, 96, 96, 96, 96]
  },
  {
    title: "Active Projects",
    value: "47",
    change: "+3",
    changeType: "positive",
    icon: "FolderOpen",
    description: "Currently active projects",
    trend: [40, 42, 44, 45, 46, 47, 47, 47, 47]
  }];


  // Mock data for productivity chart
  const productivityChartData = [
  { name: 'Engineering', completed: 145, pending: 23, overdue: 5 },
  { name: 'Marketing', completed: 89, pending: 15, overdue: 3 },
  { name: 'Sales', completed: 112, pending: 18, overdue: 7 },
  { name: 'HR', completed: 67, pending: 12, overdue: 2 },
  { name: 'Finance', completed: 78, pending: 9, overdue: 1 },
  { name: 'Operations', completed: 95, pending: 14, overdue: 4 }];


  // Mock data for team performance table
  const teamPerformanceData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Developer",
    avatar: "https://images.unsplash.com/photo-1637562772116-e01cda44fce8",
    avatarAlt: "Professional headshot of woman with shoulder-length brown hair in navy blazer",
    completionRate: 96,
    tasksCompleted: 47,
    avgResponseTime: "1.2h",
    productivity: 94,
    productivityTrend: "up"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Project Manager",
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: "Professional headshot of Asian man with short black hair in gray suit",
    completionRate: 92,
    tasksCompleted: 38,
    avgResponseTime: "2.1h",
    productivity: 89,
    productivityTrend: "up"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Specialist",
    avatar: "https://images.unsplash.com/photo-1719515862094-c6e9354ee7f8",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair in white blouse",
    completionRate: 88,
    tasksCompleted: 42,
    avgResponseTime: "1.8h",
    productivity: 91,
    productivityTrend: "up"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Sales Representative",
    avatar: "https://images.unsplash.com/photo-1667575949231-fbf430640797",
    avatarAlt: "Professional headshot of Caucasian man with beard in dark blue shirt",
    completionRate: 85,
    tasksCompleted: 35,
    avgResponseTime: "3.2h",
    productivity: 82,
    productivityTrend: "down"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1700561791890-a15d45b9c79d",
    avatarAlt: "Professional headshot of Asian woman with short black hair in light blue top",
    completionRate: 94,
    tasksCompleted: 29,
    avgResponseTime: "1.5h",
    productivity: 93,
    productivityTrend: "up"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Operations Manager",
    avatar: "https://images.unsplash.com/photo-1724118135481-50436d913231",
    avatarAlt: "Professional headshot of African American man with short hair in white dress shirt",
    completionRate: 90,
    tasksCompleted: 41,
    avgResponseTime: "2.4h",
    productivity: 87,
    productivityTrend: "up"
  }];


  // Mock data for department overview
  const departmentData = [
  { name: 'Engineering', value: 173, completionRate: 94, members: 12 },
  { name: 'Marketing', value: 107, completionRate: 89, members: 8 },
  { name: 'Sales', value: 137, completionRate: 91, members: 15 },
  { name: 'HR', value: 81, completionRate: 96, members: 5 },
  { name: 'Finance', value: 88, completionRate: 98, members: 6 },
  { name: 'Operations', value: 113, completionRate: 87, members: 9 }];


  // Mock data for trend analysis
  const trendData = {
    '7d': [
    { date: 'Oct 15', productivity: 85, completion: 92, efficiency: 88, quality: 94 },
    { date: 'Oct 16', productivity: 87, completion: 94, efficiency: 89, quality: 95 },
    { date: 'Oct 17', productivity: 86, completion: 91, efficiency: 87, quality: 93 },
    { date: 'Oct 18', productivity: 89, completion: 95, efficiency: 91, quality: 96 },
    { date: 'Oct 19', productivity: 88, completion: 93, efficiency: 90, quality: 95 },
    { date: 'Oct 20', productivity: 90, completion: 96, efficiency: 92, quality: 97 },
    { date: 'Oct 21', productivity: 92, completion: 97, efficiency: 94, quality: 96 }],

    '30d': [
    { date: 'Sep 22', productivity: 78, completion: 85, efficiency: 82, quality: 89 },
    { date: 'Sep 29', productivity: 82, completion: 88, efficiency: 85, quality: 91 },
    { date: 'Oct 6', productivity: 85, completion: 91, efficiency: 87, quality: 93 },
    { date: 'Oct 13', productivity: 87, completion: 93, efficiency: 89, quality: 94 },
    { date: 'Oct 20', productivity: 90, completion: 95, efficiency: 92, quality: 96 },
    { date: 'Oct 21', productivity: 92, completion: 97, efficiency: 94, quality: 96 }]

  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setRefreshing(false);
  };

  const handleFiltersChange = (filters) => {
    console.log('Filters changed:', filters);
    // Apply filters to data
  };

  const handleExportReport = () => {
    console.log('Exporting comprehensive analytics report...');
    // Implement export functionality
  };

  useEffect(() => {
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`pt-16 transition-all duration-300 ${
      sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`
      }>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Performance metrics, completion rates, and productivity insights
              </p>
              <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                loading={refreshing}
                iconName="RefreshCw"
                disabled={refreshing}>

                {refreshing ? 'Refreshing...' : 'Refresh Data'}
              </Button>
              <Button
                variant="default"
                onClick={handleExportReport}
                iconName="Download">

                Export Report
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            onFiltersChange={handleFiltersChange}
            isOpen={filtersOpen}
            onToggle={() => setFiltersOpen(!filtersOpen)} />


          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metricsData?.map((metric, index) =>
            <MetricsCard key={index} {...metric} />
            )}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ProductivityChart
              data={productivityChartData}
              title="Department Task Distribution"
              height={350} />

            <DepartmentOverview
              data={departmentData}
              title="Department Performance Overview" />

          </div>

          {/* Trend Analysis */}
          <TrendAnalysis
            data={trendData}
            title="Performance Trends & Insights" />


          {/* Team Performance Table */}
          <TeamPerformanceTable
            data={teamPerformanceData}
            title="Individual Team Performance" />


          {/* Additional Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Target" size={20} className="text-success" />
                <h3 className="text-lg font-semibold text-foreground">Goal Achievement</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quarterly Target</span>
                  <span className="text-sm font-medium text-foreground">87% Complete</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  On track to exceed quarterly productivity goals by 12%.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Users" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Team Health</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Members</span>
                  <span className="text-sm font-medium text-foreground">55/58</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Workload</span>
                  <span className="text-sm font-medium text-foreground">78%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Team capacity is well-balanced with optimal workload distribution.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="AlertCircle" size={20} className="text-warning" />
                <h3 className="text-lg font-semibold text-foreground">Action Items</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-error rounded-full"></div>
                  <span className="text-muted-foreground">3 overdue tasks require attention</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-muted-foreground">2 team members need performance review</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">5 projects ready for next phase</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} TaskFlow Pro. Analytics data refreshed every 5 minutes.
            </p>
          </div>
        </div>
      </main>
    </div>);

};

export default AnalyticsDashboard;