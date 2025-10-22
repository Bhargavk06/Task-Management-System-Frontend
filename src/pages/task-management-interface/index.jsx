import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import KanbanBoard from './components/KanbanBoard';
import CalendarView from './components/CalendarView';
import TaskModal from './components/TaskModal';
import BulkActions from './components/BulkActions';

const TaskManagementInterface = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('list');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    assignee: 'all',
    sortBy: 'dueDate',
    sortOrder: 'asc',
    quickFilter: ''
  });

  // Mock task data
  const [tasks, setTasks] = useState([
  {
    id: '1',
    title: 'Redesign User Dashboard Interface',
    description: `Complete overhaul of the main dashboard interface to improve user experience and accessibility.\nImplement new design system components and ensure mobile responsiveness across all screen sizes.`,
    priority: 'high',
    status: 'in-progress',
    assignee: {
      id: 'john-doe',
      name: 'John Doe',
      avatar: "https://images.unsplash.com/photo-1632779167037-db264220d449",
      avatarAlt: 'Professional headshot of man with short brown hair wearing navy blue suit jacket'
    },
    dueDate: '2025-10-25',
    estimatedHours: 24,
    progress: 65,
    tags: ['UI/UX', 'Frontend', 'Design System'],
    project: 'website-redesign',
    category: 'design',
    subtasks: [
    { id: 'st1', title: 'Create wireframes', completed: true },
    { id: 'st2', title: 'Design mockups', completed: true },
    { id: 'st3', title: 'Implement components', completed: false },
    { id: 'st4', title: 'Testing and refinement', completed: false }],

    attachments: [
    { name: 'dashboard-mockup.figma', size: '2.4 MB' },
    { name: 'design-specs.pdf', size: '1.8 MB' }],

    commentsCount: 8,
    createdAt: '2025-10-15T10:30:00Z',
    updatedAt: '2025-10-21T14:22:00Z'
  },
  {
    id: '2',
    title: 'Implement User Authentication System',
    description: `Develop secure authentication system with multi-factor authentication support.\nIntegrate with existing user management infrastructure and ensure compliance with security standards.`,
    priority: 'high',
    status: 'pending',
    assignee: {
      id: 'sarah-wilson',
      name: 'Sarah Wilson',
      avatar: "https://images.unsplash.com/photo-1728139877871-91d024a94f39",
      avatarAlt: 'Professional headshot of woman with shoulder-length blonde hair in white blouse'
    },
    dueDate: '2025-10-28',
    estimatedHours: 32,
    progress: 0,
    tags: ['Backend', 'Security', 'Authentication'],
    project: 'system-upgrade',
    category: 'development',
    subtasks: [
    { id: 'st5', title: 'Research authentication methods', completed: false },
    { id: 'st6', title: 'Design database schema', completed: false },
    { id: 'st7', title: 'Implement core auth logic', completed: false }],

    attachments: [
    { name: 'auth-requirements.docx', size: '856 KB' }],

    commentsCount: 3,
    createdAt: '2025-10-18T09:15:00Z',
    updatedAt: '2025-10-20T16:45:00Z'
  },
  {
    id: '3',
    title: 'Create Marketing Campaign Assets',
    description: `Design and develop comprehensive marketing materials for Q4 campaign launch.\nInclude social media graphics, email templates, and promotional banners for various platforms.`,
    priority: 'medium',
    status: 'completed',
    assignee: {
      id: 'mike-johnson',
      name: 'Mike Johnson',
      avatar: "https://images.unsplash.com/photo-1646324799589-4eaa88a9a82a",
      avatarAlt: 'Professional headshot of man with dark hair and beard wearing gray sweater'
    },
    dueDate: '2025-10-20',
    estimatedHours: 16,
    progress: 100,
    tags: ['Marketing', 'Design', 'Content'],
    project: 'marketing-campaign',
    category: 'marketing',
    subtasks: [
    { id: 'st8', title: 'Social media graphics', completed: true },
    { id: 'st9', title: 'Email templates', completed: true },
    { id: 'st10', title: 'Banner designs', completed: true }],

    attachments: [
    { name: 'campaign-assets.zip', size: '15.2 MB' },
    { name: 'brand-guidelines.pdf', size: '3.1 MB' }],

    commentsCount: 12,
    createdAt: '2025-10-10T11:20:00Z',
    updatedAt: '2025-10-20T17:30:00Z'
  },
  {
    id: '4',
    title: 'Database Performance Optimization',
    description: `Analyze and optimize database queries to improve application performance.\nImplement indexing strategies and query optimization techniques for better response times.`,
    priority: 'medium',
    status: 'in-progress',
    assignee: {
      id: 'emily-davis',
      name: 'Emily Davis',
      avatar: "https://images.unsplash.com/photo-1702089050621-62646a2b748f",
      avatarAlt: 'Professional headshot of woman with long brown hair wearing black blazer'
    },
    dueDate: '2025-11-05',
    estimatedHours: 20,
    progress: 40,
    tags: ['Database', 'Performance', 'Backend'],
    project: 'system-upgrade',
    category: 'development',
    subtasks: [
    { id: 'st11', title: 'Performance analysis', completed: true },
    { id: 'st12', title: 'Query optimization', completed: false },
    { id: 'st13', title: 'Index implementation', completed: false }],

    attachments: [
    { name: 'performance-report.xlsx', size: '2.7 MB' }],

    commentsCount: 5,
    createdAt: '2025-10-16T13:45:00Z',
    updatedAt: '2025-10-21T10:15:00Z'
  },
  {
    id: '5',
    title: 'Mobile App Testing Phase',
    description: `Comprehensive testing of mobile application across different devices and operating systems.\nDocument bugs and performance issues for development team resolution.`,
    priority: 'low',
    status: 'overdue',
    assignee: {
      id: 'alex-chen',
      name: 'Alex Chen',
      avatar: "https://images.unsplash.com/photo-1610909810013-7c52994a153e",
      avatarAlt: 'Professional headshot of Asian man with short black hair wearing white shirt'
    },
    dueDate: '2025-10-18',
    estimatedHours: 12,
    progress: 25,
    tags: ['Testing', 'Mobile', 'QA'],
    project: 'mobile-app',
    category: 'testing',
    subtasks: [
    { id: 'st14', title: 'iOS testing', completed: true },
    { id: 'st15', title: 'Android testing', completed: false },
    { id: 'st16', title: 'Bug documentation', completed: false }],

    attachments: [
    { name: 'test-cases.xlsx', size: '1.2 MB' }],

    commentsCount: 7,
    createdAt: '2025-10-12T08:30:00Z',
    updatedAt: '2025-10-19T15:20:00Z'
  },
  {
    id: '6',
    title: 'API Documentation Update',
    description: `Update comprehensive API documentation to reflect recent changes and new endpoints.\nEnsure all examples are current and include proper error handling documentation.`,
    priority: 'low',
    status: 'pending',
    assignee: null,
    dueDate: '2025-11-10',
    estimatedHours: 8,
    progress: 0,
    tags: ['Documentation', 'API', 'Technical Writing'],
    project: '',
    category: 'documentation',
    subtasks: [
    { id: 'st17', title: 'Review current documentation', completed: false },
    { id: 'st18', title: 'Update endpoint descriptions', completed: false },
    { id: 'st19', title: 'Add code examples', completed: false }],

    attachments: [],
    commentsCount: 1,
    createdAt: '2025-10-19T14:10:00Z',
    updatedAt: '2025-10-19T14:10:00Z'
  }]
  );

  // Filter and sort tasks
  const filteredTasks = tasks?.filter((task) => {
    // Search filter
    if (filters?.search && !task?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
    !task?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }

    // Status filter
    if (filters?.status !== 'all' && task?.status !== filters?.status) {
      return false;
    }

    // Priority filter
    if (filters?.priority !== 'all' && task?.priority !== filters?.priority) {
      return false;
    }

    // Assignee filter
    if (filters?.assignee !== 'all') {
      if (filters?.assignee === 'unassigned' && task?.assignee) {
        return false;
      }
      if (filters?.assignee !== 'unassigned' && (!task?.assignee || task?.assignee?.id !== filters?.assignee)) {
        return false;
      }
    }

    // Quick filters
    if (filters?.quickFilter) {
      const today = new Date()?.toDateString();
      const taskDueDate = new Date(task.dueDate)?.toDateString();

      switch (filters?.quickFilter) {
        case 'my-tasks':
          if (!task?.assignee || task?.assignee?.id !== 'john-doe') return false;
          break;
        case 'due-today':
          if (taskDueDate !== today) return false;
          break;
        case 'overdue':
          if (task?.status !== 'overdue' && new Date(task.dueDate) >= new Date()) return false;
          break;
        case 'high-priority':
          if (task?.priority !== 'high') return false;
          break;
        case 'unassigned':
          if (task?.assignee) return false;
          break;
      }
    }

    return true;
  })?.sort((a, b) => {
    let aValue, bValue;

    switch (filters?.sortBy) {
      case 'title':
        aValue = a?.title?.toLowerCase();
        bValue = b?.title?.toLowerCase();
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aValue = priorityOrder?.[a?.priority];
        bValue = priorityOrder?.[b?.priority];
        break;
      case 'status':
        aValue = a?.status;
        bValue = b?.status;
        break;
      case 'created':
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      case 'updated':
        aValue = new Date(a.updatedAt);
        bValue = new Date(b.updatedAt);
        break;
      default: // dueDate
        aValue = new Date(a.dueDate);
        bValue = new Date(b.dueDate);
    }

    if (filters?.sortOrder === 'desc') {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
  });

  // Calculate task counts
  const taskCounts = {
    total: tasks?.length,
    inProgress: tasks?.filter((t) => t?.status === 'in-progress')?.length,
    completed: tasks?.filter((t) => t?.status === 'completed')?.length,
    overdue: tasks?.filter((t) => t?.status === 'overdue' || new Date(t.dueDate) < new Date())?.length
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      priority: 'all',
      assignee: 'all',
      sortBy: 'dueDate',
      sortOrder: 'asc',
      quickFilter: ''
    });
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setModalMode('create');
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setModalMode('edit');
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (task) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks((prev) => prev?.filter((t) => t?.id !== task?.id));
      setSelectedTasks((prev) => prev?.filter((id) => id !== task?.id));
    }
  };

  const handleTaskSave = (taskData) => {
    if (modalMode === 'create') {
      setTasks((prev) => [...prev, taskData]);
    } else {
      setTasks((prev) => prev?.map((t) => t?.id === taskData?.id ? taskData : t));
    }
  };

  const handleTaskUpdate = (taskId, updates) => {
    setTasks((prev) => prev?.map((task) =>
    task?.id === taskId ? { ...task, ...updates, updatedAt: new Date()?.toISOString() } : task
    ));
  };

  const handleTaskStatusChange = (task) => {
    const statusOptions = ['pending', 'in-progress', 'completed', 'on-hold'];
    const currentIndex = statusOptions?.indexOf(task?.status);
    const nextStatus = statusOptions?.[(currentIndex + 1) % statusOptions?.length];

    handleTaskUpdate(task?.id, { status: nextStatus });
  };

  const handleTaskAssign = (task) => {
    // Mock assignment - in real app, this would open an assignment modal
    const assignees = ['john-doe', 'sarah-wilson', 'mike-johnson', 'emily-davis'];
    const randomAssignee = assignees?.[Math.floor(Math.random() * assignees?.length)];

    const assigneeData = {
      'john-doe': { id: 'john-doe', name: 'John Doe', avatar: "https://images.unsplash.com/photo-1632779167037-db264220d449", avatarAlt: 'Professional headshot of man with short brown hair wearing navy blue suit jacket' },
      'sarah-wilson': { id: 'sarah-wilson', name: 'Sarah Wilson', avatar: "https://images.unsplash.com/photo-1728139877871-91d024a94f39", avatarAlt: 'Professional headshot of woman with shoulder-length blonde hair in white blouse' },
      'mike-johnson': { id: 'mike-johnson', name: 'Mike Johnson', avatar: "https://images.unsplash.com/photo-1646324799589-4eaa88a9a82a", avatarAlt: 'Professional headshot of man with dark hair and beard wearing gray sweater' },
      'emily-davis': { id: 'emily-davis', name: 'Emily Davis', avatar: "https://images.unsplash.com/photo-1702089050621-62646a2b748f", avatarAlt: 'Professional headshot of woman with long brown hair wearing black blazer' }
    };

    handleTaskUpdate(task?.id, { assignee: assigneeData?.[randomAssignee] });
  };

  const handleBulkAction = (action, taskIds, value) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${taskIds?.length} tasks?`)) {
          setTasks((prev) => prev?.filter((t) => !taskIds?.includes(t?.id)));
          setSelectedTasks([]);
        }
        break;
      case 'updateStatus':
        if (value) {
          setTasks((prev) => prev?.map((task) =>
          taskIds?.includes(task?.id) ? { ...task, status: value, updatedAt: new Date()?.toISOString() } : task
          ));
          setSelectedTasks([]);
        }
        break;
      case 'updatePriority':
        if (value) {
          setTasks((prev) => prev?.map((task) =>
          taskIds?.includes(task?.id) ? { ...task, priority: value, updatedAt: new Date()?.toISOString() } : task
          ));
          setSelectedTasks([]);
        }
        break;
      default:
        console.log(`Bulk action: ${action}`, taskIds, value);
        setSelectedTasks([]);
    }
  };

  const handleTaskSelection = (taskId, isSelected) => {
    if (isSelected) {
      setSelectedTasks((prev) => [...prev, taskId]);
    } else {
      setSelectedTasks((prev) => prev?.filter((id) => id !== taskId));
    }
  };

  const renderTaskView = () => {
    switch (currentView) {
      case 'kanban':
        return (
          <KanbanBoard
            tasks={filteredTasks}
            onTaskUpdate={handleTaskUpdate}
            onTaskEdit={handleEditTask}
            onTaskDelete={handleDeleteTask}
            onTaskAssign={handleTaskAssign} />);


      case 'calendar':
        return (
          <CalendarView
            tasks={filteredTasks}
            onTaskEdit={handleEditTask}
            onTaskCreate={handleCreateTask} />);


      default:
        return (
          <TaskList
            tasks={filteredTasks}
            onTaskEdit={handleEditTask}
            onTaskDelete={handleDeleteTask}
            onTaskStatusChange={handleTaskStatusChange}
            onTaskAssign={handleTaskAssign} />);


    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
                <p className="text-gray-600 mt-1">
                  Manage and track tasks across your organization with intelligent workflow orchestration
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/analytics-dashboard')}
                  iconName="BarChart3"
                  iconPosition="left">

                  Analytics
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/team-overview')}
                  iconName="Users"
                  iconPosition="left">

                  Team View
                </Button>
                
                <Button
                  variant="default"
                  onClick={handleCreateTask}
                  iconName="Plus"
                  iconPosition="left">

                  New Task
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Task Filters */}
        <TaskFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onViewChange={setCurrentView}
          currentView={currentView}
          taskCounts={taskCounts} />


        {/* Task Content */}
        <div className="flex-1">
          {renderTaskView()}
        </div>

        {/* Task Modal */}
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          task={selectedTask}
          onSave={handleTaskSave}
          mode={modalMode} />


        {/* Bulk Actions */}
        <BulkActions
          selectedTasks={selectedTasks}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedTasks([])} />

      </div>
    </div>);

};

export default TaskManagementInterface;