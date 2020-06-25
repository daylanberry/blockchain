import Web3 from 'web3'
const Tx = require('ethereumjs-tx').Transaction
export const web3 = new Web3('https://ropsten.infura.io/v3/ab2aedec2f3543e4b54d01d13f8a5a1d')
// const web3 = new Web3('HTTP://127.0.0.1:7545')


//calculates balance in wei and converts to ether
export const getBalance = (address) => {
  web3.eth.getBalance(address, (err, bal) => {
    console.log(web3.utils.fromWei(bal, 'ether'))
  })
}


export const newAccount = web3.eth.accounts.create()


//This function allows users to make authenticated transactions
export const makeTransaction = (account, account2, privateKey, ether, errorFunc, successFunc) => {

  web3.eth.getTransactionCount(account, (err, txCount) => {
    //build transaction
    const txObj = {
      nonce: web3.utils.toHex(txCount),
      to: account2,
      value: web3.utils.toHex(web3.utils.toWei(ether, 'ether')),
      gas: 50000,
      gasLimit: web3.utils.toHex(2100),
      gasPrice:  web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    }


    //sign with private key
    const tx = new Tx(txObj, { 'chain': 'ropsten'})

    try {
      tx.sign(privateKey)
    } catch(e) {
      return errorFunc("Incorrect private key")
    }

    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')

    //broadcast transaction else render error message on component
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      if (err) console.log(err)
      console.log('txHash', txHash)
      if (!txHash) {
        errorFunc("You don't have enough funds, or you made back to back requests too quickly!")
      } else {
        successFunc()
      }
    })


  })

}


