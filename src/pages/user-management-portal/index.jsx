import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserCard from './components/UserCard';
import UserFilters from './components/UserFilters';
import BulkActions from './components/BulkActions';
import AddUserModal from './components/AddUserModal';
import UserStatsCards from './components/UserStatsCards';
import PermissionMatrix from './components/PermissionMatrix';

const UserManagementPortal = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isPermissionMatrixOpen, setIsPermissionMatrixOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);

  // Mock user data
  const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@taskflow.com",
    avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    avatarAlt: "Professional headshot of woman with brown hair in navy blazer smiling at camera",
    role: "admin",
    department: "engineering",
    status: "active",
    lastLogin: "2 hours ago",
    tasksAssigned: 15,
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@taskflow.com",
    avatar: "https://images.unsplash.com/photo-1625850902501-cc6baef3e3b2",
    avatarAlt: "Professional headshot of Asian man with black hair in white shirt smiling",
    role: "manager",
    department: "marketing",
    status: "active",
    lastLogin: "1 day ago",
    tasksAssigned: 23,
    joinDate: "2023-02-20"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@taskflow.com",
    avatar: "https://images.unsplash.com/photo-1654110951517-0307aed76b75",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair in blue blouse",
    role: "employee",
    department: "sales",
    status: "active",
    lastLogin: "3 hours ago",
    tasksAssigned: 8,
    joinDate: "2023-03-10"
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@taskflow.com",
    avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
    avatarAlt: "Professional headshot of man with beard in gray suit jacket",
    role: "manager",
    department: "operations",
    status: "inactive",
    lastLogin: "1 week ago",
    tasksAssigned: 12,
    joinDate: "2023-01-25"
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@taskflow.com",
    avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
    avatarAlt: "Professional headshot of Asian woman with short black hair in white blazer",
    role: "employee",
    department: "hr",
    status: "active",
    lastLogin: "5 hours ago",
    tasksAssigned: 6,
    joinDate: "2023-04-05"
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.wilson@taskflow.com",
    avatar: "https://images.unsplash.com/photo-1734456611474-13245d164868",
    avatarAlt: "Professional headshot of man with brown hair in navy suit smiling",
    role: "viewer",
    department: "finance",
    status: "active",
    lastLogin: "2 days ago",
    tasksAssigned: 3,
    joinDate: "2023-05-12"
  }];


  const userStats = {
    totalUsers: 156,
    activeUsers: 142,
    adminUsers: 8,
    pendingInvites: 12
  };

  useEffect(() => {
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered?.filter((user) =>
      user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered?.filter((user) => user?.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered?.filter((user) => user?.status === statusFilter);
    }

    if (departmentFilter !== 'all') {
      filtered = filtered?.filter((user) => user?.department === departmentFilter);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, searchTerm, roleFilter, statusFilter, departmentFilter]);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleUpdateRole = async (userId, newRole) => {
    setUsers((prev) => prev?.map((user) =>
    user?.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleToggleStatus = async (userId) => {
    setUsers((prev) => prev?.map((user) =>
    user?.id === userId ?
    { ...user, status: user?.status === 'active' ? 'inactive' : 'active' } :
    user
    ));
  };

  const handleViewDetails = (userId) => {
    console.log('View details for user:', userId);
  };

  const handleAddUser = async (userData) => {
    const newUser = {
      id: users?.length + 1,
      ...userData,
      avatar: "https://images.unsplash.com/photo-1604536264507-020ce894daf1",
      avatarAlt: "Default user avatar placeholder image",
      status: "active",
      lastLogin: "Never",
      tasksAssigned: 0,
      joinDate: new Date()?.toISOString()?.split('T')?.[0]
    };

    setUsers((prev) => [...prev, newUser]);
  };

  const handleBulkRoleUpdate = async (userIds, newRole) => {
    setUsers((prev) => prev?.map((user) =>
    userIds?.includes(user?.id) ? { ...user, role: newRole } : user
    ));
    setSelectedUsers([]);
  };

  const handleBulkStatusUpdate = async (userIds, newStatus) => {
    setUsers((prev) => prev?.map((user) =>
    userIds?.includes(user?.id) ? { ...user, status: newStatus } : user
    ));
    setSelectedUsers([]);
  };

  const handleBulkDelete = async (userIds) => {
    setUsers((prev) => prev?.filter((user) => !userIds?.includes(user?.id)));
    setSelectedUsers([]);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setStatusFilter('all');
    setDepartmentFilter('all');
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
    prev?.includes(userId) ?
    prev?.filter((id) => id !== userId) :
    [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    const currentPageUsers = getCurrentPageUsers();
    const allSelected = currentPageUsers?.every((user) => selectedUsers?.includes(user?.id));

    if (allSelected) {
      setSelectedUsers((prev) => prev?.filter((id) => !currentPageUsers?.map((u) => u?.id)?.includes(id)));
    } else {
      setSelectedUsers((prev) => [...new Set([...prev, ...currentPageUsers.map((u) => u.id)])]);
    }
  };

  const handleSavePermissions = (permissions) => {
    console.log('Saving permissions:', permissions);
  };

  const getCurrentPageUsers = () => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  };

  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);
  const currentPageUsers = getCurrentPageUsers();

  return (
    <>
      <Helmet>
        <title>User Management Portal - TaskFlow Pro</title>
        <meta name="description" content="Admin-controlled user roles, permissions, and organizational hierarchy setup interface for TaskFlow Pro enterprise task management platform." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={handleToggleSidebar} />
        
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-brand-headline text-foreground mb-2">
                  User Management Portal
                </h1>
                <p className="text-muted-foreground">
                  Manage users, roles, permissions, and organizational hierarchy
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsPermissionMatrixOpen(true)}>

                  <Icon name="Shield" size={16} className="mr-2" />
                  Permissions
                </Button>
                
                <Button onClick={() => setIsAddUserModalOpen(true)}>
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            {/* User Statistics */}
            <UserStatsCards stats={userStats} />

            {/* Filters */}
            <UserFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              roleFilter={roleFilter}
              onRoleFilterChange={setRoleFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              departmentFilter={departmentFilter}
              onDepartmentFilterChange={setDepartmentFilter}
              onClearFilters={handleClearFilters} />


            {/* Bulk Actions */}
            <BulkActions
              selectedUsers={selectedUsers}
              onBulkRoleUpdate={handleBulkRoleUpdate}
              onBulkStatusUpdate={handleBulkStatusUpdate}
              onBulkDelete={handleBulkDelete}
              onClearSelection={() => setSelectedUsers([])} />


            {/* Users List Header */}
            <div className="bg-card border border-border rounded-lg mb-6">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentPageUsers?.length > 0 && currentPageUsers?.every((user) => selectedUsers?.includes(user?.id))}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2" />

                    <span className="text-sm text-muted-foreground">
                      Select All ({currentPageUsers?.length})
                    </span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Showing {currentPageUsers?.length} of {filteredUsers?.length} users
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}>

                    <Icon name="ChevronLeft" size={16} />
                  </Button>
                  
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}>

                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>
              </div>

              {/* Users Grid */}
              <div className="p-6">
                {currentPageUsers?.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {currentPageUsers?.map((user) =>
                  <div key={user?.id} className="relative">
                        <div className="absolute top-4 left-4 z-10">
                          <input
                        type="checkbox"
                        checked={selectedUsers?.includes(user?.id)}
                        onChange={() => handleUserSelection(user?.id)}
                        className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2" />

                        </div>
                        
                        <UserCard
                      user={user}
                      onUpdateRole={handleUpdateRole}
                      onToggleStatus={handleToggleStatus}
                      onViewDetails={handleViewDetails} />

                      </div>
                  )}
                  </div> :

                <div className="text-center py-12">
                    <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' || departmentFilter !== 'all' ? 'Try adjusting your filters to see more results.' : 'Get started by adding your first user to the system.'
                    }
                    </p>
                    {!searchTerm && roleFilter === 'all' && statusFilter === 'all' && departmentFilter === 'all' &&
                  <Button onClick={() => setIsAddUserModalOpen(true)}>
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Add First User
                      </Button>
                  }
                  </div>
                }
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <AddUserModal
          isOpen={isAddUserModalOpen}
          onClose={() => setIsAddUserModalOpen(false)}
          onAddUser={handleAddUser} />


        <PermissionMatrix
          isOpen={isPermissionMatrixOpen}
          onClose={() => setIsPermissionMatrixOpen(false)}
          onSavePermissions={handleSavePermissions} />

      </div>
    </>);

};

export default UserManagementPortal;