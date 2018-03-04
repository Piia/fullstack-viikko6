const initialState = 'This is NOTIFICATION'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CREATE_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return ''
  default:
    return state
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
