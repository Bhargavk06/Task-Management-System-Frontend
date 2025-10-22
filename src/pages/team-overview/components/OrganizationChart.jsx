import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrganizationChart = ({ organizationData, onMemberSelect, selectedMember }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['admin', 'managers']));

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded?.has(nodeId)) {
      newExpanded?.delete(nodeId);
    } else {
      newExpanded?.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderMember = (member, level = 0) => {
    const hasSubordinates = member?.subordinates && member?.subordinates?.length > 0;
    const isExpanded = expandedNodes?.has(member?.id);
    const isSelected = selectedMember?.id === member?.id;

    return (
      <div key={member?.id} className="relative">
        <div 
          className={`flex items-center p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
            isSelected 
              ? 'bg-primary text-primary-foreground border-primary shadow-moderate' 
              : 'bg-card border-border hover:border-primary/50 hover:shadow-subtle'
          }`}
          onClick={() => onMemberSelect(member)}
          style={{ marginLeft: `${level * 24}px` }}
        >
          {hasSubordinates && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e?.stopPropagation();
                toggleNode(member?.id);
              }}
              className="mr-2 p-1 h-6 w-6"
            >
              <Icon 
                name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                size={14} 
              />
            </Button>
          )}
          
          <div className="relative mr-3">
            <Image
              src={member?.avatar}
              alt={member?.avatarAlt}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              member?.status === 'online' ? 'bg-green-500' :
              member?.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
            }`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className={`font-medium truncate ${
                isSelected ? 'text-primary-foreground' : 'text-foreground'
              }`}>
                {member?.name}
              </h4>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                member?.role === 'Admin' ? 'bg-red-100 text-red-800' :
                member?.role === 'Manager'? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {member?.role}
              </div>
            </div>
            <p className={`text-sm truncate ${
              isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
            }`}>
              {member?.department} • {member?.activeTasks} active tasks
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className={`text-right ${
              isSelected ? 'text-primary-foreground' : 'text-foreground'
            }`}>
              <div className="text-sm font-medium">{member?.workloadPercentage}%</div>
              <div className={`text-xs ${
                isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                Workload
              </div>
            </div>
            
            <div className={`w-12 h-2 rounded-full overflow-hidden ${
              isSelected ? 'bg-primary-foreground/20' : 'bg-muted'
            }`}>
              <div 
                className={`h-full transition-all duration-300 ${
                  member?.workloadPercentage > 80 ? 'bg-red-500' :
                  member?.workloadPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(member?.workloadPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
        {hasSubordinates && isExpanded && (
          <div className="mt-2 space-y-2">
            {member?.subordinates?.map(subordinate => 
              renderMember(subordinate, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Organization Structure</h3>
          <p className="text-sm text-muted-foreground">
            Interactive hierarchy with workload distribution
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Maximize2" size={14} className="mr-2" />
            Fullscreen
          </Button>
        </div>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {organizationData?.map(member => renderMember(member))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span>Busy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
              <span>Offline</span>
            </div>
          </div>
          <span>Click to expand • Select for details</span>
        </div>
      </div>
    </div>
  );
};

export default OrganizationChart;