//import React from 'react';
import Navbar from './components/Navbar.tsx';
import ToggleButton from './components/ToggleButton.tsx';
import DynamicTable from './components/DynamicTable.tsx'
import MonthlyInputField from './components/MonthlyInputField.tsx';

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <DynamicTable />
      </div>
    </>
  )
}

export default App;