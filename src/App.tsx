import React, { useState } from 'react';
import './App.css';
import DonutChart from './components/dount/Dount';
import { transformedData } from './components/dount/chartData';


function App() {

  return (
    <div className="container">
      < BillingTable />
    </div>
  );
}

export default App;
