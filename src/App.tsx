import React, { useState } from 'react';
import './App.css';
import BillingTable from './components/billing_table';
import VirtualizedTable from './components/virtualized_table/VirtualizedTable';


function App() {

  return (
    <div className="container">
      <VirtualizedTable />
    </div>
  );
}

export default App;
