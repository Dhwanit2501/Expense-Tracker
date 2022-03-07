import React from 'react'
import { Card, ProgressBar ,Stack, Button} from 'react-bootstrap'
import {currencyFormatter} from '../utils'

export default function BudgetCard({name,amount,max,gray,hideButtons,onAddExpenseClick,onViewExpensesClick}) {

const classNames=[]
  if(amount > max){
    classNames.push("bg-danger","bg-opacity-10")
  } else if (gray){
    classNames.push("bg-light")
  }
  return (
    <Card className={classNames.join(" ")} style={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",fontFamily:"'Roboto', sans-serif"}}>
        <Card.Body>
            <Card.Title className="d-flex justify-content-between 
            align-items-baseline fw-normal mb-3">
            <div className="me-2">{name}</div>
            <div className="d-flex align-items-baseline">
                {currencyFormatter.format(amount)}
                {max && (<span className="text-muted fs-6 ms-1">
                 / {currencyFormatter.format(max)}
                 </span>
                )}
            </div>

            </Card.Title>
            {max && (<ProgressBar className="rounded-pill" variant={getprogressBarVariant(amount,max)}
            min={0}
            max={max}
            animated now={amount}
            />
            )}
            {!hideButtons && (<Stack direction="horizontal" gap={3} className="mt-4 mb-2" id="card-stack">
            
            <Button variant="outline-danger" className="ms-auto" onClick={onAddExpenseClick}>Add Expense</Button>
            <Button variant="outline-info" onClick={onViewExpensesClick}>View Expense</Button>
            </Stack>
            )}
        </Card.Body>
    </Card>
  )
}

function getprogressBarVariant(amount,max){
  var ratio = amount/max
  return ratio = (ratio<0.75? (ratio<0.5?"success":"warning"):"danger")
}