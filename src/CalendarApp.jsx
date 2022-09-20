import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

export const CalendarApp = () => {

  const authStatus = 'not-authenticated'
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
