
function GenerateResultsButton({ onClick } : { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <>
        <button id="generateResultsButton" onClick={onClick}>Generate Results!</button>
    </>
  )
}

export default GenerateResultsButton;