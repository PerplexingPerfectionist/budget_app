import { Modal, Button, Stack } from "react-bootstrap"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../contexts/BudgetsContext'
import { currencyFormat } from '../utility'

export default function ViewExpensesModal({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId ? { name:'Uncatergorized', id: UNCATEGORIZED_BUDGET_ID } : budgets.find(b => b.id === budgetId)
    const expenses = getBudgetExpenses(budgetId)

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction='horizontal' gap='2'>
                        <div>Expenses - {budget?.name}</div>
                        <Button variant='outline-danger'
                            onClick={() => {
                                deleteBudget(budget)
                                handleClose()
                            }}>
                            Delete
                        </Button>
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='vertical' gap='3'>
                    {expenses.map(expense => (
                        <Stack direction='horizontal' gap='2' key={expense.id}>
                            <div className='me-auto fs-4'>{expense.description}</div>
                            <div className='fs-5'>{currencyFormat.format(expense.amount)}</div>
                            <Button size='sm' variant='outline-danger' onClick={() => deleteExpense(expense)}><strong>&#88;</strong></Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
    </Modal>
  )
}
