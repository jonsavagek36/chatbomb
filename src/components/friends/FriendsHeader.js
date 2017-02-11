import React, { Component } from 'react';

class FriendsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id='friends-header'>
        {this.props.profile.screen_name} Friends
      </div>
    );
  }
}

export default FriendsHeader;
