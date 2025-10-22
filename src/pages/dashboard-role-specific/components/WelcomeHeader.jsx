import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeHeader = ({ user, currentTime }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = (role) => {
    const messages = {
      admin: "Ready to orchestrate organizational excellence today?",
      manager: "Time to empower your team and drive results forward.",
      employee: "Let\'s make today productive and impactful!"
    };
    return messages?.[role] || messages?.employee;
  };

  return (
    <div className="bg-gradient-brand rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="User" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-2xl font-brand-headline">
                {getGreeting()}, {user?.name}!
              </h1>
              <p className="text-white/80 text-sm">
                {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)} • {user?.department}
              </p>
            </div>
          </div>
          <p className="text-white/90 text-lg font-medium mb-4">
            {getMotivationalMessage(user?.role)}
          </p>
          <div className="flex items-center space-x-6 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} />
              <span>{currentTime?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>{currentTime?.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</span>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center space-x-3">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Icon name="Settings" size={16} className="mr-2" />
            Preferences
          </Button>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Icon name="HelpCircle" size={16} className="mr-2" />
            Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;