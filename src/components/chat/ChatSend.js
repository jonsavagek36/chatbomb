import React, { Component } from 'react';

class ChatSend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id='chat-send'>
        <input type='text' id='send-chat' onChange={this.props.sendLiveChange} />
        <button id='send-btn' onClick={this.props.sendMessage}>SEND</button>
      </div>
    );
  }
}

export default ChatSend;
