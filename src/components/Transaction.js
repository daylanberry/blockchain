import React from 'react'
import { connect } from 'react-redux'

import './Transaction.css'
import AccountTable from './AccountTable'
import { Button, Alert } from 'react-bootstrap'
import * as helpers from '../utils'


class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromAcct: '',
      toAcct: '0x6C095A05764A23156eFD9D603eaDa144a9B1AF33',
      privateKey: '',
      ether: '',
      error: ''
    }

  }

  componentDidMount() {
    console.log(this.props.userAccount)
    const { privateKey, acct } = this.props.userAccount

    if (privateKey.length) {
      this.setState({
        fromAcct: acct,
        privateKey
      })
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value, error: ''})
  }

  handleError = () => {
    this.setState({
      error: 'This is an invalid account/private Key'
    })
  }

  submitTransaction = () => {

    const { fromAcct, toAcct, privateKey } = this.state;

    try {
      helpers.makeTransaction(fromAcct, toAcct, Buffer.from(privateKey, 'hex'), '.02', this.handleError)
      this.setState({error: ''})
    } catch(e) {
      this.handleError()
    }
  }

  renderError = () => {
    const { error } = this.state

    if (error.length) {
      return (
        <Alert className='transaction-error' variant='danger'>
          {error}
        </Alert>
      )
    }
  }


  render() {
    const { fromAcct, toAcct, privateKey, error } = this.state

    return (
      <div>
        <div>
          <h3 className='transaction-title'>Make a Transaction</h3>
          <div className='transaction-sub'>
            <span>This sends transactions to given registry</span>
          </div>
        </div>
        <AccountTable
          handleChange={this.handleChange}
          fromAcct={fromAcct}
          toAcct={toAcct}
        />

        <div>
          <div>
            <Button
              variant='success'
              onClick={this.submitTransaction}
            >
              Make Transaction
            </Button>
          </div>
          {this.renderError()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userAccount: state.acct.account
})

export default connect(mapStateToProps, null)(Transaction)