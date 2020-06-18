import React from 'react'
import { withRouter } from 'react-router-dom'

import { Modal, Button } from 'react-bootstrap'

const SuccessModal = ({toAcct, ether, modal, toggleModal, history}) => {

  return (
    <Modal show={modal} onHide={() => {}}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      < Modal.Body>
        You successfully sent {ether} ether to account {toAcct}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={toggleModal}>
          Make Another Transaction
        </Button>
        <Button variant="success" onClick={() => history.push('/balance')}>
          Search Your Balance
        </Button>

      </Modal.Footer>
    </Modal>
  )
}

export default withRouter(SuccessModal)