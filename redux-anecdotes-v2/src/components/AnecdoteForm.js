import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationCreation, notificationRemoval } from './../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    store.dispatch(anecdoteCreation(event.target.anecdote.value))
    event.target.anecdote.value = ''
    store.dispatch(notificationCreation('New anecdote created successfully!'))
    setTimeout(() => store.dispatch(notificationRemoval()), 5000)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
