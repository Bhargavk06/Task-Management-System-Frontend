import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      section: 'Main',
      items: [
        { path: '/dashboard-role-specific', label: 'Dashboard', icon: 'LayoutDashboard', description: 'Overview & insights' },
        { path: '/task-management-interface', label: 'Task Management', icon: 'CheckSquare', description: 'Create & track tasks' },
        { path: '/team-overview', label: 'Team Overview', icon: 'Users', description: 'Team collaboration' },
        { path: '/notifications-center', label: 'Notifications', icon: 'Bell', description: 'Updates & alerts' },
      ]
    },
    {
      section: 'Administration',
      items: [
        { path: '/user-management-portal', label: 'User Management', icon: 'UserCog', description: 'Manage users & roles' },
        { path: '/analytics-dashboard', label: 'Analytics', icon: 'BarChart3', description: 'Performance metrics' },
      ]
    }
  ];

  const quickActions = [
    { label: 'New Task', icon: 'Plus', action: 'create-task' },
    { label: 'New Project', icon: 'FolderPlus', action: 'create-project' },
    { label: 'Invite User', icon: 'UserPlus', action: 'invite-user' },
  ];

  const isActiveRoute = (path) => location?.pathname === path;
  const showExpanded = !isCollapsed || isHovered;

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-16 bottom-0 z-sidebar bg-card border-r border-border transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } lg:fixed`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {showExpanded && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-brand rounded flex items-center justify-center">
                  <Icon name="Workflow" size={14} color="white" />
                </div>
                <span className="font-brand-value text-sm text-foreground">Workspace</span>
              </div>
            )}
            
            {onToggleCollapse && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className={`${!showExpanded ? 'w-full justify-center' : ''}`}
              >
                <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
              </Button>
            )}
          </div>

          {/* Quick Actions */}
          {showExpanded && (
            <div className="p-4 border-b border-border">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {quickActions?.map((action) => (
                  <Button
                    key={action?.action}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action?.action)}
                    className="w-full justify-start"
                  >
                    <Icon name={action?.icon} size={14} className="mr-2" />
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {navigationItems?.map((section) => (
                <div key={section?.section}>
                  {showExpanded && (
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                      {section?.section}
                    </h3>
                  )}
                  
                  <div className="space-y-1">
                    {section?.items?.map((item) => (
                      <Link
                        key={item?.path}
                        to={item?.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group ${
                          isActiveRoute(item?.path)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        } ${!showExpanded ? 'justify-center' : ''}`}
                        title={!showExpanded ? item?.label : ''}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={18} 
                          className={`${!showExpanded ? 'mx-auto' : ''}`}
                        />
                        
                        {showExpanded && (
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{item?.label}</div>
                            <div className={`text-xs ${
                              isActiveRoute(item?.path) 
                                ? 'text-primary-foreground/70' 
                                : 'text-muted-foreground'
                            }`}>
                              {item?.description}
                            </div>
                          </div>
                        )}

                        {showExpanded && isActiveRoute(item?.path) && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {showExpanded ? (
              <div className="space-y-3">
                {/* User Profile */}
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">John Doe</div>
                    <div className="text-xs text-muted-foreground">Administrator</div>
                  </div>
                </div>

                {/* Settings & Help */}
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Icon name="Settings" size={14} className="mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Icon name="HelpCircle" size={14} className="mr-2" />
                    Help
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-center" title="Settings">
                  <Icon name="Settings" size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-center" title="Help">
                  <Icon name="HelpCircle" size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Sidebar backdrop for mobile */}
      <div className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30" />
    </>
  );
};

export default Sidebar;