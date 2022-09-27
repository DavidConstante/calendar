import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { onChecking, onLogin, onLogout, clearErrorMessage, onLogOutCalendar } from "../store"

export const useAuthStore = () => {

  const dispatch = useDispatch()
  const { status, user, errorMessage } = useSelector(state => state.auth)

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post('/auth', { email, password })
      localStorage.setItem('token', data.user.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.user.name, _id: data.user._id }))

    } catch (error) {
      dispatch(onLogout('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
    }

  }

  const startRegister = async ({ name, email, password }) => {
    try {
      const { data } = await calendarApi.post('/auth/new', { name, email, password })
      localStorage.setItem('token', data.user.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.user.name, _id: data.user._id }))

    } catch (error) {
      dispatch(onLogout(error.response.data.message))
      // console.log(error)
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) return dispatch(onLogout())

    try {
      const { data } = await calendarApi.get('/auth/renew')
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.name, _id: data.uid }))

    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogOutCalendar())
    dispatch(onLogout())
  }


  return {
    //*Properties
    status,
    user,
    errorMessage,

    //*Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  }

}
