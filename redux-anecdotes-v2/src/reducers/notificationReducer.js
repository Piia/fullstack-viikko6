const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'CREATE_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const notify = (message, seconds) => {
  return (dispatch) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })  
    }, seconds * 1000 )
  }
}

export const notificationCreation = message => ({
  type: 'CREATE_NOTIFICATION',
  data: message,
})

export const notificationRemoval = () => ({
  type: 'REMOVE_NOTIFICATION',
})


export default notificationReducer
