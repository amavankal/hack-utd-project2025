import { useRef, useState } from 'react';
import ToggleButton from './ToggleButton';
import DollarInputField from './DollarInputField';
import ExpenseInputField from './ExpenseInputField';
import AddExpenseButton from './AddExpenseButton';
import MonthlyInputField from './MonthlyInputField';

type ExpenseRow = {
    id: number;
    expenseName: string;
    price: number;
    isNeed: boolean;
}

const DEFAULT_EXPENSES: ExpenseRow[] = [
    { id : 1, expenseName : "Rent", price : 0, isNeed: true},
    { id : 2, expenseName : "Groceries", price : 0, isNeed: true},
    { id : 3, expenseName : "Utilities", price : 0, isNeed: true},
    { id : 4, expenseName : "Savings", price : 0, isNeed: false}
];

function DynamicTable() {
    // state constants
    const [tableData, setTableData] = useState(DEFAULT_EXPENSES);
    const [addRowValue, setAddRowValue] = useState("");
    const [monthlySalary, setMonthlySalary] = useState(0);

    const textFieldRef = useRef<HTMLInputElement>(null);

    // onChange for when value for $$ changed
    const handlePriceChange = (id: number, newPrice: number) => {
        setTableData(prev =>
            prev.map(row =>
                row.id === id ? { ...row, price: newPrice } : row
            )
        );
    };

    // onChange for toggle button
    const handleToggle = (id: number) => {
        setTableData(prev =>
        prev.map(row =>
            row.id === id ? { ...row, isNeed: !row.isNeed } : row
        )
        );
    };

    // handler for row add update
    const handleRowAddUpdate = (newValue: string) => {
        setAddRowValue(newValue);
        console.log("add row value updated to " + addRowValue);
    }

    // handler for row add
    const handleRowAdd = () => {
        if (addRowValue != "") {
            const newRow: ExpenseRow = {
                id: tableData.length + 1,
                expenseName: addRowValue,
                price: 0,
                isNeed: false
            };
            setTableData([...tableData, newRow]);
            setAddRowValue("");
            if (textFieldRef.current)
               textFieldRef.current.value = "";
            
        }
    }

    // handler for monthly salary update
    const handleSalaryChange = (newValue: number) => {
        setMonthlySalary(newValue);
        console.log("salary updated to " + monthlySalary);
    }

    return (
    <>
        <div>
            <MonthlyInputField
                value={monthlySalary}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSalaryChange(Number(e.target.value) || 0)}
            />
        </div>
        <div id="expenseTableDiv">
            <table id="expenseInputTable">
                <thead>
                    <tr>
                        <th>Expense Type</th>
                        <th>Dollar amount</th>
                        <th colSpan={2}>Is this a need?</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map( (row) => (
                        <tr key={row.id}>
                            <td>{row.expenseName}</td>
                            <td>
                                <DollarInputField
                                    id={`price-${row.id}`}
                                    value={String(row.price) || ""}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePriceChange(row.id, Number(e.target.value) || 0)}
                                />
                            </td>
                            <td>
                                <ToggleButton
                                    id={`toggle-${row.id}`}
                                    checked={row.isNeed}
                                    onChange={() => handleToggle(row.id)}
                                />
                            </td>
                            <td> {row.isNeed ? "Need" : "Want"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div id="addTableRowDiv" className="mt-4">
            <p id="addTableRowPrompt" className="font-bold">Add table row:</p>
            <table id="addTableRowTable">
                <tbody>
                    <tr key="addRow">
                        <td>
                            <ExpenseInputField
                                ref={textFieldRef}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => (handleRowAddUpdate(e.target.value))}
                            />
                        </td>
                        <td>
                            <AddExpenseButton
                                onClick={() => handleRowAdd()}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </>
  )
}

export default DynamicTable