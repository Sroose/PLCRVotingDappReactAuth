
# PLCR Voting on react-auth box

This is a sample [PLCR Voting](https://github.com/ConsenSys/PLCRVoting) dapp using [Truffle's react-auth box](http://truffleframework.com/boxes/react-auth). WORK IN PROGRESS

## Installation

1. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```

2. Clone the repository.
    ```javascript
    git clone https://github.com/Sroose/PLCRVotingDappReactAuth.git
    ```

3. Install the node modules
    ```javascript
    npm install
    ```

4. Run the development console.
    ```javascript
    truffle develop
    ```

5. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```
6. Write down the factory address and update the constant in PollCreateFormActions.js.

7. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // Serves the front-end on http://localhost:3000
    npm run start
    ```

8. Note to update truffle.js to match your Ethereum node or run Ganache on port 7545. Install the Metamask browser plugin for easy web3 interaction.
  

## TODO

* OPEN ISSUE WITH GETTING VOTING RIGHTS
* form for casting votes within a poll

## FAQ

* __How do I use this with the EthereumJS TestRPC?__

    It's as easy as modifying the config file! [Check out the Truffle documentation on adding network configurations](http://truffleframework.com/docs/advanced/configuration#networks). Depending on the port you're using, you'll also need to update line 34 of `src/util/web3/getWeb3.js`.

* __Why is there both a truffle.js file and a truffle-config.js file?__

    `truffle-config.js` is a copy of `truffle.js` for compatibility with Windows development environments. Feel free to it if it's irrelevant to your platform.

* __Where is my production build?__

    The production build will be in the build_webpack folder. This is because Truffle outputs contract compilations to the build folder.

* __Where can I find more documentation about Truffle?__

    This DAPP uses [Truffle](http://truffleframework.com/) and a React Authentication setup created with [react-auth](https://truffleframework.com/boxes/react-auth). This would be a great place to start!
