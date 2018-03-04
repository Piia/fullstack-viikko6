import React from 'react'
import { filterCreation } from './../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = (event) => store.dispatch(filterCreation(event.target.value))
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      <h2>Filter</h2>
      <input onChange={handleChange} />
    </div>
  )
}

export default Filter
