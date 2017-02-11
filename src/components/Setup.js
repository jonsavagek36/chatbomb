import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  registerNewUser() {
    let setup_sn = document.getElementById('setup-sn');
    let setup_email = document.getElementById('setup-email');
    FB.api('/me?fields=id,picture', function(response) {
      let fetchBody = {
        facebook_id: response.id,
        facebook_pic: response.picture.data.url,
        screen_name: setup_sn.value,
        email: setup_email.value
      };
      let myHeaders = new Headers();
      myHeaders.append('Access-Control-Allow-Origin','*');
      myHeaders.append('Content-Type','application/json');
      fetch(`http://localhost:3000/api/v1/users/register`, {
        method: 'POST',
        body: JSON.stringify(fetchBody),
        headers: myHeaders
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            console.log('Failed to register new user.');
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            browserHistory.push('/chatbomb');
          }
        })
    });
    setup_sn.value = '';
    setup_email.value = '';
  }

  render() {
    return (
      <div>
        <div className='top'>
          CHATBOMB
        </div>
        <div id='main-div'>
          <div id='setup-form'>
            <div className='label'>Screen Name:</div><div className='f-right'><input type='text' id='setup-sn' /></div>
            <div className='label'>E-Mail:</div><div className='f-right'><input type='text' id='setup-email' /></div>
            <div className='label'><button id='setup-submit' onClick={this.registerNewUser}>Submit</button></div>
          </div>
          <img src={'https://www.goodfreephotos.com/albums/vector-images/black-bomb-vector-clipart.png'} id='bomb-img' />
        </div>
      </div>
    );
  }
}

export default Setup;