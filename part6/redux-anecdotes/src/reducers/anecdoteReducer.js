import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnnecdote(state, action) {
      return [...state, action.payload]
    },
  },
})

export const { setAnecdotes, appendAnnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnnecdote(newAnecdote))
  }
}

export const vote = id => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.getOne(id)
    const changedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    }
    await anecdoteService.update(id, changedAnecdote)

    dispatch(initializeAnecdotes())
  }
}

export default anecdoteSlice.reducer
