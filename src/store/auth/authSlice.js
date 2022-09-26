import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // checking, authenticated, not-authenticated
    user: {},
    errorMessages: undefined,
  },
  reducers: {
    checking: (state) => {
      state.status = 'checking'
      errorMessage = undefined
      state.user = {}
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated'
      state.user = payload
      state.errorMessage = undefined
    }
  }
});


// Action creators are generated for each case reducer function
export const { checking, onLogin } = authSlice.actions