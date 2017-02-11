import React, { Component } from 'react';
import NamePlate from './NamePlate';

class FriendsBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let list = null;
    if (this.props.online_friends !== null) {
      list = this.props.online_friends.map((friend, idx) => {
        let newClass;
        let live = false;
        let selectFriend = () => {
          this.props.selectFriend(friend);
        }
        if (this.props.selectedFriend.screen_name == friend.screen_name) {
          newClass = 'name-plate-selected';
        } else {
          newClass = 'name-plate-unselected';
        }
        if (this.props.liveMessages.indexOf(friend.id) > -1) {
          live = true;
        }
        return (
          <NamePlate
            selectFriend={selectFriend}
            newClass={newClass}
            friend={friend}
            key={idx}
            live={live}
              />
        );
      });
    }
    return (
      <div id='friends-body'>
        {list}
      </div>
    );
  }
}

export default FriendsBody;
