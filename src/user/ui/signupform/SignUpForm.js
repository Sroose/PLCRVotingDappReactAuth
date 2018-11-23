import React, { Component } from 'react'

class SignUpForm extends Component {
  constructor(props) {
    super(props)
	  
	      console.log('PROPS')
    console.log(this.props)
    console.log('STATE')
    console.log(this.state)

    this.state = {
      username: ''
    }
  }

  onInputChange(event) {
    this.setState({ username: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.username.length < 2)
    {
      return alert('Please fill in your username.')
    }

    this.props.onSignUpFormSubmit(this.state.username)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="username">Name</label>
          <input id="username" type="text" value={this.state.username} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

export default SignUpForm
