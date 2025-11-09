

function MonthlyInputField({
    value,
    onChange
} : {
    value: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    const displayValue = value == 0 ? "" : String(value);
    return (
        <input
            type="number"
            value={displayValue}
            onChange={onChange}
            className="border border-black p-2"
            placeholder="Monthly Salary"
        />
  );
  }
  export default MonthlyInputField;
 
