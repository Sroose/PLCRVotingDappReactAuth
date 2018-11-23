import React, { Component } from 'react'


class PollCreateForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      supply: this.props.supply,
      name: this.props.name,
      decimals: this.props.decimals,
      symbol: this.props.symbol,
      quorum: this.props.quorum,
      commitTime: this.props.commitTime,
      revealTime: this.props.revealTime
    }
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log(event.target.name)
    console.log(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onPollCreateFormSubmit(this.state.supply, this.state.name, this.state.decimals, this.state.symbol, this.state.quorum, this.state.commitTime, this.state.revealTime)
  }

  render() {
    console.log(this.state)

    if(typeof window.contractAddress !== 'undefined') {
      return(
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <div>Contract exists</div>
            <br />
        
            <div>Poll parameters:</div>
            <input id="quorum" name="quorum" type="text" value={this.state.quorum} onChange={this.onInputChange.bind(this)} placeholder="Quorum (0-100)" />
            <input id="commitTime" name="commitTime" type="text" value={this.state.commitTime} onChange={this.onInputChange.bind(this)} placeholder="Commit time (s)" />
            <input id="revealTime" name="revealTime" type="text" value={this.state.revealTime} onChange={this.onInputChange.bind(this)} placeholder="Reveal time (s)" />
            <br />

            <button type="submit" className="pure-button pure-button-primary">Create new poll</button>
          </fieldset>
        </form>
      )
    } else {
      return(
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <div>New contract will be created, provide token parameters:</div>
            <input id="supply" name="supply" type="text" value={this.state.supply} onChange={this.onInputChange.bind(this)} placeholder="Supply" />
            <input id="name" name="name" type="text" value={this.state.name} onChange={this.onInputChange.bind(this)} placeholder="Token name" />
            <input id="decimals" name="decimals" type="text" value={this.state.decimals} onChange={this.onInputChange.bind(this)} placeholder="Decimals" />
            <input id="symbol" name="symbol" type="text" value={this.state.symbol} onChange={this.onInputChange.bind(this)} placeholder="Token Symbol" />
            <br />
            
            <div>Poll parameters:</div>
            <input id="quorum" name="quorum" type="text" value={this.state.quorum} onChange={this.onInputChange.bind(this)} placeholder="Quorum (0-100)" />
            <input id="commitTime" name="commitTime" type="text" value={this.state.commitTime} onChange={this.onInputChange.bind(this)} placeholder="Commit time (s)" />
            <input id="revealTime" name="revealTime" type="text" value={this.state.revealTime} onChange={this.onInputChange.bind(this)} placeholder="Reveal time (s)" />
            <br />

            <button type="submit" className="pure-button pure-button-primary">Create contract, token and poll</button>
          </fieldset>
        </form>
      )
    }
  }
}

export default PollCreateForm
