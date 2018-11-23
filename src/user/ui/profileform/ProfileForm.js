import React, { Component } from 'react'

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    console.log('PROPS')
    console.log(this.props)
    console.log('STATE')
    console.log(this.state)
    this.state = {
      username: this.props.username,
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      title: this.props.title,
      phone: this.props.phone,
      email: this.props.email,
      orgs: this.props.orgs
    }
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log(event.target.name)
    console.log(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()

    // if (this.state.username.length 2)
    // {
    //   return alert('Please fill in your username.')
    // }

    this.props.onProfileFormSubmit(this.state.username, this.state.firstname, this.state.lastname, this.state.title, this.state.phone, this.state.email)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="username">Username: {this.state.username}</label>
          <input id="firstname" name="firstname" type="text" value={this.state.firstname} onChange={this.onInputChange.bind(this)} placeholder="First Name" />
          <input id="lastname" name="lastname" type="text" value={this.state.lastname} onChange={this.onInputChange.bind(this)} placeholder="Last Name" />
          <input id="title" name="title" type="text" value={this.state.title} onChange={this.onInputChange.bind(this)} placeholder="Title" />
          <input id="phone" name="phone" type="text" value={this.state.phone} onChange={this.onInputChange.bind(this)} placeholder="Phone #" />
          <input id="email" name="email" type="text" value={this.state.email} onChange={this.onInputChange.bind(this)} placeholder="Email Address" />

          <br />

          <button type="submit" className="pure-button pure-button-primary">Update</button>
        </fieldset>
      </form>
    )
  }
}

export default ProfileForm
