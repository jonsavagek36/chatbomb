import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className='top'>
          CHATBOMB
        </div>
        <div id='main-div'>
          <div id='fb-login'>
            <a href='#'>
              <img src={'http://www.freeiconspng.com/uploads/facebook-login-button-png-11.png'} id='login-img' />
            </a>
          </div>
          <img src={'https://www.goodfreephotos.com/albums/vector-images/black-bomb-vector-clipart.png'} id='bomb-img' />
        </div>
      </div>
    );
  }
}

export default Login;
