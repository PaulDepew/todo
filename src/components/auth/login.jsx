import React from 'react';
import { LoginContext } from '../auth/context.jsx';
import {Button, InputGroup} from 'react-bootstrap';


const If = props => {
  return props.condition ? props.children : null;
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' }
  };
  
static contextType = LoginContext;
  
  handleChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });

  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
  };

  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <button onClick={this.context.logout}>Log Out</button>
        </If>

        <If condition={!this.context.loggedIn}>
          <InputGroup>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="UserName"
              name="username"
              onChange={(e) => this.handleChange(e)}
            />
            <input
              placeholder="password"
              name="password"
              onChange={(e) => this.handleChange(e)}
            />
            <InputGroup.Append>
            <Button type="submit">Login</Button>
            </InputGroup.Append>
          </form>
          </InputGroup>
        </If>
      </>
    );
  }
}

export default Login;
