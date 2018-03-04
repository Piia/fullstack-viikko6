const filterReducer = (state = '', action) => {
  switch (action.type) {
  case 'NEW_FILTER':
    return action.filter
  default:
    return state
  }
}

export const filterCreation = filter => ({
  type: 'NEW_FILTER',
  filter
})

export default filterReducer
