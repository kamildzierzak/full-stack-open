import { createSlice } from '@reduxjs/toolkit'

const initialState = "How u doin'"

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
export default notificationSlice.reducer
