import React from 'react';

import { Container, Navbar } from 'react-bootstrap';
import { ToastProvider } from 'react-toast-notifications';
import { SeearchServiceContextProvider } from './services/context/SearchServiceContext';

import News from './components/News/News';

import './App.scss';

const App = () => {
  return (
    <>
      <SeearchServiceContextProvider>
        <ToastProvider>
          <Navbar bg="light">
            <Navbar.Brand href="#home">News search's app</Navbar.Brand>
          </Navbar>

          <Container>
            <News />
          </Container>
        </ToastProvider>
      </SeearchServiceContextProvider>
    </>
  );
};

export default App;
