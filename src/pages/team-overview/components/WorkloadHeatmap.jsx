import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkloadHeatmap = ({ heatmapData, onCellClick }) => {
  const [viewMode, setViewMode] = useState('department'); // department, individual, skills

  const getIntensityColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 80) return 'bg-red-400';
    if (percentage >= 70) return 'bg-orange-400';
    if (percentage >= 60) return 'bg-yellow-400';
    if (percentage >= 40) return 'bg-green-400';
    if (percentage >= 20) return 'bg-green-300';
    return 'bg-gray-200';
  };

  const getTextColor = (percentage) => {
    return percentage >= 60 ? 'text-white' : 'text-gray-800';
  };

  const renderDepartmentView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {heatmapData?.departments?.map((dept) => (
        <div key={dept?.id} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">{dept?.name}</h4>
            <div className="text-sm text-muted-foreground">
              {dept?.members} members
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-1 mb-3">
            {dept?.workloadGrid?.map((cell, index) => (
              <div
                key={index}
                className={`aspect-square rounded ${getIntensityColor(cell?.percentage)} ${getTextColor(cell?.percentage)} 
                  flex items-center justify-center text-xs font-medium cursor-pointer hover:scale-110 transition-transform`}
                onClick={() => onCellClick(cell)}
                title={`${cell?.name}: ${cell?.percentage}% workload`}
              >
                {cell?.percentage}
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Avg Load:</span>
            <span className={`font-medium ${
              dept?.averageLoad > 80 ? 'text-red-600' :
              dept?.averageLoad > 60 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {dept?.averageLoad}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderIndividualView = () => (
    <div className="space-y-4">
      {heatmapData?.individuals?.map((person) => (
        <div key={person?.id} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{person?.name}</h4>
                <p className="text-sm text-muted-foreground">{person?.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">{person?.currentLoad}%</div>
              <div className="text-xs text-muted-foreground">Current Load</div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-3">
            {person?.weeklyLoad?.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']?.[index]}
                </div>
                <div
                  className={`h-8 rounded ${getIntensityColor(day?.percentage)} ${getTextColor(day?.percentage)} 
                    flex items-center justify-center text-xs font-medium cursor-pointer`}
                  onClick={() => onCellClick({ ...day, person: person?.name })}
                >
                  {day?.percentage}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tasks: {person?.activeTasks}</span>
            <span className="text-muted-foreground">Capacity: {person?.capacity}h/week</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkillsView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {heatmapData?.skills?.map((skillGroup) => (
        <div key={skillGroup?.id} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">{skillGroup?.name}</h4>
            <div className="text-sm text-muted-foreground">
              {skillGroup?.totalExperts} experts
            </div>
          </div>
          
          <div className="space-y-2">
            {skillGroup?.skills?.map((skill) => (
              <div key={skill?.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{skill?.name}</span>
                  <span className="text-xs text-muted-foreground">({skill?.experts} experts)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getIntensityColor(skill?.utilization)}`}
                      style={{ width: `${skill?.utilization}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-8">
                    {skill?.utilization}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Workload Heatmap</h3>
          <p className="text-sm text-muted-foreground">
            Visual capacity utilization across teams
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            {[
              { key: 'department', label: 'Departments', icon: 'Building2' },
              { key: 'individual', label: 'Individual', icon: 'User' },
              { key: 'skills', label: 'Skills', icon: 'Zap' }
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
        </div>
      </div>
      <div className="mb-6">
        {viewMode === 'department' && renderDepartmentView()}
        {viewMode === 'individual' && renderIndividualView()}
        {viewMode === 'skills' && renderSkillsView()}
      </div>
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Workload Intensity:</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-200 rounded" />
                <span className="text-xs">Low</span>
                <div className="w-3 h-3 bg-yellow-400 rounded" />
                <span className="text-xs">Medium</span>
                <div className="w-3 h-3 bg-red-500 rounded" />
                <span className="text-xs">High</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Updated: {new Date()?.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkloadHeatmap;