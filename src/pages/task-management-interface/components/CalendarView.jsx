import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ tasks, onTaskEdit, onTaskCreate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();
  const currentMonth = currentDate?.getMonth();
  const currentYear = currentDate?.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth?.getDay();
  const daysInMonth = lastDayOfMonth?.getDate();

  // Generate calendar days
  const calendarDays = [];
  
  // Previous month days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth, -i);
    calendarDays?.push({ date, isCurrentMonth: false });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    calendarDays?.push({ date, isCurrentMonth: true });
  }
  
  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays?.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(currentYear, currentMonth + 1, day);
    calendarDays?.push({ date, isCurrentMonth: false });
  }

  // Group tasks by date
  const tasksByDate = tasks?.reduce((acc, task) => {
    const dateKey = new Date(task.dueDate)?.toDateString();
    if (!acc?.[dateKey]) acc[dateKey] = [];
    acc?.[dateKey]?.push(task);
    return acc;
  }, {});

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentYear, currentMonth + direction, 1));
  };

  const isToday = (date) => {
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date?.toDateString() === selectedDate?.toDateString();
  };

  const getTasksForDate = (date) => {
    return tasksByDate?.[date?.toDateString()] || [];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex-1 bg-white">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames?.[currentMonth]} {currentYear}
          </h2>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(-1)}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth(1)}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        <Button
          variant="default"
          onClick={() => onTaskCreate()}
          iconName="Plus"
          iconPosition="left"
        >
          New Task
        </Button>
      </div>
      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-px mb-2">
          {dayNames?.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {calendarDays?.map((calendarDay, index) => {
            const dayTasks = getTasksForDate(calendarDay?.date);
            const isCurrentMonthDay = calendarDay?.isCurrentMonth;
            const isTodayDate = isToday(calendarDay?.date);
            const isSelectedDate = isSelected(calendarDay?.date);

            return (
              <div
                key={index}
                className={`min-h-32 p-2 bg-white cursor-pointer hover:bg-gray-50 transition-colors ${
                  !isCurrentMonthDay ? 'opacity-40' : ''
                } ${isSelectedDate ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedDate(calendarDay?.date)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    isTodayDate 
                      ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center' 
                      : isCurrentMonthDay 
                        ? 'text-gray-900' :'text-gray-400'
                  }`}>
                    {calendarDay?.date?.getDate()}
                  </span>
                  
                  {dayTasks?.length > 0 && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-1 rounded">
                      {dayTasks?.length}
                    </span>
                  )}
                </div>
                {/* Tasks for this day */}
                <div className="space-y-1">
                  {dayTasks?.slice(0, 3)?.map((task) => (
                    <div
                      key={task?.id}
                      className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: `${getPriorityColor(task?.priority)}20` }}
                      onClick={(e) => {
                        e?.stopPropagation();
                        onTaskEdit(task);
                      }}
                    >
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task?.priority)}`}></div>
                        <span className="truncate text-gray-700">{task?.title}</span>
                      </div>
                    </div>
                  ))}
                  
                  {dayTasks?.length > 3 && (
                    <div className="text-xs text-gray-500 text-center py-1">
                      +{dayTasks?.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Selected Date Tasks */}
      {selectedDate && (
        <div className="border-t border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tasks for {selectedDate?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          
          <div className="space-y-2">
            {getTasksForDate(selectedDate)?.map((task) => (
              <div
                key={task?.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => onTaskEdit(task)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(task?.priority)}`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{task?.title}</h4>
                    <p className="text-sm text-gray-600">{task?.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task?.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task?.status === 'in-progress'? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task?.status?.replace('-', ' ')?.charAt(0)?.toUpperCase() + task?.status?.replace('-', ' ')?.slice(1)}
                  </span>
                  
                  <Icon name="ChevronRight" size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
            
            {getTasksForDate(selectedDate)?.length === 0 && (
              <p className="text-gray-500 text-center py-4">No tasks scheduled for this date</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;