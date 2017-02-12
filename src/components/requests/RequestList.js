import React, { Component } from 'react';

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let requests = null;
    // if (this.props.requests != null) {
    //   requests = this.props.requests.map((request, idx) => {
    //     let acceptRequest = () => {
    //       this.props.acceptRequest(request.id);
    //     }
    //     return (
    //       <li className='request-li' key={idx}>
    //         <img src={request.facebook_pic} className='user-pic' />
    //           {request.screen_name}
    //           <button onClick={acceptRequest}>ACCEPT</button>
    //       </li>
    //     );
    //   });
    // }
    return (
      <div id='request-list'>
        {requests}
      </div>
    );
  }
}

export default RequestList;
