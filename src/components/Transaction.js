import React from 'react'
import './Transaction.css'
import { Table } from 'react-bootstrap'

class Transaction extends React.Component {
  constructor(props) {
    super(props)


  }



  render() {
    return (
      <div>
        <h3 className='transaction-title'>Make a Transaction</h3>
        <Table>
          <tbody>
            <tr>
              <td>
                <span style={{'marginRight': '10px'}}>
                  From Account:
                </span>
                <input
                  className='transaction-input'
                  type='text'
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
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )

  }

}

export default Transaction