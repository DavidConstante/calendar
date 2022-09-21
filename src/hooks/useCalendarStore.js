import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store"

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

  return {

    //*Properties
    events,
    activeEvent,

    //*Methods
    setActiveEvent,
    startSavingEvent

  }

}
