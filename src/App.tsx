import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NoSsr, Container } from '@material-ui/core';
import AutoLogin from './components/AutoLogin';
import Routes from './routes';

function App() {
  return (
    <NoSsr>
      <AutoLogin></AutoLogin>
      <Container>
        <Router>
          <Routes></Routes>
        </Router>
      </Container>
    </NoSsr>
  );
}

export default App;
