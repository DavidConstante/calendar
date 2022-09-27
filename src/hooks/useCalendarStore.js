import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import calendarApi from "../api/calendarApi"
import { convertEventsToDateEvents } from "../helpers"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store"

export const useCalendarStore = () => {

  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {

    try {
      if (calendarEvent._id) {
        //Update Note
        await calendarApi.put(`/events/${calendarEvent._id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }

      //Create new Note
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.rta._id, user }))

    } catch (error) {
      // console.log(error)
      Swal.fire('Error', error.response?.data.message, 'error')
    }
  }

  const startDeletingEvent = async () => {
    //TODO: Delete in backend

    try {

      await calendarApi.delete(`/events/${activeEvent._id}`)
      dispatch(onDeleteEvent())

    } catch (error) {

      Swal.fire('Error', error.response?.data.message, 'error')
    }
  }


  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDateEvents(data.events)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        msg: 'Error al cargar los eventos'

      }
    }


  }

  return {

    //*Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*Methods
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,

  }

}
