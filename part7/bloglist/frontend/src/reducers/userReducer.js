import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
  loggedUser: null,
  users: [],
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      blogService.setToken(user.token)
      return { loggedUser: user }
    },
    removeUser() {
      window.localStorage.removeItem('user')
      return { loggedUser: null }
    },
    getAll(state, action) {
      const users = action.payload
      return { users }
    },
  },
})

export const { setUser, removeUser, getAll } = userSlice.actions

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

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
    }
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(getAll(users))
  }
}

export default userSlice.reducer
