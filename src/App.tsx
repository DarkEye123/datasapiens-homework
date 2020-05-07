import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AutoLogin from './components/AutoLogin';
import Routes from './routes';

function App() {
  return (
    <>
      <AutoLogin></AutoLogin>
      <Router>
        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
