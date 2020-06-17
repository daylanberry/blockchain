import React from 'react'
import { connect } from 'react-redux'


import { Link, withRouter } from 'react-router-dom'
import Options from './Options'
import './Header.css'

const Header = ({ acctInfo, history }) => {

  return (
    <div className="header">
      <span
        onClick={() => history.push('/')} className='blockchain'
      >
        Blockchain
      </span>

      <div className="header-right">
        <Options/>
      </div>
        {
          acctInfo ? (
            <div>
              <span className='acct'>Account: {acctInfo.acct}</span>
            </div>
          ) : null
        }
    </div>
  )
}

const mapStateToProps = (state) => ({
  acctInfo: state.acct.account
})

export default withRouter(connect(mapStateToProps)(Header))
