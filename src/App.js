
import { Container, Stack, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import BudgetCard from "./Components/BudgetCard";
import AddBudgetModal from "./Components/AddBudgetModal";
import React from 'react'
import ViewExpensesModal from "./Components/ViewExpensesModal";
import TotalBudgetCard from "./Components/TotalBudgetCard";
//import { BudgetsProvider } from "./Contexts/BudgetContext";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./Contexts/BudgetContext";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import AddExpenseModal from "./Components/AddExpenseModal";
import './style.css'

export default function App(){

  const [showAddBudgetModal,setShowAddBudgetModal]=React.useState(false)
  const [showAddExpenseModal,setShowAddExpenseModal]=React.useState(false)
  const [ViewExpensesModalBudgetId,setViewExpensesModalBudgetId]=React.useState()
  const[addExpenseModalBudgetId,setAddExpenseModalBudgetId]=React.useState()
  const {budgets,getBudgetExpenses}= useBudgets()

function openAddExpenseModal(budgetId){
  setShowAddExpenseModal(true)
  setAddExpenseModalBudgetId(budgetId)
}

  return( 
  <>
    
    <Container className="my-4"  >
      <Stack direction="horizontal" gap={3} className="mt-2 mb-4">
        <h1 className="me-auto" id="title"><img src="/Images/icons8-finance-64.png" className="logo" alt="logo"/>Expense Tracker</h1>
        <Button variant="primary" onClick={()=>setShowAddBudgetModal(true)} id="btn-cust">Add Budget</Button>
        <div className="vr" />
        <Button variant="danger" onClick={openAddExpenseModal} id="btn-cust">Add Expense</Button>
      </Stack>
      
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
        gap:"1rem",
        alignItems:"flex-start",
        
      }}
      >
        {budgets.map(budget => {
          const amount=getBudgetExpenses(budget.id).reduce(
            (total,expense)=> total+expense.amount,0
          )
          return(
          <BudgetCard 
          key={budget.id}
          name={budget.name} 
          amount={amount} 
          max={budget.max}
          onAddExpenseClick={()=> openAddExpenseModal(budget.id)}
          onViewExpensesClick={()=> setViewExpensesModalBudgetId(budget.id)}

          />
          )
        })}
        <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
        onViewExpensesClick={()=> setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
        />
        <TotalBudgetCard/>

      </div>
      
    </Container>
    <AddBudgetModal 
    show={showAddBudgetModal} 
    handleClose={()=>setShowAddBudgetModal(false)} />

    <AddExpenseModal 
    show={showAddExpenseModal}
    defaultBudgetId={addExpenseModalBudgetId}
    handleClose={()=>setShowAddExpenseModal(false)} />
    
    <ViewExpensesModal 
    budgetId={ViewExpensesModalBudgetId}
    handleClose={()=>setViewExpensesModalBudgetId()} />
  </>
  )
}

