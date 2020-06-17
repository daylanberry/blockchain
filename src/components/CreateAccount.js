import React from 'react'
import { connect } from 'react-redux'
import { enterAccountInfo } from '../actions'
import { Form, Button } from 'react-bootstrap'


class CreateAccount extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      acct: '',
      privateKey: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { acct, privateKey } = this.state
    const { addAcct, history } = this.props


    if (!acct.length ) {
      alert('You need to enter a value')
      return
    }

    addAcct({ acct, privateKey: Buffer.from(privateKey) })
    history.push('/balance')
  }

  render() {

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group >
          <Form.Label>Account#</Form.Label>
          <Form.Control
            type="text"
            name='acct'
            onChange={this.handleChange}
            placeholder="Enter Acct#"
          />
        </Form.Group>

        <Form.Group >
          <Form.Label>Private Key</Form.Label>
          <Form.Control
            type="text"
            name='privateKey'
            onChange={this.handleChange}
            placeholder="Private Key"
          />
          <Form.Text className="text-muted">
            We recommend to use a test key, otherwise I promise I won't see it.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  addAcct: (acctObj) => dispatch(enterAccountInfo(acctObj))
})


export default connect(null, mapDispatchToProps)(CreateAccount)