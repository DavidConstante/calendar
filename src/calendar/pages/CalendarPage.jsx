import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns/'
import { NavBar } from '../components/NavBar'
import { CalendarEvent } from '../components/CalendarEvent'

import { localizer, getMessagesES } from '../../helpers'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'

const events = [
  {
    title: 'My event',
    notes: 'Some notes',
    start: addHours(new Date(), 2),
    end: addHours(new Date(), 4),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'David',
    }
  }
]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347cF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return { style }
  }

  const onDoubleClick = (e) => {
    console.log({ doubleClick: e });
  }

  const onSelect = (e) => {
    console.log({ click: e });
  }

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e)
    console.log({ viewChange: e });

  }



  return (
    <>
      <NavBar />
      <Calendar
        culture='es'

        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        events={events}
        defaultView={lastView}
        localizer={localizer}
        messages={getMessagesES()}
        startAccessor="start"
        style={{ height: 'calc(100vh - 80px)' }}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal />

    </>
  )
}
