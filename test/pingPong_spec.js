/*global contract, config, it, assert*/

const PingPong = require('Embark/contracts/PingPong');
const { BN, constants, expectEvent, shouldFail } = require('openzeppelin-test-helpers');

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config({
  //deployment: {
  //  accounts: [
  //    // you can configure custom accounts with a custom balance
  //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
  //  ]
  //},
  contracts: {
    "PingPong": {
      
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("PingPong", function () {
  this.timeout(0);

  it("should pong to a ping", async function () {
    const txResult = await PingPong.methods.ping().send();
    const events = txResult.events
    // now we can inspect the events
    console.log(events);
  });
})
