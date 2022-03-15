import { Button, Stack } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import AddExpenseModal from './components/AddExpenseModal'
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard'
import ViewExpensesModal from './components/ViewExpensesModal'
import { useState } from 'react'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from './contexts/BudgetsContext'

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, expenses, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
  <>
  <Container className='my-4'>
    <Stack direction='horizontal' gap='2' className='mb-4'>
      <h1 className='me-auto'>Budgets</h1>
      <Button onClick={() => setShowAddBudgetModal(true)} variant='primary'>Add Budget</Button>
      <Button onClick={openAddExpenseModal} variant='outline-primary'>Add Expense</Button>
    </Stack>

    <div className='col-9 col-md-8 col-lg-6 mx-auto mt-5' style={budgets.length === 0 && expenses.length === 0 ? {display: 'block'} : {display: 'none'}}>
      <p className='fs-4'>This app allows you to track budgets and expenses. Start by adding budget categories. Then add you expenses to each category.</p>
      <p className='fs-4'>To delete a budget or expense click on the "view expenses" button.</p>
      <p className='mt-5 fs-4 fw-bold'>Enter your budgets and expenses to get started.</p>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1rem',
      alignItems: 'flex-start',
    }}>
      <TotalBudgetCard />

      {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce(
          (total, expense) => total + expense.amount, 0
        )

        return (
        <BudgetCard
          key={budget.id}
          name={budget.name}
          amount={amount}
          max={budget.max}
          onAddExpenseClick={() => openAddExpenseModal(budget.id)}
          onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
        />)
      })}

      <UncategorizedBudgetCard
        onAddExpenseClick={openAddExpenseModal}
        onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
      />

    </div>
  </Container>

  <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
  <AddExpenseModal show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} defaultBudgetId={addExpenseModalBudgetId} />
  <ViewExpensesModal budgetId={viewExpensesModalBudgetId} handleClose={() => setViewExpensesModalBudgetId()} />
  </>
  )
}

export default App;
