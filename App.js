import { useState } from 'react';
import './App.css';
import All from './components/All'
import Active from './components/Active'
import Completed from './components/Completed'
import { data, works } from './TestData';


function App() {

  return (
  
    <div>
    <h1 className='header'>#todo</h1>
      <div className='body'>
      <All data={works}></All>
      <Active data={works}></Active>
      <Completed></Completed>
      </div>
    </div>  
  );
}

export default App;