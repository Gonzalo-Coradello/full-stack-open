import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  },
})

export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification, timeOut) => {
  const timeMiliseconds = timeOut * 1000
  return async dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeMiliseconds)
  }
}

export default notificationSlice.reducer
