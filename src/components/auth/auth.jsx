import React, {useContext} from 'react';
import { LoginContext } from './context.jsx';

const If = props => {
  return props.condition ? props.children : null;
};

class Auth extends React.Component {
  static contextType = LoginContext;
  render() {
    let okToRender = false;

    try {
      okToRender =
        this.context.loggedIn &&
        (this.props.capability
          ? this.context.user.capabilities.includes(this.props.capability)
          : true);
    } catch (e) {
      console.warn('Not Authorized');
    }

    return (
      <If condition={okToRender}>
        <div>{this.props.children}</div>
      </If>
    );
  }
}

export default Auth;
