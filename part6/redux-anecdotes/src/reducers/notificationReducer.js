import { createSlice } from '@reduxjs/toolkit'

const initialState = 'test'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const userAction = action.payload.userAction
      const anecdote = action.payload.anecdote
      const message = `${userAction === 'vote' ? `You voted '${anecdote}'` : `New anecdote created: '${anecdote}'`}`
      return message
    },
    removeNotification(state, action) {
      return ''
    }
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
