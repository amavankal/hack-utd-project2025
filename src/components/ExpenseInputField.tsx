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
            />
        </>
        );
    }
);

export default ExpenseInputField;