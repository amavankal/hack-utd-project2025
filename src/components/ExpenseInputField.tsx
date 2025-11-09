import { forwardRef } from 'react';


const ExpenseInputField = forwardRef<HTMLInputElement, { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }>(
    function ExpenseInputField({ onChange }, ref) {
        return (
        <>
            <input
                type="text"
                id="expenseInputField"
                ref={ref}
                onChange={onChange}
                className = "border border-black p-2  bg-[#eaf2c4]"
                placeholder = "Expense Name"
            />
        </>
        );
    }
);

export default ExpenseInputField;