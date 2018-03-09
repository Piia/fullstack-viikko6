import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationCreation, notificationRemoval } from './../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    props.anecdoteCreation(event.target.anecdote.value)
    event.target.anecdote.value = ''
    props.notificationCreation('New anecdote created successfully!')
    setTimeout(() => props.notificationRemoval(), 5000)
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

const mapDispatchToProps = {
  anecdoteCreation,
  notificationCreation,
  notificationRemoval
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
