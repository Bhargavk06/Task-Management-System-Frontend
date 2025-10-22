import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStatsCards = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers,
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers,
      icon: 'UserCheck',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Administrators',
      value: stats?.adminUsers,
      icon: 'Shield',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: '0%',
      changeType: 'neutral'
    },
    {
      title: 'Pending Invites',
      value: stats?.pendingInvites,
      icon: 'Mail',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '-25%',
      changeType: 'decrease'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'increase':
        return 'TrendingUp';
      case 'decrease':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards?.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-moderate transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(card?.changeType)}`}>
              <Icon name={getChangeIcon(card?.changeType)} size={14} />
              <span>{card?.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{card?.value}</h3>
            <p className="text-sm text-muted-foreground">{card?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStatsCards;