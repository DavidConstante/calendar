import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { NavBar } from '../components/NavBar'
import { CalendarEvent } from '../components/CalendarEvent'

import { localizer, getMessagesES } from '../../helpers'
import { CalendarModal } from '../components/CalendarModal'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'

import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'



export const CalendarPage = () => {

  const { user } = useAuthStore()
  const { openDateModal } = useUiStore()
  const { events, activeEvent, setActiveEvent, startLoadingEvents } = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = user._id === event.user._id

    const style = {
      backgroundColor: isMyEvent ? '#347cF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }


    return { style }
  }

  const onDoubleClick = (e) => {
    openDateModal()
  }

  const onSelect = (e) => {
    setActiveEvent(e)
  }

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e)
    console.log({ viewChange: e });

  }

  useEffect(() => {
    startLoadingEvents()
  }, [])


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
      <FabAddNew />
      <FabDelete />

    </>
  )
}
