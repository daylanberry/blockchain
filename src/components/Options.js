import React from 'react'
import './Options.css'

import { Dropdown } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'


const Options = () => {

  const active = {
    color: 'blue'
  }

  return (
    <div>
      <NavLink
        className='link'
        activeStyle={active}
        to='/create'
      >
        Add Account
      </NavLink>

      <NavLink
        className='link'
        activeStyle={active}
        to='/balance'
      >
        Search Balances
      </NavLink>

      <NavLink
        className='link'
        activeStyle={active}
        to='/transaction'
      >
        Make a Transaction
      </NavLink>
    </div>
  )
}

export default Options