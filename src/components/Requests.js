import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import RequestList from './requests/RequestList';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      request_email: '',
      facebook_id: '',
      request_status: ''
    };
  }

  componentDidMount() {
    let _ = this;
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        FB.api('/me?fields=id', function(response) {
          _.setState({ facebook_id: response.id });
          let fetchBody = {
            facebook_id: response.id
          };
          let myHeaders = new Headers();
          myHeaders.append('Access-Control-Allow-Origin','*');
          myHeaders.append('Content-Type','application/json');
          fetch(`https://cbomb.herokuapp.com/api/v1/requests/get_requests`, {
            method: 'POST',
            body: JSON.stringify(fetchBody),
            headers: myHeaders
          })
            .then(response => {
              if (response.ok) {
                return response;
              } else {
                console.log('Failed to fetch requests.');
              }
            })
            .then(response => response.json())
            .then(data => {
              _.setState({ requests: data.requests });
            })
        });
      }
    });
  }

  sendRequest() {
    let _ = this;
    _.setState({ request_email: document.getElementById('req-email').value });
    let fetchBody = {
      facebook_id: this.state.facebook_id,
      request_email: this.state.request_email
    };
    let myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin','*');
    myHeaders.append('Content-Type','application/json');
    fetch(`https://cbomb.herokuapp.com/api/v1/requests/send_request`, {
      method: 'POST',
      body: JSON.stringify(fetchBody),
      headers: myHeaders
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          console.log('Failed to send request.');
        }
      })
      .then(response => response.json())
      .then(data => {
        _.setState({ request_status: data.message });
      })
  }

  acceptRequest(id) {
    let _ = this;
    let fetchBody = {
      request_id: id
    };
    let myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin','*');
    myHeaders.append('Content-Type','application/json');
    fetch(`https://cbomb.herokuapp.com/api/v1/requests/accept_request`, {
      method: 'POST',
      body: JSON.stringify(fetchBody),
      headers: myHeaders
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          console.log('Failed to accept request.');
        }
      })
      .then(response => response.json())
      .then(data => {
        _.setState({ request_status: data.message });
      })
  }

  goBack() {
    browserHistory.push('/chatbomb');
  }

  render() {
    return (
      <div>
        <div className='top'>
          CHATBOMB
          <div className='menu'>
            <button onClick={this.goBack} className='menu-btn'>Go Back</button>
          </div>
        </div>
        <div id='main-div'>
          <RequestList
            requests={this.state.requests}
            acceptRequest={this.acceptRequest}
              />
          <div id='send-request'>
            <form id='request-form'>
              <div className='label'>User E-Mail:</div><div className='f-right'><input type='text' id='req-email' /></div>
              <div className='label'><button onClick={this.sendRequest} className='menu-btn-rr'>Send Request</button></div>
            </form>
            <div id='request-status'>
              {this.state.request_status}
            </div>
          </div>
          <img src={'https://www.goodfreephotos.com/albums/vector-images/black-bomb-vector-clipart.png'} id='bomb-img' />
        </div>
      </div>
    );
  }
}

export default Requests;
