import React, { Component } from 'react'
import PLCRVoting from '../../../../build/contracts/PLCRVoting.json'
import store from '../../../store'
import human_standard_token_abi from './human_standard_token_abi.js'

const contract = require('truffle-contract')

class VoteOverviewForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      polls: []
    }
    
    //TIJDELIJK VOOR DEBUGGEN VAN SPECIFIEC CONTRACT
   // window.contractAddress = '0x6025a5ef2b76fd706e7a716d5da4db3db8f65d60'
    
  }

  onInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log(event.target.name)
    console.log(event.target.value)
  }

  handlePLedgeSubmit(event) {
    event.preventDefault()
    this.props.onPledgeSubmit(this.state.tokens)
  }
  
  loadAsyncData() {
    //get active polls
    let web3 = store.getState().web3.web3Instance
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
      
        if(typeof window.contractAddress === 'undefined') {
          return alert('First create a contract and poll!')
        }
        console.log('Using contract at: ' + window.contractAddress)
        
        var plcrc = contract(PLCRVoting)
        plcrc.setProvider(web3.currentProvider)
        //for the demo, we take contract address set globally when creating the contract/poll
        var plcr = plcrc.at(window.contractAddress)
        console.log('PLCR:')
        console.log(plcr)
        
        //get all polls in this contract
        var polls = this.getNextPoll(1, plcr, [])
        
        //get user voting rights
        var userData = this.getAccounts(web3)
        .then(result => {
          return this.getUserVotingDetails(web3, plcr, result[0]) 
        }) 
        
        return Promise.all([polls, userData])
        
      
    }else {
      console.error('Web3 is not initialized.')
    }
  }
  
  getAccounts(web3) {
    return new Promise(function (resolve, reject) {
        web3.eth.getAccounts(function (e, accounts) {
            if (e != null) {
                reject(e);
            } else {
                resolve(accounts);
            }
        });
    })
  }
  
  getUserVotingDetails(web3, plcr, address) {
    console.log('Checking token balance for ' + address)
    
    var tokenBalance = plcr.token()
    .then((token) => {
      console.log('TOKEN ADDRESS: ' + token)
      
      var tokenContract = web3.eth.contract(human_standard_token_abi);
      var tokenRunning = tokenContract.at(token);
      //wrap callback function as promise
      return new Promise((resolve, reject) => {
                
        tokenRunning.allowance(token, address, function(error, response){
          if (error) console.log("ALLOWANCE ERR: " + error)
          console.log('ALLOWANCE: ' + response)
        })
        
        tokenRunning.balanceOf(address, function(error, response){
          if (error) reject(error);
          console.log('Retreived users token balance: ' + response)
          resolve(response);
        })
        
      })
    })
    
    var voteBalance = plcr.voteTokenBalance.call(address)
    .then((balance) => {
      console.log('Retrieved users voting balance: ' + balance)
      return balance
    })
    
    return Promise.all([tokenBalance, voteBalance]) 
    
  }
  
  getNextPoll(i, plcr, polls) {
    
   return plcr.pollMap.call(i)
      .then((result) => {
        console.log('POLLMAP ' + i)
        console.log(result)
        
        console.log('commitEndDate :' + result[0])
        console.log('revealEndDate :' + result[1])
        console.log('voteQuorum :' + result[2])
        console.log('votesFor :' + result[3])
        console.log('votesAgainst :' + result[4])
        
        plcr.commitPeriodActive.call('' + i)
        .then((commitActive) => {
          console.log("xx Commit period active: " + commitActive + " -> commitPeriod ended: " + !commitActive)
        })
        
        
        return Promise.resolve()
          .then(
            (initial) => {
              //CHECK IF COMMIT PERIOD ENDED
              return plcr.commitPeriodActive.call(i)
              .then((commitActive) => {
                console.log("Commit period active: " + commitActive + " -> commitPeriod ended: " + !commitActive)
                result[5] = !commitActive ? 'YES' : 'NO'
                console.log('result[5] :' + result[5]);
                return !commitActive
              })
            }
          )
          .then(
            //CHECK IF POLL ENDED (only if reveal expired)
            (commitEnded) => {
              console.log('poll commit ended: ' + commitEnded)
              console.log('result[5] :' + result[5]);
              if(commitEnded) {
                return plcr.pollEnded.call(i)
                .then((pollEnded) => {
                  result[6] = pollEnded ? 'YES' : 'NO'
                  console.log('poll reveal ended: ' + pollEnded)
                  console.log('result[6] :' + result[6]);
                  return pollEnded
                  })
              } else {
                console.log("Since commit did not yet end, poll can not be ended")
                result[6] = 'NO'
                return false
              }
            }
          )
          .then(
            (wasEnded) => {
              console.log('poll reveal ended: ' + wasEnded)
              console.log('result[6] :' + result[6]);
              if(wasEnded) {
                return plcr.isPassed.call(i)
                .then((pollPassed) => {
                  result[7] = pollPassed ? 'YES' : 'NO'
                  console.log('POLL PASSED:' + result[7])
                  return pollPassed
                })
              } else {
                console.log("Since poll did not yet end, poll can not be passed")
                result[7] = 'NO'
                return false
              }
            }
          )
          .then(
            (wasPassed) => {
              polls.push(result);
              
              return plcr.pollExists.call(++i)
              .then((nextPollExists) => {
                console.log('Does poll ' + i + ' exist: ' + nextPollExists)
                if(nextPollExists) {
                  //another poll: keep fetchign and adding to the array
                  return this.getNextPoll(i, plcr, polls)
                } else {
                  //eventually, return the array of all polls
                  console.log('RETURNING POLLS:')
                  console.log(polls)
                  return polls
                }
              })
            }
          )
        
      })
  }
    
  componentDidMount() {
    this._asyncRequest = this.loadAsyncData().then(
      result => {
        console.log('PROMISE RETURNED')
        console.log('debug: ' + result[1])
        
        this._asyncRequest = null;
        this.setState({polls : result[0], userData : result[1]});
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
     // this._asyncRequest.cancel();
    }
  }

  render() {
    console.log("render")
    
    if (this.state.polls === null) {
      console.log('polls null')
      return(
        <div>Loading polls..</div>
      )
    } else {

      console.log("-----> POLLS SIZE: " + this.state.polls.length)
      console.log("-----> POLLS: " + this.state.polls)
      
      let rows = [];
      rows.push(<tr key="header">
                        <td key="header-0">Poll</td>
                        <td key="header-1">Commit EndDate</td>
                        <td key="header-2">Reveal EndDate</td>
                        <td key="header-3">Vote Quorum</td>
                        <td key="header-4">Votes For</td>
                        <td key="header-5">Votes Against</td>
                        <td key="header-6">Commit period ended</td>
                        <td key="header-7">Reveal period ended</td>
                        <td key="header-8">Passed</td>
                      </tr>)
      for (var i = 0; i < this.state.polls.length; i++){
        console.log('ROW' + i)
        let rowID = i
        rows.push(<tr key={rowID} id={rowID}>
                        <td key="{rowID}-0">{rowID}</td>
                        <td key="{rowID}-1">{new Date(this.state.polls[rowID][0] * 1000).toISOString()}</td>
                        <td key="{rowID}-2">{new Date(this.state.polls[rowID][1] * 1000).toISOString()}</td>
                        <td key="{rowID}-3">{this.state.polls[rowID][2].toString()}</td>
                        <td key="{rowID}-4">{this.state.polls[rowID][3].toString()}</td>
                        <td key="{rowID}-5">{this.state.polls[rowID][4].toString()}</td>
                        <td key="{rowID}-6">{this.state.polls[rowID][5].toString()}</td>
                        <td key="{rowID}-7">{this.state.polls[rowID][6].toString()}</td>
                        <td key="{rowID}-8">{this.state.polls[rowID][7].toString()}</td>
                      </tr>)
      }
      console.log(rows)
      
      //userdata
      console.log(this.state.userData)
      var tokenBalance = (typeof this.state.userData !== 'undefined') ? this.state.userData[0].toString() : ''
      var votingBalance = (typeof this.state.userData !== 'undefined') ? this.state.userData[1].toString() : ''
      
      
      return(
        
        <div>
          <form className="pure-form pure-form-stacked" onSubmit={this.handlePLedgeSubmit.bind(this)}>
            <fieldset>
              Your token balance is: {tokenBalance} 
              <br/>
              Your voting balance is: {votingBalance} 
              <br/>
              <div>Poll parameters:</div>
              <input id="tokens" name="tokens" type="text" value={this.state.tokens} onChange={this.onInputChange.bind(this)} placeholder="tokens to pledge" />
              <br />

              <button type="submit" className="pure-button pure-button-primary">request voting rights</button>
            </fieldset>
          </form>
          
          <div className="container">
            <div className="row">
              <div className="col s12 board">
                <style>{"td{border:1px solid black; padding:3px}"}</style>
                <table id="simple-board">
                   <tbody>
                     {rows}
                   </tbody>
                 </table>
              </div>
            </div>
          </div>
        </div>
      )
      
    }
  }
}

export default VoteOverviewForm
