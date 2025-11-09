import { useRef, useState, useEffect } from 'react';
import ToggleButton from './ToggleButton';
import DollarInputField from './DollarInputField';
import ExpenseInputField from './ExpenseInputField';
import AddExpenseButton from './AddExpenseButton';
import MonthlyInputField from './MonthlyInputField';
import GenerateResultsButton from './GenerateResultsButton';

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
    
    // for generate results
    const [needSum, setNeedSum] = useState(0);
    const [expenseSum, setExpenseSum] = useState(0);

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
    }

    // for salary: runs when monthlySalary changes
    useEffect(() => {
            console.log("salary updated to " + monthlySalary);
        }, [monthlySalary]);

    // handler for generate results button
    const handleGenerateResults = () => {
        // no need to validate data
        let needSumTemp = 0;
        let expenseSumTemp = 0;

        tableData.map( (row) => {
            expenseSumTemp += row.price;
            if (row.isNeed)
                needSumTemp += row.price;
        });

        // update state variables
        setNeedSum(needSumTemp);
        setExpenseSum(expenseSumTemp);

        console.log("Expense Sum = " + expenseSum);
        console.log("Need sum = " + needSum);
        console.log("Leftover money = " + (monthlySalary - expenseSum));

        // show results component
        let x = document.getElementById("ResultsDiv");
        if (x !== null)
            if (x.style.display === "none")
                    x.style.display = "block";


    }

    return (
    <div className="my-10 flex flex-col items-center justify-center p-8">
        <div>
            <p id="addSalaryPrompt" className="font-bold">Input your monthly salary:</p>
            <MonthlyInputField
                value={monthlySalary}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSalaryChange(Number(e.target.value) || 0)}
            />
        </div>
        <div id="expenseTableDiv" className = "mt-10">
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
        <div  className="mt-3">
            <GenerateResultsButton
                onClick={() => handleGenerateResults()}
            />
        </div>
        <div id="ResultsDiv" style={{display: 'none'}}  className="mt-6">
            <table id="expenseOutputTable">
                <thead>
                    <tr>
                        <th>Expense Type</th>
                        <th>Percentage of income spent one expense</th>
                        <th>Need or want</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map( (row) => (
                        <tr key={row.id}>
                            <td>{row.expenseName}</td>
                            <td>
                                {(row.price / monthlySalary * 100).toFixed(2)} %
                            </td>
                            <td> {row.isNeed ? "Need" : "Want"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>
                Leftover income = {(monthlySalary - expenseSum)} <br />
                {(expenseSum / monthlySalary * 100).toFixed(2)}% of your income was spent. <br />

                {(monthlySalary - expenseSum) < 0 ? "You are currently spending $"
                 + String(expenseSum - monthlySalary) + " more than you’re earning." : ""} <br />
                
                {(monthlySalary - expenseSum) < 0 && needSum < monthlySalary ? "You are currently spending $" 
                    + String(expenseSum - needSum)  + " on categories you classified as wants. "
                    + "Out of your available income, you have $" + (monthlySalary - needSum)
                    + " left to spend on wants. Consider cutting down on any extra spending.": ""} <br />

                {(monthlySalary - expenseSum) < 0 && needSum > monthlySalary ? "Right now, you need more money to cover"
                    + " the categories you classified as needs than what you're earning. You may need to cut costs where"
                    + " you can or re-evaluate what counts as a need." : ""} <br />

                {(monthlySalary - expenseSum) > 0 ? "Since you have some leftover income, you could consider saving it "
                    + "or treating yourself to something nice!" : ""}
            </p>
        </div>
        
    </div>
  )
}

export default DynamicTable