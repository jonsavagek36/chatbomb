import React, { Component } from 'react';

class ChatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let conversation;
    if (this.props.conversation !== undefined) {
      conversation = this.props.conversation.map((msg, idx) => {
        return (
          <li key={idx}>
            {msg.sender_name}: {msg.message}
          </li>
        );
      });
    } else {
      conversation = [''];
    }

    return (
      <div id='chat-body'>
        <ul className='no-bullets'>
          {conversation}
        </ul>
      </div>
    );
  }
}

export default ChatBody;
