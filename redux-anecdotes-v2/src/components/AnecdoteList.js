import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVoting } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const handleClick = (event) => {
    event.preventDefault()
    const anecdote = props.anecdotes.find(a => a.id === event.target.id)
    props.anecdoteVoting(anecdote)
    props.notify(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes.map(anecdote =>
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
      )}
    </div>
  )
}

const filteredAndSortedAnecdotes = (anecdotes, filterText) => {
  const sorterer = (a, b) => b.votes - a.votes
  const filterer = (anecdote) => anecdote.content.includes(filterText)
  return anecdotes.filter(filterer).sort(sorterer)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: filteredAndSortedAnecdotes(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  anecdoteVoting,
  notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
