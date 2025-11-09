

function DollarInputField({
    id, value, onChange,
}: {
    id: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    const displayValue = value == "0" ? "" : String(value);
    return (
    <>
        <input
            type="number"
            id={id}
            value={displayValue}
            onChange={onChange}
            step="0.01" 
        />
    </>
  )
}

export default DollarInputField;