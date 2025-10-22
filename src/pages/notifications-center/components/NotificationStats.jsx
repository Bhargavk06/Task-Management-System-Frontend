import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Notifications',
      value: stats?.total,
      icon: 'Bell',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Unread',
      value: stats?.unread,
      icon: 'BellRing',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      label: 'High Priority',
      value: stats?.highPriority,
      icon: 'AlertTriangle',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      label: 'Today',
      value: stats?.today,
      icon: 'Calendar',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className={`bg-card border ${stat?.borderColor} rounded-lg p-4 ${stat?.bgColor}/30`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat?.label}</p>
              <p className={`text-2xl font-bold ${stat?.color} mt-1`}>{stat?.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color={stat?.color?.replace('text-', '#')} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationStats;