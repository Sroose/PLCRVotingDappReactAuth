import PLCRVoting from '../../../../build/contracts/PLCRVoting.json'
import store from '../../../store'

const contract = require('truffle-contract')

export function pledgeTokens(tokens) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    
    return function(dispatch) {

      console.log('Using contract at: ' + window.contractAddress)

      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error('getCoinBase ERROR:')
          console.error(error)
        }
        console.log('COINBASE: ' + coinbase)
        
        var plcrc = contract(PLCRVoting)
        plcrc.setProvider(web3.currentProvider)
        //for the demo, we take contract address set globally when creating the contract/poll
        var plcr = plcrc.at(window.contractAddress)
        
      /* commit vote is enough, no need to manually reuest voting rights
          var secrethash = web3.sha3(web3.toHex("JAN") + web3.toHex("mysalt"), {encoding:"hex"})
          return plcr.commitVote(1, secrethash, 1, 0, {from: coinbase})
          .then((result) => {
            console.log('COMMITTED VOTE')
            console.log(result)
          })
          
          return plcr.requestVotingRights(tokens, {from: coinbase})
          .then((result) => {
            console.log('REQUESTED VOTING RIGHTS')
            console.log(result)
          })*/
        
        //commitVote fails with unknown error. This function internally does a request voting right, which already fails:       
        //test here directly this function (fails):
        return plcr.requestVotingRights(tokens, {from: coinbase})
        .then((result) => {
          console.log('REQUESTED VOTING RIGHTS')
          console.log(result)
        })
        
      })

    }

  } else {
    console.error('Web3 is not initialized.');
  }
}
