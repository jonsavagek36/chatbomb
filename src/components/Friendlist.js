import React, { Component } from 'react';
import FriendsHeader from './friends/FriendsHeader';
import FriendsBody from './friends/FriendsBody';

class Friendlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id='friend-list'>
        <FriendsHeader
          profile={this.props.profile}
            />
        <FriendsBody
          online_friends={this.props.online_friends}
          selectFriend={this.props.selectFriend}
          selectedFriend={this.props.selectedFriend}
          liveMessages={this.props.liveMessages}
            />
      </div>
    );
  }
}

export default Friendlist;
