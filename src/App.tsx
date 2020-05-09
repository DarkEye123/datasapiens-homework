import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NoSsr, Container } from '@material-ui/core';
import AutoLogin from './components/AutoLogin';
import Routes from './routes';
import Header from './components/Header';

function App() {
  return (
    <NoSsr>
      <AutoLogin></AutoLogin>
      <Router>
        <Header></Header>
        <Container>
          <Routes></Routes>
        </Container>
      </Router>
    </NoSsr>
  );
}

export default App;
