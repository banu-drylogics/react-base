import React, { useState } from 'react';
import './App.css';
import VirtualizedTable from './components/virtualized_table/VirtualizedTable';

function App() {

  return (
    <div className="container">
      <VirtualizedTable />
    </div>
  );
}

export default App;
