// import choo
var choo = require('choo')
// import template
var main = require('./templates/main');
// import web3
var Web3 = require('web3')
// Import contract ABI
var contractABI = require("./dist/contracts/PingPong.json").abiDefinition

// initialize choo
var app = choo()

// Initialize IPFS

app.use(function (state, emitter) {

    emitter.on('DOMContentLoaded', async () => {
        // Check for web3 instance. Create if necessary.
        // Access MetaMask
        if (window.ethereum) {
            try {
                await window.ethereum.enable()
            } catch (error) {
                console.log(error)
            }
        }

        // Set up web3 provider
        web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8555'));

        // Set up contract interface
        state.contractInstance = new web3.eth.Contract(contractABI, "0x04D45b51fe4f00b4478F8b0719Fa779f14c8A194")
    
        // Unlock account
        const accounts = await web3.eth.getAccounts()
        web3.eth.personal.unlockAccount(accounts[0], async function (error, result) {
            if (error) {
                console.error(error)
            }
            else {
                web3.eth.defaultAccount = accounts[0]
            }
        });

        state.contractInstance.events.Pong((err, event) => {
            // we could do anything here, like insert a
            // new bit of HTML or change the state of our app
            if (err) {
              // something went wrong
              console.log(err);
            } 
            console.log("Pong event", event);
            alert("Pong")

        })
    })

    emitter.on('ping', function () {
        state.contractInstance.methods.ping().send({ from: web3.eth.defaultAccount })
            .on('error', console.error)
            .on('receipt', async receipt => {
                console.log("Saved to smart contract", receipt)
            })
    })
})

// create a route
app.route('/', main)

// start app
app.mount('div')

