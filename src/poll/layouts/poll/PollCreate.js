import React, { Component } from 'react'
import PollCreateFormContainer from '../../ui/pollcreateform/PollCreateFormContainer'

class PollCreate extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Create Poll</h1>
            <p>Enter your poll details here.</p>
            <PollCreateFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default PollCreate
