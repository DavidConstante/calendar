import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice, authSlice } from './';

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer,
  }
})