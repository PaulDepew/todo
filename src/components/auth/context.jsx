import React, {useState, useEffect} from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

const API = 'https://api-js401.herokuapp.com/' ;

export const LoginContext = React.createContext();

class LoginProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      login: this.login,
      logout: this.logout,
      user: {},
    };
  }

  login(username, password) {
    fetch(`${API}/signin`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      }),
    })
      .then(response => {response.text()
      })
      .then(token => {this.validateToken(token)
      let user = jwt.decode(token);
      this.setLoginState( this.loggedIn, token, user)
      })
      .catch(console.error);
  }

  validateToken(token) {
    try {
      let user = jwt.verify(token, 'aSuperSecret');
      console.log('all good');
      this.setLoginState(true, token, user);
    }
    catch (e) {
      this.setLoginState(false, null, {});
      console.log('Token Validation Error', e);
    }

  };

  logout(){
    this.setLoginState(false, null, {});
    cookie.remove('auth');
  };

  setLoginState(loggedIn, token, user){
    cookie.save('auth', token);
    this.setState({ token, loggedIn, user });
  };

  render(){
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export default LoginProvider;
