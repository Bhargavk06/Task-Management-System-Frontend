import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import OrganizationChart from './components/OrganizationChart';
import WorkloadHeatmap from './components/WorkloadHeatmap';
import TeamPerformanceDashboard from './components/TeamPerformanceDashboard';
import ResourceAllocationView from './components/ResourceAllocationView';
import CollaborativeWorkspaceIndicators from './components/CollaborativeWorkspaceIndicators';

const TeamOverview = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  // Mock organization data
  const organizationData = [
  {
    id: "admin",
    name: "Sarah Johnson",
    role: "Admin",
    department: "Executive",
    avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    avatarAlt: "Professional woman with shoulder-length brown hair in navy blazer smiling at camera",
    status: "online",
    activeTasks: 12,
    workloadPercentage: 85,
    subordinates: [
    {
      id: "manager1",
      name: "Michael Chen",
      role: "Manager",
      department: "Engineering",
      avatar: "https://images.unsplash.com/photo-1597945310606-a54b1774e175",
      avatarAlt: "Asian man with short black hair in white dress shirt and dark suit jacket",
      status: "online",
      activeTasks: 8,
      workloadPercentage: 92,
      subordinates: [
      {
        id: "emp1",
        name: "Alex Rodriguez",
        role: "Employee",
        department: "Frontend Dev",
        avatar: "https://images.unsplash.com/photo-1623967484275-7d59e4b9f151",
        avatarAlt: "Hispanic man with beard wearing casual blue shirt outdoors",
        status: "away",
        activeTasks: 5,
        workloadPercentage: 78,
        subordinates: []
      },
      {
        id: "emp2",
        name: "Emma Wilson",
        role: "Employee",
        department: "Backend Dev",
        avatar: "https://images.unsplash.com/photo-1577922088150-fbf0b918be6a",
        avatarAlt: "Young woman with long blonde hair in professional white blouse",
        status: "online",
        activeTasks: 7,
        workloadPercentage: 88,
        subordinates: []
      }]

    },
    {
      id: "manager2",
      name: "Lisa Thompson",
      role: "Manager",
      department: "Marketing",
      avatar: "https://images.unsplash.com/photo-1701599156449-df047a5b314f",
      avatarAlt: "Professional woman with curly hair in dark business suit",
      status: "online",
      activeTasks: 6,
      workloadPercentage: 75,
      subordinates: [
      {
        id: "emp3",
        name: "David Kim",
        role: "Employee",
        department: "Content Marketing",
        avatar: "https://images.unsplash.com/photo-1571335272625-c06041f68736",
        avatarAlt: "Asian man with glasses in casual gray sweater smiling",
        status: "offline",
        activeTasks: 4,
        workloadPercentage: 65,
        subordinates: []
      }]

    }]

  }];


  // Mock heatmap data
  const heatmapData = {
    departments: [
    {
      id: "eng",
      name: "Engineering",
      members: 12,
      averageLoad: 84,
      workloadGrid: [
      { name: "Alex R.", percentage: 78 },
      { name: "Emma W.", percentage: 88 },
      { name: "John D.", percentage: 92 },
      { name: "Sarah M.", percentage: 76 },
      { name: "Mike L.", percentage: 85 },
      { name: "Anna K.", percentage: 79 },
      { name: "Tom B.", percentage: 91 },
      { name: "Lisa C.", percentage: 82 }]

    },
    {
      id: "marketing",
      name: "Marketing",
      members: 8,
      averageLoad: 72,
      workloadGrid: [
      { name: "David K.", percentage: 65 },
      { name: "Rachel P.", percentage: 78 },
      { name: "Mark S.", percentage: 71 },
      { name: "Jenny L.", percentage: 74 }]

    },
    {
      id: "sales",
      name: "Sales",
      members: 10,
      averageLoad: 89,
      workloadGrid: [
      { name: "Chris W.", percentage: 95 },
      { name: "Amy T.", percentage: 87 },
      { name: "Robert J.", percentage: 92 },
      { name: "Nina S.", percentage: 84 }]

    }],

    individuals: [
    {
      id: "alex",
      name: "Alex Rodriguez",
      role: "Frontend Developer",
      currentLoad: 78,
      activeTasks: 5,
      capacity: 40,
      weeklyLoad: [
      { percentage: 75 },
      { percentage: 80 },
      { percentage: 85 },
      { percentage: 78 },
      { percentage: 72 },
      { percentage: 45 },
      { percentage: 20 }]

    },
    {
      id: "emma",
      name: "Emma Wilson",
      role: "Backend Developer",
      currentLoad: 88,
      activeTasks: 7,
      capacity: 40,
      weeklyLoad: [
      { percentage: 85 },
      { percentage: 90 },
      { percentage: 88 },
      { percentage: 92 },
      { percentage: 87 },
      { percentage: 50 },
      { percentage: 25 }]

    }],

    skills: [
    {
      id: "frontend",
      name: "Frontend Development",
      totalExperts: 8,
      skills: [
      {
        id: "react",
        name: "React.js",
        available: 6,
        total: 8,
        demand: "high",
        utilization: 75,
        experts: [
        { name: "Alex R.", availability: "available" },
        { name: "Emma W.", availability: "busy" },
        { name: "John D.", availability: "available" }]

      },
      {
        id: "vue",
        name: "Vue.js",
        available: 3,
        total: 5,
        demand: "medium",
        utilization: 60,
        experts: [
        { name: "Sarah M.", availability: "available" },
        { name: "Mike L.", availability: "busy" }]

      }]

    }]

  };

  // Mock performance data
  const performanceData = {
    summary: [
    {
      id: "completion",
      label: "Task Completion Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: "CheckCircle"
    },
    {
      id: "efficiency",
      label: "Team Efficiency",
      value: "87.5%",
      change: "+5.3%",
      trend: "up",
      icon: "Zap"
    },
    {
      id: "collaboration",
      label: "Collaboration Score",
      value: "8.9/10",
      change: "+0.4",
      trend: "up",
      icon: "Users"
    },
    {
      id: "satisfaction",
      label: "Team Satisfaction",
      value: "4.6/5",
      change: "-0.1",
      trend: "down",
      icon: "Heart"
    }],

    metrics: {
      completion: {
        description: "Tasks completed vs assigned over time",
        chartData: [
        { name: "Engineering", completed: 45, pending: 8 },
        { name: "Marketing", completed: 32, pending: 5 },
        { name: "Sales", completed: 28, pending: 12 },
        { name: "Support", completed: 38, pending: 7 }]

      },
      efficiency: {
        description: "Team productivity trends",
        chartData: [
        { date: "Week 1", efficiency: 82 },
        { date: "Week 2", efficiency: 85 },
        { date: "Week 3", efficiency: 87 },
        { date: "Week 4", efficiency: 89 }]

      },
      collaboration: {
        description: "Cross-team interaction metrics",
        chartData: [
        { name: "High Collaboration", value: 45 },
        { name: "Medium Collaboration", value: 35 },
        { name: "Low Collaboration", value: 20 }]

      },
      quality: {
        description: "Work quality assessment",
        chartData: [
        { name: "Excellent", value: 40 },
        { name: "Good", value: 35 },
        { name: "Average", value: 20 },
        { name: "Needs Improvement", value: 5 }]

      }
    },
    topPerformers: [
    {
      id: "emma",
      name: "Emma Wilson",
      department: "Engineering",
      score: 96
    },
    {
      id: "chris",
      name: "Chris Wang",
      department: "Sales",
      score: 94
    },
    {
      id: "rachel",
      name: "Rachel Park",
      department: "Marketing",
      score: 92
    }],

    departmentComparison: [
    { id: "eng", name: "Engineering", score: 92 },
    { id: "sales", name: "Sales", score: 89 },
    { id: "marketing", name: "Marketing", score: 85 },
    { id: "support", name: "Support", score: 88 }]

  };

  // Mock allocation data
  const allocationData = {
    resources: [
    {
      id: "alex",
      name: "Alex Rodriguez",
      role: "Frontend Developer",
      department: "Engineering",
      avatar: "https://images.unsplash.com/photo-1623967484275-7d59e4b9f151",
      avatarAlt: "Hispanic man with beard wearing casual blue shirt outdoors",
      currentCapacity: 78,
      maxCapacity: 40,
      activeProjects: 3,
      pendingTasks: 5,
      hoursPerWeek: 31,
      upcomingDeadlines: [
      { project: "Mobile App", date: "Oct 25" },
      { project: "Dashboard", date: "Oct 28" }]

    },
    {
      id: "emma",
      name: "Emma Wilson",
      role: "Backend Developer",
      department: "Engineering",
      avatar: "https://images.unsplash.com/photo-1577922088150-fbf0b918be6a",
      avatarAlt: "Young woman with long blonde hair in professional white blouse",
      currentCapacity: 95,
      maxCapacity: 40,
      activeProjects: 4,
      pendingTasks: 8,
      hoursPerWeek: 38,
      upcomingDeadlines: [
      { project: "API Integration", date: "Oct 23" },
      { project: "Database Migration", date: "Oct 30" }]

    }],

    skillGroups: [
    {
      id: "frontend",
      name: "Frontend Development",
      skills: [
      {
        id: "react",
        name: "React.js",
        available: 6,
        total: 8,
        demand: "high",
        experts: [
        { name: "Alex R.", availability: "available" },
        { name: "Emma W.", availability: "busy" }]

      }]

    }],

    projects: [
    {
      id: "mobile-app",
      name: "Mobile Application",
      description: "Cross-platform mobile app development",
      status: "on-track",
      deadline: "Nov 15, 2024",
      teamSize: 6,
      progress: 68,
      hoursAllocated: 240,
      resourceUtilization: 85,
      teamMembers: [
      {
        avatar: "https://images.unsplash.com/photo-1623967484275-7d59e4b9f151",
        avatarAlt: "Hispanic man with beard wearing casual blue shirt outdoors"
      },
      {
        avatar: "https://images.unsplash.com/photo-1577922088150-fbf0b918be6a",
        avatarAlt: "Young woman with long blonde hair in professional white blouse"
      }]

    }]

  };

  // Mock workspace data
  const workspaceData = {
    total: 12,
    active: 8,
    recent: 5,
    starred: 3,
    liveUsers: 24,
    workspaces: [
    {
      id: "mobile-dev",
      name: "Mobile Development Sprint",
      description: "Cross-platform mobile application development with React Native and backend API integration",
      isActive: true,
      isRecent: true,
      isStarred: true,
      activityLevel: "high",
      progress: 68,
      lastActivity: "2 min ago",
      currentFocus: "API Integration Testing",
      participants: [
      {
        avatar: "https://images.unsplash.com/photo-1623967484275-7d59e4b9f151",
        avatarAlt: "Hispanic man with beard wearing casual blue shirt outdoors",
        status: "online"
      },
      {
        avatar: "https://images.unsplash.com/photo-1577922088150-fbf0b918be6a",
        avatarAlt: "Young woman with long blonde hair in professional white blouse",
        status: "online"
      }],

      toggleStar: (id) => console.log(`Toggle star for ${id}`)
    },
    {
      id: "marketing-campaign",
      name: "Q4 Marketing Campaign",
      description: "Strategic marketing initiatives for product launch and brand awareness campaigns",
      isActive: false,
      isRecent: true,
      isStarred: false,
      activityLevel: "medium",
      progress: 45,
      lastActivity: "1 hour ago",
      currentFocus: "Content Creation",
      participants: [
      {
        avatar: "https://images.unsplash.com/photo-1701599156449-df047a5b314f",
        avatarAlt: "Professional woman with curly hair in dark business suit",
        status: "away"
      }],

      toggleStar: (id) => console.log(`Toggle star for ${id}`)
    }],

    liveActivity: [
    {
      id: "activity1",
      user: {
        avatar: "https://images.unsplash.com/photo-1623967484275-7d59e4b9f151",
        avatarAlt: "Hispanic man with beard wearing casual blue shirt outdoors",
        name: "Alex Rodriguez"
      },
      status: "active",
      action: "Reviewing code in mobile-dev workspace",
      workspace: "Mobile Development",
      timestamp: "Just now"
    },
    {
      id: "activity2",
      user: {
        avatar: "https://images.unsplash.com/photo-1577922088150-fbf0b918be6a",
        avatarAlt: "Young woman with long blonde hair in professional white blouse",
        name: "Emma Wilson"
      },
      status: "meeting",
      action: "In standup meeting discussion",
      workspace: "Engineering Sync",
      timestamp: "5 min ago"
    },
    {
      id: "activity3",
      user: {
        avatar: "https://images.unsplash.com/photo-1701599156449-df047a5b314f",
        avatarAlt: "Professional woman with curly hair in dark business suit",
        name: "Lisa Thompson"
      },
      status: "focus",
      action: "Deep work on campaign strategy",
      workspace: "Marketing Campaign",
      timestamp: "12 min ago"
    }]

  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
  };

  const handleCellClick = (cell) => {
    console.log('Heatmap cell clicked:', cell);
  };

  const handleResourceReassign = (resource) => {
    console.log('Reassign resource:', resource);
  };

  const handleSkillMatch = (skillGroup) => {
    console.log('Auto-match skills:', skillGroup);
  };

  const handleJoinWorkspace = (workspace) => {
    console.log('Join workspace:', workspace);
  };

  const handleCreateWorkspace = () => {
    console.log('Create new workspace');
  };

  useEffect(() => {
    // Auto-refresh data every 30 seconds
    const interval = setInterval(() => {
      console.log('Auto-refreshing team data...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Team Overview - TaskFlow Pro</title>
        <meta name="description" content="Comprehensive organizational hierarchy visualization with task distribution, workload balancing, and team performance analytics for enterprise task management." />
      </Helmet>

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Team Overview</h1>
                <p className="text-muted-foreground">
                  Organizational hierarchy with task distribution and performance insights
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={refreshing}>

                  <Icon
                    name="RefreshCw"
                    size={14}
                    className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />

                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                
                <Button variant="default" size="sm">
                  <Icon name="Download" size={14} className="mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Team Members</p>
                    <p className="text-2xl font-bold text-foreground">42</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  <Icon name="TrendingUp" size={12} className="inline mr-1" />
                  +3 this month
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                    <p className="text-2xl font-bold text-foreground">18</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="FolderOpen" size={24} className="text-green-600" />
                  </div>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  <Icon name="TrendingUp" size={12} className="inline mr-1" />
                  +2 this week
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Workload</p>
                    <p className="text-2xl font-bold text-foreground">84%</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Icon name="BarChart3" size={24} className="text-yellow-600" />
                  </div>
                </div>
                <div className="mt-2 text-sm text-yellow-600">
                  <Icon name="AlertTriangle" size={12} className="inline mr-1" />
                  Near capacity
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                    <p className="text-2xl font-bold text-foreground">94.2%</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={24} className="text-emerald-600" />
                  </div>
                </div>
                <div className="mt-2 text-sm text-green-600">
                  <Icon name="TrendingUp" size={12} className="inline mr-1" />
                  +2.1% vs last month
                </div>
              </div>
            </div>

            {/* Organization Chart */}
            <OrganizationChart
              organizationData={organizationData}
              onMemberSelect={handleMemberSelect}
              selectedMember={selectedMember} />


            {/* Workload Heatmap */}
            <WorkloadHeatmap
              heatmapData={heatmapData}
              onCellClick={handleCellClick} />


            {/* Performance Dashboard */}
            <TeamPerformanceDashboard
              performanceData={performanceData}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange} />


            {/* Resource Allocation */}
            <ResourceAllocationView
              allocationData={allocationData}
              onResourceReassign={handleResourceReassign}
              onSkillMatch={handleSkillMatch} />


            {/* Collaborative Workspaces */}
            <CollaborativeWorkspaceIndicators
              workspaceData={workspaceData}
              onJoinWorkspace={handleJoinWorkspace}
              onCreateWorkspace={handleCreateWorkspace} />

          </div>
        </main>
      </div>
    </>);

};

export default TeamOverview;