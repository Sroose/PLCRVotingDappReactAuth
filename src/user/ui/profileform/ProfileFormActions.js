import UserProfileContract from '../../../../build/contracts/UserProfile.json'
import store from '../../../store'

const contract = require('truffle-contract')

export const USER_UPDATED = 'USER_UPDATED'
function userUpdated(username, firstname, lastname, title, phone, email, orgs) {
  return {
    type: USER_UPDATED,
    payload: username, firstname, lastname, title, phone, email, orgs
  }
}

export function updateUser(username, firstname, lastname, title, phone, email) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the userprofile object.
      const userprofile = contract(UserProfileContract)
      userprofile.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on UserProfile.
      var userprofileInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        userprofile.deployed().then(function(instance) {
          userprofileInstance = instance
          // Attempt to login user.
          userprofileInstance.updateUserProfile(username, firstname, lastname, title, phone, email, {from: coinbase})
          .then(function(result) {
            // If no error, update user.
            var orgs=result[6]
            console.log('YYYYY')
            console.log(coinbase)
            dispatch(userUpdated({"username": username,
                                  "firstname": firstname,
                                  "lastname": lastname,
                                  "title": title,
                                  "phone": phone,
                                  "email": email,
                                  "orgs": orgs
                                 }))
            console.log('ZZZZZ')
            userprofileInstance.getUsers.call()
            .then(function(result) {
                console.log(result)

            return alert('Profile updated!')
            })
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
