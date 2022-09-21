import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from "../store"

export const useCalendarStore = () => {

  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector(state => state.calendar)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    //TODO: Send avent to backend

    if (calendarEvent._id) {
      //Update Note
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      //Create new Note
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }
  }

  const startdeletingEvent = () => {
    dispatch(onDeleteEvent())
    //TODO: Delete in backend
  }

  return {

    //*Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*Methods
    startdeletingEvent,
    setActiveEvent,
    startSavingEvent,

  }

}
