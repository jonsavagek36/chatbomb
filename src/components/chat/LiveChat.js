import React, { Component } from 'react';

class LiveChat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id='live-chat'>
        {this.props.liveChat}
      </div>
    );
  }
}

export default LiveChat;
