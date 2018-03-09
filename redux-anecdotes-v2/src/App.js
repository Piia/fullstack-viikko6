import React from 'react'
import { connect } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import ConnectedNotification from './components/Notification'
import ConnectedFilter from './components/Filter'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import ConnectedAnecdoteList from './components/AnecdoteList'

class App extends React.Component {
	componentDidMount = async () => {
		const anecdotes = await anecdoteService.getAll()
		this.props.anecdoteInitialization(anecdotes)
	}

	render() {
		return (
		  <div>
		    <h1>Programming anecdotes</h1>
		    <ConnectedNotification />
		    <ConnectedFilter />
		    <ConnectedAnecdoteList />
		    <ConnectedAnecdoteForm />
		  </div>
		)
	}
}

export default connect(
  null,
  { anecdoteInitialization }
)(App)
