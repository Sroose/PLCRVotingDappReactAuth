import AuthenticationContract from '../../../../build/contracts/Authentication.json'
import UserProfileContract from '../../../../build/contracts/UserProfile.json'
import OrganizationContract from '../../../../build/contracts/Organization.json'
import { browserHistory } from 'react-router'
import store from '../../../store'

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(username, firstname, lastname, title, phone, email, orgs) {
  return {
    type: USER_LOGGED_IN,
    payload: username, firstname, lastname, title, phone, email, orgs
  }
}

export function loginUser() {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const authentication = contract(AuthenticationContract)
      authentication.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var authenticationInstance

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        authentication.deployed().then(function(instance) {
          authenticationInstance = instance

          // Attempt to login username.
          authenticationInstance.login({from: coinbase})
          .then(function(result) {
            console.log(coinbase)
            // If no error, login username.
            var userName = web3.toUtf8(result)

            // Get UserProfileInfo
            const userprofile = contract(UserProfileContract)
            userprofile.setProvider(web3.currentProvider)

            // Declaring this for later so we can chain functions on Authentication.
            var userprofileInstance

            userprofile.deployed().then(function(instance) {
              userprofileInstance = instance

              // Attempt to login username.
              userprofileInstance.getUserProfile.call(coinbase)
              .then(function(result) {

                var firstname = web3.toUtf8(result[0])
                var lastname = web3.toUtf8(result[1])
                var title = web3.toUtf8(result[2])
                var phone = web3.toUtf8(result[3])
                var email = web3.toUtf8(result[4])

                const organization = contract(OrganizationContract)
                organization.setProvider(web3.currentProvider)

                // Declaring this for later so we can chain functions on OrgCreate.
                var organizationInstance

                organization.deployed().then(function(instance) {
                  organizationInstance = instance
                  // Attempt to create org.
                  organizationInstance.getUserOrgs.call()
                  .then(function(result) {
                      console.log(result)
                      var orgs = ''
                      if ( result[0] ) {
                          orgs = result[0].c
                      }
                      console.log('ORGS')
                      console.log(orgs)

                      dispatch(userLoggedIn({"username": userName,
                                             "firstname": firstname,
                                             "lastname": lastname,
                                             "title": title,
                                             "phone": phone,
                                             "email": email,
                                             "orgs": orgs
                                            }))

                // Used a manual redirect here as opposed to a wrapper.
                // This way, once logged in a username can still access the home page.
                var currentLocation = browserHistory.getCurrentLocation()
    
                if ('redirect' in currentLocation.query)
                {
                  return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
                }
    
                return browserHistory.push('/dashboard')
                  })
                })
              })
            })
          })
          .catch(function(result) {
            // If error, go to signup page.
            console.error('Wallet ' + coinbase + ' does not have an account!')

            return browserHistory.push('/signup')
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
