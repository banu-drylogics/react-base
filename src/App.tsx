import React, { useState } from 'react';
import './App.css';
import ChildrenCharacterView from './components/children-character/ChildrenCharacterView';


function App() {

  return (
    <div className="container">
      <div className='children-container'>
        <ChildrenCharacterView />
      </div>
    </div>
  );
}

export default App;
