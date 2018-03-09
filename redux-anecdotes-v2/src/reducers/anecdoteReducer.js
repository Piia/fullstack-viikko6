import anecdoteService from './../services/anecdotes'


//const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = anecdote => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0,
// })

const anecdoteReducer = (store = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const unchanged = store.filter(a => a.id !== action.data.id)
      return [...unchanged, action.data]
    case 'CREATE':
      return [...store, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return store
  }
}

export const anecdoteCreation = content => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const anecdoteVoting = anecdote => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const anecdoteInitialization = data => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data
    })
  }
}


export default anecdoteReducer
