import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: 'My event',
//   notes: 'Some notes',
//   start: new Date(),
//   end: addHours(new Date(), 4),
//   bgColor: '#fafafa',
//   user: {
//     _id: '123',
//     name: 'David',
//   }
// }

export const calendarSlice = createSlice({
  name: 'calendar',
  isLoadingEvents: true,
  initialState: {
    events: [
      // tempEvent
    ],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload)
      state.activeEvent = null
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map(event => {
        if (event._id === payload._id) {
          return payload
        }
        return event
      })
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(event => event._id !== state.activeEvent._id)
        state.activeEvent = null
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false
      // state.events = payload
      payload.forEach(event => {
        const exist = state.events.some(dbEvent => dbEvent._id === event._id)
        if (!exist) {
          state.events.push(event)
        }
      })
    },
    onLogOutCalendar: (state) => {
      state.isLoadingEvents = true
      state.events = []
      state.activeEvent = null
    }
  }
});


// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogOutCalendar,
} = calendarSlice.actions