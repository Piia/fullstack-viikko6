import React from 'react'
import { anecdoteVoting } from './../reducers/anecdoteReducer'
import { notificationCreation, notificationRemoval } from './../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const sorter = (a, b) => b.votes - a.votes
  const filterer = (anecdote) => anecdote.content.includes(store.getState().filters)
  const anecdotes = store.getState().anecdotes.filter(filterer).sort(sorter)
  const handleClick = (event) => {
    event.preventDefault()
    store.dispatch(anecdoteVoting(event.target.id))
    store.dispatch(notificationCreation('Voted successfully!'))
    setTimeout(() => store.dispatch(notificationRemoval()), 5000)
  }
  const generateAnecdotes = () => {
    return anecdotes.map(anecdote => 
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick} id={anecdote.id}>
            vote
          </button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {generateAnecdotes()}
    </div>
  )
}

export default AnecdoteList
