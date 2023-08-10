import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {
  createNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const voteOnAnecdote = (id, anecdote) => {
    dispatch(vote(id))
    dispatch(createNotification(`You voted '${anecdote}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <>
      {anecdotes
        .filter(anecdote => anecdote.content.includes(filter))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => voteOnAnecdote(anecdote.id, anecdote.content)}
          />
        ))}
    </>
  )
}

export default AnecdoteList
