import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../contexts/BudgetsContext'
import BudgetCard from './BudgetCard'

export default function UncategorizedBudgetCard(props) {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount, 0
    )
    
    //Only show if amount is not 0
    if (amount === 0) return null

  return <BudgetCard grey name='Uncategorized' amount={amount} {...props} />
  
}
