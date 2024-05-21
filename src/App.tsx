import React, { useState } from 'react';
import './App.css';
import DonutChart from './components/dount/Dount';
import { transformedData } from './components/dount/chartData';


function App() {

  return (
    <div className="container">
      < DonutChart data={transformedData} />
    </div>
  );
}

export default App;
