

function AddExpenseButton({ onClick } : { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <>
        <div className = "ml-2.5">
            <button id="addExpenseButton" className = "button"  onClick={onClick}>Add Expense!</button>
        </div>
        
    </>
  )
}

export default AddExpenseButton;