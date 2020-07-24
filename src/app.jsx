import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import SettingsProvider from './context/settings.jsx'
import Login from './components/auth/login.jsx';
import LoginContext from './components/auth/context.jsx';
import Auth from './components/auth/auth.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

import ToDo from './components/todo/todo.jsx';

const App = () => {
    return (
      <>
      <Navbar defaultActiveKey="/" bg="primary" variant="light">
      <Nav.Link  exact path="/">Home</Nav.Link>
      </Navbar>
      <SettingsProvider>
        <Login />
        <LoginContext>
          <Auth>
            <ToDo />
          </Auth>
        </LoginContext>
      </SettingsProvider>
      </>
    );
}

export default App;