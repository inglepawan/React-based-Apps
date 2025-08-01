import React, { useState } from 'react';
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
      color: '#3b82f6'
    },
    {
      title: 'HR Policy Update',
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      color: '#10b981'
    },
    {
      title: 'Quarterly Review',
      start: new Date(new Date().setDate(new Date().getDate() + 3)),
      end: new Date(new Date().setDate(new Date().getDate() + 3)),
      color: '#f59e0b'
    }
  ]);

  return (
    <div className="calendar-widget">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        height="auto"
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
      />
    </div>
  );
};

export default CalendarWidget;