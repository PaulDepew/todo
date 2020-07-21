import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import ToDo from './components/todo/todo.jsx';

const App = () => {
    return (
      <>
      <Navbar defaultActiveKey="/" bg="primary" variant="light">
      <Nav.Link  exact path="/">Home</Nav.Link>
      </Navbar>
        <ToDo />
      </>
    );
}

export default App;