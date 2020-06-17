import React from 'react'
import { connect } from 'react-redux'
import { changeSearchedAccount } from '../actions'

import './Balance.css'
import { Card, Button, Alert } from 'react-bootstrap'

import Web3 from 'web3'
const uriTest = 'https://ropsten.infura.io/v3/ab2aedec2f3543e4b54d01d13f8a5a1d'
const uriMain = 'https://mainnet.infura.io/v3/ab2aedec2f3543e4b54d01d13f8a5a1d'
const web3 = new Web3(uriTest)


class Balance extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      acct: '',
      typedAcct: '',
      ether: '',
      message: '',
      error: '',
      uri: uriTest,
      realData: false,
    }
  }

  componentDidMount() {
    this.getBalance(uriTest)
  }

  // this function takes in a url, the two options for the uri are the variables uriTest and uriMain listed above. The uriTest shows the user how many test ether the account has, while the uriMain displays live data of real accounts
  getBalance = () => {
    const { uri } = this.state

    let
    defaultAcct = "0x3c5ca637008be36e9697F09fdd62367F16a0f573"
    let message = ''
    const { searchedAcct } = this.props

    if (searchedAcct === defaultAcct) {
      message = 'For testing purposes, if a user inputs an invalid address or no address, the program will default to my address :)'
    }

    const web3 = new Web3(uri)

    try {
      web3.eth.getBalance(searchedAcct, (err, bal) => {

        let etherAmt = web3.utils.fromWei(bal, 'ether')

        this.setState({
          acct: searchedAcct,
          ether: etherAmt,
          error: '',
          message,
        })
      })

    } catch(e) {
      this.setState({error: 'This is an invalid address, please try again'})
    }

  }

  //whenever a user toggles the real data option, the getBalance function will create a new web3 instance with the updated url.
  componentDidUpdate(prevProps, prevState) {
    const { uri, realData } = this.state

    if (prevState.realData !== realData) {
      let newUri = realData ? uriMain : uriTest

      this.setState({
        uri: newUri,
      }, () => this.getBalance(newUri))
    }

    if (prevProps.searchedAcct !== this.props.searchedAcct) {
      this.getBalance()
    }
  }

  handleChange = (e) => {
    this.setState({typedAcct: e.target.value})
  }

  changeAcct = (typedAcct) => {

    if (typedAcct.length < 40) {
      alert('This is an invalid account')
      return
    }
    this.props.search(typedAcct)
  }


  alertMessage = () => {
    const { message } = this.state

    return message.length ? (
        <Alert variant='warning'>
          {message}
        </Alert>
      ) : null
  }

  renderError = () => {
    const { error } = this.state

    if (error.length) {
      return (
        <Alert variant='danger'>
          {error}
        </Alert>
      )
    }
  }

  render() {
    const { typedAcct, acct, ether, realData } = this.state

    return (
      <div className='balance'>
        <Card className="bal-card">
          <Card.Header>Balance Information ({!realData ? "Test account": "Real Data"})</Card.Header>
          <Card.Body>
            {this.alertMessage()}
            <Card.Title>
              <span style={{'fontSize': '18px', 'marginRight': '5px'}}>
                Account:
              </span>
              <span style={{'fontSize': '14px'}}>
                {acct}
              </span>
            </Card.Title>

            <Card.Text>
              Balance: {ether} ether
            </Card.Text>
            <input
              type='text'
              value={typedAcct}
              onChange={this.handleChange}
            />
            <Button
              variant="primary"
              onClick={() => this.changeAcct(typedAcct)}
            >
              Search Account
            </Button>
            <Button
              variant="secondary"
              onClick={() => this.setState({realData: !realData})}
            >
              {realData ? "Test Data" : "Real Data"}
            </Button>

          </Card.Body>
          {this.renderError()}
        </Card>

      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  acctInfo: state.acct.account,
  searchedAcct: state.acct.searchedAcct
})

const mapDispatchToProps = (dispatch) => ({
  search: (acct) => dispatch(changeSearchedAccount(acct))
})

export default connect(mapStateToProps, mapDispatchToProps)(Balance)