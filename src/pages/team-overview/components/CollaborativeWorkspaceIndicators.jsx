import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CollaborativeWorkspaceIndicators = ({ workspaceData, onJoinWorkspace, onCreateWorkspace }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  const filterOptions = [
    { key: 'all', label: 'All Workspaces', count: workspaceData?.total },
    { key: 'active', label: 'Active', count: workspaceData?.active },
    { key: 'recent', label: 'Recent', count: workspaceData?.recent },
    { key: 'starred', label: 'Starred', count: workspaceData?.starred }
  ];

  const getActivityColor = (level) => {
    switch (level) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-gray-400';
      default: return 'bg-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'meeting': return 'text-blue-600 bg-blue-50';
      case 'focus': return 'text-purple-600 bg-purple-50';
      case 'break': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredWorkspaces = workspaceData?.workspaces?.filter(workspace => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return workspace?.isActive;
    if (activeFilter === 'recent') return workspace?.isRecent;
    if (activeFilter === 'starred') return workspace?.isStarred;
    return true;
  });

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredWorkspaces?.map((workspace) => (
        <div key={workspace?.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-moderate transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getActivityColor(workspace?.activityLevel)}`} />
              <h4 className="font-medium text-foreground truncate">{workspace?.name}</h4>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => workspace?.toggleStar(workspace?.id)}
                className="p-1"
              >
                <Icon 
                  name={workspace?.isStarred ? "Star" : "StarOff"} 
                  size={14} 
                  className={workspace?.isStarred ? "text-yellow-500" : "text-muted-foreground"}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-1"
              >
                <Icon name="MoreVertical" size={14} />
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {workspace?.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex -space-x-2">
              {workspace?.participants?.slice(0, 4)?.map((participant, index) => (
                <div key={index} className="relative">
                  <Image
                    src={participant?.avatar}
                    alt={participant?.avatarAlt}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${
                    participant?.status === 'online' ? 'bg-green-500' :
                    participant?.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                </div>
              ))}
              {workspace?.participants?.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-white flex items-center justify-center text-xs font-medium text-muted-foreground">
                  +{workspace?.participants?.length - 4}
                </div>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {workspace?.participants?.length} members
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">{workspace?.progress}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${workspace?.progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>{workspace?.lastActivity}</span>
            </div>
            
            <Button
              variant={workspace?.isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onJoinWorkspace(workspace)}
            >
              {workspace?.isActive ? "Continue" : "Join"}
            </Button>
          </div>

          {workspace?.currentFocus && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={12} className="text-primary" />
                <span className="text-xs text-muted-foreground">Current Focus:</span>
                <span className="text-xs font-medium text-foreground">{workspace?.currentFocus}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-3">
      {filteredWorkspaces?.map((workspace) => (
        <div key={workspace?.id} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className={`w-3 h-3 rounded-full ${getActivityColor(workspace?.activityLevel)}`} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground truncate">{workspace?.name}</h4>
                  {workspace?.isStarred && (
                    <Icon name="Star" size={14} className="text-yellow-500" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{workspace?.description}</p>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {workspace?.participants?.slice(0, 3)?.map((participant, index) => (
                    <Image
                      key={index}
                      src={participant?.avatar}
                      alt={participant?.avatarAlt}
                      className="w-6 h-6 rounded-full border border-white object-cover"
                    />
                  ))}
                  {workspace?.participants?.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-muted border border-white flex items-center justify-center text-xs text-muted-foreground">
                      +{workspace?.participants?.length - 3}
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground min-w-0">
                  {workspace?.lastActivity}
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${workspace?.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground min-w-0">
                    {workspace?.progress}%
                  </span>
                </div>
                
                <Button
                  variant={workspace?.isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onJoinWorkspace(workspace)}
                >
                  {workspace?.isActive ? "Continue" : "Join"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Collaborative Workspaces</h3>
          <p className="text-sm text-muted-foreground">
            Active team collaboration and focus areas
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="text-xs"
            >
              <Icon name="Grid3X3" size={12} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="text-xs"
            >
              <Icon name="List" size={12} />
            </Button>
          </div>
          
          <Button
            variant="default"
            size="sm"
            onClick={onCreateWorkspace}
          >
            <Icon name="Plus" size={14} className="mr-2" />
            New Workspace
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions?.map((filter) => (
          <Button
            key={filter?.key}
            variant={activeFilter === filter?.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter(filter?.key)}
            className="flex items-center space-x-2"
          >
            <span>{filter?.label}</span>
            <div className="bg-muted-foreground/20 text-xs px-1.5 py-0.5 rounded-full">
              {filter?.count}
            </div>
          </Button>
        ))}
      </div>
      {/* Workspace Content */}
      <div className="mb-6">
        {viewMode === 'grid' ? renderGridView() : renderListView()}
      </div>
      {/* Active Collaboration Indicators */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Live Activity</h4>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>{workspaceData?.liveUsers} users active now</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workspaceData?.liveActivity?.map((activity) => (
            <div key={activity?.id} className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Image
                  src={activity?.user?.avatar}
                  alt={activity?.user?.avatarAlt}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-foreground">{activity?.user?.name}</span>
                <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(activity?.status)}`}>
                  {activity?.status}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{activity?.action}</p>
              <div className="text-xs text-muted-foreground mt-1">
                {activity?.workspace} • {activity?.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaborativeWorkspaceIndicators;