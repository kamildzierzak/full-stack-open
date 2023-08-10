import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Nothing to say.'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return initialState
    },
  },
})

export const { createNotification, removeNotification } =
  notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 1000 * time)
  }
}
export default notificationSlice.reducer
