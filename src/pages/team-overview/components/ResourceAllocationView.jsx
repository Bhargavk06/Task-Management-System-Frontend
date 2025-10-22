import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceAllocationView = ({ allocationData, onResourceReassign, onSkillMatch }) => {
  const [selectedResource, setSelectedResource] = useState(null);
  const [viewMode, setViewMode] = useState('capacity'); // capacity, skills, projects

  const getCapacityColor = (percentage) => {
    if (percentage >= 95) return 'text-red-600 bg-red-50';
    if (percentage >= 80) return 'text-orange-600 bg-orange-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const renderCapacityView = () => (
    <div className="space-y-4">
      {allocationData?.resources?.map((resource) => (
        <div 
          key={resource?.id} 
          className={`bg-card rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
            selectedResource?.id === resource?.id 
              ? 'border-primary shadow-moderate' 
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => setSelectedResource(resource)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Image
                src={resource?.avatar}
                alt={resource?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-foreground">{resource?.name}</h4>
                <p className="text-sm text-muted-foreground">{resource?.role} • {resource?.department}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCapacityColor(resource?.currentCapacity)}`}>
                {resource?.currentCapacity}% Capacity
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e?.stopPropagation();
                  onResourceReassign(resource);
                }}
              >
                <Icon name="ArrowRightLeft" size={14} className="mr-2" />
                Reassign
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-sm text-muted-foreground mb-1">Active Projects</div>
              <div className="text-xl font-semibold text-foreground">{resource?.activeProjects}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-sm text-muted-foreground mb-1">Pending Tasks</div>
              <div className="text-xl font-semibold text-foreground">{resource?.pendingTasks}</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-sm text-muted-foreground mb-1">Hours/Week</div>
              <div className="text-xl font-semibold text-foreground">{resource?.hoursPerWeek}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Weekly Allocation</span>
              <span className="text-foreground font-medium">{resource?.currentCapacity}% of {resource?.maxCapacity}h</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  resource?.currentCapacity >= 95 ? 'bg-red-500' :
                  resource?.currentCapacity >= 80 ? 'bg-orange-500' :
                  resource?.currentCapacity >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(resource?.currentCapacity, 100)}%` }}
              />
            </div>
          </div>

          {resource?.upcomingDeadlines?.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground mb-2">Upcoming Deadlines</div>
              <div className="flex flex-wrap gap-2">
                {resource?.upcomingDeadlines?.slice(0, 3)?.map((deadline, index) => (
                  <div key={index} className="bg-muted px-2 py-1 rounded text-xs text-foreground">
                    {deadline?.project} - {deadline?.date}
                  </div>
                ))}
                {resource?.upcomingDeadlines?.length > 3 && (
                  <div className="text-xs text-muted-foreground px-2 py-1">
                    +{resource?.upcomingDeadlines?.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSkillsView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {allocationData?.skillGroups?.map((group) => (
        <div key={group?.id} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">{group?.name}</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSkillMatch(group)}
            >
              <Icon name="Zap" size={14} className="mr-2" />
              Auto-Match
            </Button>
          </div>
          
          <div className="space-y-3">
            {group?.skills?.map((skill) => (
              <div key={skill?.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{skill?.name}</span>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      skill?.demand === 'high' ? 'bg-red-100 text-red-800' :
                      skill?.demand === 'medium'? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {skill?.demand} demand
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {skill?.available}/{skill?.total} available
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(skill?.available / skill?.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-12">
                    {Math.round((skill?.available / skill?.total) * 100)}%
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {skill?.experts?.slice(0, 4)?.map((expert, index) => (
                    <div key={index} className="flex items-center space-x-1 bg-muted px-2 py-1 rounded text-xs">
                      <div className={`w-2 h-2 rounded-full ${
                        expert?.availability === 'available' ? 'bg-green-500' :
                        expert?.availability === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-foreground">{expert?.name}</span>
                    </div>
                  ))}
                  {skill?.experts?.length > 4 && (
                    <div className="text-xs text-muted-foreground px-2 py-1">
                      +{skill?.experts?.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderProjectsView = () => (
    <div className="space-y-4">
      {allocationData?.projects?.map((project) => (
        <div key={project?.id} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-foreground">{project?.name}</h4>
              <p className="text-sm text-muted-foreground">{project?.description}</p>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                project?.status === 'on-track' ? 'bg-green-100 text-green-800' :
                project?.status === 'at-risk'? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {project?.status?.replace('-', ' ')}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Due: {project?.deadline}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-foreground">{project?.teamSize}</div>
              <div className="text-xs text-muted-foreground">Team Members</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-foreground">{project?.progress}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-foreground">{project?.hoursAllocated}</div>
              <div className="text-xs text-muted-foreground">Hours Allocated</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-foreground">{project?.resourceUtilization}%</div>
              <div className="text-xs text-muted-foreground">Resource Usage</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {project?.teamMembers?.slice(0, 5)?.map((member, index) => (
                <Image
                  key={index}
                  src={member?.avatar}
                  alt={member?.avatarAlt}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
              {project?.teamMembers?.length > 5 && (
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-white flex items-center justify-center text-xs font-medium text-muted-foreground">
                  +{project?.teamMembers?.length - 5}
                </div>
              )}
            </div>
            
            <Button variant="outline" size="sm">
              <Icon name="Users" size={14} className="mr-2" />
              Manage Team
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Resource Allocation</h3>
          <p className="text-sm text-muted-foreground">
            Optimize team capacity and skill distribution
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            {[
              { key: 'capacity', label: 'Capacity', icon: 'BarChart3' },
              { key: 'skills', label: 'Skills', icon: 'Zap' },
              { key: 'projects', label: 'Projects', icon: 'FolderOpen' }
            ]?.map((mode) => (
              <Button
                key={mode?.key}
                variant={viewMode === mode?.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode(mode?.key)}
                className="text-xs"
              >
                <Icon name={mode?.icon} size={12} className="mr-1" />
                {mode?.label}
              </Button>
            ))}
          </div>
          
          <Button variant="outline" size="sm">
            <Icon name="Settings" size={14} className="mr-2" />
            Configure
          </Button>
        </div>
      </div>
      <div className="mb-6">
        {viewMode === 'capacity' && renderCapacityView()}
        {viewMode === 'skills' && renderSkillsView()}
        {viewMode === 'projects' && renderProjectsView()}
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span>Near Capacity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span>Overallocated</span>
            </div>
          </div>
          <span>Real-time capacity tracking</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocationView;