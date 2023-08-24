import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const loginUser = (userObject) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      dispatch(
        setNotification(
          {
            text: 'Wrong username or password',
            type: 'error',
          },
          5,
        ),
      )
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(removeUser())
    blogService.setToken('')
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(
      setNotification(
        {
          text: 'You have been successfully logged out.',
          type: 'success',
        },
        5,
      ),
    )
  }
}

export const setUserFromLocalStorage = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
