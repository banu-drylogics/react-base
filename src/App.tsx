import React, { useState } from 'react';
import './App.css';
import BillingTable from './components/billing_table';
import RecursiveMenu from './routes/RecursiveMenu';


function App() {

  return (
    <div className="container">
      < RecursiveMenu />
    </div>
  );
}

export default App;
