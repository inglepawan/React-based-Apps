import React, { useState } from 'react';
import { Card, Button, Badge, List, Avatar } from 'antd';
import { CalendarOutlined, PlusOutlined, ClockCircleOutlined } from '@ant-design/icons';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import './CalendarWidget.css';

const CalendarWidget = () => {
  const [events] = useState([
    {
      title: 'Team Meeting',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
      color: '#3b82f6',
      type: 'meeting'
    },
    {
      title: 'HR Policy Update',
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      color: '#10b981',
      type: 'policy'
    },
    {
      title: 'Quarterly Review',
      start: new Date(new Date().setDate(new Date().getDate() + 3)),
      end: new Date(new Date().setDate(new Date().getDate() + 3)),
      color: '#f59e0b',
      type: 'review'
    },
    {
      title: 'Employee Training',
      start: new Date(new Date().setDate(new Date().getDate() + 5)),
      end: new Date(new Date().setDate(new Date().getDate() + 5)),
      color: '#8b5cf6',
      type: 'training'
    }
  ]);

  const upcomingEvents = [
    {
      title: 'Team Meeting',
      time: 'Today, 2:00 PM',
      type: 'meeting',
      attendees: 8
    },
    {
      title: 'HR Policy Update',
      time: 'Tomorrow, 10:00 AM',
      type: 'policy',
      attendees: 3
    },
    {
      title: 'Quarterly Review',
      time: 'Dec 15, 3:00 PM',
      type: 'review',
      attendees: 5
    }
  ];

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return '👥';
      case 'policy': return '📋';
      case 'review': return '📊';
      case 'training': return '🎓';
      default: return '📅';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'policy': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'training': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarOutlined className="text-blue-500" />
            <span className="text-lg font-semibold">Calendar & Events</span>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            size="small"
            className="bg-blue-500 hover:bg-blue-600 border-blue-500"
          >
            Add Event
          </Button>
        </div>
      }
      className="h-full"
    >
      <div className="space-y-6">
        {/* Upcoming Events */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <ClockCircleOutlined className="mr-2 text-blue-500" />
            Upcoming Events
          </h4>
          <List
            itemLayout="horizontal"
            dataSource={upcomingEvents}
            renderItem={(item) => (
              <List.Item className="px-0 py-2">
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      size={40}
                      className="bg-gray-100 text-lg"
                    >
                      {getEventTypeIcon(item.type)}
                    </Avatar>
                  }
                  title={
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{item.title}</span>
                      <Badge 
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(item.type)}`}
                        count={item.type}
                      />
                    </div>
                  }
                  description={
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{item.time}</span>
                      <span className="text-xs text-gray-400">{item.attendees} attendees</span>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>

        {/* Calendar */}
        <div className="border-t border-gray-200 pt-4">
          <div className="calendar-widget">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
              }}
              height="auto"
              events={events}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={2}
              weekends={true}
              eventDisplay="block"
              eventClassNames="custom-event"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">12</div>
            <div className="text-xs text-gray-500">This Month</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">8</div>
            <div className="text-xs text-gray-500">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">3</div>
            <div className="text-xs text-gray-500">Today</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CalendarWidget;