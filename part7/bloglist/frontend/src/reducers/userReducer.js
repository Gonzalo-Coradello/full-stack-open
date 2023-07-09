import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      blogService.setToken(user.token)
      return user
    },
    removeUser() {
      window.localStorage.removeItem('user')
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
    } catch (exception) {
      return exception.response.data.error
    }
  }
}

export default userSlice.reducer
