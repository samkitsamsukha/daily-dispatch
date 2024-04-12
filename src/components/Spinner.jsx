import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <span className="material-symbols-outlined">pending</span>
      </div>
    )
  }
}

export default Spinner
