import React, { Component } from 'react';

class FriendsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id='friends-header'>
        <img src={this.props.profile.facebook_pic} className='user-pic' />
        {this.props.profile.screen_name}
      </div>
    );
  }
}

export default FriendsHeader;
