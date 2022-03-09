import React, { useContext } from 'react'
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = 'Uncategorized'

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', [])
    const [expenses, setExpenses] = useLocalStorage('expenses', [])

    function getBudgetExpenses(budgetId) {
        //Filter expenses by ID
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addExpense({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    }

    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            //Check if Budget exists
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max }]
        })
    }

    function deleteExpense({ id }) {
        //Filter out expense by id to remove
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    function deleteBudget({ id }) {
        //Move any expenses to Uncategorized
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                //Don't change expenses for othe budgets
                if (expense.budgetId !== id) return expense
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
            })  
        })

        //Filter out budget by id to remove
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }
    
    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteExpense,
            deleteBudget
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}