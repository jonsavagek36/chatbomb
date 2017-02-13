import React, { Component } from 'react';

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let requests = null;
    if (this.props.requests != null) {
      requests = this.props.requests.map((request, idx) => {
        let acceptRequest = () => {
          this.props.acceptRequest(request.request_id);
        }
        return (
          <li className='request-li' key={idx}>
            <img src={request.requester.facebook_pic} className='user-pic' />
              {request.requester.screen_name}
              <button onClick={acceptRequest}>ACCEPT</button>
          </li>
        );
      });
    }
    return (
      <div id='request-list'>
        <ul>
          {requests}
        </ul>
      </div>
    );
  }
}

export default RequestList;
