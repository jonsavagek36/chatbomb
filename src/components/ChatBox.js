import React, { Component } from 'react';
import ChatHeader from './chat/ChatHeader';
import ChatBody from './chat/ChatBody';
import LiveChat from './chat/LiveChat';
import ChatSend from './chat/ChatSend';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let conversation = [];
    if (this.props.selectedFriend.id !== undefined) {
      let friend_id = this.props.selectedFriend.id;
      let convoCode = friend_id.toString();
      conversation = this.props.conversations[convoCode];
    }
    let live = false;
    if (this.props.liveMessages.indexOf(this.props.selectedFriend.id) > -1) {
      live = true;
    }
    return (
      <div id='chat-box'>
        <ChatHeader
          selectedFriend={this.props.selectedFriend}
          live={live}
          removeLiveMessage={this.props.removeLiveMessage}
            />
        <ChatBody
          conversation={conversation}
            />
        <LiveChat
          liveChat={this.props.liveChat}
            />
        <ChatSend
          sendMessage={this.props.sendMessage}
          sendLiveChange={this.props.sendLiveChange}
            />
      </div>
    );
  }
}

export default ChatBox;
