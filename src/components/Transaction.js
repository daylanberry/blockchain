import React from 'react'
import { connect } from 'react-redux'

import './Transaction.css'
import AccountTable from './AccountTable'
import SuccessModal from './SuccessModal'
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
      error: '',
      modal: false
    }

  }

  componentDidMount() {

    const { privateKey, acct } = this.props.userAccount

    if (privateKey.length) {
      this.setState({
        fromAcct: acct,
        privateKey
      })
    } else {
      this.handleError("You don't have a private key set up yet!")
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value, error: ''})
  }

  handleError = (message) => {
    this.setState({
      error: message
    })
  }

  successHandler = () => {
    this.setState({error: '', modal: true})
  }

  //If the submission is successful I use the successHandler to display the modal page, else the error function will render the error message on the page
  submitTransaction = () => {

    const { fromAcct, toAcct, privateKey, ether } = this.state;

    if (!ether.length || isNaN(ether)) {
      this.handleError("You don't have a proper ether value")
      return
    }

    try {
      helpers.makeTransaction(fromAcct, toAcct, Buffer.from(privateKey, 'hex'), ether, this.handleError, this.successHandler)

    } catch(e) {
      this.handleError('This is an invalid account/private Key')
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

  toggleModal = () => {
    const { modal } = this.state
    this.setState({modal: !modal})
  }


  render() {
    const { fromAcct, toAcct, ether, privateKey, error, modal } = this.state

    return (
      <div>
        <div>
          <h3 className='transaction-title'>Make a Transaction</h3>
          <div className='transaction-sub'>
            <span>This sends ether to given registry</span>
          </div>
        </div>
        <AccountTable
          handleChange={this.handleChange}
          fromAcct={fromAcct}
          toAcct={toAcct}
          ether={ether}
        />
        <SuccessModal
          toAcct={toAcct}
          modal={modal && !error.length}
          toggleModal={this.toggleModal}
          ether={ether}
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