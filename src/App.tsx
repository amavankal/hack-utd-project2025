//import React from 'react';
import Title from './components/Title.tsx';
import DynamicTable from './components/DynamicTable.tsx'
import InstructionComponent from './components/InstructionComponent.tsx';

function App() {
  return (
    <>
      <div>
        <Title />
      </div>
      <div> 
       <InstructionComponent />
      </div>
      <div>
        <DynamicTable />
      </div>
    </>
  )
}

export default App;