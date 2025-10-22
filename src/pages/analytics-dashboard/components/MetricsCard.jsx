import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, description, trend }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-moderate transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={icon} size={16} className="text-primary" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {change && (
              <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
                <Icon name={getChangeIcon()} size={14} />
                <span>{change}</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            )}
          </div>
          
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        
        {trend && (
          <div className="w-16 h-12 ml-4">
            <div className="w-full h-full bg-muted/30 rounded flex items-end justify-center space-x-1 p-1">
              {trend?.map((point, index) => (
                <div
                  key={index}
                  className={`w-1 bg-primary rounded-sm ${
                    point > 50 ? 'opacity-100' : 'opacity-40'
                  }`}
                  style={{ height: `${Math.max(point, 10)}%` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;