import React from 'react'
import { connect } from 'react-redux'
import { filterCreation } from './../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => props.filterCreation(event.target.value)
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

const mapDispatchToProps = {
  filterCreation
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter
