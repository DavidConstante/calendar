import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage"
import { CalendarPage } from "../calendar/pages/CalendarPage"
import { getEnvVariables } from "../helpers"
import { useAuthStore } from "../hooks"

export const AppRouter = () => {

  // const authStatus = 'not-authenticated'
  const { status, checkAuthToken } = useAuthStore()



  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return <h1>Cargando...</h1>
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? ( //* public routes
            <>
              <Route path='/auth/*' element={<LoginPage />} />
              <Route path='/*' element={<Navigate to='/auth/login' />} />
            </>
          )
          : ( //* private routes
            <>
              <Route path='/' element={<CalendarPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </>
          )

      }
    </Routes>
  )
}
