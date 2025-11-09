
function GenerateResultsButton({ onClick } : { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <>
        <button id="generateResultsButton" className = "button" onClick={onClick}>Generate Results!</button>

    </>
  )
}

export default GenerateResultsButton;