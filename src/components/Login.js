import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let _ = this;
    window.fbAsyncInit = function() {
      FB.init({
        appId: '206542439812995',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
      });
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          FB.api('/me?fields=id', function(response) {
            let fb_id = response.id;
            let fetchBody = {
              facebook_id: fb_id
            };
            let myHeaders = new Headers();
            myHeaders.append('Access-Control-Allow-Origin','*');
            myHeaders.append('Content-Type','application/json');
            fetch(`//chatbomb-api.herokuapp.com/api/v1/users/new_user`, {
              method: 'POST',
              body: JSON.stringify(fetchBody),
              headers: myHeaders
            })
              .then(response => {
                if (response.ok) {
                  return response;
                } else {
                  console.log('New User Check failed.');
                }
              })
              .then(response => response.json())
              .then(data => {
                if (data.new_user == true) {
                  browserHistory.push('/setup');
                } else {
                  browserHistory.push('/chatbomb');
                }
              })
          });
        }
      });
    }
  }

  userLogin() {
    FB.login(function(response) {
      if (response.status === 'connected') {
        FB.api('/me?fields=id', function(response) {
          let fb_id = response.id;
          let fetchBody = {
            facebook_id: fb_id
          };
          let myHeaders = new Headers();
          myHeaders.append('Access-Control-Allow-Origin','*');
          myHeaders.append('Content-Type','application/json');
          fetch(`//chatbomb-api.herokuapp.com/api/v1/users/new_user`, {
            method: 'POST',
            body: JSON.stringify(fetchBody),
            headers: myHeaders
          })
            .then(response => {
              if (response.ok) {
                return response;
              } else {
                console.log('New User Check failed.');
              }
            })
            .then(response => response.json())
            .then(data => {
              if (data.new_user == true) {
                browserHistory.push('/setup');
              } else {
                browserHistory.push('/chatbomb');
              }
            })
        });
      }
    }, { scope: 'public_profile' });
  }

  render() {
    return (
      <div>
        <div className='top'>
          CHATBOMB
        </div>
        <div id='main-div'>
          <div id='fb-login'>
            <a href='#' onClick={this.userLogin}>
              <img src={'https://i.stack.imgur.com/SoLOz.png'} id='login-img' />
            </a>
          </div>
          <img src={'//www.goodfreephotos.com/albums/vector-images/black-bomb-vector-clipart.png'} id='bomb-img' />
        </div>
      </div>
    );
  }
}

export default Login;
