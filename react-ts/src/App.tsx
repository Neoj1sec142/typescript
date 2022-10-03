import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import './App.css';
import NavB from './components/nav';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <div>
      <header>
        <NavB />
      </header>
      <Routes>
        <Route path='/' element={<Main />}/>
      </Routes>
    </div>
  );
}

export default App;
