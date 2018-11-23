import PLCRFactory from '../../../../build/contracts/PLCRFactory.json'
import PLCRVoting from '../../../../build/contracts/PLCRVoting.json'
import store from '../../../store'

const contract = require('truffle-contract')
const factoryAddress = '0xd099a8e850f79c14815e38674ddba3715496e506'

export function createPoll(supply, name, decimals, symbol, quorum, commitTime, revealTime) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    
    return function(dispatch) {
      

      // Get current ethereum wallet.
      web3.eth.getAccounts((error, accs) => {
        // Log errors, if any.
        if (error) {
          console.error('ERROR getting accounts:')
          console.error(error)
        }
        console.log('First account: ' + accs[0])
        var account = accs[0]
        
        var plcrc = contract(PLCRVoting)
        plcrc.setProvider(web3.currentProvider)
        
        //TEMP hardcode contract insatnce address here to reuse existing
        // window.contractAddress = '0x6025a5ef2b76fd706e7a716d5da4db3db8f65d60'

        //check if we already have an active contract, else create on with a token
        if(typeof window.contractAddress !== 'undefined') {
          //CONTRACT EXISTS, ADD POLL
          console.log('CONTRACT ALREADY EXISTS')
          //get contract at address
          var plcr = plcrc.at(window.contractAddress)
          console.log('PLCR:')
          console.log(plcr)
          
          // Attempt to create poll.
          startPoll(plcr, account,quorum, commitTime, revealTime)
        
        } else {
          //NO CONTRCT YET, CREATE ONE WITH A TOKEN
          console.log('CREATE CONTRACT WITH TOKEN')
          // Using truffle-contract we create the poll object.
          const plcrf = contract(PLCRFactory)
          plcrf.setProvider(web3.currentProvider)

          // Declaring this for later so we can chain functions on PollCreate.
          var plcrfInstance = plcrf.at(factoryAddress)

          //plcrf.deployed().then(function(instance) {
            console.log('FACTORY:')
            console.log(plcrfInstance)
            //Create new PLCR with token
            plcrfInstance.newPLCRWithToken(supply, name, decimals, symbol, {from: account})
            .then(function(receipt) {
              console.log('RECEIPT:')
              console.log(receipt);
              //get contract at address
              var plcr = plcrc.at(receipt.logs[0].args.plcr)
              console.log('PLCR:')
              console.log(plcr)
              
              //store contract address globally for demo purposes
              window.contractAddress = plcr.address
                
              // Attempt to create poll.
              startPoll(plcr, account, quorum, commitTime, revealTime)
              
            })
            .catch(function(result) {
              // If error...
              console.error('error newPLCRWithToken: ' + result);
            })
          //})
        }
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}

export function startPoll(plcr, account, quorum, commitTime, revealTime) {
  plcr.startPoll(quorum, commitTime, revealTime, {from: account})
  .then(function(result) {
    // If no error, create poll.
    console.log('POLL STARTED:')
    console.log(result)
    var pollID = result.logs[0].args.pollID;

    return alert('Poll created! ' + pollID)
  })
  .catch(function(result) {
    // If error...
    console.error('error startPoll: ' + result);
  })
}