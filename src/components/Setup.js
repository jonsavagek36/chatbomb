import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setup_sn: '',
      setup_email: ''
    };
    this.registerNewUser = this.registerNewUser.bind(this);
  }

  registerNewUser() {
    let _ = this;
    _.setState({
      setup_sn: document.getElementById('setup-sn').value,
      setup_email: document.getElementById('setup-email').value
    });
    FB.api('/me?fields=id,picture', function(response) {
      let fetchBody = {
        facebook_id: response.id,
        facebook_pic: response.picture.data.url,
        screen_name: _.state.setup_sn,
        email: _.state.setup_email
      };
      let myHeaders = new Headers();
      myHeaders.append('Access-Control-Allow-Origin','*');
      myHeaders.append('Content-Type','application/json');
      fetch(`//chatbomb-api.herokuapp.com/api/v1/users/register`, {
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
          if (data.success == true) {
            browserHistory.push('/chatbomb');
          }
        })
    });
    document.getElementById('setup-sn').value = '';
    document.getElementById('setup-email').value = '';
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
          <img src={'//www.goodfreephotos.com/albums/vector-images/black-bomb-vector-clipart.png'} id='bomb-img' />
        </div>
      </div>
    );
  }
}

export default Setup;
