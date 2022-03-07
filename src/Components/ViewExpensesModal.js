
import { Modal, Button, Stack } from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../Contexts/BudgetContext"
import { currencyFormatter } from "../utils"
import {MdDelete} from "react-icons/md";

export default function ViewExpensesModal({budgetId,handleClose}) {
    
    const {getBudgetExpenses, budgets,deleteBudget,deleteExpense} =useBudgets()
    const expenses= getBudgetExpenses(budgetId)
    const budget= UNCATEGORIZED_BUDGET_ID===budgetId
        ?{name:"Uncategorized", id: UNCATEGORIZED_BUDGET_ID}
        : budgets.find(b=>b.id === budgetId)
        
    
  return (
    <Modal show={budgetId !=null} onHide={handleClose} id="modal" style={{fontFamily:"'Roboto', sans-serif"}}  >
        
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2" id="card-stack">
                        <div>Expenses : {budget?.name}</div>
                        {budgetId!==UNCATEGORIZED_BUDGET_ID && (
                            <Button id="vdel" onClick={()=>{
                                deleteBudget(budget)
                                handleClose()
                            }}
                            variant="danger"
                            >
                            Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3" >
                    {expenses.map(expense =>(
                        <Stack direction="horizontal" gap="2" id="card-stack" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button onClick={() => deleteExpense(expense)} size='sm' variant="danger"><MdDelete size={20} /></Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        
    </Modal>
  )
 }
