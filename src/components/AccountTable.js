import React from 'react'
import { Table } from 'react-bootstrap'


const AccountTable = ({handleChange, fromAcct, toAcct, ether}) => {

  return (
    <Table className='tran-table'>
      <tbody>
        <tr>
          <td>
            <span style={{'marginRight': '10px'}}>
              From Account:
            </span>
            <input
              className='transaction-input'
              type='text'
              name='fromAcct'
              onChange={handleChange}
              value={fromAcct}
            />
          </td>
        </tr>

        <tr>
          <td>
            <span style={{'marginRight': '28px'}}>
              To Account:
            </span>
            <input
              className='transaction-input'
              type='text'
              name='toAcct'
              onChange={handleChange}
              value={toAcct}
            />
          </td>
        </tr>

        <tr>
          <td>
            <span style={{'marginRight': '28px'}}>
              Value (ether):
            </span>
            <input
              type='text'
              name='ether'
              onChange={handleChange}
              value={ether}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default AccountTable












