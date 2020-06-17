import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'


const Home = (props) => {

  return (
    <div className='main-card'>
    <Card style={{ width: '40rem'}}>


      <Card.Body>
        <Card.Title className='title'>Important Information</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"
           style={{'padding-bottom': '10px'}}>
            Note* This is a test application so please use the Ropsten Test Network option in MetaMask.
          </Card.Subtitle>
          <Card.Text>
            In order for you to send transactions and get data, this test application requires you to have an account number and private key through MetaMask. Please use the following links to either get set up or continue.
          </Card.Text>

          <div className='acct-links'>
            <Link to='/create'>I have my information</Link>
            <Card.Link href="https://metamask.io/">Go to MetaMask</Card.Link>
          </div>
      </Card.Body>
    </Card>

    </div>
  )
}

export default Home