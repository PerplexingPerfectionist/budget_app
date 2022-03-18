import { Modal, Button } from "react-bootstrap"
import { useBudgets } from '../contexts/BudgetsContext'

export default function ResetModal({ show, handleClose }) {
    const { resetAll } = useBudgets()

  return (
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div>RESET APP</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='fs-5 px-3 mb-4'>This action will delete all budgets and expenses. It is not reversible.</div>
                <Button
                    variant='danger'
                    onClick={
                        () => {
                            resetAll()
                            handleClose()
                    }}>
                    RESET
                </Button>
            </Modal.Body>
    </Modal>
  )
}
