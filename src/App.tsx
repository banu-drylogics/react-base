import React, { useState } from 'react';
import './App.css';
import DonutChart from './components/dount/Dount';
import { transformedData } from './components/dount/chartData';
import BillingTable from './components/billing_table/BillingTable';
import DropDown from './components/dropdown/DropDown';


function App() {

  return (
    <div className="container">
      < DropDown />
    </div>
  );
}

export default App;
