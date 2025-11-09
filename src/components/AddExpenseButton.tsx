

function AddExpenseButton({ onClick } : { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <>
        <button id="addExpenseButton" onClick={onClick}>Add Expense!</button>
    </>
  )
}

export default AddExpenseButton;